if(globalThis.window)
Object.assign(globalThis.window
,{dispatch(event,...input)
{let selectors=[this.nodeName.toLowerCase(),"#"+this.id,...Array.from(this.classList).map(classname=>"."+classname)];
 console.log({[event.type]:event.target||this});
 selectors.forEach(selector=>route.call(actions,[selector,event.type],event,...input));
}
 ,console:universalconsole.call(globalThis.window)
 ,onload:async function(event)
{await Promise.all([vectors,awesome]);
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
 await Promise.all(
["./Blik_2020_room.js","./rauch_2014_socket.io.slim.js"
].map(module=>import(module))).then(([{stream}])=>
{this.room=Object.assign(io({transports:['websocket']}).connect(window.location.origin),{message:stream.message});
 Object.entries(stream).forEach(([key,value])=>this.room.on(key,value));
});
 // unpure document calls take actions from window... (eg. in network)
 Object.assign(window,{actions});
 tether(event);
},onpopstate:tether
 ,onpushstate:tether
});

function tether(event)
{let window=event.target.defaultView||event.target;
 //let fields=Object.fromEntries([...new URLSearchParams(window.location.search)]);
 //field.call(window.document.forms[0],{get:fields});
 window.document.forms[0].dispatchEvent(new Event("submit"));
}

export function universalconsole()
{if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(this.navigator.userAgent))
 return window.console;
 //alert("triple tap for debug console");
 window.console=
 {queue:[]
 ,log()
{Array.from(arguments).forEach(log=>this.queue.push(log))
},dir:function(obj){console.log("Content of "+obj);for(var key in obj){var value=typeof obj[key]==="function"?"function":obj[key];console.log("-\""+key+"\"->\""+value+"\"");}}
 ,info:window.console.log
 ,trace(){var stack;try{throw new Error();}catch(ex){stack=ex.stack;};console.log(Array.from(arguments).join("\n")+stack.split("\n").slice(2).join("\n"));}
 ,show:async function()
{let panel=window.document.body.appendChild(document({div:
 {ul:this.queue.splice(0).map(log=>Object.assign(typeof log=="string"
?{"#text":log.replace(/\[\d{1,2}m/g,"")}
:list(log).ul)
,{style:"white-space:pre-wrap;"+(typeof log=="string"?"color:008A8A;":"")})
 ,onclick:"this.remove();"
 ,style:"position:absolute;background-color:black;color:olivegreen;font-family:monospace;font-size:12px;top:0;left:0;width:100vw;height:100%;overflow:scroll"
 }              }).next().value);
 panel.scrollTop=panel.scrollHeight;
}};
 window.onerror=function(msg,url,line){console.log("ERROR: \""+msg+"\" at \""+"\", line "+line);}
 window.addEventListener("touchstart",function(e){if(e.touches.length===3){console.show();e=null}});
 return window.console;
}

import {window,fetch,resolve,note,path,compose,route} from "./Blik_2020_platform.js";
import fragment,{list,field,pdf,profile,transform,vectors,awesome,document,demarkup,namespaces} from "./Blik_2020_fragment.js";
import actions from "./Blik_2020_actions.js";
import * as d3 from './Bostock_2020_d3v6.js';
import {trace} from "./Blik_2020_network.js";

 export var wheel=()=>vectors instanceof Promise
?vectors.then(wheel) //new Promise(async function wait(resolve){vectors===undefined?setTimeout(tick=>wait(resolve),300):resolve(await vectors)}).then(done=>
:document({svg:
 {class:"wheel"
 ,...vectors.circle.svg
 ,circle:undefined
 ,g:{filter:"url(#goo)",circle:Array(2).fill(vectors.circle.svg.circle)}
 ,...vectors.goo.svg
 ,width:"50px",height:"50px"
 }              }).next().value;

