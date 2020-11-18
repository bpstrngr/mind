import document from "./Blik_2020_document.js";
import {acquire,window,fetch,path,note,svgns,retreat,resolve} from "./Blik_2020_window.js";
export {acquire,window,fetch,path,note,svgns,retreat,resolve};
import script from "./Blik_2020_script.js";
import network,{conceive,d3} from "./Blik_2020_network.js";
export {d3};
import * as stat from "./Blik_2020_stat.js";
import * as geodesy from "./Blik_2020_geodesy.js";
import clock from "./Blik_2020_time.js";
import {WPCOM} from "./wordpress_2019_wpcom.js";
import * as pdf from "./mozilla_2010_pdf.js";
pdf.GlobalWorkerOptions.workerSrc='mozilla_2010_pdf_worker.js';

export var [vectors,awesome,keys]=['./Blik_2020_vectors.json','./blessochampion_2019_awesomesvgs.json',"./Blik_2020_client_keys.json"].map(async (module,index)=>(
!globalThis.window
?import(module).then(module=>module.default)
:(await fetch)(module).then(module=>module.json()).then(json=>JSON.parse(new TextDecoder("utf-8").decode(new Uint8Array(json.data))))).then(module=>
 index?index-1?keys=module:awesome=module:vectors=module));

export function compose(...operations){return operations.reduce((composition,operation)=>async(...input)=>operation(await composition(...input)));};

export var colors=
{service:"#fbbc05"
,hazard:"#ea4335"
,provider:"#2E7D32"
,stakeholder:"#4285F4"
,flora:"rgba(46,125,50)"
,fauna:"rgba(198,40,40)"
};
var black=["white","black"];
var google=["#ea4335","#fbbc05","#2E7D32","#4285F4","rgb(106,68,233)"];
var rainbow=["#c62828","rgb(255,177,51)","#388e3c","#4285F4","#283593"];
export var spectrum=rainbow;
spectrum=d3.scaleLinear().range(spectrum).domain(Array.apply(null,Array(spectrum.length--)).map((item,index)=>index/(spectrum.length)).reverse());

export function merge(target,source)
{Object.keys(source).forEach(function(key)
{target[key]=(target.hasOwnProperty?target.hasOwnProperty(key):target[key])
?Array.isArray(target[key])
?target[key].concat(source[key])
:typeof target[key]=="object"
?merge(target[key],source[key]||{})
:source[key]
:source[key];
});
 return target;
}

export function deepassign(source,key,assign)
{if(typeof source!="string")
 Object.entries(source).forEach(([item,value])=>
{source[item]=item==key
?{...value,...assign}
:typeof value=="object"
?Array.isArray(value)
?value.map(value=>deepassign(value,key,assign))
:deepassign(value,key,assign)
:value;
 if(item==key)console.log(item,value.fill)
})
 return source;
}

export default
{scan,network,script
,media:function(resource,properties)
{if(resource.constructor.name=="Buffer")
 resource=new TextDecoder("utf-8").decode(new Uint8Array(resource));
 return resource.nodeName?resource:resource.startsWith("<")
?window.document.createRange().createContextualFragment(resource)
:deform(resource).then(source=>window.document.createRange().createContextualFragment(source))
}
,portfolio:async function(source)
{let name=scan({h1:{"#text":Object.keys(source)[0]}});
 name.onclick=retreat;
 let [pub,sub]=["pub","sub"].map(list=>
{let label=scan({h2:{"#text":list}});
 label.onclick=({target})=>feed(target,15,note(source[list]));
 return label;
});
 //if(globalThis.window)fragment.appendChild(await featurefacebook());
 return scan({div:{name,pub,sub}});
}
,...stat
,...geodesy
}


var wheel=vectors.then(done=>wheel=scan({svg:{class:"wheel"
 ,...[vectors.circle.svg,0].reduce(svg=>
 ({...svg,circle:undefined,g:{filter:"url(#goo)",circle:Array(2).fill(svg.circle)}}))
 ,...vectors.goo.svg
 }}));

export function throttle(fragment,progress=0)
{if(!fragment.simulation)return fragment;
 //if(!fragment.simulation||!fragment.simulation.nodes().length)return fragment;
 return new Promise(resolve=>setTimeout(time=>resolve(fragment),2000)).then(fragment=>
{//let size=fragment.querySelectorAll("g.node").length;
 //if(size>progress||!size)
 note("throttling",fragment.getAttribute("title"),Math.floor((1-fragment.simulation.alpha())*100)+"%...")
 if(fragment.simulation.alpha()>0.1)
 return throttle(fragment);
 fragment.simulation.stop();
 return fragment;
})
}

function repeat(tag)
{let element={};
 element[tag]=Array.from(arguments).slice(1).filter(definition=>definition).map(definition=>
{let title=Object.keys(definition)[0];
 let label=definition[title];
 delete definition[title];
 return {...typeof label=="string"?{"#text":label}:label,"for":title,"href":title+"/","title":title,...tag=="label"?{"input":{"name":title,"id":title}}:{"id":title},...definition}
});
 return element
};
//function repeat(svg,amount){addendum=new NodeList();for(iteration=0;iteration<amount;iteration++){next=svg;next.setAttribute("transform",svg.getAttribute("transform")+" "+svg.getAttribute(transform));addendum[iteration]=next;}return addendum};

