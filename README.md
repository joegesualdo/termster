## Termster
> Terminal html element.

Create terminal element with html and css that looks like the following:

![termster-example](https://raw.github.com/joegesualdo/termster/master/termster-example.png)

## Install
```
$ npm install --save termster 
```

## [Example](https://htmlpreview.github.io/?https://github.com/joegesualdo/termster/blob/master/public/index.html)

## Usage
```javascript
var Termster = require('termster')
var TermsterLine = Termster.TermsterLine

var termster = new Termster()

termster.addLine(new TermsterLine({
  string: "cd ~/code/termster"
}))
termster.addLine(new TermsterLine({
  string: "ls -lah"
}))
termster.addLine(new TermsterLine({
  type: 'output',
  string: "total 5"
}))
termster.addLine(new TermsterLine({
  type: 'output',
  string: "drwxr-xr-x   9  joegesualdo  staff   306B Mar 11 13:23 ."
}))
termster.addLine(new TermsterLine({
  type: 'output',
  string: "drwxr-xr-x  51 joegesualdo  staff   1.7K Mar 11 00:05 .."
}))
termster.addLine(new TermsterLine({
  type: 'output',
  string: "drwxr-xr-x  13 joegesualdo  staff   442B Mar 11 14:28 .git"
}))
termster.addLine(new TermsterLine({
  type: 'output',
  string: "-rw-r--r--   1  joegesualdo  staff   1.0K Mar 11 13:26 README.md"
}))
termster.addLine(new TermsterLine({
  type: 'output',
  string: "-rw-r--r--   1  joegesualdo  staff   2.3K Mar 11 13:55 index.js"
}))
termster.addLine(new TermsterLine({
  string: "node ./index.js"
}))
termster.addLines('output', [
  '________________',
  '< I loooove Termster>',
  '----------------',
  '       \\   ^__^',
  '        \\  (oo)\______',
  '            (__)\\       )\\/\\',
  '              ||----w |',
  '              ||        ||'
])

// Get html markup:
termster.getHTML()

// Attach to DOM
var newNode = document.createElement('div')
newNode.innerHTML = html
document.querySelector(".terminal-simulator").appendChild(newNode)
```
### The above example can be previewed [here](https://htmlpreview.github.io/?https://github.com/joegesualdo/termster/blob/master/public/index.html)

## API

*Coming Soon*
