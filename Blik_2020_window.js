export var svgns="http://www.w3.org/2000/svg";
import clock from "./Blik_2020_time.js";

export var acquire=path=>import(process.execPath.replace("bin/node","lib/node_modules/")+path);

export var {window,fetch}=globalThis.window?globalThis
:{window:url=>acquire("jsdom/lib/api.js").then(module=>({window}=new module.default.JSDOM("",{url})))
 ,fetch:respond=>fetch=(url,instructions)=>respond({url,method:"get",...instructions,respond:header=>header,end:response=>response})
 };
 /*function(url,transfer)
{let [protocol,hostname,port,path]=
 [/^(\w+):/,/\/\/(\w+)/,/:([0-9]+)/,/((\/\w*)+(\?.*)*)$/].map(pattern=>
 url.match(pattern)).map(match=>!match||match[1]);
 path=path.replace(new RegExp("^\\/*"+hostname),"");
 if(!port.length)port=window.location.port||{http:80,https:443}[protocol];
 let address={protocol:protocol+":",hostname,port,path};
 let {body,...directions}=Object.assign({method:"get"},transfer);
 return new Promise(resolve=>import(protocol).then(({request})=>
 request(note({...address,...directions}),response=>
 response.setEncoding("utf8").on("data",data=>resolve(
 {json:call=>JSON.parse(data)
 ,text:call=>data,...response
 })))).then(request=>
 (!body||request.write(body))&&request.end()));
}};*/

export function path(name){return (window.location.pathname+(name||"")).replace(/^\/*|\/*$/g,"");}

export function retreat(){return window.location=window.location.pathname.split("/").filter(Boolean).slice(0,-1).join("/")+"/";}

export function compose(...operations){return operations.reduce((composition,operation)=>(...input)=>operation(composition(...input)));};

export async function resolve(source)
{if(typeof source=="object")
 return source;
 if(source.startsWith("{"))
 return JSON.parse(source);
 //if(format==="drive"){/*src=await fetch(*/medium.src="https://drive.google.com/uc?export=download&id="+url/*"https://www.googleapis.com/drive/v3/files/"+url+"?alt=media&key="+keys.googleapi)*/;/*console.log("fetched media source:",src);medium.src=src;/*URL.createObjectURL(new Blob([src],{type:"video/mp4"}))*/}else{medium.setAttribute("src",url)};medium.setAttribute("type",type+"/"+(format==="drive"?"mp4":format));medium.setAttribute("autoplay","true");medium.setAttribute("style","overflow-y:scroll;border:none;border-radius:"+(height/8)+"px")
 if(source.split(".").pop()=="js")
 return await import("./"+source).then(module=>note(module));
 let url=[window.location.origin,source].join("/");
 let response=await fetch(url,{method:"get",mode:"no-cors"});
 if(response.status!=200&&!source.startsWith("http"))
 if(response.status==404)
 response=await fetch("get?name="+source).then(response=>response.json()).then(list=>note(list)&&list.length?fetch(list[0].name):"missing source")
 else return response.text().then(Error);
 return response=="missing source"
?response
:response.status==200&&response.headers.get('Content-Type')=="application/json"
?response.json().then(json=>json.type=="Buffer"?JSON.parse(new TextDecoder("utf-8").decode(new Uint8Array(json.data))):json)
:response.type=="opaque"||response.headers.get('Content-Type').startsWith("text")
?response.text().then(text=>text)//response.headers.get('Content-Type').endsWith("text/html")?(new window.DOMParser()).parseFromString(text,"text/html"):text)
:response.headers.get('Content-Type').startsWith("image")
?response.headers.get('Content-Type')=="image/svg+xml"
?response.arrayBuffer().then(image=>window.document.createRange().createContextualFragment(new TextDecoder("utf-8").decode(new Uint8Array(image))))
:response.blob().then(image=>d3.create('img').attr('src',URL.createObjectURL(image)).node())
:response.headers.get('Content-Type').startsWith("audio")||response.headers.get('Content-Type').startsWith("video")
?response.blob().then(media=>{let [type,format]=response.headers.get('Content-type').split("/");media=d3.create(type).attr('type',format).attr('src',URL.createObjectURL(audio)).attr("controls","true").attr("id",source).attr("autoplay","true").attr("onplay",highlighttrack).attr("width",type=="video"?"400px":"auto").attr("height",type=="video"?"200px":"auto").node();return type=="video"?scan({"div":{"#text":media.outerHTML,"style":"height:"+(400+2)+"px;width:"+(200+2)+"px;margin-left:-"+(400+1)+"px;margin-top:-1px;border-radius:"+(200/8)+"px;position:absolute;display:inline-block;pointer-events:none;box-shadow:0 0 20px rgba(0,0,0,1) inset,0 0 20px rgba(0,0,0,1) inset,0 0 20px rgba(0,0,0,1) inset,0 0 20px rgba(0,0,0,1) inset"}}):media})
:response.arrayBuffer().then(file=>
 response.headers.get('Content-Type')=="application/pdf"
?pdf.getDocument(file).promise.then(file=>[new pdfjsViewer.PDFViewer({container:scan({"div":{"class":"pdfjs","div":{"id":"viewer"}}}),linkService:new pdfjsViewer.PDFLinkService(),renderer:"svg",textLayerMode:0,disableRange:true,forceRendering:true}),file].reduce((viewer,file)=>{viewer.linkService.setViewer(viewer);viewer.setDocument(file);return viewer.container}))//new Array(file.numpages).reduce((canvas,phase,index)=>file.getPage(index+1).then(page=>{let view=page.getViewport({scale:1.5});canvas.width=canvas.width<view.width?view.width:canvas.width;canvas.height=(canvas.height||0)+view.height;page.render({canvasContext:canvas.getContext('2d'),viewport:view});return canvas;}),document.createElement('canvas')))
//?pdf.getDocument(file).promise.then(file=>new Array(file.numpages).reduce((canvas,phase,index)=>file.getPage(index+1).then(page=>{let view=page.getViewport({scale:1.5});canvas.width=canvas.width<view.width?view.width:canvas.width;canvas.height=(canvas.height||0)+view.height;page.render({canvasContext:canvas.getContext('2d'),viewport:view});return canvas;}),document.createElement('canvas')))
:new TextDecoder("utf-8").decode(new Uint8Array(file)));
}

