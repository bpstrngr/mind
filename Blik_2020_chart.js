import {note,route,compose,window} from "./Blik_2020_platform.js";
import {document,color,vectors,awesome,namespaces} from "./Blik_2020_fragment.js";
import * as d3 from './Bostock_2020_d3v6.js';
import clock from "./Blik_2020_time.js";

export async function model(source)
{//var model=await fetch(source).then(resource=>resource.json());
 if(source.bait)source=vectors;
 let r=400;
 var space=window.document.createElement("div");
 space.style="height:100vh;width:100vw;position:relative;";
 space.appendChild(document(source.car_front).next().value).style=center+"width:200px;";
 let models=Object.keys(source);
 models.forEach(function(item,index)
{//index++;
 let ratio=((models.length/2-index)/models.length);
 if(item.startsWith("road_"))space.appendChild(document(source[item]).next().value).style=center+"width:70px;transform:translate("+ratio*r+"px,"+Math.abs(ratio*r)+"px)"
})
 return space
}

export async function column(history)
{let graph=window.document.createElement("div");
 graph.style.whiteSpace="pre";
 graph.style.color="white";
 graph.style.paddingLeft="20%";
 let line=graph.appendChild(window.document.createElement("div"));
 line.style.position="absolute";line.style.zIndex="-1";line.style.top=0;line.style.left=window.innerWidth/5+65+"px";line.style.height=0;line.style.width="2px";line.style.backgroundColor="#9E9E9E";
 let days=0,year=0,origin=0,last=null;
 Object.keys(history).reduce(function(graphic,entry,index)
{console.log(history[entry]);
 let previous=days;console.log("previous",previous)
 if(entry.substring(0,4)!=year)
{year=entry.substring(0,4);
 if(!index)origin=year*365;
 var yearmark=graphic.appendChild(window.document.createElement("span"));
 yearmark.appendChild(window.document.createTextNode(year+"\n"));
 days=(year*365)-origin-previous;console.log("yearmark delta",days)
 yearmark.style.display="block";yearmark.style.marginTop=days/5+"px";yearmark.style.marginLeft="-4em";yearmark.style.fontSize="2em";yearmark.style.fontFamily="ranger";yearmark.style.fontWeight="800";
 previous=previous+days;
}
 let timestamp=graphic.appendChild(window.document.createElement("span"));
 timestamp.appendChild(window.document.createTextNode(entry.substring(4)));
 timestamp.style.verticalAlign="middle";timestamp.style.display="inline-block";
 days=(year*365)+((((new Number(entry.substring(4,6))-1)/12))*365)+(new Number(entry.substring(6)));console.log(days,origin,previous)
 days=days-origin-previous;console.log("relative days",days)
 document(history[entry].icon,graphic).next().value;
 last=graphic.childNodes[graphic.childNodes.length-1];
 last.style.width="80px";last.style.height=last.style.width;last.style.padding="5px";last.style.marginTop=days/5/2+"px";last.style.marginBottom=last.style.marginTop;last.style.borderRadius=last.style.borderRadius?last.style.borderRadius:"50%";last.style.verticalAlign="middle";last.style.backgroundImage="radial-gradient(black 50%,transparent 70%)";
 if(last.nodeName=="IMG")last.onload=function()
{if(this.naturalHeight-this.naturalWidth>10){this.style.width="auto";let fit=((this.naturalHeight-this.naturalWidth)/4.5)+"px";console.log(fit);this.style.paddingLeft=fit,this.style.paddingRight=fit}
 //else if(this.naturalWidth-this.naturalHeight>10){this.style.width="auto";let fit=((this.naturalWidth-this.naturalHeight)/4)+"px";console.log(fit);this.style.paddingLeft=fit,this.style.paddingRight=fit}
}
 graphic.appendChild(window.document.createTextNode(history[entry].description));
 graphic.appendChild(window.document.createTextNode("\n"));
 days=previous+days;console.log("absolute days",days);
 if(!index)line.style.top=days/5+80+"px";
 line.style.height=days/5+92 *(index+1)+"px";
 return graphic
},graph);
 return graph;
}

export async function row(source)
{//var model=await fetch(source).then(resource=>resource.json());
 if(typeof source=="string"||source instanceof String)
 try{source=JSON.parse(source);}
 catch(fail){return window.document.createTextNode(fail.toString());}
 let homogenous=Object.entries(source).reduce((variety,[key,value])=>variety.add([...key].every(char=>char==char.toUpperCase())?"heading":key.includes("(")?"compound":"entry"),new Set()).size==1;
 return Object.entries(source).reduce(function put(frame,[key,value],index,items)
{if(typeof value=="object"&&(typeof value[Object.keys(value)[0]]=="string"))//.startsWith("<"))
 return Object.entries(value).reduce(put,frame);
 let piece=typeof value=="string"
?value[0]=="<"
?window.window.document.createRange().createContextualFragment(value).firstChild
:document({"td":{...[{},{"div":value.length?{"img":{"src":value,"onload":"let verticality=event.target.naturalHeight-event.target.naturalWidth,normalverticality=verticality/event.target[verticality>0?'naturalHeight':'naturalWidth'];event.target.style[verticality>0?'width':'height']='100%';event.target.style[verticality>0?'marginTop':'marginLeft']=(normalverticality/2)*(verticality>0?-1:1)*(100+Math.abs(normalverticality)*100)+'%';"}}:undefined},{"span":{"#text":key,"style":"display:block;white-space:pre;"+([...key].every(char=>char==char.toUpperCase())||!key.includes("(")?"font-weight:700":undefined)}}].sort(()=>homogenous?0:-1).reduce((td,props)=>({...td,...props})),"style":"text-align:center"}}).next().value
:document(value).next().value;
 if(!piece)console.log(key,value);
 piece=frame.appendChild(piece);
 if(piece.nodeName.toUpperCase()=="SVG")
 piece.appendChild(window.window.document.createElementNS("http://www.w3.org/2000/svg","title")).textContent=key;
 //piece.style.width=piece.style.width||window.innerWidth/(items.length+1)*(items.length<window.innerWidth/50?1:(items.length/50));
 //if(value.length)piece.querySelector("img").onload=(event)=>{let canvas=window.document.createElement("canvas");canvas.width=event.target.naturalWidth,canvas.height=event.target.naturalHeight;canvas.getContext("2d").drawImage(event.target,0,0);}})
 if(piece.setAttribute)piece.setAttribute("title",key);
 piece.id=key.replace(" ","_");
 return frame//.closest('table')
},document({"table":{"tbody":{"tr":{}},"class":homogenous?"homogenous":"heterogenous"}}).next().value.childNodes[0].childNodes[0]).closest("table");
}

export function table(source,depth,palette)
{depth=typeof depth=="number"?depth:2;
 palette=palette||(Object.keys(source)[0]=="CICES"?["rgb(247, 194, 35,0)","rgba(27,154,89,0)","rgba(66,133,244,0)"]:["transparent"]);
 let top=Object.entries(source).reduce((row,[key,value],index,records)=>
{let shade=depth>2&&Array.isArray(palette)?d3.scaleLinear().range([palette[index],(palette[index]||palette[0]||spectrum(index/records.length).replace(")","0)")).replace("0)","1)")]):palette;
 row=row.appendChild(window.document.createElement("tr"));
 row.appendChild(window.document.createElement("td")).appendChild(window.document.createElement("span")).textContent=key;
 row.appendChild(document({"td":{"style":"text-align:center;width:150px;"}}).next().value).appendChild(typeof value=="string"
?document({"span":{"#text":value,"style":"background-color:"+(typeof value=="string"?value.match(/\d+/)?color.rainbow((15-new Number(new Number(value.match(/\d+/)[0]))+1)/20)+";color:#212121;":"black;color:#848484;":"transparent;")+"border-radius:1em 1em 1em 1em;height:1em;padding:0 5px 0 5px;white-space:nowrap"}}).next().value
:table(value,depth+1,shade));
 if(depth>2)row.style.backgroundColor=shade(1/depth);
 return row.parentNode
},window.document.createElement("table").appendChild(window.document.createElement("tbody")));
 if(depth==2)
 top.lastChild.appendChild(window.document.createElement("td")).appendChild(window.document.createElement("span")).textContent=Object.keys(source)[0]=="CICES"?"adaptáció":Object.keys(source)[0]=="functional ecology"?"ecological economics":"ökológiai közgazdaságtan";
 return top.parentNode;
}

