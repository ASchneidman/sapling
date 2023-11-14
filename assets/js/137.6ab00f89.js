(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[137],{3905:(e,t,n)=>{"use strict";n.r(t),n.d(t,{MDXContext:()=>i,MDXProvider:()=>f,mdx:()=>g,useMDXComponents:()=>d,withMDXComponents:()=>u});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(){return a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a.apply(this,arguments)}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=r.createContext({}),u=function(e){return function(t){var n=d(t.components);return r.createElement(e,a({},t,{components:n}))}},d=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},f=function(e){var t=d(e.components);return r.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,i=s(e,["components","mdxType","originalType","parentName"]),u=d(n),f=o,m=u["".concat(l,".").concat(f)]||u[f]||p[f]||a;return n?r.createElement(m,c(c({ref:t},i),{},{components:n})):r.createElement(m,c({ref:t},i))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=m;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:o,l[1]=c;for(var i=2;i<a;i++)l[i]=n[i];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},94285:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>z});var r=n(83117),o=n(67294),a=n(72389),l=n(86010),c=n(66412),s=n(35281),i=n(87594),u=n.n(i);const d=/title=(?<quote>["'])(?<title>.*?)\1/,f=/\{(?<range>[\d,-]+)\}/,p={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},bash:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}};function m(e,t){const n=e.map((e=>{const{start:n,end:r}=p[e];return"(?:"+n+"\\s*("+t.flatMap((e=>{var t,n;return[e.line,null==(t=e.block)?void 0:t.start,null==(n=e.block)?void 0:n.end].filter(Boolean)})).join("|")+")\\s*"+r+")"})).join("|");return new RegExp("^\\s*(?:"+n+")\\s*$")}function g(e,t){let n=e.replace(/\n$/,"");const{language:r,magicComments:o,metastring:a}=t;if(a&&f.test(a)){const e=a.match(f).groups.range;if(0===o.length)throw new Error("A highlight range has been given in code block's metastring (``` "+a+"), but no magic comment config is available. Docusaurus applies the first magic comment entry's className for metastring ranges.");const t=o[0].className,r=u()(e).filter((e=>e>0)).map((e=>[e-1,[t]]));return{lineClassNames:Object.fromEntries(r),code:n}}if(void 0===r)return{lineClassNames:{},code:n};const l=function(e,t){switch(e){case"js":case"javascript":case"ts":case"typescript":return m(["js","jsBlock"],t);case"jsx":case"tsx":return m(["js","jsBlock","jsx"],t);case"html":return m(["js","jsBlock","html"],t);case"python":case"py":case"bash":return m(["bash"],t);case"markdown":case"md":return m(["html","jsx","bash"],t);default:return m(Object.keys(p),t)}}(r,o),c=n.split("\n"),s=Object.fromEntries(o.map((e=>[e.className,{start:0,range:""}]))),i=Object.fromEntries(o.filter((e=>e.line)).map((e=>{let{className:t,line:n}=e;return[n,t]}))),d=Object.fromEntries(o.filter((e=>e.block)).map((e=>{let{className:t,block:n}=e;return[n.start,t]}))),g=Object.fromEntries(o.filter((e=>e.block)).map((e=>{let{className:t,block:n}=e;return[n.end,t]})));for(let u=0;u<c.length;){const e=c[u].match(l);if(!e){u+=1;continue}const t=e.slice(1).find((e=>void 0!==e));i[t]?s[i[t]].range+=u+",":d[t]?s[d[t]].start=u:g[t]&&(s[g[t]].range+=s[g[t]].start+"-"+(u-1)+","),c.splice(u,1)}n=c.join("\n");const h={};return Object.entries(s).forEach((e=>{let[t,{range:n}]=e;u()(n).forEach((e=>{null!=h[e]||(h[e]=[]),h[e].push(t)}))})),{lineClassNames:h,code:n}}const h="codeBlockContainer_Ckt0";function A(e){let{as:t,...n}=e;const a=function(e){const t={color:"--prism-color",backgroundColor:"--prism-background-color"},n={};return Object.entries(e.plain).forEach((e=>{let[r,o]=e;const a=t[r];a&&"string"==typeof o&&(n[a]=o)})),n}((0,c.p)());return o.createElement(t,(0,r.Z)({},n,{style:a,className:(0,l.default)(n.className,h,s.k.common.codeBlock)}))}const b={codeBlockContent:"codeBlockContent_biex",codeBlockTitle:"codeBlockTitle_Ktv7",codeBlock:"codeBlock_bY9V",codeBlockStandalone:"codeBlockStandalone_MEMb",codeBlockLines:"codeBlockLines_e6Vv",codeBlockLinesWithNumbering:"codeBlockLinesWithNumbering_o6Pm",buttonGroup:"buttonGroup__atx"};function y(e){let{children:t,className:n}=e;return o.createElement(A,{as:"pre",tabIndex:0,className:(0,l.default)(b.codeBlockStandalone,"thin-scrollbar",n)},o.createElement("code",{className:b.codeBlockLines},t))}var v=n(86668),k=n(902);const w={attributes:!0,characterData:!0,childList:!0,subtree:!0};function E(e,t){const[n,r]=(0,o.useState)(),a=(0,o.useCallback)((()=>{var t;r(null==(t=e.current)?void 0:t.closest("[role=tabpanel][hidden]"))}),[e,r]);(0,o.useEffect)((()=>{a()}),[a]),function(e,t,n){void 0===n&&(n=w);const r=(0,k.zX)(t),a=(0,k.Ql)(n);(0,o.useEffect)((()=>{const t=new MutationObserver(r);return e&&t.observe(e,a),()=>t.disconnect()}),[e,r,a])}(n,(e=>{e.forEach((e=>{"attributes"===e.type&&"hidden"===e.attributeName&&(t(),a())}))}),{attributes:!0,characterData:!1,childList:!1,subtree:!1})}var C=n(23746);const B="codeLine_lJS_",j="codeLineNumber_Tfdd",N="codeLineContent_feaV";function O(e){let{line:t,classNames:n,showLineNumbers:a,getLineProps:c,getTokenProps:s}=e;1===t.length&&"\n"===t[0].content&&(t[0].content="");const i=c({line:t,className:(0,l.default)(n,a&&B)}),u=t.map(((e,t)=>o.createElement("span",(0,r.Z)({key:t},s({token:e,key:t})))));return o.createElement("span",i,a?o.createElement(o.Fragment,null,o.createElement("span",{className:j}),o.createElement("span",{className:N},u)):u,o.createElement("br",null))}var L=n(95999);function P(e){return o.createElement("svg",(0,r.Z)({viewBox:"0 0 24 24"},e),o.createElement("path",{fill:"currentColor",d:"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"}))}function I(e){return o.createElement("svg",(0,r.Z)({viewBox:"0 0 24 24"},e),o.createElement("path",{fill:"currentColor",d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"}))}const T={copyButtonCopied:"copyButtonCopied_obH4",copyButtonIcons:"copyButtonIcons_eSgA",copyButtonIcon:"copyButtonIcon_y97N",copyButtonSuccessIcon:"copyButtonSuccessIcon_LjdS"};function x(e){let{code:t,className:n}=e;const[r,a]=(0,o.useState)(!1),c=(0,o.useRef)(void 0),s=(0,o.useCallback)((()=>{!function(e,t){let{target:n=document.body}=void 0===t?{}:t;const r=document.createElement("textarea"),o=document.activeElement;r.value=e,r.setAttribute("readonly",""),r.style.contain="strict",r.style.position="absolute",r.style.left="-9999px",r.style.fontSize="12pt";const a=document.getSelection();let l=!1;a.rangeCount>0&&(l=a.getRangeAt(0)),n.append(r),r.select(),r.selectionStart=0,r.selectionEnd=e.length;let c=!1;try{c=document.execCommand("copy")}catch{}r.remove(),l&&(a.removeAllRanges(),a.addRange(l)),o&&o.focus()}(t),a(!0),c.current=window.setTimeout((()=>{a(!1)}),1e3)}),[t]);return(0,o.useEffect)((()=>()=>window.clearTimeout(c.current)),[]),o.createElement("button",{type:"button","aria-label":r?(0,L.translate)({id:"theme.CodeBlock.copied",message:"Copied",description:"The copied button label on code blocks"}):(0,L.translate)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),title:(0,L.translate)({id:"theme.CodeBlock.copy",message:"Copy",description:"The copy button label on code blocks"}),className:(0,l.default)("clean-btn",n,T.copyButton,r&&T.copyButtonCopied),onClick:s},o.createElement("span",{className:T.copyButtonIcons,"aria-hidden":"true"},o.createElement(P,{className:T.copyButtonIcon}),o.createElement(I,{className:T.copyButtonSuccessIcon})))}function M(e){return o.createElement("svg",(0,r.Z)({viewBox:"0 0 24 24"},e),o.createElement("path",{fill:"currentColor",d:"M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"}))}const S="wordWrapButtonIcon_Bwma",W="wordWrapButtonEnabled_EoeP";function Z(e){let{className:t,onClick:n,isEnabled:r}=e;const a=(0,L.translate)({id:"theme.CodeBlock.wordWrapToggle",message:"Toggle word wrap",description:"The title attribute for toggle word wrapping button of code block lines"});return o.createElement("button",{type:"button",onClick:n,className:(0,l.default)("clean-btn",t,r&&W),"aria-label":a,title:a},o.createElement(M,{className:S,"aria-hidden":"true"}))}function U(e){var t;let{children:n,className:a="",metastring:s,title:i,showLineNumbers:u,language:f}=e;const{prism:{defaultLanguage:p,magicComments:m}}=(0,v.L)(),h=null!=(t=null!=f?f:function(e){const t=e.split(" ").find((e=>e.startsWith("language-")));return null==t?void 0:t.replace(/language-/,"")}(a))?t:p,y=(0,c.p)(),k=function(){const[e,t]=(0,o.useState)(!1),[n,r]=(0,o.useState)(!1),a=(0,o.useRef)(null),l=(0,o.useCallback)((()=>{const n=a.current.querySelector("code");e?n.removeAttribute("style"):(n.style.whiteSpace="pre-wrap",n.style.overflowWrap="anywhere"),t((e=>!e))}),[a,e]),c=(0,o.useCallback)((()=>{const{scrollWidth:e,clientWidth:t}=a.current,n=e>t||a.current.querySelector("code").hasAttribute("style");r(n)}),[a]);return E(a,c),(0,o.useEffect)((()=>{c()}),[e,c]),(0,o.useEffect)((()=>(window.addEventListener("resize",c,{passive:!0}),()=>{window.removeEventListener("resize",c)})),[c]),{codeBlockRef:a,isEnabled:e,isCodeScrollable:n,toggle:l}}(),w=function(e){var t,n;return null!=(t=null==e||null==(n=e.match(d))?void 0:n.groups.title)?t:""}(s)||i,{lineClassNames:B,code:j}=g(n,{metastring:s,language:h,magicComments:m}),N=null!=u?u:function(e){return Boolean(null==e?void 0:e.includes("showLineNumbers"))}(s);return o.createElement(A,{as:"div",className:(0,l.default)(a,h&&!a.includes("language-"+h)&&"language-"+h)},w&&o.createElement("div",{className:b.codeBlockTitle},w),o.createElement("div",{className:b.codeBlockContent},o.createElement(C.ZP,(0,r.Z)({},C.lG,{theme:y,code:j,language:null!=h?h:"text"}),(e=>{let{className:t,tokens:n,getLineProps:r,getTokenProps:a}=e;return o.createElement("pre",{tabIndex:0,ref:k.codeBlockRef,className:(0,l.default)(t,b.codeBlock,"thin-scrollbar")},o.createElement("code",{className:(0,l.default)(b.codeBlockLines,N&&b.codeBlockLinesWithNumbering)},n.map(((e,t)=>o.createElement(O,{key:t,line:e,getLineProps:r,getTokenProps:a,classNames:B[t],showLineNumbers:N})))))})),o.createElement("div",{className:b.buttonGroup},(k.isEnabled||k.isCodeScrollable)&&o.createElement(Z,{className:b.codeButton,onClick:()=>k.toggle(),isEnabled:k.isEnabled}),o.createElement(x,{className:b.codeButton,code:j}))))}function z(e){let{children:t,...n}=e;const l=(0,a.default)(),c=function(e){return o.Children.toArray(e).some((e=>(0,o.isValidElement)(e)))?e:Array.isArray(e)?e.join(""):e}(t),s="string"==typeof c?U:y;return o.createElement(s,(0,r.Z)({key:String(l)},n),c)}},66412:(e,t,n)=>{"use strict";n.d(t,{p:()=>a});var r=n(92949),o=n(86668);function a(){const{prism:e}=(0,o.L)(),{colorMode:t}=(0,r.I)(),n=e.theme,a=e.darkTheme||n;return"dark"===t?a:n}},76220:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.getAssetUrl=t.writeImagesToDisk=t.storeImage=void 0;const o=n(41601),a=r(n(26470)),l="rendered-components",c=[];function s(e,t,n){return e+"."+t+"."+n+".png"}t.storeImage=function(e,t,n,r){const o=Buffer.from(r,"base64");c.push({filename:s(e,t,n),content:o})},t.writeImagesToDisk=function(){return o.promises.mkdir(a.default.join("build",l)).then((()=>Promise.all(c.map((e=>o.promises.writeFile(a.default.join("build",l,e.filename),e.content)))).then((()=>{}))))},t.getAssetUrl=function(e,t,n){return"/"+l+"/"+s(e,t,n)}},14732:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default="data:image/png;base64,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"},20625:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const c=a(n(67294)),s=l(n(94285)),i=l(n(52263)),u=l(n(72389)),d=n(86341),f=l(n(25510)),p=l(n(14732)),m=l(n(74071)),g=n(28084),h=n(76220),A=n(44996),b=[{names:["fbsource","fbs"],project:"fbsource",canonicalName:"fbsource"},{names:["www"],project:"facebook-www",canonicalName:"www"}];t.default=e=>{const{siteConfig:t}=(0,i.default)(),n=(0,g.usePluginData)("internaldocs-fb").opts.maxCodeBlockHeight,r=(0,u.default)(),o=(0,c.useRef)(null),a=(0,c.useRef)(null),l=(0,c.useRef)(null),y=(0,c.useRef)(!1),[v,k]=(0,c.useState)(!1),w=(0,c.useCallback)((e=>{y.current||(window.requestAnimationFrame((()=>{a.current&&l.current&&(e.target.scrollTop>0?a.current.style.boxShadow="0 1em 1em -1em black inset":a.current.style.boxShadow="none",e.target.scrollTop===e.target.scrollHeight-e.target.offsetHeight?l.current.style.boxShadow="none":l.current.style.boxShadow="0 -1em 1em -1em black inset"),y.current=!1})),y.current=!0)}),[]);(0,c.useEffect)((()=>{o.current&&(o.current.addEventListener("scroll",w),window.requestAnimationFrame((()=>{w({target:o.current})})))}));const{withBaseUrl:E}=(0,A.useBaseUrlUtils)(),C=function(e){try{return(0,s.default)(e)}catch(t){return c.default.createElement("p",{style:{color:"red",fontWeight:"bold"}},"Could not render codeblock")}}(Object.assign({children:""},e));if(!r)return C;if("string"!=typeof e.file)return C;let B,j,N,O;if((0,d.isInternal)()){if(!t.customFields)return C;const{fbRepoName:n,ossRepoPath:r}=t.customFields;if("string"!=typeof n)return C;B="string"==typeof r&&"string"!=typeof e.repo?function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.map((e=>e.startsWith("/")?e.slice(1):e)).map((e=>e.endsWith("/")?e.slice(0,e.length-1):e)).join("/")}(r,e.file):e.file;const o=b.find((t=>{var r;return t.names.includes((null!==(r=e.repo)&&void 0!==r?r:n).toLowerCase())}));if(void 0===o)return C;j=function(e,t){const n=new URL("https://www.internalfb.com");return n.pathname="/code/"+e.canonicalName+"/"+t,n.toString()}(o,B),N=function(e,t){const n=new URL("https://www.internalfb.com/intern/nuclide/open/arc");return n.searchParams.append("project",e.project),n.searchParams.append("paths[0]",t),n.toString()}(o,B),O=function(e,t){if("fbsource"!==e.canonicalName||!t.startsWith("fbandroid"))return null;const n=new URL("fb-ide-opener://open");return n.searchParams.append("ide","intellij"),n.searchParams.append("filepath","/fbsource/"+t),n.toString()}(o,B)}else{if("string"!=typeof t.organizationName||"string"!=typeof t.projectName)return C;B=e.file,j=function(e,t,n){const r=new URL("https://github.com");return r.pathname="/"+e+"/"+t+"/blob/master/"+n,r.toString()}(t.organizationName,t.projectName,e.file),N=null,O=null}const L=B.split("/"),P=L[L.length-1];return c.default.createElement("div",{className:m.default.CodeBlockFrame+" "+(v?m.default.WithImage:"")},e.title?null:c.default.createElement("div",{className:m.default.CodeBlockHeader},c.default.createElement("a",{href:j,title:"Browse entire file",target:"_blank",rel:"noreferrer",onClick:()=>d.feedback.reportFeatureUsage({featureName:"browse-file",id:B}),className:m.default.CodeBlockFilenameTab},P),null!==N?c.default.createElement("a",{target:"_blank",rel:"noreferrer",href:N,onClick:()=>d.feedback.reportFeatureUsage({featureName:"open-in-vscode",id:B})},c.default.createElement("img",{title:"Open in VSCode @ FB",src:f.default})):null,null!==O?c.default.createElement("a",{target:"_blank",rel:"noreferrer",href:O,onClick:()=>d.feedback.reportFeatureUsage({featureName:"open-in-android-studio",id:B})},c.default.createElement("img",{title:"Open in Android Studio",src:p.default})):null),c.default.createElement("div",{style:{position:"relative"}},c.default.createElement("div",{ref:o,style:{maxHeight:n,overflowY:"auto"}},c.default.createElement("div",{style:{display:"flex",flexDirection:"row",width:"100%"}},c.default.createElement("div",{className:m.default.CodeBlockCodeFrame},C),c.default.createElement("div",{className:m.default.CodeBlockPreviewFrame},e.repo&&"string"==typeof e.classname&&"string"==typeof e.symbol?c.default.createElement("img",{onLoad:()=>{k(!0)},src:E((0,h.getAssetUrl)(e.repo,e.classname,e.symbol))}):null))),void 0===n?null:[c.default.createElement("div",{key:"shadowtop",ref:a,style:{bottom:0,left:0,right:0,top:0,pointerEvents:"none",transition:"all .2s ease-out",boxShadow:"none",position:"absolute"}}),c.default.createElement("div",{key:"shadowbottom",ref:l,style:{bottom:0,left:0,right:0,top:0,pointerEvents:"none",transition:"all .2s ease-out",boxShadow:"none",position:"absolute"}})]))}},25510:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default="data:image/png;base64,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"},74071:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});const r={CodeBlockFilenameTab:"CodeBlockFilenameTab_T2zd",CodeBlockFrame:"CodeBlockFrame_FcUo",CodeBlockHeader:"CodeBlockHeader_GbSM",CodeBlockCodeFrame:"CodeBlockCodeFrame_lJeJ",WithImage:"WithImage_nmsh",CodeBlockPreviewFrame:"CodeBlockPreviewFrame_qNOC"}},87594:(e,t)=>{function n(e){let t,n=[];for(let r of e.split(",").map((e=>e.trim())))if(/^-?\d+$/.test(r))n.push(parseInt(r,10));else if(t=r.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,r,o,a]=t;if(r&&a){r=parseInt(r),a=parseInt(a);const e=r<a?1:-1;"-"!==o&&".."!==o&&"\u2025"!==o||(a+=e);for(let t=r;t!==a;t+=e)n.push(t)}}return n}t.default=n,e.exports=n},26470:e=>{"use strict";function t(e){if("string"!=typeof e)throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}function n(e,t){for(var n,r="",o=0,a=-1,l=0,c=0;c<=e.length;++c){if(c<e.length)n=e.charCodeAt(c);else{if(47===n)break;n=47}if(47===n){if(a===c-1||1===l);else if(a!==c-1&&2===l){if(r.length<2||2!==o||46!==r.charCodeAt(r.length-1)||46!==r.charCodeAt(r.length-2))if(r.length>2){var s=r.lastIndexOf("/");if(s!==r.length-1){-1===s?(r="",o=0):o=(r=r.slice(0,s)).length-1-r.lastIndexOf("/"),a=c,l=0;continue}}else if(2===r.length||1===r.length){r="",o=0,a=c,l=0;continue}t&&(r.length>0?r+="/..":r="..",o=2)}else r.length>0?r+="/"+e.slice(a+1,c):r=e.slice(a+1,c),o=c-a-1;a=c,l=0}else 46===n&&-1!==l?++l:l=-1}return r}var r={resolve:function(){for(var e,r="",o=!1,a=arguments.length-1;a>=-1&&!o;a--){var l;a>=0?l=arguments[a]:(void 0===e&&(e=process.cwd()),l=e),t(l),0!==l.length&&(r=l+"/"+r,o=47===l.charCodeAt(0))}return r=n(r,!o),o?r.length>0?"/"+r:"/":r.length>0?r:"."},normalize:function(e){if(t(e),0===e.length)return".";var r=47===e.charCodeAt(0),o=47===e.charCodeAt(e.length-1);return 0!==(e=n(e,!r)).length||r||(e="."),e.length>0&&o&&(e+="/"),r?"/"+e:e},isAbsolute:function(e){return t(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0===arguments.length)return".";for(var e,n=0;n<arguments.length;++n){var o=arguments[n];t(o),o.length>0&&(void 0===e?e=o:e+="/"+o)}return void 0===e?".":r.normalize(e)},relative:function(e,n){if(t(e),t(n),e===n)return"";if((e=r.resolve(e))===(n=r.resolve(n)))return"";for(var o=1;o<e.length&&47===e.charCodeAt(o);++o);for(var a=e.length,l=a-o,c=1;c<n.length&&47===n.charCodeAt(c);++c);for(var s=n.length-c,i=l<s?l:s,u=-1,d=0;d<=i;++d){if(d===i){if(s>i){if(47===n.charCodeAt(c+d))return n.slice(c+d+1);if(0===d)return n.slice(c+d)}else l>i&&(47===e.charCodeAt(o+d)?u=d:0===d&&(u=0));break}var f=e.charCodeAt(o+d);if(f!==n.charCodeAt(c+d))break;47===f&&(u=d)}var p="";for(d=o+u+1;d<=a;++d)d!==a&&47!==e.charCodeAt(d)||(0===p.length?p+="..":p+="/..");return p.length>0?p+n.slice(c+u):(c+=u,47===n.charCodeAt(c)&&++c,n.slice(c))},_makeLong:function(e){return e},dirname:function(e){if(t(e),0===e.length)return".";for(var n=e.charCodeAt(0),r=47===n,o=-1,a=!0,l=e.length-1;l>=1;--l)if(47===(n=e.charCodeAt(l))){if(!a){o=l;break}}else a=!1;return-1===o?r?"/":".":r&&1===o?"//":e.slice(0,o)},basename:function(e,n){if(void 0!==n&&"string"!=typeof n)throw new TypeError('"ext" argument must be a string');t(e);var r,o=0,a=-1,l=!0;if(void 0!==n&&n.length>0&&n.length<=e.length){if(n.length===e.length&&n===e)return"";var c=n.length-1,s=-1;for(r=e.length-1;r>=0;--r){var i=e.charCodeAt(r);if(47===i){if(!l){o=r+1;break}}else-1===s&&(l=!1,s=r+1),c>=0&&(i===n.charCodeAt(c)?-1==--c&&(a=r):(c=-1,a=s))}return o===a?a=s:-1===a&&(a=e.length),e.slice(o,a)}for(r=e.length-1;r>=0;--r)if(47===e.charCodeAt(r)){if(!l){o=r+1;break}}else-1===a&&(l=!1,a=r+1);return-1===a?"":e.slice(o,a)},extname:function(e){t(e);for(var n=-1,r=0,o=-1,a=!0,l=0,c=e.length-1;c>=0;--c){var s=e.charCodeAt(c);if(47!==s)-1===o&&(a=!1,o=c+1),46===s?-1===n?n=c:1!==l&&(l=1):-1!==n&&(l=-1);else if(!a){r=c+1;break}}return-1===n||-1===o||0===l||1===l&&n===o-1&&n===r+1?"":e.slice(n,o)},format:function(e){if(null===e||"object"!=typeof e)throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return function(e,t){var n=t.dir||t.root,r=t.base||(t.name||"")+(t.ext||"");return n?n===t.root?n+r:n+e+r:r}("/",e)},parse:function(e){t(e);var n={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return n;var r,o=e.charCodeAt(0),a=47===o;a?(n.root="/",r=1):r=0;for(var l=-1,c=0,s=-1,i=!0,u=e.length-1,d=0;u>=r;--u)if(47!==(o=e.charCodeAt(u)))-1===s&&(i=!1,s=u+1),46===o?-1===l?l=u:1!==d&&(d=1):-1!==l&&(d=-1);else if(!i){c=u+1;break}return-1===l||-1===s||0===d||1===d&&l===s-1&&l===c+1?-1!==s&&(n.base=n.name=0===c&&a?e.slice(1,s):e.slice(c,s)):(0===c&&a?(n.name=e.slice(1,l),n.base=e.slice(1,s)):(n.name=e.slice(c,l),n.base=e.slice(c,s)),n.ext=e.slice(l,s)),c>0?n.dir=e.slice(0,c-1):a&&(n.dir="/"),n},sep:"/",delimiter:":",win32:null,posix:null};r.posix=r,e.exports=r},23746:(e,t,n)=>{"use strict";n.d(t,{ZP:()=>m,lG:()=>l});var r=n(87410);const o={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","atrule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]};var a=n(67294),l={Prism:r.Z,theme:o};function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(){return s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s.apply(this,arguments)}var i=/\r\n|\r|\n/,u=function(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)},d=function(e,t){var n=e.length;return n>0&&e[n-1]===t?e:e.concat(t)},f=function(e,t){var n=e.plain,r=Object.create(null),o=e.styles.reduce((function(e,n){var r=n.languages,o=n.style;return r&&!r.includes(t)||n.types.forEach((function(t){var n=s({},e[t],o);e[t]=n})),e}),r);return o.root=n,o.plain=s({},n,{backgroundColor:null}),o};function p(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===t.indexOf(r)&&(n[r]=e[r]);return n}const m=function(e){function t(){for(var t=this,n=[],r=arguments.length;r--;)n[r]=arguments[r];e.apply(this,n),c(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var n=e.theme?f(e.theme,e.language):void 0;return t.themeDict=n})),c(this,"getLineProps",(function(e){var n=e.key,r=e.className,o=e.style,a=s({},p(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),l=t.getThemeDict(t.props);return void 0!==l&&(a.style=l.plain),void 0!==o&&(a.style=void 0!==a.style?s({},a.style,o):o),void 0!==n&&(a.key=n),r&&(a.className+=" "+r),a})),c(this,"getStyleForToken",(function(e){var n=e.types,r=e.empty,o=n.length,a=t.getThemeDict(t.props);if(void 0!==a){if(1===o&&"plain"===n[0])return r?{display:"inline-block"}:void 0;if(1===o&&!r)return a[n[0]];var l=r?{display:"inline-block"}:{},c=n.map((function(e){return a[e]}));return Object.assign.apply(Object,[l].concat(c))}})),c(this,"getTokenProps",(function(e){var n=e.key,r=e.className,o=e.style,a=e.token,l=s({},p(e,["key","className","style","token"]),{className:"token "+a.types.join(" "),children:a.content,style:t.getStyleForToken(a),key:void 0});return void 0!==o&&(l.style=void 0!==l.style?s({},l.style,o):o),void 0!==n&&(l.key=n),r&&(l.className+=" "+r),l})),c(this,"tokenize",(function(e,t,n,r){var o={code:t,grammar:n,language:r,tokens:[]};e.hooks.run("before-tokenize",o);var a=o.tokens=e.tokenize(o.code,o.grammar,o.language);return e.hooks.run("after-tokenize",o),a}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,n=e.language,r=e.code,o=e.children,a=this.getThemeDict(this.props),l=t.languages[n];return o({tokens:function(e){for(var t=[[]],n=[e],r=[0],o=[e.length],a=0,l=0,c=[],s=[c];l>-1;){for(;(a=r[l]++)<o[l];){var f=void 0,p=t[l],m=n[l][a];if("string"==typeof m?(p=l>0?p:["plain"],f=m):(p=d(p,m.type),m.alias&&(p=d(p,m.alias)),f=m.content),"string"==typeof f){var g=f.split(i),h=g.length;c.push({types:p,content:g[0]});for(var A=1;A<h;A++)u(c),s.push(c=[]),c.push({types:p,content:g[A]})}else l++,t.push(p),n.push(f),r.push(0),o.push(f.length)}l--,t.pop(),n.pop(),r.pop(),o.pop()}return u(c),s}(void 0!==l?this.tokenize(t,r,l,n):[r]),className:"prism-code language-"+n,style:void 0!==a?a.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(a.Component)}}]);