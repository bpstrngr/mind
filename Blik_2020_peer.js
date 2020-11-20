import document,{reform,deform,insert,vectors,awesome,note,path,compose} from "./Blik_2020_document.js";
import {window,fetch,resolve,newconsole} from "./Blik_2020_window.js";
import {conceive,subceive,infer,d3} from "./Blik_2020_network.js";
import {peer as room} from "./Blik_2020_room.js";

export async function perform({resource,fragment,...fields},form)
{let get=form?form.reform({get:fields}):fields;
 resource=resource||await resolve(path(fields.name));
 if(resource instanceof Error){resource=resource.toString();fields.transform="media"};
 if(typeof resource=="string"||resource instanceof String)
 get={name:fields.name,transform:["media","script"]};
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
 ,title:["name","image","wiki image"]
 ,gradual:false
 };
 if(["network","cumulation"].includes(fields.transform))
 (resource=conceive(resource,fields))&&resource.children&&
[resource.children.map(domain=>domain.leaves())
,...matrix.filter(([key])=>[key,"average",undefined].includes(fields.matrix))
].reduce(infer)
}
 if(form)
 fields=form.reform({get},1);
 if(form&&form.elements["name"])
 form.elements["name"].parentNode.querySelector("ul").__data__=resource.descendants?resource.descendants():get.name;
 return await document[fields.transform](resource,{fragment,window,...fields});
}

export async function open(form)
{let labels={message:"",name:"",transform:"as",title:"of",category:"on",placement:"by",matrix:"from",relations:"with"};
 let inputs={message:Array,name:Array,transform:Array,title:Array,placement:Array,matrix:Array,gradual:Boolean,radial:Boolean,join:Date};
 Object.assign(form,{labels,inputs,reform});
 if(form.room)
 Object.entries(room).forEach(([key,value])=>form.room.on(key,value.bind(form)));
 Object.entries(peer).forEach(([key,value])=>form.addEventListener(key,value));
 return form;
}

export async function get(form,target=window.object,replace)
{if(!target.parentNode)return;
 let click=target.onclick;
 target.removeEventListener("click",click);
 let fields=form instanceof Event
?Object.fromEntries(Array.from(new FormData(this)).filter(([key])=>
 this[key].parentNode.classList.contains("get")))
:form;
 note(fields)
 if(!fields.name)return;
 let title=path(fields.name);
 if(target.title==title)
 fields.fragment=window.document.createRange().createContextualFragment(target.innerHTML);
 target.title=title;
 //this.action=title;
 let placeholder=insert(fields.fragment,target,replace===true);
 let fragment=await perform(fields,!replace&&this);
 fragment=insert(fragment,placeholder.parentNode?placeholder:target,placeholder.parentNode);
 fragment.addEventListener("click",click);
 if(replace&&!this||!this.room||!(form instanceof Event))
 return fragment;
 this.room.emit("join",this.room.name=target.title);
 delete fields.fragment;
 window.history.pushState(null,null
,window.location.href.replace(/\/*\?.*/,"/")+"?"
+Object.entries(fields).map(([key,value])=>
 !["message"].includes(key)&&value?key+"="+encodeURIComponent(value):null).filter(Boolean).join("&"))
 this.dispatchEvent(new Event("switch"));
 return fragment;
}