export async function matrix(source)
{if(awesome.constructor.name=="Promise")await awesome;
 source=source.sort((past,next)=>next.path.slice(-1)[0]=="provider"?-1:0).sort((past,next)=>next.path.slice(-1)[0]=="service"?-1:0).sort((past,next)=>next.path.slice(-1)[0]=="stakeholder"?-1:0);
 let translation={"attraction":"látványosság","intelligence":"világkép","recreation":"feltöltődés","identity":"identitás","hay":"széna","air":"tiszta levegő","nectar":"nektár","herbs":"gyógynövény","invasion":"invázió","construction":"épitkezés","biking":"motorozás","forestation":"cserjésedés","civilisation":"civilizáció","litter":"szemetelés","trampling":"taposás","desolation":"elhanyagolás","reaping":"kaszálás","policy":"szabályozás","arson":"gyújtogatás","pollution":"szennyezés","desertification":"sivatagosodás","conflict":"konfliktus","fire":"tűz","lumbering":"favágás","grazing":"legeltetés","oakforest":"tölgyes","marsh":"láp","lake":"tó","meadow":"rét","diversity":"sokféleség","terrain":"domborzat","greenness":"zöldfelület","scenery":"kilátás","moisture":"nedvesség","shooting_range":"lőtér","palacepark":"kastélykert","scrubs":"cserjés","glades":"tisztás","kurjancs":"kurjancs","residents":"helyiek","government":"önkormányzat","associations":"egyesületek","hikers":"kirándulók","rangers":"Nemzeti Park","owners":"tulajdonosok","youth":"fiatalok","ministry":"állam","palace_director":"kastélyigazgató","teachers":"tanárok","secondary_residents":"kiköltözők","scientists":"kutatók","athletes":"sportolók","artists":"művészek","guardians":"mezőőrség","farmers":"gazdálkodók","health-conscious":"egészségtudatosak"};
 let matrix=source.map((concept,index,concepts)=>[new Array(concepts.length),...Object.entries(concept.relations||{})].reduce((record,[target,vector])=>{record[source.findIndex(({name})=>name==target)]=vector;return record}));
 let table=document({"table":{"class":"adjacency","tbody":{}}}).childNodes[0];
 ["",...source].reduce((header,{name},index)=>document({"td":{"span":{"#text":translation[name]||name,"span":index?{"img":{"src":"icon/"+name+".png","onload":"let verticality=event.target.naturalHeight-event.target.naturalWidth,normalverticality=verticality/event.target[verticality>0?'naturalHeight':'naturalWidth'];event.target.style[verticality>0?'width':'height']='100%';event.target.style[verticality>0?'marginTop':'marginLeft']=(normalverticality/2)*(verticality>0?-1:1)*(100+Math.abs(normalverticality)*100)+'%';"},"style":"background-color:"+colors[(Object.values(source)[index-1]||{path:[]}).path.slice(-1)](0)}:{"#text":""}}}},header),table.appendChild(window.document.createElement("tr"))).id="header";
 ["",...source].reduce((row,concept,index)=>document({"td":{"#text":index||""}},row),table.appendChild(window.document.createElement("tr")))
 matrix.forEach((record,index)=>
{[table.appendChild(window.document.createElement("tr")),index+1,...record,index+1
 ].reduce((row,vector,field)=>document({"td":{"#text":field>1&&(field-2<matrix.length)?(vector||0).toFixed(1).toString().replace("0.0",""):vector,"style":(field<2||matrix.length+1<field)||("border:none;background:"+colors[source[field-2].path.slice(-1)](0).replace(")",",0.5)")+" linear-gradient(to bottom,"+((colors[source[index].path.slice(-1)](0).replace(")",",0.5))")).repeat(2).replace(")",",")))}},row));
});
 ["",...matrix].reduce((row,field,index)=>document({"td":{"#text":index||field}},row),table.appendChild(window.document.createElement("tr")));
 function exposure(index,weight){return matrix.reduce((value,record)=>value+(weight?record[index]||0:(record[index]>0)),0)}
 function imposure(index,weight){return matrix[index].reduce((value,field)=>value+(typeof weight=="number"?(field||0)*weight:weight?field||0:(field>0)),0)}
 function sum(row,count){return Array.from(row.childNodes).slice(1,matrix.length+1).reduce((sum,field,index,record)=>sum+(count?new Number(field.textContent)>0:new Number(field.textContent)>0?new Number(field.textContent):0),0)}
 let input=table.appendChild(window.document.createElement("tr"));input.setAttribute("id","input");
 let output=table.appendChild(window.document.createElement("tr"));output.setAttribute("id","output");
 [document(vectors["door_enter"]).outerHTML,...matrix.map((record,index)=>exposure(index)||awesome["fas fa-satellite-dish"]),0].reduce((row,field,index)=>document({"td":{"#text":index?index>matrix.length?(sum(row)/matrix.length).toFixed(2)+" ("+((sum(row)/(matrix.length*(matrix.length-1)))*100).toFixed(2)+"%)":field:field,"style":"white-space:nowrap"}},row),input);
 [document(vectors["door_leave"]).outerHTML,...matrix.map((record,index)=>imposure(index)||awesome["fas fa-satellite"]),0].reduce((row,field,index)=>document({"td":{"#text":index?index>matrix.length?(sum(row)/matrix.length).toFixed(2)+" ("+((sum(row)/(matrix.length*(matrix.length-1)))*100).toFixed(2)+"%)":field:field,"style":"white-space:nowrap"}},row),output);
 let ratio=table.appendChild(window.document.createElement("tr"));ratio.setAttribute("id","ratio");
 ["i/o",...matrix.map((record,index)=>exposure(index)/imposure(index)),0].reduce((row,field,index)=>document({"td":{"#text":index?index>matrix.length?(sum(row)/sum(row,true)).toFixed(2):field==Infinity?awesome["fas fa-flag-checkered"]:field>0?field.toFixed(1):awesome["fas fa-flag-checkered"]:field}},row),ratio);
 input=table.appendChild(window.document.createElement("tr"));input.setAttribute("id","exposure");
 output=table.appendChild(window.document.createElement("tr"));output.setAttribute("id","imposure");
 [document(vectors["scale_imbalanced"]).outerHTML,...matrix.map((record,index)=>exposure(index,true).toFixed(1)),0].reduce((row,field,index)=>document({"td":{"#text":index?index>matrix.length?(sum(row)/matrix.length).toFixed(3):field:field,"style":matrix.length<index||!index?undefined:"color:"+(["provider","hazard"].includes(source[index-1].path.slice(-1)[0])?"#c62828":"#2e7d32")}},row),input);
[document({svg:{...vectors["scale_imbalanced"].svg,"style":"transform:scaleX(-1)"}}).outerHTML
,...matrix.map((record,index)=>imposure(index,true).toFixed(1))
,0
].reduce((row,field,index)=>document({"td":{"#text":index?index>matrix.length?(sum(row)/matrix.length).toFixed(3):field:field,"style":matrix.length<index||!index?undefined:"color:"+(["hazard","stakeholder"].includes(source[index-1].path.slice(-1)[0])?"#c62828":"#2e7d32")}},row),output);
 let balance=table.appendChild(window.document.createElement("tr"));balance.setAttribute("id","balance");
["I/O"
,...matrix.map((record,index)=>(exposure(index,true)/imposure(index,true)).toFixed(1))
,0
].reduce((row,field,index)=>
 document({"td":{"#text":index?index>matrix.length?(sum(row)/sum(row,true)).toFixed(2):field==Infinity?"∞":field>0?field:"-":field}},row),balance);
 let model=table.appendChild(window.document.createElement("tr"));model.setAttribute("id","model");
[document(vectors["active_directory"]).outerHTML
,...matrix.map((record,index)=>[imposure(index,true),imposure(index,1/(exposure(index,true)))])
,(12/(matrix.length**3-matrix.length))*matrix.reduce((hierarchy,record,index)=>
 hierarchy+(((imposure(index,true)-sum(output))/matrix.length)**2),0)
].reduce((row,field,index)=>
{if(index)peer.bar(field.map?field.map((outdegree,index,inference)=>outdegree==Infinity?inference[0]:outdegree):[],true).then(bar=>
 index>matrix.length?document({"td":{"#text":(field*100).toFixed(2)+"%"}},row):document(
 {"td":
 {"#text":bar.outerHTML.replace(/\#2e7d32/g,["stakeholder","hazard"].includes(source[index-1].path.slice(-1)[0])?"#c62828":"#2e7d32")+document(
 {"span":
 {"#text":(field[1]-field[0]).toFixed(1).toString().replace(/.*/,d=>["0.0","Infinity"].includes(d)?"":d[0][0]=="-"?d.substring(1):d)
 ,"style":"position:absolute;left:0;right:0;top:0;margin:auto;transform:translate(0,"+Math.max(...field)*45+"%);color:"+(field[1]-field[0]<0
?["hazard"].includes(source[index-1].path.slice(-1)[0])?"#2e7d32":"#c62828"
:["hazard"].includes(source[index-1].path.slice(-1)[0])?"#c62828":"#2e7d32")
 }
 }).outerHTML,"style":"position:relative;"
 }
 },row));
 return index?row:document({"td":{"#text":field}},row)
},model);
 //[awesome["fas fa-cog"],...matrix.map((record,index)=>""/*(1-1/(1+Math.E**(exposure(index,true)*-1)))*/)].reduce((row,field,index)=>{index?bar(field,true).then(bar=>document({"td":{"#text":bar.outerHTML.replace(/#2e7d32/g,["provider","hazard"].includes(Object.values(source)[index-1].path.slice(-1))?"#c62828":"#2e7d32")+document({"span":{"#text":field.toFixed(1),"style":"position:absolute;left:0;right:0;top:0;bottom:0;margin:auto;"}}).outerHTML,"style":"position:relative"}},row)):document({"td":{"#text":field}},row);return row},table.appendChild(window.document.createElement("tr")));
 return table.parentNode;
}

