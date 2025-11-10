"use strict";(()=>{var B="Runtime assertion failed";function f(e,s){if(e)return;let l=typeof s=="function"?s():s,n=l?"".concat(B,": ").concat(l):B;throw new Error(n)}window.__jsonFormatterStartTime=performance.now();var O=e=>typeof e=="string"?1:typeof e=="number"?2:e===!1||e===!0?5:e===null?6:Array.isArray(e)?4:3;var J=document.createElement("span"),_=()=>J.cloneNode(!1),m=e=>{let s=_();return s.className=e,s},h=(e,s)=>{let l=_();return l.className=s,l.innerText=e,l},r={t_entry:m("entry"),t_exp:m("e"),t_key:m("k"),t_string:m("s"),t_number:m("n"),t_null:h("null","nl"),t_true:h("true","bl"),t_false:h("false","bl"),t_oBrace:h("{","b"),t_cBrace:h("}","b"),t_oBracket:h("[","b"),t_cBracket:h("]","b"),t_sizeComment:m("sizeComment"),t_ellipsis:m("ell"),t_blockInner:m("blockInner"),t_colonAndSpace:document.createTextNode(":\xA0"),t_commaText:document.createTextNode(","),t_dblqText:document.createTextNode('"')};var k=(e,s)=>{let l=O(e),n=r.t_entry.cloneNode(!1),d=0;l===3?d=Object.keys(e).length:l===4&&(d=e.length);let b=!1;if(l===3||l===4){for(let t in e)if(e.hasOwnProperty(t)){b=!0;break}b&&n.appendChild(r.t_exp.cloneNode(!1))}if(s!==!1){n.classList.add("objProp");let t=r.t_key.cloneNode(!1);t.textContent=JSON.stringify(s).slice(1,-1),n.appendChild(r.t_dblqText.cloneNode(!1)),n.appendChild(t),n.appendChild(r.t_dblqText.cloneNode(!1)),n.appendChild(r.t_colonAndSpace.cloneNode(!1))}else n.classList.add("arrElem");let p,c;switch(l){case 1:{f(typeof e=="string");let t=_(),o=JSON.stringify(e);if(o=o.substring(1,o.length-1),e.substring(0,8)==="https://"||e.substring(0,7)==="http://"||e[0]==="/"){let i=document.createElement("a");i.href=e,i.innerText=o,t.appendChild(i)}else t.innerText=o;let a=r.t_string.cloneNode(!1);a.appendChild(r.t_dblqText.cloneNode(!1)),a.appendChild(t),a.appendChild(r.t_dblqText.cloneNode(!1)),n.appendChild(a);break}case 2:{let t=r.t_number.cloneNode(!1);t.innerText=String(e),n.appendChild(t);break}case 3:{if(f(typeof e=="object"),n.appendChild(r.t_oBrace.cloneNode(!0)),b){n.appendChild(r.t_ellipsis.cloneNode(!1)),p=r.t_blockInner.cloneNode(!1);let t;for(let o in e)if(e.hasOwnProperty(o)){c=k(e[o],o);let a=r.t_commaText.cloneNode();c.appendChild(a),p.appendChild(c),t=a}f(typeof c<"u"&&typeof t<"u"),c.removeChild(t),n.appendChild(p)}n.appendChild(r.t_cBrace.cloneNode(!0)),n.dataset.size=` // ${d} ${d===1?"item":"items"}`;break}case 4:{if(f(Array.isArray(e)),n.appendChild(r.t_oBracket.cloneNode(!0)),b){n.appendChild(r.t_ellipsis.cloneNode(!1)),p=r.t_blockInner.cloneNode(!1);for(let t=0,o=e.length,a=o-1;t<o;t++){if(c=k(e[t],!1),t<a){let i=r.t_commaText.cloneNode();c.appendChild(i)}p.appendChild(c)}n.appendChild(p)}n.appendChild(r.t_cBracket.cloneNode(!0)),n.dataset.size=` // ${d} ${d===1?"item":"items"}`;break}case 5:{e?n.appendChild(r.t_true.cloneNode(!0)):n.appendChild(r.t_false.cloneNode(!0));break}case 6:{n.appendChild(r.t_null.cloneNode(!0));break}}return n};var L=`body {
  background-color: #fff;
  user-select: text;
  overflow-y: scroll !important;
  margin: 0;
  position: relative;
  padding-top: 1px; /* hack to prevent margin collapse in 'Raw' */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
#optionBar {
  user-select: none;
  position: absolute;
  z-index: 10;
  top: 8px;
  right: 10px;
  background: #fff;
  box-shadow: 0px 0px 3px 3px #fff;
  padding: 5px;
}
#buttonFormatted,
#buttonPlain {
  border-radius: 2px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  user-select: none;
  background: linear-gradient(#fafafa, #f4f4f4 40%, #e5e5e5);
  border: 1px solid #aaa;
  color: #444;
  font-size: 13px;
  /* text-transform: uppercase; */
  margin-bottom: 0px;
  min-width: 4em;
  padding: 3px 0;
  position: relative;
  z-index: 10;
  display: inline-block;
  width: 80px;
  text-shadow: 1px 1px rgba(255, 255, 255, 0.3);
}
#buttonFormatted {
  margin-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
#buttonPlain {
  margin-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
}
:is(#buttonPlain, #buttonFormatted):not(.selected):hover {
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  background: #ebebeb linear-gradient(#fefefe, #f8f8f8 40%, #e9e9e9);
  border-color: #999;
  color: #222;
}
:is(#buttonPlain, #buttonFormatted):active {
  box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.2);
  background: #ebebeb linear-gradient(#f4f4f4, #efefef 40%, #dcdcdc);
  color: #333;
}
:is(#buttonPlain, #buttonFormatted).selected {
  box-shadow: inset 0px 1px 5px rgba(0, 0, 0, 0.2);
  background: #ebebeb linear-gradient(#e4e4e4, #dfdfdf 40%, #dcdcdc);
  color: #333;
}
:is(#buttonPlain, #buttonFormatted):focus {
  outline: 0;
}
.entry {
  display: block;
  padding-left: 20px;
  margin-left: -20px;
  position: relative;
  content-visibility: auto;
}
#jsonFormatterParsed {
  padding-left: 28px;
  padding-top: 6px;
  line-height: 1.5;
}
#jsonFormatterRaw {
  padding: 36px 10px 5px;
}
.collapsed {
  white-space: nowrap;
}
.collapsed > .blockInner {
  display: none;
}
.collapsed > .ell:after {
  content: '\u2026';
  font-weight: bold;
}
.collapsed > .ell {
  margin: 0 4px;
  color: #888;
}
.collapsed .entry {
  display: inline;
}

.collapsed:after {
  content: attr(data-size);
  color: #aaa;
}

.e {
  width: 20px;
  height: 18px;
  display: block;
  position: absolute;
  left: 0px;
  top: 1px;
  color: black;
  z-index: 5;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.15;
}

.e::after {
  content: '';
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 4px 0 4px 6.9px;
  border-color: transparent transparent transparent currentColor;
  transform: rotate(90deg) translateY(1px);
}

.collapsed > .e::after {
  transform: none;
}

.e:hover {
  opacity: 0.35;
}
.e:active {
  opacity: 0.5;
}
.collapsed .entry .e {
  display: none;
}
.blockInner {
  display: block;
  padding-left: 24px;
  border-left: 1px dotted #bbb;
  margin-left: 2px;
}
#jsonFormatterParsed {
  color: #444;
}

.entry {
  font-size: 13px;
  font-family: monospace;
}

.b {
  font-weight: bold;
}
.s {
  color: #0b7500;
  word-wrap: break-word;
}
a:link,
a:visited {
  text-decoration: none;
  color: inherit;
}
a:hover,
a:active {
  text-decoration: underline;
  color: #050;
}
.bl,
.nl,
.n {
  font-weight: bold;
  color: #1a01cc;
}
.k {
  color: #000;
}

[hidden] {
  display: none !important;
}
span {
  white-space: pre-wrap;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

#spinner {
  animation: spin 2s linear infinite;
}
`,F=`body {
  background-color: #1a1a1a;
  color: #eee;
  -webkit-font-smoothing: antialiased;
}

a:hover,
a:active {
  color: hsl(114, 90%, 55%);
}

#optionBar {
  -webkit-font-smoothing: subpixel-antialiased;

  background: #1a1a1a;
  box-shadow: 0px 0px 3px 3px #1a1a1a;
}

#jsonFormatterParsed {
  color: #b6b6b6;
}

.blockInner {
  border-color: #4d4d4d;
}

.k {
  color: #fff;
}

.s {
  color: hsl(114, 100%, 35%);
}

.bl,
.nl,
.n {
  color: hsl(200, 100%, 70%);
}

.e {
  color: #fff;
  opacity: 0.25;
}

.e:hover {
  opacity: 0.45;
}
.e:active {
  opacity: 0.6;
}

.collapsed:after {
  color: #707070;
}

:is(#buttonPlain, #buttonFormatted) {
  text-shadow: none;
  border: 0;
  background: hsl(200, 35%, 60%);
  box-shadow: none;
  color: #000;
}

:is(#buttonPlain, #buttonFormatted):not(.selected):hover {
  box-shadow: none;
  background: hsl(200, 50%, 70%);
  color: #000;
}

:is(#buttonPlain, #buttonFormatted).selected {
  box-shadow: inset 0px 1px 5px rgba(0, 0, 0, 0.7);
  background: hsl(200, 40%, 60%);
  color: #000;
}
`,R=!1,Y=new Promise(e=>{chrome.storage.local.get("themeOverride",s=>{switch(s.themeOverride){case"force_light":e(L);break;case"force_dark":e(L+`

`+F);break;case"system":default:e(L+`

@media (prefers-color-scheme: dark) {
`+F+`
}`)}})}),j=(async()=>{let e=(()=>{let t=document.body.children,o=t.length;for(let a=0;a<o;a++){let i=t[a];if(i.tagName==="PRE")return i}return null})();if(e===null)return{formatted:!1,note:"No body>pre found",rawLength:null};let s=e.textContent;if(!s)return{formatted:!1,note:"No content in body>pre",rawLength:0};let l=s.length;if(l>3e6)return{formatted:!1,note:"Too long",rawLength:l};if(!/^\s*[\{\[]/.test(s))return{formatted:!1,note:"Does not start with { or ]",rawLength:l};e.remove();let n=document.createElement("div");n.id="jsonFormatterParsed",document.body.appendChild(n);let d=document.createElement("div");d.hidden=!0,d.id="jsonFormatterRaw",d.append(e),document.body.appendChild(d);{let t;try{t=JSON.parse(s)}catch{return n.remove(),d.remove(),document.body.prepend(e),{formatted:!1,note:"Does not parse as JSON",rawLength:l}}if(typeof t!="object"&&!Array.isArray(t))return{formatted:!1,note:"Technically JSON but not an object or array",rawLength:l};let o=t;{let i=document.createElement("style");i.id="jfStyleEl",i.insertAdjacentHTML("beforeend",await Y),document.head.appendChild(i);let T=document.createElement("div");T.id="optionBar";let g=document.createElement("button"),S=document.createElement("span"),u=document.createElement("button"),M=document.createElement("span");g.appendChild(S),u.appendChild(M),g.id="buttonPlain",S.innerText="Raw",u.id="buttonFormatted",M.innerText="Parsed",u.classList.add("selected");let E=!1;g.addEventListener("mousedown",()=>{E||(E=!0,d.hidden=!1,n.hidden=!0,u.classList.remove("selected"),g.classList.add("selected"))},!1),u.addEventListener("mousedown",function(){E&&(E=!1,d.hidden=!0,n.hidden=!1,u.classList.add("selected"),g.classList.remove("selected"))},!1),T.appendChild(g),T.appendChild(u),document.body.prepend(T),document.addEventListener("mousedown",c)}let a=k(o,!1);await Promise.resolve(),n.append(a)}for(let t of document.getElementsByClassName("json-formatter-container"))t.style.display="none";return{formatted:!0,note:"done",rawLength:l};function b(t){for(let o=t.length-1;o>=0;o--)t[o].classList.add("collapsed")}function p(t){for(let o=t.length-1;o>=0;o--)t[o].classList.remove("collapsed")}function c(t){let o=t.target;if(o instanceof HTMLElement&&o.className==="e"){t.preventDefault();let a=o.parentNode;if(f(a instanceof HTMLElement),a.classList.contains("collapsed"))if(t.metaKey||t.ctrlKey){let i=a.parentNode;f(i instanceof HTMLElement),p(i.children)}else p([a]);else if(t.metaKey||t.ctrlKey){let i=a.parentNode;f(i instanceof HTMLElement),b(i.children)}else b([a])}}})();R&&j.then(e=>{let s=window.__jsonFormatterStartTime,n=performance.now()-s;console.log("JSON Formatter",e),console.log("Duration:",Math.round(n*10)/10,"ms")});})();
