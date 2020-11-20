import store from "./Blik_2020_store.js";
import document,{acquire,window,fetch,vectors,awesome,hypertext,throttle,compose} from './Blik_2020_document.js';
export {window,fetch};
import file,{details,shrink,output} from './Blik_2020_file.js';
import {open,perform} from './Blik_2020_peer.js';
import {promises as dns} from "dns";
import path from 'path';
import util from 'util';
import os from "os";
import v8 from "v8";
//var debug=util.debuglog(import.meta.url.substring(import.meta.url.lastIndexOf("_")+1,import.meta.url.lastIndexOf(".")));
var note=output(import.meta.url);
export var favicon="vector/node";
export var title="concept";
export var hmac=value=>hmac=value;
export var hash=function(value)
{if([hmac,value].every(value=>typeof value=="string"&&value.length))
 return crypto.createHmac("sha256",hmac).update(value).digest("hex");
}

export default
 {...file,vanilla,host,style,vector,rss,google,mongo
 ,signature:{...store("Blik_2020_signature.json","author"),vanilla}
 ,mind:{...store("Blik_2020_mind.json","code",hash),vanilla,ranger:vanilla}
 ,react(input){return document.scan(hypertext(title,favicon,["./Blik_2020_react.js"],["style"]))}
 ,reactx(input){return document.scan(hypertext(title,favicon,["./Blik_2020_reactx.js"],["style"]))}
 //https://docs.google.com/spreadsheets/d/1llB_Zt0ghEnKrIK6Ds5L8YldVWqTPvs6vQ-6iGrTFUg/edit?usp=sharing
 //<iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRPZI5R47a5YNwH57hCyJCQz0hxqdUIfKN5k4YLP8Vm25X-NutJkvfZTfD6goEksNpJ28m7-ZFsUQSJ/pubhtml?widget=true&amp;headers=false"></iframe>
 }

async function vanilla(request,{resource,title,...fields}={})
{let form=await compose(document.scan,open)({form:{id:"subject"}});
 form.dispatchEvent(new window.Event("switch"));
 if(request.query.transform=="script")
 request.query.transform="media";
 if(request.query.source)(request.query.name=request.query.source)&&delete request.query.source;
 fields=Object.keys(fields)[0]?fields:{name:"get",transform:"network",placement:"force",...request.query}; 
 if(!resource)
 resource=this[fields.name]?await [this[fields.name],0].reduce(route=>[route,route.get].find(route=>typeof route=="function"))(request):await this.get(fields.name);
 let fragment=await perform({resource,...fields},form);
 title=title||fields.name;
 let center=document.scan({center:{id:"object",title,fragment,style:"padding:25px"}});
 await throttle(fragment);
 return document.scan(hypertext(title,favicon,["Blik_2020_peer.js"],[await style()],{center,form}));
}

async function mongo(request)
{let [{MongoClient},keys]=await Promise.all([acquire("mongodb/index.js"),import("./Blik_2020_parameters.json")]);
 let cluster="mongodb+srv://ranger:"+keys.default.mongo.ranger+"@mind.bnukl.mongodb.net/<dbname>?retryWrites=true&w=majority";
 cluster=new MongoClient(cluster,{useNewUrlParser:true});
 return new Promise(resolve=>cluster.connect(function(fail)
{if(fail)return resolve(fail);
 cluster.db("test").collection("devices");
 cluster.close();
 resolve();
})).then(note);
}

async function google(request)
{let keys="./Blik_2020_client_keys.json";
 let [{google},clientkeys]=await Promise.all([acquire("googleapis/build/src/index.js"),import(keys)]);
 let {client,secret,token}=clientkeys.default.google;
 let redirect=request.headers["x-forwarded-proto"]+"://"+request.headers.host+"/google";
 let authority=new google.auth.OAuth2(client,secret,redirect);
 let scope=["https://www.googleapis.com/auth/spreadsheets"];
 let resolve=result=>result.find(Boolean);
 if(!token||(token.expiry_date<Date.now()))
 if(request.query.code)
{token=await new Promise(resolve=>authority.getToken(request.query.code
,(...result)=>resolve(result))).then(resolve);
 if(token instanceof Error)return token;
 Object.assign(clientkeys.default.google,{token});
 return fetch(keys+"?force=overwrite",{method:"put",body:JSON.stringify(clientkeys.default)});
}else return {status:302,location:authority.generateAuthUrl({scope,access_type:"offline"})};
 authority.setCredentials(token);
 google=google.sheets({version:"v4",auth:authority});
 let [spreadsheetId,page,range]=request.url;
 range=[page,range].join("!");
 let {method,body}=request;
 if(method=="put")method="update";
 else body={spreadsheetId,range};
 return new Promise(resolve=>google.spreadsheets.values[method](body
,(...result)=>resolve(result))).then(resolve);
}