export default
 {"#composer":
 {submit:async function(event)
{event.preventDefault();
 let form=event.target;
 let method=form.getAttribute("method");
 let fields=Object.fromEntries(Array.from(new form.ownerDocument.defaultView.FormData(form)).filter(([key])=>
 event.target.querySelector("#"+key).parentNode.classList.contains(method)));
 let incumbent=form.ownerDocument.querySelector("#"+deselect(fields.source));
 submit[method].call(form,{incumbent,...fields});
},input({target})
{target.dispatchEvent(new Event("change",{bubbles:true}));
 let room=target.ownerDocument.defaultView.room;
 if(target.id=="message"&&target.value)
 room.emit("signal",room.name);
 actions["#switch"].click({target});
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
 let singular=Array.from(form.elements).filter(input=>input.type=="text");
 if(singular.length>1)
 form.style.setProperty("--scroll","-"+form.scrollLeft);
 let focused=label.getAttribute("focused")=="true";
 label.setAttribute("focused",!focused);
 if(target.type=="text")
 target.setSelectionRange(...Array(2).fill(target.value.length));
},focusout({target})
{let selection=target.parentNode.querySelector("ul");
 if(selection)
 target.selection=Array.from(selection.childNodes).forEach(item=>
 item.classList.remove('hover'));
 return target.dispatchEvent(new Event("focusin",{bubbles:true}));
},change({target})
{if(target.type!="text")return target.form.dispatchEvent(new target.ownerDocument.defaultView.Event("submit"));
 let label=Array.from(target.parentNode.childNodes).find(({nodeName})=>!["span","svg"].includes(nodeName.toLowerCase()));
 let sample=window.document.body.appendChild(document(
 {span:{span:[{"#text":label?label.textContent:""},{"#text":target.value}]}
 ,style:"position:absolute;font-family:averia;top:0;font-size:"+window.getComputedStyle(target).fontSize+";max-width:100vw;visibility:hidden;"
 }).next().value);
 setTimeout(done=>
 [label,target].map(({style},index)=>
 style.width=Math[index?"max":"abs"](sample.childNodes[index].getBoundingClientRect().width+5,30))&&
 sample.remove()
,300);
}}
 ,li:
 {click({target})
{let field=target.closest("label");
 let input=field.querySelector("input");
 input.value=["",target.closest("li")].reduce(function prepend(path,item)
{path=item.childNodes[0].nodeValue+(path?"/"+path:"");
 item=item.parentNode.parentNode;
 return item.nodeName=="LI"?prepend(path,item):path
});
 ["input","blur"].forEach(event=>
 input.dispatchEvent(new Event(event,{bubbles:true}))); 
 input.form.dispatchEvent(new Event("submit"));
}}
 ,svg:
 {mousedown:({target})=>
 [target.closest("form").elements[target.closest("label").getAttribute("for")],target.ownerDocument.activeElement].reduce((input,focused)=>
 target!=input&&(input==focused)&&setTimeout(()=>input.blur(),50))
 },div:
 {scroll({target})
{let timeout=target.timeout=setTimeout(tick=>
{if(target.timeout!==timeout)return;
 delete target.timeout;
 let to=
[target.scrollLeft,target.getBoundingClientRect().width
].reduce((offset,width)=>Math.round(offset/width)*width);
 let duration=500;
 !function animateScroll(start,change,time,increment)
{time+=increment;
 time/=span/2;
 if(time<1) 
 target.scrollLeft=delta/2*time*time+start;
 else
 target.scrollLeft=-delta/2*(--time*(time-2)-1)+start;
 if(currentTime<duration)
 setTimeout(tick=>animateScroll(start,change,currentTime,increment),increment);
}(target.scrollLeft,to-target.scrollLeft,0,20);
},100)
}}
 ,".defer":
 {load:({path:[target]})=>
{if(target.dataset.subject)
 compose(transform,"over",target,insert)(JSON.parse(target.dataset.subject));
}}
 ,"#logo":
 {click({target})
{let form=target.closest("form");
 field.call(form,{get:{source:"About"}});
 form.dispatchEvent(new window.Event("submit"));
}}
 ,"#switch":
 {click:async function({target})
{let form=target.closest("form");
 let {name,value,parentNode}=target;
 if(name?.nodeName)name=undefined;
 if({select:value}[parentNode?.getAttribute("type")])
 filter(target);
 let method=form.getAttribute("method");
 let cycle=["get","room"];
 let index=cycle.indexOf(method)+1;
 index=index&&cycle[index%cycle.length];
 let intent=intend(form.getAttribute("method"),target);
 method=note(intent||index||method||"get");
 if(method==form.getAttribute("method"))return;
 let action={sign:"mind"}[method]||path();
 Object.entries({method,action}).map(attribute=>
 form.setAttribute(...attribute));
 let icon={get:"node",put:"plus",delete:"plus",sign:"fingerprint",room:"chat",send:"paperplane"}[method];
 icon=document({...vectors[icon],title:method});
 icon.onclick=event=>form.dispatchEvent(new Event(cycle.includes(method)?"switch":"submit"));
 if(form.querySelector("svg").parentNode==form)
 form[form.querySelector("svg")?"replaceChild":"appendChild"](icon,form.querySelector("svg"));
 let fields=extend.bind(form)(method,form);
 fields={[name]:value,...fields};
 let labels=JSON.parse(form.dataset.labels);
 if(fields.message&&!labels.message)
 labels.message=await identity()||"";
 field.call(form,{[method]:fields});
 if(form.message&&labels.message)
 form.message.parentNode.lastChild.onclick=click=>form.dispatchEvent(new Event("sign"));
 if(source)form[source].focus();
}}
 ,".link":
 {mouseover({target})
{target.style.opacity=+(Number(target.style.opacity)<1)||0.5;
},mouseout(event){this.mouseover(event)}
 }
 ,".node":
 {mouseover({type,target})
{let node=d3.select(target.closest(".node")).datum();
 let filter={mouseover:"url(#shadow_white)",mouseout:"url(#shadow)"};
 target.closest("g").setAttribute("filter",filter[type]);
 if(node.selected)
 return;
 let {simulation}=target.closest("svg");
 let relations=node.relations||
 simulation.nodes().map(({relations})=>
 relations?.filter(({source,target})=>
 [source,target].includes(node)&&
 [source,target].every(node=>!node?.selected))||[]).flat();
 if(!relations.length)
 return;
 let network=simulation.force("link");
 let links=network.links();
 let without=links.filter(link=>!relations.includes(link));
 network.links(without.length<links.length?without:links.concat(relations));
},mouseout(...input){this.mouseover(...input)}
 ,click({target})
{target=target.closest(".node");
 if(target.editing)
 return;
 let form=target.closest("body").querySelector("#composer");
 let node=d3.select(target).datum();
 let source=trace(node,[]);
 if(source[0]=="get")
 return field.call(form,{get:path.slice(1).join("/"),gradual:true});
 if(!node.parent)return retreat();
 let simulation=target.closest("svg").simulation.force("link");
 //let linked=simulation.links().length-
 //note(simulation.links(simulation.links().filter(link=>
 //!node.descendants().includes(link.source)||
 //!fuse(link,-1))).links()).length
 //if(linked)return;
 //let links=node.descendants().slice(1).map(target=>({source:(target[0]||target).parent,target:target[0]||target,value:target[1]||1}));
 //simulation.links(simulation.links().concat(links));
 edit(target);
}}
 ,".editor":
 {submit(event)
{event.preventDefault();
 let record=Object.fromEntries(Object.values(form.elements).map(({id,value})=>[id,value]));
 for(let [key,value] of Object.entries(record))
 if(form.inputs[key]==Date)
 record[key]=Number(new Date(value));
 if(record.key)
 Object.assign(record,{[record.key]:record.value})&&
 delete record.key&&delete record.value;
 let svg=fragment.querySelector("svg");
 let blank=!record.name&&confirm("delete "+node.title+"?");
 let match=blank?d3.select()
:d3.select(svg).selectAll("g.node").select(function(other){return other!=node&&(other.parent==node.parent)&&(other.title==record.name)&&this});
 let progress=node.data[node.title].progress;
 progress=!progress||[record.progress,progress].map(Number).reduce((was,is)=>was-is);
 if(match.size()||isNaN(progress))
 return [form[isNaN(progress)?"progress":"name"],...match.nodes()].forEach(node=>node.style.animation="pulse 2s");
 let root=[svg.simulation.nodes()[0],0].reduce(function root(node){return node.parent?root(node.parent):node});
 update(node,blank?undefined:record,root);
 let room=fragment.getAttribute("title");
 let body=root.data;
 let report={join:room,put:[]};
 report.put.push({room,body})
 if(progress)
 report.put.push(
 {room:room.replace(/\.json$/,"_log.json"),append:true,body:
 {[Date.now()]:root.children[1].leaves().map(task=>
 task.data[task.title]).filter(Boolean).reduce((progress,task)=>
 progress+Number(task.progress||0)/100,0)
 }
 });
 Object.entries(report).forEach(([emit,body])=>
 (Array.isArray(body)?body:[body]).forEach(body=>
 window.composer.room.emit(emit,body)));
 this.escape();
 //Object.entries({join:this.closest("div").title,put:{room,body}}).forEach(entry=>window.subject.room.emit(...entry));
},keydown({keyCode})
{if(keyCode!=27)return;
 let label=target.parentNode.querySelector("text.label");
 label.style.display="block";
 delete node.selected;
 this.remove();
}}
 ,".field":
 {onclick:({target})=>field.call(target.closest("form"),{extend:{key:"",value:""}})
 }
 };

