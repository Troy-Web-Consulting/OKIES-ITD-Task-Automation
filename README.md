# Instructions 

## Setup

#### 1. Pull the github repo

npm install


#### 2. Open Terminal and navigate to root directory of this github:
 - ```cd .../OKIES-Payment-Automation```

#### 3. Initialize Node Project
  - ```npm init -y```

#### 4. Install Playwright 
  - ```npx playwright install```


full disk access by terminal if that is an issue

If permissions don't work, debugging steps: 
1. Automation Permission
Needed: To allow the terminal to control Chrome (e.g., simulate user actions).
Allow this:
System Settings → Privacy & Security → Automation
Ensure your Terminal app (or your IDE, like VS Code or iTerm) is allowed to control Google Chrome.
2. Accessibility Permission
Required when simulating user input that may interact with system UI or screen.
Allow this:
System Settings → Privacy & Security → Accessibility
Add and check Terminal or the app you're running the script from.
3. Full Disk Access (Optional but sometimes needed)
Required if Chrome or Playwright needs to access restricted locations (e.g., user profile folders).
Allow this:
System Settings → Privacy & Security → Full Disk Access
Add Terminal (or the app running your script).


## Troubleshooting 
  - if the script starts running but the browser doesn't open, follow these general permissions instructions: 

## Creating Login using [login-Saver.js](login-Saver.js) (Required)

### Description 
- This playwright script allows you to store your specific OKIES login sessions into /loginJsons (note that if folder not present yet, it will make it on the first run). 
  - you can store as many different log ins as you like