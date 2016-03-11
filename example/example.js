var Termy = require(__dirname + '/../index.js').Termy
var TermyLine = require(__dirname + '/../index.js').TermyLine

var termy = new Termy()
termy.addLine(new TermyLine({
  string: "cd ~/code/termy"
}))
termy.addLine(new TermyLine({
  string: "ls -lah"
}))
termy.addLine(new TermyLine({
  type: 'output',
  string: "total 5"
}))
termy.addLine(new TermyLine({
  type: 'output',
  string: "drwxr-xr-x   9  joegesualdo  staff   306B Mar 11 13:23 ."
}))
termy.addLine(new TermyLine({
  type: 'output',
  string: "drwxr-xr-x  51 joegesualdo  staff   1.7K Mar 11 00:05 .."
}))
termy.addLine(new TermyLine({
  type: 'output',
  string: "drwxr-xr-x  13 joegesualdo  staff   442B Mar 11 14:28 .git"
}))
termy.addLine(new TermyLine({
  type: 'output',
  string: "-rw-r--r--   1  joegesualdo  staff   1.0K Mar 11 13:26 README.md"
}))
termy.addLine(new TermyLine({
  type: 'output',
  string: "-rw-r--r--   1  joegesualdo  staff   2.3K Mar 11 13:55 index.js"
}))
termy.addLine(new TermyLine({
  string: "node ./index.js"
}))
termy.addLines('output', [
  '________________',
  '< I loooove Termy>',
  '----------------',
  '       \\   ^__^',
  '        \\  (oo)\______',
  '            (__)\\       )\\/\\',
  '              ||----w |',
  '              ||        ||'
])

var html = termy.getHTML()
console.log(html)
