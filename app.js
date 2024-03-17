const express = require('express');
const puppeteer = require('puppeteer-extra');
const xpathHelper = require('./xpathHelper');
const siteConfigs = require('./siteConfigs');
const ejs = require('ejs');
const fs = require('fs');

// Create views directory if it doesn't exist
if (!fs.existsSync('./views')){
    fs.mkdirSync('./views');
}
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const logError = (error) => {
 fs.appendFileSync('error.log', `${new Date().toISOString()} - ${error}\n`);
};

app.get('/', (req, res) => {
 res.render('index', { siteConfigs });
});

app.post('/search', async (req, res) => {
  const selectedSite = req.body.selectedSite;
  console.log('Selected Site:', selectedSite);
  const searchTerm = req.body.searchTerm;
  console.log('searchTerm:', searchTerm);
  const hdQuality = req.body.hdQuality;
  console.log('hdQuality:', hdQuality);
  const min_duration = req.body.min_duration;
  console.log('min_duration:', min_duration);
  const max_duration = req.body.max_duration;
  console.log('max_duration:', max_duration)
  let siteUrl = siteConfigs[selectedSite].searchURL + searchTerm.split(' ').join(siteConfigs[selectedSite].joiner);
     
  console.log('siteURL:', siteUrl)
   // Append HD quality parameter to the URL
if (hdQuality !== ""){
      siteUrl += '&hd=1';

}

// Append min_duration parameter if it's not "no limit"
if (min_duration !== "") {
    siteUrl += `&min_duration=${min_duration}`;
}

// Append max_duration parameter if it's not "no limit"
if (max_duration !== "") {
    siteUrl += `&max_duration=${max_duration}`;
}

console.log('siteURL:', siteUrl);

  try {
    const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox', ] });
    const page = await browser.newPage();
   // Set viewport to a typical desktop size
   //await page.setViewport({ width: 1920, height: 1080}); 

   // Added delay and additional logging
   await page.goto(siteUrl);
   await new Promise(r => setTimeout(r, 3550));

   // Save page HTML and screenshot for inspection
    const pageContent = await page.content();
    fs.writeFileSync('pageContent.html', pageContent);
    await page.screenshot({ path: 'screenshot.png' });

    const videos = await xpathHelper.extractVideoData(page, selectedSite);

    await browser.close();

    if (videos.length > 0) {
      res.render('results', { videos, siteUrl, searchTerm });
    } else {
      res.render('no-results', { siteUrl, searchTerm });
    }
  } catch (error) {
    logError(error);
    console.error(`Error occurred: ${error}`);
    res.status(500).send('An error occurred');
  }
});

app.listen(5000, () => {
 console.log('Server running on http://localhost:5000');
});