var peer=
 {submit:async function(event)
{event.preventDefault();
 let method=note(this.getAttribute("method"));
 if(method=="get")return get.bind(this)(event);
 if(method=="send")return send.bind(this)();
 let {name,...fields}=Object.fromEntries(Object.values(this.elements).filter(({parentNode:{classList}})=>
 classList&&(classList.contains(this.getAttribute("method")))).map(({id,value})=>[id,value]));
 let action=[this.action,name].join("/");
 let signature=window.document.cookie.match(/signature=[^;]+/);
 if(method=="sign")
[signature?{name:this.labels.message}:{name:this.name.value,code:this.code.value}
,["action",action=signature?"/"+signature[0].replace("=","/"):"mind/"+name]
,["method",method=signature?"delete":"put"]
].forEach((fields,index)=>
 index?this.setAttribute(...fields):this.reform({[method]:fields}));
 let request={method,...{put:{body:JSON.stringify(fields),headers:{"Content-Type":"application/json"}}}[method]};
 let [status,message]=await fetch(action,note(request)).then(response=>
 Promise.all([response.status,response.text()]));
 room.message.bind(this)({author:{name:"system",face:"vector/deer"},message});
 this.dispatchEvent(new Event("switch"));
 if(status!=200)return;
 if(method=="delete"&&this.action.startsWith("/signature"))
 note(window.document.cookie=this.action.substring(1).replace("/","=")+";path=/;expires="+new Date().toUTCString()+";")&&
 this.room.emit("leave",this.room.name)&&
 (this.labels.message="");
 return this.dispatchEvent(new Event("switch"));
 return this.dispatchEvent(new Event("submit"));
 let nodes=window.object.childNodes[0].simulation.nodes;
 this.method=="put"
?note(nodes().splice(findIndex(({title})=>title==name),1,conceive(node).concept))
:nodes(nodes().concat(conceive(node).concept));
 let simulation=window.object.childNodes[0].simulation;
 simulation.nodes(simulation.nodes().filter(node=>node.title!=this.name.value));
 simulation.force("link").links(simulation.force("link").links().filter(({source,target})=>![source.title,target.title].includes(this.name.value)))
 this.reform({get:{name:""}});
 this.elements.name.dispatchEvent(new Event("input",{bubbles:true}));
 //persist custom graphs...
 //let resource=subceive(node);
},input({target})
{["change","switch"].map(event=>
 target.dispatchEvent(new Event(event,{bubbles:true})));
 if(target.id=="message"&&target.value)
 return this.room.emit("signal",this.room.name);
},keydown({target,keyCode})
{let list=target.parentNode.querySelector("ul");
 let key={13:"enter",27:"escape",32:"space",38:"updown",40:"updown"};
 if(key[keyCode]=="enter"&&!list)
 return this.dispatchEvent(new Event("submit"));
 let select=
 {enter:key=>!target.selection
?this.dispatchEvent(new Event("submit"))
:list.childNodes[target.selection-1].click()
 ,escape:key=>target.dispatchEvent(new Event("blur"))
 ,updown:key=>[0,target.selection+(keyCode==38||-1),target.selection
?target.selection>list.childNodes.length||target.selection
:list.childNodes.length].reduce((index,step)=>
 step?list.childNodes[step-1].classList.toggle('hover')&&step:step)
 }[key[keyCode]];
 if(select)
 target.selection=select();
},focusin({target})
{this.style.setProperty("--scroll","-"+this.scrollLeft);
 let focused=target.closest('label').getAttribute("focused")=="true";
 target.closest("label").setAttribute("focused",!focused);
 target.setSelectionRange(...Array(2).fill(target.value.length));
},focusout({target})
{let selection=target.parentNode.querySelector("ul");
 if(selection)
 target.selection=Array.from(selection.childNodes).forEach(item=>
 item.classList.remove('hover'));
 return target.dispatchEvent(new Event("focusin",{bubbles:true}));
},change:stretch
 ,"switch":async function({target})
{let {name,value,parentNode}=target;
 if(name.nodeName)name=undefined;
 //if(parentNode&&{select:value}[parentNode.getAttribute("type")])filter(target);
 let method=this.getAttribute("method");
 let cycle=["get","room"];
 let index=cycle.indexOf(method)+1;
 index=index&&cycle[index%cycle.length];
 let intent=intend(this.getAttribute("method"),target);
 method=note(intent||index||method||"get");
 if(method==this.getAttribute("method"))return;
 let action={sign:"mind"}[method]||path();
 Object.entries({method,action}).map(attribute=>
 this.setAttribute(...attribute));
 let icon={get:"node",put:"plus",delete:"plus",sign:"fingerprint",room:"chat",send:"paperplane"}[method];
 icon=document.scan({...vectors[icon],title:method});
 icon.onclick=event=>this.dispatchEvent(new Event(cycle.includes(method)?"switch":"submit"));
 this[this.querySelector("svg")?"replaceChild":"appendChild"](icon,this.querySelector("svg"));
 let fields=extend.bind(this)(method,target);
 fields={[name]:value,...fields};
 if(fields.message&&!this.labels.message)
 this.labels.message=await identity()||"";
 this.reform({[method]:fields});
 if(this.message&&this.labels.message)
 this.message.parentNode.lastChild.onclick=click=>this.dispatchEvent(new Event("sign"));
 if(name)this[name].focus();
},delete()
{this.setAttribute("method",this.getAttribute("method")=="delete"?"get":"delete");
 Array.from(this.querySelectorAll(".put")).map(label=>label.getAttribute("for")!="name"&&label.remove());
 this.dispatchEvent(new Event("switch"));
}}