export async function bar(source,negative)
{let svg=d3.create("svg").attr("viewBox",negative?"0 0 2 2":"0 0 1 1").attr("style","overflow:visible");
 let x=d3.scaleLinear().domain([0,1]).range([0,1]);
 let y=d3.scaleLinear().domain([negative?-1:0,1]).range([negative?-1:0,source]);
 svg.selectAll("rect").data(source).enter().append("rect").attr("fill","#2e7d32").attr("stroke-width",0).attr("x",(d,i)=>x(i)).attr("y",d=>d>0?0:0).attr("height",d=>Math.abs(d)).attr("width",1);
 return svg.node();
}

export async function spreadsheet(sheet,{put})
{var daynight=["#00838f","#f57c00","#00838f"];
 var spectrum=d3.scaleLinear().range(daynight).domain(Array.apply(null,Array(daynight.length--)).map((item,index)=>index/(daynight.length)).reverse());
 var columns=["B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA","AB","AC","AD"];
 let {data:{values,range},config:{url}}=sheet;
 let checked={TRUE:true,FALSE:false};
 let checkboxrangestart=values.findIndex(row=>row.some(value=>checked[value]!=undefined));
 let checkboxrangeend=values.findIndex((row,index)=>(9<index)&&(checked[row[3]]==undefined));
 let tr=values.map(function(row,line,lines)
{let td=row.map(function(field,column,{length})
{let boolean=!isNaN(checked[row[column]]);
 let style=line&&["H","N","T","Z"].includes(columns[column])&&boolean?"border-right:2px solid var(--isle);":"";
 //if(length-1!=column&&[checkboxrangestart,checkboxrangeend].includes(line)&&boolean)style+="border-bottom:2px solid var(--isle);";
 let heading=column+1==length||!column;
 if(heading)style+="cursor:pointer;";
 let town=line&&(line+1!=lines.length)&&(line<checkboxrangestart||line>checkboxrangeend);
 //if(heading&&timezone)style+="color:var(--isle);";
 let locked=row[length-1].startsWith("🔒");
 let disabled=!put||locked;
 let id=columns[column]+(line+1);
 if(checked[field]!==undefined)
 return {input:{type:"checkbox",checked:checked[field],disabled,id},style:"border:2px solid transparent;"+style}
 let color=length-1>column&&column?"background-color:"+spectrum(Number(field)/24):"";
 return (
 {...line&&heading&&
 {onclick:"let {style}=this.closest('tr');setTimeout(()=>style.display='none',(style.opacity=0)+500);"
 ,title:column&&!town?locked?"unlock":"lock":"hide"
 }
 ,id
 ,"#text":field
 ,style:style+"font-weight:800;text-align:"+(!town&&heading&&line?column?"left":"right":"center")+";white-space:nowrap;"+(lines.length-1!=line&&line?color:"")
 });
});
 return {td,style:"line-height:1.7em;opacity:1;transition:all 0.5s;"}
});
 let sums=values.pop();
 tr.push({td:await Promise.all(sums.map(field=>bar(field).then(svg=>({svg}))))})
 //tr.push({td:{"#text":"sign out",onclick:click=>gapi.auth2.getAuthInstance().signOut()}})
 let table=document(
 {div:
 {style:"max-width:100%;overflow:scroll;padding-bottom:"+values.reduce((count,row)=>
 row.some(value=>["TRUE","FALSE"].includes(value))?count+1:count,0)*18+"px"
 ,table:{cellspacing:"0",style:"margin:auto",tbody:{tr}}
 }
}).next().value;
 let spreadsheetId=url.match(/sheets\/([^\/]+)\/values/)[1];
 let edit=async({target})=>
{let boolean=target.checked!=undefined;
 note(await fetch("google/sheets"
,{method:"put",headers:{"Content-Type":"application/json"},body:JSON.stringify(
 {spreadsheetId,range:range.split("!").reduce(page=>page+"!"+target.id)
 ,resource:{values:[[boolean?target.checked:target.textContent]]}
 ,valueInputOption:"RAW"
 })
}));
 if(!boolean)return;
 let column=target.id.match(/[a-zA-Z]*/)[0];
 let index=columns.indexOf(column);
 let rows=Array.from(target.closest("tbody").querySelectorAll("tr"));
 let lastrow=rows.pop();
 sums[index]=Number(sums[index])+(target.checked?1:-1);
 Array.from(rows.pop().querySelectorAll("td"))[index].textContent=sums[index];
 bar(String(sums[index])).then(svg=>
{Array.from(lastrow.querySelectorAll("td"))[index].remove();
 let cell=window.document.createElement("td");
 cell.appendChild(svg);
 lastrow.insertBefore(cell,Array.from(lastrow.querySelectorAll("td"))[index])
});
};
 let lock=async({target})=>
 (target.textContent=target.textContent.replace(/🔒|🔓/,match=>match=="🔓"?(target.title="unlock")&&"🔒":((target.title="lock")&&"🔓")))&&
 edit({target})&&
 Array.from(target.closest("tr").querySelectorAll("input")).forEach(input=>input.disabled=target.textContent.startsWith("🔒"));
 Array.from(table.querySelectorAll("input")).forEach(input=>input.onchange=edit);
 Array.from(table.querySelectorAll("tr")).slice(checkboxrangestart,checkboxrangeend).forEach(row=>
 Array.from(row.querySelectorAll("td")).pop().onclick=lock);
 window.document.querySelector("img").onclick=()=>
 Array.from(table.querySelectorAll("tr")).forEach(row=>Object.assign(row.style,{display:"table-row",opacity:1}));
 window.document.querySelector("img").style.cursor="pointer";
 return table;
}

