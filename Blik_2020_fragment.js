import * as d3 from "./Bostock_2020_d3v6.js";
import {note,path,fetch,window,retreat,absolve,resolve,compose,merge} from "./Blik_2020_platform.js";
import fragment from "./Blik_2020_fragment.js";
import dashboard from "./Blik_2020_dashboard.js";
import network from "./Blik_2020_network.js";
import script from "./Blik_2020_script.js";
import clock from "./Blik_2020_time.js";
import * as chart from "./Blik_2020_chart.js";
import * as map from "./Blik_2020_map.js";

 export default
 {document,script,media,feed,portfolio,network,dashboard,...chart,...map
 ,xmas:async call=>import("./anvaka_2019_sinus_pine.js").then(({run})=>run())
 }

export function profile(resource,presets)
{if(typeof resource=="string"||(resource instanceof String))
 return {source:presets.source,layout:["media","script"]};
 let fields=
 {network:
 {spread:["force","left","right","up","down","radius"]
 ,gradual:Boolean(presets.gradual)
 ,title:["name","image","wiki image"]
 //,relations:presets.layout=="network"&&[resource].map(function repetitive(value,sample){let entry=Object.entries(value).find(([key,value])=>Array.isArray(value)&&((key==sample)||value.some(value=>repetitive(value,key))));return entry&&entry[0];},spread)
 }}[presets.layout];
 let priority=presets.layout||"network";
 let matrix= Object.keys(resource).filter(function record(key)
{return Object.values(resource[key]||{}).every(value=>Array.isArray(value)?record(value):!isNaN(value))
});
 let profile=
 {source:[presets.source,...Array.isArray(resource)?resource:Object.entries(resource)]
 ,layout:Object.entries(fragment).map(([key])=>key).sort(value=>value!=priority||-1)
 ,...fields
 ,matrix
 };
 return profile;
};

export function throttle(fragment,progress=0)
{if(!fragment.simulation)return fragment;
 //if(!fragment.simulation||!fragment.simulation.nodes().length)return fragment;
 return new Promise(resolve=>setTimeout(time=>resolve(fragment),2000)).then(fragment=>
{//let size=fragment.querySelectorAll("g.node").length;
 //if(size>progress||!size)
 for(let simulation of Array.isArray(fragment.simulation)?fragment.simulation:[fragment.simulation])
 if(note(Math.floor((1-simulation.alpha())*100),"% throttling "+fragment.getAttribute("title"))<90)
 return throttle(fragment);
 else fragment.simulation.stop();
 return fragment;
})
}

export function activate(fragment,actions)
{if(actions)
 Object.entries(fragment).forEach(([nodename,node])=>
 (Array.isArray(node)?node:[node]).forEach(node=>node&&
 [nodename,"#"+node.id,"."+node.class].map(selector=>
 actions[selector]||{}).forEach(events=>
 Object.keys(events).forEach(event=>
 node["on"+event]="dispatch.call(this,event)"))));
 return fragment
};

 export function* document(source,namespace,actions)
{if(typeof source=="string"||source.nodeName||["NodeList"].includes(source.constructor?.name))
 return source.nodeName?source:window.document.createRange().createContextualFragment(source);
 let [fragment,...nodes]=Object.entries(activate(source||{},actions)).reduce(function([fragment,...nodes],[name,value])
{if(!value)return [fragment,...nodes];
 let child=name=="#text"||value.nodeName;
 if(child)
 return [fragment.appendChild(document(value,namespace,actions).next().value)&&fragment,...nodes];
 let attribute=["string","number","boolean"].includes(typeof value);
 if(attribute)
 return [fragment,...nodes,[name,value]];
 let a={target:"_blank"};
 let svg={viewBox:"0 0 1 1",xmlns:namespaces.svg};
 let attributes={a,svg}[name];
 let values=Array.isArray(value)?value:[value];
 let children=values.map(value=>merge(value,attributes,0)).map(function(value){try
{let qualifier=value.xmlns?name:[name,namespace].find(qualifier=>namespaces[qualifier]);
 let specification=namespaces[qualifier]||value.xmlns;
 let suffix=specification?"NS":"";
 let node=window.document["createElement"+suffix](...[specification,name].filter(Boolean));
 let nodes=document(value,qualifier,actions);
 Array.from(nodes).forEach((value,index)=>Array.isArray(value)
?node.setAttribute(...value)
:node.appendChild(value));
 return node;
}catch(fail){return fail.stack}});
 fragment.append(...children);
 return [fragment,...nodes];
},[new window.DocumentFragment()]);
 fragment=fragment.childNodes.length==1?fragment.firstChild:fragment;
 yield* [fragment,...nodes];
}

 export function markup(object,indentation)
{let xml="<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"+
 Object.entries(object).map(function markup([key,value],indentation)
{let fragment="";
 indentation=typeof indentation=="string"?indentation:"";
 if(Array.isArray(value))
 fragment+=value.map(child=>
 indentation+markup([key,child],indentation+"\t")+"\n").join("");
 else if(typeof(value)=="object")
{fragment+=indentation+"<"+key;
 let hasChild;
 Object.entries(value).forEach(([key,value])=>
 key.charAt(0)=="@"
?fragment+=" "+key.substr(1)+"=\""+value.toString()+"\""
:(hasChild=true));
 fragment+=hasChild
?">"+
[Object.entries(value).map(([key,value],index)=>
 ({"#text":value||" ","#cdata":"<![CDATA["+value+"]]>"}[key]||
 (key.charAt(0)!="@"?(index?"":"\n")+markup([key,value],indentation+"\t")+"\n":""))).join("")
,0
].reduce(fragment=>
 fragment+(fragment.slice(-1)=="\n"?indentation:""))+
 "</"+key+">"
:"/>";
}else fragment+=indentation+"<"+key+">"+value.toString()+"</"+key+">";
 return fragment;
}).join("");
 return indentation ? xml.replace(/\t/g, indentation) : xml.replace(/\t|\n/g, "");
}

