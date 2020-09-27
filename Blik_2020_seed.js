import * as seed from "./Blik_2020_seed.js";
import file,{details,read,log} from "./Blik_2020_file.js";
import {StringDecoder} from "string_decoder";
var decoder=new StringDecoder("utf-8");
import querystring from "querystring";
import cluster from "cluster";
import https from "https";
import http2 from "http2";
import dgram from "dgram";
import path from "path";
import http from "http";
import net from "net";
import tls from "tls";
import url from "url";

var note=log(import.meta.url).then(log=>note=log);
function compose(...operations){return operations.reduce((composition,operation)=>(...input)=>operation(composition(...input)));};
export var pirate=(protocol)=>http.createServer(protocol);
export var secure=(protocol,certificate)=>https.createServer(certificate,protocol);

export async function open(route,security="pirate",modules)
{if(!route)
 throw Error("no route module specified");
 let info=await import("./package.json").then(info=>info.default);
 
 //if(!modules)
 //return roll(info.modules).then(ready=>note(note(ready)))
 
 //let nodemon=await import(process.execPath.replace("bin/node","lib/node_modules/")+"nodemon/lib/index.js");
 //nodemon.default({script:"readme.js",ext:"js"}).on("restart",files=>console.log("changed:",files));

 let keys=await [info,"codes",security].reduce(async(module,key,index,trace)=>
 !(key=(module=await module).default?module.default[key]:module[key])
?note("no "+trace[index]+" property in "+["./package.json",...trace.slice(1,index)].join("/")+".")&&process.exit(0)
:(index==1?await import(key):key));

 ["port","hmac","distinguishedname"].filter(key=>
 !keys[key]).forEach((key,index,{length})=>
 note("missing "+key+" in "+info.codes)&&
 (++index==length)&&
 process.exit(0));

 let certification=await certify(keys.certification,keys.distinguishedname);
 route=await import(route);
 route.hash(keys);
 
 if(cluster.isMaster)
{setInterval(done=>list("",".log",logs=>logs.forEach(log=>shrink(log,"replace"))),1000*60*60*24);
 console.log("\x1b[33marchiving logs daily...\x1b[0m");
 if(!process.argv[1])//https://github.com/nodejs/node/issues/35158
 process.argv[1]=import.meta.url;
 if(security!="pirate")
 return import("os").then(os=>os.cpus().map(cpu=>cluster.fork())).then(forks=>console.log("\x1b[31m"+forks.length+" processors occupied.\x1b[0m"));
 //import("repl").then(repl=>repl.start({"prompt":"\x1b[31mrepl interface active...\n","eval":input=>respond({method:"get",url:"/"+input},{end:body=>({...this.header,body}),setHeader:header=>this.header={header},writeHead:function(){}}).then(note)}));
};
 let port=seed[security]((request,response)=>request.on("data",data=>
 request.body=request.body||""+decoder.write(data)).on("end",end=>
{request.body+=decoder.end();
 respond(request,response,route.default);
}),certification);
 port.listen(keys.port,function(port){note(this._connectionKey||port,"listening")});
 import("./Blik_2020_room.js").then(room=>room.open(port,room.default));
 if(security=="pirate")
 import("./Blik_2020_test.js").then(test=>test.check(route))
}

