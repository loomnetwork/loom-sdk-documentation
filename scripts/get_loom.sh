#!/usr/bin/env bash

if grep -i Microsoft /proc/version >/dev/null 2>&1; then
  platform=linux
elif grep -iE "ubuntu|debian|centos" /proc/version >/dev/null 2>&1; then
  platform=linux
elif uname | grep -i darwin >/dev/null 2>&1; then
  platform=osx
else
  echo "Unable to detect OS..."
  exit 1
fi

echo "Downloading loom executable..."
if \which curl >/dev/null 2>&1; then
  download_command="curl -sL -o"
elif \which wget >/dev/null 2>&1; then
  download_command="wget -q -O"
fi
$download_command loom https://private.delegatecall.com/loom/${platform}/stable/loom
chmod +x loom

./loom version

echo "All done."