export async function cumulation(source)
{console.log(source);
 let subjects=Array.from(Object.values(source).reduce((subjects,{occurrence})=>Array.from(occurrence).reduce((s,o)=>s.add(o),subjects),new Set())).map(subject=>({name:subject}));
 subjects=subjects.reduce((subjects,subject)=>[...subjects,{...subject,concepts:Object.values(source).filter(({occurrence})=>Array.from(occurrence).includes(subject.name))}],[]);
 subjects=subjects.reduce((subjects,subject,index)=>[...subjects,{...subject,new:subject.concepts.filter(concept=>!subjects.slice(0,index).reduce((concepts,subject)=>[concepts,...subject.concepts].reduce((concepts,concept)=>concepts.add(concept.name)),new Set()).has(concept.name))}],[]);
 subjects.unshift({name:0,concepts:[],new:[]});
 //console.log(subjects.map(s=>s.new.map(concept=>concept.name)))//.map(s=>s.new.map(c=>c.name)))
 let x=d3.scaleLinear().domain([0,subjects.length-1]).range([0,500]);
 let y=d3.scaleLinear().domain([0,subjects.reduce((sum,d)=>sum+d.new.length,0)]).range([300,0]);
 let svg=d3.create("svg").attr("width",530).attr("height",330).append("g").attr("transform","translate(20,10)");
 svg.append("g").attr("class","x axis").attr("transform","translate(0,300)").call(d3.axisBottom(x));
 svg.append("g").attr("class","y axis").call(d3.axisLeft(y));
 let sum=0;
 //svg.append("path").datum(subjects).attr("class","line").attr("stroke","#616161").attr("stroke-width",1.5).attr("fill","none").attr("d",d3.line().x((d,i)=>x(i)).y(d=>y(d.new.length)));//.curve(d3.curveMonotoneX));
 svg.append("path").datum(subjects).attr("class","line").attr("stroke","#ffc400").attr("stroke-width",1.5).attr("fill","none").attr("d",d3.line().x((d,i)=>x(i)).y(d=>y(sum+=d.new.filter(concept=>concept.path.includes("service")).length)).curve(d3.curveMonotoneX));sum=0;
 let a=svg.selectAll(".a").data(subjects).enter();
 a.append("circle").attr("fill","#ffc400").attr("r","5").attr("cx",(d,i)=>x(i)).attr("cy",d=>y(sum+=d.new.filter(concept=>concept.path.includes("service")).length));sum=0;
 a.append("text").attr("class","a").attr("x",(d,i)=>x(i)).attr("text-anchor","middle").style("font-family","monospace").style("font-size","7px").attr("dy","0.3em").attr("y",function(d){d3.select(this).text(sum+=d.new.filter(concept=>concept.path.includes("service")).length);return y(sum)});sum=0;
 svg.append("path").datum(subjects).attr("class","line").attr("stroke","#2e7d32").attr("stroke-width",1.5).attr("fill","none").attr("d",d3.line().x((d,i)=>x(i)).y(d=>y(sum+=d.new.filter(concept=>concept.path.includes("provider")).length)).curve(d3.curveMonotoneX));sum=0;
 let b=svg.selectAll(".b").data(subjects).enter();
 b.append("circle").attr("fill","#2e7d32").attr("r","5").attr("cx",(d,i)=>x(i)).attr("cy",d=>y(sum+=d.new.filter(concept=>concept.path.includes("provider")).length));sum=0;
 b.append("text").attr("class","b").attr("x",(d,i)=>x(i)).attr("text-anchor","middle").style("font-family","monospace").style("font-size","7px").attr("dy","0.3em").attr("y",function(d){d3.select(this).text(sum+=d.new.filter(concept=>concept.path.includes("provider")).length);return y(sum)});sum=0;
 svg.append("path").datum(subjects).attr("class","line").attr("stroke","#d32f2f").attr("stroke-width",1.5).attr("fill","none").attr("d",d3.line().x((d,i)=>x(i)).y(d=>y(sum+=d.new.filter(concept=>concept.path.includes("hazard")).length)).curve(d3.curveMonotoneX));sum=0;
 let c=svg.selectAll(".c").data(subjects).enter();
 c.append("circle").attr("fill","#d32f2f").attr("r","5").attr("cx",(d,i)=>x(i)).attr("cy",d=>y(sum+=d.new.filter(concept=>concept.path.includes("hazard")).length));sum=0;
 c.append("text").attr("class","c").attr("x",(d,i)=>x(i)).attr("text-anchor","middle").style("font-family","monospace").style("font-size","7px").attr("dy","0.3em").attr("y",function(d){d3.select(this).text(sum+=d.new.filter(concept=>concept.path.includes("hazard")).length);return y(sum)});sum=0;
 svg.append("path").datum(subjects).attr("class","line").attr("stroke","#0277bd").attr("stroke-width",1.5).attr("fill","none").attr("d",d3.line().x((d,i)=>x(i)).y(d=>y(sum+=d.new.filter(concept=>concept.path.includes("stakeholder")).length)).curve(d3.curveMonotoneX));sum=0;
 let d=svg.selectAll(".d").data(subjects).enter();
 d.append("circle").attr("fill","#0277bd").attr("r","5").attr("cx",(d,i)=>x(i)).attr("cy",d=>y(sum+=d.new.filter(concept=>concept.path.includes("stakeholder")).length));sum=0;
 d.append("text").attr("class","d").attr("x",(d,i)=>x(i)).attr("text-anchor","middle").style("font-family","monospace").style("font-size","7px").attr("dy","0.3em").attr("y",function(d){d3.select(this).text(sum+=d.new.filter(concept=>concept.path.includes("stakeholder")).length);return y(sum)});sum=0;
 svg.append("path").datum(subjects).attr("class","line").attr("stroke","#D5CBAF").attr("stroke-width",1.5).attr("fill","none").attr("d",d3.line().x((d,i)=>x(i)).y(d=>y(sum+=d.new.length)));sum=0;//.curve(d3.curveMonotoneX));sum=0;
 let e=svg.selectAll(".e").data(subjects).enter();
 e.append("circle").attr("fill","#D5CBAF").attr("r","5").attr("cx",(d,i)=>x(i)).attr("cy",d=>y(sum+=d.new.length));sum=0;
 e.append("text").attr("class","e").attr("x",(d,i)=>x(i)).attr("text-anchor","middle").style("font-family","monospace").style("font-size","7px").attr("dy","0.3em").attr("y",function(d){d3.select(this).text(sum+=d.new.length);return y(sum)});sum=0;
 return svg.node().parentNode;
}

