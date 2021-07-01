import store from "./Blik_2020_store.js";
import {note,window,fetch,route,resolve,digest,compose,merge} from "./Blik_2020_platform.js";
import {document,hypertext,defer,field,throttle} from './Blik_2020_fragment.js';
import {stylesheet,layout,fontface} from "./Blik_2021_layout.js";
import awesome from "./blessochampion_2019_awesomesvgs.json";
import vectors from "./Blik_2020_vectors.json";
import host from "./Blik_2020_host.js";
import {respond as economy} from "./Blik_2021_economy.js";
import file,{details,shrink,read,format,google,mongo} from './Blik_2020_persistence.js';
import actions,{submit} from "./Blik_2020_actions.js";
import {promises as dns} from "dns";
import querystring from 'querystring';
import path from 'path';
import util from 'util';
import os from "os";
import v8 from "v8";
//var debug=util.debuglog(import.meta.url.substring(import.meta.url.lastIndexOf("_")+1,import.meta.url.lastIndexOf(".")));

export default
 {...file
 ,gdpring:request=>
{let center=defer({transform:"planets"});
 let document=hypertext("concept","vector/node",["Blik_2020_actions.js"],["gdpringstyle"],{center});
 return document(Object.assign(document,{"data-actions":"./Blik_2020_actions.js"})).next().value
},gdpringstyle:async function()
{let global=await stylesheet(
 {body:{"background-repeat":"repeat","background-image":"url(https://gdpring.com/assets/images/front.jpg)"}
 ,"svg":{display:"block",margin:"auto",overflow:"visible","max-width":400,perspective:"1000px","& path":{"&:not([id]):hover":{fill:"red"}}
 ,"& g[id]":
 {"&:hover":{opacity:0.5},transform:"rotateX(60deg) rotate(0deg)"
 ,animation:"rotate 10s linear infinite"
 ,"transform-origin":"center center"
 }      }
 },true);
 let unique=await stylesheet(layout.wheel,true)
 return [global,unique].join("\n");
},host,rss
 ,google,mongo,economy,asana
 ,vector:request=>document(route.call(vectors,request.path.length?request.path:["circle"])).next().value
 ,signature:{...store("Blik_2020_signature.json","author")}
 ,mind:{...store("Blik_2020_mind.json","code",digest)}
 ,react:async function(input){return document(hypertext("concept","vector/node",["./Blik_2020_react.js"],[await style()])).next().value}
 ,reactx:async function(input){return document(hypertext("concept","vector/node",["./Blik_2020_reactx.js"],[await style()])).next().value}
 //https://docs.google.com/spreadsheets/d/1llB_Zt0ghEnKrIK6Ds5L8YldVWqTPvs6vQ-6iGrTFUg/edit?usp=sharing
 //<iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRPZI5R47a5YNwH57hCyJCQz0hxqdUIfKN5k4YLP8Vm25X-NutJkvfZTfD6goEksNpJ28m7-ZFsUQSJ/pubhtml?widget=true&amp;headers=false"></iframe>
 ,interface:async function(request)
{Object.assign(window,{actions});
 let labels=JSON.stringify({message:"",source:"",transform:"as",title:"of",category:"on",spread:"by",matrix:"from",relations:"with"});
 let composer=await document({form:
 {id:"composer",method:"get","data-labels":labels
 ,svg:{id:"switch",title:"get",...vectors.node.svg}
 }
 },0,actions).next().value;
 if(!request.query)request.query={};
 if(request.query.transform=="script")request.query.transform="media";
 if(!this.get&&!request.query.transform)request.query.transform="portfolio";
 let fields=
 {...{"epistemology.cf":{source:"SEI_2020_course_development"}}[request.headers.host]||
 {source:"get",transform:"network",spread:"force"}
 ,...request.query
 };
 fields.resource=this[fields.source]?await route.call(this,[fields.source],request)
:this.get?await resolve(fields.source).then(module=>module.default||module)
:JSON.parse(JSON.stringify(this));
 let body=document(hypertext("concept","vector/node",["Blik_2020_actions.js"],["style"],{composer}),0,actions).next().value;
 return compose(submit.get.bind(composer),throttle)(fields).catch(note).then(fragment=>body);
},style:async function()
{let {averia,oswald,ranger}=fontface;
 let font=await stylesheet({"@font-face":[averia,oswald,ranger]});
 let document=await stylesheet(
 {...layout.theme
 ,...layout.goo
 ,"#frame":layout.frame
 ,"#composer":["form","pill","material"].map(key=>layout[key]).reduce(merge,{})
 ,".editor":layout.form
 ,".d3":layout.media
 ,...Object.fromEntries(["a","blockquote","body","table"].map(tag=>[tag,layout[tag]]))
 },true);
 return [font,document].join("\n");
}}

async function rss(input)
{let title="ranger";
 let link="https://blikpatrik.net/rss";
 let description="publishing";
 let feed=note(await this.get(".")).map(item=>
{let description=item;
 let pubDate=details(item).birthtime.toString();
 let content=fetch(item,false,text=>input.query.augment!==undefined?media(text):text);
 ({item:[{description},{pubdate},{content}]})
})
 let xml=await import("./dylang_2017_xml.js").then(module=>module.default);
 let body=xml(
 {rss:[{channel:[{title},{link},{description},...feed]}]}
,{declaration:true,indent:" "})
 return {status:200,type:"rss+xml",body}
};

async function asana(request)
{let {asana:{personal_token}}=await read("./Blik_2020_parameters.json","object");
 let address=note("https://app.asana.com/api/1.0/"+request.path.join("/")+"?"+querystring.encode(request.query));
 let project=await fetch(address,{headers:{Authorization:"Bearer "+personal_token}}).then(asana=>asana.text()).catch(note);
 return project;
}
