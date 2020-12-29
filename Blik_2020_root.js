import store from "./Blik_2020_store.js";
import {acquire,scan,window,fetch,vectors,awesome,hypertext,throttle,compose} from './Blik_2020_document.js';
export {window,fetch};
import file,{details,shrink,output,read,format} from './Blik_2020_file.js';
import {open,reform,perform} from "./Blik_2020_form.js";
import {promises as dns} from "dns";
import path from 'path';
import util from 'util';
import os from "os";
import v8 from "v8";
//var debug=util.debuglog(import.meta.url.substring(import.meta.url.lastIndexOf("_")+1,import.meta.url.lastIndexOf(".")));
var note=output(import.meta.url);
export var hmac=value=>hmac=value;
export var hash=function(value)
{if([hmac,value].every(value=>typeof value=="string"&&value.length))
 return crypto.createHmac("sha256",hmac).update(value).digest("hex");
}

export default
 {...file,vanilla,host,style,vector,rss,google,mongo
 ,signature:{...store("Blik_2020_signature.json","author")}
 ,mind:{...store("Blik_2020_mind.json","code",hash)}
 ,react:async function(input){return scan(hypertext("concept","vector/node",["./Blik_2020_react.js"],[await style()]))}
 ,reactx:async function(input){return scan(hypertext("concept","vector/node",["./Blik_2020_reactx.js"],[await style()]))}
 //https://docs.google.com/spreadsheets/d/1llB_Zt0ghEnKrIK6Ds5L8YldVWqTPvs6vQ-6iGrTFUg/edit?usp=sharing
 //<iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRPZI5R47a5YNwH57hCyJCQz0hxqdUIfKN5k4YLP8Vm25X-NutJkvfZTfD6goEksNpJ28m7-ZFsUQSJ/pubhtml?widget=true&amp;headers=false"></iframe>
 }

async function vanilla(request,{resource,title,...fields}={})
{let form=await compose(scan,open)({form:{id:"subject",class:"subject"}});
 form.dispatchEvent(new window.Event("switch"));
 if(request.query.transform=="script")
 request.query.transform="media";
 if(request.query.source)(request.query.name=request.query.source)&&delete request.query.source;
 if(!this.get&&!request.query.transform)
 request.query.transform="portfolio";
 if(!Object.keys(fields)[0])
 fields=
[{"epistemology.cf":{name:"SEI_2020_course_development"}
 }[request.headers.host]||{name:"get",transform:"network",spread:"force"}
,request.query
].reduce((preset,query)=>Object.assign(preset,query));
 if(!resource)
 resource=this[fields.name]
?await [this[fields.name],0].reduce(route=>[route,route.get].find(route=>typeof route=="function"))(request)
:this.get?await this.get(fields.name):this;
 let fragment=await perform({resource,...fields},form);
 title=title||fields.name;
 let center=scan({center:{id:"object",title,fragment}});
 await throttle(fragment);
 return scan(hypertext("concept","vector/node",["Blik_2020_peer.js"],[await style()],{center,form}));
}

async function mongo(request)
{let [Mongo,keys]=await Promise.all([acquire("mongodb/index.js"),import("./Blik_2020_parameters.json")]);
 Mongo=Mongo.default;
 keys=keys.default[request.headers["x-forwarded-proto"]].mongo;
 let [cluster,user]=Object.entries(keys)[0];
 cluster=[Object.entries(user)[0].join(":"),cluster].join("@");
 cluster="mongodb+srv://"+cluster+"/"+request.url.shift()+"?retryWrites=true&w=majority";
 cluster=new Mongo(cluster,{useNewUrlParser:true});
 note(cluster)
 return ;new Promise(resolve=>cluster.connect(function(fail)
{if(fail)return resolve(fail);
 cluster.db("test").collection("devices");
 cluster.close();
 resolve();
})).then(note);
}

async function google(request)
{let keys="./Blik_2020_parameters.json";
 let [{google},parameters]=await Promise.all([acquire("googleapis/build/src/index.js"),read(keys,"object")]);
 if(request.url[0]=="image")
 return fetch("https://www.googleapis.com/customsearch/v1/siterestrict?q="+request.url[1]+"&searchType=image&cx="+parameters.google.search.wiki+"&key="+parameters.google.api);
 let {client,secret}=parameters.google;
 let redirect=request.headers["x-forwarded-proto"]+"://"+request.headers.host+"/google";
 let authority=new google.auth.OAuth2(client,secret,redirect);
 authority.on('tokens',token=>fetch(keys+"?force=overwrite"
,{method:"put",body:format(
 {...parameters,google:
 {...parameters.google,token:{...token,refresh_token:token.refresh_token||parameters.google.token.refresh_token}
 }
 })
 }));
 let scope=["https://www.googleapis.com/auth/spreadsheets",'https://www.googleapis.com/auth/calendar'];
 let resolve=result=>result.find(Boolean);
 if(!parameters.google.token||!parameters.google.token.refresh_token)
 if(!request.query.code)
 return {status:302,location:authority.generateAuthUrl({scope,access_type:"offline",prompt:"consent"})};
 else return new Promise(resolve=>
 authority.getToken(request.query.code,(...result)=>
 resolve(result))).then(resolve).then(token=>
 note(token instanceof Error?token:"Google token saved."));
 authority.setCredentials(parameters.google.token);
 let module=request.url.shift();
 let version=
 {version:{sheets:"v4",calendar:"v3"}[module]
 ,auth:authority
 };
 google=google[module](version);
 let id={sheets:"spreadsheet"}[module]||module;
 request.query[id+"Id"]=request.url.shift();
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
,(...result)=>resolve(result))).then(resolve);
}

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

