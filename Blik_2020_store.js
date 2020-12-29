import file,{output} from "./Blik_2020_file.js";

var note=output(import.meta.url);

export default
 (resource,key,hash)=>
({get:async function(request)
{let records=await file.get(resource,"object");
 if(!records)records=await file.put({url:[resource],body:"{}"})
 return records[request.url.shift()]||records;
},delete:async function(request)
{let name=request.url.shift();
 let records=await this.get(request);
 if(!records[name])
 return Error("no "+name+" in "+resource);
 delete records[name];
 return file.put({url:[resource],body:JSON.stringify(records),query:{force:"overwrite"}});
},put:async function(request)
{let name=request.url[0];
 if(!request.body[key])
 return Error("missing "+key+" for "+name);
 request.body[key]=hash?hash(request.body[key]):request.body[key];
 let record=await this.get(request);
 if(record[key])
 if(record[key]!=request.body[key])
 return Error(key+" mismatch on "+name);
 else record=Object.assign(record,{put:Date.now()});
 else record={post:Date.now()};
 record=Object.assign(record,request.body);
 let records=await this.get(request);
 Object.assign(records,{[name]:record});
 await file.put({url:[resource],body:JSON.stringify(records),query:{force:"overwrite"}});
 let cookie=request.headers.cookie.match(/signature=([^;]*);/);
 cookie=cookie&&cookie[1]||scrabble(20);
 cookie={signature:cookie,path:"/",expires:new Date((record.put||record.post)+1000*60*60).toUTCString()};
 return {cookie,body:[name,record.put?"updated.":"created."].join(" ")};
}})

export function scrabble(length)
{let scope="abcdefghijklmnopqrstuvwxyz123456789",result="";
 if(typeof length!="number")
 return false;
 while(result.length<length){result+=scope.charAt(Math.floor(Math.random()*scope.length));};
 return result;
}

export function validate(entry,template)
{let mistakes=Object.entries(template).reduce((mistakes,[key,validate])=>
 validate(entry[key])?mistakes:mistakes.concat(key),[]);
 if(mistakes.length)
 throw Error("invalid "+mistakes);
}