export function demarkup(document,tab)
{let escape=text=>Object.entries(
 {"\\\\":/[\\]/g,'\\"':/[\"]/g,'\\n':/[\n]/g,'\\r':/[\r]/g
 }).reduce((text,[escape,expression])=>text.replace(expression,escape),text);
 let textNode=nodeValue=>nodeValue?.match(/[^ \f\n\r\t\v]/);
 let profile=node=>Array.from(node.childNodes).reduce((profile,node)=>
 [profile,{1:"tag",3:textNode(node.nodeValue)?"text":"empty",4:"cdata"}[node.nodeType]].reduce((profile,nodetype)=>
 Object.assign(profile,{[nodetype]:[...profile[nodetype]||[],node]}))
,{});
 function stringify(value,name,indentation)
{var json=name?"\""+name+"\"":"";
 if (Array.isArray(value))
 return json+(name?":":"")+"["+
 (value.length>1?"\n"+indentation+"\t":"")+
 value.map((node,index)=>stringify(node,"",indentation+"\t")).join(value.length>1?",\n"+indentation+"\t":"")+
 (value.length>1?"\n"+indentation:"")+"]";
 else if(value==null)
 return json+(name?":":"")+"null";
 else if(typeof value=="object")
 return json+(name?":":"")+"{"+
 +(Object.keys(value).length>1?"\n"+indentation+"\t":"")
 +Object.entries(value).map(([key,value])=>stringify(value,key,indentation+"\t")).join(Object.keys(value).length>1?",\n"+indentation+"\t":"")
 +(Object.keys(value).length>1?"\n"+indentation:"")
 +"}";
 else if(typeof value=="string")
 return json+(name?":":"")+"\""+value.toString()+"\"";
 else return json+(name?":":"")+value.toString();
};
 let innerXml=node=>node.innerHTML||
 Array.from(node.childNodes).map(function outerXML({nodeType,nodeName,attributes,childNodes})
{let tag=()=>"<"+nodeName+
 Array.from(attributes).map(({nodeName,nodeValue})=>" "+nodeName+"=\""+(nodeValue||"").toString()+"\"").join("")+
 (childNodes.length?">"+Array.from(childNodes).map(outerXML).join("")+"</"+nodeName+">":"/>");
 let text=()=>nodeValue;
 let cdata=()=>"<![CDATA["+nodeValue+"]]>";
 let node={1:tag,3:text,4:cdata}[nodeType];
 return node?node():"";
}).join("");
 function removeWhite(node)
{node.normalize();
 let drill=node=>removeWhite(node);
 let clear=node=>!textNode(node.nodeValue)&&node.parentNode.removeChild(node)
 Array.from(node.childNodes).forEach(node=>({1:drill,3:clear}[node.nodeType])?.call(this,node));
 return node;
};
 let doc=[removeWhite(document),{}].reduce(function demarkup(node,json={})
{if(node.nodeType==9)
 return demarkup(node.documentElement);
 let nodeType={3:"#text",4:"#cdata"}[node.nodeType];
 let value=
 nodeType?escape(nodeType=="#cdata"?node.nodeValue:innerXml(node)):
 {...Array.from(removeWhite(node).childNodes).reduce((json,node)=>demarkup(node,json),{})
 ,...Object.fromEntries(Array.from(node.attributes).map(({nodeName,nodeValue})=>[nodeName,nodeValue?.toString()||""]))
 };
 return [value,json[node.nodeName]].reduce((value,twin)=>(
 {[node.nodeName]:twin?[...Array.isArray(twin)?twin:[twin],value]:value
 }));
});
 return doc;
 var json=stringify(doc,document.nodeName,"\t");
 note(json)
 return JSON.parse("{"+(tab?json.replace(/\t/g,tab):json.replace(/\t|\n/g,""))+"\n}");
}

export function hypertext(title,favicon,scripts,styles=[],body={})
{let script=scripts.map(script=>{return {"src":script,"type":"module"}}).concat(body.script||[]);
 let [link,style]=styles.reduce((nodes,style,index)=>
 nodes[index=+/{|}/.test(style)].push(index?{"#text":style}:{"rel":"stylesheet","href":style})&&nodes
,[[],[]]);
 link.push({"rel":"icon","type":"image/svg+xml","href":favicon||"favicon.ico"})
 return {html:
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
],link,style
//,{"#text":"setInterval(done=>fetch('/authority',{method:'POST',headers:sessionStorage.getItem('authority')}).then(done=>console.log(done)),1000*60)"}
 }
 ,"body":{...body,script}
 }      };
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

