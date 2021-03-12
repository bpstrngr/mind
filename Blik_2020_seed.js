import * as seed from "./Blik_2020_seed.js";
import file,{details,read,output,exclusion} from "./Blik_2020_file.js";
import clock from "./Blik_2020_time.js";
import {StringDecoder} from "string_decoder";
var decoder=new StringDecoder("utf-8");
import querystring from "querystring";
import cluster from "cluster";
import http2 from "http2";
import dgram from "dgram";
import path from "path";
import net from "net";
import tls from "tls";
import url from "url";

var note=output(import.meta.url);
function compose(...operations){return operations.reduce((composition,operation)=>(...input)=>operation(composition(...input)));};

export async function open(route,parameters,protocol="http")
{if(!route)
 throw Error("no route module specified");
 //if(!parameters)throw Error("no parameter object specified");
 if(parameters)
 ({default:parameters}=await import(parameters));
 exclusion(
[arguments[1],...Object.values(parameters||{}).map(host=>
 Object.values(host.certification||{}).flat()).flat().filter(
 Boolean).map(certification=>path.resolve(certification))
]);
 let keys=await [parameters,protocol].reduce(async(module,key,index,trace)=>
 !(key=(module=await module).default?module.default[key]:module[key])
?note("no "+trace[index]+" property in "+[arguments[1],...trace.slice(1,index)].join("/")+".")&&process.exit(0)
:key);
 let missing=["port","hmac",...protocol=="https"?["distinguishedname"]:[]].filter(key=>!keys[key])
 let info=await import("./package.json").then(info=>info.default);
 if(missing.length)
 return note("missing "+missing+" in "+info.parameters);
 if(cluster.isMaster)
{await npm(Object.entries(info.dependencies).map(([module,version])=>module+"@"+version));
 await rollup(info.modules);
 //let mongo=Object.entries({dbpath:"mongo",logpath:"mongo.log"}).map(([key,value])=>
 //["--"+key,process.execPath+value]).flat();
 //await import("child_process").then(({spawn})=>spawn("mongod",[...mongo,"--fork"]));
 setInterval(done=>list("",".log",logs=>logs.forEach(log=>shrink(log,"replace"))),1000*60*60*24);
 note("\x1b[33marchiving logs daily...\x1b[0m");
 //https://github.com/nodejs/node/issues/35158
 if(!process.argv[1])process.argv[1]=import.meta.url;
 return import("os").then(os=>os.cpus().map((cpu,index,cpus)=>setTimeout(time=>
 note("\x1b[31m"+cluster.fork().id+"/"+cpus.length+" "+cpu.model+(index+1==cpus.length?"":"\nnext fork in 5 seconds...")+"\x1b[0m"),index*5000)));
 //import("repl").then(repl=>repl.start({"prompt":"\x1b[31mrepl interface active...\n","eval":input=>respond({method:"get",url:"/"+input},{end:body=>({...this.header,body}),setHeader:header=>this.header={header},writeHead:function(){}}).then(note)}));
};
 let tests=route.replace(".js","_tests.js");
 route=await import(route);
 if(cluster.isMaster&&tests)
 await import("./Blik_2020_integrity.js").then(({check})=>check(route,tests));
 respond=respond.bind(route.default);
 route.hmac(keys.hmac);
 route.fetch(respond);
 route.window([protocol,"//localhost",keys.port].join(":"));
 protocol=await import(protocol);
 protocol=protocol.createServer(...
[...protocol.globalAgent.protocol=="https:"?[await certify(Object.values(keys.certification)[0],keys.distinguishedname)]:[]
,(request,response)=>request.on("data",data=>
 request.body=request.body||""+decoder.write(data)).on("end",end=>(
 request.body+=decoder.end())&&
 respond(request,response))
]);
 await Promise.all(
 Object.entries(keys.certification||{}).slice(1).map(async([name,certification])=>
 protocol.addContext(name,await certify(certification))));
 protocol.listen(keys.port,function listen(port){note(this._connectionKey||port,"open")});
 import("./Blik_2020_room.js").then(room=>room.open(protocol,room.default));
}

