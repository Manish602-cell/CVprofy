// Utils for constructing AI prompts

const constructResumePrompt = (data) => {
    return `
You are an expert professional resume writer and ATS optimization specialist.

Generate a clean, ATS-friendly resume for a ${data.jobRole} with ${data.experienceLevel} experience.

Candidate Information:
Name: ${data.fullName}
Skills: ${data.skills}
Experience: ${data.workExperience || 'N/A'}
Projects: ${data.projects || 'N/A'}
Education: ${data.education || 'N/A'}
Certifications: ${data.certifications || 'N/A'}

Instructions:
- Use clear section headings: "Summary", "Skills", "Experience", "Education", "Projects"
- Use bullet points only for descriptions
- Quantify achievements where possible
- Optimize for ATS keyword matching
- Avoid tables, icons, emojis, or graphics
- Professional and concise tone
- Limit to 1 page if fresher, 2 pages if experienced

Output ONLY the content in a structured JSON format with this schema, do NOT include markdown code blocks:
{
  "summary": "Professional summary...",
  "skills": ["Skill 1", "Skill 2"],
  "experience": [
    { "title": "Job Title", "company": "Company Name", "duration": "Dates", "details": ["Bullet 1", "Bullet 2"] }
  ],
  "education": [
    { "degree": "Degree", "institution": "School", "year": "Year" }
  ],
  "projects": [
    { "name": "Project Name", "description": "Description" }
  ]
}
`;
};

const constructCoverLetterPrompt = (data) => {
    return `
You are a professional career coach.

Write a personalized cover letter for a ${data.jobRole} role.

Candidate Details:
Name: ${data.fullName}
Skills: ${data.skills}
Experience: ${data.workExperience || 'N/A'}

Job Description Context (if provided):
${data.jobDescription || 'General application'}

Rules:
- Maximum 300 words
- Professional and confident tone
- Show value to employer
- Align skills with job requirements
- No generic phrases

Output ONLY the plain text of the cover letter body.
`;
};

module.exports = { constructResumePrompt, constructCoverLetterPrompt };
