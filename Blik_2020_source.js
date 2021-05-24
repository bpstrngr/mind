import store from "./Blik_2020_store.js";
import {note,window,fetch,digest,compose} from "./Blik_2020_platform.js";
import {scan,hypertext,throttle,route,stylesheet,layout,fontface,merge} from './Blik_2020_document.js';
import awesome from "./blessochampion_2019_awesomesvgs.json";
import vectors from "./Blik_2020_vectors.json";
import host from "./Blik_2020_host.js";
import {respond as economy} from "./Blik_2021_economy.js";
import file,{details,shrink,read,format,google,mongo} from './Blik_2020_persistence.js';
import {activate,reform,perform} from "./Blik_2020_transform.js";
import {promises as dns} from "dns";
import path from 'path';
import util from 'util';
import os from "os";
import v8 from "v8";
//var debug=util.debuglog(import.meta.url.substring(import.meta.url.lastIndexOf("_")+1,import.meta.url.lastIndexOf(".")));

export default
 {...file
 ,host,rss
 ,google,mongo,economy,asana
 ,vector:input=>scan(route(vectors,input.url||["circle"]))
 ,signature:{...store("Blik_2020_signature.json","author")}
 ,mind:{...store("Blik_2020_mind.json","code",digest)}
 ,react:async function(input){return scan(hypertext("concept","vector/node",["./Blik_2020_react.js"],[await style()]))}
 ,reactx:async function(input){return scan(hypertext("concept","vector/node",["./Blik_2020_reactx.js"],[await style()]))}
 //https://docs.google.com/spreadsheets/d/1llB_Zt0ghEnKrIK6Ds5L8YldVWqTPvs6vQ-6iGrTFUg/edit?usp=sharing
 //<iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRPZI5R47a5YNwH57hCyJCQz0hxqdUIfKN5k4YLP8Vm25X-NutJkvfZTfD6goEksNpJ28m7-ZFsUQSJ/pubhtml?widget=true&amp;headers=false"></iframe>
 ,interface:async function(request,{resource,title,...fields}={})
{let form=await scan({form:{id:"subject",class:"subject"}});
 await activate({form},"./Blik_2020_actions.js");
 form.dispatchEvent(new window.Event("switch"));
 if(request.query.transform=="script")
 request.query.transform="media";
 if(!this.get&&!request.query.transform)
 request.query.transform="portfolio";
 if(!Object.keys(fields)[0])
 fields=
[{"epistemology.cf":{source:"SEI_2020_course_development"}
 }[request.headers.host]||{source:"get",transform:"network",spread:"force"}
,request.query
].reduce((preset,query)=>Object.assign(preset,query));
 //if(!resource)
 //resource=this[fields.source]
//?await [this[fields.source],0].reduce(route=>[route,route.get].find(route=>typeof route=="function"))(request)
//:this.get?await this.get(fields.source):this;
//note(fields,resource)
 let object=await perform.call(form,fields).catch(note);
 title=title||fields.source;
 let center=scan({center:{id:"object",title,object}});
 await throttle(object);
 let {averia,oswald,ranger}=fontface;
 let font=await stylesheet({"@font-face":[averia,oswald,ranger]});
 let body=await stylesheet(style,true);
 return scan(Object.assign(hypertext("concept","vector/node",["Blik_2020_actions.js"],[font,body],{center}),{"data-actions":"./Blik_2020_actions.js"}));
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

async function asana(input)
{let {asana:{personal_token}}=await read("./Blik_2020_parameters.json","object");
 let project=await file.get("https://app.asana.com/api/1.0/users/me",{headers:{Authorization:"Bearer "+personal_token}}).then(asana=>asana.text()).then(note);
 return project;
}

let button={height:"3em",width:"3em",cursor:"pointer",fill:"var(--isle)","vertical-align":"middle","background-color":"black","clip-path":"circle(50%)",padding:"1em",transform:"scale(0.8)"};
//let radio={"border-radius":"100%","background-color":"black",transform:"scale(0.8)","&[checked=true]":{display:"none","&[for=talk]~label[for=source]":{display:"none"},"&[for=module]~label[for=message]":{display:"none"}},"& svg":svgbutton};

let wheel=
 {overflow:"visible"
 ,"& circle":
 {width:"50px",height:"50px","z-index":1,overflow:"visible"
 ,"&:first-of-type":{r:15,animation:"6s infinite cubic-bezier(0, 0.5, 1, 0.5) fill,3s infinite cubic-bezier(0.75, 0, 0, 1) revolver"}
 ,"&+circle":{animation:"6s infinite cubic-bezier(0, 0.5, 1, 0.5) fill,1.5s infinite cubic-bezier(0.75, 0, 0, 1) scaler"}
 }
 };

let table=
 {"font-size":"inherit",transition:"all 1s"
 ,"& tr input[type=checkbox]":
 {appearance:"none","font-family":"inherit",cursor:"pointer",width:"auto","line-height":"1.3em","font-size":"1.5em",margin:0
 ,"&:not(:disabled):hover":{"text-shadow":"rgb(255,255,255) 0px 0px 10px,rgb(255,255,255) 0px 0px 10px,rgb(255,255,255) 0px 0px 10px"}
 ,"&:after":{content:"'✘'",color:"var(--isle)","margin-left":"3px","margin-right":"3px"}
 //,"&:last-of-type:after":{content:"'🔓'"}
 ,"&:focus:after":{"text-shadow":"rgb(255,255,255) 0px 0px 10px, rgb(255,255,255) 0px 0px 10px, rgb(255,255,255) 0px 0px 10px"}
 ,"&:checked:after":{content:"'✓'",color:"var(--highlight)","font-weight":800}
 }
 ,"&.homogenous>tbody>tr":{"flex-direction":"row",width:"90vw","justify-content":"center"}
 ,"&.heterogenous,&.homogenous":
 {position:"relative","font-family":"averia","font-size":"10px",display:"block"
 ,"&>tbody":
 {display:"block"
 ,"&>tr":
 {position:"relative",display:"flex","flex-wrap":"wrap",width:"90vw","justify-content":"center",margin:"auto"
 ,"&>td":{position:"relative","text-align":"center",display:"block","& div":{width:"150px",height:"150px","text-align":"center",margin:"auto",overflow:"hidden"}}
 ,"& svg":{height:"30px"}
 }
 }
 }
 };

let style=
 {"::-webkit-scrollbar":{display:"none"}
 ,"@keyframes fadeout":{"0%":{opacity:1,display:"block"},"50%":{opacity:1,display:"block"},"100%":{opacity:0,display:"none"}}
 ,"@keyframes fadein":{from:{opacity:0,display:"none"},to:{opacity:1,display:"block"}}
 ,"@keyframes dash":{"0%":{"stroke-dashoffset":187},"50%":{"stroke-dashoffset":1,transform:"rotate(135deg)"},"100%":{"stroke-dashoffset":187,transform:"rotate(450deg)"}}
 ,"@keyframes fill":{"0%":{fill:"rgb(66,133,244)"},"25%":{fill:"rgb(222,62,53)"},"50%":{fill:"rgb(247,194,35)"},"75%":{fill:"rgb(27,154,89)"},"100%":{fill:"rgb(66,133,244)"}}
 ,"@keyframes stroke":{"0%":{stroke:"rgb(66,133,244)"},"25%":{stroke:"rgb(222,62,53)"},"50%":{stroke:"rgb(247,194,35)"},"75%":{stroke:"rgb(27,154,89)"},"100%":{stroke:"rgb(66,133,244)"}}
 ,"@keyframes pulse":Array(5).fill(1).map((scale,index)=>index%2?1.2:1).reduce((pulse,scale,index)=>
 Object.assign(pulse,{[index*25+"%"]:{transform:"scale("+scale+")"}}),{})
 ,"@keyframes rotator":{"0%":{transform:"rotate(0deg)"},"100%":{transform:"rotate(270deg)"}}
 ,"@keyframes revolver":
 {"0%":{transform:"translate(0)",cx:33}
 ,"25%":{transform:"translate(60%)",cx:44}
 ,"50%":{transform:"translate(0)",cx:33}
 ,"75%":{transform:"translate(-60%)",cx:22}
 ,"100%":{transform:"translate(0)",cx:33}
 }
 ,"@keyframes scaler":
 {"0%":{r:23,"z-index":0}
 ,"50%":{r:15,"z-index":1}
 ,"100%":{r:23,"z-index":0}
 }
 //,"svg.wheel":{"& circle":{"stroke-dasharray":187,"stroke-dashoffset":0,"transform-origin":"center center",animation:"1.5s ease-in-out 0s infinite normal none running dash, 6s ease-in-out 0s infinite normal none running colors"}}
 ,"svg.wheel":wheel
 ,":root":[{abyss:"#111111",isle:"#303030",text:"#dbd1b4",note:"#7a7564",font:"averia",hand:"ranger",form:"6em",size:"14px",align:"inherit",highlight:"rgb(230,238,156)",transition:"1s"},0].reduce(properties=>
 Object.fromEntries(Object.entries(properties).map(([key,value])=>["--"+key,value])))
 ,body:{"text-align":"center",overflow:"hidden","font-family":"var(--font)","font-size":"var(--size)",color:"var(--text)","background-color":"var(--abyss)",margin:"0px" }
 ,span:{"&.wheel":{height:"1em"},"&[onclick]":{color:"rgb(255,171,0)"}}
 ,a:{"text-decoration":"none",position:"relative",color:"rgb(66,133,244)"}
 ,"blockquote":Object.fromEntries(["before","after"].map(side=>["&> p::"+side,{content:"\""}]))
 ,audio:
 {display:"inline",margin: "auto",height:"0.6em",outline:"none",background:"none"
 ,"&::-webkit-media-controls-panel":{"background-color":"rgb(35, 35, 35)"}
 ,"&::-webkit-media-controls-time-remaining-display":{"text-shadow":"none"}
 ,"&::-webkit-media-controls-current-time-display":{"text-shadow":"none"}
 }
 ,center:
 {"white-space":"pre-wrap","overflow-wrap":"break-word",overflow:"scroll",width:"100vw",height:"100vh","text-align":"var(--align)"
 ,"&>svg.d3":
 {overflow:"visible",position:"relative","max-width":"100vw","max-height":"100vh"
 ,"& g.node text":{"pointer-events":"none"}
 }
 ,"&#fragment span[onclick]":{color:"rgb(255, 171, 0)"}
 ,"& h2[onclick],.entry":{cursor:"pointer","&:hover":{transform:"scale(1.2)"}}
 ,"& .entry+span[id]":{position:"relative",overflow:"hidden",display:"none"}
 ,"& span[name]+span":{"white-space":"pre-wrap"}
 ,"&>span":
 {"vertical-align":"middle","font-size":"30px","line-height":"30px"
 ,"&:not([id]).entry":{position:"relative",display:"block",margin:"auto auto 30px",height:"auto",cursor:"pointer"}
 }
 }
 ,table
 ,"form#subject":
 {...layout.material,margin:"1em",position:"fixed",bottom:"0px",left:"0px",overflow:"scroll","max-width":"calc(100% - 20px)","box-sizing":"border-box","border-radius":"100vw","background-color":"var(--isle)","font-family":"averia","vertical-align":"middle","white-space":"nowrap",transition:"all var(--transition)","padding-right":"1.5em"
 ,"&:not(:hover)":
 {"padding-right":0
 ,[Object.entries({room:"message",get:"source"}).map(([method,primary])=>
 "&[method="+method+"]>label:not([for="+primary+"])").join()]:{width:0}
 }
 ,...Object.fromEntries(["get","sign","send","room"].map(method=>["&[method="+method+"] label:not(."+method+")",{display:"none"}]))
 ,"&[method=get],&[method=sign]":{"&>svg":{padding:0,width:"5em",height:"5em"}}
 ,"&[method=delete]":{"&>svg":{transform:"rotate(45deg)","transform-origin":"center center"}}
 ,"&>svg":{extend:button,position:"sticky",left:0}
 }
 ,"form.subject":
 {"font-size":"var(--size)"
 ,"& label":
 {...merge(layout.label,
 {"&:not(:last-of-type):after":{content:","}
 ,"&[for=message]>span":{position:"absolute",left:"-0.5em",top:"-1.5em",color:"black"}
 //,"&[type=radio]":radio
 ,"&>input":
 {"&[type=text]":{"&#code":{"-webkit-text-security":"disc"}}
 ,"&[type=radio]":{display:"none"}
 ,"&[type=checkbox]":
 {appearance:"none","font-family":"inherit",cursor:"pointer",width:"auto"
 ,"&:hover":{"text-shadow":"rgb(255,255,255) 0px 0px 10px,rgb(255,255,255) 0px 0px 10px,rgb(255,255,255) 0px 0px 10px"}
 ,"&:after":{content:"' ?'","margin-left":"3px","margin-right":"3px"}
 ,"&:focus:after":{"text-shadow":"rgb(255,255,255) 0px 0px 10px, rgb(255,255,255) 0px 0px 10px, rgb(255,255,255) 0px 0px 10px"}
 ,"&:checked:after":{content:"'✓'",color:"var(--highlight)"}
 }
 }
 })
 }
 }
 ,".card":
 {...layout.material,margin:"1em",position:"relative",display:"inline-block",transition:"all 0.5s","text-align":"center",cursor:"pointer","border-radius":"50%"
 ,"&:hover":{...layout.material["&:hover"],"&>span.post":{top:-15},"&>svg.trash":{display:"block"}}
 ,"&>svg.trash":{display:"none",position:"absolute",top:5,right:5,"&:hover":{fill:"#b71c1c"}}
 ,"&>p":{"font-size":"1.2em"}
 ,"&>span":{display:"block"}
 ,"&>span.post":{position:"absolute",top:5,left:5,color:"var(--isle)"}
 ,"&>p,&>span":{"&>svg":{display:"none"},"&:hover>svg":{display:"inline"}}
 ,"& select,& input":{"background-color":"transparent",color:"var(--text)"}
 ,"&.record":{padding:"10px","border-radius":"10px","background-color":"var(--isle)"}
 }
 ,...layout.codemirror
 ,...layout.pdfjs
 ,"#cf_alert_div>div":{background:"black !important"}
 ,"#dashboard tr":{"vertical-align":"top"}
 ,".gallery-row":{"white-space":"nowrap",width:"100% !important"}
 ,".gallery-group":{display:"inline-block"}
 ,".assistant":{"& input":{"font-size":"20px","font-family":"inherit",color:"rgb(144,164,174)","text-align":"center",border:"none",outline:"none","background-color":"transparent"},"& *":{display:"block",margin:"auto"}}
 ,".comment":
 {"font-size":"10px","font-family":"Averia Libre","white-space":"nowrap"
 ,"& img":{"height":"2em","width":"2em","vertical-align":"middle","border-radius":"50%"}
 ,"& svg":{"height":"2em","vertical-align":"middle"}
 ,"& span":{"&+svg":{display:"none"},"&:valid+svg":{display:"inline"}}
 ,"& >span":
 {position:"relative",display:"inline-block",margin:"auto auto auto 7px","font-size":"12px","font-family":"Averia",color:"black",padding:"7px 1em","border-radius":"1em 1em 1em 0px","background-color":"rgba(255, 248, 225,0.5)",outline:"none","white-space":"pre-wrap","max-width":"calc(100vw - 6em)"
 ,"&::before":{content:"",color:"rgba(255, 248, 225, 0.5)",position:"absolute",width:"1em",height:"1em",left:"12px",background:"radial-gradient(1em at 1px 1px, transparent, transparent 1em, currentcolor 1em)","margin-left":"-2em",bottom:"0px"}
 ,"& >div":{position:"absolute",display:"block",right:"10px",color:"rgb(97, 97, 97)","font-size":"7px"}
 }
 }
 };