function scan(source,parent,namespace)
{if(typeof source=="string")
 source=vectors[source]||awesome[source.replace("_"," ")]||source;
 if(typeof source=="string")
 return window.document.createRange().createContextualFragment(source);
 if(source)
 Object.entries(source).forEach(function([key,value])
{if(!value)return;
 if(key=="#text"||value.nodeName)
 return parent&&(
 value=value.nodeName?value:window.document.createRange().createContextualFragment(value))
?parent.appendChild(value)
:value instanceof window.DocumentFragment?value:value[0];
 if(["string","number","boolean"].includes(typeof value))
 return parent.setAttribute(key,value.toString());
 if(key=="svg")
 namespace=svgns;
 Object.entries(
 {a:{target:"_blank"}
 ,svg:{viewBox:"0 0 1 1",xmlns:"http://www.w3.org/2000/svg"}
 }[key]||{}).forEach(([key,attribute])=>
 value[key]=value[key]||attribute);
 //if(key=="repeat"){while((value-=1)>1){let sibling=parent.cloneNode(true);sibling.setAttribute("transform",sibling.getAttribute("transform").concat(" ").repeat(value+1));parent.parentNode.appendChild(sibling);};return undefined}
 //parent=[parent&&parent.appendChild?parent:undefined,...
 if(!parent||!parent.appendChild)parent=undefined;
 parent=[parent,...Array.isArray(value)?value:[value]].reduce(function(parent,source)
{let child=[...namespace?[namespace]:[],key];
 try{child=window.document["createElement"+(namespace?"NS":"")](...child);}
 catch(fail){return parent}
 if(!parent)return scan(source,child,namespace);
 if(value)scan(source,parent.appendChild(child),namespace);
 return parent;
});
});
 return parent;
}

export function insert(source,target,sibling)
{if(!sibling)
 while(target.firstChild)
 target.firstChild.remove();
 source=source||[wheel.cloneNode(true),0].reduce(wheel=>["width","height"].map(side=>wheel.setAttribute(side,"50px"))&&wheel);
 source=sibling
?target.parentNode.insertBefore(source,target)
:target.appendChild(source);
 if(sibling)target.remove();
 return source;
}

export function hypertext(title,favicon,scripts,styles=[],body={})
{return {html:
 {"head":
 {"title":{"#text":title}
 ,"base":{"href":"/"}
 ,"meta":
[{"charset":"utf-8"}
,{"http-equiv":"content-language","content":"en-us"}
,{"http-equiv":"Content-Type","content":"text/html;charset=UTF-8"}
,{"name":"theme-color","content":"#000000"}
,{"name":"description","content":""}
,{"name":"viewport","content":"width=device-width, initial-scale=0.8"}
],"link":
[{"rel":"icon","type":"image/"+(favicon?favicon.substring(favicon.length-3):"x-icon"),"href":favicon||"favicon.ico"}
].concat(styles.filter(style=>style.match(/^[^\n]+.css$/)).map(style=>({"rel":"stylesheet","href":style})))
//,{"#text":"setInterval(done=>fetch('/authority',{method:'POST',headers:sessionStorage.getItem('authority')}).then(done=>console.log(done)),1000*60)"}
 ,"style":styles.filter(style=>!style.match(/^[^\n]+.css$/)).map(style=>({"#text":style}))
 }
 ,"body":{...body,"script":scripts.map(script=>{return {"src":script,"type":"module"}}).concat(body.script?body.script:[])}
 }      };
}