export var submit=
 {get({incumbent,...fields})
{let query=Object.entries(fields).map(([key,value])=>key+"="+value).join("&");
 let route=[window.location.pathname,query].filter(Boolean).join("?");
 if(this)window.history.pushState({},null,route);
 let fragment=transform.call(this,{incumbent,...fields});
 let frame=this?.ownerDocument.defaultView.frame||
 insert(document({center:{id:"frame"}}).next().value,"before",this);
 frame.title=fields.source;
 return insert(fragment,incumbent?"over":"under",incumbent||frame);
},put:async function(action)
{let signature=window.document.cookie.match(/signature=[^;]+/);
 // manage these with previous events!
[signature?{source:this.labels.message}:{source:this.source.value,code:this.code.value}
,["action",action=signature?"/"+signature[0].replace("=","/"):"mind/"+fields.source]
,["method",method=signature?"delete":"put"]
].forEach((fields,index)=>index
?this.setAttribute(...fields)
:field.call(this,{[method]:fields}));
 let request={method,...{put:{body:JSON.stringify(fields),headers:{"Content-Type":"application/json"}}}[method]};
 let [status,message]=await fetch(action,note(request)).then(response=>
 Promise.all([response.status,response.text()]));
 let room=this.ownerDocument.defaultView.room;
 Promise.resolve(room).then(ready=>
 room.message.bind(this)({author:{name:"system",face:"vector/deer"},message}));
 this.dispatchEvent(new Event("switch"));
 if(status!=200)return;
 if(method=="delete"&&this.action.startsWith("/signature"))
 note(window.document.cookie=this.action.substring(1).replace("/","=")+";path=/;expires="+new Date().toUTCString()+";")&&
 room.emit("leave",room.name)&&
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
 this.ownerDocument.defaultView.room.emit("message",{room,message});
 this.message.value="";
}};


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
 let labels=JSON.parse(this.dataset.labels);
 let fields=
 {message:extend=>!labels.message&&{code:""}
 ,delete:extend=>window.object.childNodes[0].simulation.nodes().find(({title})=>title==this.source.value).data[this.source.value]
 ,room:extend=>({message:[],code:labels.message?undefined:""})
 ,code:extend=>method=="put"||{[value?"name":"message"]:this[value?"message":"name"].value}
 ,source:extend=>method=="sign"||note(filter(this[name]))||
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

export function insert(fragment,place,target)
{let click=target.onclick;
 target.removeEventListener("click",click);
 let {over,before,after,under}={[place]:true};
 if(fragment instanceof Promise)
 return compose("over",insert(wheel(),place,target),insert)(fragment);
 note({fragment,[place]:target})
 if(under)
 return Array.from(target.childNodes).map(child=>child.remove())&&
 target.appendChild(fragment);
 let [sibling,edge]=before?["previous","prepend"]:["next","appendChild"];
 let method=target[sibling+"Sibling"]?"insertBefore":edge;
 target.parentNode[method](fragment.documentElement||fragment,before?target:target.nextSibling);
 if(over)target.remove();
 return fragment;
}

async function load(click)
{note(this);
if(!this.nextSibling.nextSibling.id)
{insert(null,this,true)
 let content;
 note(this.getAttribute("platform"),this.getAttribute("name"))
 if(this.getAttribute("platform")=="local")content=await resolve(this.getAttribute("name")).then(deform);
 else if(this.getAttribute("platform")=="facebook")content=await new Promise(resolve=>FB.api("/"+this.getAttribute("name"),"GET",{fields:'id,name,from,created_time,message,type,timeline_visibility,link,object_id'},response=>resolve(response))).then(response=>{console.log(response);return response.object_id?new Promise(resolve=>FB.api("/"+response.object_id,"GET",{fields:'id,title,format,source,embed_html'},responseobject=>resolve(responseobject))).then(responseobject=>{console.log(responseobject);return responseobject.embed_html+" \n"+response.message}):deform(response.message+" \n "+(response.name&&response.link?response.name.replace(/ /g,"_")+"@"+response.link:""))});
 else content=await fetch(this.getAttribute("name")).then(promise=>promise.text()).then(content=>import("/Blik_2020_transform.js").then(({deform})=>deform(content)));
 this.nextSibling.remove();
 if(content!="Not Found")await preparepost(this,content).then(done=>spell(this.nextSibling.nextSibling));
}
 else spell(this.nextSibling.nextSibling)
}

async function preparepost(subject,content)
{let entry=document.createElement("span");
 entry.setAttribute("style","height:0;overflow:hidden");
 entry.setAttribute("id",subject.getAttribute("name"));
 var observer=new MutationObserver(function(mutations)
{observer.disconnect();
 for(let mutation of mutations)
 Array.from(mutation.addedNodes).filter(node=>
 node.getAttribute&&node.getAttribute("class")==="animation").map(node=>
 [node.innerHTML,node]).forEach(entry=>insert(...entry));
});
 observer.observe(entry,{attributes:false,childList:true,characterData:false});
 entry.innerHTML="\n"+content;
 entry.innerHTML+="\n\n";
 await loadcomment(entry,entry.id);
 //await fetch("https://www.googleapis.com/drive/v3/files/1-47T-7HxbgQcgoDg082MBS18rlVa5_W3?alt=media&key="+keys.googleapi).then(response=>response.text()).then(feed=>console.log(feed))//feed.filter(response=>response.post===entry.id).sort(function(next,following){return new Date(following.time)-new Date(next.time)}).forEach(response=>{loadcomment(entry,entry.id,response);}));
 let block=subject.parentNode.insertBefore(document.createTextNode("\n\n"),subject.nextSibling);
 block=block.parentNode.insertBefore(entry,block.nextSibling);
};

async function read(title)
{if(title.getAttribute('fetched')=="true")return spell(title.nextSibling);
 insert(null,title,true);
 fetch(title.getAttribute('name')).then(file=>file.text()).then(deform).then(function(text)
{title.nextSibling.remove();
 title.setAttribute('fetched',true);
 title.parentNode.insertBefore(document.createElement("span"),title.nextSibling).innerHTML=text;
 read(title)
})
}

var spelling=0,skip=0;

 function edit(target)
{let label=target.querySelector("text.label");
 let form=target.querySelector("form");
 label.style.display=form?"block":"none";
 let node=d3.select(target).datum();
 if(form)return delete node.selected&&form.remove();
 node.selected=true;
 let {x,width,y,height}=target.querySelector("circle").getBoundingClientRect();
 form=target.appendChild(document(
 {foreignObject:
 {requiredExtensions:"http://example.com/SVGExtensions/EmbeddedXHTML"
 ,height,width:"400px"
 ,body:{xmlns:namespaces.html
 ,form:
 {class:"editor"
 ,title:node.title
 ,"data-inputs":JSON.stringify({source:"string",start:"date",end:"date"})
 }     }
 }
 },namespaces.svg,actions).next().value).querySelector("form");
 let record=Object.entries(node.data[node.title]);
 record=record.filter(([key,value])=>typeof value=="string"||form.dataset.inputs[key]);
 record.unshift(["source",node.title]);
 note(form)
 field.call(form,{[node.title]:Object.fromEntries(record)});
 form.appendChild(document({span:{class:"field","#text":"+",style:"cursor:pointer"}}).next().value);
 form.source.focus()
 window.room.on("put",function({body,room})
{window.Tone.Transport.start();
 if(fragment.getAttribute("title")==room)
 network(sprawl(body),{fragment,still:true,spread:"left",cluster:true});
 else actions.get({name:room},window.document.querySelector("div[title$='"+room+"']"))
});
}

 function update(node,body,root)
{let presence=[node.parent.data[node.parent.title],node.data];
 if(!body)return presence.forEach(place=>place[node.title]=undefined);
 let related=root.descendants().filter(({relations})=>relations);
 let domain=root.children[0];
 let relations=related.map(({relations})=>relations.filter(({target})=>target==node))
 relations=relations.flat().reduce((relations,{source:{title},value})=>Object.assign(relations
,{[title]:!relations[title]?value
:(Array.isArray(relations[title])?relations[title]:[relations[title]]).concat(value)}),{});
 node[domain.title]=domain.leaves().map(({title})=>relations[title]);
 Object.entries(body).forEach(function([key,value])
{if(key==node.title)
 return value?node.data[body.name][value]={roles:[],progress:0}:null;
 note(key,value)
 if(key!="name"||node.data[node.title][key])
 return (value||confirm("delete "+key+"?"))&&
 (node.data[body.name][key]=!value?undefined:
 Array.isArray(node.data[node.title][key])?value.split(","):value);
 if(value==node.title)return;
 value={[value]:node.data[node.title],[node.title]:undefined};
 presence.forEach(data=>Object.assign(data,value));
});
 note(node.data)
}

 var deselect=source=>
 [source,".",":"].reduce((source,selector)=>
 source.replace(new RegExp("\\"+selector),"\\"+selector));
