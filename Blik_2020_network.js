import document,{form,vectors as icons,colors,spectrum,keys} from "./Blik_2020_document.js";
import {path,retreat,note,svgns} from "./Blik_2020_window.js";
import * as d3 from './Bostock_2020_d3v6.js';
export {d3};

export default async function network(concept,options)
{let {width,height}=concept;
 let {placement}=options;
 let {fragment}=options;
 let vectors=options.matrix
?concept.children.map(domain=>domain.children).flat().map(subdomain=>subdomain.children).flat().map(source=>
!source.children?[]:Array.from(source.children).map(([target,value])=>({source,target,value}))).flat()
:concept.links();
 note(options.matrix,vectors.length)
 let svg=d3.select(fragment&&fragment.querySelector("svg")||document.scan({svg:
 {width,height,class:"d3",title:trace(concept,[])[0],"xmlns:xlink":"http://www.w3.org/1999/xlink"
 ,viewBox:"-"+(placement=="radius"?width:0)+" -"+(placement=="radius"?height:0)+" "+(placement=="radius"?width*2:width)+" "+(placement=="radius"?height*2:height)
 ,defs:{filter:[icons.shadow.svg.defs.filter,icons.shadow_white.svg.defs.filter]}
 ,g:
 {class:"network",transform:placement!="radius"?undefined:"translate("+width/2+","+height/2+")"
 ,g:
[{class:"links",fill:"none",stroke:"#555","stroke-opacity":0.4,"stroke-width":1.5}
,{class:"nodes","stroke-linejoin":"round","stroke-width":1}
]
 }
 }})).on("click",click=>note(click));
 let graph=svg.select("g.network");
 let links=graph.select("g.links").selectAll("g.link");
 let nodes=graph.select("g.nodes").selectAll("g.node");
//alert(fragment);
  if(fragment)
 links.data(vectors).each(link=>fuse(link))&&
 nodes.data(note(concept.descendants())).each((node,index)=>
 [node.x,node.y]=!alert(nodes.nodes()[index].transform.baseVal[0].matrix)&&
 [nodes.nodes()[index].transform.baseVal[0].matrix,0].reduce(({e,f})=>[e,f]));
 if(typeof navigator!="undefined")
 svg.call(d3.zoom().scaleExtent([0.3,16]).on("zoom",event=>graph.attr("transform",event.transform)));
 svg.node().simulation=d3.forceSimulation().alphaTarget(0.01).nodes(nodes.data()).force("link",d3.forceLink(vectors).strength(0)).on("tick"
,simulate({...options,svg,links,nodes,width,height,density:0,exposure:0,imposure:0,internal:0,complexity:0,dominance:0}));
 note(options.name,options.fragment?"tethered.":"ready.");
 return svg.node();
}


export function infer([conditions,qualities],[origin,matrix])
{matrix.forEach((record,quality)=>record.forEach((vector,condition)=>
{if(!vector)return;
 // CAN BE SIMPLIFIED !!
 let [source,target]=[conditions[condition],qualities[quality]].sort((condition,quality)=>
 [false,...[condition,quality].map(({parent:{data}})=>Object.keys(data)[0])].reduce((independent,subdomain)=>
 !independent?subdomain=="service"||subdomain=="provider":subdomain=="stakeholder")-1); 
 source.adjacency=(source.adjacency||{});
 source.adjacency[label(target)]=(source.adjacency[label(target)]||new Set()).add(origin);
 [source,target].forEach(concept=>
 concept.occurrence=(concept.occurrence||new Set()).add(origin));
 source.children=(source.children||new Map()).set(target,((source.children&&source.children.get(target)||0)+vector)/source.adjacency[label(target)].size);
}))
 return [conditions,qualities]
};

function metrics(concepts)
{let [exposure,imposure,internal,balance]=concepts.reduce((metric,{exposure,imposure,complexity},index)=>
 {return [exposure,imposure,index=complexity&&(complexity!=Infinity),index?complexity:0].map((value,index)=>metric[index]+value)}
 ,[0,0,0,0]);
 let complexity=balance/internal;
 let dominance=(12/(concepts.length**3-concepts.length))*concepts.reduce((hierarchy,concept,index)=>hierarchy+(((concept.imposure-imposure)/concepts.length)**2),0)
 return {exposure,imposure,internal,complexity,dominance};
};

