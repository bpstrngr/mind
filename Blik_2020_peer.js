import peer from "./Blik_2020_peer.js";
import document,{reform,deform,insert,vectors,awesome,note,path,compose} from "./Blik_2020_document.js";
import {window,fetch,resolve,newconsole} from "./Blik_2020_window.js";
import {conceive,subceive,infer,d3} from "./Blik_2020_network.js";

window.onload=async function()
{window.console=newconsole.bind(this)();
 let keys=await fetch("./Blik_2020_client_keys.json").then(response=>response.json().then(json=>JSON.parse(new TextDecoder("utf-8").decode(new Uint8Array(json.data)))))
 import("https://apis.google.com/js/api.js").then(module=>
 gapi.load("client:auth2",done=>gapi.auth2.init({client_id:keys.google.cid,scope:"https://www.googleapis.com/auth/drive"})))
 import("https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js").then(firebase=>
 firebase.initializeApp(keys.google.firebase)&&
 import("https://www.gstatic.com/firebasejs/7.20.0/firebase-analytics.js").then(products=>
 firebase.analytics()));
 import("https://www.googletagmanager.com/gtag/js?id=UA-123329239-3").then(analytics=>
 Object.entries({js:new Date(),config:"UA-123329239-3"}).map(entry=>
 (window.dataLayer=window.dataLayer||[]).push(entry)));
 await import('./Zwarts_2015_vibrant.js');
 this.tone=import("./Yotam_2019_Tone.js").then(done=>
 this.tone=
 {string:new Tone.PolySynth(16,this.Tone.Synth).toMaster()
 ,drum:new Tone.Synth({oscillator:{type:'sine',modulationFrequency:0.2},envelope:{attack:0,decay:0.1,sustain:0,release:0.1}}).toMaster()
 ,chord:new Tone.Sequence((time,note)=>note?this.tone.string.triggerAttackRelease(note,"5hz",time):this.Tone.Transport.stop(),["C4","A3","G3",false],"45n").start()
 });
 await import("./rauch_2014_socket.io.slim.js");
 await Promise.all([vectors,awesome]);
 let socket=window.subject.socket=io.connect(window.location.origin);
 socket.on("signal",compose(deform,signal.bind(window.subject)));
 socket.on("message",message.bind(window.subject));
 socket.on("messages",messages=>messages.forEach(message.bind(window.subject)));
 Object.assign(window,{note});
 open(window.subject);
 let fields=Object.fromEntries([...new URLSearchParams(window.location.search)])
 window.subject.reform({get:{gradual:true,...fields}});
 if(!this.location.pathname.replace("/",""))
 window.subject.reform({get:{name:fields.name||"get"}});
 mode.bind(window.subject)("get","talk");
 window.subject.dispatchEvent(new Event("submit"));
}

export async function perform({resource,fragment,...fields},form)
{let get=form.reform({get:fields});
 resource=resource||await resolve(path(fields.name));
 if(typeof resource=="string")
 get={name:fields.name,transform:["media","collaborate"]};
 else
{let matrix=Object.entries(resource).filter(([key,fields])=>
 Array.isArray(fields)&&fields.every(record=>
 Array.isArray(record)&&record.every(vector=>
 !isNaN(vector)))&&delete resource[key]);
 get=
 {name:Array.isArray(resource)?resource:Object.entries(resource)
 ,transform:Object.keys(document).filter(transform=>document[transform].constructor&&document[transform].constructor.name=="AsyncFunction")
 ,matrix:matrix?matrix.map(([key])=>key):undefined
 ,placement:["force","hierarchy","radius"]
 ,gradual:false
 };
 if(fields.transform=="network")
 (resource=conceive(resource,fields))&&resource.children&&
[resource.children.map(domain=>domain.leaves())
,...matrix.filter(([key])=>[key,"average",undefined].includes(fields.matrix))
].reduce(infer)
}
 fields=form.reform({get},1);
 form.elements["name"].parentNode.querySelector("ul").__data__=resource.descendants?resource.descendants():get.name;
 return await document[fields.transform](resource,{fragment,window,...fields});
}

