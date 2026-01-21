const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
// Increase body size limits to avoid "PayloadTooLargeError" when sending rich resume data
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const generateRoutes = require('./routes/generate');
const downloadRoutes = require('./routes/download');

app.use('/api/generate', generateRoutes);
app.use('/api/download', downloadRoutes);

// Track CV creation/download
app.post('/api/track-cv', (req, res) => {
    const { email, fullName, isPremium } = req.body || {};
    
    if (!email) {
        return res.status(400).json({ error: 'Email required' });
    }

    // Insert or update user
    db.run(`INSERT INTO users (email, full_name, is_premium, downloads_count, last_active)
            VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP)
            ON CONFLICT(email) DO UPDATE SET
                downloads_count = downloads_count + 1,
                last_active = CURRENT_TIMESTAMP,
                full_name = COALESCE(?, full_name)`,
        [email, fullName || null, isPremium ? 1 : 0, fullName || null],
        function(err) {
            if (err) {
                console.error('Error tracking CV', err.message);
                return res.status(500).json({ error: 'Database error' });
            }

            const userId = this.lastID || null;
            if (!userId) {
                db.get('SELECT id FROM users WHERE email = ?', [email], (err2, row) => {
                    if (!err2 && row) {
                        const uid = row.id;
                        db.run(`INSERT INTO activities (user_id, activity_type, description)
                                VALUES (?, 'resume_downloaded', ?)`,
                            [uid, `Resume downloaded by ${fullName || email}`]);
                    }
                });
            } else {
                db.run(`INSERT INTO activities (user_id, activity_type, description)
                        VALUES (?, 'resume_downloaded', ?)`,
                    [userId, `Resume downloaded by ${fullName || email}`]);
            }

            res.json({ success: true });
        }
    );
});

app.post('/api/heartbeat', (req, res) => {
    const { email, fullName } = req.body || {};
    if (!email) {
        return res.status(400).json({ error: 'Email required' });
    }

    db.run(
        `INSERT INTO users (email, full_name, last_active)
         VALUES (?, ?, CURRENT_TIMESTAMP)
         ON CONFLICT(email) DO UPDATE SET
            last_active = CURRENT_TIMESTAMP,
            full_name = COALESCE(?, full_name)`,
        [email, fullName || null, fullName || null],
        function (err) {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ success: true });
        }
    );
});

// View Engine
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/pricing', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'pricing.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

