var React = require("react")
var ReactDOM = require("react-dom")

// Sample code =======================
var HelloWorldComponent = React.createClass({
 render: function(){
   return (
     <div className="hello-world">
       Hello World!
     </div>
   )
 }
})

ReactDOM.render(
 <HelloWorldComponent/>,
 document.getElementById("react-app")
);
// End Sample code =======================
