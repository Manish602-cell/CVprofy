document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const form = document.getElementById('resumeForm');
    const preview = document.getElementById('resumePreview');
    const photoInput = document.getElementById('photoInput');
    const templateSelect = document.getElementById('templateSelect');

    // Dynamic List containers
    const experienceList = document.getElementById('experienceList');
    const educationList = document.getElementById('educationList');

    // Templates
    const expTemplate = document.getElementById('expItemTemplate');
    const eduTemplate = document.getElementById('eduItemTemplate');

    let state = {
        photoData: null
    };

    let lastHeartbeatTs = 0;

    // --- Event Listeners ---

    // 1. Live Text Update
    form.addEventListener('input', (e) => {
        updatePreview();
    });

    // 2. Photo Upload
    const photoControls = document.getElementById('photoControls');
    const photoZoom = document.getElementById('photoZoom');
    const photoX = document.getElementById('photoX');
    const photoY = document.getElementById('photoY');
    const zoomVal = document.getElementById('zoomVal');

    photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                state.photoData = ev.target.result;
                updatePreview();
                photoControls.style.display = 'block';
                // Reset controls
                photoZoom.value = 1;
                photoX.value = 0;
                photoY.value = 0;
                zoomVal.innerText = '1x';
                updatePhotoStyle();
            };
            reader.readAsDataURL(file);
        }
    });

    // Photo Adjustment Listeners
    function updatePhotoStyle() {
        const img = document.getElementById('previewPhoto');
        if (!img) return;
        const zoom = photoZoom.value;
        const x = photoX.value;
        const y = photoY.value;
        
        zoomVal.innerText = `${zoom}x`;
        img.style.transform = `scale(${zoom}) translate(${x}px, ${y}px)`;
    }

    [photoZoom, photoX, photoY].forEach(el => {
        el.addEventListener('input', updatePhotoStyle);
    });

    // 3. Template Switch
    templateSelect.addEventListener('change', (e) => {
        preview.className = `resume-paper ${e.target.value}`;
    });

    // 4. Add/Remove Items
    document.getElementById('addExpBtn').addEventListener('click', () => addItem(experienceList, expTemplate));
    document.getElementById('addEduBtn').addEventListener('click', () => addItem(educationList, eduTemplate));

    // Initial item
    addItem(experienceList, expTemplate);
    addItem(educationList, eduTemplate);

    // AI Helper
    async function fetchAI(type, context, targetElement, btnElement) {
        const originalText = btnElement.innerHTML;
        btnElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        btnElement.disabled = true;

        try {
            const res = await fetch('/api/generate-ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, context })
            });
            const data = await res.json();
            if (data.result) {
                targetElement.value = data.result;
                updatePreview();
            }
        } catch (e) {
            console.error(e);
            alert('AI Generation failed');
        } finally {
            btnElement.innerHTML = originalText;
            btnElement.disabled = false;
        }
    }

    // AI Summary
    document.getElementById('aiSummaryBtn').addEventListener('click', () => {
        const role = form.querySelector('[name="jobRole"]').value;
        if (!role) return alert("Enter a Job Title first");
        fetchAI('summary', { jobTitle: role }, form.querySelector('[name="summary"]'), document.getElementById('aiSummaryBtn'));
    });

    // AI Skills
    const aiSkillsBtn = document.getElementById('aiSkillsBtn');
    if (aiSkillsBtn) {
        aiSkillsBtn.addEventListener('click', () => {
            const role = form.querySelector('[name="jobRole"]').value;
            if (!role) return alert("Enter a Job Title first");
            fetchAI('skills', { jobTitle: role }, form.querySelector('[name="skills"]'), aiSkillsBtn);
        });
    }

    // Download PDF
    document.getElementById('downloadPdfBtn').addEventListener('click', async () => {
        const btn = document.getElementById('downloadPdfBtn');
        btn.innerText = "Generating...";

        const data = collectFormData();
        const element = document.getElementById('resumePreview');

        try {
            // Track CV creation in database
            if (data.email) {
                fetch('/api/track-cv', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: data.email,
                        fullName: data.fullName,
                        isPremium: false // You can add premium check later
                    })
                }).catch(() => {}); // Don't block download if tracking fails
            }

            // Temporary style adjustments for PDF generation to prevent extra blank pages
            const originalMinHeight = element.style.minHeight;
            const originalBoxShadow = element.style.boxShadow;
            element.style.minHeight = 'auto';
            element.style.boxShadow = 'none';

            const opt = {
                // Use full A4 page with no extra white margins so nothing is cut off
                // and right-side dates stay fully visible.
                margin:       0,
                filename:     `${data.fullName || 'resume'}.pdf`,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            // Client-side HTML -> PDF; preserves current theme/colors/styles exactly
            // and avoids any server-side PDF issues.
            await html2pdf().set(opt).from(element).save();

            // Restore styles
            element.style.minHeight = originalMinHeight;
            element.style.boxShadow = originalBoxShadow;
        } catch (e) {
            console.error(e);
            try {
                const htmlDoc = `<!DOCTYPE html><html><head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="stylesheet" href="/style.css" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
                </head><body>${element.outerHTML}</body></html>`;

                const resp = await fetch('/api/download/pdf-original', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ html: htmlDoc, filename: data.fullName || 'resume' })
                });
                if (!resp.ok) throw new Error('Server PDF failed');
                const blob = await resp.blob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${data.fullName || 'resume'}.pdf`;
                document.body.appendChild(a);
                a.click();
                URL.revokeObjectURL(url);
                a.remove();
            } catch (fallbackErr) {
                console.error('Fallback download failed', fallbackErr);
                alert('Error downloading PDF');
            }
        } finally {
            btn.innerHTML = '<i class="fas fa-download"></i> Download PDF';
        }
    });


    // --- Functions ---

    function addItem(container, template) {
        const clone = template.content.cloneNode(true);
        const div = clone.querySelector('.list-item-form');

        // Remove button
        div.querySelector('.btn-remove').addEventListener('click', () => {
            div.remove();
            updatePreview();
        });

        // AI Button (if exists, e.g. for Experience)
        const aiBtn = div.querySelector('.btn-ai-exp');
        if (aiBtn) {
            aiBtn.addEventListener('click', () => {
                const titleInput = div.querySelector('.inp-title');
                const role = titleInput.value;
                if (!role) return alert("Enter a Job Title for this position first");
                
                const descArea = div.querySelector('.inp-desc');
                fetchAI('experience', { jobTitle: role }, descArea, aiBtn);
            });
        }

        container.appendChild(clone);
        updatePreview();
    }

    function collectFormData() {
        const fd = new FormData(form);
        const data = Object.fromEntries(fd.entries());

        // Collect Lists manually
        data.experience = [];
        experienceList.querySelectorAll('.list-item-form').forEach(item => {
            data.experience.push({
                title: item.querySelector('.inp-title').value,
                company: item.querySelector('.inp-company').value,
                start: item.querySelector('.inp-start').value,
                end: item.querySelector('.inp-end').value,
                description: item.querySelector('.inp-desc').value
            });
        });

        data.education = [];
        educationList.querySelectorAll('.list-item-form').forEach(item => {
            data.education.push({
                degree: item.querySelector('.inp-degree').value,
                institution: item.querySelector('.inp-uni').value,
                year: item.querySelector('.inp-year').value
            });
        });

        return data;
    }


    function tryHeartbeat(data) {
        const now = Date.now();
        if (now - lastHeartbeatTs < 60000) return;
        if (!data.email) return;
        fetch('/api/heartbeat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: data.email, fullName: data.fullName })
        }).catch(() => {});
        lastHeartbeatTs = now;
    }

    function updatePreview() {
        const data = collectFormData();

        setText('previewName', data.fullName || 'Your Name');
        setText('previewRole', data.jobRole || 'Job Title');
        setText('previewEmail', data.email);
        setText('previewPhone', data.phone);
        setText('previewAddress', data.address);

        tryHeartbeat(data);

        // Photo
        const photoDiv = document.querySelector('.resume-photo-container');
        const photoImg = document.getElementById('previewPhoto');
        if (state.photoData) {
            photoDiv.style.display = 'block';
            photoImg.src = state.photoData;
        } else {
            photoDiv.style.display = 'none';
        }

        // Summary
        setText('previewSummary', data.summary);
        document.getElementById('previewSummarySection').style.display = data.summary ? 'block' : 'none';

        // Experience
        const expContainer = document.getElementById('previewExperienceList');
        expContainer.innerHTML = '';
        data.experience.forEach(exp => {
            if (!exp.title && !exp.company) return;
            const div = document.createElement('div');
            div.className = 'resume-item';
            div.innerHTML = `
                <div class="resume-item-header">
                    <span>${exp.title}</span>
                    <span>${exp.start} - ${exp.end}</span>
                </div>
                <div class="resume-item-sub">${exp.company}</div>
                <div class="resume-item-desc">${exp.description}</div>
            `;
            expContainer.appendChild(div);
        });
        document.getElementById('previewExpSection').style.display = data.experience.length ? 'block' : 'none';

        // Education
        const eduContainer = document.getElementById('previewEducationList');
        eduContainer.innerHTML = '';
        data.education.forEach(edu => {
            if (!edu.degree) return;
            const div = document.createElement('div');
            div.className = 'resume-item';
            div.innerHTML = `
                <div class="resume-item-header">
                    <span>${edu.degree}</span>
                    <span>${edu.year}</span>
                </div>
                <div class="resume-item-sub">${edu.institution}</div>
            `;
            eduContainer.appendChild(div);
        });
        document.getElementById('previewEduSection').style.display = data.education.length ? 'block' : 'none';

        // Skills
        const skillsContainer = document.getElementById('previewSkillsList');
        skillsContainer.innerHTML = '';
        if (data.skills) {
            data.skills.split(',').forEach(skill => {
                if (!skill.trim()) return;
                const li = document.createElement('li');
                li.innerText = skill.trim();
                skillsContainer.appendChild(li);
            });
            document.getElementById('previewSkillsSection').style.display = 'block';
        } else {
            document.getElementById('previewSkillsSection').style.display = 'none';
        }
    }

    function setText(id, text) {
        document.getElementById(id).innerText = text || '';
    }
});
