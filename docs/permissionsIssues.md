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

---

## Windows

Windows is more lenient but may block automation through security tools or system settings.

### 1. Windows Defender / Antivirus
- Ensure your automation script or Playwright’s Chrome is not blocked or sandboxed
- Add exceptions in Windows Defender or third-party antivirus for:
  - `node.exe`
  - Your terminal (e.g., Command Prompt, PowerShell, Windows Terminal)
  - Playwright's cache or Chromium folder: `%USERPROFILE%\AppData\Local\ms-playwright`

### 2. UAC (User Account Control)
- If Playwright is trying to elevate privileges or install Chrome binaries:
  - Run the terminal as Administrator (if required)
  - Allow elevation prompts when they appear

### 3. Firewall / Network Access
- If the script launches Chrome and tries to access network resources:
  - Ensure Chrome or Playwright isn't blocked by Windows Firewall
