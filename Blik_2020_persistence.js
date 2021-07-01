import {promises as fs} from "fs";
import {note,resolve,fetch} from "./Blik_2020_platform.js";
import clock from "./Blik_2020_time.js";
import path from "path";
import zlib from "zlib";
import url from "url";
import os from "os";
import v8 from "v8";
import crypto from "crypto";
import npm from "./package.json";

var exclusions=
["*.cjs","*.kml","*.pem"
,"*.doc",".gdoc","*.gslides"
,".gitignore","*certificate*.json","token.json"
,".git","codemirror_2019","icon","data","data2","node_modules"
];

export function exclusion(file)
{for(file of Array.isArray(file)?file:[file])
 exclusions.push(path.resolve(file));
}

var exclude=(name,exclusions)=>
 exclusions instanceof Promise||
 exclusions.find(exclusion=>!exclusion.includes("*")
?name==exclusion
:name.match("^"+exclusion.replace(/\./g,"\\.").replace("*",".*")+"$"));

export default
{get:async function(request,mode)
{mode=request.query?.mode||mode;
 if(typeof request!="object")
 request={url:request};
 if(request.url.slice(0,4)=="http")
 return forward(request.url,request);
 request=(Array.isArray(request.path)?request.path:request.url.split("/")).filter(Boolean).filter(step=>step!=".");
 let files=await new Promise(seek=>
 seek(path.resolve("."))).then(async function seek(url)
{let next=request.shift()||"";
 let step=path.resolve(url,next);
 let match=await details(step).then(entry=>entry&&entry.isFile());
 if(match)
 return exclude(step,exclusions)?Error("restricted"):await read(step,mode);
 let entries=await fs.readdir(url,{withFileTypes:true});
 entries=entries.filter(({name})=>!exclude(name,exclusions)&&
 name.match(new RegExp(next)));
 entries=await Promise.all(entries.map(entry=>
 entry.isDirectory()
?seek(path.resolve(url,entry.name)).then(entries=>
 typeof entry=="string"?entries:[entry.name,entries||[]])
:[entry.name,"file"]));
 if(!entries.length)
 return undefined;
 let file=entries.find(entry=>typeof entry=="string")
 return file||Object.fromEntries(entries);
});
 let functions=!request.length?await module(this||{}):null;
 return !files?functions:Object.assign(files,functions);
}
,put:async function(request)
{let url=path.join(...request.path);
 let fresh=await fs.open(url,"wx").catch(fail=>fail);
 if(!(fresh instanceof Error))
 return await save(fresh,request.body,false,url);
 if(!request.query||!request.query.force)return fresh;
 let stale=await fs.open(url,request.query.force=="append"?"a":"r+");
 if(request.query.force!="append")
 await stale.truncate().catch(fail=>fail);
 if(stale instanceof Error)return stale;
 return await save(stale,request.body,request.query.force=="append",url);
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
 return fs.unlink(path.resolve(...request.path)).then(done=>request.path+" deleted");
}
}

export async function read(file,mode)
{return (file.startsWith("http")?request(file)
:fs.readFile(file)).then(file=>
{if(file instanceof Error)throw(file);
 if(mode=="binary")return file;
 file=Buffer.from(file,'base64').toString('utf8');
 if(mode=="object")try{return JSON.parse(file);}
 catch(error){return error}
 return file;
}).catch(fail=>fail)
}

