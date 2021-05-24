import * as d3 from "./Bostock_2020_d3v6.js";
import {deform,activate} from "./Blik_2020_transform.js";
import {note,path,fetch,window,retreat,absolve,resolve,compose} from "./Blik_2020_platform.js";

export var svgns="http://www.w3.org/2000/svg";

export var [vectors,awesome]=['./Blik_2020_vectors.json','./blessochampion_2019_awesomesvgs.json'].map(async(module,index)=>(
!globalThis.window
?import(module).then(module=>module.default)
:fetch(module).then(module=>module.json()).then(json=>JSON.parse(new TextDecoder("utf-8").decode(new Uint8Array(json.data))))).then(module=>
 index?awesome=module:vectors=module));

export function route(object,path)
{return [object,...path].reduce((object,path)=>
 object[path]||object);
}

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
,spectrum
};
function spectrum(...spectrum)
{let domain=Array.apply(null,Array(spectrum.length));
 domain=domain.map((item,index)=>index/(spectrum.length-1)).reverse();
 return d3.scaleLinear().range(spectrum).domain(domain)
};
color.rainbow=spectrum(...["red","yellow","green","blue"].map(key=>color[key]));
color.health=spectrum(...["green","lime","lemon","orange","velvet"].map(key=>color[key]));
color.google=spectrum(...["#ea4335","#fbbc05","#2E7D32","#4285F4","rgb(106,68,233)"]);


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

export const fragment=text=>window.document.createRange().createContextualFragment(text);