export async function calendar(source,{domain,range,scope})
{let {cumulative}={[range]:true};
 let chart=Object.fromEntries(source.map(value=>
 [new Date(route.call(value,[...domain])).getTime(),value]).filter(([domain])=>
 domain).sort(([past],[next])=>
 (past<next)-1));
 let value=(domain,index)=>cumulative?index+1:route.call(chart[domain],[...Array.isArray(range)?range:[]]);
 let [[head,tail],[min,max]]=[Object.keys(chart),Object.keys(chart).map(value)].map(values=>
 ["min","max"].map(key=>Math[key](...values)));
 note({min,max})
 let [start,end]=scope?scope.map(date=>new Date(date).getTime()):[head,tail];
 let width=700;
 let peak=cumulative?source.length:max;
 let x=d3.scaleLinear().domain([start-(end-start)/5,end+(end-start)/5]).range([0,width]);
 let y=d3.scaleLinear().domain([min,peak]).range([min,peak].map(edge=>edge*5));
 //svg.append("g").attr("class","y axis").call(d3.axisLeft(y));
 //svg.append("path").datum(keys).attr("class","line").attr("stroke","#ffc400").attr("stroke-width",1.5).attr("fill","none").attr("d"
//,d3.line().x(x).y(node=>0).curve(d3.curveMonotoneX));
 let palette={month:"#c62828",now:"#9e9e9e",analysis:"#27c7db",design:"#43a048",development:"#ffcc01",implementation:"#f54437",evaluation:"#9412fe"};
 let ideals=[[start,end],...Array(3).fill([tail,tail+1000*60*60*24*7*8])];
 let svg=d3.select(note(
 document({svg:
 {width,height:y(peak),viewBox:"0 0 "+[width,y(peak)].join(" "),style:"overflow:visible"
 ,g:
 {path:[...ideals,Object.keys(chart)].map((path,index)=>(
 {class:"line","stroke-width":1.5,fill:"none"
 ,stroke:index<4?palette.now:"#ffc400",opacity:index<4?0.5:1
 ,d:d3.line().x(x).y(compose(index<4?(domain,index)=>index?min:peak:value,y))(path)
 }))
 }
 ,defs:Object.entries(palette).forEach(([id,value])=>(
 {linearGradient:
 {id,gradientTransform:"rotate(90)"
 ,stop:
[{offset:"0%","stop-color":value}
,{offset:"50%","stop-color":value}
,{offset:"100%","stop-color":value}
]}}))
 }        }).next().value));
 //integral(svg.select("path").node(),color.health);
 let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
 let rulers=
[Date.now()
,...[9,11,1,3,5,7,9,11,1,3].map((month,index)=>new Date("20"+(1<index?7<index?22:21:20)+"-"+month+"-01").getTime())
];
 rulers.forEach((time,index,rulers)=>
[node=>({rect:
 {x:x(time),height:y(0),width:1
 ,fill:palette[index?index<9?index<7?index<5?index<3?"analysis":"design":"development":"implementation":"evaluation":"now"]
 ,opacity:"0.5","class":"ruler"
 ,title:{"#text":index?months[new Date(time).getMonth()]:("Today:\n"+clock(time,"datetime"))}
 }      })
,node=>({text:
 {x:x(time+15*24*60*1000)
 ,y:y(peak),dy:index?"1em":"2em","text-anchor":"middle"
 ,fill:palette[index?index<9?index<7?index<5?index<3?"analysis":"design":"development":"implementation":"evaluation":"now"]
 ,"font-size":"0.9em","class":"ruler"
 ,"#text":index?months[new Date(time).getMonth()]:clock(new Date,"date").slice(5,-1).replace(".","/")
 }      })
].map(rule=>svg.append(compose(rule,"svg",document,node=>node.next().value))));
 let phases={analysis:"2020-10-01",design:"2021-02-01",development:"2021-06-01",implementation:"2021-10-01",evaluation:"2022-02-01"};
 Object.entries(phases).forEach(([phase,date],index,{length})=>
 svg.append(node=>document({text:
 {x:x(new Date(date).getTime())//x(start+[end-start,index/length].reduce((span,offset)=>span*offset+span/length/2))
 ,y:y(min),dy:"-0.5em","text-anchor":"middle"
 ,"#text":phase.toUpperCase()
 ,fill:palette[phase]
 }},"svg").next().value));
 return svg.node();
 //let axis=d3.axisBottom(x).ticks(0).tickSize(3).tickFormat(key=>clock(key,"date").slice(5,-2).replace(".","/"));
 //axis=lines.append("g").attr("class","x axis").attr("transform","translate(0,"+max*scale+")").call(axis).attr("font-family","averia");

 [Date.now(),...[11,12,1,2,3].map(month=>Number(new Date("20"+(month<8?21:20)+"-"+month+"-01")))].forEach((time,index,rulers)=>
 lines.append(node=>document({rect:{x:x(time),height:max*scale,width:1,fill:"url(#"+(index?"month":"now")+")",opacity:"0.5",class:"ruler",title:{"#text":index?months[new Date(time).getMonth()]:("Today:\n"+clock(time,"datetime"))}}},"svg").next().value)&&index&&(index+1<rulers.length)&&
 lines.append(node=>document({text:{x:x(time)+65,y:max*scale,dy:"-0.5em","text-anchor":"middle",fill:index?"#c62828":"#0277BD","font-size":"0.7em",class:"ruler","#text":index?months[new Date(time).getMonth()]:clock(Date.now(),"date").slice(8,-2)}},"svg").next().value));
 let a=lines.selectAll(".a").data(domain).enter().append("g").attr("class","a").attr("fill","white");
 a.append("title").text(key=>clock(key,"datetime").slice(0,-3)+"\n"+(chart[key].description||""))
 a.append(key=>document(isNaN(chart[key])
?{g:{rect:[45].map(rotate=>({width:1,height:chart[key].summary=="Core Team meeting"?4:14,transform:"translate("+[x(key),max*scale/*-4*/]+")"//" rotate("+rotate+" 1 4)"
 ,fill:chart[key]?"#616161":"#0277bd"}))}}//chart[key].summary=="Core Team meeting"?"#d7ccc8":
:{text:{}},"svg").next().value);
 a.append("text").attr("x",x).attr("y",key=>isNaN(chart[key])?max*scale:y(chart[key])).attr("text-anchor","middle").style("font-size",key=>
 isNaN(chart[key])?chart[key].summary=="Core Team meeting"?7:6:7+"px").style("font-family",key=>
 isNaN(chart[key])?"oswald":"averia").attr("fill",key=>
 isNaN(chart[key])?"#616161":color.health(chart[key]/35)).attr("dy",key=>//chart[key].summary=="Core Team meeting"?"#d7ccc8":
 isNaN(chart[key])?chart[key].summary=="Core Team meeting"?12:22:"-0.5em").text(key=>
 isNaN(chart[key])?chart[key].summary||"":[Math.floor(chart[key]),"%"].reduce((value,postfix)=>value?value+postfix:""));
 return svg.node();
}

function integral(curve,spectrum)
{if(!curve.getPointAtLength)return;
 let points=[curve,0].reduce(function split(curve,length)
{let vector=[length,length+10].map(length=>curve.getPointAtLength(length));
 return [vector,...vector.reduce(({x},next)=>x!=next.x)?[curve,length+10].reduce(split):[]];
});
 note(points)
 let [min,max]=["min","max"].map(edge=>Math[edge](...points.flat().map(({y})=>y)));
 let integrals=curve.parentNode.appendChild(document({g:{}},svgns).next().value);
 points.forEach(([start,end],index,points)=>integrals.appendChild(document(
 {path:
 {opacity:0.5
 ,fill:spectrum((start.y-min)/(max-min))
 ,d:"M"+start.x+","+start.y+"S"+start.x+","+start.y+" "+end.x+","+end.y+" L"+[end.x,max]+" L"+[start.x,max]
 }
 },svgns).next().value)&&integrals);
 //curve.remove();
}