function vector(input)
{return scan([vectors,...input.url||["circle"]].reduce((vector,url)=>
 vectors[url]||vectors));
}

function host()
{return {uptime:Math.floor(os.uptime()/60/60)+"h "+Math.round(os.uptime/60%60)+"m "+(os.uptime()%60)+"s"
 ,averageload:os.loadavg().join(" ")
 ,cores:os.cpus().map(cpu=>cpu.model).join(", ")
 ,used:v8.getHeapStatistics().malloced_memory
 ,peak:v8.getHeapStatistics().peak_malloced_memory
 ,load:Math.round((v8.getHeapStatistics().used_heap_size/v8.getHeapStatistics().total_heap_size)*100)+"%"
 ,fill:Math.round((v8.getHeapStatistics().total_heap_size/v8.getHeapStatistics().heap_size_limit)*100)+"%"
 ,left:os.freemem()
        }
}

function style(input)
{return Promise.all(["jss/dist/jss.js",...["global","nested","extend"].map(plugin=>"jss-plugin-"+plugin+"/dist/jss-plugin-"+plugin+".js")].map(module=>
 import(process.execPath.replace("bin/node","lib/node_modules/")+module))).then(modules=>
 modules.map(module=>module.default).reduce((module,plugin)=>
 Object.assign(module,plugin.default?{[plugin.default.name]:plugin.default}:plugin))).then(jss=>
{let primaryinput={"text-align":"left",width:"auto","&>li":{"text-shadow":"black 0px 0px 10px","white-space":"nowrap","&>span":{"white-space":"normal"}}};//"background-image":"linear-gradient(to right, rgb(17, 17, 17) 0%, rgba(33, 33, 33, 0) 100%)"
 let material={"box-shadow":"black 0px 0px 10px","&:hover":{"box-shadow":"black 0px 0px 50px"},margin:"1em"};
 let button={height:"3em",width:"3em",cursor:"pointer",fill:"var(--isle)","vertical-align":"middle","background-color":"black","clip-path":"circle(50%)",padding:"1em",transform:"scale(0.8)"};
 //let radio={"border-radius":"100%","background-color":"black",transform:"scale(0.8)","&[checked=true]":{display:"none","&[for=talk]~label[for=source]":{display:"none"},"&[for=module]~label[for=message]":{display:"none"}},"& svg":svgbutton};
 let select=
 {"&[focused=true]>ul":{display:"block"}
 ,"&[for=message]>ul,&[for=name]>ul":{...primaryinput}
 ,"&[for=message]>ul":
 {display:"block","margin-left":"-5em","max-height":"50vh","min-width":"150px"
 ,"&>li":
 {opacity:0,animation:"fadeout 6s","padding-left":0,"min-height":"4em","white-space":"normal"
 ,"&>img":{...material,height:"2em",float:"left","border-radius":"50%","background-color":"var(--isle)",padding:".5em",margin:".5em .5em 0 .5em"}
 ,"&>div":{color:"var(--isle)"}
 }
 ,"&>li:not(:last-of-type)":{animation:"fadeout 2s"}
 ,"&:hover>li":{opacity:1,animation:"fadein 1s"}
 ,"&>span":{position:"fixed",bottom:"1.5em",left:"5.5em",color:"black"}
 }
 ,"&>ul":
 {position:"fixed","margin-left":"var(--formscroll)","max-height":"100%","max-width":"100%","padding-top":"var(--form)",bottom:"var(--form)","box-sizing":"border-box",width:"inherit","overflow":"scroll"//"background-image":"radial-gradient(at center bottom, rgb(17, 17, 17) 0%, rgba(33, 33, 33, 0) 100%)"
 ,"&>li":{display:"block"}
 ,"&:hover":{display:"block"}
 }
 ,"& ul":
 {display:"none","z-index":"2",padding:"0px","margin-bottom":"0px","text-align":"center","pointer-events":"none","list-style-type":"none"
 ,"& ul":{position:"relative",bottom:"initial","max-height":"initial","vertical-align":"top","text-align":"left"}
 ,"& li":
 {position:"relative",display:"inline-block","pointer-events":"all","padding-right":"1em",color:"var(--text)","vertical-align":"top",margin:"auto",left:"0px",right:"0px","white-space":"pre","padding-left":"1em"
 ,"&:hover":
 {color:"var(--highlight)"
 ,"& ul":
 {display:"inline-block","white-space":"pre"
 ,"&:hover>li":{display:"block"}
 }
 }
 ,"&>svg":{position:"absolute",height:"1em",left:"0px","margin-left":"0px","margin-right":"0px",transform:"scale(0.9)",fill:"var(--text)"}
 }
 }
 };
 let wheel=
 {overflow:"visible"
 ,"& circle":
 {width:"50px",height:"50px","z-index":1,overflow:"visible"
 ,"&:first-of-type":{r:15,animation:"6s infinite cubic-bezier(0, 0.5, 1, 0.5) fill,3s infinite cubic-bezier(0.75, 0, 0, 1) revolver"}
 ,"&+circle":{animation:"6s infinite cubic-bezier(0, 0.5, 1, 0.5) fill,1.5s infinite cubic-bezier(0.75, 0, 0, 1) scaler"}
 }
 };
 let table=
 {"font-size":"inherit"
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
 return jss.create().use(jss.jssGlobal(),jss.jssNested(),jss.jssExtend()).createStyleSheet(
 {"@font-face":
[{"font-family":"ranger",src:"url(Blik_2018_calligraphy.ttf)"}
,{"font-family":"averia",src:"url(Sayers_2011_averia.ttf)"}
],"@global":
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
 {...material,position:"fixed",bottom:"0px",left:"0px",overflow:"scroll","max-width":"calc(100% - 20px)","box-sizing":"border-box","border-radius":"100vw","background-color":"var(--isle)","font-family":"averia","vertical-align":"middle","white-space":"nowrap",transition:"all var(--transition)","padding-right":"1.5em"
 ,"&:not(:hover)":
 {"padding-right":0
 ,[Object.entries({room:"message",get:"name"}).map(([method,primary])=>
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
 {position:"relative",display:"inline-block","white-space":"nowrap","vertical-align":"middle"
 ,"&:not(:last-of-type):after":{content:","}
 ,"&[type=select],&[type=date]":select
 ,"&[for=message]>span":{position:"absolute",left:"-0.5em",top:"-1.5em",color:"black"}
 //,"&[type=radio]":radio
 ,"&>span":{float:"left","&:not(:empty):after":{content:":"}}
 ,"&>svg":{height:"2em","vertical-align":"middle",cursor:"pointer"}
 ,"&>input":
 {transition:"all var(--transition)","text-shadow":"inherit"
 ,"&[type=text]":
 {outline:"none","background-color":"transparent",border:"none",width:"20px","box-sizing":"border-box",color:"inherit","text-align":"center","font-family":"inherit","font-size":"inherit"
 ,"&#code":{"-webkit-text-security":"disc"}
 }
 ,"&[type=radio]":{display:"none"}
 ,"&[type=checkbox]":
 {appearance:"none","font-family":"inherit",cursor:"pointer",width:"auto"
 ,"&:hover":{"text-shadow":"rgb(255,255,255) 0px 0px 10px,rgb(255,255,255) 0px 0px 10px,rgb(255,255,255) 0px 0px 10px"}
 ,"&:after":{content:"' ?'","margin-left":"3px","margin-right":"3px"}
 ,"&:focus:after":{"text-shadow":"rgb(255,255,255) 0px 0px 10px, rgb(255,255,255) 0px 0px 10px, rgb(255,255,255) 0px 0px 10px"}
 ,"&:checked:after":{content:"'✓'",color:"var(--highlight)"}
 }
 }
 }
 }
 ,".card":
 {...material,position:"relative",display:"inline-block",transition:"all 0.5s","text-align":"center",cursor:"pointer","border-radius":"50%"
 ,"&:hover":{...material["&:hover"],"&>span.post":{top:-15},"&>svg.trash":{display:"block"}}
 ,"&>svg.trash":{display:"none",position:"absolute",top:5,right:5,"&:hover":{fill:"#b71c1c"}}
 ,"&>p":{"font-size":"1.2em"}
 ,"&>span":{display:"block"}
 ,"&>span.post":{position:"absolute",top:5,left:5,color:"var(--isle)"}
 ,"&>p,&>span":{"&>svg":{display:"none"},"&:hover>svg":{display:"inline"}}
 ,"& select,& input":{"background-color":"transparent",color:"var(--text)"}
 ,"&.record":{padding:"10px","border-radius":"10px","background-color":"var(--isle)"}
 }
 ,"div.cm-gutters":{"background-color":"var(--abyss) !important"}
 ,"span":
 {"& .pdfjs":{"max-height":"670px",overflow:"scroll","max-width":"90vw",margin:"auto"}
 }
 ,"div.pdfjs":
 {margin:"auto","max-height":"95vh",overflow:"scroll"
 ,"&>div#viewer>div.page":
 {"background-image":"url('icon/blackboard.png')",margin:"auto"
 ,"&>.loadingIcon":{content:"",fill:"red","border-radius":"50%",width:"20px",height:"20px"}
 ,"&~div.page>div.canvasWrapper>svg image":{opacity:0.3}
 ,"&>div.canvasWrapper":
 {"&>svg tspan":{fill:"var(--text,#dbd1b4)"}
 ,"&>svg image":{opacity:0.3}
 ,"&>svg path":{fill:"rgba(33,33,33,0.533)"}
 }
 }
 }
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
 }
 }).toString()
})
}
