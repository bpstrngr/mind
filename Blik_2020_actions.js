if(globalThis.window)
Object.assign(globalThis.window
,{dispatch(event){return route.call(actions,[this.nodeName.toLowerCase(),event.type],event);}
 ,console:universalconsole.call(globalThis.window)
 ,onload:async function()
{await Promise.all([vectors,awesome]);
 let fields=Object.fromEntries([...new URLSearchParams(this.location.search)]);
 if(fields.source)(fields.source=fields.source)&&delete fields.source;
 reform({get:{name:fields.source||"",...fields}},this.document.forms[0]);
 let keys=await fetch("google/key").then(response=>response.json().then(json=>JSON.parse(new TextDecoder("utf-8").decode(new Uint8Array(json.data))))).catch(note)
 if(!(keys instanceof Error))
 Promise.all(
[import("https://apis.google.com/js/api.js").then(module=>
 gapi.load("client:auth2",done=>gapi.auth2.init({client_id:keys.google.client,scope:"https://www.googleapis.com/auth/drive"})))
,import("https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js").then(firebase=>
 firebase.initializeApp(keys.google.firebase)&&
 import("https://www.gstatic.com/firebasejs/7.20.0/firebase-analytics.js").then(products=>
 firebase.analytics()))
,import("https://www.googletagmanager.com/gtag/js?id=UA-123329239-3").then(analytics=>
 Object.entries({js:new Date(),config:"UA-123329239-3"}).map(entry=>
 (this.dataLayer=this.dataLayer||[]).push(entry)))
]);
 await import('./Zwarts_2015_vibrant.js');
 this.tone=await import("./Yotam_2019_Tone.js").then(done=>(
 {string:new Tone.PolySynth(16,this.Tone.Synth).toMaster()
 ,drum:new Tone.Synth({oscillator:{type:'sine',modulationFrequency:0.2},envelope:{attack:0,decay:0.1,sustain:0,release:0.1}}).toMaster()
 ,chord:new Tone.Sequence((time,note)=>note?this.tone.string.triggerAttackRelease(note,"5hz",time):this.Tone.Transport.stop(),["C4","A3","G3",false],"45n").start()
 }));
}});

import {window,fetch,resolve,universalconsole,note,path,compose,route} from "./Blik_2020_platform.js";
import {vectors,awesome} from "./Blik_2020_document.js";
import transform,{insert,perform,reform,pdf} from "./Blik_2020_transform.js";
import actions from "./Blik_2020_actions.js";
import * as d3 from './Bostock_2020_d3v6.js';

export function open(form,stream)
{let inputs={message:Array,name:Array,transform:Array,title:Array,spread:Array,matrix:Array,gradual:Boolean,radial:Boolean,join:Date};
 let labels={message:"",name:"",transform:"as",title:"of",category:"on",spread:"by",matrix:"from",relations:"with"};
 Object.assign(form,{labels,inputs,reform});
 form.room=Promise.all(
["./Blik_2020_room.js","./rauch_2014_socket.io.slim.js"
].map(module=>import(module))).then(([{stream}])=>
{form.room=Object.assign(io({transports:['websocket']}).connect(window.location.origin),{message:stream.message});
 Object.entries(stream).forEach(([key,value])=>form.room.on(key,value.bind(form)));
});
 Object.entries(stream).forEach(([key,value])=>form.addEventListener(key,value));
 form.events=stream;
 return form;
}