function forward(file,request)
{if(request)request.method=request.method?.toUpperCase()||"GET";
 let protocol=file.substring(0,file.indexOf(":"));
 return new Promise(resolve=>
 import(protocol).then(protocol=>
{request=protocol.request({method:"GET",...request,...url.parse(file)},response=>
{let body="";
 response.on("data",piece=>body+=piece);
 response.on("end",end=>resolve(
 {status:response.statusCode
 ,body
 ,type:response.headers["content-type"]
 ,headers:{get:header=>response.headers[header.toLowerCase()]}
 ,json:()=>Promise.resolve(JSON.parse(body))
 ,text:()=>Promise.resolve(body||response.statusMessage)
 }));
});
 request.write(String(request.body||""));
 request.end();
}));
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

export function module(source)
{return JSON.parse(JSON.stringify(source));
 return Object.fromEntries(Object.entries(source.default||source).map(([key,value])=>
 [key,value&&typeof value=="object"?module(value):value?value.toString():value]))
};

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

async function save(descriptor,content,append,url)
{let change=append?fs.appendFile:fs.writeFile;
 let fail=await change(descriptor,typeof content=="object"?format(content):content,'utf-8').catch(fail=>fail);
 descriptor.close();
 return fail||url;
}

function compose(...operations){return operations.reduce((composition,operation)=>(...input)=>operation(composition(...input)));};

var debug=import("util").then(util=>util.debuglog(import.meta.url.substring(import.meta.url.lastIndexOf("_")+1,import.meta.url.lastIndexOf("."))));

export function format(json)
{return JSON.stringify(json).replace(/:{|},|}}|}]/g,match=>match[0]+"\n "+match.substring(1))
}

export async function mongo(request)
{let [Mongo,keys]=await Promise.all([resolve("mongodb/index.js"),import("./Blik_2020_parameters.json")]);
 Mongo=Mongo.default;
 keys=keys.default[request.headers["x-forwarded-proto"]].mongo;
 let [cluster,user]=Object.entries(keys)[0];
 cluster=[Object.entries(user)[0].join(":"),cluster].join("@");
 cluster="mongodb+srv://"+cluster+"/"+request.path.shift()+"?retryWrites=true&w=majority";
 cluster=new Mongo(cluster,{useNewUrlParser:true});
 note(cluster)
 return ;new Promise(resolve=>cluster.connect(function(fail)
{if(fail)return resolve(fail);
 cluster.db("test").collection("devices");
 cluster.close();
 resolve();
})).then(note);
}

export async function google(request)
{let keys="./Blik_2020_parameters.json";
 let [{google},parameters]=await Promise.all([resolve("googleapis/build/src/index.js"),read(keys,"object")]);
 if(request.path[0]=="image")
 return fetch("https://www.googleapis.com/customsearch/v1/siterestrict?q="+request.path[1]+"&searchType=image&cx="+parameters.google.search.wiki+"&key="+parameters.google.api);
 let {client,secret}=parameters.google;
 let redirect=request.headers["x-forwarded-proto"]+"://"+request.headers.host+"/google";
 let authority=new google.auth.OAuth2(client,secret,redirect);
 authority.on('tokens',token=>fetch(keys+"?force=overwrite"
,{method:"put",body:format(
 {...parameters,google:
 {...parameters.google,token:{...token,refresh_token:token.refresh_token||parameters.google.token.refresh_token}
 }
 })
 }).then(note));
 let scope=["https://www.googleapis.com/auth/spreadsheets",'https://www.googleapis.com/auth/calendar'];
 if(!parameters.google.token||!parameters.google.token.refresh_token)
 if(!request.query.code)
 return {status:302,location:authority.generateAuthUrl({scope,access_type:"offline",prompt:"consent"})};
 else return new Promise(resolve=>
 authority.getToken(request.query.code,(...result)=>
 resolve(result))).then(result=>result.find(Boolean)).then(token=>
 note(token instanceof Error?token:"Google token saved."));
 authority.setCredentials(parameters.google.token);
 let module=request.path.shift();
 let version=
 {version:{sheets:"v4",calendar:"v3"}[module]
 ,auth:authority
 };
 google=google[module](version);
 let id={sheets:"spreadsheet"}[module]||module;
 request.query[id+"Id"]=request.path.shift();
 let {method,body}=request;
 module=[{sheets:"spreadsheets",calendar:"events"}[module]];
 module.push({spreadsheets:"values",events:"list"}[module]);
 if(module[0]=="spreadsheets")
 module.push({put:"update"}[method]||method)
 if(method!="put")body=request.query;
 return new Promise(resolve=>
 [google,...module].reduce((google,module)=>(
 module=google[module])
?module.bind?module.bind(google):module
:google)(body
,(...result)=>resolve(result))).then(result=>result.find(Boolean));
}
