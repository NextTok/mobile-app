#!/bin/bash

# Exit the script if any command fails
set -e


pwd

# Unpack the app.gz file
echo "Unpacking app.gz..."
tar -xzf app.gz

# Verify that NikNakDev.app exists
if [ ! -d "NikNakDev.app" ]; then
  echo "Error: NikNakDev.app not found after unpacking."
  exit 1
fi

echo "NikNakDev.app successfully unpacked."

# Get the currently booted simulator's ID
BOOTED_SIMULATOR=$(xcrun simctl list devices | grep -E 'Booted' | awk -F '[()]' '{print $2}')

if [ -z "$BOOTED_SIMULATOR" ]; then
  echo "Error: No simulator is currently booted."
  exit 1
fi

echo "Found booted simulator: $BOOTED_SIMULATOR"

# Install the app on the currently open simulator
echo "Installing NikNakDev.app on the simulator..."
xcrun simctl install "$BOOTED_SIMULATOR" "NikNakDev.app"

# Launch the app on the simulator
BUNDLE_ID=$(defaults read "$(pwd)/NikNakDev.app/Info.plist" CFBundleIdentifier)

if [ -z "$BUNDLE_ID" ]; then
  echo "Error: Unable to read CFBundleIdentifier from NikNakDev.app."
  exit 1
fi

echo "Launching app with bundle identifier: $BUNDLE_ID"
xcrun simctl launch "$BOOTED_SIMULATOR" "$BUNDLE_ID"

echo "App successfully installed and launched on the simulator!"
