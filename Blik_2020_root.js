import store from "./Blik_2020_store.js";
import document,{vectors,awesome,browser,throttle,compose} from './Blik_2020_document.js';
import file,{details,shrink,log} from './Blik_2020_file.js';
import peer,{open,perform} from './Blik_2020_peer.js';
import {promises as dns} from "dns";
import path from 'path';
import util from 'util';
import os from "os";
import v8 from "v8";
//var debug=util.debuglog(import.meta.url.substring(import.meta.url.lastIndexOf("_")+1,import.meta.url.lastIndexOf(".")));
var note=log(import.meta.url).then(log=>note=log);
export var favicon="vector/node";
export var title="concept";

export default
{...file
,mind:{...store("Blik_2020_mind.json","code",hash),vanilla}
,authority:{...store("Blik_2020_authority.json","author"),vanilla}
,vanilla,host,style,vector,rss
,react(input){return document.scan(browser(title,favicon,["./Blik_2020_react.js"],["style"]))}
}

export var hash=function({hmac},value)
{if(!hmac)return;
 if(!value)hash=value=>hash({hmac},value);
 if(typeof value=="string"&&value.length)
 return crypto.createHmac("sha256",hmac).update(value).digest("hex");
}

async function vanilla(request,{resource,title,...fields}={})
{let form=await compose(document.scan,open)({form:{id:"subject",svg:{...vectors["chat"].svg,height:"1em",id:"talk"}}});
 if(request.query.transform=="collaborate")
 request.query.transform="media";
 if(request.query.source)( 
 request.query.name=request.query.source)&&
 delete request.query.source;
 fields=Object.keys(fields)[0]?fields:{name:"get",transform:"network",placement:"force",...request.query}; 
 if(!resource)
 resource=this[fields.name]?await this[fields.name](request):await this.get(fields.name);
 let fragment=await perform({resource,...fields},form);
 title=title||fields.name;
 let center=document.scan({center:{id:"object",title,fragment}});
 await throttle(fragment);
 return document.scan(browser(title,favicon,["Blik_2020_peer.js"],[await style()],{center,form}));
}

export async function rss(input)
{let title="mindranger";
 let link="https://blikpatrik.net/?rss";
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

export function vector(input)
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

export function style(input)
{return Promise.all(["jss/dist/jss.js",...["global","nested","extend"].map(plugin=>"jss-plugin-"+plugin+"/dist/jss-plugin-"+plugin+".js")].map(module=>
 import(process.execPath.replace("bin/node","lib/node_modules/")+module))).then(modules=>
 modules.map(module=>module.default).reduce((module,plugin)=>
 Object.assign(module,plugin.default?{[plugin.default.name]:plugin.default}:plugin))).then(jss=>
{let primaryinput={"text-align":"left",width:"auto","&>li":{"text-shadow":"black 0px 0px 10px","white-space":"nowrap","&>span":{"white-space":"normal"}}};//"background-image":"linear-gradient(to right, rgb(17, 17, 17) 0%, rgba(33, 33, 33, 0) 100%)"
 let material={"box-shadow":"black 0px 0px 10px","&:hover":{"box-shadow":"black 0px 0px 50px"}};
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
 ,form:
 {...material,position:"fixed",bottom:"0px",left:"0px",margin:"1em",overflow:"scroll","max-width":"calc(100% - 20px)","box-sizing":"border-box","border-radius":"100vw","background-color":"var(--isle)","font-family":"averia","vertical-align":"middle","white-space":"nowrap",transition:"all var(--transition)","padding-right":"1.5em"
 ,"&:not(:hover)":
 {"padding-right":0
 ,"&>svg#talk~label:not([for=name]),&>svg#get~label:not([for=message])":{"min-width":0,"width":0}
 }
 ,"&>svg":
 {"&#get":{padding:0,width:"5em",height:"5em"}
 ,"&#get,&#room": {"&~label:not(.talk)":{display:"none"}}
 ,"&#mind":       {"&~label:not(.mind)":{display:"none"}}
 ,"&#talk":       {"&~label:not(.get)": {display:"none"}}
 ,"&#put,&#delete":{"&~label:not(.put)":{display:"none"}}
 ,extend:button
 ,position:"sticky"
 ,left:0
 }
 ,"& label":
 {position:"relative",display:"inline-block","white-space":"nowrap",overflow:"hidden","font-size":"var(--size)","vertical-align":"middle"
 ,"&[type=select],&[type=date]":select
 //,"&[type=radio]":radio
 ,"&>span":{float:"left"}
 ,"&>svg":{height:"2em","vertical-align":"middle",cursor:"pointer"}
 ,"&>input":
 {transition:"all var(--transition)"
 ,"&[type=text]":
 {"min-width":"3em",outline:"none","background-color":"transparent",border:"none",width:"0","box-sizing":"border-box",color:"var(--text)","text-align":"center","font-family":"inherit","font-size":"var(--size)"
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
 ,"div.CodeMirror":{height:"100vh",width:"100vw","z-index":"0"}
 ,"div.CodeMirror-scroll":{width:"100vw",color:"var(--text)"}
 ,"div.CodeMirror-line":{"font-family":"var(--hand)  !important","text-align":"left !important","font-size":"20px !important"}
 ,"div.CodeMirror-linenumber":{"font-size":"12px","font-family":"averia !important",color:"var(--isle) !important"}
 ,"span":
 {"& .pdfjs":{"max-height":"670px",overflow:"scroll","max-width":"90vw",margin:"auto"}
 }
 ,".pdfjs":{ margin:"auto","max-height":"95vh",overflow:"scroll"}
 ,".pdfjs > #viewer > div.page":{ "background-image":"url('icon/blackboard.png')",margin:"auto"}
 ,".pdfjs > #viewer > div.page > div.canvasWrapper > svg tspan":{fill:"var(--text,#dbd1b4)"}
 ,".pdfjs > #viewer > div.page > div.canvasWrapper > svg image":{opacity:"0.3"}
 ,".pdfjs > #viewer > div.page > div.canvasWrapper > svg path":{fill:"rgba(33,33,33,0.533)"}
 ,".pdfjs > #viewer > div.page ~ div.page > div.canvasWrapper > svg image":{opacity:"0.3"}
 ,".pdfjs > #viewer > div.page > .loadingIcon":{content:"",fill:"red","border-radius":"50%",width:"20px",height:"20px"}
 }
 }).toString()
})
}