var simulate=({window,placement,gradual,title,svg,links,nodes,width,height,density,exposure,imposure,internal,complexity,dominance,tick=0})=>function()
{if(!svg.node().parentNode)
 note(svg.attr("title")+" detached.")&&
 this.stop();
 
 if(placement=="force")
 nodes.attr("transform",({x,y})=>"translate("+x+","+y+")")
,links.select("path.link").attr("d",line(placement))
,links.select("path.arrow").attr("d",(link,index,arrows)=>arrows[index].getPointAtLength
?[[0,scale(link.source.centrality)].map(length=>arrows[index].previousSibling.getPointAtLength(length)),null].reduce(([start,split])=>
 "M"+start.x+","+start.y+"S"+start.x+","+start.y+" "+split.x+","+split.y)
:line(placement)(link));

 let hold=tick++%5;
 if(hold)return;
 tick-=tick-1;

 let grow=this.nodes().length!=nodes.size();
 let link=this.force("link").links().length!=links.size();
 if(!grow&&!link)return;
 this.alpha(1)

 links=links.data(this.force("link").links().slice(0,gradual?links.size()+1:undefined),({source,target})=>source.title+target.title).join
(enter=>
 enter.append((link,index,paths)=>
{this.nodes(this.nodes().concat(fuse(link).filter(node=>!this.nodes().includes(node))));
 let cluster=!label(link.source,title)&&!link.source.parent;
 link=document.scan({g:{class:"link",path:
[{class:"link",stroke:paint(link.source),style:"opacity:0.5","stroke-width":scale(link.value||1)/7,...placement=="force"?undefined:{d:line(placement,index,paths)(link)}}
,{class:"arrow","stroke-width":scale(link.value||1)/14,"marker-end":"url(#"+
 [(trace(link.source,[])).pop().replace(/[^\w\d]/g,"")||"none",0].reduce(marker=>svg.select("#"+(!!parseInt(marker)||marker)).size()?marker:svg.select("defs").append(none=>
 document.scan({marker:{id:marker,orient:"auto",markerWidth:"2",refX:"0.1",refY:"1",path:{d:"M0,0 V2 L2,1 Z",fill:paint(link.source)}}},null,svgns)).attr("id"))+")"}
]}    },null,svgns);
 //if(cluster)link.style.opacity=0;
 return link;
})
,update=>
 placement!="force"?update
:[update.select("path.link"),update.select("path.arrow")].map((path,node)=>
 path.attr("stroke-width",link=>scale(link.value||1)/7))[0].select(function(){return this.parentNode})
,exit=>exit.remove().data().map(({target})=>this.nodes(this.nodes().filter(node=>node!=target)))
);

 if(placement=="force")
 density=this.force("link").links().length/this.nodes().length**2
,[width,height]=["width","height"].map(dimension=>scale(this.nodes().length**2/density))
,({exposure,imposure,internal,complexity,dominance}=metrics(this.nodes()));
 //form.style.backgroundImage=nodes.size()==this.nodes()[0].value?"":"linear-gradient(to right,"+[...this.nodes(),...new Array(this.nodes()[0].value-this.nodes().length)].map(node=>!node?"var(--isle)":paint(node).replace(")",",0.3)")).join(",")+")";
 
 nodes=nodes.data(this.nodes(),node=>trace(node,[]).join("/")+node.title).join
(...["enter","update"].map(()=>
 nodes=>node({simulation:this,nodes,defs:svg.select("defs"),title,width,height,links,[placement]:true,window}))
,exit=>exit.remove()
);

 if(placement!="force")
 return;
 svg.attr("viewBox","-"+0+" -"+0+" "+width+" "+height).attr("width",width).attr("height",height);
 this.force("link").distance(1/density).strength(nodes.size()/links.size());
 this.force("center",d3.forceCenter(width/2,height/2));
 this.force("charge",d3.forceManyBody().strength(nodes.size()/complexity*-1));
 this.force("collision",d3.forceCollide().radius(({centrality})=>scale(centrality)+5));
 //this.force("x",d3.forceX(width/2).strength(1)).force("y",d3.forceY(width/2).strength(1));
 //this.alpha(1);
};

