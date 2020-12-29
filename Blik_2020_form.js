import transform,{insert} from "./Blik_2020_transform.js";
export {insert};
import {peer as room} from "./Blik_2020_room.js";
import {window,fetch,resolve} from "./Blik_2020_window.js";
import {scan,translate,vectors,awesome,note,path,compose} from "./Blik_2020_document.js";
import * as d3 from './Bostock_2020_d3v6.js';
import clock from "./Blik_2020_time.js";

export function form(fields,labels={})
{let label=id=>typeof id!="string"?id:typeof labels[id]=="object"?labels[id]:(labels[id]&&labels[id][0]=="<")
?{"#text":labels[id]}
:{span:{"#text":typeof labels[id]=="string"?labels[id]:id}};
 function select(event)
{let input=event.target.closest('label').querySelector('input');
 input.value=["",event.target].reduce(function prepend(path,item){return (path=item.childNodes[0].nodeValue+(path?"/"+path:""))&&(item=item.parentNode.parentNode)&&(item.nodeName=="LI")?prepend(path,item):path});
 input.dispatchEvent(new Event("input",{bubbles:true}));
 input.form.dispatchEvent(new Event("submit"));
};
 let group=Object.entries(fields).reduce((group,[key,value],index)=>
 typeof value=="object"&&!value.length&&!--index&&key,false);
 if(group)
 fields=Object.values(fields)[0];
 return {label:translate(Object.entries(fields),([id,value])=>
{if(typeof value=="undefined")return;
 let type=value.constructor==Date?"date":value instanceof Set?"radio":Array.isArray(value)?"select":typeof value=="boolean"?"checkbox":"text";
 let input=
[{type,for:id,title:id
 ,checked:{checkbox:value?value.toString():undefined}[type]
 ,input:
 {type:["select","date"].includes(type)?"text":type,id,name:id
 ,value:type=="date"?clock(value,"datetime"):type=="text"&&value&&String(value)||undefined
 ,checked:{checkbox:value?value.toString():undefined}[type]
 ,autocomplete:"off"
 }
 ,ul:type=="date"?clockwork(value):type!="select"?undefined:
 {li:!value.length?undefined:translate(value,"li","ul",
 {"#text":item=>(typeof item=="string"?[item,0]:Array.isArray(item)?item:Object.entries(item)).reduce((key,value)=>
  key+(typeof value=="object"?awesome["fas fa-book-medical"]:awesome["fas fa-align-left"]).replace("<svg ","<svg width='10px' "))
 ,onclick:select.toString().replace(/(^function \w+\([\w,]*\)\n\{)|(\}$)/g,"")
 })
 }
 ,...typeof labels[id]=="function"?label(labels[id](value)):label(id)
 }
,type=="radio"
].reduce((input,radio)=>!radio?input:Array.from(value).map(value=>merge(JSON.parse(JSON.stringify(input))
,{for:value,title:value,class:group
 ,input:{id:value,value}
 ,...label(typeof labels[id]=="function"?labels[id](value):value)
 })));
 return input;
}).flat()}
}

export function conform(fields,inputs)
{let entries=(Array.isArray(fields)?fields:Object.entries(fields));
 entries=entries.map(([key,value])=>
[key,value instanceof (inputs[key]||String)
?value
:inputs[key]==Boolean
?["true","on"].includes(value)
:(inputs[key]||String)(value)
]);
 return Object.fromEntries(entries);
}

export function reform(fields,reset)
{//if(form instanceof window.Event)
 //form=form.currentTarget;
 let group=Object.entries({...note(fields)}).reduce((group,[key,value],index)=>
 typeof value=="object"&&!value.length&&!index&&key,false);
 if(group)
 fields=Object.values(fields)[0];
 if(!this)
 return fields;
 if(fields)
 Object.entries(fields).map(([key,value])=>
{let input=this.elements[key];
 if(value===undefined)
 return input&&input.closest("label").remove();
 let valid=!this.inputs[key]||(value instanceof this.inputs[key]);
 if(!valid)
 if(input)
 return [input.closest("label"),input].map((field,input)=>
 input?field.value=value:field.classList.add(...group?[group]:field.classList));
 else
 value=value instanceof String?value:(this.inputs[key]==Boolean)
?["true","on",true].includes(value)
:(this.inputs[key]==Date)
?clock(value,"datetime")
:new (this.inputs[key]||String)(value);
 let label=form({[key]:value},this.labels).label[0];
 label.class=group;
 label.input.value=Array.isArray(fields[key])
?fields[key].includes(label.input.value)?label.input.value:fields[key][0]
:[input&&input.value,fields[key],label.input.value].find(value=>typeof value=="string");
 return this[input?"replaceChild":"appendChild"](scan({label}),input&&input.parentNode)
})
 Array.from(this.elements).forEach((input,index,inputs)=>
{if(input.id=="name")
 if(Array.from(this.childNodes).includes(inputs[0].closest("label")))
 this.insertBefore(input.closest("label"),inputs[0].closest("label"));
 if(input.type=="text")
 input.dispatchEvent(new window.Event("change",{bubbles:true}))
 if(!reset)
 return;
 if(fields[input.id]===undefined)
 input.closest("label").remove();
})
 return Object.fromEntries([...new window.FormData(this)]);
}

