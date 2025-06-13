/* 
6/11/2025
Takes you to the OKIES ITD payment tab as quick as possible by filling in the rest of the form with the minimum requirements to get you there. Pauses at payment so that
you can make any edits neccessary, then if you prompt it with 'p' will finish up the form for you 



INSTRUCTIONS
- follow instructions in root directory 
- set the Email and password and your good to go

*/

/* VARS TO SET*/

let EMAIL = '' //email you want to log into okies with
let PASSWORD = '' //password you want to log into okies with 
let ENVIRONMENT_SEL = '' // valid ones are 'test' and 'uat' 



const { chromium } = require('playwright');
const readline = require('readline');

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
const ERROR_TIMEOUT = 10000 // how long in miliseconds to get stack trace if element cannot be found in general section of clicking through 
let OPERATOR_ASSERTION_CHECKS = undefined // dependant on environment
var randID = Math.floor(Math.random() * 1001);

//defining credit cart vars
const today = new Date(); 
const ccExpirYear = (today.getFullYear() + 1).toString()
has500 = false; 
let currentSegment = ''; 
let ccExpirMonth = ''
if(today.getMonth() + 1 < 10){
  ccExpirMonth = '0' + (today.getMonth() + 1).toString();
}else{
  ccExpirMonth = (today.getMonth() + 1).toString(); 
}



async function makePayment(page1, curFormURL){

  // console.log('Current URL:', currentUrl);
  //delimits at arguments so can just go to ID 

  let firstHalf = curFormURL.split('&');
  // console.log(firstHalf); 
  await page1.goto(firstHalf[0]); 
  page1.setDefaultTimeout(30000);
  await page1.waitForLoadState();
  page1.setDefaultTimeout(ERROR_TIMEOUT);


  //click get payment
  await page1.getByRole('button', { name: 'Payment' }).click();
  await page1.waitForTimeout(500) // wait to load 

  

  await page1.getByRole('button', { name: 'Pay by Credit Card' }).click();
  await page1.getByRole('button', { name: 'Confirm', exact: true }).click();

  page1.setDefaultTimeout(30000);
  await page1.waitForLoadState();
  page1.setDefaultTimeout(ERROR_TIMEOUT);

  await page1.getByLabel('Payment Type *').selectOption('CC');
  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.waitForTimeout(700);
  await page1.getByRole('textbox', { name: 'First Name *' }).fill('Name');
  await page1.getByRole('textbox', { name: 'Last Name *' }).fill('LastName');
  await page1.getByRole('textbox', { name: 'Address *' }).fill('135 Mohawk St, Cohoes, NY 12047');
  await page1.getByRole('textbox', { name: 'City *' }).fill('Cohoes');
  await page1.getByLabel('State *').selectOption('NY');
  await page1.getByRole('textbox', { name: 'ZIP/Postal Code *' }).fill('12047');
  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.waitForTimeout(700);

  await page1.getByRole('textbox', { name: 'Credit Card Number *' }).fill('4111111111111111');

  //must be later than the current date 
  await page1.getByLabel('Expiration Month *').selectOption(ccExpirMonth);
  await page1.getByLabel('Expiration Year *').selectOption(ccExpirYear);
  await page1.getByRole('textbox', { name: 'Security Code *' }).fill('921');
  await page1.getByRole('textbox', { name: 'Name on Credit Card *' }).fill('John Smith');
  //edited to allow for payment validation
  page1.setDefaultTimeout(40000); 
  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.getByRole('button', { name: 'Submit Payment' }).click();
  await page1.getByRole('button', { name: 'OK' }).click();
}

//allows for asking questions using readline: 
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}