export var pdf=resource=>Promise.all(
[import("./mozilla_2010_pdf_viewer_brightspace.js")
,import("./mozilla_2010_pdf_link_service_brightspace.js")
]).then(function([{PDFViewer},{PDFLinkService}])
{let container=document({"div":{"class":"pdfjs","div":{"id":"viewer"}}}).next().value;
 let viewer=new PDFViewer(
 {linkService:new PDFLinkService(),container,renderer:"svg"
 ,textLayerMode:0,disableRange:true,forceRendering:true
 });
 viewer.linkService.setViewer(viewer);
 viewer.setDocument(resource);
 return viewer.container;
});

export function translate(source,tag,child,attributes={})
{return source.map(value=>typeof tag=="function"?tag(value):!value?{}:value[child]
?{[value[tag]]:translate(value[child],tag,child)}
:value[tag]
||Object.fromEntries([...Object.entries(attributes).map(([key,attribute])=>
 [key,typeof attribute=="function"?attribute(value=typeof value=="string"||Array.isArray(value)?value:Object.entries(value)[0]||""):attribute]) 
,[child,{[tag]:typeof (value=Array.isArray(value)?value[1]:value)=="object"&&value
?translate(value.length?value:Object.entries(value),tag,child,attributes)
:undefined}]])).sort((past,next)=>(typeof next=="string")-1);
};

export var list=value=>(
 {ul:
 {li:translate(
 typeof value=="object"?Array.isArray(value)?value:Object.entries(value):[value]
,"li","ul"
,{"#text":item=>(typeof item=="string"
?[item,0]:Array.isArray(item)?item
:Object.entries(item)).reduce((key,value)=>key)
 //+(typeof value=="object"
//?awesome["fas fa-book-medical"]
//:awesome["fas fa-align-left"]).replace("<svg ","<svg width='10px' "))
 })
 }
 });