async function rss(input)
{let title="ranger";
 let link="https://blikpatrik.net/rss";
 let description="publishing";
 let feed=note(await this.get(".")).map(item=>
{let description=item;
 let pubDate=details(item).birthtime.toString();
 let content=fetch(item,false,text=>input.query.augment!==undefined?document.media(text):text);
 ({item:[{description},{pubdate},{content}]})
})
 let xml=await import("./dylang_2017_xml.js").then(module=>module.default);
 let body=xml(
 {rss:[{channel:[{title},{link},{description},...feed]}]}
,{declaration:true,indent:" "})
 return {status:200,type:"rss+xml",body}
};

function vector(input)
{return document.scan([vectors,...input.url||["circle"]].reduce((vector,url)=>
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
 ,"&:first-of-type":{r:15,animation:"6s infinite linear fill,3s infinite cubic-bezier(0.75, 0, 0, 1) revolver"}
 ,"&+circle":{animation:"6s infinite linear fill,1.5s infinite cubic-bezier(0.75, 0, 0, 1) scaler"}
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
 {"@font-face":{"font-family":"ranger",src:"url(Blik_2018_calligraphy.ttf)"}
 ,"@font-face":{"font-family":"averia",src:"url(Sayers_2011_averia.ttf)"}
 ,"@global":
 {"::-webkit-scrollbar":{display:"none"}
 ,"@keyframes fadeout":{"0%":{opacity:1,display:"block"},"50%":{opacity:1,display:"block"},"100%":{opacity:0,display:"none"}}
 ,"@keyframes fadein":{from:{opacity:0,display:"none"},to:{opacity:1,display:"block"}}
 ,"@keyframes dash":{"0%":{"stroke-dashoffset":187},"50%":{"stroke-dashoffset":1,transform:"rotate(135deg)"},"100%":{"stroke-dashoffset":187,transform:"rotate(450deg)"}}
 ,"@keyframes fill":{"0%":{fill:"rgb(66,133,244)"},"25%":{fill:"rgb(222,62,53)"},"50%":{fill:"rgb(247,194,35)"},"75%":{fill:"rgb(27,154,89)"},"100%":{fill:"rgb(66,133,244)"}}
 ,"@keyframes stroke":{"0%":{stroke:"rgb(66,133,244)"},"25%":{stroke:"rgb(222,62,53)"},"50%":{stroke:"rgb(247,194,35)"},"75%":{stroke:"rgb(27,154,89)"},"100%":{stroke:"rgb(66,133,244)"}}
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
 ,span:{"&.wheel":{height:"1em"}}
 ,center:
 {"white-space":"pre-wrap","overflow-wrap":"break-word",overflow:"scroll",width:"100vw",height:"100vh","text-align":"var(--align)"
 ,"&>svg.d3":
 {overflow:"visible",position:"relative","max-width":"100vw","max-height":"100vh"
 ,"& g.node text":{"pointer-events":"none"}
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
 ,"& label":
 {position:"relative",display:"inline-block","white-space":"nowrap","font-size":"var(--size)","vertical-align":"middle"
 ,"&[type=select],&[type=date]":select
 ,"&[for=message]>span":{position:"absolute",left:"-0.5em",top:"-1.5em",color:"black"}
 //,"&[type=radio]":radio
 ,"&>span":{float:"left"}
 ,"&>svg":{height:"2em","vertical-align":"middle",cursor:"pointer"}
 ,"&>input":
 {transition:"all var(--transition)"
 ,"&[type=text]":
 {outline:"none","background-color":"transparent",border:"none",width:"20px","box-sizing":"border-box",color:"var(--text)","text-align":"center","font-family":"inherit","font-size":"var(--size)"
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
 ,"div.cm-gutters":{"background-color":"var(--abyss) !important"}
 ,"span":
 {"& .pdfjs":{"max-height":"670px",overflow:"scroll","max-width":"90vw",margin:"auto"}
 }
 ,".pdfjs":
 {margin:"auto","max-height":"95vh",overflow:"scroll"
 ,"&#viewer>div.page":
 {"background-image":"url('icon/blackboard.png')",margin:"auto"
 ,"&>.loadingIcon":{content:"",fill:"red","border-radius":"50%",width:"20px",height:"20px"}
 ,"&~div.page>div.canvasWrapper > svg image":{opacity:"0.3"}
 ,"&> div.canvasWrapper":
 {"&>svg tspan":{fill:"var(--text,#dbd1b4)"}
 ,"&>svg image":{opacity:"0.3"}
 ,"&>svg path":{fill:"rgba(33,33,33,0.533)"}
 }
 }
 }
 ,"#cf_alert_div>div":{background:"black !important"}
 ,".card":
 {...material,position:"relative",transition:"all var(--transition)"
 ,"&:hover":{"&>span.post":{top:-15},"&>svg.trash":{display:"block"}}
 ,"&>svg.trash":{display:"none",position:"absolute",top:5,right:5,"&:hover":{fill:"#b71c1c"}}
 ,"&>p":{"font-size":"1.2em"}
 ,"&>span":{display:"block"}
 ,"&>span.post":{position:"absolute",top:5,left:5,color:"var(--isle)"}
 ,"&>p,&>span":{"&>svg":{display:"none"},"&:hover>svg":{display:"inline"}}
 ,"& select":{"background-color":"transparent",color:"var(--text)"}
 }
 }
 }).toString()
})
}
