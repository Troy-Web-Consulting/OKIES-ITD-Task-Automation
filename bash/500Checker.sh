#!/bin/bash

# IMPORTANT TO NOTE: Edit the cd command occordingly to take you to wherever OKIES-Payment-Automation is stored on your machine 
# May only work on mac
# Run by navigating to the bash director and typing ./onTimer.sh

# Replace this with the command you want to run
COMMAND1="cd /Users/jfodera.3/Documents/Troy-Web-cons/Projects/others/GWPC-OKIEs/OKIES-Payment-Automation && node ITD-Payment-Tester joseph.fodera@troyweb.com hatjej-bamhip-3redVa test; exec bash"
COMMAND3="cd /Users/jfodera.3/Documents/Troy-Web-cons/Projects/others/GWPC-OKIEs/OKIES-Payment-Automation && node ITD-Payment-Tester joseph.fodera@troyweb.com hatjej-bamhip-3redVa uat; exec bash"

while true; do


  osascript -e '
  tell application "Terminal"
    activate
    tell application "System Events" to tell process "Terminal" to keystroke "t" using command down
    delay 0.2
    do script "'"${COMMAND1}"'" in selected tab of the front window
  end tell
  '

  osascript -e '
  tell application "Terminal"
    activate
    tell application "System Events" to tell process "Terminal" to keystroke "t" using command down
    delay 0.2
    do script "'"${COMMAND3}"'" in selected tab of the front window
  end tell
  '



  

  echo "Waiting for 30 minutes..."

  for ((i=60; i>0; i--)); do
    echo "$i"
    sleep 1
  done

  echo "Initiating new Instances..."
done
