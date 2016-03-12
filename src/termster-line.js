var Shatter = require("shatter-html")
var wrapWithHTML = require("wrap-with-html")
function TermsterLine(opts) {
  var opts = opts || {}
  this.type = opts.type || 'command'
  this.rawString = opts.string
}

TermsterLine.prototype.getHTML = function() {
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

module.exports = TermsterLine;
