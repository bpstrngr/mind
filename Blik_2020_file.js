import {promises as fs} from "fs";
import clock from "./Blik_2020_time.js";
import path from "path";
import zlib from "zlib";
import url from "url";
import os from "os";
import v8 from "v8";
import crypto from "crypto";
import npm from "./package.json";

export function output(module,debug)
{let output=debug||console.log;
 module=module.substring(Math.max(module.lastIndexOf("_"),module.lastIndexOf("/"))+1,module.lastIndexOf(".")).toUpperCase();
 return function(...input)
{let stack=new Error().stack.split(/\n */)[2];
 let name=stack.replace(/^.*at |[^ ]*$/g,"");
 let place=stack.match(/file[^\)]*/,"");
 output("\x1b[31m"+clock(new Date())+"\x1b[37m"+module+"."+name);
 output(...input);
 place&&output("\x1b[30m"+place[0]+"\x1b[0m");
 return input[0]
};
};

var exclusions=import(npm.parameters).then(parameters=>
exclusions=
[npm.parameters,...Object.values(parameters.default).map(mode=>mode.certification).flat().filter(Boolean)
,"*.cjs","*.kml","*.pem"
,"*.doc",".gdoc","*.gslides","*.pdf"
,".gitignore","*certificate*.json","token.json"
,".git","codemirror_2019","icon","data","data2","node_modules"
])

var exclude=(name,exclusions)=>
 exclusions instanceof Promise||
 exclusions.find(exclusion=>!exclusion.includes("*")
?name==exclusion
:name.match("^"+exclusion.replace(/\./g,"\\.").replace("*",".*")+"$"));

export default
{get:async function(input,mode)
{mode=input.mode&&input.query.mode||mode;
 input=input.url?input.url:input;
 if(input.slice(0,4)=="http")
 return request(input);
 input=(Array.isArray(input)?input:input.split("/")).filter(Boolean).filter(step=>step!=".")
 let functions=!input.length?await module("./Blik_2020_root.js"):null;
 let files=await new Promise(seek=>seek(path.resolve("."))).then(async function seek(url)
{let next=input.shift()||"";
 let match=await details(path.resolve(url,next)).then(entry=>entry&&entry.isFile());
 if(!exclude(next,exclusions)&&match)
 return await read(path.resolve(url,next),mode)
 let entries=await fs.readdir(url,{withFileTypes:true});
 entries=entries.filter(({name})=>
!exclude(name,exclusions)&&
 name.match(new RegExp(next)));
 entries=await Promise.all(entries.map(file=>
 file.isDirectory()
?seek(path.resolve(url,file.name)).then(children=>(
 {[file.name]:children}))
:{[file.name]:"file"}));
 if(!entries.length)
 return undefined
 return entries.reduce((entries,entry)=>
 Object.assign(entries,entry));
});
 return !files?functions:Object.assign(files,functions);
}
,put:async function(request)
{let url=path.join(...request.url);
 let fresh=await fs.open(url,"wx").catch(fail=>fail);
 if(!(fresh instanceof Error))
 return await save(fresh,request.body,false);
 if(!request.query||!request.query.force)return fresh;
 let stale=await fs.open(url,request.query.force=="append"?"a":"r+");
 if(request.query.force!="append")
 await stale.truncate().catch(fail=>fail);
 if(stale instanceof Error)return stale;
 return await save(stale,request.body,request.query.force=="append");
}
,delete:async function(request)
{let address=Object.fromEntries(request.headers.origin.split(/:\/+|:/g).map((path,index)=>
 [["protocol","hostname","port"][index],path+(!index?":":"")]));
 let [match,authority]=request.headers.cookie.match(/authority=([^;]*);/)||[];
 let get=path=>new Promise(resolve=>import(address[0].substring(0,-1)).then(({request})=>
 request(note({...address,path,method:"get"}),response=>
 response.setEncoding("utf8").on("data",compose(JSON.parse,resolve))).end())).then(note)
 let {author}=authority&&await get("/authority/"+authority);
 let {rank}=author&&await get("/mind/"+author);
 if(rank!="ranger")
 return "unauthorised";
 return fs.unlink(path.resolve(...request.url)).then(done=>request.url+" deleted");
}
}

