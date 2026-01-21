const OpenAI = require('openai');
const { constructResumePrompt, constructCoverLetterPrompt } = require('./aiPrompts');
require('dotenv').config();

// If no real API key is provided, instantiate the client with a dummy key
// so the OpenAI SDK doesn't throw, and rely on the mock branches below.
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'your_key_here',
});

const generateResumeContent = async (userData) => {
    try {
        const prompt = constructResumePrompt(userData);

        // Mock response if no API key is set or for testing to save credits
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_key_here') {
            console.log("Mocking OpenAI Response");
            return {
                summary: `Motivated ${userData.jobRole} with experience in ${userData.skills}.`,
                skills: userData.skills.split(',').map(s => s.trim()),
                experience: userData.workExperience ? [{ title: "Mock Job", company: "Mock Co", duration: "2020-Present", details: ["Did great things", "Optimized workflows"] }] : [],
                education: userData.education ? [{ degree: "Mock Degree", institution: "Mock Uni", year: "2020" }] : [],
                projects: userData.projects ? [{ name: "Mock Project", description: "Built a cool thing" }] : []
            };
        }

        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
        });

        const content = completion.choices[0].message.content;
        try {
            return JSON.parse(content);
        } catch (e) {
            console.error("Failed to parse JSON from AI", content);
            // Fallback strategy could go here
            return null;
        }
    } catch (error) {
        console.error("Error generating resume:", error);
        throw error;
    }
};

const generateCoverLetterContent = async (userData) => {
    try {
        const prompt = constructCoverLetterPrompt(userData);

        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_key_here') {
            return `Dear Hiring Manager,\n\nI am writing to express my interest in the ${userData.jobRole} position. With my background in ${userData.skills}, I am confident in my ability to contribute.\n\nSincerely,\n${userData.fullName}`;
        }

        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error("Error generating cover letter:", error);
        throw error;
    }
};

module.exports = { generateResumeContent, generateCoverLetterContent };