export async function gantt(source,{domain,range})
{
}

export async function chart(source)
{let tasks=note(await fetch("asana/projects/1199334832918517/tasks?opt_fields=completed_at,assignee,resource_type,start_on,num_subtasks,name").then(r=>r.json()).then(({data})=>data));
 return note(await calendar(tasks,{domain:["completed_at"],range:"cumulative",scope:["2020-09-01","2022-03-01"]}))
 let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
 let times=Object.values(source).map(({completed})=>completed).filter(Boolean).map((date)=>new Date(date).getTime())
 let [min,max]=["min","max"].map(edge=>Math[edge](...times));
 let [start,end]=["2020-09-01","2022-03-01"].map(date=>new Date(date).getTime());
 let [width,height]=[600,Object.keys(source).length-1];
 let scale=4;
 let x=d3.scaleLinear().domain([start,end]).range([0,width]);
 let y=d3.scaleLinear().domain([0,height]).range([height*scale,0]);
 let chart=svg.append("g").attr("transform","translate(20,10)");

 chart.append("path").datum([start,...times]).attr("d",d3.line().y((d,i)=>y(i)).x(x)).attr("class","line").attr("stroke","#ffc400").attr("stroke-width",1.5).attr("fill","none");
 let modules=Object.entries(source).filter(([key,value])=>value.start);
 [["Overall progress",{start:"2021-05-10"}],...modules].forEach(([key,value],index)=>
 chart.append("circle").attr("cx",x(new Date(value.start).getTime())).attr("cy",y(index?0:11)).attr("r",2.5).attr("fill",palette.development).append("title").text(index?"Module "+key:key));
 //chart.append("text").attr("x",x(new Date(value.start).getTime())).attr("y",y(index?0:12)).attr("dy","-1em").attr("dx","1em").attr("fill",palette.now).text(key));
 return svg.node()
}

