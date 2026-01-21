const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

// Helper component
async function createPDF(data, isPremium, template, photoBase64) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    // Embed Fonts
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Embed Photo if present
    let photoImage;
    if (photoBase64) {
        try {
            // Detect type
            if (photoBase64.startsWith('data:image/png')) {
                photoImage = await pdfDoc.embedPng(photoBase64);
            } else if (photoBase64.startsWith('data:image/jpeg') || photoBase64.startsWith('data:image/jpg')) {
                photoImage = await pdfDoc.embedJpg(photoBase64);
            }
        } catch (e) {
            console.error("Failed to embed image", e);
        }
    }

    let yPosition = height - 50;
    const margin = 50;

    // --- Template Logic (Basic) ---
    // If Modern, add blue header bar
    if (template === 'modern') {
        page.drawRectangle({
            x: 0,
            y: height - 150,
            width: width,
            height: 150,
            color: rgb(0.14, 0.38, 0.92) // #2563eb
        });
        yPosition = height - 60;
    } else if (template === 'bold') {
        page.drawRectangle({
            x: 0,
            y: height - 180,
            width: width,
            height: 180,
            color: rgb(0.11, 0.16, 0.23) // #1e293b
        });
        yPosition = height - 60;
    }

    // --- Header Content ---

    // Photo drawing
    if (photoImage) {
        const photoDims = photoImage.scale(0.5);
        // Constrain size
        const maxDim = 80;
        let pWidth = photoDims.width;
        let pHeight = photoDims.height;
        if (pWidth > maxDim) {
            const scale = maxDim / pWidth;
            pWidth = pWidth * scale;
            pHeight = pHeight * scale;
        }

        page.drawImage(photoImage, {
            x: width - margin - pWidth, // Top right
            y: height - 50 - pHeight,
            width: pWidth,
            height: pHeight
        });
    }

    // Name & Title
    const textColor = (template === 'bold' || template === 'modern') ? rgb(1, 1, 1) : rgb(0, 0, 0);

    page.drawText(data.fullName || "Name", { x: margin, y: yPosition, size: 24, font: fontBold, color: textColor });
    yPosition -= 25;
    page.drawText(data.jobRole || "Job Title", { x: margin, y: yPosition, size: 14, font: font, color: textColor });
    yPosition -= 30;

    // Contact (Simple list)
    if (template === 'modern' || template === 'bold') {
        yPosition -= 15; // Padding for header exit
    }

    // Reset color to black for body
    const bodyColor = rgb(0.2, 0.2, 0.2);

    const contactString = [data.email, data.phone, data.address].filter(Boolean).join(' | ');
    page.drawText(contactString, { x: margin, y: yPosition, size: 10, font: font, color: bodyColor });
    yPosition -= 30;

    // Helper for lines
    const drawSection = (title) => {
        page.drawText(title.toUpperCase(), { x: margin, y: yPosition, size: 12, font: fontBold, color: rgb(0.14, 0.38, 0.92) });
        // Line
        page.drawLine({
            start: { x: margin, y: yPosition - 5 },
            end: { x: width - margin, y: yPosition - 5 },
            thickness: 1,
            color: rgb(0.8, 0.8, 0.8),
        });
        yPosition -= 25;
    };

    // Summary
    if (data.summary) {
        drawSection("Profile");
        page.drawText(data.summary, { x: margin, y: yPosition, size: 10, font: font, color: bodyColor, maxWidth: width - (margin * 2) });
        yPosition -= 40; // Approx logic, real app needs height calc
    }

    // Experience
    if (data.experience && data.experience.length) {
        drawSection("Experience");
        data.experience.forEach(exp => {
            page.drawText(`${exp.title || ''} at ${exp.company || ''}`, { x: margin, y: yPosition, size: 11, font: fontBold });
            page.drawText(`${exp.start || ''} - ${exp.end || ''}`, { x: width - margin - 150, y: yPosition, size: 10, font: font, opacity: 0.7 });
            yPosition -= 15;
            if (exp.description) {
                page.drawText(exp.description, { x: margin, y: yPosition, size: 10, font: font, maxWidth: width - (margin * 2), color: bodyColor });
                yPosition -= 30;
            }
            yPosition -= 10;
        });
    }

    // Education
    if (data.education && data.education.length) {
        drawSection("Education");
        data.education.forEach(edu => {
            page.drawText(`${edu.degree || ''}, ${edu.institution || ''}`, { x: margin, y: yPosition, size: 11, font: fontBold });
            page.drawText(`${edu.year || ''}`, { x: width - margin - 50, y: yPosition, size: 10, font: font });
            yPosition -= 20;
        });
    }

    // Watermark
    if (!isPremium) {
        page.drawText('Created with Free CV Builder', {
            x: width / 2 - 80,
            y: 20,
            size: 10,
            font: font,
            color: rgb(0.7, 0.7, 0.7),
        });
    }

    return await pdfDoc.save();
}

module.exports = { createPDF };