export default
{mind:async function(submission)
{this.action="mind";
 this.method="put";
 await peer.put.bind(this)(submission);
 this.code.value="";
 this.code.dispatchEvent(new Event("input",{bubbles:true}));
}
,get:async function(form,target=window.object,replace)
{let click=target.onclick;
 target.removeEventListener("click",click);
 let fields=Object.fromEntries(Array.from(new FormData(this)).filter(([key])=>
 this[key].parentNode.classList.contains("get")));
 let title=path(fields.name);
 if(target.title==title)
 fields.fragment=window.document.createRange().createContextualFragment(target.innerHTML);
 target.title=title;
 this.action=title;
 
 let placeholder=insert(fields.fragment,target,replace===true);
 if(replace===true)placeholder.previousSibling.remove();
 let fragment=await perform(fields,!replace&&this);
 fragment=insert(fragment,placeholder.parentNode?placeholder:target,placeholder.parentNode);
 if(placeholder.parentNode)placeholder.remove();

 fragment.addEventListener("click",click);
 if(replace&&!this.socket)
 return fragment;
 this.socket.emit("join",this.socket.room=target.title);
 delete fields.fragment;
 window.history.pushState(null,null
,window.location.href.replace(/\/*\?.*/,"/")+"?"
+Object.entries(fields).map(([key,value])=>
 !["message","name"].includes(key)&&value?key+"="+encodeURIComponent(value):null).filter(Boolean).join("&"))
 mode.bind(this)("talk","get");
 return fragment;
}
,put:async function({target:{action,elements}})
{let {name,...fields}=Object.fromEntries(Object.values(elements).filter(({parentNode:{classList}})=>
 classList&&(classList.contains(mode()))).map(input=>
 [input.id,input&&input.value]));
 let response=await fetch(new URL(this.action).pathname+"/"+name,{method:"put",body:JSON.stringify(fields)});
 await response.text().then(text=>message.bind(this)({author:{name:"system",face:"vector/deer"},message:text}))
 if(response.status!=200)
 return mode.bind(this)("talk","get");
 this.reform({get:{name:""}});
 mode.bind(this)("get","talk");
 this.dispatchEvent(new Event("submit"));
 let cookie=window.document.cookie.match(/authority=[^;]+/)[0];
 response=await fetch(cookie.replace("=","/"),{method:"put",body:JSON.stringify({author:name})})
 cookie=await response.json();
 if(!cookie.put)
 return this.socket.emit("join",path(""));
 if(this.action!=new URL(window.location.href).pathname)
 return;
 let nodes=window.object.childNodes[0].simulation.nodes;
 let join=nodes();
 this.method=="put"
?note(join.splice(findIndex(({title})=>title==name),1,conceive(node).concept))
:nodes(nodes().concat(conceive(node).concept));
 //persist custom graphs...
 //let resource=subceive(node);
}
,delete:async function({target:{action,elements}})
{mode.bind(this)("talk","get");
 let response=await fetch(path(this.name.value),{method:"delete"});
 await response.text().then(text=>message.bind(this)({author:{name:"system",face:"vector/deer"},message:text}));
 if(response.status!=200)return;
 if(path()=="authority")
 note(window.document.cookie="authority="+this.name.value+";path=/;expires="+new Date().toUTCString()+";");
 mode.bind(this)("get","talk");
 return this.dispatchEvent(new Event("submit"));

 let simulation=window.object.childNodes[0].simulation;
 simulation.nodes(simulation.nodes().filter(node=>node.title!=this.name.value));
 simulation.force("link").links(simulation.force("link").links().filter(({source,target})=>![source.title,target.title].includes(this.name.value)))
 this.reform({get:{name:""}});
 elements.name.dispatchEvent(new Event("input",{bubbles:true}));
 //persist custom graphs...
 //let resource=subceive(node);
}
,room({target:{message}})
{if(!message.value)
 return;
 this.socket.emit("message",{room:this.socket.room,message:message.value});
 message.value="";
 message.dispatchEvent(new Event("input",{bubbles:true}));
 mode.bind(this)("talk","get");
}
}

export function open(form)
{var events=
{focusin({target,type})
{window.document.documentElement.style.setProperty("--formscroll",type=="focusin"?"-"+target.closest("form").scrollLeft:0);
 target.closest("label").setAttribute("focused",(target.closest('label').getAttribute('focused')||'false')=='false');
 target.setSelectionRange(...Array(2).fill(target.value.length));
}
,focusout({target})
{let selection=target.parentNode.querySelector("ul");
 if(selection)
 target.selection=Array.from(selection.childNodes).forEach(item=>
 item.classList.remove('hover'));
 return target.dispatchEvent(new Event("focusin",{bubbles:true}));
}
,keydown({target,keyCode})
{let enter=13,up=38,down=40,escape=27,space=32;
 let selection=target.parentNode.querySelector("ul");
 if(keyCode==enter)
 return selection
?target.selection=!target.selection
?this.dispatchEvent(new Event("submit"))
:selection.childNodes[target.selection-1].click()
:this.dispatchEvent(new Event("submit"));
 if(!selection)
 return;
 if(keyCode==escape)
 return target.selection=
 target.dispatchEvent(new Event("blur"));
 if([up,down].includes(keyCode))
 return target.selection=
[0,keyCode==down?target.selection++:target.selection--
,target.selection
?target.selection>selection.childNodes.length||target.selection
:selection.childNodes.length
].reduce((index,step)=>
{if(step)
 selection.childNodes[step-1].classList.toggle('hover');
 return step;
})
}
,input({target})
{stretch(target);
 mode=mode.bind(this);

 if(target.id=="message")
 return target.value
?target.form.socket.emit("signal",this.socket.room)&&
 (mode()!="room")&&
 mode(peer.room)
:mode("talk","get");

 if(target.id=="name"&&(mode()!="mind"))
{if(filter(target))
 return mode()=="get"||
 mode("get","talk")&&
 this.reform({get:{name:target.value}})&&
 this.name.focus();

 return mode()=="put"||
 mode(peer.put)&&
 this.reform({put:
 {name:target.value,...note(target.parentNode.querySelector("ul").__data__).map(node=>
 Array.isArray(node)?[node]:Object.entries(typeof node.data=="string"||typeof node.data[node.title]=="string"||node.data[node.title]||node.data).filter(([key,value])=>typeof value=="string")
 ).reduce((template,entries)=>
 Object.assign(template,Object.fromEntries(entries.map(([key,value])=>[key,new value.constructor()]))),{})
 }})&&
 this.name.focus();
} 
 if(target.id=="code"&&(mode()!="put"))
 return target.value
?mode()!="mind"&&
 mode(peer.mind)&&
 this.reform({mind:{name:this.message.value,code:target.value}})&&
 this.code.focus()
:mode()=="mind"&&
 this.reform({talk:{message:this.name.value,code:""}})&&
 this.message.dispatchEvent(new Event("input",{bubbles:true}))&&
 (this.action=window.location.href);
}
,delete({target})
{mode=mode.bind(this);
 return mode()=="delete"
?mode("get","talk")
:mode(peer.delete)&&
 Array.from(this.querySelectorAll(".put")).map(label=>label.getAttribute("for")!="name"&&label.remove())&&
 this.reform({put:{name:this.name.value,...window.object.childNodes[0].simulation.nodes().find(({title})=>title==this.name.value).data[this.name.value]}});
}
,change({target,type},tether)
{if(target.type=="text")
 stretch(target);
}
};
 Object.entries(events).map(([key,value])=>
 form.addEventListener(key,value));
 Object.assign(form,{labels,inputs,reform});
 return form;
}

