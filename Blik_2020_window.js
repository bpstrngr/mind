export var svgns="http://www.w3.org/2000/svg";

export var [window,fetch]=typeof globalThis.window!="undefined"
?[globalThis.window,globalThis.fetch]
:[process.execPath.replace("bin/node","lib/node_modules")+"/jsdom/lib/api.js","./Blik_2020_file.js"].map(async module=>
 import(module)).map(async (module,file)=>file
?fetch=(await module).get
:window=new (await module).default.JSDOM().window);

export function path(name){return (window.location.pathname+(name||"")).replace(/^\/*|\/*$/g,"");}

export function retreat(){return window.location=window.location.pathname.split("/").filter(Boolean).slice(0,-1).join("/")+"/";}

export async function resolve(name)
{if(typeof name=="object")
 return name;
 if(name.startsWith("{"))
 return JSON.parse(name);
 //if(format==="drive"){/*src=await fetch(*/medium.src="https://drive.google.com/uc?export=download&id="+url/*"https://www.googleapis.com/drive/v3/files/"+url+"?alt=media&key="+keys.googleapi)*/;/*console.log("fetched media source:",src);medium.src=src;/*URL.createObjectURL(new Blob([src],{type:"video/mp4"}))*/}else{medium.setAttribute("src",url)};medium.setAttribute("type",type+"/"+(format==="drive"?"mp4":format));medium.setAttribute("autoplay","true");medium.setAttribute("style","overflow-y:scroll;border:none;border-radius:"+(height/8)+"px")
 let response=await fetch(name,{"mode":"no-cors"});
 if(response.status!=200&&!name.startsWith("http"))
 if(response.status==404)
 response=await fetch("get?name="+name).then(response=>response.json()).then(list=>note(list)&&list.length?fetch(list[0].name):"missing source")
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
?response.blob().then(media=>{let [type,format]=response.headers.get('Content-type').split("/");media=d3.create(type).attr('type',format).attr('src',URL.createObjectURL(audio)).attr("controls","true").attr("id",name).attr("autoplay","true").attr("onplay",highlighttrack).attr("width",type=="video"?"400px":"auto").attr("height",type=="video"?"200px":"auto").node();return type=="video"?scan({"div":{"#text":media.outerHTML,"style":"height:"+(400+2)+"px;width:"+(200+2)+"px;margin-left:-"+(400+1)+"px;margin-top:-1px;border-radius:"+(200/8)+"px;position:absolute;display:inline-block;pointer-events:none;box-shadow:0 0 20px rgba(0,0,0,1) inset,0 0 20px rgba(0,0,0,1) inset,0 0 20px rgba(0,0,0,1) inset,0 0 20px rgba(0,0,0,1) inset"}}):media})
:response.arrayBuffer().then(file=>
 response.headers.get('Content-Type')=="application/pdf"
?pdf.getDocument(file).promise.then(file=>[new pdfjsViewer.PDFViewer({container:scan({"div":{"class":"pdfjs","div":{"id":"viewer"}}}),linkService:new pdfjsViewer.PDFLinkService(),renderer:"svg",textLayerMode:0,disableRange:true,forceRendering:true}),file].reduce((viewer,file)=>{viewer.linkService.setViewer(viewer);viewer.setDocument(file);return viewer.container}))//new Array(file.numpages).reduce((canvas,phase,index)=>file.getPage(index+1).then(page=>{let view=page.getViewport({scale:1.5});canvas.width=canvas.width<view.width?view.width:canvas.width;canvas.height=(canvas.height||0)+view.height;page.render({canvasContext:canvas.getContext('2d'),viewport:view});return canvas;}),document.createElement('canvas')))
//?pdf.getDocument(file).promise.then(file=>new Array(file.numpages).reduce((canvas,phase,index)=>file.getPage(index+1).then(page=>{let view=page.getViewport({scale:1.5});canvas.width=canvas.width<view.width?view.width:canvas.width;canvas.height=(canvas.height||0)+view.height;page.render({canvasContext:canvas.getContext('2d'),viewport:view});return canvas;}),document.createElement('canvas')))
:new TextDecoder("utf-8").decode(new Uint8Array(file)));
}

export function note(...note)
{let stack=Error().stack.split(/\n */)[2];
 let name=stack.replace(/^.*at |[^ ]*$/g,"");
 let script=stack.substring(Math.max(...["/","_"].map(c=>stack.lastIndexOf(c)))+1,stack.lastIndexOf(".js"));
 let place=stack.match(/(file|http)[^\)]*/)[0];
 
 console.log(script.toUpperCase()+"."+name,...note);
 console.log("\x1b[30m"+place+"\x1b[0m");
 return note[0]
};

export function newconsole()
{//if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(this.navigator.userAgent))
 if(window.console)
 return window.console;
 console.trace("resetting console");
 window.console=
{"queue":[]
,"log":function()
{let stack=new Error().stack.split("\n");
 this.queue.push(stack[stack[2].includes("window.note")||stack[2].includes("dlogger")?3:2] //,2).map(stack=>
 .replace(/at ([^ ]+) \((.*)\)/g,(match,stack,place)=>
 place.replace(window.location.protocol+"//"+window.location.hostname,".")+" ("+stack+")"
)+":\n"+Array.from(arguments).join(",").replace(/%c/g,""));
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
