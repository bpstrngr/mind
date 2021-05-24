import {window,newconsole,note} from "./Blik_2020_window.js";
import {stretch,get as create} from "./Blik_2020_form.js";
newconsole.bind(window)();
//const react=import(process.execPath.replace("bin/node","lib/node_modules")+"/react").then(react=>react)
//import * as react1 from "https://unpkg.com/react@17.0.1/umd/react.development.js";
//import * as reactdom from "https://unpkg.com/react-dom@17.0.1/umd/react-dom.development.js";
//import * as reactdomserver from "https://unpkg.com/react-dom@17.0.1/umd/react-dom-server.browser.development.js";
//import * as reactsvg from "https://unpkg.com/react-svg/dist/react-svg.umd.production.js";
//import {motion} from "./facebook_2016_react-motion.min.js";
//const _reactMotion=ReactMotion;

const fragment=text=>window.document.createRange().createContextualFragment(text);
const key=(props={})=>Object.assign(props,{key:key.index=(key.index||0)+1});

function Peer(properties)
{const [fields,setfields]=useState({source:"mind/ranger",transform:"network"});
 const [width,stretch]=useState(50);
 let labels={source:"",transform:"as"}
 labels=Object.entries(fields).map(([id,value])=>
 compose("label",key({htmlFor:id}),null,
 [compose("span",key(),typeof labels[id]=="string"?labels[id]:id)
 ,compose("input",key(
 {id,name:id,value
 ,onChange({target})
{let span=document.body.appendChild(document.createElement("span"));span.textContent=target.value;
 !note(stretch(Math["max"](span.getBoundingClientRect().width+5,30)));
 span.remove();
 setfields(Object.assign(fields,{[id]:target.value}));
},onKeyDown:({keyCode,target})=>keyCode==13&&target.closest("form").submit()
 ,style:{width}
 }))
 ]));
 let toggle=compose("svg",key({src:"vector/node"}));
 labels.unshift(toggle);
 let [promise,resolve]=useState(false);
 toggle=useRef(toggle);
 useEffect(load=>fetch("vector/node").then(svg=>svg.text()).then(svg=>
 toggle.current=fragment(svg)).finally(resolve));
 return compose("form"
,{id:"subject"
 ,className:"subject"
 ,onSubmit:event=>event.preventDefault()&&create(event.target)
 },null,labels)
}

function Toggle({url})
{const icon=useRef(null);
 const [promise,resolve]=useState(false);
 useLayoutEffect(load=>
 fetch(url).then(svg=>svg.text()).then(svg=>
 icon.current=fragment(svg)).finally(done=>resolve(true)));
 if(promise&&icon.current)
 return compose("svg",note(key({ref:icon})))
 return compose("svg",key());
}

function Seed(properties)
{const [name,setname]=useState(properties.name);
 return compose("center",{id:"object"});
}

Promise.all(
["https://unpkg.com/react@17.0.1/umd/react.development.js"
,"https://unpkg.com/react-dom@17.0.1/umd/react-dom.development.js"
,"https://unpkg.com/browse/@reduxjs/toolkit@1.5.1/dist/redux-toolkit.umd.js"
].map(module=>import(module))).then(function()
{const {Fragment,useState,useEffect,useLayoutEffect,useRef,createElement:compose}=window.React;
 const {render}=window.ReactDOM;
 console.log(redux)
 render(compose(Fragment,null,...[Peer,Seed].map(compose)),window.document.body);
});