function mode(submit,alternate)
{let current=this.querySelector("svg");
 if(!submit)return current.id;
 if(this.onsubmit&&this.onsubmit.name==(peer[submit]||submit).name)
 return current.id;
 this.method=submit.name||submit;
 this.onsubmit=submit.name?submit:peer[submit];
 this.onsubmit=this.onsubmit&&this.onsubmit.bind(this);
 let id=alternate||submit.name;
 let icon={get:"node",talk:"chat",room:"paperplane",put:"plus",delete:"plus",mind:"micdrop"}[id];
 icon=document.scan({...vectors[icon],id,title:id});
 if(id=="delete")
!icon.childNodes[0].setAttribute("transform","rotate(45)")&&
 icon.childNodes[0].setAttribute("transform-origin","center center");
 icon.onclick=alternate
?event=>mode.bind(this)(alternate,submit)
:event=>this.dispatchEvent(new Event("submit"));
 return this.replaceChild(icon,current).id;
}

function filter(input)
{d3.selectAll("g.node").each(function(node){node.selected=input.value&&node.title.match(input.value);this.dispatchEvent(new Event(node.selected?"mouseover":"mouseout"))})
 return Array.from(input.parentNode.querySelectorAll("li")).map(node=>
 node.style.display=node.textContent.match(input.value)?"block":"none").filter(display=>
 display=="block").length
}

function message({message,author:{name,image}})
{message=document.scan({li:{img:{src:image||"vector/anonymous",height:"12px"},div:{"#text":name||"anonymous"},span:{"#text":message}}})
 if(name=="system")
 setTimeout(done=>(message.style="opacity:0;transition:all 1s;")&&
 setTimeout(done=>message.remove()
,1000)
,10000);
 if(!this.message)
 this.reform({talk:{message:[],...!window.document.cookie.includes("authority")&&{code:""}}})&&
 this.insertBefore(this.message.parentNode,this.querySelector("label"));
 return this.message.nextSibling.appendChild(message);
}

function signal(signal)
{let list=this.message.parentNode.querySelector("ul");
 let node=list.querySelector("span#signal");
 list[node?"replaceChild":"appendChild"](document.scan({span:{id:"signal",signal:window.document.createRange().createContextualFragment(signal)}}),node);
 node=list.querySelector("span#signal");
 signal=node.textContent;
 setTimeout(timeout=>node.textContent==signal&&node.remove(),3000);
}

function stretch(input)
{let label=Array.from(input.parentNode.childNodes).find(({nodeName})=>nodeName.toLowerCase()=="span");
 let sample=window.document.body.appendChild(document.scan(
 {span:{span:[{"#text":label?label.textContent:""},{"#text":input.value}]}
 ,style:"position:absolute;font-family:averia;top:0;font-size:var(--size);max-width:100vw;visibility:hidden;"
 }));
 setTimeout(done=>
 [label,input].map(({style},index)=>
 style.width=sample.childNodes[index].getBoundingClientRect().width+5)
 &&sample.remove()
,300);
 return input;
}

var labels={message:"",name:"",transform:"as",title:"of",category:"by",placement:"in",matrix:"from",relations:"with"};
var inputs={message:Array,name:Array,transform:Array,title:Array,placement:Array,matrix:Array,gradual:Boolean,radial:Boolean,join:Date};