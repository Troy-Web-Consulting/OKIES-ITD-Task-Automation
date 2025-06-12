# Instructions 

  - Setup Demo Video Link 
  - Using It Demo 
  - Using It Demo (if you want to use VScode integrated terminal)
  

## Setup (Only Once) 

- note: you may be prompted to install git, that once be neccessarry

#### 1. Pull the github repo

#### 2. Open Terminal/Powershell and navigate to root directory of this github:
 - ```cd .../OKIES-Payment-Automation```

#### 3. Initialize Node Project (copy and paste these command into the terminal)
  - ```npm init -y```

#### 4. Install npm 
  - ```npm install```

#### 5. Install Playwright dependencies 
  - ```npm install playwright```  
#### 5. Install Playwright 
  - ```npx playwright install```

## How to Run: 
#### 1. Open Terminal/Powershell and navigate to root directory of this github:
 - ```cd .../OKIES-Payment-Automation```

#### 2. Run a Command structured like this:
 - ```node ITD-Payment-Tester 'email' 'password' 'testing-environment'```
   - **'email'** - The email of the external okies account you want to use
   - **'password'** - The password of the external okies account you want to use
     - note there are no privacy concerns as this is the same thing as opening up the browser and typing it in
   - **'testing-environment'** - can either be 'uat' or 'test'
     - this determines what environment the script will run on 

    

  - some example commands 
    - ```node ITD-Payment-Tester joseph.fodera@troyweb.com myPassword uat```
    - ```node ITD-Payment-Tester joseph.fodera+1@troyweb.com myPassword test```
    - if you need to use sudo reach out to me (not currently supported but easy fix)

  - running these commands will initiate the script!
  -  While it is running do not click around in the browser unless instructed and keep your terminal open as you will get updates on the scripts progress!!
## How to Use:
  #### The general flow of the script is as follows: 
  - it will log you in to OKIES
  - give you the opportunity to pick your organization if your in multiple (if not don't worry about it) 
  - Fill out ITD sections 1->9 with the minimum requirements to submit
  - it will then pause, giving you this message in the terminal
    ```
    Forms 1->9 have been Successfully filled with minimum requirements!!
    Automation Paused
    Take your time to make any edits to any of the sections
    Whenever you are ready to make payment and submit the form, type 'p' and hit enter:
    ```
    - when you are done making any edits you would like hit p and the automation will resume, finishing up payment and submission 
    - in order to cancel the script at any time, open the terminal and press CTRL+C
## Error-Reporting Functionaly: 
  - If things stopped being clicked on in your browser, look at your terminal and see if it has notified you that ```Automation Paused``` if it has not, wait 10s 
  - After 10s an error message similar to this will appear in the console: 
    ```
    Error occurred: locator.click: Timeout 10000ms exceeded.
    Call log:
      - waiting for getByRole('button', { name: 'Pay by Credit Card' })
        - waiting for" https://okies-uat.occ.ok.gov/OnlineForm/ViewProfileRequest/Create" navigation to finish... 
        and so on 
  - The browser will still be open and you can click around to try and see why caused the automation to stop. 
    - if you see a message like this, either you found a bug!! or an update to UAT/test has been made and I haven't accounted for it yet
      - if the latter is the case, slack me and I will get it up and running as soon as possible!!

## IMPORTANT things to note:
  - This Script currently only automates IDT forms of [this permutation](docs/curPer.png). Let me know of any otherones that would be helpful to test
  - you can run multiple at a time by just starting a new terminal tab and following instruction #1
  - Currently, the chrome instance this script opens will not have any chrome extensions; potential future addition 
  - As you know, test and uat are living environment, if something changes in the ITD form between deployments, the script may operate incorrectly. 
    - Just reach out and I'll be very responsive in fixing it!
    




## Troubleshooting 
  - if the script starts running but the browser doesn't open, follow [these general permissions instructions](docs/permissionsIssues.md)
  - if none of that works or you need sudo functionality, slack me and I can make that work. 
  