export async function planets()
{await import("https://cdn.jsdelivr.net/npm/seen-js@0.2.7/dist/latest/seen.min.js");
 let logo={"svg":
 {"id":"fullLogo","viewBox":"0 0 900 900","g":
[{"id":"about","path":
[{"id":"C1O","d":"M445.277,15.102c237.419,0 430.173,192.755 430.173,430.173c0,237.419 -192.754,430.173 -430.173,430.173c-237.419,0 -430.173,-192.754 -430.173,-430.173c0,-237.418 192.754,-430.173 430.173,-430.173Zm0,39.955c-215.368,0 -390.218,174.851 -390.218,390.218c0,215.368 174.85,390.219 390.218,390.219l10.065,-0.128c210.715,-5.338 380.153,-178.083 380.153,-390.091c0,-212.007 -169.438,-384.753 -380.153,-390.09l-10.065,-0.128Z","style":"fill:#000;fill-opacity:0"}
,{"id":"C1","d":"M 821.20703 260.41016 C 810.45003 260.41016 801.73047 269.12972 801.73047 279.88672 C 801.73047 282.87572 802.40442 285.70533 803.60742 288.23633 L 803.50391 288.2832 C 824.59391 336.3382 836.32227 389.43339 836.32227 445.27539 C 836.32227 661.24439 661.24439 836.32227 445.27539 836.32227 C 385.40556 836.32227 328.68808 822.85007 277.96484 798.79688 A 37.310925 37.310925 0 0 1 278.02344 800.85547 A 37.310925 37.310925 0 0 1 259.24805 833.23633 C 315.54836 860.28478 378.63965 875.44727 445.27539 875.44727 C 682.85439 875.44727 875.44922 682.85339 875.44922 445.27539 C 875.44922 383.71539 862.49127 325.19123 839.19727 272.24023 L 839.13672 272.26758 C 836.17172 265.29858 829.25903 260.41016 821.20703 260.41016 z ","style":"pointer-events: none;fill:#220398;"}
,{"id":"C1C","d":"M445.277,0c245.754,0 445.275,199.521 445.275,445.275c0,245.755 -199.521,445.276 -445.275,445.276c-245.754,0 -445.276,-199.521 -445.276,-445.276c0,-137.801 62.733,-261.067 161.174,-342.77c77.118,-64.006 176.149,-102.505 284.102,-102.505Z","style":"pointer-events: none;fill:none;stroke:#000;stroke-width:1px;stroke-opacity:0;"}
],"circle":{"cx":"238","cy":"800","r":"35","style":"fill:#220398;"}
 }
,{"id":"mission"
 ,"path":
[{"id":"C2O","d":"M445.277,92.344c194.788,0 352.931,158.143 352.931,352.931c0,194.788 -158.143,352.932 -352.931,352.932c-194.788,0 -352.931,-158.144 -352.931,-352.932c0,-194.788 158.143,-352.931 352.931,-352.931Zm0,39.108c173.203,0 313.823,140.62 313.823,313.823c0,173.204 -140.62,313.823 -313.823,313.823c-173.204,0 -313.823,-140.619 -313.823,-313.823c0,-173.203 140.619,-313.823 313.823,-313.823Z","style":"fill:#000;fill-opacity:0;"}
,{"id":"C2","d":"m 445.27734,93.353516 c -45.97,0 -89.87,8.833284 -130.125,24.863284 -7.988,2.43 -13.80078,9.85372 -13.80078,18.63672 0,10.756 8.71861,19.4746 19.47461,19.4746 2.598,0 5.07775,-0.50864 7.34375,-1.43164 l 0.0879,0.23047 c 36.15,-14.593 75.64253,-22.64648 117.01953,-22.64648 172.752,0 312.79493,140.04292 312.79493,312.79492 0,139.28752 -91.05869,257.27279 -216.88282,297.76953 a 37.310925,37.310925 0 0 1 12.1211,27.52344 37.310925,37.310925 0 0 1 -1.40039,10.13086 c 142.22319,-45.17167 245.28711,-178.24146 245.28711,-335.42383 0,-194.36 -157.55893,-351.921874 -351.91993,-351.921874 z","style":"pointer-events: none;fill:#3706a6;"}
,{"id":"C2C","d":"M445.277,77.658c202.893,0 367.617,164.724 367.617,367.617c0,202.894 -164.724,367.618 -367.617,367.618c-202.894,0 -367.618,-164.724 -367.618,-367.618c0,-93.611 35.065,-179.096 92.766,-244.028c67.36,-75.801 165.569,-123.589 274.852,-123.589Z","style":"pointer-events: none;fill:none;stroke:#000;stroke-width:1px;stroke-opacity:0;"}
],"circle":{"cx":"513","cy":"771","r":"35","style":"fill:#3706a6;"}
 }
,{"id":"contact"
 ,"path":
[{"id":"C3O","d":"M445.277,176.107c148.558,0 269.168,120.61 269.168,269.168c0,148.559 -120.61,269.169 -269.168,269.169c-148.558,0 -269.169,-120.61 -269.169,-269.169c0,-148.558 120.611,-269.168 269.169,-269.168Zm0,33.318c130.169,0 235.85,105.681 235.85,235.85c0,130.17 -105.681,235.851 -235.85,235.851c-130.169,0 -235.85,-105.681 -235.85,-235.851c0,-130.169 105.681,-235.85 235.85,-235.85Z","style":"fill:#000;fill-opacity:0;"}
,{"id":"C3","d":"M 445.27734 171.60547 C 294.13434 171.60547 171.60742 294.13239 171.60742 445.27539 C 171.60742 596.41839 294.13434 718.94336 445.27734 718.94336 C 570.26034 718.94336 675.66806 635.15836 708.41406 520.69336 L 708.22461 520.63867 C 708.81261 518.78267 709.13086 516.80586 709.13086 514.75586 C 709.13086 503.99886 700.4103 495.2793 689.6543 495.2793 C 680.5023 495.2793 672.82428 501.59256 670.73828 510.10156 C 642.61028 608.10356 552.32234 679.81836 445.27734 679.81836 C 315.74334 679.81836 210.73438 574.80939 210.73438 445.27539 C 210.73437 315.74139 315.74334 210.73242 445.27734 210.73242 C 562.43118 210.73242 659.47892 296.6404 676.96484 408.89062 A 37.310925 37.310925 0 0 1 699 401.68945 A 37.310925 37.310925 0 0 1 716.08203 405.83008 C 696.95954 273.3812 583.02159 171.60547 445.27734 171.60547 z ","style":"pointer-events: none;fill:#4c09b4;"}
,{"id":"C3C","d":"M445.277,156.992c159.108,0 288.284,129.175 288.284,288.283c0,159.109 -129.176,288.284 -288.284,288.284c-159.108,0 -288.284,-129.175 -288.284,-288.284c0,-70.326 25.236,-134.804 67.14,-184.865c52.899,-63.198 132.362,-103.418 221.144,-103.418Z","style":"pointer-events: none;fill:none;stroke:#000;stroke-width:1px;stroke-opacity:0;"}
],"circle":{"cx":"699","cy":"442","r":"35","style":"fill:#4c09b4"}
 }
,{"id":"references","path":
[{"id":"C4O","d":"M445.277,251.77c106.798,0 193.505,86.707 193.505,193.505c0,106.799 -86.707,193.506 -193.505,193.506c-106.799,0 -193.506,-86.707 -193.506,-193.506c0,-106.798 86.707,-193.505 193.506,-193.505Zm0,36.315c86.756,0 157.19,70.435 157.19,157.19c0,86.756 -70.434,157.191 -157.19,157.191c-86.756,0 -157.191,-70.435 -157.191,-157.191c0,-86.755 70.435,-157.19 157.191,-157.19Z","style":"fill:#000;fill-opacity:0;"}
,{"id":"C4","d":"M 460.75586 250.59375 C 449.99886 250.59375 441.27734 259.31331 441.27734 270.07031 C 441.27734 280.82731 449.99886 289.54688 460.75586 289.54688 C 461.75586 289.54688 461.71892 289.82513 462.66992 289.95312 C 527.91492 297.17912 581.04197 344.56389 596.79297 406.83789 C 597.37197 406.83789 598.32423 426.3125 616.74023 426.3125 C 627.49723 426.3125 636.90234 417.59489 636.90234 406.83789 C 620.14834 322.86289 549.58192 258.30567 462.66992 250.63867 C 462.59592 250.65367 460.98186 250.59375 460.75586 250.59375 z M 349.73047 274.79492 C 290.13519 308.2644 249.85938 372.05969 249.85938 445.27539 C 249.85938 553.20139 337.35234 640.69141 445.27734 640.69141 C 544.45134 640.69141 626.36114 566.81189 638.99414 471.08789 C 638.99314 470.66389 637.22095 451.61133 619.12695 451.61133 C 608.59695 451.61133 599.91373 459.9662 599.55273 470.4082 C 599.54273 470.6832 599.52459 470.64089 599.43359 471.08789 C 587.12859 545.11989 522.80034 601.56641 445.27734 601.56641 C 358.96034 601.56641 288.98633 531.59139 288.98633 445.27539 C 288.98633 387.98818 319.82539 337.9251 365.79102 310.71484 A 36.925774 36.925774 0 0 1 349.36133 280 A 36.925774 36.925774 0 0 1 349.73047 274.79492 z "
 ,"style":"pointer-events: none;fill:#610cc3;"
 }
,{"id":"C4C","d":"M445.277,234.091c116.556,0 211.184,94.628 211.184,211.184c0,116.556 -94.628,211.185 -211.184,211.185c-116.556,0 -211.185,-94.629 -211.185,-211.185c0,-56.115 21.934,-107.148 57.689,-144.985c38.511,-40.754 93.055,-66.199 153.496,-66.199Z","style":"pointer-events: none;fill:none;stroke:#000;stroke-width:1px;stroke-opacity:0;"}
],"circle":{"id":"C4CIRC","cx":"386","cy":"280","r":"32","style":"fill:#610cc3;"}
 }
/*
,{"id":"services","path":
 {"d":"M425.5575 445.2745c2.0006442434270734e-15 10.891 8.828000000000003 19.719 19.719000000000005 19.718999999999998 10.891-2.0006442434270734e-15 19.719-8.828000000000003 19.718999999999998-19.719000000000005l0.0019999999999860745-75.808c33.704 8.741999999999996 58.592000000000006 39.368999999999986 58.59200000000001 75.80799999999999 7.945079806488325e-15 43.251-35.06199999999998 78.313-78.31299999999999 78.31300000000002-43.251 7.945079806488325e-15-78.313-35.06199999999998-78.31300000000002-78.31299999999999-3.1371777053757745e-15-17.078 5.4699999999999935-32.877 14.748999999999992-45.746 17.427999999999997-22.798000000000002-20.692000000000007-45.88999999999999-33.30100000000001-20.80999999999999-13.027999999999997 18.920000000000005-20.657999999999994 41.846000000000004-20.65799999999999 66.556 1.1923038771818716e-14 64.906 52.61700000000002 117.52399999999999 117.52300000000002 117.52399999999997 64.906-1.1923038771818716e-14 117.52299999999998-52.61800000000002 117.52299999999997-117.52400000000003-1.1923038771818716e-14-64.906-52.61700000000002-117.52299999999998-117.52300000000002-117.52299999999997-13.044 2.396143927211711e-15-20.101 9.387000000000004-19.718999999999998 21.682000000000002z"
 ,"style":"pointer-events: none;fill:#8b12e0;"
 }
 ,"circle":{"cx":"445","cy":"445","r":"114","fill":"#ff000000"}
 }*/
]//,"path":{"id":"Gdpring","d":"M863.107,815.931l-3.234,0l-4.629,20.035l5.453,0c6.151,0 9.574,-4.947 9.574,-11.983c0,-5.139 -2.789,-8.052 -7.164,-8.052Zm113.82,40.733c-0.169,0 -0.283,-0.167 -0.283,-0.506c0,-2.661 11.593,-21.188 12.104,-15.27c0.172,1.996 -11.442,15.776 -11.821,15.776Zm-7.862,15.496c-3.051,0 -3.447,-1.244 -3.447,-2.205c0,-2.658 7.803,-8.654 18.321,-8.993c-3.167,5.881 -8.199,11.198 -14.874,11.198Zm24.546,-12.16c1.3,-3.034 10.606,-17.264 -9.409,-26.982c-0.017,-0.005 -0.032,-0.005 -0.047,-0.013c-0.469,-0.115 -0.767,-0.167 -0.767,-0.167l0.032,0.052c-0.184,-0.025 -0.376,-0.091 -0.555,-0.091c-4.209,0 -12.175,10.338 -13.943,17.494c-2.849,5.046 -5.231,7.843 -6.535,7.843c-0.455,0 -0.508,-0.678 -0.508,-0.734c0,-5.316 6.955,-16.402 6.955,-19.116c0,-2.205 -4.131,-6.109 -7.295,-6.109c-4.75,0 -14.082,18.722 -14.365,18.722c-0.059,0 -0.059,-0.057 -0.059,-0.116c0,-2.77 7.071,-15.098 7.071,-16.228c0,-1.697 -5.259,-4.581 -7.693,-4.581c-0.34,0 -0.903,0.396 -0.903,1.244c0,0.593 -2.34,5.527 -4.43,10.555c-3.277,6.931 -8.831,15.403 -11.523,15.403c-0.45,0 -0.507,-0.622 -0.507,-0.735c0,-6.336 8.312,-19.285 8.312,-20.925c0,-1.696 -5.258,-4.524 -7.69,-4.524c-0.339,0 -0.905,0.396 -0.905,1.185c0,1.077 -7.803,13.407 -7.803,19.74c0,3.786 4.806,7.462 7.747,7.462c2.81,0 6.446,-4.377 9.362,-8.952c-0.116,0.566 -0.196,1.087 -0.196,1.49c0,4.185 5.88,6.557 7.237,6.557c0.735,0 1.81,-0.789 1.81,-2.09c0,-2.827 9.898,-20.642 12.669,-20.642c0.11,0 0.167,0.057 0.167,0.17c0,1.357 -6.39,10.291 -6.39,16.342c0,4.583 5.148,8.086 8.088,8.086c2.245,0 4.999,-3.454 7.088,-6.704c0.662,3.899 6.341,5.404 7.565,5.404c0.509,0 1.188,-0.507 1.982,-1.298c2.372,-2.378 8.765,-11.369 9.497,-11.369c0.226,0 0.399,0.116 0.399,1.075c0,2.714 -1.077,7.184 -3.169,11.592c-11.027,0.283 -21.488,6.503 -21.488,11.71c0,2.655 4.58,4.297 8.595,4.297c8.369,0 16.062,-4.808 20.359,-12.555c4.015,2.038 4.581,5.598 4.581,6.276c0,0.114 0.113,0.17 0.226,0.17c0.563,0 2.825,-1.809 2.825,-3.562c0,-1.244 -1.527,-3.958 -6.387,-5.375l-0.001,0l0.001,-0.001Zm-54.867,-29.46c1.3,0 1.583,-0.453 1.583,-1.018c0,-0.172 -0.114,-0.511 -0.114,-0.851c0,-0.282 0.057,-0.509 0.283,-0.732c0.396,-0.34 1.018,-0.851 1.018,-1.753c0,-0.849 -2.545,-5.205 -6.955,-5.205c-1.47,0 -2.319,2.66 -2.319,4.187c0,2.092 2.995,5.372 6.503,5.372l0.001,0Zm-77.349,8.277l-6.847,0l-2.98,12.996c-0.064,0.445 -0.125,0.699 -0.125,0.826c0,1.711 1.458,2.409 3.993,2.724l0.951,0.131l-0.445,1.964l-20.733,0l0.445,-1.964l1.013,-0.131c2.729,-0.443 4.187,-1.202 4.691,-3.55l7.609,-33.094c0.067,-0.507 0.128,-0.824 0.128,-1.015c0,-1.584 -1.076,-2.282 -3.171,-2.535l-0.95,-0.128l0.507,-1.967l20.416,0c8.622,0 14.963,4.376 14.963,11.287c0,8.561 -7.863,14.456 -19.465,14.456Zm-67.281,-2.726l-0.445,2.028l-0.951,0.128c-2.026,0.255 -3.297,1.077 -3.867,3.55l-2.916,12.425c-4.057,2.538 -9.888,4.187 -15.28,4.187c-12.234,0.125 -19.4,-8.878 -19.272,-19.656c-0.317,-13.883 11.854,-26.946 26.247,-26.629c4.882,0 9.89,1.205 15.026,3.679l-2.726,11.727l-2.093,0c-0.572,-8.686 -4.437,-12.679 -10.08,-12.679c-9.322,-0.317 -15.407,12.679 -15.215,24.789c0,4.504 0.823,8.305 2.47,11.413c1.65,3.044 4.124,4.566 7.482,4.566c1.079,0 2.156,-0.192 3.171,-0.573l3.044,-13.249c0.125,-0.506 0.19,-0.951 0.19,-1.268c0,-1.458 -0.891,-1.901 -3.172,-2.221l-1.392,-0.189l0.507,-2.028l19.273,0l-0.001,0Zm105.391,-1.777c6.594,0 10.269,-4.31 10.269,-10.712c0,-5.264 -2.913,-7.61 -7.034,-7.61l-3.553,0l-4.184,18.322l4.502,0Zm19.907,21.178l-0.443,1.966l-12.364,0c-0.952,-1.586 -2.028,-3.741 -3.172,-6.593l-4.056,-10.144c-1.077,-2.79 -2.028,-3.617 -4.057,-3.617l-0.951,0l-3.422,14.71c-0.067,0.508 -0.128,0.826 -0.128,1.015c0,1.586 1.141,2.092 3.486,2.535l0.888,0.128l-0.443,1.966l-20.163,0l0.443,-1.966l0.954,-0.128c2.788,-0.443 4.246,-1.203 4.752,-3.55l7.609,-33.095c0.064,-0.506 0.126,-0.823 0.126,-1.015c0,-1.583 -1.075,-2.281 -3.17,-2.535l-0.951,-0.128l0.506,-1.966l20.163,0c4.312,0 7.862,0.887 10.717,2.728c2.852,1.775 4.248,4.374 4.248,7.799c0,6.338 -4.63,10.84 -12.175,12.428l5.197,11.727c2.663,6.021 3.425,6.976 5.773,7.607l0.632,0.128l0.001,0Zm-108.112,-0.888c10.021,0.317 16.423,-12.932 16.295,-24.728c0,-8.367 -2.916,-13.945 -9.065,-13.945l-4.186,0l-8.052,35.248c-0.062,0.317 -0.128,0.699 -0.128,1.143c0,1.712 1.207,2.282 3.681,2.282l1.455,0l0,0Zm-21.112,0.888l0.952,-0.128c2.788,-0.443 4.248,-1.205 4.752,-3.548l7.609,-33.099c0.066,-0.315 0.128,-0.696 0.128,-1.139c0,-1.458 -0.885,-2.094 -3.171,-2.409l-0.949,-0.128l0.506,-1.964l20.352,0c11.095,0 18.323,7.798 18.323,18.576c0.253,14.329 -12.111,26.056 -27.326,25.805l-21.618,0l0.442,-1.967l0,0.001Z","style":"fill:#fff;fill-rule:nonzero;"}
 }
 };
 logo=note(document(logo).next().value)
 let [width,height]=[900,900];
 let sun="#ffb300"
 let svg=logo;//document({svg:{viewBox:"0 0 450 450",width:50,height:50}});
 svg.appendChild(document({defs:{"filter":
 {"id":"sun","height":"130%"
 ,"feGaussianBlur":{"in":"SourceAlpha","stdDeviation":"2"}
 ,"feColorMatrix":{"id":"recolor","type":"matrix","values":"0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0","result":"glow"}
 ,"feMerge":{"feMergeNode":[{},{"in":"glow"},{"in":"SourceGraphic"}]}
 }}
 //,circle:{cx:450,cy:450,r:100,filter:"url(#sun)",fill:sun}
 },svgns))
 let shapes=Array(4).fill(0).map((i,index)=>index).map(i=>
{let shape = seen.Shapes.sphere(i).scale(100);
 shape.surfaces.forEach(surface=>surface.fillMaterial.color=seen.Colors.hex(sun));
 return shape;
}).slice(-1);
 let scenes=shapes.map(shape=>new seen.Scene(
 {fractionalPoints:false
 ,model:seen.Models.default().add(shape)
 ,viewport:seen.Viewports.center(width,height)
 }));
 let contexts=[];
 seen.Shaders.diffuse();
 scenes.forEach(scene=>contexts.push(seen.Context(svg,scene).render()));
// new seen.Animator().onFrame((t,dt)=>
//{shapes.forEach(shape=>shape.rotx(dt*3e-4).roty(dt*2e-4));
// contexts.forEach(context=>context.render());
//}).start();
 return svg;
}