export async function read(file,mode)
{return (file.startsWith("http")?request(file)
:fs.readFile(file)).then(file=>
{if(file instanceof Error)
 throw(file);
 if(mode=="binary")
 return file;
 file=Buffer.from(file,'base64').toString('utf8');
 try{file=JSON.parse(file);}catch(error){}
 return file;//string response
})
}

function request(file)
{return new Promise(resolve=>
 import(file.substring(0,file.indexOf(":"))).then(module=>
 module.request({method:"GET",...url.parse(file)},response=>
{if(response.statusCode=="404")
 return resolve(response.statusMessage);
 response.on("data",data=>response=(typeof response=="string"?response:"")+data);
 response.on("end",done=>resolve(response));
}).end()))
}

export function shrink(log,replace)
{let stash=read(log,buffer=>buffer);
 try{let buffer=zlib.gzipSync(JSON.stringify(stash));}catch(fail){debug(fail);}
 let descriptor=persist(log.replace(".log","_"+Date.now()+".gz.b64"),buffer.toString('base64'),"force");
 if(replace)
 erase(log)
 return debug(descriptor)
}

export function decompress(file,binary,output)
{try{file=read(file,1,zip=>zip?zlib.unzip(Buffer.from(zip,'base64')):zip);}catch(fail)
{return debug(fail);
}return output(file)
}

export async function details(file){return await fs.stat(file).catch(fail=>undefined)}

export function module(file)
{return import(file).then(function scan(module)
{return Object.fromEntries(Object.entries(module.default||module).map(([key,value])=>
 [key,value&&typeof value=="object"?scan(value):value?value.toString():value]))
}).catch(fail=>({}))
}

export async function modules(module)
{module=module&&typeof module=="string"?module:process.argv[1];
 return [".ts",".js",".jsx",".tsx","index.js","index.ts"].includes(path.extname(module))
?await import(process.execPath.replace("bin/node","lib/node_modules")+"/@babel/parser/lib/index.js").then(({default:{parse}})=>
 file.get(module).then(data=>Promise.all(parse(data
,{sourceType:"module",errorRecovery:true,allowImportExportEverywhere:true,plugins:["importMeta","dynamicImport","objectRestSpread"]}).program.body.reduce(function seek(imports,node,index)
{return !node
?imports
:["ObjectExpression","BlockStatement","VariableDeclaration"].includes(node.type)
?(node.properties||node.body||node.declarations).reduce(seek,imports)
:["ExportDefaultDeclaration","FunctionExpression","VariableDeclarator","AwaitExpression","ExpressionStatement","AssignmentExpression","ObjectProperty"].includes(node.type)
?seek(imports,node.declaration||node.body||node.init||node.argument||node.expression||node.right||node.value)
:node.type=="ImportDeclaration"
?node.source.value!=module&&node.source.value.includes("/")
?imports.concat({module:node.source.value,specifiers:node.specifiers.map(specifier=>specifier.local.name),code:source.substring(node.start,node.end),type:node.type})
:imports
:node.type=="CallExpression"
?["require","Import"].includes(node.callee.type)
?["./"+module,module].includes(node.arguments[0].value)
?!console.log(module,node.arguments[0].value)&&imports
:imports.concat({module:node.arguments[0].value,code:source.substring(node.start,node.end),type:node.type})
:node.arguments.reduce(seek,imports)
:imports
},[]).map(module=>module.module.includes("/")
?root.modules(module.module).then(({imports})=>Object.assign(module,{imports}))
:module))).then(imports=>({module,imports})).catch(fail=>({module,fail})))
:{module}
}

async function save(descriptor,content,append)
{let change=append?fs.appendFile:fs.writeFile;
 let fail=await change(descriptor,content,'utf-8').catch(fail=>fail);
 descriptor.close();
 return fail||content;
}

function compose(...operations){return operations.reduce((composition,operation)=>(...input)=>operation(composition(...input)));};

var debug=import("util").then(util=>util.debuglog(import.meta.url.substring(import.meta.url.lastIndexOf("_")+1,import.meta.url.lastIndexOf("."))));

var note=output(import.meta.url);
