import clock from "./Blik_2020_time.js";
import network,{conceive,subceive} from "./Blik_2020_network.js";
import {calendar} from "./Blik_2020_chart.js";
import * as d3 from './Bostock_2020_d3v6.js';
import {window,scan,vectors,awesome,note,svgns} from './Blik_2020_document.js';
import {get} from "./Blik_2020_form.js";

export default async function(backlog)
{//let classic=await dashboard(backlog.children[1].leaves().map(({data,title})=>
 //Object.assign(data[title],{name:title})));
 //classic.style.marginTop="50px";
 backlog=conceive(backlog);
 let matrix=await network(backlog,{spread:"left",still:true,cluster:true});
 let board=scan({div:
 {class:"board",div:
[{div:{class:"chart"}}
,{matrix,id:"matrix",title:"SEI_2020_course_development_matrix.json",style:"max-width:100vw;overflow:scroll;position:relative;"}
//,{roles,id:"roles",style:"max-width:100vw;overflow:scroll;"}
]}              });
 let progress="./SEI_2020_course_development_matrix_log.json";
 let meetings="google/calendar/k0344ccen5stls0gib4isugdlc@group.calendar.google.com/data/items?maxResults=10&timeMin=2020-11-01T00:00:00.000Z";
 let chart=await get({name:[progress,meetings],transform:"calendar","domain":["start","dateTime"]},board.querySelector("div.chart"),true);
 let heights=[board.querySelector("div#matrix>svg"),chart].map(part=>Number(part.getAttribute("height")));
 chart.setAttribute("style","overflow:visible;transform:translate(0,"+heights.reduce((matrix,chart)=>matrix+chart/2)+"px)");
 let ruler={height:heights[0],y:-heights[0]+heights[1]/2};
 Array.from(chart.querySelectorAll("rect.ruler")).forEach(rect=>
 Object.entries(ruler).forEach(entry=>rect.setAttribute(...entry)));
 Array.from(chart.querySelectorAll("text.ruler")).forEach(text=>
 text.parentNode.insertBefore(text.cloneNode(true),text).setAttribute("y",ruler.y+17))
 //for(let child of Array.from(chart.childNodes))
//{if(child.nodeName.toLowerCase()=="g")
// chart.setAttribute("transform","translate("+[200,board.querySelector("svg").getAttribute("height")]+")");
// board.querySelector("svg").appendChild(chart);
//}
 while(!window.subject.room)
 await new Promise(resolve=>setTimeout(resolve,300));
 await Promise.resolve(window.subject.room);
 return board;
}

function put(body)
{Object.entries({join:room,put:{room,body}}).forEach(entry=>
 window.subject.room.emit(...entry))
};

function update(record)
{this.classList[record?"add":"remove"]("record");
 if(this.closest("div.board"))
 d3.select(this.closest("div.board").querySelector("#tasks svg")).select("g.nodes").selectAll("g.node").on("click",(click,node)=>!node.children&&update.bind(this)(node))
 while(this.firstChild)this.firstChild.remove();
 this.onclick=record?undefined:call=>update.bind(this)({data:{name:"",parent:"",description:"",responsible:"",progress:0,post:Date.now()}});
 if(!record)
 return this.appendChild(scan({svg:{width:"3em",style:"fill:var(--isle);cursor:pointer;",...vectors.plus.svg}})).parentNode;
 Object.entries(record.data||record).forEach(([key,value])=>
{if(!["post","responsible","name","progress","parent","description"].includes(key))
 return;
 let time=["put","post"].includes(key);
 value=!time?value||"-":!value?"":
 clock(new Date(value),"date").substring(0,19);
 let field=this.querySelector("."+key)||this.appendChild(label([key,value]));
 if(!field)return;
 if(["select","input"].includes(field.nodeName.toLowerCase()))
 return field.value=value;
 field.querySelector("span").textContent=value;
})
 let trash=this.querySelector(".trash");
 if(!trash)
 trash=this.appendChild(scan(awesome["fas fa-trash"]));
 trash=this.lastChild;
 trash.addEventListener("click",call=>update.bind(this)());
 trash.classList.add("trash");
 trash.style.width="1em";
 return this;
};

