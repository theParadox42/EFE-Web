#!/bin/zsh
npx terser -c -m -o ../production/escapefromearth.min.js -- ../scripts/*.js ../scripts/**/*.js ../scripts/**/**/*.js
npx terser --comments=true -b -o ../production/escapefromearth.js -- ../scripts/*.js ../scripts/**/*.js ../scripts/**/**/*.js