export function open(form)
{let labels={message:"",name:"",transform:"as",title:"of",category:"on",spread:"by",matrix:"from",relations:"with"};
 let inputs={message:Array,name:Array,transform:Array,title:Array,spread:Array,matrix:Array,gradual:Boolean,radial:Boolean,join:Date};
 Object.assign(form,{labels,inputs,reform});
 if(form.room)
 Promise.resolve(form.room).then(ready=>
 Object.entries(room).forEach(([key,value])=>form.room.on(key,value.bind(form))));
 Object.entries(peer).forEach(([key,value])=>form.addEventListener(key,value));
 form.events=peer;
 return form;
}

export async function perform({resource,fragment,...fields},form)
{let get=form?form.reform({get:fields}):fields;note(fields)
 resource=note(resource||await (Array.isArray(fields.name)
?Promise.all(fields.name.map(resolve)).then(resources=>resources.flat())
:fields.name
?resolve(path(fields.name))
:""));
 if(resource instanceof Error){resource=resource.toString();fields.transform="media"};
 if(resource.pdf)
 resource=await Promise.all(
[import("./mozilla_2010_pdf_viewer_brightspace.js")
,import("./mozilla_2010_pdf_link_service_brightspace.js")
]).then(function([{PDFViewer},{PDFLinkService}])
{let container=transform.scan({"div":{"class":"pdfjs","div":{"id":"viewer"}}});
 let viewer=new PDFViewer(
 {linkService:new PDFLinkService(),container,renderer:"svg"
 ,textLayerMode:0,disableRange:true,forceRendering:true
 });
 viewer.linkService.setViewer(viewer);
 viewer.setDocument(resource);
 fields.transform="media"
 return viewer.container;
});
 //new Array(file.numpages).reduce((canvas,phase,index)=>file.getPage(index+1).then(page=>{let view=page.getViewport({scale:1.5});canvas.width=canvas.width<view.width?view.width:canvas.width;canvas.height=(canvas.height||0)+view.height;page.render({canvasContext:canvas.getContext('2d'),viewport:view});return canvas;}),document.createElement('canvas')))
 else if(typeof resource=="string"||resource instanceof String)
 get={name:fields.name,transform:["media","script"]};
 else
{//resource=conceive(resource,fields);
 get=
 {name:Array.isArray(resource)?resource:Object.entries(resource)
 ,transform:Object.entries(transform).filter(([key,value])=>
 value.constructor&&value.constructor.name=="AsyncFunction").map(([key])=>key).sort(value=>(value!=fields.transform)-1)
 //,matrix:Array.from(resource.descendants().reduce((keys,node)=>
 //Array.from(node.occurrence||[]).reduce((keys,key)=>keys.add(key),keys),new Set()))
 ,spread:["force","left","right","up","down","radius"]
 ,title:["name","image","wiki image"]
 ,gradual:false
 };
}
 if(fields.transform!="portfolio"&&form)
 fields=Object.assign(form.reform({get},1),fields);
 if(form&&form.elements["name"])
 form.elements["name"].parentNode.querySelector("ul").__data__=resource.descendants?resource.descendants():get.name;
 if(fields.transform=="network")
 if(typeof resource!="object")
 fields.transform="media";
 return await transform[fields.transform](resource,{fragment,window,...fields});
}

export async function get(form,target=window.object,replace)
{if(!target||!target.parentNode)return;
 let click=target.onclick;
 target.removeEventListener("click",click);
 let fields=form instanceof Event
?Object.fromEntries(Array.from(new FormData(this)).filter(([key])=>
 this[key].parentNode.classList.contains("get")))
:form;
 let title=path(fields.name);
 if(target.title&&(target.title==title))
 if(fields.transform=="media")
 return target;
 else fields.fragment=window.document.createRange().createContextualFragment(target.innerHTML);
 target.title=title;
 //this.action=title;
 let placeholder=await insert(fields.fragment,target,replace===true?2:0);
 let fragment=await perform(fields,!replace&&this);
 fragment=await insert(fragment,placeholder.parentNode?placeholder:target,placeholder.parentNode?2:0);
 fragment.addEventListener("click",click);
 fragment.setAttribute("title",title);
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
].forEach((fields,index)=>index
?this.setAttribute(...fields)
:this.reform({[method]:fields}));
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

export function stretch({target})
{if(target.type!="text")return;
 let label=Array.from(target.parentNode.childNodes).find(({nodeName})=>nodeName.toLowerCase()=="span");
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
 ,delete:extend=>window.object.childNodes[0].simulation.nodes().find(({title})=>title==this.name.value).data[this.name.value]
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
