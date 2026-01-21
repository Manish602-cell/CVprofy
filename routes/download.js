const express = require('express');
const router = express.Router();
const { createPDF } = require('../utils/pdfGenerator');
const { createPdfFromHtml } = require('../utils/htmlPdfGenerator');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '..', 'db', 'users.db');
const db = new sqlite3.Database(dbPath);

router.post('/pdf', async (req, res) => {
    try {
        const { userData, isPremium, template, photoBase64 } = req.body;

        // Pass all new params
        const pdfBytes = await createPDF(userData, isPremium, template, photoBase64);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
        res.send(Buffer.from(pdfBytes));
    } catch (e) {
        console.error(e);
        res.status(500).send("Error generating PDF");
    }
});

// Generate PDF from the *original preview HTML/CSS* so the downloaded file matches the page exactly.
router.post('/pdf-original', async (req, res) => {
    try {
        const { html, filename } = req.body || {};

        if (!html || typeof html !== 'string') {
            return res.status(400).send('Missing html');
        }

        const pdfBuffer = await createPdfFromHtml(html);

        const safeName = (filename && typeof filename === 'string' ? filename : 'resume')
            .replace(/[^\w\- ]+/g, '')
            .trim()
            .slice(0, 80) || 'resume';

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${safeName}.pdf`);
        res.send(pdfBuffer);
    } catch (e) {
        console.error(e);
        res.status(500).send("Error generating PDF");
    }
});

module.exports = router;
