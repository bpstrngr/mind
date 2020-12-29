import {newconsole,note} from "./Blik_2020_window.js";
import {stretch,get as create} from "./Blik_2020_form.js";
newconsole.bind(window)();
//const react=import(process.execPath.replace("bin/node","lib/node_modules")+"/react").then(react=>react)
import * as react1 from "https://unpkg.com/react@17.0.1/umd/react.development.js";
import * as reactdom from "https://unpkg.com/react-dom@17.0.1/umd/react-dom.development.js";
import * as reactdomserver from "https://unpkg.com/react-dom@17.0.1/umd/react-dom-server.browser.development.js";
import * as reactsvg from "https://unpkg.com/react-svg/dist/react-svg.umd.production.js";
//import {motion} from "./facebook_2016_react-motion.min.js";
//const _reactMotion=ReactMotion;

function Seed(properties)
{const [name,setname]=useState(properties.name);
 return react("center",{id:"object"})
}

function Peer(properties)
{const [fields,setfields]=useState(properties);
 const [width,stretch]=useState(50);
 let labels={source:"",transform:"as"}
 labels=Object.entries(fields).map(([id,value])=>
 react("label",key({htmlFor:id}),null,
[react("span",key(),typeof labels[id]=="string"?labels[id]:id)
,react("input",key(
 {id,name:id,value
 ,onChange:({target})=>
{let span=document.body.appendChild(document.createElement("span"));span.textContent=target.value;
 !note(stretch(Math["max"](span.getBoundingClientRect().width+5,30)));
 span.remove();
 setfields(Object.assign(fields,{[id]:target.value}));
}
 ,onKeyDown:({keyCode,target})=>keyCode==13&&target.closest("form").submit()
 ,style:{width}
 }))
]));
 let toggle=react("svg",key({src:"vector/node"}));
 labels.unshift(toggle);
 let [promise,resolve]=useState(false);
 toggle=useRef(toggle);
 useEffect(load=>fetch("vector/node").then(svg=>svg.text()).then(svg=>
 toggle.current=(svg)).finally(resolve));
 return react("form"
,{id:"subject"
 ,className:"subject"
 ,onSubmit:event=>event.preventDefault()&&create(event.target)
 },null,labels)
}

function Toggle({url})
{const icon=useRef(null);
 const [promise,resolve]=useState(false);
 useLayoutEffect(load=>
{fetch(url).then(svg=>svg.text()).then(svg=>
 icon.current=(svg,{componentName:'Toggle'})).finally(done=>resolve(true))
});
 if(promise&&icon.current)
 return react("svg",note(key({ref:icon})))
 return react("svg",key());
}


function key(props={})
{key.index=key.index||0;
 return Object.assign(props,{key:key.index++});
}

const fragment=text=>document.createRange().createContextualFragment(text);

const {useState,useEffect,useLayoutEffect,useRef,createElement:react}=React;
ReactDOM.render(react(Peer,{source:"mind/ranger",transform:"network"}),document.body.appendChild(document.createElement("div")));
ReactDOM.render(react(Seed,{source:"mind/ranger",transform:"network"}),document.body.appendChild(document.createElement("div")));