var fuse=({source,target,value},rate=1)=>
[source,target].map((concept,vertex)=>
["imposure","exposure","outdegree","indegree"].map((score,index)=>
concept[score]=index%2==vertex?(concept[score]||0)+(index<2&&value||1)*rate:concept[score]||0)&&
Object.assign(concept,{degree:concept.indegree+concept.outdegree,centrality:concept.exposure+concept.imposure,complexity:concept.exposure/concept.imposure}));

function line(shape,index,paths)
{return ({source,target:{x,y}})=>shape=="radius"&&source.parent
?d3.linkRadial().angle(({x})=>x).radius(({y})=>y)({source,target:{x,y}})
:"M"+source.x+","+source.y+(shape=="hierarchy"
?//"C"+source.x+","+(source.y+y)/2+" "+x+","+(source.y+y)/2:
[{distance:Math.sqrt((source.x-x)**2+(source.x-x)**2),middle:(y+source.y)/2,ascent:Math.sqrt(Math.abs(y*source.y)),side:(paths[index]._parent.closest("svg").getAttribute("width")/2<source.x?1:-1),steer:Math.abs(source.x-paths[index]._parent.closest("svg").getAttribute("width")/2),feedback:trace(source)=="stakeholder",scope:0,descent:0}
,"derive descent and scope"
,"define curve"
].reduce(({distance,middle,side,steer,scope,feedback,ascent,descent},phase)=>phase=="derive descent and scope"
?{distance,middle,side,steer,feedback,ascent,descent:y+source.y-ascent,scope:((paths[index]._parent.closest("svg").getAttribute("width")/2/steer)*Math.sqrt(steer*steer/4))}
:"C"+(feedback?source.x+","+(source.y-scope/3):source.x+","+ascent)
    +(feedback?" "+(source.x+scope*side)+","+(source.y-scope/3):"")
+" "+(feedback?source.x+scope*side+","+middle:x+","+descent)
    +(feedback?" "+(source.x+scope*side)+","+(y+distance):"")
    +(feedback?" "+(x)+","+(y+scope/3):"")):"")
+" "+(shape=="radius"?Math.cos(x-Math.PI/2)*y+","+Math.sin(x-Math.PI/2)*y:(x+","+y));
};

