var Client;(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function n(e){console.log("::: Running checkForURL :::",e);const t=/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/.test(e);return t||alert("Wrong url, please make sure https:// in the begining"),t}function o(e){e.preventDefault();let t=document.getElementById("name").value;Client.checkForURL(t)&&(document.getElementById("results").innerHTML="Loading . . .",l("http://localhost:8081/analyze",{url:t}).then((e=>{Client.formatInfo(e)})))}e.r(t),e.d(t,{checkForURL:()=>n,formatInfo:()=>a,handleSubmit:()=>o});const l=async(e="",t={})=>{console.log("Post url",t);const n=await fetch(e,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});try{const e=await n.json();return console.log("Post status : ",e),e}catch(e){console.log("error",e)}};function a(e){console.log("::: Running formatInfo :::",e);const t=/[A-Za-z]+$/g,n=e.highlights.map((e=>e.text)),o=e.concepts.map((e=>{const n=e.type,o=1==n.match(t).length?n.match(t):"";return e.form+` (${o})`})),l=e.entities.map((e=>{const n=e.type,o=1==n.match(t).length?n.match(t):"";return e.form+` (${o})`}));console.log("highlights",n),console.log("concepts",o),console.log("entities",l);const a=c(n,"***************** Most Important HighLights: *****************"),d=c(o,"***************** Concepts Found In The Page: *****************"),r=c(l,"***************** Entities Found In The Page: *****************");document.getElementById("results").innerHTML="",document.getElementById("results").appendChild(a),document.getElementById("results").appendChild(d),document.getElementById("results").appendChild(r)}function c(e,t){const n=document.createElement("div"),o=document.createElement("h1");o.innerText=t;const l=document.createElement("ul");return e.map((e=>{const t=function(e){const t=document.createTextNode(e),n=document.createElement("p"),o=document.createElement("br"),l=document.createElement("li");return n.appendChild(t),l.appendChild(o),l.appendChild(n),l.appendChild(o),l}(e);l.appendChild(t)})),n.appendChild(o),n.appendChild(l),n}Client=t})();