function transform(source,tag,child,attributes={})
{return source.map((entry,index)=>typeof tag=="function"
?tag(entry)
:entry[child]
?{[entry[tag]]:transform(entry[child],tag,child)}
:entry[tag]
||Object.fromEntries([...Object.entries(attributes).map(([key,attribute])=>
 [key,typeof attribute=="function"?attribute(entry=typeof entry=="string"||Array.isArray(entry)?entry:Object.entries(entry)[0]||""):attribute]) 
,[child,{[tag]:typeof (entry=Array.isArray(entry)?entry[1]:entry)=="object"
?transform(entry.length?entry:Object.entries(entry),tag,child,attributes)
:undefined}]])).sort((past,next)=>(typeof next=="string")-1);
}

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
 return {label:transform(Object.entries(fields),([id,value])=>
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
 {li:!value.length?undefined:transform(value,"li","ul",
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
:new (this.inputs[key]||String)(value);
 let label=form({[key]:value},this.labels).label[0];
 label.class=group;
 label.input.value=[input&&input.value,fields[key],label.input.value].find(value=>typeof value=="string");
 if(Array.isArray(fields[key]))
 label.input.value=fields[key].includes(label.input.value)?label.input.value:fields[key][0];
 return this[input?"replaceChild":"appendChild"](scan({label}),input&&input.parentNode)
})
 Array.from(this.elements).forEach((input,index,inputs)=>
{if(input.id=="name")
 this.insertBefore(input.closest("label"),inputs[0].closest("label"));
 if(input.type=="text"&&this.room)
 input.dispatchEvent(new window.Event("change",{bubbles:true}))
 if(!reset)
 return;
 if(fields[input.id]===undefined)
 input.closest("label").remove();
})
 return Object.fromEntries([...new window.FormData(this)]);
}

export async function deform(resource)
{// text{style} text@source text#tag text/json#transform text#transform(text/json)
 let text=new RegExp(/[A-Za-zÁÉÍÓÖŐÚŰÜáéíóöőúűü\d\:\.\;\/\?\=\&\-\'_#]+/);
 let json=new RegExp(/[{\[]{1}(?:[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]|".*?")+[}\]]{1}/,"m");
 let call=new RegExp("\\((?:(\""+text.source+"\"|"+json.source+")[,\)]{0,1})+");
 let tags={"@":"name","#":"transform","{":"style"};
 let tag=new RegExp("(["+Object.keys(tags).join("")+"])("+json.source+"|"+text.source+"("+call.source+")*)[\}]*","g");
 let form=new RegExp("(?<=^|[ \n])("+text.source+"?[^\(\)\"\':, \n"+Object.keys(tags).join("")+"])((?:"+tag.source+")+)","gm");
 let promises=await Promise.all([...resource.matchAll(form)].map(([match,title,input])=>
{let {name,transform,style}=Object.fromEntries([...input.matchAll(tag)].map(([match,tag,value])=>[tags[tag],value]).reverse());
 [transform,name,input]=!transform||!transform.includes("(")?[transform,name||title,input]:[...transform.matchAll(json.source+"|"+text.source)].map(([match])=>match.replace("(",""));
 try{name=JSON.parse(name)}catch(fail){}
 try{input=JSON.parse(input)}catch(fail){}
 name=document[transform]
?document[transform].constructor==Function
?document[transform](name,input||{})
:defer({name,transform,...input||{}})
:refer(title,name,transform||(name==title&&"span"));
 name.setAttribute("style",style);
 return name;
}));
 return resource.replace(form,match=>(promises.shift()||{outerHTML:""}).outerHTML);
}

var defer=form=>scan({"img":{onload:"import('./Blik_2020_peer.js').then(({get})=>get("+JSON.stringify(form)+",this,true));",src:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}})
var refer=(title,name,transform,elements={"audio":["mp3"],"img":["png","jpg","svg","gif"]})=>scan(
{[transform||Object.keys(elements).find(key=>elements[key].includes(name&&name.slice(-3)))||"a"]:
{"#text":(title||name).replace(/_/g," "),title,name:title||name,alt:title||name,href:name,src:name,controls:"on",onclick:!name?undefined
:"this.name=='"+title+"'?insert(document.createTextNode(this.name.replace(/_/g,' ')),this).parentNode.removeAttribute('name'):resolve('"+title+"').then(name=>insert(name,this)).then(node=>note(node.parentNode).name='"+title+"')"
}
});

function clockwork(date)
{return {id:"timescale",li:
[["year",String(date.getFullYear()),Array(2500).fill(0).map((second,index)=>({"#text":"-"+"0".repeat(4-String(++index).length)+index})).reverse().concat(
                                    Array(2499).fill(0).map((second,index)=>({"#text":"0".repeat(4-String(index).length)+index})))]
,["month",String(date.getMonth()),Array(12).fill(0).map((second,index)=>({"#text":"0".repeat(2-String(++index).length)+index}))]
,["day",String(date.getDate()),Array(31).fill(0).map((second,index)=>({"#text":"0".repeat(2-String(++index).length)+index}))]
,["hour",String(date.getHours()),Array(24).fill(0).map((second,index)=>({"#text":"0".repeat(2-String(index).length)+index}))]
,["minute",String(date.getMinutes()),Array(60).fill(0).map((second,index)=>({"#text":"0".repeat(2-String(index).length)+index}))]
,["second",String(date.getSeconds()),Array(60).fill(0).map((second,index)=>({"#text":"0".repeat(2-String(index).length)+index}))]
].map(([id,scale,li])=>({id,ul:{li}}))}
}

async function spell(block,recursion)
{if(!recursion)
{let expanded=block.style.display==='initial';
 if(!expanded){block.style.display="initial";}
 else if(spelling){console.log("skip to end");skip+=2}
 else{block.style.display="none";}
 if(expanded||spelling)return;
 skip=0;
 spelling=1;
 block.onclick=function(){skip+=1}
}
 let textcontents=[];//Array.prototype.map.call(block.childNodes,item=>{if(item.nodeName!=="#text"){if(item.style)item.style.visibility="collapse";else if(item.setAttribute)item.setAttribute("style","visibility:collapse")}else{let textcontent=item.textContent;item.textContent="";return textcontent/*.replace(/^\n+|\n+$/gm,'')*/;}})
 for(let item of block.childNodes){if(item.nodeName!=="#text"){if(item.style)item.style.visibility="collapse";else if(item.setAttribute)item.setAttribute("style","visibility:collapse")}else{textcontents.push(item.textContent/*.replace(/^\n+|\n+$/gm,'')*/);item.textContent=""}}
 let textindex=0;
 for(let item of block.childNodes)
{if(item.nodeName==="#text")
{let text=textcontents[textindex++];
 let char;
 if(typeof text!=="undefined")
 for(let index=0;char=text.charAt(index);index++)
 if(skip<2){await new Promise(resolve=>setTimeout(resolve,skip?0:index%3?index%12?100:600:200));/*typenoise(char.charCodeAt(0));*/item.textContent+=char;}
 else{item.textContent+=text.substring(index);index=text.length-1}
}else if(item.getAttribute&&item.getAttribute("name")=="quote"||item.nodeName==="SVG"){item.style.visibility="visible";}
 else{if(item.style)item.style.visibility="visible";await spell(item,true);}
}
 if(!recursion)block.onclick=null,skip=0,spelling=0;
}

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










function tunemirror(click)
{click.stopPropagation();
 if(this.nextSibling){while(this.nextSibling)this.nextSibling.remove();return};
 for(let modifier of 
[{"label": document.createRange().createContextualFragment(awesome["fas fa-search-plus"]).firstChild,operation:click=>{click.stopPropagation();mirrors[this.parentNode.id].display.wrapper.style.fontSize=new Number(mirrors[this.parentNode.id].display.wrapper.style.fontSize.replace("px",""))+1+"px";}}
,{"label": document.createRange().createContextualFragment(awesome["fas fa-search-minus"]).firstChild,operation:click=>{click.stopPropagation();mirrors[this.parentNode.id].display.wrapper.style.fontSize=new Number(mirrors[this.parentNode.id].display.wrapper.style.fontSize.replace("px",""))-1+"px";}}
])
 this.parentNode.appendChild(modifier.label).onclick=modifier.operation;
}

export async function featurefacebook()
{let module=await import("//connect.facebook.net/en_US/sdk.js")
 return new Promise(resolve=>
 window.fbAsyncInit=function()
{FB.init({appId:'281250585888156',autoLogAppEvents:true,status:false,xfbml:true,version:'v4.0'});
 FB.AppEvents.logPageView();
 FB.getLoginStatus(function(response)
{window.document.styleSheets[0].addRule("#facebook","position:absolute;bottom:20px;right:15vw;font-size:30px;color:#757575;font-weight:900;transform:rotate(-10deg);line-height:0.8em;cursor:pointer;white-space:pre;");
 window.document.styleSheets[0].addRule("#facebook svg","fill:#757575;position:absolute;right:-35px;top:0;bottom:0;margin-top:auto;margin-bottom:auto;width:30px;transform:none;")
 let facebook=scan(
 {"div":
 {"id":"facebook","title":"authorize access to featured facebook posts"
 ,"svg":{...vectors.arrow_curved.svg,"style":"position:absolute;width:48px;bottom:-66px;right:-20px;fill:#757575;transform:rotate(6deg)"}}
 ,"#text":"Feature \nfacebook?"+awesome["fab fa-facebook-square"].replace("<svg ","<svg width='10px' ")
 });
 facebook.connected=response.status==="connected";
 !function connectfacebook(click)
{facebook.onclick=null;
 let facebooklogo=facebook.removeChild(facebook.lastChild);
 insert(null,facebook.lastChild,true);
 let settle=function(response)
{facebook.connected=response.status==="connected";
 facebook.replaceChild(window.document.createTextNode(facebook.connected?"Forget \nfacebook":"Feature \nfacebook?"),facebook.childNodes[1]);
 facebook.onclick=connectfacebook;
 facebook.replaceChild(facebooklogo,facebook.lastChild);//spin();
}
 if(click.srcElement)(facebook.connected?FB.logout:FB.login)(settle,{scope:'user_posts'})
 else settle(click);
}(response);
 resolve(facebook)
})
}).then(facebook=>facebook)
}

export function promptpost(item,block)
{//gum_bubble_pop.play();
 //block=block.parentNode.insertBefore(document.createElement("span"),block.nextSibling);block.style.display="block";
 let entry=document.createElement("span");entry.setAttribute("name",item.id);entry.setAttribute("class","entry");entry.setAttribute("platform",item.platform);entry.onclick=load;
 entry.appendChild(document.createTextNode("\n"));
 //if(item.onclick){entry.name=item.name;entry.onclick=item.onclick; block=block.parentNode.insertBefore(entry,block.nextSibling);return block}
 //timestamp=entry.appendChild(document.createElement("span"));timestamp.setAttribute("style","color:#b71c1c;");timestamp.innerHTML=item.createdTime+item.name.substring(5,9)+"."+item.name.substring(9,11)+"."+item.name.substring(11,13)+". ";
 let date=new Date(item.createdTime);
 let timestamp=entry.appendChild(document.createElement("span"));timestamp.setAttribute("style","color:#b71c1c;display:block;");
 let avatar=timestamp.appendChild(document.createElement("img"));if(item.avatar)avatar.setAttribute("src",item.avatar);else fetch("https://www.googleapis.com/customsearch/v1/siterestrict?q="+item.author+"&searchType=image&cx="+(true?"014735265259933203879:xaftz2zw4io":"014735265259933203879:qgusnjqnuxk")+"&key="+keys.googleapi).then(img=>img.json()).then(img=>avatar.setAttribute("src",img.items[0].link));avatar.setAttribute("style","border-radius:50%;height:1em;vertical-align:bottom");avatar.setAttribute("title",item.author);
 if(item.platform=="facebook")timestamp.appendChild(document.createRange().createContextualFragment(awesome["fab fa-facebook-f"]).firstChild).setAttribute("style","position:absolute;height:10px;top:1.7em;transform:translate(-7px);fill:#5577BA");
 timestamp.appendChild(document.createTextNode(" "+date.getFullYear()));
 timestamp.appendChild(document.createTextNode(((date.getMonth()+1).toString().length<2?"0":"")+(date.getMonth()+1)+(date.getDate().toString().length<2?"0":"")+date.getDate()))
 //delimiter=entry.appendChild(document.createElement("span"));delimiter.setAttribute("style","color:black;");delimiter.innerHTML="|";
 //fetch("https://en.wiktionary.org/wiki/"+item.title,{"mode":"cors","headers":{"Access-Control-Allow-Origin":"*"}}).then(page=>console.log("wiki",page));
 //fetch("https://en.wiktionary.org/"+'/w/api.php?action=parse&format=json&prop=text|revid|displaytitle&callback=?&page='+item.title,{"mode":"cors","headers":{"Access-Control-Allow-Origin":"*"}}).then(page=>console.log("w",page));
 let title=entry.appendChild(document.createElement("span"));title.setAttribute("style","color:inherit;display:block;");title.innerHTML=item.title;
 block=block.parentNode.insertBefore(entry,block.nextSibling);
 if(item.content)preparepost(block,item.content)
}

async function load(click)
{let subject=click.currentTarget;
 if(!subject.nextSibling.nextSibling.id)
{insert(null,subject,true)
 let content;
 if(subject.getAttribute("platform")=="local")content=await resolve(subject.getAttribute("name")).then(deform);
 else if(subject.getAttribute("platform")=="facebook")content=await new Promise(resolve=>FB.api("/"+subject.getAttribute("name"),"GET",{fields:'id,name,from,created_time,message,type,timeline_visibility,link,object_id'},response=>resolve(response))).then(response=>{console.log(response);return response.object_id?new Promise(resolve=>FB.api("/"+response.object_id,"GET",{fields:'id,title,format,source,embed_html'},responseobject=>resolve(responseobject))).then(responseobject=>{console.log(responseobject);return responseobject.embed_html+" \n"+response.message}):deform(response.message+" \n "+(response.name&&response.link?response.name.replace(/ /g,"_")+"@"+response.link:""))});
 else content=await fetch("https://www.googleapis.com/drive/v3/files/"+(subject.getAttribute("name"))+"?alt=media&key="+keys.googleapi).then(promise=>promise.text()).then(content=>deform(content));
 subject.nextSibling.remove();
 if(content!="Not Found")await preparepost(subject,content).then(done=>spell(subject.nextSibling.nextSibling));
}
 else spell(subject.nextSibling.nextSibling)
}

async function preparepost(subject,content)
{let entry=document.createElement("span");entry.setAttribute("style","height:0;overflow:hidden");entry.setAttribute("id",subject.getAttribute("name"));
 var observer=new MutationObserver(function(mutations)
{observer.disconnect();
 for(let mutation of mutations)
{let node;
 for(let i=0;node=mutation.addedNodes[i];i++)
{if(node.getAttribute&&node.getAttribute("class")==="animation"){let source=node.innerHTML;node.innerHTML="";insert(source,node);};
};
};
});
 observer.observe(entry,{attributes:false,childList:true,characterData:false});
 entry.innerHTML="\n"+content;
 entry.innerHTML+="\n\n";
 await loadcomment(entry,entry.id);
 //await fetch("https://www.googleapis.com/drive/v3/files/1-47T-7HxbgQcgoDg082MBS18rlVa5_W3?alt=media&key="+keys.googleapi).then(response=>response.text()).then(feed=>console.log(feed))//feed.filter(response=>response.post===entry.id).sort(function(next,following){return new Date(following.time)-new Date(next.time)}).forEach(response=>{loadcomment(entry,entry.id,response);}));
 let block=subject.parentNode.insertBefore(document.createTextNode("\n\n"),subject.nextSibling);
 block=block.parentNode.insertBefore(entry,block.nextSibling);
};

export function search(block)
{let hint=document.createElement("span");
 hint.setAttribute("class","assistant");
 let assistant=hint.appendChild(scan(vectors.assistant));
 assistant.style.height="50px";
 assistant.onclick=function(){allin();radio()}
 hint=hint.appendChild(document.createElement("input"));
 hint.value=new URLSearchParams(window.location.search).get("featuring")||null;
 hint.onchange=function(hint)
{document.querySelectorAll("h2~.entry").forEach(function(entry)
{entry.style.visibility=entry.getElementsByTagName("img")[0].getAttribute("title").toLowerCase().includes(hint.target.value.toLowerCase())?"visible":"hidden";
})
};
 block.parentNode.insertBefore(hint.parentNode,block.nextSibling);
 hint.focus()
 if(hint.value)
 hint.onchange({target:hint})
}

async function loadcomment(thread,id,response)
{prompt=document.createElement("form");prompt.setAttribute("class","comment")
//prompt.innerHTML=anonymous;//serialized=await new Promise(function(resolve,reject){
 let anonymous=scan(vectors.anonymous);
 let avatar=prompt.appendChild(response&&response.avatar?document.createElement("img"):anonymous);//document.createRange().createContextualFragment(anonymous).firstChild);
 let input=prompt.appendChild(document.createElement("span"));input.setAttribute("name","quote");
 //input=prompt.appendChild(document.createElement("span"));input.setAttribute("name","quote");//}).then(function(svg){return//serialized=new XMLSerializer().serializeToString(prompt.getElementsByTagName("svg")[0]);//});//avatarblob=new Blob([anonymous],{type:"image/svg+xml"});console.log("blob",avatarblob);//DOMURL=peer.URL||peer.webkitURL||peer;//avatarurl=DOMURL.createObjectURL(avatarblob)
 let image=new Image();
 if(response&&response.avatar){avatar.src=response.avatar;image.setAttribute("crossOrigin","Anonymous");}/*avatar.nodeName==="IMG"*/else{avatar.src=URL.createObjectURL(new Blob([anonymous],{type:"image/svg+xml"}))};//'data:image/svg+xml; charset=utf8, '+encodeURIComponent(anonymous)}
 image.onload=function(){sampleimage(this,input);};
 image.src=response&&response.avatar?response.avatar:'data:image/svg+xml; charset=utf8, '+encodeURIComponent(anonymous);
 if(response)
{input.innerHTML=deform(response.quote);
 if(response.quote.length>250)
{let cut=input.innerHTML.slice(250);
 input.innerHTML=input.innerHTML.slice(0,250);
 let restore=input.appendChild(document.createElement("span"));restore.style.color="#616161";restore.setAttribute("onclick","rest=this.nextSibling;this.parentNode.replaceChild(this.nextSibling,this);spell(rest);");restore.innerHTML="...";
 let more=input.appendChild(document.createElement("span"));more.innerHTML=cut;more.setAttribute("style","overflow:hidden;display:none");
}let date=new Date(response.time)
 input.appendChild(document.createElement("div")).textContent=date.getFullYear()+"."+((date.getMonth()+1).toString().length<2?"0":"")+(date.getMonth()+1)+"."+(date.getDate().toString().length<2?"0":"")+date.getDate()+" "+date.getHours()+":"+date.getMinutes();
}
 else{input.setAttribute("contenteditable","true");input.innerHTML="a kommentelés β üzemmódban.";input.setAttribute("name",id);input.addEventListener("input",function(event){if(event.data)typenoise(event.data.charCodeAt(0));if(event.inputType==="insertParagraph"){event.preventDefault();typenoise(13);respond(event.srcElement.parentNode)}});}
 thread.appendChild(prompt);
}

async function perform(source)
{var records=await fetch('./Blik_2019_studio.json').then(response=>response.json()).then(response=>
{config.insertBefore(document.createElement("select"),config.getElementsByTagName("select")[1].nextSibling).id="song";
 for(let author in response)
 for(let record in response[author])
 scan({"option":{"name":author,"id":record,"literal":record}},song)
 song.onchange=function(){control.onclick()};
 return response;
});
 //var vectors=await fetch('./Blik_2019_json').then(response=>response.json()).then(response=>response);
 document.body.appendChild(scan(vectors.play)).id="control";
 document.styleSheets[0].addRule("#control",center+"width:300px;fill:#fff8e1")
 control.onclick=function(event,studio)
{if(!studio){spin(control);return import('./Blik_2019_studio.js').then(response=>{spin(control);control.onclick(event,response)})};
 studio.sing(records[Object.keys(records).find(author=>records[author][song.value])][song.value]);
 control.innerHTML=Tone.Transport.state=="started"?scan(vectors.pause).innerHTML:scan(vectors.play).innerHTML;
}
}

export function convey(block)
{let [name,extension]=block.getAttribute("name").split(".");
 let format=["mp3"].includes(extension)?"audio":"video";
 let present=document.getElementById(name);
 if(present)return block.parentNode.removeChild(present);
 let medium=document.createElement(format);
 medium.setAttribute("controls","true");//medium.setAttribute("crossOrigin","Anonymous");
 medium.setAttribute("id",name);
 medium.setAttribute("autoplay","true");
 medium.onplay=highlighttrack
 medium.setAttribute("src","recs/"+name+"."+extension);
 if(format=="video")
{medium.setAttribute("width",width);medium.setAttribute("height",height);
 //if(format==="drive"){/*src=await fetch(*/medium.src="https://drive.google.com/uc?export=download&id="+url/*"https://www.googleapis.com/drive/v3/files/"+url+"?alt=media&key="+keys.googleapi)*/;/*console.log("fetched media source:",src);medium.src=src;/*URL.createObjectURL(new Blob([src],{type:"video/mp4"}))*/}else{medium.setAttribute("src",url)};medium.setAttribute("type",type+"/"+(format==="drive"?"mp4":format));medium.setAttribute("autoplay","true");medium.setAttribute("style","overflow-y:scroll;border:none;border-radius:"+(height/8)+"px")
 vignette=document.createElement("div");
 vignette.setAttribute("style","height:"+(height+2)+"px;width:"+(width+2)+"px;margin-left:-"+(width+1)+"px;margin-top:-1px;border-radius:"+(height/8)+"px;position:absolute;display:inline-block;pointer-events:none;box-shadow:0 0 20px rgba(0,0,0,1) inset,0 0 20px rgba(0,0,0,1) inset,0 0 20px rgba(0,0,0,1) inset,0 0 20px rgba(0,0,0,1) inset")
 block.parentNode.insertBefore(vignette,block.nextSibling);
}
 block.parentNode.insertBefore(medium,block.nextSibling);
 //if(!inline)anchor.parentNode.insertBefore(document.createTextNode('\r\n'),anchor.nextSibling.nextSibling)
 //if(!inline)anchor.parentNode.insertBefore(document.createTextNode('\r\n'),anchor.nextSibling)
}

var playing;
export function allin(){for(media of document.querySelectorAll("span[onclick='convey(this)']")){/*if(media.nextSibling.nodeName!="AUDIO")*/media.click();}}
export function highlighttrack(track)
{if(playing)
{let ruleindex=Array.prototype.slice.call(document.styleSheets[0].cssRules,0).find(function(rule,index)
{if(rule.selectorText!=playing)return false;
 document.querySelector(rule.selectorText.split("::")[0]).pause();
 //console.log(rule.selectorText==playing,rule.selectorText,playing)
 document.styleSheets[0].deleteRule(index);console.log("removed highlight",index,"from",playing);
 return true
});
 playing=null;
};
 if(track.target.paused)return;
 playing="audio#"+track.target.id+"::-webkit-media-controls-panel";
 document.styleSheets[0].addRule(playing,"background-color:#039be5;")
 return console.log("playing",playing)
}

export function radio()
{//if(typeof track!="undefined")track.pause();
 var tracks=document.getElementsByTagName("audio");
 if(!tracks.length)return;
 for(next of tracks){if(next!=track){next.pause()}};
 var track=tracks[Math.floor(Math.random()*tracks.length)]
 if(track.paused)
{track.onended=radio;
 track.scrollIntoView();
 return track.play();
}
}

async function typenoise(keycode)
{if(keycode==34)tone.string.triggerAttackRelease("C2","1n");//{mp3_return_new.pause();mp3_scrollDown.pause();mp3_scrollDown.currentTime=0;mp3_scrollDown.playbackRate=2;mp3_scrollDown.play();}
 else if(keycode==33)tone.string.triggerAttackRelease("C2","1n");//{/*mp3_return_new.pause();*/mp3_scrollUp.pause();mp3_scrollUp.currentTime=0;mp3_scrollUp.playbackRate=2;mp3_scrollUp.play();}
 else if(keycode==8||keycode==46)tone.string.triggerAttackRelease("C2","1n");//{/*mp3_return_new.pause();*/mp3_backspace.pause();mp3_backspace.currentTime=0;mp3_backspace.playbackRate=2;mp3_backspace.play();}
 else if(keycode==32) tone.string.triggerAttackRelease("C2","1n");//{/*mp3_return_new.pause();*/mp3_space.pause();mp3_space.currentTime=0;mp3_space.playbackRate=2;mp3_space.play();}
 else if(keycode==13||keycode==10)tone.string.triggerAttackRelease("C2","1n");//{/*mp3_return_new.pause();*/mp3_return_new.currentTime=0;mp3_return_new.volume=0.7;mp3_return_new.playbackRate=2;mp3_return_new.play();await new Promise(resolve=>setTimeout(resolve,1000));}
 else if((keycode>=48&&keycode<=90)||(keycode>=96&&keycode<=111)||(keycode>=187))
 if(mp3_whatsound[parseInt(keycode)])tone.string.triggerAttackRelease("C2","1n");//{/*mp3_return_new.pause();*/var whatsound=mp3_whatsound[parseInt(keycode)];whatsound.pause();whatsound.currentTime=0;whatsound.playbackRate=1.5;whatsound.volume=randomPlay(0.5,0.7);whatsound.play();}
}

export function report(event)
{let node=event.target;
 let frame=node.closest("div").appendChild(document.createElement('div'));
 frame.setAttribute("class","meta");
 let [x,y]=[node.closest("div").scrollLeft+event.clientX,node.closest("div").scrollTop+event.clientY];//Object.entries(node.getBoundingClientRect().toJSON()).reduce((frame,[key,value])=>{if(key=="x"||key=="y")frame[key]+=value;return frame},node.closest("svg").getBoundingClientRect().toJSON())
 console.log(node.closest("div").scrollLeft,x,y);
 frame.setAttribute("style","position:absolute;display:block;left:"+x+"px;top:"+y+"px;right:auto;bottom:auto");
 frame.appendChild(document.createElement("img")).src="./icon/embriophyta/"+node.getAttribute("name")+".jpg";
 frame.innerHTML+=(node.getAttribute("name")?node.getAttribute("name")+" ":"")+(node.getAttribute("nev")?node.getAttribute("nev").replace(/,/g,"\\n"):"");
 frame.onclick=function(){this.parentNode.removeChild(this)};
};

async function feed(block,limit,sources)
{//scan(Array.isArray(resource)?translate(resource,"div",item=>({"#text":item.name})):resource,frame).childNodes[0];
 if(block.nextSibling&&block.nextSibling.className=="assistant")
{while(block=block.nextSibling)
 if(block.className=="entry"||block.className=="assistant")
 block.style.display=block.style.display=="none"?"block":"none";
 return;
}insert(null,block,true)
 tone.string.triggerAttackRelease("C2","8n");
 sources.map(function(source)
{let platform=source.substring(0,source.indexOf("/"));
 source=source.substring(source.indexOf("/")+1);console.log(platform,source.replace(/\/$/,""));
 return (platform=="google"
 ?fetch("https://www.googleapis.com/drive/v3/files?q='"+source+"'+in+parents+and+name+contains+'txt'&fields=kind,files(name,createdTime,modifiedTime,owners,id)&key="+keys.googleapi).then(promise=>promise.json()).then(entries=>entries.files.map(function(next){next.platform=platform;next.avatar=next.owners[0].photoLink;next.author=next.owners[0].displayName;next.title=next.name.substring(13).replace(/\.txt/g," ").replace(/_/g," ");if((new Date(next.modifiedTime))<(new Date(next.createdTime)))next.createdTime=next.modifiedTime;return next;}))//.catch(fail=>{console.log(fail);return fetch("/store/list").then(list=>{console.log(list);return []})})
 //:platform=="local"
 //?fetch("?rss").then(promise=>promise.text()).then(xml=>Array.prototype.map.call((new DOMParser()).parseFromString(xml,"text/xml").querySelectorAll("item"),item=>{return {content:item.textContent,createdTime:item.pubDate.textContent,avatar:"./Blik_2019_silhouette.png",author:"Patrik Blik",title:item.querySelector("description").textContent.substring(13).replace(/\.txt/g," ").replace(/_/g," ")}}))
 //?fetch("store?wildcard=^Blik.*txt$").then(list=>list.json()).then(list=>list.map(({name})=>{let resource=name;return {"id":source.substring(0,source.lastIndexOf("/")+1)+resource,"title":resource.substring(resource.search(/\d\d_/)+3).replace(/\.txt/g,"").replace(/_/g," "),"author":resource.substring(0,resource.search(/_\d\d/)).replace("_"," & "),"avatar":source.startsWith("peez")?"https://pbs.twimg.com/profile_images/832431104963575808/Db9IbwBP.jpg":undefined,"createdTime":resource.substring(resource.search(/_\d\d/)+1,resource.search(/\d\d_/)+2).split("").map((digit,index,date)=>{if(index==3||index==6)date.splice(index+1,0,"-");return digit}).join(""),"platform":platform}}))
 :platform=="medium"
 //?fetch("https://medium.com/feed/"+source).then(response=>response.text()).then(xml=>Array.prototype.map.call((new DOMParser()).parseFromString(xml,"text/xml").querySelectorAll("item"),item=>{return {avatar:item.parentNode.querySelector("image").textContent,createdTime:item.querySelector("pubDate").textContent}}))
 ?fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/"+source).then(promise=>promise.json()).then(medium=>medium.items.map(function(next){next.avatar=medium.feed.image;next.createdTime=next.pubDate;return next}))
 :platform=="wordpress"
 ?WPCOM().site(source).postsList({"number":limit}).then(batch=>batch.posts.map(function(next){next.avatar=next.author.avatar_URL=="Glenn Wallis"?"https://i1.rgstatic.net/ii/profile.image/650281603837952-1532050624030_Q512/Glenn_Wallis4.jpg":next.author.avatar_URL;next.author=next.author.name;next.createdTime=next.date;next.id=next.site_ID+"/"+next.ID;next.platform=platform;return next}))
 :platform=="facebook"
 ?window.facebook&&facebook.connected?new Promise(resolve=>FB.api("/"+/*source*/"10210793350908906"+"/feed","GET",{},response=>resolve(response))).then(response=>{console.log(response);return note(response.data.map(next=>{return {platform:"facebook",author:"blikpatrik",avatar:"https://lh3.googleusercontent.com/a-/AAuE7mAaNAQuGwqBbFNniuXl2oCCuzeba31iDE5JvR3eSag=s64",id:next.id,createdTime:next.created_time,title:next.message}}));},fail=>{console.log(fail);return []}):[]
 :platform.startsWith("http")
 ?fetch(platform+"/"+source).catch(fail=>fetch(platform+"/"+source,{mode:"no-cors"})).then(source=>source.json()).then(podcast=>{console.log(podcast);return podcast.items?Promise.all(podcast.items.map(next=>{next.avatar=podcast.feed.image||"https://upload.wikimedia.org/wikipedia/commons/b/ba/WhatsTheHarmDotNetIcon132x132.jpg";next.createdTime=next.pubDate;return next.enclosure&&next.enclosure.link?deform("listen@"+next.enclosure.link).then(content=>({...next,content:content+next.content})):next})).then(list=>list):[]}).catch(fail=>[])
 :fetch(source.replace(/\/$/,"")).then(guest=>guest.json()).then(guest=>guest.art.map(resource=>{console.log(resource);return {"id":resource.name,"title":resource.name.substring(resource.name.search(/\d\d_/)+3).replace(/\.txt/g,"").replace(/_/g," "),"author":resource.name.substring(0,resource.name.search(/_\d\d/)).replace("_"," & "),"avatar":source.startsWith("peez")?"https://pbs.twimg.com/profile_images/832431104963575808/Db9IbwBP.jpg":"https://lh3.googleusercontent.com/a-/AAuE7mAaNAQuGwqBbFNniuXl2oCCuzeba31iDE5JvR3eSag=s64","createdTime":resource.name.substring(resource.name.search(/_\d\d/)+1,resource.name.search(/\d\d_/)+2).split("").map((digit,index,date)=>{if(index==3||index==6)date.splice(index+1,0,"-");return digit}).join(""),"platform":platform}})))
}).reduce(async function(entries,next,index,fetches)
{next=await next;
 entries=await entries;
 if(next)
 entries=entries.concat(next.slice(0,limit))
 if(fetches.length-1==index)
{block.nextSibling.remove();
 entries=entries.sort(function(next,following){return (new Date(next.createdTime))-(new Date(following.createdTime));}).forEach(item=>promptpost(item,block));
 search(block)
};
 return entries
},[])
}
