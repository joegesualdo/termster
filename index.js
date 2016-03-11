var Shatter = require("shatter-html")
var wrapWithHTML = require("wrap-with-html")

function Termy(opts) {
  this.lines = []
}

function TermyLine(opts) {
  var opts = opts || {}
  this.type = opts.type || 'command'
  this.rawString = opts.string
}

TermyLine.prototype.getHTML = function() {
    var lineHTML = ''
      var textShatterEl = new Shatter({
        string: this.rawString,
        delimeters: [{
          delimeter: "word",
          elClassName: "terminal-simulator_line_content_sequence",
          elTagName: "div"
        }, {
          delimeter: "char",
          elClassName: "terminal-simulator_line_content_sequence_char",
          elTagName: "div"
        }]
      })

      var promptShatterEl = new Shatter({
        string: "$",
        wrapperEl:{
          customClass: "terminal-simulator_line_content_prompt",
          tagName: "div"
        },
        delimeters: [{
          delimeter: "word",
          elClassName: "terminal-simulator_line_content_prompt_sequence",
          elTagName: "div"
        }, {
          delimeter: "char",
          elClassName: "terminal-simulator_line_content_prompt_sequence_char",
          elTagName: "div"
        }]
      })

    if (this.type === 'command') {
      lineHTML += wrapWithHTML({
        string: promptShatterEl.getHTML() + textShatterEl.getHTML(),
        tagName: "div",
        customClass: "terminal-simulator_line"
      })
    } else if (this.type === 'output'){
      lineHTML += wrapWithHTML({
        string: textShatterEl.getHTML(),
        tagName: "div",
        customClass: "terminal-simulator_line"
      })
    }
    return lineHTML;
}

Termy.prototype.addLine = function(line){
  this.lines.push(line)
}
Termy.prototype.addLines = function(type, strings){
  var that = this;
  var lines = strings.map(function(string){ 
    var line= new TermyLine()
    line.type = type;
    line.rawString = string;
    return line 
  })
  this.lines = this.lines.concat(lines)
}

Termy.prototype.getHTML = function() {
  var html = ''
  this.lines.forEach(function(line){
    html += line.getHTML()
  })
  return html;
}

Termy.prototype.TermyLine = TermyLine

module.exports = {
  Termy: Termy,
  TermyLine: TermyLine
}