export function field(fields,labels={})
{let group=Object.entries(fields).reduce((group,[key,value],index)=>
 typeof value=="object"&&!Array.isArray(value)&&!index&&key,false);
 if(group)
 fields=fields[group];
 labels=this?.dataset.labels||labels;
 if(typeof labels=="string")
 labels=JSON.parse(labels);
 let label=Object.entries(note(fields)).map(([id,value])=>
{if(typeof value=="undefined")return;
 let type=value.constructor==Date?"date":value instanceof Set?"radio":Array.isArray(value)?"select":typeof value=="boolean"?"checkbox":"text";
 let field=
 {type,for:id,title:id,class:group
 ,checked:{checkbox:value?value.toString():undefined}[type]
 ,input:
 {type:["select","date"].includes(type)?"text":type,id,name:id
 ,value:type=="date"?clock(value,"datetime"):type=="text"&&value&&String(value)||undefined
 ,checked:{checkbox:value?value.toString():undefined}[type]
 ,autocomplete:"off"
 }
 ,ul:type=="date"?clockwork(value):type!="select"?undefined:list(value).ul
 ,...tag(labels,typeof labels[id]=="function"?labels[id](value):id)
 };
 return field;
});
 if(!(this?.nodeName?.toLowerCase()=="form"))
 return {label};
 Array.from(this.elements||[]).filter(input=>
 Object.keys(fields).includes(input.id)||input.closest("label").remove());
 label.forEach(label=>
{let [input,value]=[this.elements||{},fields].map(fields=>fields[label.for])
 label.input.value=Array.isArray(value)?value.includes(input?.value)?input?.value:value[0]:value;
 input?.closest("label").remove();
 this.appendChild(document({label}).next().value);
 if(label.input.type=="text")
 this.elements[label.for].dispatchEvent(new window.Event("change",{bubbles:true}));
});
 return Object.fromEntries([...new window.FormData(this)]);
}

