(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{19:function(e,t,n){e.exports=n(51)},49:function(e,t,n){},51:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(18),c=n.n(o),l=n(2),u=n(4),s=n.n(u),i="/api/persons",m=function(e){return s.a.delete("".concat(i,"/").concat(e))},d=function(){return s.a.get(i)},f=function(e,t){return s.a.put("".concat(i,"/").concat(e),t)},h=function(e){return s.a.post(i,e)},E=function(e){return e.map(function(e){return e.id})},w=function(e){var t=e.id,n=e.setPersons,a=e.setShowFilter,o=e.name,c=e.setErrorMessage;return r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{onClick:function(){window.confirm("Delete ".concat(o,"?"))&&m(t).then(function(){d().then(function(e){n(e.data),a(E(e.data))})}).catch(function(e){c("'".concat(o,"' was already removed from the server")),setTimeout(function(){c(null)},5e3)})},id:t},"delete"))},p=function(e){var t=e.persons,n=e.showFilter,a=e.setPersons,o=e.setShowFilter,c=e.setErrorMessage;return r.a.createElement("ul",null,t.map(function(e,t){return r.a.createElement("div",{key:t},n.includes(e.id)?r.a.createElement("li",{key:t},e.name," ",e.number," ",r.a.createElement(w,{name:e.name,id:e.id,setShowFilter:o,setPersons:a,setErrorMessage:c})):null)}))},v=function(e){var t=e.persons,n=e.setShowFilter,a=function(e){var a=[];t.map(function(t){return t.name.toLowerCase().includes(e.toLowerCase())&&a.push(t.id),n(a)})};return r.a.createElement(r.a.Fragment,null,"filter shown with:",r.a.createElement("input",{onChange:function(e){a(e.target.value)}}))},b=function(e){var t=e.persons,n=e.setPersons,o=e.showFilter,c=e.setShowFilter,u=e.setNotifyMessage,s=Object(a.useState)(""),i=Object(l.a)(s,2),m=i[0],w=i[1],p=Object(a.useState)(""),v=Object(l.a)(p,2),b=v[0],g=v[1],S=function(){var e=m.trim();return t.find(function(t){return t.name===e})};return r.a.createElement("form",{onSubmit:function(e){if(console.log(S()),m){e.preventDefault();var a=m.trim(),r=b.trim(),l={name:a,number:r};if(S()){if(window.confirm("".concat(a," is already added to the Phonebook, repace the old number with the new one?"))){var s=S().id;console.log(s),f(s,l).then(function(e){d().then(function(e){n(e.data),c(E(e.data)),u("".concat(a," number updated")),w(""),g(""),setTimeout(function(){u(null)},5e3)})})}}else w(""),g(""),console.log("add new person & persons:",t),h(l).then(function(e){console.log(e),n(t.concat(e.data)),c(o.concat(e.data.id)),u("Added ".concat(a)),setTimeout(function(){u(null)},5e3)})}}},r.a.createElement("div",null,"name:",r.a.createElement("input",{value:m,onChange:function(e){w(e.target.value)}})),r.a.createElement("div",null,"number:",r.a.createElement("input",{value:b,onChange:function(e){g(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},g=(n(49),function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)(),u=Object(l.a)(c,2),s=u[0],i=u[1],m=Object(a.useState)(null),f=Object(l.a)(m,2),h=f[0],w=f[1],g=Object(a.useState)(null),S=Object(l.a)(g,2),F=S[0],j=S[1];return Object(a.useEffect)(function(){d().then(function(e){o(e.data),i(E(e.data))})},[]),r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(function(e){var t=e.message;return console.log(t),null===t?null:r.a.createElement("div",{className:"error"},t)},{message:h}),r.a.createElement(function(e){var t=e.message;return console.log(t),null===t?null:r.a.createElement("div",{className:"notify"},t)},{message:F}),r.a.createElement("div",null,r.a.createElement(v,{persons:n,setShowFilter:i})),r.a.createElement("h3",null,"Add a new "),r.a.createElement(b,{persons:n,setPersons:o,setShowFilter:i,showFilter:s,setNotifyMessage:j}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(p,{setShowFilter:i,persons:n,showFilter:s,setPersons:o,setErrorMessage:w}))});c.a.createRoot(document.getElementById("root")).render(r.a.createElement(g,null))}},[[19,2,1]]]);
//# sourceMappingURL=main.eb471e85.chunk.js.map