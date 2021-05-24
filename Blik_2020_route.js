consume(import.meta.url);

import file,{read,exclusion} from "./Blik_2020_persistence.js";
import {consume,note,fetch,window,resolve,rollup,npm,respond,encrypt} from "./Blik_2020_platform.js";
import clock from "./Blik_2020_time.js";
import {StringDecoder} from "string_decoder";
var decoder=new StringDecoder("utf-8");
import cluster from "cluster";
import http2 from "http2";
import dgram from "dgram";
import path from "path";
import net from "net";
import tls from "tls";

export async function open(source,parameters,protocol="http")
{if(!source)
 throw Error("no source module specified");
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
 note("\x1b[31m"+cluster.fork().id+"/"+cpus.length+" "+cpu.model+(!cpus[index+1]?"":"\nnext fork in 5 seconds...")+"\x1b[0m"),index*5000)));
 //import("repl").then(repl=>repl.start({"prompt":"\x1b[31mrepl interface active...\n","eval":input=>respond({method:"get",url:"/"+input},{end:body=>({...this.header,body}),setHeader:header=>this.header={header},writeHead:function(){}}).then(note)}));
};
 let tests=source.replace(".js","_tests.js");
 source=await import(source);
 if(cluster.isMaster&&tests)
 await import("./Blik_2020_integrity.js").then(({check})=>check(source,tests));
 let host=[protocol,"//localhost",keys.port].join(":");
 window(host);
 fetch(source.default);
 encrypt(keys.hmac);
 protocol=await import(protocol);
 protocol=protocol.createServer(...
[...protocol.globalAgent.protocol=="https:"?[await certify(Object.values(keys.certification)[0],keys.distinguishedname)]:[]
,(request,response)=>request.on("data",data=>
 request.body=request.body||""+decoder.write(data)).on("end",end=>(
 request.body+=decoder.end())&&
 respond.call(source.default,request,response))
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