export async function nodemon()
{await npm(["nodemon"]);
 let info=await import("./package.json").then(info=>info.default);
 let nodemon=await import(process.execPath.replace("bin/node","lib/node_modules/")+"nodemon/lib/index.js");
 let exec=`node --experimental-json-modules --inspect -e 'import("`+import.meta.url+`").then(({open})=>open("`+[...arguments].join('","')+`"));'`;
 nodemon=nodemon.default(note({ext:"js",ignore:Object.keys(info.modules),exec}));
 nodemon.on("start",start=>note("\x1b[31mNODEMON KEEPING OPEN\x1b[0m:","\n"+[...arguments]));
 nodemon.on("restart",files=>note("\x1b[31mNODEMON REOPENING WITH\x1b[32m:\n"+files.join("\n")+"\x1b[0m"));
 nodemon.on("exit",async function(signal)
{if(signal==nodemon.config.signal)return;
 await import("child_process").then(({spawn})=>spawn("mongod",["--shutdown"]));
 note(...arguments,"closed.");
 process.exit(0)
});
}

async function respond(request,response={})
{let source=(request.connection?request.connection.remoteAddress:"")+request.url;
 console.log("\x1b["+({get:36,put:33,delete:33}[request.method.toLowerCase()]||35)+"m"+clock()+"'"+source+"...\x1b[0m");
 // PREPARE REQUEST
 let format=request.headers&&(request.headers["content-type"]||request.headers["Content-Type"]);
 if(format)format=
 {"application/json":JSON
 ,"application/x-www-form-urlencoded":querystring
 }[format];
 if(format)try
{request.body=format.parse(request.body);
}catch(fail){note(fail,request.body)}
 request.method=(request.method||response[":method"]).toLowerCase();
 request.query=url.parse(request.url,true).query;
 request.path=request.url;
 request.url=decodeURIComponent(url.parse(request.url||response[":path"],true).pathname)
 request.url=request.url.split("/").filter((step,index)=>index||step).map(step=>step||"vanilla");
 //if(!this[request.url[0]]&&Object.keys(request.query).length)
 //Object.assign(request,{url:["vanilla"],query:{...request.query,name:request.url}});
 // MATCH PATH+METHOD WITH DATA ("/" tails offer html)
 //let type=request.url[request.url.length-1].endsWith(".pdf")?"pdf";
 let body=this[request.url[0]]
?await [Promise.resolve(this),...request.url,request.method].reduce(value=>
 value.then(route=>[route,request.url.shift()]).then(([route,key])=>
 route[key]||this[key]||route[key&&request.url.unshift(key)&&request.method]||route).then(route=>
 typeof route!="function"?route:value.then(value=>
 route.bind(value)(request)))).catch(body=>note(body)&&
 {status:500,type:"txt",body})
:await (file[request.method]||file.get)(request,"binary").catch(body=>(
 {status:404,body}))||Error("no such file or function");
 // MATCH RESIDUAL PATH WITHIN DATA
 //body=[body,...request.url].reduce((body,step)=>
 //body?body[step]||body:Error("no such file or function"));
 // PREPARE RESPONSE
 let data=body.status
?{status:200,type:"json",...body}
:body.outerHTML
?{status:200,body:body.outerHTML,type:body.nodeName.toLowerCase()}
:body instanceof Error
?{status:500,body:note(body),type:"txt"}
:{status:200,body,type:typeof body=="string"?"txt":body instanceof Buffer
?[await request.url.reduce(async(file,path)=>
 (await details(file)).isFile()?file:[file,path].join("/")),"txt"].reduce((file,txt)=>
 file?file.replace(/.*\./,""):txt)
:"json"
 };
 console.log("\x1b["+(data.status==200?"32m":"31m")+clock()+"'"+source+":"+data.status+" "+data.type+" "+(typeof data.body=="string"?data.body.substring(0,15)+"...":typeof (data.body||data))+"\x1b[0m");
 let mime=
 {text:["txt","html","css","js","cjs"]
 ,image:["jpg","gif","png","ico","svg"]
 ,audio:["mp3"]
 };
 let header=
 {"X-Frame-Options":"DENY"
 ,"Content-Type":
[Object.keys(mime).find(key=>mime[key].includes(data.type))||"application"
,{txt:"plain",js:"javascript",cjs:"javascript",mp3:"mpeg",ico:"x-icon",jpg:"jpeg",svg:"svg+xml"}[data.type]||data.type
].join("/")
 ,"Access-Control-Allow-Origin":"*"
 ,...data.status&&data.status.toString()[0]==3?{"Location":data.location,"Content-Type":"application/json"}:{}
 ,...data.body&&data.cookie&&{"Set-Cookie":Object.entries(data.cookie).reduce((cookie,[key,value])=>cookie+key+"="+value+";","")}
 ,...response.setHeader?{"status":data.status||200}:{}
 };
 // SEND RESPONSE
 if(!response.setHeader){request.respond(header);return request.end(data.body||data);}
 response.writeHead(header.status,header);
 return response.end(header["Content-Type"]=="application/json"
?JSON.stringify(data.body||data)
:data.body instanceof Error
?String(data.body)
:data.body);
};