function node({simulation,nodes,defs,force,radius,title,width,height,links,window})
{if(nodes._enter)// marks update selection
 nodes=!force?nodes:[nodes.select("circle.label"),nodes.select("circle.node")].map((circle,index)=>
 circle.attr("r",({centrality})=>(scale(centrality)||10)*(index||0.9)))[1].select(function(){return this.parentNode});
 else
 nodes=nodes.size()&&nodes.append(node=>
{if(force)["x","y"].map((x,index)=>node[x]=([width,height][index]/2));
 let size=scale(node.centrality)||10;
 let cluster=!label(node,title)&&!node.parent;
 node=document.scan({g:
 {class:"node",filter:"url(#shadow)",transform:radius?"rotate("+(node.x*180/Math.PI-90)+") translate("+node.y+",0)":"translate("+node.x+","+node.y+") rotate(90)"
 ,title:{"#text":node.title}
 ,circle:
[{class:"node",r:force?size:3,fill:paint(node),name:node.parent&&!node.children?node.parent.data.title+"_"+node.data.title:null}
,...title&&title.includes("image")?[{class:"label",fill:"url(#"+node.title.replace(/ /g,"_")+")",r:scale(node.centrality)*0.9||9}]:[]
],...title&&title.includes("image")
?!defs.selectAll("pattern").data(defs.selectAll("pattern").data().concat(node),({title})=>title.replace(/[^\d\w]/g,"")).join(enter=>enter.append(node=>document.scan({pattern:{id:node.title.replace(/[^\d\w]/g,""),name:node.data[title]||title,x:0,y:0,width:1,height:1,viewBox:"0 0"+(" "+(size)).repeat(2)}},null,svgns)).each(patternify))
:{text:force?node.title.toString().match(/.+?(_|\/|$)/g).reduce((wrap,split,index,splits)=>
 wrap.concat(index&&(split.length+wrap[wrap.length-1].length<18)?wrap.pop()+split:split.match(new RegExp(".{1,"+18+"}","g"))),[]).map((text,index,wrap)=>
({class:"label",fill:"black",stroke:"black",opacity:0.5,"text-anchor":"middle"
 ,"font-size":(size)/5+"px"
 ,"#text":text,dy:(index+1-(wrap.length)/2)*10+"px"
 }))
:{class:"label",fill:paint(node),stroke:"black","#text":node.title,dy:".35em"
 ,"text-anchor":(radius?node.x<Math.PI||!node.parent:node.parent)?"start":"end"
 ,x:(radius?node.x<Math.PI||!node.parent:node.parent)?7:-7
 ,transform:radius&&(node.x>=Math.PI)?"rotate(180)":null
 }
 }
 }                            },null,svgns);
 //if(cluster)node.style.opacity=0;
 return node;
}).on("mouseover",({target})=>
 target.closest("g").setAttribute("filter","url(#shadow_white)")).on("mouseout",({target},node)=>
 node.selected||target.closest("g").setAttribute("filter","url(#shadow)")).on("click",({target},node)=>target.editing?null:trace(node,[])[0]=="get"
?window.location=trace(node,[]).slice(1).join("/")+"/"
:node.parent
?(simulation.force("link").links().length-note(simulation.force("link").links(simulation.force("link").links().filter(link=>!node.descendants().includes(link.source)||!fuse(link,-1))).links()).length)
||(node.descendants().slice(1)||[]).forEach(target=>simulation.force("link").links(simulation.force("link").links().concat({source:(target[0]||target).parent,target:target[0]||target,value:target[1]||1})))
:retreat())
 return nodes.call(typeof navigator=="undefined"?function(){}:d3.drag().on("start",function(event,node)
{this.editing=true;
 setTimeout(form=>
{if(!this.editing)return;
 window.subject.name.value=node.title;
 window.subject.name.dispatchEvent(new Event("input",{bubbles:true}));
 window.subject.dispatchEvent(new Event("delete"));
},1000)
}).on("drag",function(event,node)
{delete this.editing;
 ["x","y"].map(dimension=>node["f"+dimension]=event[dimension]);
 this.style.zIndex=0;
}).on("end",function(event,target)
{delete target.fx&&delete target.fy;
 delete this.style.zIndex;
 let radius=+this.querySelector("circle").getAttribute("r");
 let nodes=simulation.nodes();
 let index=nodes.indexOf(target);
 nodes.splice(index,1);
 simulation.nodes(nodes);
 let source=simulation.find(target.x,target.y,radius);
 nodes.splice(index,0,target);
 simulation.nodes(nodes);
 if(!source)return;
 let links=simulation.force("link").links();
 simulation.force("link").links(links.concat({source,target}));
 //simulation.restart();
})).each((node,index,nodes)=>
 !force||Array.from(nodes[index].querySelectorAll("text.label")).forEach(text=>
 ["font-size","stroke-width"].forEach((attribute,stroke)=>
 text.setAttribute(attribute,(scale(node.centrality)||10)*(stroke?.002:.2)+"px"))))
};

function patternify(node,index,patterns)
{let {id}=this,name=this.getAttribute("name"),pattern=this,color=paint(node);
 (name!="image"
?fetch("https://www.googleapis.com/customsearch/v1/"
+(name=="wiki image"?"siterestrict":"")
+"?q="+label(node)+"&searchType=image&cx="
+(name==="wiki image"?"014735265259933203879:xaftz2zw4io":"014735265259933203879:qgusnjqnuxk")
+"&key="+keys.google.api).then(response=>response.json()).then(json=>(json.items||[{link:undefined}])[0].link)
:new Promise(done=>done(name.startsWith("http")?name:name=="image"
?vectors[name]?"vector/"+name:("icon/"+label(node)+".png")
:"icon/"+name.replace(/ /g,"_")+".png"))).then(src=>
 document.scan({img:{crossOrigin:"Anonymous",src}}).addEventListener("load",function(load)
{//if(!colors[color])svg.select("circle#"+id).attr("fill",["rgb(",...new Vibrant(this).swatches()["Vibrant"].rgb].reduce((hex,hue,index)=>hex+hue+(index<2?",":")")));
 let canvas=document.scan({canvas:{width:this.naturalWidth,height:this.naturalHeight}});
 canvas.getContext("2d").drawImage(this,0,0);
 pattern.appendChild(document.scan({image:{width:scale(node.centrality),height:!src.endsWith("png")&&canvas.height>canvas.width?null:scale(node.centrality),y:label(node)=="desertification"||(color=["hazard","stakeholder"].includes(color))?scale(node.centrality)*.2:undefined,[color=canvas.width>canvas.height&&color?"width":"height"]:color?undefined:scale(node.centrality)*(color=="width"?1:label(node)=="desertification"?1:.6)}},null,svgns)).setAttributeNS("http://www.w3.org/1999/xlink","href",canvas.toDataURL("image/"+src.slice(-3)));
}))
};

