"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[924],{3905:(e,t,n)=>{n.r(t),n.d(t,{MDXContext:()=>i,MDXProvider:()=>c,mdx:()=>g,useMDXComponents:()=>s,withMDXComponents:()=>p});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(){return o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o.apply(this,arguments)}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function m(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),p=function(e){return function(t){var n=s(t.components);return a.createElement(e,o({},t,{components:n}))}},s=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):d(d({},t),e)),n},c=function(e){var t=s(e.components);return a.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},b=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,i=m(e,["components","mdxType","originalType","parentName"]),p=s(n),c=r,b=p["".concat(l,".").concat(c)]||p[c]||u[c]||o;return n?a.createElement(b,d(d({ref:t},i),{},{components:n})):a.createElement(b,d({ref:t},i))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=b;var d={};for(var m in t)hasOwnProperty.call(t,m)&&(d[m]=t[m]);d.originalType=e,d.mdxType="string"==typeof e?e:r,l[1]=d;for(var i=2;i<o;i++)l[i]=n[i];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},35855:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>m,contentTitle:()=>l,default:()=>s,frontMatter:()=>o,metadata:()=>d,toc:()=>i});var a=n(83117),r=(n(67294),n(3905));const o={sidebar_position:0},l=void 0,d={unversionedId:"commands/absorb",id:"commands/absorb",title:"absorb",description:"absorb | ab | sf",source:"@site/docs/commands/absorb.md",sourceDirName:"commands",slug:"/commands/absorb",permalink:"/docs/commands/absorb",draft:!1,editUrl:"https://github.com/facebookexperimental/eden/tree/main/website/docs/commands/absorb.md",tags:[],version:"current",sidebarPosition:0,frontMatter:{sidebar_position:0},sidebar:"tutorialSidebar",previous:{title:"Commands",permalink:"/docs/category/commands"},next:{title:"add",permalink:"/docs/commands/add"}},m={},i=[{value:"absorb | ab | sf",id:"absorb--ab--sf",level:2},{value:"arguments",id:"arguments",level:2}],p={toc:i};function s(e){let{components:t,...n}=e;return(0,r.mdx)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.mdx)("h2",{id:"absorb--ab--sf"},"absorb | ab | sf"),(0,r.mdx)("p",null,(0,r.mdx)("strong",{parentName:"p"},"intelligently integrate pending changes into current stack")),(0,r.mdx)("p",null,"Attempt to amend each pending change to the proper commit in your\nstack. Absorb does not write to the working copy."),(0,r.mdx)("p",null,"If absorb cannot find an unambiguous commit to amend for a change, that\nchange will be left in the working copy, untouched. The unabsorbed\nchanges can be observed by ",(0,r.mdx)("inlineCode",{parentName:"p"},"sl status")," or ",(0,r.mdx)("inlineCode",{parentName:"p"},"sl diff")," afterwards."),(0,r.mdx)("p",null,"Commits outside the revset ",(0,r.mdx)("inlineCode",{parentName:"p"},"::. and not public() and not merge()")," will\nnot be changed."),(0,r.mdx)("p",null,"Commits that become empty after applying the changes will be deleted."),(0,r.mdx)("p",null,"By default, absorb will show what it plans to do and prompt for\nconfirmation.  If you are confident that the changes will be absorbed\nto the correct place, run ",(0,r.mdx)("inlineCode",{parentName:"p"},"sl absorb -a")," to apply the changes\nimmediately."),(0,r.mdx)("p",null,"Returns 0 if anything was absorbed, 1 if nothing was absorbed."),(0,r.mdx)("h2",{id:"arguments"},"arguments"),(0,r.mdx)("table",null,(0,r.mdx)("thead",{parentName:"table"},(0,r.mdx)("tr",{parentName:"thead"},(0,r.mdx)("th",{parentName:"tr",align:null},"shortname"),(0,r.mdx)("th",{parentName:"tr",align:null},"fullname"),(0,r.mdx)("th",{parentName:"tr",align:null},"default"),(0,r.mdx)("th",{parentName:"tr",align:null},"description"))),(0,r.mdx)("tbody",{parentName:"table"},(0,r.mdx)("tr",{parentName:"tbody"},(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"-a")),(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"--apply-changes")),(0,r.mdx)("td",{parentName:"tr",align:null}),(0,r.mdx)("td",{parentName:"tr",align:null},"apply changes without prompting for confirmation")),(0,r.mdx)("tr",{parentName:"tbody"},(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"-d")),(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"--date")),(0,r.mdx)("td",{parentName:"tr",align:null}),(0,r.mdx)("td",{parentName:"tr",align:null},"record the specified date as commit date")),(0,r.mdx)("tr",{parentName:"tbody"},(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"-n")),(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"--dry-run")),(0,r.mdx)("td",{parentName:"tr",align:null}),(0,r.mdx)("td",{parentName:"tr",align:null},"do not perform actions, just print output")),(0,r.mdx)("tr",{parentName:"tbody"},(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"-T")),(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"--template")),(0,r.mdx)("td",{parentName:"tr",align:null}),(0,r.mdx)("td",{parentName:"tr",align:null},"display with template")),(0,r.mdx)("tr",{parentName:"tbody"},(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"-I")),(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"--include")),(0,r.mdx)("td",{parentName:"tr",align:null}),(0,r.mdx)("td",{parentName:"tr",align:null},"include files matching the given patterns")),(0,r.mdx)("tr",{parentName:"tbody"},(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"-X")),(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"--exclude")),(0,r.mdx)("td",{parentName:"tr",align:null}),(0,r.mdx)("td",{parentName:"tr",align:null},"exclude files matching the given patterns")))))}s.isMDXComponent=!0}}]);