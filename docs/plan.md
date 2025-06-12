## Flow of script 
- Go in incognito

- open instance with saved user data 
- start to fill out a form 
- get through form as quick as possible and pause at payment 
- opportunity to go back and fill certain things out 


## Requirements
- must pull login info, so can setup from a certain account

## Future additions 
- clean up files with functions and such 
- randomizing, yes/no selections
- make 47 a const
- change things to await page1.waitForLoadState();
- psuedo support
- - add in alerts in actual browser 
   - have kevin change repo name 
    

## Learned 
  - auth is the more intuitive way to store vs my-user-data
  - USE PLAYWRIGHT INSPECTOR TO FIND ELEMENTS 
  - role based finding is much easier than tabbing 
  - will auto scroll when searching for elements by their CSS 
  - recorder lays a good base, but be cautious about it ad ID may be difficult 


## Storing login 
  - if internal, do it yourself, if external, will automate



## New Goals 
  - save multiple Login functionality to a branch, for further development 
  - get something out that is bare bones, put OKIES login at the Top and takes you to payment 
    - fill out form to get to bear minimum  √
    - notify user to click p to pay √
    - p command to pay (o)
      - copy URL and go to: https://okies-test.occ.ok.gov/OnlineForm/ViewProfileRequest/Create?requestID=1197 then initiate payment by clicking on payment to left 

    - in order to do so, account for organizations √
    - also make a note of allowing permissions in certain machines √
    - and different NPM format √
    - update documentation √
    - note the permutation in documentation √
    - note that opens up a chrome instance with none of your pluggings √
    - arguments to terminal √
    - note Control c to cancel√ 
    - document form permutation this automates √
    - ask for which other permuations would be most helpful √
    - don't touch anything on screen while it is running √
    - disclaimer, if new edits made to site form may break √
    - test uat before good √
    - note that if it stops wait 10s and it will give you an error √
    - see if selecting Organization times out √
    - note going to have to be updated on new deployments √
      - Obviously, both are living environments, so if √
    - stay up on test and UAT changes √
    - reach out to the BAs about this 
    - write the commands exactly as such, if you need sudo, reach out to me √
    - If get error: Error occurred: locator.click: Timeout 10000ms exceeded. that means a page took too long to load, so try again. If issue persists, you may have found a bug! √
    - can run multiple scripts at once√
 

### Getting people onboarded: 
  - finish docs √
  - record using demo (BA-terminal, QA- Visual studio code), with things I need from them if they are interested, if any issues reachout, I'll be very responsive, note it will break when test/uat are updated 
  - send to main OKIES channel 
  - update Anthony 
  - record setup demo 

  
  - send out invites 
  - github desktop 
  - accept invitation via email 

Fix assumption that people are in an organization for multiple profile version \



do demo in vs code 

    

  - internal login support 
  


  1. Stops at payment, one command to contine
  1. Support different form permuations 
  2. Better debugging, know exactly where click/entry failed (just parsing the messge)
  3. Controller view, user can type in a command 1,2,3,4 to fill out corresponding section 
  4. Get User Data in so can do all of above + have chrome exentions 
  5. Fit to format of plugging automation scripts - encorporate their logging


  - add in tells you where you went wrong functionality on 500
  - logic to say stop here when running it with an argument 

  - Try to get something running that works within the current instance of chrome 
    - so that anthony can have his browser extensions

  - See what I can do with multiple log-in things
  - log when each section has been completed
  

After get this out, work on conventions and model it off of the plugging repo =
Plugging is a good example for conventions in the future 
look into playwright recorder, will write as you go


