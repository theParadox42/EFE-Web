#!/bin/zsh
npx terser -b -c -m -o ../production/libraries.min.js -- ../libs/jquery.js ../libs/p5.min.js ../libs/p5.dom.min.js ../libs/p5.play.js