async function respond(request,response,route)
{let note=(request.connection?request.connection.remoteAddress:"http2")+request.url;
 console.log("\x1b[35m"+note+"...\x1b[0m");
 // PREPARE REQUEST
 try{request.body=JSON.parse(request.body);}catch(fail){request.body=querystring.parse(request.body);}
 request.method=(request.method||response[":method"]).toLowerCase();
 request.query=url.parse(request.url,true).query;
 request.url=decodeURIComponent(url.parse(request.url||response[":path"],true).pathname).split("/").slice(1).map(step=>step||"vanilla");
 // MATCH PATH+METHOD WITH DATA ("/" tails offer html)
 let data=route[request.url[0]]
?await [route,...request.url,undefined].reduce(route=>
{let step=request.url.shift();
 let stay=!route[step]&&step&&request.url.unshift(step);
 step=route[step]||route[request.method]||route;
 return typeof step=="function"?step.bind(route):step;
})(request)
:await file.get(request,"binary").catch(fail=>fail);
 // MATCH RESIDUAL PATH WITHIN DATA
 data=[data,...request.url].reduce((data,step)=>data?data[step]||data:Error("no such file or function"));
 // PREPARE RESPONSE
 data=data.body
?{status:200,type:"json",...data}
:data instanceof Error
?{status:404,body:data.toString(),type:"txt"}
:data.outerHTML
?{status:200,body:data.outerHTML,type:data.nodeName.toLowerCase()}
:{status:200,body:data,type:typeof data=="string"?"txt":data instanceof Buffer?request.url.pop().replace(/.*\./,""):"json"};
 console.log("\x1b[33m"+note+":"+((data.status||200)!=200?"\x1b[31m"+data.status:"\x1b[32m")+" "+data.type+" "+(typeof data.body=="string"?data.body.substring(0,40)+"...":typeof (data.body||data))+"\x1b[0m");
 // SEND RESPONSE
 let header=
{"X-Frame-Options":"DENY"
,"Content-Type":["html","css","js","cjs","txt"].includes(data.type)
?"text/"+(data.type=="txt"?"plain":["js","cjs"].includes(data.type)?"javascript":data.type)
:["jpg","gif","png","ico","svg"].includes(data.type)
?"image/"+(data.type=="ico"?"x-icon":data.type=="jpg"?"jpeg":data.type=="svg"?"svg+xml":data.type)
:["mp3"].includes(data.type)
?"audio/"+(data.type=="mp3"?"mpeg":data.type)
:"application/"+data.type
,"Access-Control-Allow-Origin":"*"
,...data.status&&data.status.toString()[0]==3?{"Location":data.location,"Content-Type":"application/json"}:{}
,...data.body&&data.cookie&&{"Set-Cookie":Object.entries(data.cookie).reduce((cookie,[key,value])=>cookie+key+"="+value+";","")}
,...response.setHeader?{"status":data.status||200}:{}
};
 if(!response.setHeader){request.respond(header);return request.end(data.body||data);}
 Object.entries(header).forEach(([key,value])=>response.setHeader(key,value));
 response.writeHead(header.status);
 return response.end(header["Content-Type"]=="application/json"?JSON.stringify(data.body||data):data.body);
};

async function certify(certification,distinguishedname)
{let [key,cert]=await Promise.all(certification.map(read)).catch((...fail)=>fail);
 if(([key,cert]).every(pair=>pair&&pair.length))
 return {key,cert};
 note("creating "+certification+"...");
 [key,cert]=await import(process.execPath.replace("bin/node","lib/node_modules"+"/node-forge/lib/pki.js")).then(module=>
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
,{name:"subjectAltName",altNames:[{type:6,value:"http://example.org/webid#me"},{type:7,ip:"127.0.0.1"}]}
,{name: 'subjectKeyIdentifier'}
]);
 certificate.sign(rsa.privateKey);
 key=file.post(certification[0],module.default.privateKeyToPem(rsa.privateKey));
 cert=file.post(certification[1],module.default.certificateToPem(certificate));
 return [key,cert];
});
 [key,cert]=await Promise.all([key,cert]);
 if([key,cert].some(pair=>pair instanceof Error))
 note("invalid certification")&&process.exit(0);
 return {key,cert};
}

async function roll(modules)
{let [npm,rollup,...plugins]=await Promise.all(
["npm/lib/npm.js"
,"rollup/dist/es/rollup.js"
,"@rollup/plugin-json/dist/index.js"
,"@rollup/plugin-commonjs/dist/index.js"
,"@rollup/plugin-multi-entry/dist/index.js"
,"@rollup/plugin-node-resolve/dist/es/index.js"
].map(module=>
 process.execPath.replace("bin/node","lib/node_modules/")+module).map(tool=>import(tool)));
 let files=await Promise.all(Object.keys(modules).map(name=>
 details(name).then(file=>file||name))).then(files=>
 files.filter(file=>typeof file=="string"));
 if(!files.length)
 return "\x1b[32mmodules are ready:\n"+Object.keys(modules);
 return new Promise(resolve=>
 npm.default.load({loaded:false,global:true,postinstall:{}},fail=>
 note("\x1b[31mgathering modules\x1b[0m:\n"+files+"...")&&
 npm.default.commands.install(files.map(file=>
 Object.keys(modules[file])).flat(),async function(fail)
{if(fail)
 return resolve(fail);
 plugins=plugins.map(plugin=>plugin.default())
 files=await Promise.all(
 files.map(file=>Object.entries(modules[file]).map(([module,input])=>
 input.map(input=>process.execPath.replace("bin/node","lib/node_modules/")+module+"/"+input)).map(input=>
 rollup.rollup({input,plugins}).then(rollup=>
 rollup.write({file,format:"module"})))).flat());
 files=files.filter(({output})=>
 delete output.code).map(({output})=>
 output.map(({fileName})=>fileName));
 return resolve("\x1b[32mgathered modules\x1b[0m:\n"+files)
})));
};
