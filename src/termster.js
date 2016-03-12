var TermsterLine = require("./termster-line.js")

function Termster(opts) {
  this.lines = []
}

Termster.prototype.addLine = function(line){
  this.lines.push(line)
}
Termster.prototype.addLines = function(type, strings){
  var that = this;
  var lines = strings.map(function(string){ 
    var line= new TermsterLine()
    line.type = type;
    line.rawString = string;
    return line 
  })
  this.lines = this.lines.concat(lines)
}

Termster.prototype.getHTML = function() {
  var html = ''
  this.lines.forEach(function(line){
    html += line.getHTML()
  })
  return html;
}

Termster.TermsterLine = TermsterLine

module.exports = Termster;
