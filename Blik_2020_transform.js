import clock from "./Blik_2020_time.js";
import script from "./Blik_2020_script.js";
import network from "./Blik_2020_network.js";
import dashboard from "./Blik_2020_dashboard.js";
import * as chart from "./Blik_2020_chart.js";
import * as map from "./Blik_2020_map.js";
import {scan,note,vectors} from "./Blik_2020_document.js";
import {window,retreat} from "./Blik_2020_window.js";
import transform from "./Blik_2020_transform.js";

export async function insert(source,target,sibling)
{await Promise.resolve(wheel);
 if(!sibling)
 while(target.firstChild)
 target.firstChild.remove();
 source=source||[wheel.cloneNode(true),0].reduce(wheel=>
 ["width","height"].map(side=>wheel.setAttribute(side,"50px"))&&wheel);
 source=sibling
?target.parentNode[target.nextSibling?"insertBefore":"appendChild"](source,target.nextSibling)
:target.appendChild(source);
 if(sibling==2)target.remove();
 return source;
}

export async function feed(source,{number,fragment})
{//scan(Array.isArray(resource)?translate(resource,"div",item=>({"#text":item.name})):resource,frame).childNodes[0];
 //let sibling=this;
 //if(!this.classList.toggle("open"))
 //while(sibling.nextSibling)
 //if(["entry","assistant"].includes((sibling=sibling.nextSibling).className))
 //(sibling.style.display=sibling.style.display=="none"?"block":"none");
 //if(this.nextSibling&&this.nextSibling.classList.contains("wheel")||!this.classList.contains("open"))
 //return;
 //await insert(null,this,true);
 if(tone)tone.string.triggerAttackRelease("C2","8n");
 let feed=
 {medi:source=>fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/"+source).then(promise=>promise.json())
 ,word:source=>import("/wordpress_2019_wpcom.js").then(({WPCOM})=>WPCOM().site(source).postsList({number}))
 ,face:source=>new Promise(resolve=>FB.api("/"+/*source*/"10210793350908906"+"/feed","GET",{},response=>resolve(response)))
 ,http:source=>fetch(source).then(source=>source.json())
 ,rsss:source=>fetch("https://medium.com/feed/"+source).then(response=>response.text()).then(xml=>(new DOMParser()).parseFromString(xml,"text/xml").querySelectorAll("item"))
 };
 let avatars=
 {"Glenn Wallis":"https://i1.rgstatic.net/ii/profile.image/650281603837952-1532050624030_Q512/Glenn_Wallis4.jpg"
 ,blikpatrik:"https://lh3.googleusercontent.com/a-/AAuE7mAaNAQuGwqBbFNniuXl2oCCuzeba31iDE5JvR3eSag=s64"
 ,whatstheharm:"https://upload.wikimedia.org/wikipedia/commons/b/ba/WhatsTheHarmDotNetIcon132x132.jpg"
 ,peez:"https://pbs.twimg.com/profile_images/832431104963575808/Db9IbwBP.jpg"
 };
 if(typeof source=="string")source=await fetch(source).then(source=>source.json());
 source=Array.isArray(source)?source:Object.keys(source);
 source=source.map(source=>[source.indexOf("/"),0].reduce(index=>[source.substring(0,index)||"local",source.substring(index)]));
 source=source.map(([platform,source])=>(
 feed[platform.substring(0,4)]||(source=>Promise.resolve({items:[source]})))(source).then(feed=>
 [platform,source,feed]).catch(fail=>[platform,source,note(fail)]));
 let block=window.document.createRange().createContextualFragment(scan({div:{}}));
 await Promise.all(source).then(source=>source.map(([platform,source,feed])=>
 ([feed,"items","posts","data"].reduce((list,key)=>
 Array.isArray(list)?list:feed[key])||[]).slice(0,number).map(async next=>
 Object.assign(next
,{...[[next,"author","name"].reduce((name,key)=>!name||name.length?name:name[key])||
 source.substring(0,source.search(/_\d\d/)).replace("_"," & ")
,0].reduce(author=>(
 {author,avatar:
[[next.avatar,[next,"author","avatar_URL"],[feed,"feed","image"]].reduce((avatar,path)=>
 avatar||path.reduce((avatar,key)=>!avatar?undefined:avatar[key]))
,0
].reduce(avatar=>avatar||avatars[author]||avatars.blikpatrik)
 }))
 ,post:[0,"createdTime","pubDate","created_time","date"].reduce((time,key)=>time||next[key])||
 source.substring(source.search(/_\d\d/)+1,source.search(/\d\d_/)+2).split("").map((digit,index,date)=>{if(index==3||index==6)date.splice(index+1,0,"-");return digit}).join("")
 ,id:next.id||[0,"site_ID"].reduce((id,key)=>id||next[key])||source
 ,title:next.title||next.message||next.substring(next.search(/\d\d_/)+3).replace(/\.txt/g,"").replace(/_/g," ")
 ,content:[(next.enclosure&&next.enclosure.link?await deform("listen@"+next.enclosure.link):""),next.content].filter(Boolean).join("\n")
 ,platform
 })))).then(entries=>Promise.all(entries.flat())).then(entries=>entries.sort((next,following)=>
 (new Date(next.post))-(new Date(following.post))).forEach(promptpost.bind(block)));
 Array.from(block.childNodes).forEach(node=>fragment.parentNode.insertBefore(note(node),fragment));
 fragment.remove()
 //search(this);
}