async function certify(certification,distinguishedname)
{let [key,cert]=await Promise.all(certification.map(read)).catch((...fail)=>fail);
 if(([key,cert]).every(pair=>pair&&pair.length))
 return {key,cert};
 note("creating "+certification+"...");
 [key,cert]=await import(process.execPath.replace("bin/node","lib/node_modules"+"/node-forge/lib/pki.js")).then(async module=>
{let rsa=module.default.rsa.generateKeyPair(2048);
 let authority=Object.entries(distinguishedname).map(([key,value])=>(
 {[key.match(/^[A-Z]{2}$/)?"shortName":"name"]:key,value}));
 let certificate=module.default.createCertificate();
 Object.assign(certificate,{publicKey:rsa.publicKey,serialNumber:"01"});
 Object.assign(certificate.validity,{notBefore:new Date(),notAfter:new Date()});
 certificate.validity.notAfter.setFullYear(certificate.validity.notBefore.getFullYear()+1);
 certificate.setSubject(authority);
 certificate.setIssuer(authority);
 certificate.setExtensions(
[{name:"basicConstraints",cA:true},{name:"keyUsage",keyCertSign:true,digitalSignature:true,nonRepudiation:true,keyEncipherment:true,dataEncipherment:true}
,{name:"extKeyUsage",serverAuth:true,clientAuth:true,codeSigning:true,emailProtection:true,timeStamping:true}
,{name:"nsCertType",client:true,server:true,email:true,objsign:true,sslCA:true,emailCA:true,objCA:true}
,{name:"subjectAltName",altNames:[{type:6,value:"http://blikpatrik.net"},{type:7,ip:"127.0.0.1"}]}
,{name: 'subjectKeyIdentifier'}
]);
 certificate.sign(rsa.privateKey);
 key=await file.put({url:[certification[0]],body:module.default.privateKeyToPem(rsa.privateKey)});
 cert=await file.put({url:[certification[1]],body:module.default.certificateToPem(certificate)});
 note(key,cert)
 return [key,cert];
});
 [key,cert]=await Promise.all([key,cert]);
 if([key,cert].some(pair=>pair instanceof Error))
 note("invalid certification:",key,cert)&&process.exit(0);
 return {key,cert};
}

async function rollup(modules)
{let tools=["rollup",...["json","commonjs","multi-entry","node-resolve"].map(plugin=>"@rollup/plugin-"+plugin)];
 await npm(tools);
 tools=tools.map((tool,index)=>
[process.execPath.replace("bin/node","lib/node_modules")
,tool,"dist",["llup","olve"].includes(tool.substring(tool.length-4))?"es":""
,(tool=="rollup"?tool:"index")+".js"
].filter(Boolean).join("/"));
 let [rollup,...plugins]=await Promise.all(tools.map(tool=>import(tool)));
 plugins=plugins.map(plugin=>plugin.default({format:"module",browser:true}));
 await Promise.all(Object.entries(modules).map(async function([file,input])
{if(await details(file))return delete modules[file];
 await npm(Object.keys(note(input)));
 modules[file]=Object.entries(input).map(([module,input])=>
 input.map(input=>process.execPath.replace("bin/node","lib/node_modules/")+module+"/"+input)).flat();
}));
 await Promise.all(Object.entries(modules).map(async([file,input])=>
 modules[file]=await rollup.rollup({input,plugins}).then(roll=>
 roll.write({file,format:"module",sourceMap:"inline"}))));
 return modules;
}

async function npm(modules)
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
 let dependencies=await npm("list",modules);
 dependencies=Object.fromEntries(dependencies.split("\n").slice(2).filter(Boolean).map(module=>
 (module.match(/([\w@\.\/\-]+)[@$\)](.*)/)||[]).slice(1)));
 modules=modules.filter(module=>!dependencies[module.replace(/[^^]@.*/,match=>match[0])]);
 if(modules.length)
 //[,modules]=await new Promise(resolve=>npm.commands.install(modules,pass(resolve)));
 modules=await npm("install",modules);
 //let npmlog=await import(process.execPath.replace("bin/node","lib/node_modules/")+"npm/node_modules/npmlog/log.js");
 //npmlog.default.clearProgress();
}
