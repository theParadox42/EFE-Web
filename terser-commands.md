# Terser Commands
## Commands to install terser (start in escape from earth directory)
```
mkdir MinifyTools
cd MinifyTools
npm i terser
```
## Minify Command
```
npx terser -c -m -o ../production/escapefromearth.min.js -- ../scripts/*.js ../scripts/**/*.js ../scripts/**/**/*.js
```
## Beutify Command
```
npx terser -b -o ../production/escapefromearth.js -- ../scripts/*.js ../scripts/**/*.js ../scripts/**/**/*.js
```
## Combine libraries command
```
npx terser -b -c -m -o ../production/libraries.min.js -- ../libs/jquery.js ../libs/p5.min.js ../libs/p5.dom.min.js ../libs/p5.play.js
```