export async function deform(resource)
{// text{style} text@source text#tag text/json#transform text#transform(text/json)
 let text=new RegExp(/[A-Za-zÁÉÍÓÖŐÚŰÜáéíóöőúűü\d\:\.\;\/\?\=\&\-\'_#\%\!\@]/);
 let json=new RegExp(/[{\[]{1}(?:[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]|".*?")+[}\]]{1}/,"m");
 let call=new RegExp("\\((?:(\""+text.source+"*\"|"+json.source+")[,\)]{0,1})+");
 let tags={"@":"name","#":"document","{":"style"};
 let tag=new RegExp("(["+Object.keys(tags).join("")+"])("+json.source+"|"+text.source+"+("+call.source+")*)[\}]*","g");
 let form=new RegExp("(?<=^|[ \n])("+text.source+"+?[^\(\)\"\':, \n"+Object.keys(tags).join("")+"])((?:"+tag.source+")+)","gm");
 let promises=await Promise.all([...resource.matchAll(form)].map(([match,title,input])=>
{let {name,document,style}=Object.fromEntries([...input.matchAll(tag)].map(([match,tag,value])=>[tags[tag],value]).reverse());
 [document,name,input]=!document||!document.includes("(")
?[document,name||title,input]
:[...document.matchAll(json.source+"|"+text.source+"+")].map(([match])=>match.replace("(",""));
 if(name)
 try{name=JSON.parse(name)}catch(fail){name=name.split(",").reduce((json,piece)=>
 //split consecutive jsons matched by the json regexp
{if(typeof json!="string"){input=(input?input+",":"")+piece;return json;}
 json=json+","+piece;
 try{return JSON.parse(json)}catch(fail){return json};
})}
 try{input=JSON.parse(input)}catch(fail){}
 name=transform[document]
?transform[document].constructor==Function
?transform[document](name,input||{})
:defer({name,transform:document,...input||{}})
:refer(title,name,document||(name==title&&"span"))||match;
 if(name.setAttribute)
 name.setAttribute("style",style);
 return name;
}));
 return resource.replace(form,match=>(promises.shift()||{outerHTML:""}).outerHTML);
}


export default
 {scan,script,media,feed,portfolio,network,dashboard,...chart,...map
 ,xmas:async call=>import("./anvaka_2019_sinus_pine.js").then(({run})=>run())
 }

function portfolio(source)
{return scan(
 {div:
 {h1:
 {"#text":window.location.pathname.split("/").filter(Boolean).pop()
 ,onclick:"import('/Blik_2020_window.js').then(({retreat})=>retreat())"
 ,style:"cursor:url('/vector/arrow_curved'),pointer"
 }
 ,h2:["pub","sub"].map(key=>(
 {"#text":key
 ,onclick:"import('/Blik_2020_form.js').then(({perform,insert})=>insert(null,this,true).then(fragment=>perform({resource:window.location.pathname+'"+key+"',transform:'feed',number:15,fragment})))"
 }))
 }
 })
}

function media(resource,properties)
{if(resource.constructor.name=="Buffer")
 resource=new TextDecoder("utf-8").decode(new Uint8Array(resource));
 return resource.nodeName?resource:resource.startsWith("<")
?window.document.createRange().createContextualFragment(resource)
:deform(resource).then(source=>window.document.createRange().createContextualFragment(source))
}

var defer=form=>scan(
 {"img":
 {onload:"import('./Blik_2020_form.js').then(({get})=>get("+JSON.stringify(form)+",this,true));"
 ,src:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
 }
 })
var refer=(title,name,transform,elements={"audio":["mp3"],"img":["png","jpg","svg","gif"]})=>scan(
{[transform||Object.keys(elements).find(key=>elements[key].includes(name&&name.slice&&name.slice(-3)))||"a"]:
{"#text":(title||name).replace(/_/g," "),title,name:title||name,alt:title||name,href:name,src:name,controls:"on",onclick:!name?undefined
:"this.name=='"+title+"'?insert(document.createTextNode(this.name.replace(/_/g,' ')),this).parentNode.removeAttribute('name'):resolve('"+title+"').then(name=>insert(name,this)).then(node=>note(node.parentNode).name='"+title+"')"
}
});

var wheel=new Promise(async function wait(resolve){vectors===undefined?setTimeout(tick=>wait(resolve),300):resolve(await vectors)}).then(done=>
 wheel=scan({svg:{class:"wheel"
 ,...[vectors.circle.svg,0].reduce(svg=>
 ({...svg,circle:undefined,g:{filter:"url(#goo)",circle:Array(2).fill(svg.circle)}}))
 ,...vectors.goo.svg
 }}));

export function promptpost(item)
{//gum_bubble_pop.play();
 //block=block.parentNode.insertBefore(document.createElement("span"),block.nextSibling);block.style.display="block";
 let entry=scan({span:{name:item.id,class:"entry",platform:item.platform,"#text":"\n"}})
 entry.onclick=load;
 //if(item.onclick){entry.name=item.name;entry.onclick=item.onclick; block=block.parentNode.insertBefore(entry,block.nextSibling);return block}
 //timestamp=entry.appendChild(document.createElement("span"));timestamp.setAttribute("style","color:#b71c1c;");timestamp.innerHTML=item.createdTime+item.name.substring(5,9)+"."+item.name.substring(9,11)+"."+item.name.substring(11,13)+". ";
 let title=scan(
 {span:
 {style:"color:#b71c1c;display:block;",img:
 {title:item.author,style:"border-radius:50%;height:1em;vertical-align:bottom"
 ,src:item.avatar
 }
 ,facebook:item.platform!="facebook"?undefined
:Object.assign(document.createRange().createContextualFragment(awesome["fab fa-facebook-f"]).firstChild
,{style:"position:absolute;height:10px;top:1.7em;transform:translate(-7px);fill:#5577BA"})
 ,"#text":" "+(item.post?clock(new Date(item.post),"date"):item.name.substring(5,13))//date.getFullYear()+((date.getMonth()+1).toString().length<2?"0":"")+(date.getMonth()+1)+(date.getDate().toString().length<2?"0":"")+date.getDate()
 ,span:{style:"color:var(--text);display:block;","#text":item.title}
 }
 },entry);
 if(!item.avatar)
 fetch("google/image/"+item.author).then(img=>title.querySelector("img").src=img.items[0].link)
 //delimiter=entry.appendChild(document.createElement("span"));delimiter.setAttribute("style","color:black;");delimiter.innerHTML="|";
 //fetch("https://en.wiktionary.org/wiki/"+item.title,{"mode":"cors","headers":{"Access-Control-Allow-Origin":"*"}}).then(page=>console.log("wiki",page));
 //fetch("https://en.wiktionary.org/"+'/w/api.php?action=parse&format=json&prop=text|revid|displaytitle&callback=?&page='+item.title,{"mode":"cors","headers":{"Access-Control-Allow-Origin":"*"}}).then(page=>console.log("w",page));
 this.appendChild(entry)
 if(item.content)preparepost(entry,item.content);
 return this;
}

async function load(click)
{note(this);
if(!this.nextSibling.nextSibling.id)
{insert(null,this,true)
 let content;
 note(this.getAttribute("platform"),this.getAttribute("name"))
 if(this.getAttribute("platform")=="local")content=await resolve(this.getAttribute("name")).then(deform);
 else if(this.getAttribute("platform")=="facebook")content=await new Promise(resolve=>FB.api("/"+this.getAttribute("name"),"GET",{fields:'id,name,from,created_time,message,type,timeline_visibility,link,object_id'},response=>resolve(response))).then(response=>{console.log(response);return response.object_id?new Promise(resolve=>FB.api("/"+response.object_id,"GET",{fields:'id,title,format,source,embed_html'},responseobject=>resolve(responseobject))).then(responseobject=>{console.log(responseobject);return responseobject.embed_html+" \n"+response.message}):deform(response.message+" \n "+(response.name&&response.link?response.name.replace(/ /g,"_")+"@"+response.link:""))});
 else content=await fetch(this.getAttribute("name")).then(promise=>promise.text()).then(content=>import("/Blik_2020_transform.js").then(({deform})=>deform(content)));
 this.nextSibling.remove();
 if(content!="Not Found")await preparepost(this,content).then(done=>spell(this.nextSibling.nextSibling));
}
 else spell(this.nextSibling.nextSibling)
}

async function preparepost(subject,content)
{let entry=document.createElement("span");
 entry.setAttribute("style","height:0;overflow:hidden");
 entry.setAttribute("id",subject.getAttribute("name"));
 var observer=new MutationObserver(function(mutations)
{observer.disconnect();
 for(let mutation of mutations)
 Array.from(mutation.addedNodes).filter(node=>
 node.getAttribute&&node.getAttribute("class")==="animation").map(node=>
 [node.innerHTML,node]).forEach(entry=>insert(...entry));
});
 observer.observe(entry,{attributes:false,childList:true,characterData:false});
 entry.innerHTML="\n"+content;
 entry.innerHTML+="\n\n";
 await loadcomment(entry,entry.id);
 //await fetch("https://www.googleapis.com/drive/v3/files/1-47T-7HxbgQcgoDg082MBS18rlVa5_W3?alt=media&key="+keys.googleapi).then(response=>response.text()).then(feed=>console.log(feed))//feed.filter(response=>response.post===entry.id).sort(function(next,following){return new Date(following.time)-new Date(next.time)}).forEach(response=>{loadcomment(entry,entry.id,response);}));
 let block=subject.parentNode.insertBefore(document.createTextNode("\n\n"),subject.nextSibling);
 block=block.parentNode.insertBefore(entry,block.nextSibling);
};

async function loadcomment(thread,id,response)
{prompt=document.createElement("form");prompt.setAttribute("class","comment")
//prompt.innerHTML=anonymous;//serialized=await new Promise(function(resolve,reject){
 let anonymous=scan(vectors.anonymous);
 let avatar=prompt.appendChild(response&&response.avatar?document.createElement("img"):anonymous);//document.createRange().createContextualFragment(anonymous).firstChild);
 let input=prompt.appendChild(document.createElement("span"));input.setAttribute("name","quote");
 //input=prompt.appendChild(document.createElement("span"));input.setAttribute("name","quote");//}).then(function(svg){return//serialized=new XMLSerializer().serializeToString(prompt.getElementsByTagName("svg")[0]);//});//avatarblob=new Blob([anonymous],{type:"image/svg+xml"});console.log("blob",avatarblob);//DOMURL=peer.URL||peer.webkitURL||peer;//avatarurl=DOMURL.createObjectURL(avatarblob)
 let image=new Image();
 if(response&&response.avatar){avatar.src=response.avatar;image.setAttribute("crossOrigin","Anonymous");}/*avatar.nodeName==="IMG"*/else{avatar.src=URL.createObjectURL(new Blob([anonymous],{type:"image/svg+xml"}))};//'data:image/svg+xml; charset=utf8, '+encodeURIComponent(anonymous)}
 image.onload=function(){sampleimage(this,input);};
 image.src=response&&response.avatar?response.avatar:'data:image/svg+xml; charset=utf8, '+encodeURIComponent(anonymous);
 if(response)
{input.innerHTML=deform(response.quote);
 if(response.quote.length>250)
{let cut=input.innerHTML.slice(250);
 input.innerHTML=input.innerHTML.slice(0,250);
 let restore=input.appendChild(document.createElement("span"));restore.style.color="#616161";restore.setAttribute("onclick","rest=this.nextSibling;this.parentNode.replaceChild(this.nextSibling,this);spell(rest);");restore.innerHTML="...";
 let more=input.appendChild(document.createElement("span"));more.innerHTML=cut;more.setAttribute("style","overflow:hidden;display:none");
}let date=new Date(response.time)
 input.appendChild(document.createElement("div")).textContent=date.getFullYear()+"."+((date.getMonth()+1).toString().length<2?"0":"")+(date.getMonth()+1)+"."+(date.getDate().toString().length<2?"0":"")+date.getDate()+" "+date.getHours()+":"+date.getMinutes();
}
 else{input.setAttribute("contenteditable","true");input.textContent="a kommentelés β üzemmódban.";input.setAttribute("name",id);input.addEventListener("input",function(event){if(event.data)typenoise(event.data.charCodeAt(0));if(event.inputType==="insertParagraph"){event.preventDefault();typenoise(13);respond(event.srcElement.parentNode)}});}
 thread.appendChild(prompt);
}

export function search(block)
{let hint=document.createElement("span");
 hint.setAttribute("class","assistant");
 let assistant=hint.appendChild(scan(vectors.assistant));
 assistant.style.height="50px";
 assistant.onclick=function(){allin();radio()}
 hint=hint.appendChild(document.createElement("input"));
 hint.value=new URLSearchParams(window.location.search).get("featuring")||null;
 hint.onchange=function(hint)
{document.querySelectorAll("h2~.entry").forEach(function(entry)
{entry.style.visibility=entry.getElementsByTagName("img")[0].getAttribute("title").toLowerCase().includes(hint.target.value.toLowerCase())?"visible":"hidden";
})
};
 block.parentNode.insertBefore(hint.parentNode,block.nextSibling);
 hint.focus()
 if(hint.value)
 hint.onchange({target:hint})
}

async function spell(block,recursion)
{if(!recursion)
{let expanded=block.style.display==='initial';
 if(!expanded){block.style.display="initial";}
 else if(spelling){console.log("skip to end");skip+=2}
 else{block.style.display="none";}
 if(expanded||spelling)return;
 skip=0;
 spelling=1;
 block.onclick=function(){skip+=1}
}
 let textcontents=[];//Array.prototype.map.call(block.childNodes,item=>{if(item.nodeName!=="#text"){if(item.style)item.style.visibility="collapse";else if(item.setAttribute)item.setAttribute("style","visibility:collapse")}else{let textcontent=item.textContent;item.textContent="";return textcontent/*.replace(/^\n+|\n+$/gm,'')*/;}})
 for(let item of block.childNodes){if(item.nodeName!=="#text"){if(item.style)item.style.visibility="collapse";else if(item.setAttribute)item.setAttribute("style","visibility:collapse")}else{textcontents.push(item.textContent/*.replace(/^\n+|\n+$/gm,'')*/);item.textContent=""}}
 let textindex=0;
 for(let item of block.childNodes)
{if(item.nodeName==="#text")
{let text=textcontents[textindex++];
 let char;
 if(typeof text!=="undefined")
 for(let index=0;char=text.charAt(index);index++)
 if(skip<2){await new Promise(resolve=>setTimeout(resolve,skip?0:index%3?index%12?100:600:200));/*typenoise(char.charCodeAt(0));*/item.textContent+=char;}
 else{item.textContent+=text.substring(index);index=text.length-1}
}else if(item.getAttribute&&item.getAttribute("name")=="quote"||item.nodeName==="SVG"){item.style.visibility="visible";}
 else{if(item.style)item.style.visibility="visible";await spell(item,true);}
}
 if(!recursion)block.onclick=null,skip=0,spelling=0;
}

async function read(title)
{if(title.getAttribute('fetched')=="true")return spell(title.nextSibling);
 insert(null,title,true);
 fetch(title.getAttribute('name')).then(file=>file.text()).then(deform).then(function(text)
{title.nextSibling.remove();
 title.setAttribute('fetched',true);
 title.parentNode.insertBefore(document.createElement("span"),title.nextSibling).innerHTML=text;
 read(title)
})
}

var spelling=0,skip=0;