/* 
6/11/2025
Takes you to the OKIES ITD payment tab as quick as possible by filling in the rest of the form with the bare minimum to get there 

INSTRUCTIONS
- follow instructions in root directory 
- set the setup variables and your good to go. 

*/

const { chromium } = require('playwright');

/*Random Entry Variable Generation*/

// Enum-like object
const HoleType = {
  DIRECTIONAL: 'Directional Hole',
  HORIZONTAL: 'Horizontal Hole',
  MULTI: 'Multi Unit',
  VERTICAL: 'Vertical Hole'
};
// Assigning a value
const holeType = HoleType.MULTI;

//Well Types
const WellType = {
  COMMERCIAL : 'Commercial Disposal',
  INJECTION : 'Injection',
  NONCOMM : 'Non-Commercial Disposal',
  OIL : 'Oil & Gas',
  STRATIGRAPHIC : 'Stratigraphic Test',
  UNDERGROUND : 'Underground Storage',
  WATER : 'Water Supply',
}
var wellType = WellType.OIL;

//Permit Types
const PermitType = {
  NON : 'Non-Expedited',
  EXPEDITED : 'Expedited',
  TEMP : 'Temporary',
}
var permitType = PermitType.NON;

var randID = Math.floor(Math.random() * 1001);


/* VARS TO SET*/
const LOGIN_FILE_NAME = 'auth.json';  

