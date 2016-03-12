var TermsterLine = require("./termster-line.js")
var TermsterDOM = require("./termster-dom.js")
var wrapWithHTML = require("wrap-with-html")


function Termster(opts) {
  // Assing a random string as a reference so we can access later.
  this.ref = generateRandomString();
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
  html = wrapWithHTML({
    string: html,
    tagName: "div",
    // Assign the reference so we can access the dom node later.
    customId: this.ref,
    customClass: "terminal-simulator",
    
  })
  return html;
}

Termster.TermsterLine = TermsterLine
Termster.TermsterDOM = TermsterDOM

// Helper utilites
function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
function generateRandomString(){
  return randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
}

module.exports = Termster;