export function scan(source,parent,namespace)
{if(typeof source=="string")
 source=vectors[source]||awesome[source.replace("_"," ")]||source;
 if(typeof source=="string")
 return parent.appendChild(window.document.createRange().createContextualFragment(source))&&parent;
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

export function markup(object, indentation)
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
{let xml=
 {toJson(xml)
{if(xml.nodeType==9)
 return this.toObj(xml.documentElement);
 else if (xml.nodeType==1)
{let json={};
 if(!xml.attributes.length&&!xml.firstChild)
 return null;
 if(xml.attributes.length)
 Array.from(xml.attributes).forEach(({nodeName,nodeValue})=>
 json["@"+nodeName]=nodeValue?.toString()||"");
 if(xml.firstChild)
{let {tag,cdata,text}=Array.from(xml.childNodes).reduce(children,({nodeType,nodeValue})=>
 children[
 {1:"tag",4:"cdata",3:nodeValue.match(/[^ \f\n\r\t\v]/)?"text":"empty"
 }[nodeType]]++&&children
,{tag:0,text:0,empty:0,cdata:0});
 if(tag)
 if(text<2&&cdata<2)
 this.removeWhite(xml)&&
 Array.from(xml.childNodes).forEach((node,index)=>
 Object.assign(json
,{[(index={3:"#text",4:"#cdata"}[node.nodeType])||node.nodeName]:index?this.escape(node.nodeValue)
:(index=json[node.nodeName])?[...Array.isArray(index)?index:[index],this.toJson(node)]
:this.toJson(node)
 }));
 else if(!xml.attributes.length)
 json=this.escape(this.innerXml(xml));
 else json["#text"]=this.escape(this.innerXml(xml));
 else if(text)
 if(!xml.attributes.length)
 json=this.escape(this.innerXml(xml));
 else json["#text"]=this.escape(this.innerXml(xml));
 else if(cdata)
 if(cdata>1)
 json=this.escape(this.innerXml(xml));
 else Array.from(xml.childNodes).forEach(node=>
 json["#cdata"]=this.escape(node.nodeValue));
}return json;
}else alert("unhandled node type: " + xml.nodeType);
},stringify(value,name,indentation)
{var json=name?"\""+name+"\"":"";
 if (Array.isArray(value))
 return json+(name?":":"")+"["+
 (value.length>1?"\n"+indentation+"\t":"")+
 value.map((node,index)=>this.stringify(node,"",indentation+"\t")).join(value.length>1?",\n"+indentation+"\t":"")+
 (value.length>1?"\n"+indentation:"")+"]";
 else if(value==null)
 return json+(name&&":")+"null";
 else if(typeof value=="object")
 return json+(name?":":"")+"{"+
 +(Object.keys(value).length>1?"\n"+indentation+"\t":"")
 +Object.entries(value).map(([key,value])=>this.stringify(value,key,indentation+"\t")).join(Object.keys(value).length>1?",\n"+indentation+"\t":"")
 +(Object.keys(value).length>1?"\n"+indentation:"")
 +"}";
 else if(typeof value=="string")
 return json+(name&&":")+"\""+value.toString()+"\"";
 else return json+(name&&":")+value.toString();
},innerXml:node=>
 node.innerHTML||Array.from(node.childNodes).map(function outerXML({nodeType,nodeName,attributes,childNodes})
{let node=
 {1:()=>"<"+nodeName+
 Array.from(attributes).map(({nodeName,nodeValue})=>" "+nodeName+"=\""+(nodeValue||"").toString()+"\"").join("")+
 (childNodes.length?">"+Array.from(childNodes).map(outerXML).join("")+"</"+nodeName+">":"/>")
 ,3:()=>nodeValue
 ,4:()=>"<![CDATA["+nodeValue+"]]>"
 }[nodeType];
 return node?node():""
}).join("")
 ,escape:text=>Object.entries(
 {"\\\\":/[\\]/g,'\\"':/[\"]/g,'\\n':/[\n]/g,'\\r':/[\r]/g
 }).reduce((text,[escape,expression])=>text.replace(expression,escape),text)
 ,removeWhite(node)
{node.normalize();
 Array.from(node.childNodes).forEach(node=>(
 {1:()=>this.removeWhite(node)
 ,3:()=>!node.nodeValue.match(/[^ \f\n\r\t\v]/)&&node.parentNode.removeChild(node)
 }[node.nodeType]||(()=>{}))());
 return node;
}};
 if(document.nodeType==9)
 document=document.documentElement;
 var json=xml.stringify(xml.toJson(xml.removeWhite(document)),document.nodeName,"\t");
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

export async function stylesheet(style,global)
{let [jss,...plugins]=await Promise.all(
["jss/dist/jss.js",...["nested","extend","global"].map(plugin=>"jss-plugin-"+plugin+"/dist/jss-plugin-"+plugin+".js")
].map(absolve).map(module=>import(module).then(module=>module.default||module)));
 return jss.create().use(...plugins.map(plugin=>plugin.default())).createStyleSheet(global?{"@global":style}:style).toString();
}

let primaryinput={"text-align":"left",width:"auto","&>li":{"text-shadow":"black 0px 0px 10px","white-space":"nowrap","&>span":{"white-space":"normal"}}};//"background-image":"linear-gradient(to right, rgb(17, 17, 17) 0%, rgba(33, 33, 33, 0) 100%)"
let material={"box-shadow":"black 0px 0px 10px","&:hover":{"box-shadow":"black 0px 0px 50px"},margin:"1em"};
let glow={filter:"url(#shadow_white)"};
let label=
 {position:"relative",display:"inline-block","white-space":"nowrap","vertical-align":"middle",cursor:"pointer"
 ,"&>svg":{float:"left",height:"1em","vertical-align":"middle",cursor:"pointer",overflow:"visible","&:hover":glow}
 ,"&>span":{float:"left","&:not(:empty):after":{content:":"}}
 ,"&>input":
 {height:"1em",transition:"all var(--transition)","text-shadow":"inherit"
 ,"&[type=text]":{outline:"none","background-color":"transparent",border:"none",width:"20px","box-sizing":"border-box",color:"inherit","text-align":"center","font-family":"inherit","font-size":"inherit"}
 ,"&:focus+ul":{display:"block"}
 }
 ,"&>ul":
 {position:"fixed","margin-left":"var(--formscroll)","max-height":"100%","max-width":"100%","padding-top":"var(--form)",bottom:"var(--form)","box-sizing":"border-box",width:"inherit","overflow":"scroll"//"background-image":"radial-gradient(at center bottom, rgb(17, 17, 17) 0%, rgba(33, 33, 33, 0) 100%)"
 ,"&>li":{display:"block"}
 ,"&:hover":{display:"block"}
 }
 ,"& ul":
 {display:"none","z-index":"2",padding:"0px","margin-bottom":"0px","text-align":"center","pointer-events":"none","list-style-type":"none"
 ,"& ul":{position:"relative",bottom:"initial","max-height":"initial","vertical-align":"top","text-align":"left"}
 ,"& li":
 {position:"relative",display:"inline-block","pointer-events":"all","padding-right":"1em",color:"var(--text)","vertical-align":"top",margin:"auto",left:"0px",right:"0px","white-space":"pre","padding-left":"1em"
 ,"&:hover":
 {color:"var(--highlight)"
 ,"& ul":
 {display:"inline-block","white-space":"pre"
 ,"&:hover>li":{display:"block"}
 }
 }
 ,"&>svg":{position:"absolute",height:"1em",left:"0px","margin-left":"0px","margin-right":"0px",transform:"scale(0.9)",fill:"var(--text)"}
 }
 }
 ,"&[focused=true]>ul":{display:"block"}
 ,"&[for=message]>ul,&[for=name]>ul":primaryinput
 ,"&[for=message]>ul":
 {display:"block","margin-left":"-5em","max-height":"50vh","min-width":"150px"
 ,"&>li":
 {opacity:0,animation:"fadeout 6s","padding-left":0,"min-height":"4em","white-space":"normal"
 ,"&>img":{...material,margin:"1em",height:"2em",float:"left","border-radius":"50%","background-color":"var(--isle)",padding:".5em",margin:".5em .5em 0 .5em"}
 ,"&>div":{color:"var(--isle)"}
 }
 ,"&>li:not(:last-of-type)":{animation:"fadeout 2s"}
 ,"&:hover>li":{opacity:1,animation:"fadein 1s"}
 ,"&>span":{position:"fixed",bottom:"1.5em",left:"5.5em",color:"black"}
 }
 };
let pdfjs=
 {"span":
 {"& .pdfjs":{"max-height":"670px",overflow:"scroll","max-width":"90vw",margin:"auto"}
 }
 ,"div.pdfjs":
 {margin:"auto","max-height":"95vh",overflow:"scroll"
 ,"&>div#viewer>div.page":
 {"background-image":"url('icon/blackboard.png')",margin:"auto"
 ,"&>.loadingIcon":{content:"",fill:"red","border-radius":"50%",width:"20px",height:"20px"}
 ,"&~div.page>div.canvasWrapper>svg image":{opacity:0.3}
 ,"&>div.canvasWrapper":
 {"&>svg tspan":{fill:"var(--text,#dbd1b4)"}
 ,"&>svg image":{opacity:0.3}
 ,"&>svg path":{fill:"rgba(33,33,33,0.533)"}
 }
 }
 }
 };
export var layout=
 {material,label
 ,a:{"text-decoration":"none",position:"relative",color:"rgb(66,133,244)"}
 ,blockquote:Object.fromEntries(["before","after"].map(side=>["&> p::"+side,{content:"\""}]))
 ,pill:{display:"inline-block",padding:"1em","border-radius":"100vh",cursor:"pointer","background-color":"var(--isle)"}
 ,row:{display:"inline-block",margin:"0 1em",height:"100%","list-style":"none"}
 ,column:{display:"block",margin:"1em 0","list-style":"none"}
 ,shelf:{position:"absolute",bottom:0,left:0,right:0,"text-align":"left"}
 ,theme:
 {"::-webkit-scrollbar":{display:"none"}
 ,...Object.fromEntries(Object.entries(
 {abyss:"#111111",isle:"#303030",text:"#dbd1b4",note:"#7a7564",highlight:"rgb(230,238,156)"
 ,font:"averia",hand:"ranger",form:"6em",size:"14px",align:"inherit",transition:"1s"
 }).map(([key,value])=>["--"+key,value]))
 }
 ,frame:{margin:0,"text-align":"center",overflow:"hidden","font-family":"var(--font)","font-size":"var(--size)",color:"var(--text)","background-color":"var(--abyss)",transition:"all var(--transition)"}
 ,wheel:
 {"@keyframes dash":{"0%":{"stroke-dashoffset":187},"50%":{"stroke-dashoffset":1,transform:"rotate(135deg)"},"100%":{"stroke-dashoffset":187,transform:"rotate(450deg)"}}
 ,"@keyframes stroke":{"0%":{stroke:"rgb(66,133,244)"},"25%":{stroke:"rgb(222,62,53)"},"50%":{stroke:"rgb(247,194,35)"},"75%":{stroke:"rgb(27,154,89)"},"100%":{stroke:"rgb(66,133,244)"}}
 ,"@global":{"svg.wheel":{"& circle":{"stroke-dasharray":187,"stroke-dashoffset":0,"transform-origin":"center center",animation:"1.5s ease-in-out 0s infinite normal none running dash, 6s ease-in-out 0s infinite normal none running colors"}}}
 }
 ,panel()
{return {...merge(this.material,this.pill)
 ,width:"100%","font-size":"2em",margin:0,"box-sizing":"border-box","border-radius":"0 0 0 0",transition:"all 0.5s"
 ,"&>label":
 {...this.label
 ,"&>input:focus~svg":Object.fromEntries(Array(3).fill(3*45).map((deg,n)=>["& rect:nth-of-type("+(n+1)+")",{width:n==1?1:0.9,transform:"rotate("+(deg-n*45)+"deg)"}]))
 ,"&:first-of-type":{float:"right","&>svg":{transform:"scale(1.5)"}}
 ,"& rect":{transform:"rotate(0deg)","transform-origin":"center",transition:"all 0.5s"}
 }      };
},codemirror:{"div.cm-gutters":{"background-color":"var(--abyss) !important"}}
 ,pdfjs
 };

export var fontface=
 {averia:{"font-family":"averia",src:"url(Sayers_2011_averia.ttf)"}
 ,oswald:{"font-family":"oswald",src:"url(Vernon_2011_Oswald-Regular.ttf)"}
 ,ranger:{"font-family":"ranger",src:"url(Blik_2018_calligraphy.ttf)"}
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