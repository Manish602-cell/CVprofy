const express = require('express');
const router = express.Router();
const { generateResumeContent, generateCoverLetterContent } = require('../utils/resumeGenerator');

router.post('/', async (req, res) => {
    try {
        const userData = req.body;

        // Parallel generation
        const [resume, coverLetter] = await Promise.all([
            generateResumeContent(userData),
            generateCoverLetterContent(userData)
        ]);

        res.json({ success: true, resume, coverLetter });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
