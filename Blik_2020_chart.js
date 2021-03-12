import {window,scan,color,vectors,awesome,note,svgns} from "./Blik_2020_document.js";
import * as d3 from './Bostock_2020_d3v6.js';
import clock from "./Blik_2020_time.js";

export async function model(source)
{//var model=await fetch(source).then(resource=>resource.json());
 if(source.bait)source=vectors;
 let r=400;
 var space=window.document.createElement("div");
 space.style="height:100vh;width:100vw;position:relative;";
 space.appendChild(scan(source.car_front)).style=center+"width:200px;";
 let models=Object.keys(source);
 models.forEach(function(item,index)
{//index++;
 let ratio=((models.length/2-index)/models.length);
 if(item.startsWith("road_"))space.appendChild(scan(source[item])).style=center+"width:70px;transform:translate("+ratio*r+"px,"+Math.abs(ratio*r)+"px)"
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
 scan(history[entry].icon,graphic);
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
 if(typeof source=="string")
 try{source=JSON.parse(source);}
 catch(fail){return window.document.createTextNode(fail.toString());}
 let homogenous=Object.entries(source).reduce((variety,[key,value])=>variety.add([...key].every(char=>char==char.toUpperCase())?"heading":key.includes("(")?"compound":"entry"),new Set()).size==1;
 return Object.entries(source).reduce(function put(frame,[key,value],index,items)
{if(typeof value=="object"&&(typeof value[Object.keys(value)[0]]=="string"))//.startsWith("<"))
 return Object.entries(value).reduce(put,frame);
 let piece=typeof value=="string"
?value[0]=="<"
?window.window.document.createRange().createContextualFragment(value).firstChild
:scan({"td":{...[{},{"div":value.length?{"img":{"src":value,"onload":"let verticality=event.target.naturalHeight-event.target.naturalWidth,normalverticality=verticality/event.target[verticality>0?'naturalHeight':'naturalWidth'];event.target.style[verticality>0?'width':'height']='100%';event.target.style[verticality>0?'marginTop':'marginLeft']=(normalverticality/2)*(verticality>0?-1:1)*(100+Math.abs(normalverticality)*100)+'%';"}}:undefined},{"span":{"#text":key,"style":"display:block;white-space:pre;"+([...key].every(char=>char==char.toUpperCase())||!key.includes("(")?"font-weight:700":undefined)}}].sort(()=>homogenous?0:-1).reduce((td,props)=>({...td,...props})),"style":"text-align:center"}})
:scan(value);
 if(!piece)console.log(key,value);
 piece=frame.appendChild(piece);
 if(piece.nodeName.toUpperCase()=="SVG")
 piece.appendChild(window.window.document.createElementNS("http://www.w3.org/2000/svg","title")).textContent=key;
 //piece.style.width=piece.style.width||window.innerWidth/(items.length+1)*(items.length<window.innerWidth/50?1:(items.length/50));
 //if(value.length)piece.querySelector("img").onload=(event)=>{let canvas=window.document.createElement("canvas");canvas.width=event.target.naturalWidth,canvas.height=event.target.naturalHeight;canvas.getContext("2d").drawImage(event.target,0,0);}})
 piece.setAttribute("title",key);
 piece.id=key.replace(" ","_");
 return frame//.closest('table')
},scan({"table":{"tbody":{"tr":{}},"class":homogenous?"homogenous":"heterogenous"}}).childNodes[0].childNodes[0]).closest("table");
}

export function table(source,depth,palette)
{depth=typeof depth=="number"?depth:2;
 palette=palette||(Object.keys(source)[0]=="CICES"?["rgb(247, 194, 35,0)","rgba(27,154,89,0)","rgba(66,133,244,0)"]:["transparent"]);
 let top=Object.entries(source).reduce((row,[key,value],index,records)=>
{let shade=depth>2&&Array.isArray(palette)?d3.scaleLinear().range([palette[index],(palette[index]||palette[0]||spectrum(index/records.length).replace(")","0)")).replace("0)","1)")]):palette;
 row=row.appendChild(window.document.createElement("tr"));
 row.appendChild(window.document.createElement("td")).appendChild(window.document.createElement("span")).textContent=key;
 row.appendChild(scan({"td":{"style":"text-align:center;width:150px;"}})).appendChild(typeof value=="string"?scan({"span":{"#text":value,"style":"background-color:"+(typeof value=="string"?value.match(/\d+/)?color.rainbow((15-new Number(new Number(value.match(/\d+/)[0]))+1)/20)+";color:#212121;":"black;color:#848484;":"transparent;")+"border-radius:1em 1em 1em 1em;height:1em;padding:0 5px 0 5px;white-space:nowrap"}}):table(value,depth+1,shade));
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
 let table=scan({"table":{"class":"adjacency","tbody":{}}}).childNodes[0];
 ["",...source].reduce((header,{name},index)=>scan({"td":{"span":{"#text":translation[name]||name,"span":index?{"img":{"src":"icon/"+name+".png","onload":"let verticality=event.target.naturalHeight-event.target.naturalWidth,normalverticality=verticality/event.target[verticality>0?'naturalHeight':'naturalWidth'];event.target.style[verticality>0?'width':'height']='100%';event.target.style[verticality>0?'marginTop':'marginLeft']=(normalverticality/2)*(verticality>0?-1:1)*(100+Math.abs(normalverticality)*100)+'%';"},"style":"background-color:"+colors[(Object.values(source)[index-1]||{path:[]}).path.slice(-1)](0)}:{"#text":""}}}},header),table.appendChild(window.document.createElement("tr"))).id="header";
 ["",...source].reduce((row,concept,index)=>scan({"td":{"#text":index||""}},row),table.appendChild(window.document.createElement("tr")))
 matrix.forEach((record,index)=>
{[table.appendChild(window.document.createElement("tr")),index+1,...record,index+1
 ].reduce((row,vector,field)=>scan({"td":{"#text":field>1&&(field-2<matrix.length)?(vector||0).toFixed(1).toString().replace("0.0",""):vector,"style":(field<2||matrix.length+1<field)||("border:none;background:"+colors[source[field-2].path.slice(-1)](0).replace(")",",0.5)")+" linear-gradient(to bottom,"+((colors[source[index].path.slice(-1)](0).replace(")",",0.5))")).repeat(2).replace(")",",")))}},row));
});
 ["",...matrix].reduce((row,field,index)=>scan({"td":{"#text":index||field}},row),table.appendChild(window.document.createElement("tr")));
 function exposure(index,weight){return matrix.reduce((value,record)=>value+(weight?record[index]||0:(record[index]>0)),0)}
 function imposure(index,weight){return matrix[index].reduce((value,field)=>value+(typeof weight=="number"?(field||0)*weight:weight?field||0:(field>0)),0)}
 function sum(row,count){return Array.from(row.childNodes).slice(1,matrix.length+1).reduce((sum,field,index,record)=>sum+(count?new Number(field.textContent)>0:new Number(field.textContent)>0?new Number(field.textContent):0),0)}
 let input=table.appendChild(window.document.createElement("tr"));input.setAttribute("id","input");
 let output=table.appendChild(window.document.createElement("tr"));output.setAttribute("id","output");
 [scan(vectors["door_enter"]).outerHTML,...matrix.map((record,index)=>exposure(index)||awesome["fas fa-satellite-dish"]),0].reduce((row,field,index)=>scan({"td":{"#text":index?index>matrix.length?(sum(row)/matrix.length).toFixed(2)+" ("+((sum(row)/(matrix.length*(matrix.length-1)))*100).toFixed(2)+"%)":field:field,"style":"white-space:nowrap"}},row),input);
 [scan(vectors["door_leave"]).outerHTML,...matrix.map((record,index)=>imposure(index)||awesome["fas fa-satellite"]),0].reduce((row,field,index)=>scan({"td":{"#text":index?index>matrix.length?(sum(row)/matrix.length).toFixed(2)+" ("+((sum(row)/(matrix.length*(matrix.length-1)))*100).toFixed(2)+"%)":field:field,"style":"white-space:nowrap"}},row),output);
 let ratio=table.appendChild(window.document.createElement("tr"));ratio.setAttribute("id","ratio");
 ["i/o",...matrix.map((record,index)=>exposure(index)/imposure(index)),0].reduce((row,field,index)=>scan({"td":{"#text":index?index>matrix.length?(sum(row)/sum(row,true)).toFixed(2):field==Infinity?awesome["fas fa-flag-checkered"]:field>0?field.toFixed(1):awesome["fas fa-flag-checkered"]:field}},row),ratio);
 input=table.appendChild(window.document.createElement("tr"));input.setAttribute("id","exposure");
 output=table.appendChild(window.document.createElement("tr"));output.setAttribute("id","imposure");
 [scan(vectors["scale_imbalanced"]).outerHTML,...matrix.map((record,index)=>exposure(index,true).toFixed(1)),0].reduce((row,field,index)=>scan({"td":{"#text":index?index>matrix.length?(sum(row)/matrix.length).toFixed(3):field:field,"style":matrix.length<index||!index?undefined:"color:"+(["provider","hazard"].includes(source[index-1].path.slice(-1)[0])?"#c62828":"#2e7d32")}},row),input);
[scan({svg:{...vectors["scale_imbalanced"].svg,"style":"transform:scaleX(-1)"}}).outerHTML
,...matrix.map((record,index)=>imposure(index,true).toFixed(1))
,0
].reduce((row,field,index)=>scan({"td":{"#text":index?index>matrix.length?(sum(row)/matrix.length).toFixed(3):field:field,"style":matrix.length<index||!index?undefined:"color:"+(["hazard","stakeholder"].includes(source[index-1].path.slice(-1)[0])?"#c62828":"#2e7d32")}},row),output);
 let balance=table.appendChild(window.document.createElement("tr"));balance.setAttribute("id","balance");
["I/O"
,...matrix.map((record,index)=>(exposure(index,true)/imposure(index,true)).toFixed(1))
,0
].reduce((row,field,index)=>
 scan({"td":{"#text":index?index>matrix.length?(sum(row)/sum(row,true)).toFixed(2):field==Infinity?"∞":field>0?field:"-":field}},row),balance);
 let model=table.appendChild(window.document.createElement("tr"));model.setAttribute("id","model");
[scan(vectors["active_directory"]).outerHTML
,...matrix.map((record,index)=>[imposure(index,true),imposure(index,1/(exposure(index,true)))])
,(12/(matrix.length**3-matrix.length))*matrix.reduce((hierarchy,record,index)=>
 hierarchy+(((imposure(index,true)-sum(output))/matrix.length)**2),0)
].reduce((row,field,index)=>
{if(index)peer.bar(field.map?field.map((outdegree,index,inference)=>outdegree==Infinity?inference[0]:outdegree):[],true).then(bar=>
 index>matrix.length?scan({"td":{"#text":(field*100).toFixed(2)+"%"}},row):scan(
 {"td":
 {"#text":bar.outerHTML.replace(/\#2e7d32/g,["stakeholder","hazard"].includes(source[index-1].path.slice(-1)[0])?"#c62828":"#2e7d32")+scan(
 {"span":
 {"#text":(field[1]-field[0]).toFixed(1).toString().replace(/.*/,d=>["0.0","Infinity"].includes(d)?"":d[0][0]=="-"?d.substring(1):d)
 ,"style":"position:absolute;left:0;right:0;top:0;margin:auto;transform:translate(0,"+Math.max(...field)*45+"%);color:"+(field[1]-field[0]<0
?["hazard"].includes(source[index-1].path.slice(-1)[0])?"#2e7d32":"#c62828"
:["hazard"].includes(source[index-1].path.slice(-1)[0])?"#c62828":"#2e7d32")
 }
 }).outerHTML,"style":"position:relative;"
 }
 },row));
 return index?row:scan({"td":{"#text":field}},row)
},model);
 //[awesome["fas fa-cog"],...matrix.map((record,index)=>""/*(1-1/(1+Math.E**(exposure(index,true)*-1)))*/)].reduce((row,field,index)=>{index?bar(field,true).then(bar=>scan({"td":{"#text":bar.outerHTML.replace(/#2e7d32/g,["provider","hazard"].includes(Object.values(source)[index-1].path.slice(-1))?"#c62828":"#2e7d32")+scan({"span":{"#text":field.toFixed(1),"style":"position:absolute;left:0;right:0;top:0;bottom:0;margin:auto;"}}).outerHTML,"style":"position:relative"}},row)):scan({"td":{"#text":field}},row);return row},table.appendChild(window.document.createElement("tr")));
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
{var daynight=["#00838f","#ef6c00","#00838f"];
 var spectrum=d3.scaleLinear().range(daynight).domain(Array.apply(null,Array(daynight.length--)).map((item,index)=>index/(daynight.length)).reverse());
 var columns=["B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA","AB"];
 let {data:{values,range},config:{url}}=sheet;
 let tr=values.map(function(row,line,lines)
{let td=row.map(function(field,column,{length})
{let checked={TRUE:true,FALSE:false};
 let style=line&&["G","L","Q","V"].includes(columns[column])&&!isNaN(checked[row[column+1]])?"box-shadow:1px 0;":""
 let disabled=!put;
 if(checked[field]!==undefined)
 return {input:{type:"checkbox",checked:checked[field],disabled,value:columns[column]+(line+1)},style}
 let color=length-1!=column&&column?"background-color:"+spectrum(Number(field)/24):"";
 return {"#text":field,style:style+"text-align:center;white-space:nowrap;"+(lines.length-1!=line&&line?color:"")}
});
 return {td}
});
 tr.push({td:await Promise.all(values.pop().map(field=>bar(field).then(svg=>({svg}))))})
 //tr.push({td:{"#text":"sign out",onclick:click=>gapi.auth2.getAuthInstance().signOut()}})
 let table=scan({div:{style:"max-width:100%;overflow:scroll;padding-bottom:"+values.reduce((count,row)=>row.some(value=>["TRUE","FALSE"].includes(value))?count+1:count,0)*10+"px",table:{style:"margin:auto",tbody:{tr}}}});
 let spreadsheetId=url.match(/sheets\/([^\/]+)\/values/)[1];
 let edit=async({target})=>note(await fetch("google/sheets"
,{method:"put",headers:{"Content-Type":"application/json"},body:JSON.stringify(
 {spreadsheetId,range:range.split("!").reduce(page=>page+"!"+target.value)
 ,resource:{values:[[target.checked]]}
 ,valueInputOption:"RAW"
 })
 }));
 Array.from(table.querySelectorAll("input")).forEach(input=>input.onchange=edit);
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

export async function calendar(source,{domain,range})
{let values=Object.entries(source).reduce((values,[index,value])=>
 Object.assign(values,
[[value,...domain||[]].reduce((node,key)=>node&&node[key])
,value
].reduce((key,value)=>key&&{[isNaN(key)?Number(new Date(key)):key]:value})||
 value),{});
 range=Object.values(values).map(value=>
 [value,...range||[]].reduce((node,key)=>node&&node[key])||
 value);
 domain=Object.keys(values).map(Number).sort((past,next)=>(past<next)-1);
 let [min,max]=["min","max"].map(key=>Math[key](...domain));
 let width=(max-min)/14000000;
 let x=d3.scaleLinear().domain([min-(max-min)/5,max+(max-min)/5]).range([0,width]);
 [min,max]=["min","max"].map(key=>Math[key](...range.filter(value=>!isNaN(value))));
 let scale=5;
 let y=d3.scaleLinear().domain([min,max]).range([max*scale,min*scale]);
 //svg.append("g").attr("class","y axis").call(d3.axisLeft(y));
 //svg.append("path").datum(keys).attr("class","line").attr("stroke","#ffc400").attr("stroke-width",1.5).attr("fill","none").attr("d"
//,d3.line().x(x).y(node=>0).curve(d3.curveMonotoneX));
 let svg=d3.create("svg").attr("width",width+60).attr("height",max*scale+30).style("overflow","visible");
 let months=["January","February","March",,,,,,,,"November","December"];
 Object.entries({month:"#c62828",now:"#616161"}).forEach(([id,value])=>
 svg.append(node=>scan({defs:{linearGradient:{id,gradientTransform:"rotate(90)"
,stop:
[{offset:"0%","stop-color":value}
,{offset:"50%","stop-color":value}
,{offset:"100%","stop-color":value}
]}}},null,svgns)));
 let lines=svg.append("g").attr("transform","translate(37,5)");
 //let axis=d3.axisBottom(x).ticks(0).tickSize(3).tickFormat(key=>clock(key,"date").slice(5,-2).replace(".","/"));
 //axis=lines.append("g").attr("class","x axis").attr("transform","translate(0,"+max*scale+")").call(axis).attr("font-family","averia");
 let curve=lines.append("path").datum(domain.filter(key=>!isNaN(values[key]))).attr("class","line").attr("stroke","#ffc400").attr("stroke-width",1.5).attr("fill","none").attr("d"
,d3.line().x(x).y(key=>y(values[key])));//.curve(d3.curveMonotoneX));
 [curve.node(),0].reduce(function split(curve,length)
{let vector=[length,length+10].map(length=>curve.getPointAtLength(length));
 return [vector,...vector.reduce(({x},next)=>x!=next.x)?[curve,length+10].reduce(split):[]];
}).map((split,index,{length})=>split.reduce((start,end)=>
 curve.clone(1).attr("opacity",0.5).attr("stroke",null).attr("fill",color.health((max*scale-start.y)/(35*scale))).attr("d","M"+start.x+","+start.y+"S"+start.x+","+start.y+" "+end.x+","+end.y+" L"+[end.x,max*scale]+" L"+[start.x,max*scale])));
 curve.remove();
 [Date.now(),...[11,12,1,2,3].map(month=>Number(new Date("20"+(month<8?21:20)+"-"+month+"-01")))].forEach((time,index,rulers)=>
 lines.append(node=>scan({rect:{x:x(time),height:max*scale,width:1,fill:"url(#"+(index?"month":"now")+")",opacity:"0.5",class:"ruler",title:{"#text":index?months[new Date(time).getMonth()]:("Today:\n"+clock(time,"datetime"))}}},null,svgns))&&index&&(index+1<rulers.length)&&
 lines.append(node=>scan({text:{x:x(time)+65,y:max*scale,dy:"-0.5em","text-anchor":"middle",fill:index?"#c62828":"#0277BD","font-size":"0.7em",class:"ruler","#text":index?months[new Date(time).getMonth()]:clock(Date.now(),"date").slice(8,-2)}},null,svgns)));
 let a=lines.selectAll(".a").data(domain).enter().append("g").attr("class","a").attr("fill","white");
 a.append("title").text(key=>clock(key,"datetime").slice(0,-3)+"\n"+(values[key].description||""))
 a.append(key=>scan(isNaN(values[key])
?{g:{rect:[45].map(rotate=>({width:1,height:values[key].summary=="Core Team meeting"?4:14,transform:"translate("+[x(key),max*scale/*-4*/]+")"//" rotate("+rotate+" 1 4)"
 ,fill:values[key]?"#616161":"#0277bd"}))}}//values[key].summary=="Core Team meeting"?"#d7ccc8":
:{text:{}},null,svgns));
 a.append("text").attr("x",x).attr("y",key=>isNaN(values[key])?max*scale:y(values[key])).attr("text-anchor","middle").style("font-size",key=>
 isNaN(values[key])?values[key].summary=="Core Team meeting"?7:6:7+"px").style("font-family",key=>
 isNaN(values[key])?"oswald":"averia").attr("fill",key=>
 isNaN(values[key])?"#616161":color.health(values[key]/35)).attr("dy",key=>//values[key].summary=="Core Team meeting"?"#d7ccc8":
 isNaN(values[key])?values[key].summary=="Core Team meeting"?12:22:"-0.5em").text(key=>
 isNaN(values[key])?values[key].summary||"":[Math.floor(values[key]),"%"].reduce((value,postfix)=>value?value+postfix:""));
 return svg.node();
}

export async function gantt(source,{domain,range})
{
}