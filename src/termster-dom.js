var TermsterDOM = (function() {
  // We want to animate each character of a command line to simulate typing
  //   But for our output lines, we want to animate the entire line, not each character.
  var divsToAnimateSelector = ".terminal-simulator_line--command .terminal-simulator_line_content_prompt_sequence_char, .terminal-simulator_line--command .terminal-simulator_line_content_sequence_char, .terminal-simulator_line--output"

  function render(termsterInstance, node, opts) {
    var html = termsterInstance.getHTML()
    node.innerHTML = html;
    if (opts && opts.hidden === true) {
    var divsToShow = document.getElementById(termsterInstance.ref).querySelectorAll(divsToAnimateSelector)
      Array.prototype.forEach.call(divsToShow, function($divToShow, index){
        $divToShow.style.opacity = "0"
      })
    }
  }
  function startTyping(termsterInstance, opts) {
    opts = opts || {}
    var speed = opts.speed || 100
    var divsToShow = document.getElementById(termsterInstance.ref).querySelectorAll(divsToAnimateSelector)
    Array.prototype.forEach.call(divsToShow, function($divToShow, index){
      setTimeout(function(){
        $divToShow.style.opacity = "1"
      }, speed * index)
    })
  }
  return {
    render: render,
    startTyping
  }
})()

module.exports = TermsterDOM
