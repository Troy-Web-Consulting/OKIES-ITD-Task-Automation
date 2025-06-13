# Playwright Permissions Debugging Guide

## macOS

If Playwright isn't working correctly on macOS, check and allow the following permissions:

### 1. Automation Permission
- **Needed**: To allow the terminal or IDE to control Chrome (simulate clicks, inputs, etc.)
- **Allow this**:
  - System Settings → Privacy & Security → Automation
  - Ensure your Terminal or IDE (e.g., VS Code, iTerm) is allowed to control Google Chrome

### 2. Accessibility Permission
- **Required**: When simulating user input that may interact with the system UI or screen
- **Allow this**:
  - System Settings → Privacy & Security → Accessibility
  - Add and check Terminal or the app you're running the script from

### 3. Full Disk Access (Optional but sometimes needed)
- **Required**: If Chrome or Playwright needs to access restricted locations (e.g., user profile folders)
- **Allow this**:
  - System Settings → Privacy & Security → Full Disk Access
  - Add Terminal (or the app running your script)



## Windows Permission Trouble shooting
- view your error and see which one fix fits best

### Windows Defender / Antivirus Issue
- Ensure your automation script or Playwright’s Chrome is not blocked or sandboxed
- Add exceptions in Windows Defender or third-party antivirus for:
  - `node.exe`
  - Your terminal (e.g., Command Prompt, PowerShell, Windows Terminal)
  - Playwright's cache or Chromium folder: `%USERPROFILE%\AppData\Local\ms-playwright`

### UAC (User Account Control) Issue
- If Playwright is trying to elevate privileges or install Chrome binaries:
  - Run the terminal as Administrator (if required)
  - Allow elevation prompts when they appear

### Firewall / Network Access Issue
- If the script launches Chrome and tries to access network resources:
  - Ensure Chrome or Playwright isn't blocked by Windows Firewall


### Recieved error message Similar to: 

```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this
system. For more information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
At line:1 char:1
```

This error message means that **PowerShell script execution is disabled on your Windows system**, which is blocking npm (which uses PowerShell scripts) from running.



#### Step 1: Open PowerShell **as Administrator**

* Click Start, type `PowerShell`
* Right-click **Windows PowerShell**
* Select **Run as administrator**

#### Step 2: Check current execution policy

```powershell
Get-ExecutionPolicy
```

Most likely, it will say `Restricted`.

#### Step 3: Change the execution policy

You can set it to `RemoteSigned` which allows local scripts and signed scripts from the internet:

```powershell
Set-ExecutionPolicy RemoteSigned
```

* It will prompt: `Do you want to change the execution policy? (Y/N)`
* Press **Y** then Enter

If you want to be more permissive temporarily, you can use:

```powershell
Set-ExecutionPolicy Unrestricted
```

#### Step 4: Confirm

Run again:

```powershell
Get-ExecutionPolicy
```

It should now say `RemoteSigned` (or `Unrestricted` if you chose that).



#### After that

Try the script again in a **new PowerShell window**.
  - ```node ITD-Payment-Tester 'email' 'password' 'testing-environment'```