export function subceive(concept)
{return note(concept.ancestors.bind(concept)()[0].data)
}

export function conceive(resource,options={})
{let {relations,placement,title}=options;
 let concept=d3.hierarchy(resource,concept=>concept[relations]||(typeof concept!="object"?[]
:Object.entries(Object.entries(concept)[1]?concept
:typeof Object.values(concept)[0]!="string"?Object.values(concept)[0]||{}:[]).map(([key,value],index)=>
 parseInt(key)==index?value:{[key]:value})));
 (Array.isArray(concept)?concept:concept.descendants()).forEach((concept,index,concepts)=>Object.assign(concept,{title:label(concept,title,path(options.name)),value:concepts.length}));
 concept.width=concept.value*12;
 if(placement!="force")
 d3.tree().size([placement=="radius"?Math.PI*2:concept.width,concept.height]).separation((next,following)=>
 placement=="radius"?(next.parent==following.parent?1:2)/next.depth:1)(concept);
 return concept;
}
/*function conceptualise()
{return Object.entries(seed).reduce(function latch(concepts,[name,concept])
{path.push(name);
 let passive=!concept||["string","number"].includes(typeof concept)||["/awesome","/vectors","/d3"].includes(name);
 let relations=passive?[]:!concept[reference]?reference?[]:concept
:Array.isArray(concept[reference])||!Object.values(concept[reference]).some(isNaN)?concept[reference]:[concept[reference]];
 relations=Object.entries(relations).map(([key,relation],index)=>
 parseInt(key)==index&&!relation.length&&!reference
?Object.entries(relation).reduce(latch,concepts)
&&Object.keys(relation).map(relation=>[relation,1])
:latch(concepts,[key=parseInt(key)==index?typeof relation.name=="string"?relation.name:relation:key,relation])
&&[[key,typeof relation=="number"?relation:1]]).flat();
 console.log(concept,relations);
 relations=Object.fromEntries([...concepts[name]&&concepts[name].relations?concepts[name].relations.length?concepts[name].relations.map(relation=>[relation,1]):Object.entries(concepts[name].relations):[],...relations]);
 concepts[path.pop()]=Object.assign({data:{name,path:[...path]},parent:concepts[path.slice(-1)[0]]},concept.length||concept,concepts[name],{relations});
 if(!reference&&!path.length&&Object.keys(seed)[1])
 concepts[seed.name||""]={data:{relations:{...(concepts[seed.name||""]||{}).relations,[name]:1}}};
 return concepts;
},{})
};*/

export var trace=(node,path)=>!path&&colors[node.title]?node.title:!node.parent?[node.title,...path||[]]:trace(node.parent,path?[node.title,...path]:path);
var paint=(node,scale)=>colors[trace(node)]||(scale||spectrum)(node.height/(node.depth+node.height));
var label=({data},label,root)=>!data||data[label]||(typeof data=="string"?data:Array.isArray(data)?root
:Object.entries(data).reduce((label,[key,value],index,entries)=>
 label||(entries.length-1?root:[key,value].find(side=>typeof side=="string"))
,""));

//function spectrum(max){return "hsl("+max*360+",100%,50%)"};
/*{max=Math.max(0,Math.min(1,max));
 return ["rgb(",[34.61,1172.33,10793.56,33300.12,38394.49,14825.05],[23.31,557.33,1225.33,3574.96,1073.77,707.56],[27.2,3211.1,15327.97,27814,22569.18,6838.66]].reduce((color,[base,five,four,three,two,one],index)=>
 color+Math.max(0,Math.min(255,Math.round(base+max*(five-max*(four-max*(three-max*(two-max*one)))))))+(index==3?")":","));
};*/
function scale(value){return Math.cbrt(value*13000)};
