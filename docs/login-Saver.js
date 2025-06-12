/* 
6/11/2025
Creates a .json file that stores your specific OKIES login session into /loginJsons (note that if folder not present yet, it will make it on the first run) 
allows for multiple accounts to be made. 

INSTRUCTIONS
- follow instructions in root directory 
- set the setup variables and your good to go. 

*/

const { chromium } = require('playwright');

const STARTPAGE = 'https://okies-test.occ.ok.gov';


/* VARS TO SET*/
const IS_EXTERNAL = true;   
const LOGIN_FILE_NAME = 'auth.json';  

/* Only fill in if logging in to internal */
const TIME_TO_LOGIN = 40; 
/* Only fill in if logging in to external */
const EMAIL = 'joseph.fodera@troyweb.com'; //numbers of emails per page
const PASSWORD = ''; //which email to start at, first is 1
const ORGANIZATION_NAME = 'VALPOINT OPERATING LLC'; 




/*MAIN*/
(async () => {

  
  //Browser setup 
  const browser = await chromium.launch({
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
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
  });

  await page.goto(STARTPAGE);

  if(IS_EXTERNAL){
    //login externally
    await page.getByRole('button', { name: ' External User Access For' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).fill(EMAIL);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);
    await page.getByRole('button', { name: 'Sign in' }).click();
    // await page.pause(); //brings up playwright inspector 
    // await page.getByRole('combobox', { name: 'Select an Organization*' }).click();
    // await page.locator('span.k-list-item-text:has-text("'+ ORGANIZATION_NAME + '")').click();

    // await page.getByRole('button', { name: 'Continue' }).click();
    

  }else{
    console.log("You have "+ TIME_TO_LOGIN+ "s to Log in Internally, stay at homepage until timer finishes"); 
    let count = TIME_TO_LOGIN; 
    while (count != 0){
      console.log(count); 
      await page.waitForTimeout(995); 
      count -= 1; 
    }
    console.log("Time Up! Saving Storage to '" + LOGIN_FILE_NAME + "'."); 
  }

  
  // Save auth state

  
  await context.storageState({ path: "loginJsons/" + LOGIN_FILE_NAME });

  console.log("Login saved to '" + LOGIN_FILE_NAME + "' !"); 
  await browser.close();



})();