import {merge,absolve} from "./Blik_2020_platform.js";

export async function stylesheet(style,global)
{let [jss,...plugins]=await Promise.all(
["jss/dist/jss.js",...["nested","extend","global"].map(plugin=>"jss-plugin-"+plugin+"/dist/jss-plugin-"+plugin+".js")
].map(absolve).map(module=>import(module).then(module=>module.default||module)));
 return jss.create().use(...plugins.map(plugin=>plugin.default())).createStyleSheet(global?{"@global":style}:style).toString();
}

let primaryinput={"text-align":"left",width:"auto","&>li":{"text-shadow":"black 0px 0px 10px","white-space":"nowrap","&>span":{"white-space":"normal"}}};//"background-image":"linear-gradient(to right, rgb(17, 17, 17) 0%, rgba(33, 33, 33, 0) 100%)"
let material={"box-shadow":"black 0px 0px 10px","&:hover":{"box-shadow":"black 0px 0px 50px"},margin:"1em"};
let glow={filter:"url(#shadow_white)"};
let button={height:"3em",width:"3em",cursor:"pointer",fill:"var(--isle)","vertical-align":"middle","background-color":"black","clip-path":"circle(50%)",padding:"1em",transform:"scale(0.8)"};
let label=
 {position:"relative",display:"inline-block","white-space":"nowrap","vertical-align":"middle",cursor:"pointer"
 ,"&:hover":{"&>svg":glow,"&>input":{"text-shadow":"white 0px 0px 2px,white 0px 0px 2px",transition:"all 0.3s"}}
 ,"&>svg":{float:"left",height:"1em","vertical-align":"middle",cursor:"pointer",overflow:"visible"}
 ,"&>span":{float:"left","&:not(:empty):after":{content:":"}}
 ,"&>input":
 {height:"1em",transition:"all var(--transition)","text-shadow":"inherit"
 ,"&[type=text]":{outline:"none","background-color":"transparent",border:"none",width:"20px","box-sizing":"border-box",color:"inherit","text-align":"center","font-family":"inherit","font-size":"inherit"}
 ,"&:focus+ul":{display:"block"}
 ,"&~svg":{"margin-right":"0.5em"}
 }
 ,"&>ul":
 {position:"fixed","margin-left":"0.6em","max-height":"100%","max-width":"100%","padding-top":"var(--form)",bottom:"var(--form)","box-sizing":"border-box",width:"inherit","overflow":"scroll"//"background-image":"radial-gradient(at center bottom, rgb(17, 17, 17) 0%, rgba(33, 33, 33, 0) 100%)"
 ,"&>li":{display:"block"}
 ,"&:hover":{display:"block"}
 }
 ,"& ul":
 {display:"none","z-index":"2",padding:"0px","margin-bottom":"0px","text-align":"left","pointer-events":"none","list-style-type":"none"
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
 ,"&[focused=true]>ul":{display:"block"}
 ,"&[for=message]>ul,&[for=source]>ul":primaryinput
 ,"&[for=message]>ul":
 {display:"block","margin-left":"-5em","max-height":"50vh","min-width":"150px"
 ,"&>li":
 {opacity:0,animation:"fadeout 6s","padding-left":0,"min-height":"4em","white-space":"normal"
 ,"&>img":{...material,margin:"1em",height:"2em",float:"left","border-radius":"50%","background-color":"var(--isle)",padding:".5em",margin:".5em .5em 0 .5em"}
 ,"&>div":{color:"var(--isle)"}
 }
 ,"&>li:not(:last-of-type)":{animation:"fadeout 2s"}
 ,"&:hover>li":{opacity:1,animation:"fadein 1s"}
 ,"&>span":{position:"fixed",bottom:"1.5em",left:"5.5em",color:"black"}
 }
 };
let table=
 {"font-size":"inherit",transition:"all 1s"
 ,"&#dashboard tr":{"vertical-align":"top"}
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
let pdfjs=
 {"span":
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
 };
export var layout=
 {material,label,table
 ,theme:
 {":root":Object.fromEntries(Object.entries(
 {abyss:"#111111",isle:"#303030",text:"#dbd1b4",note:"#7a7564",highlight:"rgb(230,238,156)"
 ,font:"averia",hand:"ranger",form:"3.5em",size:"14px",align:"inherit",transition:"1s"
 }).map(([key,value])=>["--"+key,value]))
 ,"::-webkit-scrollbar":{display:"none"}
 }
 ,body:
 {margin:0,"text-align":"center",overflow:"hidden","font-family":"var(--font)"
 ,"font-size":"var(--size)",color:"var(--text)","background-color":"var(--abyss)"
 ,transition:"all var(--transition)"
 }
 ,a:{"text-decoration":"none",position:"relative",color:"rgb(66,133,244)"}
 ,blockquote:Object.fromEntries(["before","after"].map(side=>["&> p::"+side,{content:"\""}]))
 ,row:{display:"inline-block",margin:"0 1em",height:"100%","list-style":"none"}
 ,column:{display:"block",margin:"1em 0","list-style":"none"}
 ,shelf:{position:"absolute",bottom:0,left:0,right:0,"text-align":"left"}
 ,radio:{"border-radius":"100%","background-color":"black",transform:"scale(0.8)","&[checked=true]":{display:"none","&[for=talk]~label[for=source]":{display:"none"},"&[for=module]~label[for=message]":{display:"none"}}}
 ,frame:
 {"white-space":"pre-line","overflow-wrap":"break-word",overflow:"scroll"
 ,width:"100vw",height:"100vh","text-align":"var(--align)"
 ,"& h2[onclick],.entry":{cursor:"pointer","&:hover":{transform:"scale(1.2)"}}
 ,"& .entry+span[id]":{position:"relative",overflow:"hidden",display:"none"}
 ,"& span[name]+span":{"white-space":"pre-wrap"}
 ,"&>span":
 {"vertical-align":"middle","font-size":"30px","line-height":"30px"
 ,"&:not([id]).entry":{position:"relative",display:"block",margin:"auto auto 30px",height:"auto",cursor:"pointer"}
 }
 }
 ,media:
 {overflow:"visible",position:"relative","max-width":"100vw","max-height":"100vh"
 ,"& g.node":
 {"& text":{"pointer-events":"none"}
 ,"& foreignObject":{transform:"tanslate(-5px,-5px)"}
 ,"& body":{background:"transparent"}
 ,"& form":
 {overflow:"scroll"
 ,color:"inherit"
 //,left:x+width+fragment.scrollLeft,top:node.y-10
 ,"font-size":"inherit"
 ,"text-shadow":"black 0px 0px 2px,black 0px 0px 2px,black 0px 0px 2px"
 ,"white-space":"nowrap"
 }
 }
 }
 ,card:
 {".card":
 {...material,margin:"1em",position:"relative",display:"inline-block",transition:"all 0.5s","text-align":"center",cursor:"pointer","border-radius":"50%"
 ,"&:hover":{...material["&:hover"],"&>span.post":{top:-15},"&>svg.trash":{display:"block"}}
 ,"&>svg.trash":{display:"none",position:"absolute",top:5,right:5,"&:hover":{fill:"#b71c1c"}}
 ,"&>p":{"font-size":"1.2em"}
 ,"&>span":{display:"block"}
 ,"&>span.post":{position:"absolute",top:5,left:5,color:"var(--isle)"}
 ,"&>p,&>span":{"&>svg":{display:"none"},"&:hover>svg":{display:"inline"}}
 ,"& select,& input":{"background-color":"transparent",color:"var(--text)"}
 ,"&.record":{padding:"10px","border-radius":"10px","background-color":"var(--isle)"}
 }
 }
 ,multimedialink:{span:{"&[onclick]":{color:"rgb(255,171,0)"}}}
 ,animations:
 {"@keyframes fadeout":{"0%":{opacity:1,display:"block"},"50%":{opacity:1,display:"block"},"100%":{opacity:0,display:"none"}}
 ,"@keyframes fadein":{from:{opacity:0,display:"none"},to:{opacity:1,display:"block"}}
 ,"@keyframes dash":{"0%":{"stroke-dashoffset":187},"50%":{"stroke-dashoffset":1,transform:"rotate(135deg)"},"100%":{"stroke-dashoffset":187,transform:"rotate(450deg)"}}
 ,"@keyframes stroke":{"0%":{stroke:"rgb(66,133,244)"},"25%":{stroke:"rgb(222,62,53)"},"50%":{stroke:"rgb(247,194,35)"},"75%":{stroke:"rgb(27,154,89)"},"100%":{stroke:"rgb(66,133,244)"}}
 ,"@keyframes pulse":Array(5).fill(1).map((scale,index)=>index%2?1.2:1).reduce((pulse,scale,index)=>
 Object.assign(pulse,{[index*25+"%"]:{transform:"scale("+scale+")"}}),{})
 }
 ,wheel:
 {"@keyframes dash":{"0%":{"stroke-dashoffset":187},"50%":{"stroke-dashoffset":1,transform:"rotate(135deg)"},"100%":{"stroke-dashoffset":187,transform:"rotate(450deg)"}}
 ,"@keyframes stroke":{"0%":{stroke:"rgb(66,133,244)"},"25%":{stroke:"rgb(222,62,53)"},"50%":{stroke:"rgb(247,194,35)"},"75%":{stroke:"rgb(27,154,89)"},"100%":{stroke:"rgb(66,133,244)"}}
 ,"@keyframes rotate":{"0%":{transform:"rotateX(60deg) rotate(0deg)"},"100%":{transform:"rotateX(60deg) rotate(360deg)"}}
 ,"svg.wheel":{height:"1em","& circle":{"stroke-dasharray":187,"stroke-dashoffset":0,"transform-origin":"center center",animation:"1.5s ease-in-out 0s infinite normal none running dash, 6s ease-in-out 0s infinite normal none running colors"}}
 //,"svg.wheel":{"& circle":{"stroke-dasharray":187,"stroke-dashoffset":0,"transform-origin":"center center",animation:"1.5s ease-in-out 0s infinite normal none running dash, 6s ease-in-out 0s infinite normal none running colors"}}
 }
 ,goo:
 {"@keyframes waltz":Object.fromEntries(Array(5).fill(70).map((offset,index,{length})=>
[index/(length-1)*100+"%"
,{transform:"translate("+(index%2?offset:0)*(index>1?-1:1)+"%)"}
]))
 ,"@keyframes scaler":Object.fromEntries(Array(3).fill(30).map((r,index,{length})=>
 [index/(length-1)*100+"%",{r:r/(index%2?2:1),"z-index":index%2}]))
 ,"@keyframes fill":Object.fromEntries(
 ["rgb(66,133,244)","rgb(222,62,53)","rgb(247,194,35)","rgb(27,154,89)","rgb(66,133,244)"].map((fill,index,{length})=>
 [index/(length-1)*100+"%",{fill}]))
 ,"svg.wheel":
 {overflow:"visible"
 ,"& circle":
 {width:"50px",height:"50px","z-index":1,overflow:"visible"
 ,"&:first-of-type":{r:15,animation:"6s infinite cubic-bezier(0, 0.5, 1, 0.5) fill,3s infinite cubic-bezier(0.75, 0, 0, 1) waltz"}
 ,"&+circle":{animation:"6s infinite cubic-bezier(0, 0.5, 1, 0.5) fill,1.5s infinite cubic-bezier(0.75, 0, 0, 1) scaler"}
 }
 }
 }
 ,carousel:
 {position:"relative",margin:"auto",overflow:"scroll","max-width":"90%","white-space":"nowrap"
 ,"&:before":{"pointer-events":"none",content:"''",display:"block",position:"absolute",width:"100%",height:"100%","box-shadow":"inset 0 0 100px var(--abyss)"}
 ,"&>*":{display:"inline-block",width:"100%","&>img":{"max-height":"200px"},"&>p":{"white-space":"normal"}}
 }
 ,audio:
 {display:"inline",margin: "auto",height:"0.6em",outline:"none",background:"none"
 ,"&::-webkit-media-controls-panel":{"background-color":"rgb(35, 35, 35)"}
 ,"&::-webkit-media-controls-time-remaining-display":{"text-shadow":"none"}
 ,"&::-webkit-media-controls-current-time-display":{"text-shadow":"none"}
 }
 ,comment:
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
 ,panel()
{return {...[this.material,this.pill].reduce(merge,{})
 ,width:"100%","font-size":"2em",margin:0,"box-sizing":"border-box","border-radius":"0 0 0 0",transition:"all 0.5s"
 ,"&>label":
 {...this.label
 ,"&>input:focus~svg":Object.fromEntries(Array(3).fill(3*45).map((deg,n)=>["& rect:nth-of-type("+(n+1)+")",{width:n==1?1:0.9,transform:"rotate("+(deg-n*45)+"deg)"}]))
 ,"&:first-of-type":{float:"right","&>svg":{transform:"scale(1.5)"}}
 ,"& rect":{transform:"rotate(0deg)","transform-origin":"center",transition:"all 0.5s"}
 }      };
},pill:{display:"inline-block","border-radius":"100vh",cursor:"pointer","background-color":"var(--isle)"}
 ,form:
 {"--form":"6em","padding-right":"1.5em",position:"fixed"
 ,margin:0
 ,bottom:"0px",left:"0px",overflow:"scroll","max-width":"calc(100% - 20px)"
 ,"box-sizing":"border-box"
 ,"font-family":"averia","vertical-align":"middle","white-space":"nowrap"
 ,transition:"all var(--transition)"
 ,"&:not(:hover)":
 {[Object.entries({room:"message",get:"source"}).map(([method,primary])=>
 "&[method="+method+"]>label:not([for="+primary+"])").join()]:{width:0,display:"none"}
 }
 ,...Object.fromEntries(["get","sign","send","room"].map(method=>["&[method="+method+"] label:not(."+method+")",{display:"none"}]))
 ,"&[method=get],&[method=sign]":{"&>svg":{padding:0,width:"5em",height:"5em"}}
 ,"&[method=delete]":{"&>svg":{transform:"rotate(45deg)","transform-origin":"center center"}}
 ,"&>svg":{...button,position:"sticky",left:0}
 ,"font-size":"var(--size)"
 ,"& label":
 {...merge(label,
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
 },1)
 }
 }
 ,codemirror:{"div.cm-gutters":{"background-color":"var(--abyss) !important"}}
 ,socialecologies:
 {".gallery-row":{"white-space":"nowrap",width:"100% !important"}
 ,".gallery-group":{display:"inline-block"}
 }
 ,assistant:{"& input":{"font-size":"20px","font-family":"inherit",color:"rgb(144,164,174)","text-align":"center",border:"none",outline:"none","background-color":"transparent"},"& *":{display:"block",margin:"auto"}}
 ,pdfjs
 ,cloudflare:{"#cf_alert_div>div":{background:"black !important"}}
 };

export var fontface=
 {averia:{"font-family":"averia",src:"url(Sayers_2011_averia.ttf)"}
 ,oswald:{"font-family":"oswald",src:"url(Vernon_2011_Oswald-Regular.ttf)"}
 ,ranger:{"font-family":"ranger",src:"url(Blik_2018_calligraphy.ttf)"}
 }
