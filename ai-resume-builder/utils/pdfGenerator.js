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

    // You can extend this function to render the rest
    // of the resume (experience, education, skills, etc.)
    // For now we'll leave the body minimal so the route continues to work.

    return await pdfDoc.save();
}

module.exports = { createPDF };

