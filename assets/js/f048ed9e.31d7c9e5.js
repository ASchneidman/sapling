(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9962],{3905:(e,t,n)=>{"use strict";n.r(t),n.d(t,{MDXContext:()=>m,MDXProvider:()=>p,mdx:()=>h,useMDXComponents:()=>u,withMDXComponents:()=>d});var a=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(){return i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},i.apply(this,arguments)}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var m=a.createContext({}),d=function(e){return function(t){var n=u(t.components);return a.createElement(e,i({},t,{components:n}))}},u=function(e){var t=a.useContext(m),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=u(e.components);return a.createElement(m.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},g=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,r=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),d=u(n),p=o,g=d["".concat(r,".").concat(p)]||d[p]||c[p]||i;return n?a.createElement(g,l(l({ref:t},m),{},{components:n})):a.createElement(g,l({ref:t},m))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,r=new Array(i);r[0]=g;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,r[1]=l;for(var m=2;m<i;m++)r[m]=n[m];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}g.displayName="MDXCreateElement"},47903:e=>{const t="sapling",n="https://github.com/facebook/sapling";function a(e){return n+"/"+e}const o=a("releases/latest");e.exports={gitHubRepoName:t,gitHubRepo:n,gitHubRepoUrl:a,latestReleasePage:o}},920:(e,t,n)=>{"use strict";n.d(t,{RJ:()=>m,Xj:()=>l,bv:()=>s,mY:()=>r,nk:()=>d});var a=n(67294),o=n(44996),i=n(50941);function r(e){let{name:t,linkText:n}=e;const i=function(e){switch(e){case"go":return"goto";case"isl":return"web"}return e}(t),r=null!=n?n:t;return a.createElement("a",{href:(0,o.default)("/docs/commands/"+i)},a.createElement("code",null,r))}function l(e){let{name:t}=e;return a.createElement(r,{name:t,linkText:"sl "+t})}function s(){return a.createElement("p",{style:{textAlign:"center"}},a.createElement("img",{src:(0,o.default)("/img/reviewstack-demo.gif"),width:800,align:"center"}))}function m(e){let{alt:t,light:n,dark:r}=e;return a.createElement(i.Z,{alt:t,sources:{light:(0,o.default)(n),dark:(0,o.default)(r)}})}function d(e){let{src:t}=e;return a.createElement("video",{controls:!0},a.createElement("source",{src:(0,o.default)(t)}))}},45675:(e,t,n)=>{"use strict";n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>s,default:()=>c,frontMatter:()=>l,metadata:()=>m,toc:()=>u});var a=n(83117),o=(n(67294),n(3905)),i=n(47903),r=n(920);const l={sidebar_position:20},s="Getting started",m={unversionedId:"introduction/getting-started",id:"introduction/getting-started",title:"Getting started",description:"This section will walk you through cloning your first repo, making commits, and submitting them as GitHub pull requests.",source:"@site/docs/introduction/getting-started.md",sourceDirName:"introduction",slug:"/introduction/getting-started",permalink:"/docs/introduction/getting-started",draft:!1,editUrl:"https://github.com/facebookexperimental/eden/tree/main/website/docs/introduction/getting-started.md",tags:[],version:"current",sidebarPosition:20,frontMatter:{sidebar_position:20},sidebar:"tutorialSidebar",previous:{title:"Release notes",permalink:"/docs/introduction/release-notes"},next:{title:"Git cheat sheet",permalink:"/docs/introduction/git-cheat-sheet"}},d={},u=[{value:"Setting your identity",id:"setting-your-identity",level:2},{value:"Authenticating with GitHub",id:"authenticating-with-github",level:2},{value:"Cloning your first repo",id:"cloning-your-first-repo",level:2},{value:"Creating your first commit",id:"creating-your-first-commit",level:2},{value:"Creating your first stack",id:"creating-your-first-stack",level:2},{value:"Manipulating your stack",id:"manipulating-your-stack",level:2},{value:"Submitting pull requests",id:"submitting-pull-requests",level:2},{value:"Browsing pull requests",id:"browsing-pull-requests",level:2}],p={toc:u};function c(e){let{components:t,...n}=e;return(0,o.mdx)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.mdx)("h1",{id:"getting-started"},"Getting started"),(0,o.mdx)("p",null,"This section will walk you through cloning your first repo, making commits, and submitting them as GitHub pull requests."),(0,o.mdx)("h2",{id:"setting-your-identity"},"Setting your identity"),(0,o.mdx)("p",null,"Once you have ",(0,o.mdx)("inlineCode",{parentName:"p"},"sl")," ",(0,o.mdx)("a",{parentName:"p",href:"/docs/introduction/installation"},"installed")," on the command line, you should start out by configuring the identity you wish to use when authoring commits:"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre"},'sl config --user ui.username "Alyssa P. Hacker <alyssa@example.com>"\n')),(0,o.mdx)("p",null,"If you do not already have a global Sapling config file, the command above will create it for you. The location of the file varies by platform, though you can run ",(0,o.mdx)("inlineCode",{parentName:"p"},"sl configfile --user")," to find it."),(0,o.mdx)("ul",null,(0,o.mdx)("li",{parentName:"ul"},"Linux ",(0,o.mdx)("inlineCode",{parentName:"li"},"~/.config/sapling/sapling.conf")," (or ",(0,o.mdx)("inlineCode",{parentName:"li"},"$XDG_CONFIG_HOME")," instead of ",(0,o.mdx)("inlineCode",{parentName:"li"},"~/.config"),", if set)"),(0,o.mdx)("li",{parentName:"ul"},"macOS ",(0,o.mdx)("inlineCode",{parentName:"li"},"~/Library/Preferences/sapling/sapling.conf")),(0,o.mdx)("li",{parentName:"ul"},"Windows ",(0,o.mdx)("inlineCode",{parentName:"li"},"%APPDATA%\\sapling\\sapling.conf"))),(0,o.mdx)("h2",{id:"authenticating-with-github"},"Authenticating with GitHub"),(0,o.mdx)("p",null,"Sapling has a number of custom integrations with GitHub pull requests. In order to communicate with GitHub, Sapling needs a ",(0,o.mdx)("a",{parentName:"p",href:"https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"},"personal access token")," to talk to the GitHub API. Rather than have Sapling manage your token, we recommend ",(0,o.mdx)("a",{parentName:"p",href:"https://cli.github.com/"},"installing the GitHub CLI (",(0,o.mdx)("inlineCode",{parentName:"a"},"gh"),")")," and using it to authenticate with GitHub as follows:"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre"},"gh auth login --git-protocol https\n")),(0,o.mdx)("p",null,"Note that the GitHub CLI is also GitHub's recommended solution for ",(0,o.mdx)("a",{parentName:"p",href:"https://docs.github.com/en/get-started/getting-started-with-git/caching-your-github-credentials-in-git"},"caching your GitHub credentials in Git")," so that you don't have to enter a password or token every time you ",(0,o.mdx)("inlineCode",{parentName:"p"},"sl push"),"."),(0,o.mdx)("h2",{id:"cloning-your-first-repo"},"Cloning your first repo"),(0,o.mdx)("p",null,"Assuming you authenticated with ",(0,o.mdx)("inlineCode",{parentName:"p"},"gh")," using ",(0,o.mdx)("inlineCode",{parentName:"p"},"--git-protocol https"),", make sure to be consistent and use the HTTPS URL (as opposed to the SSH URI) for your GitHub repo as an argument to ",(0,o.mdx)("inlineCode",{parentName:"p"},"sl clone"),":"),(0,o.mdx)("pre",null,"$ sl clone "+i.gitHubRepo+"\n$ cd "+i.gitHubRepoName+"\n$ sl\n@  fafe18a24  23 minutes ago  ricglz  remote/main\n\u2502  migrate packer to new CLI framework\n~\n"),(0,o.mdx)("p",null,"From inside a repo, running ",(0,o.mdx)("inlineCode",{parentName:"p"},"sl")," with no arguments shows you your commit graph. Initially, this will contain only the head of the default branch, ",(0,o.mdx)("inlineCode",{parentName:"p"},"main"),"."),(0,o.mdx)("h2",{id:"creating-your-first-commit"},"Creating your first commit"),(0,o.mdx)("p",null,"Sapling provides familiar ",(0,o.mdx)("inlineCode",{parentName:"p"},"add")," and ",(0,o.mdx)("inlineCode",{parentName:"p"},"commit"),"/",(0,o.mdx)("inlineCode",{parentName:"p"},"ci")," commands to create a commit:"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-sl-shell-example"},"$ touch hello.txt\n$ sl add .\n$ echo 'Hello, World!' > hello.txt\n$ sl commit -m 'my first commit with Sapling'\n$ sl\n  @  5a7b44286  25 seconds ago  alyssa\n\u256d\u2500\u256f  my first commit with Sapling\n\u2502\no  fafe18a24  27 minutes ago  remote/main\n\u2502\n~\n")),(0,o.mdx)("p",null,"Note that unlike Git, there was no need to explicitly declare a new branch before creating a commit. Sapling tracks heads automatically, which are readily visible when you run ",(0,o.mdx)("inlineCode",{parentName:"p"},"sl"),"."),(0,o.mdx)("p",null,"Another important difference from Git is that ",(0,o.mdx)("em",{parentName:"p"},"there is no index where changes must be staged for commit"),". If you had run the above commands using ",(0,o.mdx)("inlineCode",{parentName:"p"},"git")," instead of ",(0,o.mdx)("inlineCode",{parentName:"p"},"sl"),", the Git commit would contain an empty ",(0,o.mdx)("inlineCode",{parentName:"p"},"hello.txt")," file with the non-empty version of the file waiting to be staged."),(0,o.mdx)("h2",{id:"creating-your-first-stack"},"Creating your first stack"),(0,o.mdx)("p",null,"For illustration purposes, we'll go ahead and create a few more commits:"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-sl-shell-example"},"$ echo foo > foo.txt ; sl add foo.txt ; sl ci -m 'adding foo'\n$ echo bar > bar.txt ; sl add bar.txt ; sl ci -m 'adding bar'\n$ echo baz > baz.txt ; sl add baz.txt ; sl ci -m 'adding baz'\n$ sl\n  @  4d9180fd8  1 second ago  alyssa\n  \u2502  adding baz\n  \u2502\n  o  3cc43c835  7 seconds ago  alyssa\n  \u2502  adding bar\n  \u2502\n  o  4f1243a8b  11 seconds ago  alyssa\n\u256d\u2500\u256f  adding foo\n\u2502\no  f22585511  Oct 06 at 17:40  remote/main\n\u2502\n~\n")),(0,o.mdx)("p",null,"After creating your stack, ",(0,o.mdx)("inlineCode",{parentName:"p"},"sl")," uses ",(0,o.mdx)("inlineCode",{parentName:"p"},"@")," to indicate that you are at the top of the stack of commits you just created. The ",(0,o.mdx)(r.mY,{name:"go",mdxType:"Command"})," command supports a number of special aliases, such as ",(0,o.mdx)(r.mY,{name:"go",linkText:"sl go top",mdxType:"Command"})," and ",(0,o.mdx)(r.mY,{name:"go",linkText:"sl go bottom",mdxType:"Command"})," to navigate to the top and bottom of your stack, respectively."),(0,o.mdx)("p",null,"You can also use the ",(0,o.mdx)(r.mY,{name:"next",mdxType:"Command"})," and ",(0,o.mdx)(r.mY,{name:"prev",mdxType:"Command"}),' commands to move up and down the stack. Both of these commands take an optional number of "steps" to take, e.g., ',(0,o.mdx)(r.mY,{name:"next",linkText:"sl next 2",mdxType:"Command"})," will move two commits up the stack."),(0,o.mdx)("h2",{id:"manipulating-your-stack"},"Manipulating your stack"),(0,o.mdx)("p",null,"See ",(0,o.mdx)("a",{parentName:"p",href:"/docs/overview/basic-commands"},"Basic Commands")," to learn more about manipulating your stack from the command line."),(0,o.mdx)("p",null,"You may also want to try Sapling's built-in GUI that runs in the browser . Run ",(0,o.mdx)(r.Xj,{name:"web",mdxType:"SLCommand"})," to launch it from the command line:"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-sl-shell-example"},"$ sl web\nListening on http://localhost:3011/?token=929fa2b3d75aa4330e0b7b0a10822ee0&cwd=%2FUsers%2Falyssa%2Fsrc%2Fsapling\nServer logs will be written to /var/folders/5c/f3nk25tn7gd7nds59hy_nj7r0000gn/T/isl-server-logKktwaj/isl-server.log\n")),(0,o.mdx)("p",null,"Sapling will open the URL automatically in your browser. See the docs on ",(0,o.mdx)("a",{parentName:"p",href:"/docs/addons/isl"},"Interactive Smartlog")," to learn more about its many features. Interactive Smartlog is also available in our ",(0,o.mdx)("a",{parentName:"p",href:"../addons/vscode"},"VS Code Extension"),"."),(0,o.mdx)("h2",{id:"submitting-pull-requests"},"Submitting pull requests"),(0,o.mdx)("p",null,"Sapling supports multiple workflows for interacting with GitHub pull requests. The simplest solution is the ",(0,o.mdx)(r.Xj,{name:"pr",mdxType:"SLCommand"})," command:"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-sl-shell-example"},"$ sl pr submit\n...\n$ sl\n  @  4d9180fd8  6 minutes ago  alyssa  #178\n  \u2502  adding baz\n  \u2502\n  o  3cc43c835  6 minutes ago  alyssa  #177\n  \u2502  adding bar\n  \u2502\n  o  4f1243a8b  6 minutes ago  alyssa  #176\n\u256d\u2500\u256f  adding foo\n\u2502\no  f22585511  Oct 06 at 17:40  remote/main\n\u2502\n~\n$ sl pr submit\n#178 is up-to-date\n#177 is up-to-date\n#176 is up-to-date\nno pull requests to update\n")),(0,o.mdx)("p",null,"As shown, running ",(0,o.mdx)("inlineCode",{parentName:"p"},"sl pr submit"),' creates a pull request (PR) for every commit in your local stack. Note this creates "overlapping pull requests," which means each PR uses the associated commit as the head of the PR and ',(0,o.mdx)("inlineCode",{parentName:"p"},"remote/main")," as the base. Reviewing overlapping pull requests on GitHub can be confusing, so we also provide ",(0,o.mdx)("a",{parentName:"p",href:"/docs/addons/reviewstack"},"ReviewStack")," as an alternative code review tool that handles these kinds of pull requests better."),(0,o.mdx)("p",null,"After you have created an initial series of pull requests using ",(0,o.mdx)(r.mY,{name:"pr",sl:!0,mdxType:"Command"}),", you will likely make local changes to your commits that need to be submitted for review. To publish these local changes to GitHub, simply run ",(0,o.mdx)(r.mY,{name:"pr",sl:!0,mdxType:"Command"})," again to update your existing PRs. Note if you have introduced new commits in your stack that are not linked to a PR, ",(0,o.mdx)(r.mY,{name:"pr",sl:!0,mdxType:"Command"})," will create pull requests for those, as well."),(0,o.mdx)("p",null,'The "overlapping pull requests" approach may not be an appropriate solution for your project. To that end, we also support an alternative pull request workflow, ',(0,o.mdx)(r.mY,{name:"ghstack",sl:!0,mdxType:"Command"}),', which avoids the "overlapping pull requests" issue, but may not be an option for all projects. See the ',(0,o.mdx)("a",{parentName:"p",href:"/docs/git/intro#pull-requests"},"Pull Requests section")," in ",(0,o.mdx)("strong",{parentName:"p"},"Using Sapling with GitHub")," to determine which workflow is right for you."),(0,o.mdx)("h2",{id:"browsing-pull-requests"},"Browsing pull requests"),(0,o.mdx)("p",null,"If you have used Sapling to create pull requests for your commits, then you can use ",(0,o.mdx)("inlineCode",{parentName:"p"},"sl ssl")," to include the pull request status in your Smartlog. Note that ",(0,o.mdx)("inlineCode",{parentName:"p"},"sl ssl")," is not a subcommand, but a built-in alias for ",(0,o.mdx)("inlineCode",{parentName:"p"},"sl smartlog -T {ssl}"),":"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-sl-shell-example"},"$ sl ssl\n  @  4d9180fd8  6 minutes ago  alyssa  #178 Unreviewed\n  \u2502  adding baz\n  \u2502\n  o  3cc43c835  6 minutes ago  alyssa  #177 Approved\n  \u2502  adding bar\n  \u2502\n  o  4f1243a8b  6 minutes ago  alyssa  #176 Closed\n\u256d\u2500\u256f  adding foo\n\u2502\no  f22585511  Oct 06 at 17:40  remote/main\n\u2502\n~\n")),(0,o.mdx)("p",null,"In addition to reviewing pull requests on github.com, you may also want to try ",(0,o.mdx)("a",{parentName:"p",href:"/docs/addons/reviewstack"},"ReviewStack"),", which is our novel user interface for GitHub pull requests with custom support for ",(0,o.mdx)("em",{parentName:"p"},"stacked changes"),"."),(0,o.mdx)("p",null,"To view a GitHub pull request on ReviewStack, take the original URL:"),(0,o.mdx)("blockquote",null,(0,o.mdx)("p",{parentName:"blockquote"},(0,o.mdx)("a",{parentName:"p",href:"https://github.com/facebook/react/pull/25506"},"facebook/react#25506"))),(0,o.mdx)("p",null,"and replace the ",(0,o.mdx)("inlineCode",{parentName:"p"},"github.com")," domain with ",(0,o.mdx)("inlineCode",{parentName:"p"},"reviewstack.dev"),":"),(0,o.mdx)("blockquote",null,(0,o.mdx)("p",{parentName:"blockquote"},(0,o.mdx)("a",{parentName:"p",href:"https://reviewstack.dev/facebook/react/pull/25506"},"https://reviewstack.dev/facebook/react/pull/25506"))),(0,o.mdx)("p",null,"On ReviewStack, the diff and the timeline for a pull request are displayed side-by-side rather than split across tabs. Read the ",(0,o.mdx)("a",{parentName:"p",href:"/docs/addons/reviewstack"},"ReviewStack docs")," to learn more about the various features it offers."),(0,o.mdx)(r.bv,{mdxType:"ReviewStackScreenshot"}),(0,o.mdx)("p",null,"By default, pull requests in the Smartlog displayed by ",(0,o.mdx)("inlineCode",{parentName:"p"},"sl")," are linked to the corresponding page on ",(0,o.mdx)("inlineCode",{parentName:"p"},"github.com"),", but you can run the following to configure the Smartlog to link to ",(0,o.mdx)("inlineCode",{parentName:"p"},"reviewstack.dev")," instead:"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre"},"sl config --user github.pull_request_domain reviewstack.dev\n")))}c.isMDXComponent=!0}}]);