(this.webpackJsonpwebsite=this.webpackJsonpwebsite||[]).push([[0],{12:function(t,e,o){},51:function(t,e,o){},54:function(t,e,o){"use strict";o.r(e);var n=o(2),r=o.n(n),a=o(13),c=o.n(a),l=(o(51),o.p+"static/media/logo.6ce24c58.svg"),i=(o(12),o(14)),s=o(15),h=o(16),d=o(21),u=o(20),g=o(0),f=function(t){Object(h.a)(o,t);var e=Object(d.a)(o);function o(t){return Object(i.a)(this,o),e.call(this,t)}return Object(s.a)(o,[{key:"componentDidMount",value:function(){var t=["red","blue","green","black","purple","white","yellow"],e=[{x:200,y:100,size:100,flag:!1,color:t[Math.floor(Math.random()*t.length)]},{x:300,y:100,size:100,color:t[Math.floor(Math.random()*t.length)]},{x:400,y:100,size:100,color:t[Math.floor(Math.random()*t.length)]},{x:200,y:200,size:100,color:t[Math.floor(Math.random()*t.length)]},{x:300,y:200,size:100,color:t[Math.floor(Math.random()*t.length)]},{x:400,y:200,size:100,color:t[Math.floor(Math.random()*t.length)]},{x:200,y:300,size:100,color:t[Math.floor(Math.random()*t.length)]},{x:300,y:300,size:100,color:t[Math.floor(Math.random()*t.length)]},{x:400,y:300,size:100,color:t[Math.floor(Math.random()*t.length)]}],o=[{x:100,y:450,size:50,color:t[0],flag:!0},{x:175,y:450,size:50,color:t[1]},{x:250,y:450,size:50,color:t[2]},{x:325,y:450,size:50,color:t[3]},{x:400,y:450,size:50,color:t[4]},{x:475,y:450,size:50,color:t[5]},{x:550,y:450,size:50,color:t[6]}];u.a(".Vis").append("svg").attr("width",700).attr("height",600).style("border","5px solid white").selectAll("rect").data(e.concat(o)).enter().append("rect").attr("x",(function(t){return t.x})).attr("y",(function(t){return t.y})).attr("height",(function(t){return t.size})).attr("width",(function(t){return t.size})).style("fill",(function(t){return t.color})).on("click",(function(t){t.target.__data__.flag?console.log(t.target.__data__.color):console.log("NOTHING: "+t.target.__data__.color)}))}},{key:"render",value:function(){return Object(g.jsx)("div",{className:"Vis"})}}]),o}(n.Component);var x=function(){return Object(g.jsx)("div",{className:"App",children:Object(g.jsxs)("header",{className:"App-header",children:[Object(g.jsx)("img",{src:l,className:"App-logo",alt:"logo"}),Object(g.jsx)(f,{})]})})},y=function(t){t&&t instanceof Function&&o.e(3).then(o.bind(null,55)).then((function(e){var o=e.getCLS,n=e.getFID,r=e.getFCP,a=e.getLCP,c=e.getTTFB;o(t),n(t),r(t),a(t),c(t)}))};c.a.render(Object(g.jsx)(r.a.StrictMode,{children:Object(g.jsx)(x,{})}),document.getElementById("root")),y()}},[[54,1,2]]]);
//# sourceMappingURL=main.edaf468a.chunk.js.map