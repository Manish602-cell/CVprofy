document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('adminEmail');
    const passwordInput = document.getElementById('adminPassword');
    const loginBtn = document.getElementById('adminLoginBtn');
    const logoutBtn = document.getElementById('adminLogoutBtn');
    const msg = document.getElementById('adminLoginMsg');
    const loginCard = document.getElementById('adminLoginCard');
    const dashboard = document.getElementById('adminDashboard');

    const totalUsersEl = document.getElementById('metricTotalUsers');
    const premiumUsersEl = document.getElementById('metricPremiumUsers');
    const resumesGeneratedEl = document.getElementById('metricResumesGenerated');
    const todayGeneratedEl = document.getElementById('metricTodayGenerated');

    function setLoggedIn(isLoggedIn) {
        localStorage.setItem('admin_logged_in', isLoggedIn ? 'true' : 'false');
        if (isLoggedIn) {
            loginCard?.classList.add('admin-hidden');
            dashboard?.classList.remove('admin-hidden');
        } else {
            dashboard?.classList.add('admin-hidden');
            loginCard?.classList.remove('admin-hidden');
        }
    }

    async function loadOverview() {
        try {
            const res = await fetch('/api/admin/overview');
            if (!res.ok) return;
            const data = await res.json();
            totalUsersEl.textContent = data.totalUsers ?? 0;
            premiumUsersEl.textContent = data.premiumUsers ?? 0;
            resumesGeneratedEl.textContent = data.resumesGenerated ?? 0;
            todayGeneratedEl.textContent = data.todayGenerated ?? 0;
        } catch (e) {
            console.error('Failed to load admin overview', e);
        }
    }

    async function loadUsers() {
        try {
            const res = await fetch('/api/admin/users');
            if (!res.ok) return;
            const users = await res.json();
            const tbody = document.querySelector('.admin-table tbody');
            if (!tbody) return;

            tbody.innerHTML = '';
            users.forEach(user => {
                const row = document.createElement('tr');
                const name = user.full_name || user.email.split('@')[0] || 'User';
                const timeAgo = formatTimeAgo(user.last_active);
                row.innerHTML = `
                    <td>${name}</td>
                    <td>${user.email}</td>
                    <td><span class="badge ${user.is_premium ? 'badge-premium' : 'badge-free'}">${user.is_premium ? 'Premium' : 'Free'}</span></td>
                    <td>${user.downloads_count || 0}</td>
                    <td>${timeAgo}</td>
                `;
                tbody.appendChild(row);
            });
        } catch (e) {
            console.error('Failed to load users', e);
        }
    }

    async function loadActivity() {
        try {
            const res = await fetch('/api/admin/activity');
            if (!res.ok) return;
            const activities = await res.json();
            const activityList = document.querySelector('.activity-list');
            if (!activityList) return;

            activityList.innerHTML = '';
            activities.forEach(act => {
                const li = document.createElement('li');
                const userName = act.full_name || act.email?.split('@')[0] || 'User';
                const timeAgo = formatTimeAgo(act.created_at);
                const desc = act.description || act.activity_type.replace('_', ' ');
                li.innerHTML = `
                    <span class="activity-dot"></span>
                    <div>
                        <p class="activity-title">${desc}</p>
                        <p class="activity-meta">${userName} • ${timeAgo}</p>
                    </div>
                `;
                activityList.appendChild(li);
            });
        } catch (e) {
            console.error('Failed to load activity', e);
        }
    }

    function formatTimeAgo(dateStr) {
        if (!dateStr) return 'Unknown';
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} min ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }

    loginBtn.addEventListener('click', async () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        msg.style.color = '#ef4444';
        msg.textContent = '';

        if (!email || !password) {
            msg.textContent = 'Enter email and password';
            return;
        }

        loginBtn.disabled = true;
        loginBtn.textContent = 'Signing in...';

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const body = await res.json().catch(() => ({}));

            if (res.ok && body.success) {
                msg.style.color = '#16a34a';
                msg.textContent = 'Login successful';
                setLoggedIn(true);
                await Promise.all([loadOverview(), loadUsers(), loadActivity()]);
            } else {
                msg.textContent = body.message || 'Login failed';
            }
        } catch (e) {
            console.error('Admin login error', e);
            msg.textContent = 'Server error';
        } finally {
            loginBtn.disabled = false;
            loginBtn.textContent = 'Sign in';
        }
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            emailInput.value = '';
            passwordInput.value = '';
            msg.style.color = '#64748b';
            msg.textContent = 'Logged out';
            totalUsersEl.textContent = '0';
            premiumUsersEl.textContent = '0';
            resumesGeneratedEl.textContent = '0';
            todayGeneratedEl.textContent = '0';
            setLoggedIn(false);
        });
    }

    // Restore session
    const alreadyLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
    setLoggedIn(alreadyLoggedIn);
    if (alreadyLoggedIn) {
        Promise.all([loadOverview(), loadUsers(), loadActivity()]);
        // Auto-refresh every 10 seconds
        setInterval(() => {
            if (localStorage.getItem('admin_logged_in') === 'true') {
                Promise.all([loadOverview(), loadUsers(), loadActivity()]);
            }
        }, 10000);
    }
});