function stretch({target})
{if(target.type!="text")return;
 let label=Array.from(target.parentNode.childNodes).find(({nodeName})=>nodeName.toLowerCase()=="span");
 let sample=window.document.body.appendChild(document.scan(
 {span:{span:[{"#text":label?label.textContent:""},{"#text":target.value}]}
 ,style:"position:absolute;font-family:averia;top:0;font-size:var(--size);max-width:100vw;visibility:hidden;"
 }));
 setTimeout(done=>
 [label,target].map(({style},index)=>
 style.width=Math[index?"max":"abs"](sample.childNodes[index].getBoundingClientRect().width+5,30))&&
 sample.remove()
,300);
}

function filter(input)
{d3.selectAll("g.node").each(function(node){node.selected=input.value&&node.title.match(input.value);this.dispatchEvent(new Event(node.selected?"mouseover":"mouseout"))})
 return Array.from(input.parentNode.querySelectorAll("li")).map(node=>
 node.style.display=node.textContent.match(input.value)?"block":"none").filter(display=>
 display=="block").length
}

var intend=function(method,input)
{let {name,value}=input.nodeName.toLowerCase()=="input"?input:{};
 let intent=
 {room:value&&{code:"sign",message:"send"}
 ,send:value?{code:"sign"}:{message:"room"}
 ,sign:!value&&{code:"room"}
 ,mind:"room"
 ,put:"get"
 ,get:name&&"get"
 ,"delete":value&&"put"
 };
 return [intent,method,name].reduce((intent,by)=>
 !intent.length?intent[by]||false:intent);
}

var extend=function(method,input)
{let {name,value}=input.nodeName.toLowerCase()=="input"?input:{};
 let fields=
 {message:extend=>!this.labels.message&&{code:""}
 ,delete:extend=>window.object.childNodes[0].simulation.nodes().find(({title})=>title==this.name.value).data[this.name.value]
 ,room:extend=>({message:[],code:this.labels.message?undefined:""})
 ,code:extend=>method=="put"||{[value?"name":"message"]:this[value?"message":"name"].value}
 ,name:extend=>method=="sign"||filter(this[name])||
 note((this.setAttribute("method","put"))&&this[name].parentNode.querySelector("ul").__data__).map(node=>Array.isArray(node)?[node]
:Object.entries(typeof node.data=="string"||typeof node.data[node.title]=="string"||node.data[node.title]||node.data).filter(([key,value])=>
 typeof value=="string")).reduce((template,entries)=>
 Object.assign(template,Object.fromEntries(entries.map(([key,value])=>
 [key,new value.constructor()]))),{})
 };
 fields=fields[name||method];
 if(fields)return fields();
}

function send()
{if(!this.message.value)return;
 this.room.emit("message",{room:this.room.name,message:this.message.value});
 this.message.value="";
}

async function identity(name)
{let signature=window.document.cookie.match(/signature=[^;]+/);
 if(!signature)return;
 signature="/"+signature[0].replace("=","/");
 let resolve=response=>response.status==200&&response.json().then(author=>({author:note(author).author}));
 let body=JSON.stringify(await fetch(signature).then(resolve));
 return await fetch(signature,{method:"put",body}).then(resolve);
}

if(globalThis.window)
window.onload=async function()
{window.console=newconsole.bind(this)();
 let keys=await fetch("./Blik_2020_client_keys.json").then(response=>response.json().then(json=>JSON.parse(new TextDecoder("utf-8").decode(new Uint8Array(json.data)))))
 import("https://apis.google.com/js/api.js").then(module=>
 gapi.load("client:auth2",done=>gapi.auth2.init({client_id:keys.google.client,scope:"https://www.googleapis.com/auth/drive"})))
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
 await Promise.all([vectors,awesome]);
 Object.assign(window,{note,resolve});
 await import("./rauch_2014_socket.io.slim.js");
 window.subject.room=io({transports:['websocket']}).connect(window.location.origin);
 await open(window.subject);
 let fields=Object.fromEntries([...new URLSearchParams(window.location.search)]);
 if(fields.source)(fields.name=fields.source)&&delete fields.source;
 window.subject.reform({get:{name:fields.name||"get",gradual:true,...fields}});
 window.subject.dispatchEvent(new Event("submit"));
}
