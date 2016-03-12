(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Shatter = require("shatter-html");
var wrapWithHTML = require("wrap-with-html");
// var Termster = require('../../index.js').Termster
var Termster = require('../../index.js');
var TermsterLine = Termster.TermsterLine;
var TermsterDOM = Termster.TermsterDOM;

var termster = new Termster();
termster.addLine(new TermsterLine({
  string: "cd ~/code/termster"
}));
termster.addLine(new TermsterLine({
  string: "ls -lah"
}));
termster.addLine(new TermsterLine({
  type: 'output',
  string: "total 5"
}));
termster.addLine(new TermsterLine({
  type: 'output',
  string: "drwxr-xr-x   9  joegesualdo  staff   306B Mar 11 13:23 ."
}));
termster.addLine(new TermsterLine({
  type: 'output',
  string: "drwxr-xr-x  51 joegesualdo  staff   1.7K Mar 11 00:05 .."
}));
termster.addLine(new TermsterLine({
  type: 'output',
  string: "drwxr-xr-x  13 joegesualdo  staff   442B Mar 11 14:28 .git"
}));
termster.addLine(new TermsterLine({
  type: 'output',
  string: "-rw-r--r--   1  joegesualdo  staff   1.0K Mar 11 13:26 README.md"
}));
termster.addLine(new TermsterLine({
  type: 'output',
  string: "-rw-r--r--   1  joegesualdo  staff   2.3K Mar 11 13:55 index.js"
}));
termster.addLine(new TermsterLine({
  string: "node ./index.js"
}));
termster.addLines('output', ['________________', '< I loooove Termster>', '----------------', '       \\   ^__^', '        \\  (oo)\______', '            (__)\\       )\\/\\', '              ||----w |', '              ||        ||']);

TermsterDOM.render(termster, document.querySelector(".app"));

},{"../../index.js":2,"shatter-html":3,"wrap-with-html":4}],2:[function(require,module,exports){
var Termster = require("./src/termster.js");

module.exports = Termster;

},{"./src/termster.js":7}],3:[function(require,module,exports){
var wrapWithHTML = require("wrap-with-html");

function Shatter(opts) {
  this.rawString = opts.string;
  this.delimeters = opts.delimeters;
  this.wrapperEl = opts.wrapperEl;
}

Shatter.prototype.getHTML = function() {
  var words = []
  var htmlString = "";
  wordDelimeter = this.delimeters.filter(function(delimeter){return delimeter.delimeter === "word"})[0]
  charDelimeter = this.delimeters.filter(function(delimeter){return delimeter.delimeter === "char"})[0]

  if (wordDelimeter) {
    words = this.rawString.split(" ")
    var wordClassName = wordDelimeter.elClassName || "shatter-word"
    var wordTagName = wordDelimeter.elTagName|| "div"

    if (charDelimeter) {
      var charClassName = charDelimeter.elClassName || "shatter-word"
      var charTagName = charDelimeter.elTagName|| "div"
      for (var wordsIndex = 0; wordsIndex < words.length; wordsIndex++) {
        var chars = words[wordsIndex].split("")
        var wordString= '';
        var charString = ''
        for (var charIndex = 0; charIndex < chars.length; charIndex++) {
          charString += wrapWithHTML({
            string: chars[charIndex],
            // TODO: custom
            tagName: charTagName,
            customClass: charClassName 
          })
        }
        wordString = wrapWithHTML({
          string: charString,
          tagName: wordTagName,
          customClass: wordClassName
        })
        htmlString += wordString;
      }
    } else {
      for (var wordsIndex = 0; wordsIndex < words.length; wordsIndex++) {
        htmlString += wrapWithHTML({
          string: words[wordsIndex],
          tagName: wordTagName,
          customClass: wordClassName
        })
      }
    }

  } else if (charDelimeter) {
    var charClassName = charDelimeter.elClassName || "shatter-word"
    var charTagName = charDelimeter.elTagName|| "div"
    var arrayString = this.rawString.split("");
    var htmlString = "";

    for (var i = 0; i < arrayString.length; i++) {
      htmlString += wrapWithHTML({
        string: arrayString[i],
        tagName: charTagName,
        customClass: charClassName
      })
    }
  }
  if (this.wrapperEl !== undefined) {
    htmlString = wrapWithHTML({
      string: htmlString,
      tagName: this.wrapperEl.tagName,
      customClass: this.wrapperEl.customClass
    })
  }

  return htmlString;
}

module.exports = Shatter;

},{"wrap-with-html":4}],4:[function(require,module,exports){
function wrapWithHTML(opts) {
  var string = opts.string;
  var tagName = opts.tagName || "div";
  var customId = opts.customId || "";
  var customClass = opts.customClass || "";

  var htmlString = "<" + tagName + " id='" + customId + "' class='" + customClass + "'>" + string + "</" + tagName + ">";

  return htmlString;
}

module.exports = wrapWithHTML;

},{}],5:[function(require,module,exports){
var TermsterDOM = function () {
  function render(termsterInstance, node) {
    var html = termsterInstance.getHTML();
    node.innerHTML = html;
  }
  return {
    render: render
  };
}();

module.exports = TermsterDOM;

},{}],6:[function(require,module,exports){
var Shatter = require("shatter-html");
var wrapWithHTML = require("wrap-with-html");
function TermsterLine(opts) {
  var opts = opts || {};
  this.type = opts.type || 'command';
  this.rawString = opts.string;
}

TermsterLine.prototype.getHTML = function () {
  var lineHTML = '';
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
  });

  var promptShatterEl = new Shatter({
    string: "$",
    wrapperEl: {
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
  });

  if (this.type === 'command') {
    lineHTML += wrapWithHTML({
      string: promptShatterEl.getHTML() + textShatterEl.getHTML(),
      tagName: "div",
      customClass: "terminal-simulator_line"
    });
  } else if (this.type === 'output') {
    lineHTML += wrapWithHTML({
      string: textShatterEl.getHTML(),
      tagName: "div",
      customClass: "terminal-simulator_line"
    });
  }
  return lineHTML;
};

module.exports = TermsterLine;

},{"shatter-html":3,"wrap-with-html":4}],7:[function(require,module,exports){
var TermsterLine = require("./termster-line.js");
var TermsterDOM = require("./termster-dom.js");
var wrapWithHTML = require("wrap-with-html");

function Termster(opts) {
  this.lines = [];
}

Termster.prototype.addLine = function (line) {
  this.lines.push(line);
};
Termster.prototype.addLines = function (type, strings) {
  var that = this;
  var lines = strings.map(function (string) {
    var line = new TermsterLine();
    line.type = type;
    line.rawString = string;
    return line;
  });
  this.lines = this.lines.concat(lines);
};

Termster.prototype.getHTML = function () {
  var html = '';
  this.lines.forEach(function (line) {
    html += line.getHTML();
  });
  html = wrapWithHTML({
    string: html,
    tagName: "div",
    customClass: "terminal-simulator"
  });
  return html;
};

Termster.TermsterLine = TermsterLine;
Termster.TermsterDOM = TermsterDOM;

module.exports = Termster;

},{"./termster-dom.js":5,"./termster-line.js":6,"wrap-with-html":4}]},{},[1,2]);