function label([key,value],record)
{let [pencil,check]=["fas fa-pencil-alt","fas fa-check"].map(name=>awesome[name].replace(/^<svg /,'<svg height="1em" class="pencil" fill="var(--text)" '));
 let select=["responsible","parent","progress"].includes(key);
 let time=["put","post"].includes(key);
 let field=scan(select
?{select:
 {name,class:name,option:
 {progress:Array(11).fill(0).map((zero,index)=>index*10)
 ,responsible:["","Sponsor","Manager","Coordinator","Technician","Expert","Instructor","Leader","Writer","Author","Tester","Editor","Designer","Producer"]
 ,parent:["module","admin"]
 }[key].map(option=>({"#text":option,value:option,selected:option==value}))
 }
 }
:key=="name"
?{p:{class:key,span:{"#text":value||"-"},"#text":pencil}}
:{span:{class:key,span:{"#text":value||"-"},"#text":time?undefined:pencil}});
 d3.select(field).on(select?"change":"click",edit).on("keydown",select||function(event)
{if(event.keyCode!=13)return;
 event.preventDefault();
 this.click();
})
 return field;
}

function edit({type})
{let select=type=="change";
 if(!this.classList.contains("trash")&&!select)
{let editing=this.getAttribute("contenteditable")=="true"
?this.removeAttribute("contenteditable")
:!this.setAttribute("contenteditable",true);
 let [pencil,check]=["fas fa-pencil-alt","fas fa-check"].map(name=>awesome[name].replace(/^<svg /,'<svg height="1em" class="pencil" fill="var(--text)" '));
 this.replaceChild(scan(editing?check:pencil),this.querySelector(".pencil"));
 if(editing)
 return [window.getSelection(),"removeAllRanges","addRange"].reduce((focus,method,index)=>
 !focus[method](index==2&&[window.document.createRange(),"Start","End"].reduce((range,side,index)=>
 !range["set"+side](this.querySelector("span").firstChild,[0,this.textContent.length][index-1])&&range))&&focus);
}let record=d3.select(this.closest("div.record"));
 let datum=record.datum();
 let deleting=this.classList.contains("trash");
 if(!deleting)
 record.datum(Object.assign(datum,{[this.classList[0]]:this[select?"value":"textContent"]||undefined,put:Date.now()}));
 let body=this.closest("div#dashboard").selectAll("div.record").data();
 if(deleting)
 if(confirm("Delete "+datum.name+"?"))
 body=note(body,datum).filter(record=>record!=datum);
 else return;
 put(body);
};

