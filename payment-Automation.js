const { chromium } = require('playwright');

const STARTPAGE = 'https://okies-test.occ.ok.gov';
/*MAIN*/
(async () => {

  
  //Browser setup 
  const context = await chromium.launchPersistentContext('./my-user-data', {
    channel: 'chrome',
    headless: false,
    args: [
      '--start-maximized',
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-infobars'   
    ],
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    viewport: null
  });
  const page = await context.newPage();
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
  });

  


  await page.goto(STARTPAGE);
  // await page.pause(); //brings up playwright inspector 

})