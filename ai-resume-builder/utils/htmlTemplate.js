// Utility for building a simple HTML resume template from user data.
// Currently not wired into the main PDF flow (the frontend sends
// fully-rendered HTML for /api/download/pdf-original), but this is
// ready if you want the backend to generate HTML itself.

function buildResumeHtml(userData = {}) {
    const {
        fullName = 'Your Name',
        jobRole = 'Job Title',
        email = '',
        phone = '',
        address = '',
        summary = '',
        skills = '',
        experience = [],
        education = [],
    } = userData;

    const skillsList = typeof skills === 'string'
        ? skills.split(',').map(s => s.trim()).filter(Boolean)
        : Array.isArray(skills) ? skills : [];

    const expHtml = Array.isArray(experience) ? experience.map(exp => `
        <div class="resume-item">
            <div class="resume-item-header">
                <span>${exp.title || ''}</span>
                <span>${exp.start || ''}${exp.end ? ' - ' + exp.end : ''}</span>
            </div>
            <div class="resume-item-sub">${exp.company || ''}</div>
            <div class="resume-item-desc">${exp.description || ''}</div>
        </div>
    `).join('') : '';

    const eduHtml = Array.isArray(education) ? education.map(edu => `
        <div class="resume-item">
            <div class="resume-item-header">
                <span>${edu.degree || ''}</span>
                <span>${edu.year || ''}</span>
            </div>
            <div class="resume-item-sub">${edu.institution || ''}</div>
        </div>
    `).join('') : '';

    const skillsHtml = skillsList.map(s => `<li>${s}</li>`).join('');

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="/style.css" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
</head>
<body class="app-body">
  <div class="preview-pane" style="padding:32px;background:#e2e8f0;">
    <div class="preview-wrapper">
      <div class="resume-paper classic">
        <div class="resume-header">
          <div class="header-text">
            <h1>${fullName}</h1>
            <p class="highlight">${jobRole}</p>
            <div class="contact-info">
              ${email ? `<span>${email}</span>` : ''}
              ${phone ? `<span>${phone}</span>` : ''}
              ${address ? `<span>${address}</span>` : ''}
            </div>
          </div>
        </div>
        <div class="resume-body">
          ${summary ? `
          <div class="resume-section">
            <h2 class="section-title">Profile</h2>
            <p>${summary}</p>
          </div>` : ''}

          ${expHtml ? `
          <div class="resume-section">
            <h2 class="section-title">Experience</h2>
            ${expHtml}
          </div>` : ''}

          ${eduHtml ? `
          <div class="resume-section">
            <h2 class="section-title">Education</h2>
            ${eduHtml}
          </div>` : ''}

          ${skillsHtml ? `
          <div class="resume-section">
            <h2 class="section-title">Skills</h2>
            <ul class="skills-grid">
              ${skillsHtml}
            </ul>
          </div>` : ''}
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

module.exports = { buildResumeHtml };

