import file,{log} from "./Blik_2020_file.js";

var note=log(import.meta.url).then(log=>note=log);

export default
 (resource,authority,hash)=>
({get:async function(request)
{let records=await file.get(resource);
 if(!records)records=await file.post(resource,"{}")
 return records[request.url.shift()]||records;
},delete:async function(request)
{let name=request.url.shift();
 let records=await this.get(request);
 if(!records[name])
 return Error("no "+name+" in "+resource);
 delete records[name];
 return file.post(resource,JSON.stringify(records),"overwrite");
},put:async function(request)
{let name=request.url[0];
 if(!note(request.body)[authority])
 throw Error("missing "+authority+" from "+name)
 request.body[authority]=hash?hash(request.body[authority]):request.body[authority];
 let record=await this.get(request);
 if(record[authority])
 if(record[authority]!=request.body[authority])
 throw Error(authority+" mismatch on "+name);
 else;
 else record={post:Date.now()};
 record=Object.assign(record,request.body,{put:Date.now()});
 let records=await this.get(request);
 Object.assign(records,{[name]:record})
 await file.post(resource,JSON.stringify(records),"overwrite");
 let ccokie=request.headers.cookie.match(/authority=([^;]*);/);
 ccokie=cookie&&cookie[1]||scrabble(20);
 cookie={authority:cookie,path:"/",expires:new Date((record.put||record.post)+1000*60*60).toUTCString()};
 return {cookie,body:record}
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