export function note(...note)
{let stack=Error().stack.split(/\n */)
 stack=[stack,1,2,3].reduce(last=>stack.shift()||last);
 let name=stack.replace(/^.*at |[^ ]*$/g,"");
 let script=stack.substring(Math.max(...["/","_"].map(c=>stack.lastIndexOf(c)))+1,stack.lastIndexOf(".js"));
 let place=stack.match(/(file|http)[^\)]*/);
 place=place?place[0]:stack;
 console.log(clock(new Date())+" "+script.toUpperCase()+"."+name,...note);
 console.log("\x1b[30m"+place+"\x1b[0m");
 return note[0]
};

export function newconsole()
{if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(this.navigator.userAgent))
 return window.console;
 //alert("triple tap for debug console");
 window.console=
{"queue":[]
,"log":function()
{let stack=new Error().stack.split("\n");
 stack=stack[stack[2].match("dlogger|window\.note|window\.onerror")?3:2];
 stack=stack.replace(/at ([^ ]+) \((.*)\)/g,(match,stack,place)=>
 place.replace(/^.*?\d\//,"./")+" ("+stack+")");
 stack=[stack,...Array.from(arguments)].map(item=>JSON.stringify(item)).join("\n");
 this.queue.push(stack.replace(/^\\u001b\[\d+m|\[\d+m$|%c/gm,""));
}
,"dir":function(obj){console.log("Content of "+obj);for(var key in obj){var value=typeof obj[key]==="function"?"function":obj[key];console.log("-\""+key+"\"->\""+value+"\"");}}
,"info":window.console.log
,"trace":function(){var stack;try{throw new Error();}catch(ex){stack=ex.stack;};console.log(Array.from(arguments).join("\n")+stack.split("\n").slice(2).join("\n"));}
,"show":function()
{let panel=window.document.body.appendChild(window.document.createElement("div"));
 panel.setAttribute("style","position:absolute;background-color:black;color:olivegreen;font-family:monospace;font-size:12px;top:0;left:0;width:100vw;height:100%;overflow:scroll");
 panel.onclick=function(){this.parentNode.removeChild(this)};
 this.queue.forEach(function(log){let note=panel.appendChild(window.document.createElement("p"));note.style.whiteSpace="pre-wrap";note.innerHTML=log});
 this.queue=[];
}
};
 window.onerror=function(msg,url,line){console.log("ERROR: \""+msg+"\" at \""+"\", line "+line);}
 window.addEventListener("touchstart",function(e){if(e.touches.length===3){console.show();e=null}});
 return window.console;
}

