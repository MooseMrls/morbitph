const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();
    const urls = [];
    const queries = ['coding', 'dashboard', 'mobile app', 'ecommerce'];
    
    for(let q of queries) {
        await page.goto(`https://pixabay.com/videos/search/${encodeURIComponent(q)}/`);
        await page.waitForSelector('video source');
        const src = await page.evaluate(() => {
            const source = document.querySelector('video source');
            return source ? source.src : null;
        });
        urls.push({ query: q, src: src });
    }
    console.log(JSON.stringify(urls, null, 2));
    await browser.close();
})();