export default
 {img:{load(event){request.get(note(Object.assign(JSON.parse(event.path[0].dataset.subject),{target:event.path[0]})))}}
 ,form:
 {submit:async function(event)
{event.preventDefault();
 let method=note(this.getAttribute("method"));
 let fields=Object.fromEntries(Array.from(new FormData(this)).filter(([key])=>
 this[key].parentNode.classList.contains(method)));
 //fields=this&&this.nodeName?reform.call(this,{get:fields}):fields;
 //fields.source=[this.action,fields.source].join("/");
 if(!request[method])return;
 request[method].call(this,fields);
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
{let [form,label]=["form","label"].map(tag=>target.closest(tag));
 form.style.setProperty("--scroll","-"+form.scrollLeft);
 let focused=label.getAttribute("focused")=="true";
 label.setAttribute("focused",!focused);
 target.setSelectionRange(...Array(2).fill(target.value.length));
},focusout({target})
{let selection=target.parentNode.querySelector("ul");
 if(selection)
 target.selection=Array.from(selection.childNodes).forEach(item=>
 item.classList.remove('hover'));
 return target.dispatchEvent(new Event("focusin",{bubbles:true}));
},change:stretch
 }
 }

export var request=
 {get:form=>compose(perform.bind(this),source=>insert.call(form.target,"over",source))(form)
 ,put:async function(action)
{let signature=window.document.cookie.match(/signature=[^;]+/);
 // manage these with previous events!
[signature?{source:this.labels.message}:{source:this.source.value,code:this.code.value}
,["action",action=signature?"/"+signature[0].replace("=","/"):"mind/"+fields.source]
,["method",method=signature?"delete":"put"]
].forEach((fields,index)=>index
?this.setAttribute(...fields)
:reform.bind(this)({[method]:fields}));
 let request={method,...{put:{body:JSON.stringify(fields),headers:{"Content-Type":"application/json"}}}[method]};
 let [status,message]=await fetch(action,note(request)).then(response=>
 Promise.all([response.status,response.text()]));
 Promise.resolve(this.room).then(ready=>
 this.room.message.bind(this)({author:{name:"system",face:"vector/deer"},message}));
 this.dispatchEvent(new Event("switch"));
 if(status!=200)return;
 if(method=="delete"&&this.action.startsWith("/signature"))
 note(window.document.cookie=this.action.substring(1).replace("/","=")+";path=/;expires="+new Date().toUTCString()+";")&&
 this.room.emit("leave",this.room.name)&&
 (this.labels.message="");
 return this.dispatchEvent(new Event("switch"));
 // update custom graphs...
 return this.dispatchEvent(new Event("submit"));
 let nodes=window.object.childNodes[0].simulation.nodes;
 this.method=="put"
?note(nodes().splice(findIndex(({title})=>title==fields.source),1,conceive(node).concept))
:nodes(nodes().concat(conceive(node).concept));
 let simulation=window.object.childNodes[0].simulation;
 simulation.nodes(simulation.nodes().filter(node=>node.title!=this.source.value));
 simulation.force("link").links(simulation.force("link").links().filter(({source,target})=>![source.title,target.title].includes(this.source.value)))
 this.reform({get:{source:""}});
 this.elements.source.dispatchEvent(new Event("input",{bubbles:true}));
 //persist custom graphs...
 //let resource=subceive(node);
},delete()
{this.setAttribute("method",this.getAttribute("method")=="delete"?"get":"delete");
 Array.from(this.querySelectorAll(".put")).map(label=>label.getAttribute("for")!="name"&&label.remove());
 this.dispatchEvent(new Event("switch"));
},send(room,{message})
{if(!message)return;
 this.room.emit("message",{room,message});
 this.message.value="";
},"switch":async function({target})
{let {name,value,parentNode}=target;
 if(name.nodeName)name=undefined;
 if(parentNode&&{select:value}[parentNode.getAttribute("type")])filter(target);
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
 icon=transform.scan({...vectors[icon],title:method});
 icon.onclick=event=>this.dispatchEvent(new Event(cycle.includes(method)?"switch":"submit"));
 if(this.querySelector("svg").parentNode==this)
 this[this.querySelector("svg")?"replaceChild":"appendChild"](icon,this.querySelector("svg"));
 let fields=extend.bind(this)(method,target);
 fields={[name]:value,...fields};
 if(fields.message&&!this.labels.message)
 this.labels.message=await identity()||"";
 this.reform({[method]:fields});
 if(this.message&&this.labels.message)
 this.message.parentNode.lastChild.onclick=click=>this.dispatchEvent(new Event("sign"));
 if(name)this[name].focus();
}};

export function stretch({target})
{if(target.type!="text")return;
 let label=Array.from(target.parentNode.childNodes).find(({nodeName})=>!["span","svg"].includes(nodeName.toLowerCase()));
 let sample=window.document.body.appendChild(transform.scan(
 {span:{span:[{"#text":label?label.textContent:""},{"#text":target.value}]}
 ,style:"position:absolute;font-family:averia;top:0;font-size:"+window.getComputedStyle(this).fontSize+";max-width:100vw;visibility:hidden;"
 }));
 setTimeout(done=>
 [label,target].map(({style},index)=>
 style.width=Math[index?"max":"abs"](sample.childNodes[index].getBoundingClientRect().width+5,30))&&
 sample.remove()
,300);
}

function filter(input)
{d3.select(input.closest("div")||input.closest("center")).selectAll("g.node").each(function(node)
{let selected=input.value&&node.title.match(input.value);
 this.dispatchEvent(new Event(selected?!node.selected&&"mouseover":(node.selected&&"mouseout")));
 node.selected=selected;
})
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
 ,delete:extend=>window.object.childNodes[0].simulation.nodes().find(({title})=>title==this.source.value).data[this.source.value]
 ,room:extend=>({message:[],code:this.labels.message?undefined:""})
 ,code:extend=>method=="put"||{[value?"name":"message"]:this[value?"message":"name"].value}
 ,name:extend=>method=="sign"||note(filter(this[name]))||
 note((this.setAttribute("method","put"))&&d3.select(this[name].parentNode.querySelector("ul")).datum()||[]).map(node=>Array.isArray(node)?[node]
:Object.entries(typeof node.data=="string"||typeof node.data[node.title]=="string"||node.data[node.title]||node.data).filter(([key,value])=>
 typeof value=="string")).reduce((template,entries)=>
 Object.assign(template,Object.fromEntries(entries.map(([key,value])=>
 [key,new value.constructor()]))),{})
 };
 fields=fields[name||method];
 if(fields)return fields();
}

async function identity(name)
{let signature=window.document.cookie.match(/signature=[^;]+/);
 if(!signature)return;
 signature="/"+signature[0].replace("=","/");
 let resolve=response=>response.status==200&&response.json().then(author=>({author:note(author).author}));
 let body=JSON.stringify(await fetch(signature).then(resolve));
 return await fetch(signature,{method:"put",body}).then(resolve);
}