(async () => {
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
  const context = await browser.newContext({ storageState: 'loginJsons/' + LOGIN_FILE_NAME });
  const page = await context.newPage();

  //form information
  await page.goto('https://okies-test.occ.ok.gov/General/Home/Landing');
  
  //ensures new page is open 
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Notice of Intent To Drill (' }).click();
  //ensures new page/tab is open
  const page1 = await page1Promise;
  await page1.getByRole('combobox', { name: 'Notice of Intent to*' }).getByLabel('select').click();
  //Set Hole Type as specificied above
  await page1.getByRole('option', { name: 'Drill' }).click();
  await page1.locator('span').filter({ hasText: 'Directional HoleHorizontal' }).getByLabel('select').click();
  await page1.getByRole('option', { name: holeType }).click();
  //Set Well Type as specified above
  await page1.getByRole('combobox', { name: 'Type of Well*' }).getByLabel('select').click();
  await page1.getByRole('option', { name: wellType }).first().click();
  //Set Permit Type as specified above
  await page1.locator('div:nth-child(26) > .k-picker > .k-input-button').click();
  await page1.getByRole('option', { name: permitType, exact: true  }).click();
  await page1.getByRole('button', { name: 'Save & Continue' }).click();
  await page1.getByRole('button', { name: 'Confirm' }).click();


  //Operator Info
  await page1.waitForTimeout(1000); //wait for 1 second
  await page1.getByRole('button', { name: 'Next', exact: true }).click();



  //Well Information
  await page1.waitForTimeout(1000); //wait for 1 second
  await page1.getByTestId('wi-well-name').click();
  await page1.getByTestId('wi-well-name').fill(wellType + ' ' + holeType + ' ' + permitType + ' ' + randID);
  await page1.getByTestId('wi-well-number').click();
  await page1.getByTestId('wi-well-number').fill('123');
  await page1.locator('#SectionContainer').getByRole('button', { name: 'select' }).click();
  await page1.getByRole('option', { name: '01' }).click();
  await page1.locator('#TownshipContainer').getByRole('button', { name: 'select' }).click();
  await page1.getByRole('option', { name: '01N' }).click();
  await page1.locator('#RangeContainer').getByRole('button', { name: 'select' }).click();
  await page1.getByRole('option', { name: '01E' }).click();
  await page1.locator('#MeridianContainer').getByRole('button', { name: 'select' }).click();
  await page1.getByRole('option', { name: 'CM' }).click();
  await page1.locator('#CountyContainer').getByRole('button', { name: 'select' }).click();
  await page1.getByRole('option', { name: 'Choctaw' }).click();
  await page1.locator('#NorthSouthOffsetContainer').getByRole('spinbutton').click();
  await page1.getByTestId('wi-north-south-offset').fill('123');
  await page1.locator('#NorthSouthContainer').getByRole('button', { name: 'select' }).click();
  await page1.getByRole('option', { name: 'North' }).click();
  await page1.locator('#EastWestOffsetContainer').getByRole('spinbutton').click();
  await page1.getByTestId('wi-east-west-offset').fill('123');
  await page1.locator('#EastWestContainer').getByRole('button', { name: 'select' }).click();
  await page1.getByRole('option', { name: 'East' }).click();
  await page1.locator('#Quarter').click();
  await page1.locator('#Quarter').fill('1');
  await page1.locator('#LatitudeContainer').getByRole('spinbutton').click();
  await page1.getByTestId('wl-latitude').fill('123');
  await page1.locator('#LongitudeContainer').getByRole('spinbutton').click();
  await page1.getByTestId('wl-longitude').fill('123');
  await page1.locator('#GroundElevationContainer').getByRole('spinbutton').click();
  await page1.getByTestId('wi-ground-information').fill('123');
  await page1.locator('#BaseTreatableWaterContainer').getByRole('spinbutton').click();
  await page1.getByTestId('wi-base-treatable-water').fill('123');
  await page1.locator('#PropertyBoundaryDistanceContainer').getByRole('spinbutton').click();
  await page1.getByTestId('wl-property-distance').fill('123');
  await page1.getByRole('button', { name: 'Next', exact: true }).click();

  //Geologic Info
  await page1.waitForTimeout(1000); //wait for 1 second
  await page1.getByRole('button', { name: 'Actions' }).click();
  await page1.getByRole('link', { name: 'Add Zone' }).click();
  await page1.getByRole('combobox', { name: 'Zone Category*' }).getByLabel('select').click();
  await page1.getByRole('option', { name: 'Target' }).click();
  await page1.getByRole('combobox', { name: 'Zone Name*' }).getByLabel('select').click();
  await page1.getByText('1ST BROMIDE - 202BRMD1').first().click();
  await page1.getByRole('button', { name: 'Save' }).nth(1).click();
  await page1.getByRole('button', { name: 'Next', exact: true }).click();

  //Order Notations
  await page1.waitForTimeout(1000); //wait for 1 second
  await page1.locator('#NoticeGivenContainer').getByRole('button', { name: 'select' }).click();
  await page1.getByRole('option', { name: 'Yes' }).click();
  await page1.locator('#DoesApplicantDifferContainer').getByRole('button', { name: 'select' }).click();
  await page1.getByRole('option', { name: 'No', exact: true }).click();
  await page1.getByRole('button', { name: 'Next', exact: true }).click();

  //Pits + Features and Cement + Document Upload
  await page1.waitForTimeout(1000); //wait for 1 second
  await page1.getByRole('button', { name: 'Next', exact: true }).click();
  await page1.waitForTimeout(1000); //wait for 1 second
  await page1.getByRole('button', { name: 'Next', exact: true }).click();
  await page1.waitForTimeout(1000); //wait for 1 second
  await page1.getByRole('button', { name: 'Next', exact: true }).click();


  //Operator Assertions
  await page1.waitForTimeout(1000); //wait for 1 second
  for(let i = 0; i < 47; i++){
    await page1.locator('#OperatorAssertions_'+ i + '__AssertionResponse_Yes').check();  
  }
  await page1.getByRole('button', { name: 'Next' }).click();

  // Form Submit
  await page1.waitForTimeout(1000); //wait for 1 second
  await page1.getByRole('checkbox', { name: 'I hereby certify all' }).check();
  await page1.getByRole('button', { name: 'Submit', exact: true }).click();
  await page1.waitForTimeout(2000); //wait for 2 second
  // await page.locator('#idNext').click();
  await page1.getByRole('button', { name: 'Next', exact: true }).click();

  console.log('Successfully navigated to Payment Tab!!!')
  
})();