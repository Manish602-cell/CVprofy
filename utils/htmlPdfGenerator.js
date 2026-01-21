const puppeteer = require('puppeteer');

/**
 * Render an HTML string to a PDF buffer, preserving CSS/theme/colors (printBackground enabled).
 * The HTML should be a full document (or at least valid HTML that can be wrapped).
 */
async function createPdfFromHtml(html) {
    const browser = await puppeteer.launch({
        headless: 'new',
        // These flags improve reliability in some sandboxed environments.
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
        const page = await browser.newPage();

        // Use a reasonable default viewport (doesn't control PDF size directly, but helps layout).
        await page.setViewport({ width: 1240, height: 1754 }); // ~A4 @150dpi-ish

        await page.setContent(html, { waitUntil: 'networkidle0' });

        // Give the browser a tick to finish layout/fonts.
        await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: true,
            margin: { top: '12mm', right: '12mm', bottom: '12mm', left: '12mm' },
        });

        return pdfBuffer;
    } finally {
        await browser.close();
    }
}

module.exports = { createPdfFromHtml };

