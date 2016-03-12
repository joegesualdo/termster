var TermsterDOM = (function() {
  function render(termsterInstance, node) {
    var html = termsterInstance.getHTML()
    node.innerHTML = html;
  }
  return {
    render: render
  }
})()

module.exports = TermsterDOM
