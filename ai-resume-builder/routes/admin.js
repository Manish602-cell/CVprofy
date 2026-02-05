// Placeholder admin router to match desired project structure.
// NOTE: The actual admin APIs are currently defined in server.js
// (e.g. /api/admin/login, /api/admin/overview, /api/admin/users, /api/admin/activity).
// This file is ready if you later want to move that logic here.

const express = require('express');
const router = express.Router();

// Example stub route so this router is valid if mounted.
router.get('/health', (req, res) => {
    res.json({ ok: true });
});

module.exports = router;

