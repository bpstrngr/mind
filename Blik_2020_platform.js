consume(import.meta.url);

export function consume(module)
{if(!globalThis.window&&(module.replace("file://","")==process.argv[1])&&process.argv.slice(2).length)
 [process.argv.splice(2),0].reduce(([command,...args])=>
 import(module).then(module=>module[note(command,module)](...args)));
 else note("import without arguments");
}

import clock from "./Blik_2020_time.js";

export function note(...notes)
{let stack=Error().stack.split(/\n */).slice(2);
 stack=stack.map(stack=>
{let [,name]=stack.match(/at ([^\(]*) /)||[];
 let [,file]=stack.match(/\(*((file|http).*$)/)||[,""];
 let label=Math.max(...["/","_"].map(delimiter=>file.lastIndexOf(delimiter)));
 label=file.substring(label+1,file.lastIndexOf(".js"));
 return [file,label.toUpperCase(),name];
});
 let source=(stack.find(([file])=>file)||[])[0];
 stack="\x1b[36m"+stack.map(([,...label])=>label.filter(Boolean).join(".")).flat().reverse().map((stack,index,{length})=>
 (length-1==index?"\x1b[36m\x1b[7m":"")+stack).join("\x1b[0m/\x1b[36m")+"\x1b[0m:";
 console.log("\x1b[36m\x1b[7m"+clock(new Date())+"\x1b[0m "+stack)
 console.log(...notes);
 console.log(!globalThis.window?"\x1b[30m"+source+"\x1b[0m":source);
 return notes[0]
};

 // tread, untread and skip ahead, or stay on object path. invoke if function.
export function route(path,...curry)
{return [Promise.resolve(this),...path].reduce(route=>
 route.then(source=>[route=source,path.shift()]).then(([source,tread])=>
 source[tread]||source[tread&&path.unshift(tread)&&path.slice(-1)[0]]||source).then(source=>
 source instanceof Function
?source.call(route,curry.shift())
:source));
};

export var expect=async value=>
typeof value!="undefined"?value:new Promise(resolve=>
setTimeout(tick=>resolve(value),500)).then(expect);

export var require=async path=>(require.instance||
await import("module").then(({createRequire})=>
require.instance=createRequire(import.meta.url)))
(absolve(path));

export var absolve=path=>globalThis.window?path:
process.execPath.replace("bin/node","lib/node_modules/")+path;

export var collect=(values,...names)=>
 names.reduce(async function collect(values,parameter,index)
{return (values=await values)[index]
?note({[parameter]:values[index]})&&values
:new Promise(proceed=>import("readline").then(({createInterface})=>
 createInterface({input:process.stdin,output:process.stdout}).question(parameter+":",argument=>proceed(argument))))
},values);

export function universalconsole()
{if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(this.navigator.userAgent))
 return window.console;
 //alert("triple tap for debug console");
 window.console=
{"queue":[]
,"log":function()
{return Array.from(arguments).forEach(item=>this.queue.push(item))
 let stack=new Error().stack.split("\n");
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

export async function npm(modules)
{//let npm=await import(process.execPath.replace("bin/node","lib/node_modules/")+"npm/lib/npm.js");
 //if(!modules)return npm;
 //await npm.default.config.load();
 //await npm.default.load(note);
 //let {dependencies}=npm.default.commands.list(modules,pass(resolve));
 //dependencies=Object.entries(dependencies||{}).reduce(function flat(list,[key,{version,dependencies}])
//{return {[key]:version,...list,...!dependencies||Object.entries(dependencies).reduce(flat,list)};
//},{});
 let {spawn}=await import("child_process");
 let npm=(command,modules)=>new Promise(resolve=>
[spawn("npm",[command,"-g",...modules]).on("exit",exit=>
 setTimeout(time=>resolve("\x1b["+(exit?"31m":"32m")+command),300))
,"stdout","stderr"
].reduce((spawn,pipe)=>
 spawn[pipe].on("data",data=>
 command+="\n"+data.toString("utf8"))&&spawn)).then(note);
 let dependencies=await npm(...note(["list",modules]));
 dependencies=Object.fromEntries(dependencies.split("\n").slice(2).filter(Boolean).map(module=>
 (module.match(/([\w@\.\/\-]+)[@$\)](.*)/)||[]).slice(1)));
 modules=modules.filter(module=>!dependencies[module.replace(/[^^]@.*/,match=>match[0])]);
 if(modules.length)
 //[,modules]=await new Promise(resolve=>npm.commands.install(modules,pass(resolve)));
 modules=await npm("install",modules);
 //let npmlog=await import(process.execPath.replace("bin/node","lib/node_modules/")+"npm/node_modules/npmlog/log.js");
 //npmlog.default.clearProgress();
}

export async function rollup(modules)
{modules=await resolve(modules);
 let tools=["rollup",...["json","commonjs","multi-entry","node-resolve"].map(plugin=>"@rollup/plugin-"+plugin)];
 await npm(tools);
 tools=tools.map((tool,index)=>
[tool,"dist",["llup","olve"].includes(tool.substring(tool.length-4))?"es":""
,(tool=="rollup"?tool:"index")+".js"
].filter(Boolean).join("/"));
 let [rollup,...plugins]=await Promise.all(tools.map(resolve));
 plugins=plugins.map(plugin=>plugin.default({format:"module"}));
 await Promise.all(Object.entries(modules).map(async function([file,input])
{let present=await import("./Blik_2020_persistence.js").then(({details})=>details(file));
 if(present)return delete modules[file];
 await npm(Object.keys(note(input)));
 modules[file]=Object.entries(input).map(([module,input])=>
 input.map(input=>process.execPath.replace("bin/node","lib/node_modules/")+module+"/"+input)).flat();
}));
 await Promise.all(Object.entries(modules).map(async([file,input])=>
 modules[file]=await rollup.rollup({input,plugins}).then(roll=>
 roll.write({file,format:"module",inlineDynamicImports:true}))));
 return modules;
}

export async function respond(request,response={})
{let url=await import("url");
 let source=(request.connection?request.connection.remoteAddress:"")+request.url;
 console.log("\x1b["+({get:36,put:33,delete:33}[request.method.toLowerCase()]||35)+"m"+clock()+"'"+source+"...\x1b[0m");
 // PREPARE REQUEST
 let format=request.headers&&(request.headers["content-type"]||request.headers["Content-Type"]);
 if(format)format=
 {"application/json":JSON
 ,"application/x-www-form-urlencoded":await import("querystring")
 }[format];
 request.body=format&&await new Promise(resolve=>resolve(format.parse(request.body))).catch(note)||request.body;
 request.method=(request.method||response[":method"]).toLowerCase();
 request.query=url.parse(request.url,true).query;
 request.path=decodeURIComponent(url.parse(request.url||response[":path"],true).pathname);
 request.path=request.path.split("/").filter((step,index)=>index||step).map(step=>step||"interface");
 // MATCH PATH+METHOD WITH DATA (empty "/" tails offer interfaces)
 let body=this&&this[request.path[0]]
?route.call(route.call(this,request.path,request),[request.method])
:import("./Blik_2020_persistence.js").then(({default:file})=>
 file[request.method](request,"binary"));
 body=await body.catch(note)||{status:404,body:Error("no such file or function").toString(),type:"txt"};
 // PREPARE RESPONSE
 let type=body instanceof Error?"txt"
:body instanceof Buffer?(request.url.match(/\.[^\.]*$/,"")||[".txt"])[0].slice(1)
:typeof body=="object"?body.outerHTML?body.nodeName.toLowerCase():"json":"txt";
 let data=
 {status:body instanceof Error?500:200
 ,body:body instanceof Error?body.toString():body.outerHTML||body
 ,type
 ,...body.status&&body
 }
 console.log("\x1b["+(data.status==200?"32m":"31m")+clock()+"'"+source+":"+data.status+" "+data.type+" "+(typeof data.body=="string"?data.body.substring(0,15)+"...":typeof (data.body||data))+"\x1b[0m");
 let header=
 {"X-Frame-Options":"DENY"
 ,"Content-Type":data.status==200&&data.type.includes("/")?data.type:
[Object.keys(mime).find(key=>mime[key].includes(data.type))||"application"
,{txt:"plain",js:"javascript",cjs:"javascript",mp3:"mpeg",ico:"x-icon",jpg:"jpeg",svg:"svg+xml"}[data.type]||data.type
].join("/")
 ,"Access-Control-Allow-Origin":"*"
 ,...data.status&&data.status.toString()[0]==3?{"Location":data.location,"Content-Type":"application/json"}:{}
 ,...data.body&&data.cookie&&{"Set-Cookie":Object.entries(data.cookie).reduce((cookie,[key,value])=>cookie+key+"="+value+";","")}
 ,...response.setHeader?{"status":data.status||200}:{}
 };
 // SEND RESPONSE
 if(!response.setHeader){request.respond(header);return request.end(data);}
 response.writeHead(header.status,header);
 return response.end(header["Content-Type"]=="application/json"
?JSON.stringify(data.body||data)
:data.body instanceof Error
?String(data.body)
:(data.body||data));
};

export var {window,fetch}=globalThis.window?globalThis
:{window:url=>resolve("jsdom/lib/api.js").then(module=>({window}=new module.default.JSDOM("",{url})))
 ,fetch:source=>
{if(typeof source=="string")
 throw Error("no local server source provided for fetch response.");
 fetch=(url,request)=>respond.call(source
,{url,method:"get",...request,response:{}
 ,respond:function(header){Object.assign(this.response,{header});}
 ,end:function(response){return Object.assign(this.response,response);}
 }).then(response=>(
 {...response
 ,headers:{get:key=>response.header[key]}
 ,arrayBuffer:async ()=>response.body.constructor?.name=="Buffer"?response.body:new Uint8Array(response.body)
 ,text:async json=>typeof response.body=="object"
?response.body.constructor.name=="Buffer"?response.body
:json?response.body:JSON.stringify(response.body)
:json?JSON.parse(response.body):response.body
 ,json(){return this.text(true)}
 }))
}};
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

export async function resolve(source,request)
{if(!source)return;
 if(typeof source=="object")
 return source;
 if(source.startsWith("{"))
 return JSON.parse(source);
 //if(format==="drive"){/*src=await fetch(*/medium.src="https://drive.google.com/uc?export=download&id="+url/*"https://www.googleapis.com/drive/v3/files/"+url+"?alt=media&key="+keys.googleapi)*/;/*console.log("fetched media source:",src);medium.src=src;/*URL.createObjectURL(new Blob([src],{type:"video/mp4"}))*/}else{medium.setAttribute("src",url)};medium.setAttribute("type",type+"/"+(format==="drive"?"mp4":format));medium.setAttribute("autoplay","true");medium.setAttribute("style","overflow-y:scroll;border:none;border-radius:"+(height/8)+"px")
 let [,group]=source.match(/\.((js)|(json))$/)||[];
 let {js,json}={[group]:true};
 if(!globalThis.window&&(js||json))
 return import("./"+source).catch(fail=>import(absolve(source))).catch(note);
 if(js)
 return await import("./"+source).then(module=>module.default);
 let response=await fetch(source,{method:"get",mode:"no-cors",...request});
 if(response.status==404&&!source.startsWith("http"))
 response=await fetch("get?source="+source);
 //.then(response=>response.json()).then(list=>note(list)&&list.length?fetch(list[0].name):"missing source");
 let format=response.headers.get('Content-Type');
 return response=="missing source"
?response
:response.status==200&&(format=="application/json")
?response.json().then(json=>({default:json.type=="Buffer"?JSON.parse(new TextDecoder("utf-8").decode(new Uint8Array(json.data))):typeof json=="string"?JSON.parse(json):json}))
:response.type=="opaque"||format.startsWith("text")
?response.text().then(text=>text.constructor.name=="Buffer"?new TextDecoder("utf-8").decode(new Uint8Array(text.data||text)):text).then(text=>
 /xml$/.test(format)?import("./Blik_2020_document.js").then(({demarkup})=>demarkup(new window.DOMParser().parseFromString(text,format))):text)
//format.endsWith("text/html")?(new window.DOMParser()).parseFromString(text,"text/html"):text)
:format.startsWith("image")
?format=="image/svg+xml"
?response.arrayBuffer().then(image=>new window.DOMParser().parseFromString(new TextDecoder("utf-8").decode(new Uint8Array(image)),format))
:response.blob().then(image=>d3.create('img').attr('src',URL.createObjectURL(image)).node())
:format.startsWith("audio")||format.startsWith("video")
?response.blob().then(media=>{let [type,format]=format.split("/");media=d3.create(type).attr('type',format).attr('src',URL.createObjectURL(audio)).attr("controls","true").attr("id",source).attr("autoplay","true").attr("onplay",highlighttrack).attr("width",type=="video"?"400px":"auto").attr("height",type=="video"?"200px":"auto").node();return type=="video"?scan({"div":{"#text":media.outerHTML,"style":"height:"+(400+2)+"px;width:"+(200+2)+"px;margin-left:-"+(400+1)+"px;margin-top:-1px;border-radius:"+(200/8)+"px;position:absolute;display:inline-block;pointer-events:none;box-shadow:0 0 20px rgba(0,0,0,1) inset,0 0 20px rgba(0,0,0,1) inset,0 0 20px rgba(0,0,0,1) inset,0 0 20px rgba(0,0,0,1) inset"}}):media})
:response.arrayBuffer().then(file=>
 format=="application/pdf"
?import("./mozilla_2010_pdf_brightspace.js").then(pdf=>
{pdf.default.GlobalWorkerOptions.workerSrc="mozilla_2010_pdf_worker_brightspace.js";
 pdf.getDocument(file).promise.then(pdf=>Object.assign(note(pdf),{pdf:true}))
})
//?pdf.getDocument(file).promise.then(file=>new Array(file.numpages).reduce((canvas,phase,index)=>file.getPage(index+1).then(page=>{let view=page.getViewport({scale:1.5});canvas.width=canvas.width<view.width?view.width:canvas.width;canvas.height=(canvas.height||0)+view.height;page.render({canvasContext:canvas.getContext('2d'),viewport:view});return canvas;}),document.createElement('canvas')))
:new TextDecoder("utf-8").decode(new Uint8Array(file)));
}

export var dig=(path,json)=>[json,...path.split("/")].reduce((json,key)=>json[key]||json);

export function path(name){return (window.location.pathname+(name||"")).replace(/^\/*|\/*$/g,"");}

export function retreat(){return window.location=window.location.pathname.split("/").filter(Boolean).slice(0,-1).join("/")+"/";}

export function compose(...operations)
{return operations.reduce((composition,operation)=>(...input)=>
 (composition=composition(...input)) instanceof Promise
?composition.then(operation)
:operation(composition));
};

export var digest=hash=>value=>
import("crypto").then(({createHash,createHmac})=>
(Array.isArray(hash)?createHmac(...hash):createHash(hash)).update(value,"utf-8").digest("hex"));

export var encrypt=value=>digest=digest("sha256",value);

let mime=
 {text:["txt","html","css","js","cjs"]
 ,image:["jpg","gif","png","ico","svg"]
 ,audio:["mp3"]
 };