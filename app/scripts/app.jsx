var Shatter = require("shatter-html")
var wrapWithHTML = require("wrap-with-html")
// var Termster = require('../../index.js').Termster
var Termster = require('../../index.js')
var TermsterLine = Termster.TermsterLine;
var TermsterDOM = Termster.TermsterDOM;

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

TermsterDOM.render(
  termster,
  document.querySelector(".app"),
  {
    hidden: true
  }
)
TermsterDOM.startTyping(termster, {
  speed:50
})
