
# Simple Node.js Installation Guide (no nvm)

## macOS (Using Homebrew – Recommended)

To install Node.js and npm using Homebrew:
### 1. Install Homebrew (if not already installed)
- open your terminal and run this command: 
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. Install Node.js
- Then run this in your terminal

```bash
brew install node
```

This installs both node and npm.



Homebrew is a package manager for macOS and makes managing software like Node.js much easier.

## Windows

To install Node.js on Windows:

### 1. Download and Install

- Go to: https://nodejs.org
- Download the LTS version (recommended for most users)
- Run the installer and follow the setup steps on the site

### 2. Post-Installation

- Restart your terminal (Command Prompt, PowerShell, or Windows Terminal)
- Node.js and npm should now be available

## Linux (Debian/Ubuntu)

You have two options for installing Node.js:

### Option 1: Install via apt (May be an older version)
- open your terminal and run these commands

```bash
sudo apt update
sudo apt install nodejs npm
```

### Option 2: Install Latest Version via NodeSource
- Then run these in your terminal
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```

This installs the latest LTS version of Node.js from the official NodeSource repository.

## Verify Installation

After installing Node.js, check that everything was installed correctly:

```bash
node -v
npm -v
```

These commands display the installed versions of Node.js and npm.