// SHOULD BE MERGED WITH FIELD() - updating form if bound.
export function reform_deprecated(fields,clear)
{//if(form instanceof window.Event)
 //form=form.currentTarget;
 let group=Object.entries({...fields}).reduce((group,[key,value],index)=>
 typeof value=="object"&&!value.length&&!index&&key,false);
 if(group)
 fields=fields[group];
 if(!(this?.nodeName?.toLowerCase()=="form"))
 return Object.fromEntries(Object.entries(fields).map(([key,value])=>
 [key,Array.isArray(value)?value[0]:value]));
 if(fields)
 Object.entries(fields).forEach(function fill([key,value])
{let input=this.elements[key];
 if(value===undefined)
 return input&&input.closest("label").remove();
 let valid=!this.elements[key]||(value instanceof this.elements[key].constructor);
 let reset=past=>Array.isArray(value)
?key=="source"||value.includes(past)?past:value[0]
:[input?.getAttribute("value"),value,past].find(value=>typeof value=="string");
 if(!valid)
 if(input)
 return [input.closest("label"),input].map((field,input)=>input
?field.setAttribute("value",reset(field.getAttribute("value")))
:field.classList.add(...group?[group]:[]));
 else
 value=value instanceof String?value:(this.elements[key]==Boolean)
?["true","on",true].includes(value)
:(this.elements[key]==Date)
?clock(value,"datetime")
:new (this.inputs[key]||String)(value);
 let label=field({[key]:value},JSON.parse(this.dataset.labels)).label[0];
 label.class=group;
 label.input.value=reset(label.input.value);
 return this[input?"replaceChild":"appendChild"](document({label},0,this.ownerDocument.defaultView.actions).next().value,input&&input.parentNode)
}.bind(this))
 Array.from(this.elements).forEach(function sort(input,index,inputs)
{if(input.id=="source")
 if(Array.from(this.childNodes).includes(inputs[0].closest("label")))
 this.insertBefore(input.closest("label"),inputs[0].closest("label"));
 if(input.type=="text")
 input.dispatchEvent(new window.Event("change",{bubbles:true}))
 if(!clear)
 return;
 if(fields[input.id]===undefined)
 input.closest("label").remove();
}.bind(this))
 return Object.fromEntries([...new window.FormData(this)]);
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

let tag=(labels,id)=>typeof id!="string"
?id
:typeof labels[id]=="object"
?labels[id]
:(labels[id]&&labels[id][0]=="<")
?{"#text":labels[id]}
:{span:{"#text":typeof labels[id]=="string"?labels[id]:id}};

export async function transform({incumbent,resource,...fields})
{resource=resource||await resolve(fields.source||"get").then(resource=>resource.default||resource)
 if(resource instanceof Error){resource=resource.toString();fields.layout="media";};
 if(resource.pdf){resource=await pdf(resource);fields.layout="media";}
 if(typeof resource!="object"&&["network",undefined].includes(fields.layout))fields.layout="media";
 if(this)
 fields=compose(fields,profile,get=>({get}),field.bind(this),fields,note)(resource);
 let product=await fragment[fields.layout||"media"](resource,{incumbent,window,...fields});
 return product;
 let values=this?.elements?.source?.parentNode?.querySelector("ul");
 if(values)values.__data__=resource.descendants?resource.descendants():fields.source;
 //new Array(file.numpages).reduce((canvas,phase,index)=>file.getPage(index+1).then(page=>
//{let view=page.getViewport({scale:1.5});canvas.width=canvas.width<view.width?view.width:canvas.width;canvas.height=(canvas.height||0)+view.height;
 //page.render({canvasContext:canvas.getContext('2d'),viewport:view});return canvas;
//}),document.createElement('canvas')))
}

export async function feed(source,{number,fragment})
{//scan(Array.isArray(resource)?translate(resource,"div",item=>({"#text":item.name})):resource,frame).childNodes[0];
 //let sibling=this;
 //if(!this.classList.toggle("open"))
 //while(sibling.nextSibling)
 //if(["entry","assistant"].includes((sibling=sibling.nextSibling).className))
 //(sibling.style.display=sibling.style.display=="none"?"block":"none");
 //if(this.nextSibling&&this.nextSibling.classList.contains("wheel")||!this.classList.contains("open"))
 //return;
 //await insert(null,this,true);
 if(tone)tone.string.triggerAttackRelease("C2","8n");
 let feed=
 {medi:source=>fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/"+source).then(promise=>promise.json())
 ,word:source=>import("/wordpress_2019_wpcom.js").then(({WPCOM})=>WPCOM().site(source).postsList({number}))
 ,face:source=>new Promise(resolve=>FB.api("/"+/*source*/"10210793350908906"+"/feed","GET",{},response=>resolve(response)))
 ,http:source=>fetch(source).then(source=>source.json())
 ,rsss:source=>fetch("https://medium.com/feed/"+source).then(response=>response.text()).then(xml=>(new DOMParser()).parseFromString(xml,"text/xml").querySelectorAll("item"))
 };
 let avatars=
 {"Glenn Wallis":"https://i1.rgstatic.net/ii/profile.image/650281603837952-1532050624030_Q512/Glenn_Wallis4.jpg"
 ,blikpatrik:"https://lh3.googleusercontent.com/a-/AAuE7mAaNAQuGwqBbFNniuXl2oCCuzeba31iDE5JvR3eSag=s64"
 ,whatstheharm:"https://upload.wikimedia.org/wikipedia/commons/b/ba/WhatsTheHarmDotNetIcon132x132.jpg"
 ,peez:"https://pbs.twimg.com/profile_images/832431104963575808/Db9IbwBP.jpg"
 };
 if(typeof source=="string")source=await fetch(source).then(source=>source.json());
 source=Array.isArray(source)?source:Object.keys(source);
 source=source.map(source=>[source.indexOf("/"),0].reduce(index=>[source.substring(0,index)||"local",source.substring(index)]));
 source=source.map(([platform,source])=>(
 feed[platform.substring(0,4)]||(source=>Promise.resolve({items:[source]})))(source).then(feed=>
 [platform,source,feed]).catch(fail=>[platform,source,note(fail)]));
 let block=window.document.createRange().createContextualFragment(document({div:{}}).next());
 await Promise.all(source).then(source=>source.map(([platform,source,feed])=>
 ([feed,"items","posts","data"].reduce((list,key)=>
 Array.isArray(list)?list:feed[key])||[]).slice(0,number).map(async next=>
 Object.assign(next
,{...[[next,"author","name"].reduce((name,key)=>!name||name.length?name:name[key])||
 source.substring(0,source.search(/_\d\d/)).replace("_"," & ")
,0].reduce(author=>(
 {author,avatar:
[[next.avatar,[next,"author","avatar_URL"],[feed,"feed","image"]].reduce((avatar,path)=>
 avatar||path.reduce((avatar,key)=>!avatar?undefined:avatar[key]))
,0
].reduce(avatar=>avatar||avatars[author]||avatars.blikpatrik)
 }))
 ,post:[0,"createdTime","pubDate","created_time","date"].reduce((time,key)=>time||next[key])||
 source.substring(source.search(/_\d\d/)+1,source.search(/\d\d_/)+2).split("").map((digit,index,date)=>{if(index==3||index==6)date.splice(index+1,0,"-");return digit}).join("")
 ,id:next.id||[0,"site_ID"].reduce((id,key)=>id||next[key])||source
 ,title:next.title||next.message||next.substring(next.search(/\d\d_/)+3).replace(/\.txt/g,"").replace(/_/g," ")
 ,content:[(next.enclosure&&next.enclosure.link?await deform("listen@"+next.enclosure.link):""),next.content].filter(Boolean).join("\n")
 ,platform
 })))).then(entries=>Promise.all(entries.flat())).then(entries=>entries.sort((next,following)=>
 (new Date(next.post))-(new Date(following.post))).forEach(promptpost.bind(block)));
 Array.from(block.childNodes).forEach(node=>fragment.parentNode.insertBefore(note(node),fragment));
 fragment.remove()
 //search(this);
}

export async function deform(resource)
{// text{style} text@source text#tag text/json#transform text#transform(text/json)
 let text=new RegExp(/[A-Za-zÁÉÍÓÖŐÚŰÜáéíóöőúűü\d\:\.\;\/\?\=\&\-\'_#\%\!\@]/);
 let json=new RegExp(/[{\[]{1}(?:[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]|".*?")+[}\]]{1}/,"m");
 let call=new RegExp("\\((?:(\""+text.source+"*\"|"+json.source+")[,\)]{0,1})+");
 let tags={"@":"source","#":"document","{":"style"};
 let tag=new RegExp("(["+Object.keys(tags).join("")+"])("+json.source+"|"+text.source+"+("+call.source+")*)[\}]*","g");
 let form=new RegExp("(?<=^|[ \n])("+text.source+"+?[^\(\)\"\':, \n"+Object.keys(tags).join("")+"])((?:"+tag.source+")+)","gm");
 let promises=await Promise.all([...resource.matchAll(form)].map(([match,title,input])=>
{let {source,document,style}=Object.fromEntries([...input.matchAll(tag)].map(([match,tag,value])=>[tags[tag],value]).reverse());
 [document,source,input]=!document||!document.includes("(")
?[document,source||title,input]
:[...document.matchAll(json.source+"|"+text.source+"+")].map(([match])=>match.replace("(",""));
 if(source)
 try{source=JSON.parse(source)}catch(fail)
{source=source.split(",").reduce((json,piece)=>
 //split consecutive jsons matched by the json regexp
{if(typeof json!="string"){input=(input?input+",":"")+piece;return json;}
 json=json+","+piece;
 try{return JSON.parse(json)}catch(fail){return json};
})
}try{input={source,...JSON.parse(input)}}catch(fail){input={source}}
 source=fragment[document]
?fragment[document].constructor==Function
?fragment[document](source,input)
:defer({layout:document,...input})
:refer(title,source,document||(source==title&&"span"))||match;
 if(source.setAttribute)
 source.setAttribute("style",style);
 return source;
}));
 return resource.replace(form,match=>(promises.shift()||{outerHTML:""}).outerHTML);
}

function portfolio(source)
{return document(
 {div:
 {h1:
 {"#text":window.location.pathname.split("/").filter(Boolean).pop()
 ,onclick:"import('/Blik_2020_window.js').then(({retreat})=>retreat())"
 ,style:"cursor:url('/vector/arrow_curved'),pointer"
 }
 ,h2:["pub","sub"].map(key=>(
 {"#text":key
 ,onclick:"import('/Blik_2020_actions.js').then(({transform,insert})=>insert({fragment:transform({source:window.location.pathname+'"+key+"',layout:'feed',number:15}),target:this,place:'over'}))"
 }))
 }
 }).next().value
}

function media(resource,{incumbent,...fields})
{if([incumbent?.title,incumbent?.parentNode.title].includes(fields.source))
 return document(incumbent.childNodes).next().value;
 if(resource.constructor.name=="Buffer")
 resource=new TextDecoder("utf-8").decode(new Uint8Array(resource));
 return resource.nodeName?resource:resource.startsWith("<")
?window.document.createRange().createContextualFragment(resource)
:deform(resource).then(source=>window.document.createRange().createContextualFragment(source))
}

 export var defer=form=>
 document({"img":
 {onload:"!function expect(){setTimeout(tick=>(typeof dispatch=='undefined'?expect:dispatch).call(this,event),500)}.call(this)"
 ,src:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
 ,"data-subject":JSON.stringify(form)
 ,class:"defer"
 }        }).next().value;

 var refer=(title,source,layout,elements={"audio":["mp3"],"img":["png","jpg","svg","gif"]})=>document(
 {[layout||Object.keys(elements).find(key=>elements[key].includes(source&&source.slice&&source.slice(-3)))||"a"]:
 {"#text":(title||source).replace(/_/g," "),title,source:title||source,alt:title||source,href:source,src:source,controls:"on",onclick:!source?undefined
 :"this.source=='"+title+"'?insert(document.createTextNode(this.source.replace(/_/g,' ')),this).parentNode.removeAttribute('source'):resolve('"+title+"').then(source=>insert(source,this)).then(node=>note(node.parentNode).source='"+title+"')"
 }
 }).next().value;

export var [vectors,awesome]=['./Blik_2020_vectors.json','./blessochampion_2019_awesomesvgs.json'].map(async(module,index)=>(
!globalThis.window
?import(module).then(module=>module.default)
:fetch(module).then(module=>module.json()).then(json=>JSON.parse(new TextDecoder("utf-8").decode(new Uint8Array(json.data))))).then(module=>
 index?awesome=module:vectors=module));


 export var color=
 {velvet:"#750000"
 ,blush:"#EA4C4B"
 ,red:"#c62828"
 ,orange:"#EF7C42"
 ,yellow:"#FFB133"
 ,lemon:"#EAC24D"
 ,bone:"#DBD1B4"
 ,lime:"#9BAA44"
 ,green:"#2e7d32"
 ,sage:"#93b793"
 ,jungle:"#10624C"
 ,blue:"#4285F4"
 ,indigo:"#283593"
 ,service:"#fbbc05"
 ,hazard:"#ea4335"
 ,provider:"#2E7D32"
 ,stakeholder:"#4285F4"
 ,flora:"rgba(46,125,50)"
 ,fauna:"rgba(198,40,40)"
 ,spectrum(...spectrum)
{let domain=Array.apply(null,Array(spectrum.length));
 domain=domain.map((item,index)=>index/(spectrum.length-1)).reverse();
 return d3.scaleLinear().range(spectrum).domain(domain)
}
 };
color.rainbow=color.spectrum(...["red","yellow","green","blue"].map(key=>color[key]));
color.health=color.spectrum(...["green","lime","lemon","orange","velvet"].map(key=>color[key]));
color.google=color.spectrum(...["#ea4335","#fbbc05","#2E7D32","#4285F4","rgb(106,68,233)"]);

 export var namespaces=
 {xml:'http://www.w3.org/XML/1998/namespace'
 ,xlink:'http://www.w3.org/1999/xlink'
 ,xmlns:'http://www.w3.org/2000/xmlns/'
 ,xhtml:"http://www.w3.org/1999/xhtml"
 ,svg:"http://www.w3.org/2000/svg"
 };




































//// DEPRECATED

export function promptpost(item)
{//gum_bubble_pop.play();
 //block=block.parentNode.insertBefore(document.createElement("span"),block.nextSibling);block.style.display="block";
 let entry=document({span:{source:item.id,class:"entry",platform:item.platform,"#text":"\n"}}).next().value
 entry.onclick=load;
 //if(item.onclick){entry.name=item.name;entry.onclick=item.onclick; block=block.parentNode.insertBefore(entry,block.nextSibling);return block}
 //timestamp=entry.appendChild(document.createElement("span"));timestamp.setAttribute("style","color:#b71c1c;");timestamp.innerHTML=item.createdTime+item.name.substring(5,9)+"."+item.name.substring(9,11)+"."+item.name.substring(11,13)+". ";
 let title=entry.appendChild(document(
 {span:
 {style:"color:#b71c1c;display:block;",img:
 {title:item.author,style:"border-radius:50%;height:1em;vertical-align:bottom"
 ,src:item.avatar
 }
 ,facebook:item.platform!="facebook"?undefined
:Object.assign(document.createRange().createContextualFragment(awesome["fab fa-facebook-f"]).firstChild
,{style:"position:absolute;height:10px;top:1.7em;transform:translate(-7px);fill:#5577BA"})
 ,"#text":" "+(item.post?clock(new Date(item.post),"date"):item.name.substring(5,13))//date.getFullYear()+((date.getMonth()+1).toString().length<2?"0":"")+(date.getMonth()+1)+(date.getDate().toString().length<2?"0":"")+date.getDate()
 ,span:{style:"color:var(--text);display:block;","#text":item.title}
 }
 }).next().value);
 if(!item.avatar)
 fetch("google/image/"+item.author).then(img=>title.querySelector("img").src=img.items[0].link)
 //delimiter=entry.appendChild(document.createElement("span"));delimiter.setAttribute("style","color:black;");delimiter.innerHTML="|";
 //fetch("https://en.wiktionary.org/wiki/"+item.title,{"mode":"cors","headers":{"Access-Control-Allow-Origin":"*"}}).then(page=>console.log("wiki",page));
 //fetch("https://en.wiktionary.org/"+'/w/api.php?action=parse&format=json&prop=text|revid|displaytitle&callback=?&page='+item.title,{"mode":"cors","headers":{"Access-Control-Allow-Origin":"*"}}).then(page=>console.log("w",page));
 this.appendChild(entry)
 if(item.content)preparepost(entry,item.content);
 return this;
}



async function loadcomment(thread,id,response)
{prompt=document.createElement("form");prompt.setAttribute("class","comment")
//prompt.innerHTML=anonymous;//serialized=await new Promise(function(resolve,reject){
 let anonymous=document(vectors.anonymous).next().value;
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
 else{input.setAttribute("contenteditable","true");input.textContent="a kommentelés β üzemmódban.";input.setAttribute("name",id);input.addEventListener("input",function(event){if(event.data)typenoise(event.data.charCodeAt(0));if(event.inputType==="insertParagraph"){event.preventDefault();typenoise(13);respond(event.srcElement.parentNode)}});}
 thread.appendChild(prompt);
}

export function search(block)
{let hint=document.createElement("span");
 hint.setAttribute("class","assistant");
 let assistant=hint.appendChild(document(vectors.assistant).next().value);
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

var action=action=>action.toString().replace(
 /(^function \w+\([\w,]*\)\n\{)|(\}$)/g
,"").replace(
 /(^\(\)=>\n*\{*|\}*$)/
,"");




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



function tunemirror(click)
{click.stopPropagation();
 if(this.nextSibling){while(this.nextSibling)this.nextSibling.remove();return};
 for(let modifier of 
[{"label": document.createRange().createContextualFragment(awesome["fas fa-search-plus"]).firstChild,operation:click=>{click.stopPropagation();mirrors[this.parentNode.id].display.wrapper.style.fontSize=new Number(mirrors[this.parentNode.id].display.wrapper.style.fontSize.replace("px",""))+1+"px";}}
,{"label": document.createRange().createContextualFragment(awesome["fas fa-search-minus"]).firstChild,operation:click=>{click.stopPropagation();mirrors[this.parentNode.id].display.wrapper.style.fontSize=new Number(mirrors[this.parentNode.id].display.wrapper.style.fontSize.replace("px",""))-1+"px";}}
])
 this.parentNode.appendChild(modifier.label).onclick=modifier.operation;
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



var playing;

async function typenoise(keycode)
{if(keycode==34)tone.string.triggerAttackRelease("C2","1n");//{mp3_return_new.pause();mp3_scrollDown.pause();mp3_scrollDown.currentTime=0;mp3_scrollDown.playbackRate=2;mp3_scrollDown.play();}
 else if(keycode==33)tone.string.triggerAttackRelease("C2","1n");//{/*mp3_return_new.pause();*/mp3_scrollUp.pause();mp3_scrollUp.currentTime=0;mp3_scrollUp.playbackRate=2;mp3_scrollUp.play();}
 else if(keycode==8||keycode==46)tone.string.triggerAttackRelease("C2","1n");//{/*mp3_return_new.pause();*/mp3_backspace.pause();mp3_backspace.currentTime=0;mp3_backspace.playbackRate=2;mp3_backspace.play();}
 else if(keycode==32) tone.string.triggerAttackRelease("C2","1n");//{/*mp3_return_new.pause();*/mp3_space.pause();mp3_space.currentTime=0;mp3_space.playbackRate=2;mp3_space.play();}
 else if(keycode==13||keycode==10)tone.string.triggerAttackRelease("C2","1n");//{/*mp3_return_new.pause();*/mp3_return_new.currentTime=0;mp3_return_new.volume=0.7;mp3_return_new.playbackRate=2;mp3_return_new.play();await new Promise(resolve=>setTimeout(resolve,1000));}
 else if((keycode>=48&&keycode<=90)||(keycode>=96&&keycode<=111)||(keycode>=187))
 if(mp3_whatsound[parseInt(keycode)])tone.string.triggerAttackRelease("C2","1n");//{/*mp3_return_new.pause();*/var whatsound=mp3_whatsound[parseInt(keycode)];whatsound.pause();whatsound.currentTime=0;whatsound.playbackRate=1.5;whatsound.volume=randomPlay(0.5,0.7);whatsound.play();}
}