// Database Init (Placeholder for now)
const dbPath = path.join(__dirname, 'db', 'users_new.db');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            full_name TEXT,
            is_premium INTEGER DEFAULT 0,
            downloads_count INTEGER DEFAULT 0,
            last_active DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS activities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            activity_type TEXT,
            description TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )`);

        // Simple admin table for demo purposes
        db.run(`CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            password TEXT NOT NULL
        )`, (err2) => {
            if (err2) {
                console.error('Error creating admins table', err2.message);
                return;
            }

            // Seed a default admin user if none exists
            db.get('SELECT id FROM admins LIMIT 1', (err3, row) => {
                if (err3) {
                    console.error('Error checking admins table', err3.message);
                    return;
                }
                if (!row) {
                    db.run(
                        'INSERT INTO admins (email, password) VALUES (?, ?)',
                        ['admin@example.com', 'admin123'],
                        (err4) => {
                            if (err4) {
                                console.error('Error inserting default admin', err4.message);
                            } else {
                                console.log('Seeded default admin user: admin@example.com / admin123');
                            }
                        }
                    );
                }
            });

            // Seed dummy users if none exist (for demo)
            db.get('SELECT COUNT(*) as c FROM users', (errU, rowU) => {
                if (!errU && rowU && rowU.c === 0) {
                    console.log('Seeding dummy users...');
                    const dummyUsers = [
                        ['hulk12@gmail.com', 'Hulk', 1, 5, '2023-10-27 10:00:00'],
                        ['john@example.com', 'John Doe', 0, 2, '2023-10-27 09:30:00'],
                        ['sarah.lee@example.com', 'Sarah Lee', 1, 9, '2023-10-27 08:15:00']
                    ];
                    
                    const stmt = db.prepare('INSERT INTO users (email, full_name, is_premium, downloads_count, last_active) VALUES (?, ?, ?, ?, ?)');
                    dummyUsers.forEach(u => {
                        stmt.run(u, function(err) {
                            if (err) console.error('Error seeding user ' + u[0], err.message);
                            else {
                                // Seed activity for this user
                                const userId = this.lastID;
                                db.run("INSERT INTO activities (user_id, activity_type, description, created_at) VALUES (?, 'resume_downloaded', ?, ?)", 
                                    [userId, 'Resume downloaded', u[4]]);
                            }
                        });
                    });
                    stmt.finalize();
                }
            });
        });
    }
});

// --- AI Generation Endpoint ---
app.post('/api/generate-ai', (req, res) => {
    const { type, context } = req.body || {};
    // context object: { jobTitle, keywords, currentText }

    if (!type) {
        return res.status(400).json({ error: 'Type is required' });
    }

    // In a real production app, you would call OpenAI or Anthropic API here.
    // For this demo, we will simulate AI generation with high-quality templates.
    
    let generatedText = "";
    const jobTitle = context?.jobTitle || "Professional";

    if (type === 'summary') {
        const adjectives = ["Motivated", "Experienced", "Results-oriented", "Creative", "Dedicated"];
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        generatedText = `${adj} ${jobTitle} with a proven track record of success. Skilled in problem-solving and driving operational efficiency. Committed to delivering high-quality results in fast-paced environments.`;
    } else if (type === 'experience') {
        generatedText = `• Spearheaded key projects for ${jobTitle} roles, improving efficiency by 20%.\n• Collaborated with cross-functional teams to deliver high-quality solutions.\n• Mentored junior team members and implemented best practices.\n• Analyzed data trends to drive strategic decision-making.`;
    } else if (type === 'skills') {
         // Generate skills based on job title keywords
         const commonSkills = ["Communication", "Leadership", "Project Management", "Problem Solving"];
         const techSkills = ["Python", "JavaScript", "React", "Node.js", "SQL", "AWS"];
         const designSkills = ["Photoshop", "Figma", "UI/UX", "Branding"];
         
         let skillSet = commonSkills;
         if (jobTitle.toLowerCase().includes('software') || jobTitle.toLowerCase().includes('developer')) {
             skillSet = [...techSkills, ...commonSkills];
         } else if (jobTitle.toLowerCase().includes('design')) {
             skillSet = [...designSkills, ...commonSkills];
         }
         
         // Pick random 5-8 skills
         generatedText = skillSet.sort(() => 0.5 - Math.random()).slice(0, 8).join(", ");
    }

    // Simulate network delay for realism
    setTimeout(() => {
        res.json({ result: generatedText });
    }, 800);
});

// --- Admin API ---

// Very simple email/password check (demo only) – accepts any non-empty credentials.
app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    // In a real app you would validate against the database and hash passwords.
    // For this demo we simply accept any non-empty email/password.
    res.json({ success: true });
});

// Simple overview stats for the admin dashboard.
app.get('/api/admin/overview', (req, res) => {
    const result = { totalUsers: 0, premiumUsers: 0, resumesGenerated: 0, todayGenerated: 0 };

    db.get('SELECT COUNT(*) AS c FROM users', (err1, row1) => {
        if (err1) {
            console.error('Error fetching total users', err1.message);
        } else if (row1) {
            result.totalUsers = row1.c || 0;
        }

        db.get('SELECT COUNT(*) AS c FROM users WHERE is_premium = 1', (err2, row2) => {
            if (err2) {
                console.error('Error fetching premium users', err2.message);
            } else if (row2) {
                result.premiumUsers = row2.c || 0;
            }

            db.get('SELECT SUM(downloads_count) AS s FROM users', (err3, row3) => {
                if (err3) {
                    console.error('Error fetching downloads count', err3.message);
                } else if (row3 && row3.s != null) {
                    result.resumesGenerated = row3.s;
                }

                db.get(`SELECT COUNT(*) AS c FROM activities WHERE DATE(created_at) = DATE('now')`, (err4, row4) => {
                    if (err4) {
                        console.error('Error fetching today count', err4.message);
                    } else if (row4) {
                        result.todayGenerated = row4.c || 0;
                    }
                    res.json(result);
                });
            });
        });
    });
});

// Get recent users for admin dashboard
app.get('/api/admin/users', (req, res) => {
    db.all(`SELECT id, email, full_name, is_premium, downloads_count, last_active 
            FROM users 
            ORDER BY last_active DESC 
            LIMIT 10`, (err, rows) => {
        if (err) {
            console.error('Error fetching users', err.message);
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        res.json(rows || []);
    });
});

// Get recent activity for admin dashboard
app.get('/api/admin/activity', (req, res) => {
    db.all(`SELECT a.activity_type, a.description, a.created_at, u.full_name, u.email
            FROM activities a
            LEFT JOIN users u ON a.user_id = u.id
            ORDER BY a.created_at DESC
            LIMIT 10`, (err, rows) => {
        if (err) {
            console.error('Error fetching activity', err.message);
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        res.json(rows || []);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