async function dashboard(backlog)
{let room="SEI_2020_course_development.json";
 let states=["new","pending","done"];
 let members=["","Ray","Patrick","Anthony","Robert","Lax","Rom","Nathan","Dali","Reid"];
 let put=body=>Object.entries({join:room,put:{room,body}}).forEach(entry=>window.subject.room.emit(...entry));
 let style="text-align:center;display:block;background-color:var(--isle);border-radius:10px;cursor:pointer;max-width:"+100/states.length+"vw;padding:10px;";
 let tr=["th","td"].map((row,td)=>({[row]:states.map(id=>td?{id,style:"text-align:center"}:{"#text":id})}));
 Object.assign(tr[1].td[0],{div:{id:"plus",class:"card",style:"padding:0;background-color:transparent;display:inline-block;border-radius:50%;",svg:{...vectors.plus.svg,width:"3em",style:"fill:var(--isle);cursor:pointer;"}}});
 let table=scan({table:{id:"dashboard",style:"margin:auto",tr}});
 table.querySelector("#plus").onclick=call=>put(records.data().concat({progress:0,post:Date.now()}).map((record,index)=>
 Object.assign(record,{index})))
 let index=({index})=>index;
 let records=d3.select(table).selectAll("div.record").data(backlog,index).enter();
 let select=([name,options,selected])=>({name,class:name,option:options.map(value=>({"#text":value,value,selected:value==selected}))});
 await Promise.resolve(awesome);
 let [pencil,check]=["fas fa-pencil-alt","fas fa-check"].map(name=>awesome[name].replace(/^<svg /,'<svg height="1em" class="pencil" fill="var(--text)" '));
 let edit=function({type})
{let select=type=="change";
 if(!this.classList.contains("trash")&&!select)
{let editing=this.getAttribute("contenteditable")=="true"
?this.removeAttribute("contenteditable")
:!this.setAttribute("contenteditable",true);
 this.replaceChild(scan(editing?check:pencil),this.querySelector(".pencil"));
 if(editing)
 return [window.getSelection(),"removeAllRanges","addRange"].reduce((focus,method,index)=>
 !focus[method](index==2&&[window.document.createRange(),"Start","End"].reduce((range,side,index)=>
 !range["set"+side](this.querySelector("span").firstChild,[0,this.textContent.length][index-1])&&range))&&focus);
}let card=d3.select(this.closest("div"));
 let datum=card.datum();
 let deleting=this.classList[0]=="trash";
 if(!deleting)
 card.datum(Object.assign(datum,{[this.classList[0]]:this[select?"value":"textContent"]||undefined,put:Date.now()}));
 let body=records.data();
 if(deleting)
 if(confirm("Delete "+datum.name+"?"))
 body=note(body,datum).filter(record=>record!=datum);
 else return;
 put(body);
};
 let enter=({status,progress,name,responsible,description,post,deadline})=>
{let card=scan(
 {div:
 {style,class:"record card"
 ,p:{class:"name",span:{"#text":name||"-"},"#text":pencil}
 ,span:
[{class:"description",span:{"#text":description||"-"},"#text":pencil}
,{class:"post",span:{"#text":""}}
],select:
[["responsible",members,responsible]
,["progress",Array(11).fill(0).map((zero,index)=>index*10),progress]
].map(select)
 ,"#text":awesome["fas fa-trash"].replace(/^<svg /,"<svg class='trash' width='1em' ")
 }
 });
 Object.keys({progress,name,responsible,description}).concat("trash").map(key=>
 Array.from(card.querySelectorAll("."+key))).flat().forEach(function(field)
{let select=["select","input"].includes(field.nodeName.toLowerCase());
 d3.select(field).on(select?"change":"click",edit).on("keydown",select||function(event)
{if(event.keyCode!=13)return;
 event.preventDefault();
 this.click();
})
});
 return card;
};
 let update=function(record)
{let group=table.querySelector("#"+states[record.progress?record.progress==100?2:1:0])
 group.prepend(this);
 Object.entries(record).forEach(([key,value])=>
{if(["put","post"].includes(key))
 value=!value?"":clock(new Date(value),"date").substring(0,19);
 else value=value||"-"
 let part=this.querySelector("."+key);
 if(!part)return;
 if(["select","input"].includes(part.nodeName.toLowerCase()))
 return part.value=value;
 part.querySelector("span").textContent=value;
})
 return this;
};
 records=records.select(enter).each(update);
 if(!window.subject)return table;
 await new Promise(function wait(resolve)
{setTimeout(tick=>(tick=window.subject.room)?resolve(tick):wait(resolve))
},300);
 window.subject.room.on("put",function({body})
{window.Tone.Transport.start();
 records=records.data(note(body),index).join(
 selection=>selection.select(enter).each(update)
,selection=>selection
,selection=>selection.remove()).each(update);
});
 window.subject.room.emit("join",room);
 return table;
}

function enter(node)
{if(!node)
 return scan(
 {div:
 {id:"plus",class:"card",style:"background-color:transparent;padding:0;display:inline-block;border-radius:50%;"
 ,svg:{width:"3em",style:"fill:var(--isle);cursor:pointer;",...vectors.plus.svg}
 }
 })
 let {parent,name,status,progress,responsible,description,post,deadline}=node.data||node;
 let [pencil,check]=["fas fa-pencil-alt","fas fa-check"].map(name=>awesome[name].replace(/^<svg /,'<svg height="1em" class="pencil" fill="var(--text)" '));
 let select=([name,options,selected])=>({name,class:name,option:options.map(value=>({"#text":value,value,selected:value==selected}))});
 let roles=["","Sponsor","Manager","Coordinator","Technician","Expert","Instructor","Leader","Writer","Author","Tester","Editor","Designer","Producer"];
 let parents=["module","admin"];
 let record=scan(
 {div:
 {style:"text-align:center;background-color:var(--isle);border-radius:10px;cursor:pointer;max-width:"+100/3+"vw;padding:10px;transition:all 0.5s"
 ,class:"card"
 ,p:{class:"name",span:{"#text":name||"-"},"#text":pencil}
 ,span:
[{class:"description",span:{"#text":description||"-"},"#text":pencil}
,{class:"post",span:{"#text":""}}
],select:
[["responsible",roles,responsible]
,["progress",Array(11).fill(0).map((zero,index)=>index*10),progress]
,["parent",parents,parent]
].map(select)
 ,"#text":awesome["fas fa-trash"].replace(/^<svg /,"<svg class='trash' width='1em' ")
 }
 });
 Object.keys({progress,name,responsible,description}).concat("trash").map(key=>
 Array.from(record.querySelectorAll("."+key))).flat().forEach(function(field)
{let select=["select","input"].includes(field.nodeName.toLowerCase());
 d3.select(field).on(select?"change":"click",edit).on("keydown",select||function(event)
{if(event.keyCode!=13)return;
 event.preventDefault();
 this.click();
})
});
 return record;
};