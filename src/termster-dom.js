var TermsterDOM = (function() {
  function render(termsterInstance, node, opts) {
    var html = termsterInstance.getHTML()
    node.innerHTML = html;
    if (opts && opts.hidden === true) {
    var chars = document.querySelector("#"+termsterInstance.ref).querySelectorAll(".terminal-simulator_line_content_prompt_sequence_char, .terminal-simulator_line_content_sequence_char")
      Array.prototype.forEach.call(chars, function($char, index){
        $char.style.opacity = "0"
      })
    }
  }
  function startTyping(termsterInstance, opts) {
    opts = opts || {}
    var speed = opts.speed || 100
    var chars = document.querySelector("#"+termsterInstance.ref).querySelectorAll(".terminal-simulator_line_content_prompt_sequence_char, .terminal-simulator_line_content_sequence_char")
    Array.prototype.forEach.call(chars, function($char, index){
      setTimeout(function(){
        $char.style.opacity = "1"
      }, speed * index)
    })
  }
  return {
    render: render,
    startTyping
  }
})()

module.exports = TermsterDOM