(async () => {

  // if they are not set within file 
  //setting arguments 
  if(EMAIL == ''){
    EMAIL = process.argv[2];  
  }
  if(PASSWORD == ''){
    PASSWORD = process.argv[3];  
  }
  if(ENVIRONMENT_SEL == ''){
    ENVIRONMENT_SEL = process.argv[4];  
  }

  ENVIRONMENT_SEL = ENVIRONMENT_SEL.toLowerCase(); 

  //checking URL is right and making uat/test changes 
  if(ENVIRONMENT_SEL == 'test'){
    OPERATOR_ASSERTION_CHECKS = 53; 
  }else if(ENVIRONMENT_SEL == 'uat'){
    OPERATOR_ASSERTION_CHECKS = 53; 
  }else{
    console.log("'https://okies-"+ ENVIRONMENT_SEL+ ".occ.ok.gov/' is not supported, change your Environment selection. " );
    process.exit(0);
  }
  

  console.log("\nLogging you in with: \nEmail: " + EMAIL + "\nPassword: " + PASSWORD);

  const browser = await chromium.launch({
    channel: 'chrome',
    headless: false,
    args: [
      '--start-maximized',
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-infobars'   
    ],
  });
  const context = await browser.newContext({  viewport: null});
  const page = await context.newPage();

  page.on('response', (response) => {
    if (response.status() === 500) {
      has500 = true;
      console.log("------------------------------------------------------------------------------------------");
      console.log('*********************500 Error Occured*********************');
      console.log('*Wait 10 Seconds for rest of the error to populate*'); //neccessary so that doesn't jump the gun on loading times 
      console.log('Error Url: ' + response.url());
      console.log('When error Occured: ' +  new Date().toLocaleString('en-US', {hour12: false}));
    }
  });

  //Entire thing in Try-Catch block so that browser will stay open
  try{
    //login
    await page.goto('https://okies-'+ ENVIRONMENT_SEL+ '.occ.ok.gov/');
    await page.getByRole('button', { name: ' External User Access For' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).fill(EMAIL);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    //ensures new page is open 
    page.setDefaultTimeout(180000); //have 2 minutes to select 
    const page1Promise = page.waitForEvent('popup');
    console.log('\nAutomation Paused');
    console.log('You must select your Organization on your own, automation will continue from there!');
    // await page.evaluate(() => {
    //   alert("You must select your Organization on your own, automation will continue from there");
    // });

    await page.getByRole('link', { name: 'Notice of Intent To Drill (' }).click();
    console.log('Organization Selected and Login Completed!!\nAutomation Resumed...');
    

    //form information
    //ensures new page/tab is open
    currentSegment = '1. Form Information'
    const page1 = await page1Promise;
    //flow work as once this is recognized, timeout will occur and then will go to the catch block
    page1.on('response', (response) => {
      if (response.status() === 500) {
        has500 = true;
        console.log("------------------------------------------------------------------------------------------");
        console.log('*********************500 Error Occured*********************');
        console.log('*Wait 10 Seconds for rest of the error to populate*'); //neccessary so that doesn't jump the gun on loading times 
        console.log('Error Url: ' + response.url());
        console.log('When error Occured: ' +  new Date().toLocaleString('en-US', {hour12: false}));
      }
    });
    await page1.getByRole('combobox', { name: 'Notice of Intent to*' }).getByLabel('select').click();
    page1.setDefaultTimeout(ERROR_TIMEOUT);
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
    console.log('1. Form Information Populate!');


    //Operator Info
    currentSegment = '2. Operator Info'
    page1.setDefaultTimeout(30000);
    await page1.waitForLoadState();
    page1.setDefaultTimeout(ERROR_TIMEOUT);
    await page1.getByRole('button', { name: 'Next', exact: true }).click();
    console.log('2. Operator Info Populated!');


    //Well Information
    currentSegment = '3. Well Information'
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
    console.log('3. Well Information Populated!');


    //Geologic Info
    currentSegment = '4. Geologic Info'
    await page1.waitForTimeout(1000); //wait for 1 second
    await page1.getByRole('button', { name: 'Actions' }).click();
    await page1.getByRole('link', { name: 'Add Zone' }).click();
    await page1.getByRole('combobox', { name: 'Zone Category*' }).getByLabel('select').click();
    await page1.getByRole('option', { name: 'Target' }).click();
    await page1.getByRole('combobox', { name: 'Zone Name*' }).getByLabel('select').click();
    await page1.getByText('1ST BROMIDE - 202BRMD1').first().click();
    await page1.getByRole('button', { name: 'Save' }).nth(1).click();
    await page1.getByRole('button', { name: 'Next', exact: true }).click();
    console.log('4. Geologic Info Populated!');

    //Order Notations
    currentSegment = '5. Order Notations'
    await page1.waitForTimeout(1000); //wait for 1 second
    await page1.locator('#NoticeGivenContainer').getByRole('button', { name: 'select' }).click();
    await page1.getByRole('option', { name: 'Yes' }).click();
    await page1.locator('#DoesApplicantDifferContainer').getByRole('button', { name: 'select' }).click();
    await page1.getByRole('option', { name: 'No', exact: true }).click();
    await page1.getByRole('button', { name: 'Next', exact: true }).click();
    console.log('5. Order Notations Populated!');

    //Pits + Features and Cement + Document Upload
    currentSegment = '6. Pits'
    await page1.waitForTimeout(1000); //wait for 1 second
    await page1.getByRole('button', { name: 'Next', exact: true }).click();
    currentSegment = '7. Features and Cement'
    await page1.waitForTimeout(1000); //wait for 1 second
    await page1.getByRole('button', { name: 'Next', exact: true }).click();
    currentSegment = '8. Document Upload'
    await page1.waitForTimeout(1000); //wait for 1 second
    await page1.getByRole('button', { name: 'Next', exact: true }).click();
    console.log('6. Pits Populated!');
    console.log('7. Features and Cement skipped (not neccesarry for minimum)!');
    console.log('8. Document Upload (not neccesarry for minimum)!');


    //Operator Assertions
    currentSegment = '9. Operator Assertions'
    await page1.waitForTimeout(1000); //wait for 1 second
    for(let i = 0; i < OPERATOR_ASSERTION_CHECKS; i++){
      await page1.locator('#OperatorAssertions_'+ i + '__AssertionResponse_Yes').check();  
    }
    await page1.getByRole('button', { name: 'Next' }).click();
    console.log('9. Operator Assertions Populated!');


    
    //Make Payment
    //make month and year >= current Month/year   
    currentSegment = '10. Make Payment'
    const currentUrl = page1.url();
    console.log("------------------------------------------------------------------------------------------");
    console.log("\nForms 1->9 have been Successfully filled with minimum requirements!!");
    console.log("Automation Paused");
    console.log("Take your time to make any edits to any of the sections");

    //don't need the question for now
    // let input = await askQuestion("Whenever you are ready to make payment and submit the form, type 'p' and hit enter:\n");
    // while (input.toLowerCase() !== 'p'){
    //   input = await askQuestion("Did not recognize that command, try again!\n");
    // }

    console.log('Automation Resumed...');

    await makePayment(page1, currentUrl); 
    console.log('10. Payment made!');


    
    // Form Submit
    currentSegment = '11. Form Submit'
    await page1.getByRole('button', { name: 'Form Submit' }).click();
    
    await page1.waitForTimeout(1000); //wait for 1 second
    page1.setDefaultTimeout(ERROR_TIMEOUT);
    await page1.getByRole('checkbox', { name: 'I hereby certify all' }).check();
    await page1.getByRole('button', { name: 'Submit', exact: true }).click();
    await page1.waitForTimeout(2000); //wait for 2 seconds
    console.log("------------------------------------------------------------------------------------------");
    console.log('\nForm Successfully Submitted!!')
    console.log('Hit Ctrl+C to terminate the Script and close the window (so you can run again!)')
  }catch (error){
    if(has500){
      console.error('\nError occurred:', error);
      console.log("Error Occured on section:  " + currentSegment)
      if (error.stack){
        const stackLines = error.stack.split('\n');
        const relevantLine = stackLines[1]; //last thing callsed 
        console.log("Last Button/Click attempt: " + relevantLine)
      }

    //store the last completed segment and output it 
    //PLaywright line it error at
    }else{
      console.log("------------------------------------------------------------------------------------------");
      console.error('\nError occurred:', error);
      console.log('Browser will stay open for debugging.\nHit Control+C to Terminate current script and try again');  
    }
  }
  
})();