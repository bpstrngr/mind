import * as d3 from "./Bostock_2020_d3v6.js";
import {deform} from "./Blik_2020_transform.js";
import {acquire,window,fetch,path,note,svgns,retreat,resolve} from "./Blik_2020_window.js";
export {acquire,window,fetch,path,note,svgns,retreat,resolve};

export var [vectors,awesome]=['./Blik_2020_vectors.json','./blessochampion_2019_awesomesvgs.json'].map(async(module,index)=>(
!globalThis.window
?import(module).then(module=>module.default)
:(await fetch)(module).then(module=>module.json()).then(json=>JSON.parse(new TextDecoder("utf-8").decode(new Uint8Array(json.data))))).then(module=>
 index?awesome=module:vectors=module));

export function compose(...operations){return operations.reduce((composition,operation)=>async(...input)=>operation(await composition(...input)));};

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
[{"rel":"icon","type":"image/svg+xml","href":favicon||"favicon.ico"}
].concat(styles.filter(style=>style.match(/^[^\n]+.css$/)).map(style=>({"rel":"stylesheet","href":style})))
//,{"#text":"setInterval(done=>fetch('/authority',{method:'POST',headers:sessionStorage.getItem('authority')}).then(done=>console.log(done)),1000*60)"}
 ,"style":styles.filter(style=>!style.match(/^[^\n]+.css$/)).map(style=>({"#text":style}))
 }
 ,"body":{...body,"script":scripts.map(script=>{return {"src":script,"type":"module"}}).concat(body.script?body.script:[])}
 }      };
}

export function throttle(fragment,progress=0)
{if(!fragment.simulation)return fragment;
 //if(!fragment.simulation||!fragment.simulation.nodes().length)return fragment;
 return new Promise(resolve=>setTimeout(time=>resolve(fragment),2000)).then(fragment=>
{//let size=fragment.querySelectorAll("g.node").length;
 //if(size>progress||!size)
 for(let simulation of Array.isArray(fragment.simulation)?fragment.simulation:[fragment.simulation])
 if(note(Math.floor((1-simulation.alpha())*100),"% throttling",fragment.getAttribute("title"))<90)
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

export function translate(source,tag,child,attributes={})
{return source.map((value,index)=>typeof tag=="function"?tag(value):!value?{}:value[child]
?{[value[tag]]:translate(value[child],tag,child)}
:value[tag]
||Object.fromEntries([...Object.entries(attributes).map(([key,attribute])=>
 [key,typeof attribute=="function"?attribute(value=typeof value=="string"||Array.isArray(value)?value:Object.entries(value)[0]||""):attribute]) 
,[child,{[tag]:typeof (value=Array.isArray(value)?value[1]:value)=="object"&&value
?translate(value.length?value:Object.entries(value),tag,child,attributes)
:undefined}]])).sort((past,next)=>(typeof next=="string")-1);
}

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