import {scan,vectors as icons,awesome,color,fragment,svgns} from "./Blik_2020_document.js";
import {reform} from "./Blik_2020_transform.js";
import actions,{open} from "./Blik_2020_actions.js";
import {window,path,retreat,note,compose} from "./Blik_2020_platform.js";
import * as d3 from './Bostock_2020_d3v6.js';
import clock from "./Blik_2020_time.js";

export default async function network(concept,options)
{await icons;
 if(concept.constructor.name!="Node")
 concept=conceive(concept,options);
 options.monospace=options.monospace||10;
 spread(concept,options);
 let {width,value,height}=concept;
 let {fragment,title,still,gradual}=options;
 note({matrix:options.matrix})
 let vectors=options.matrix
?concept.leaves().map(source=>Array.from(source.relations||[]).map(([target,value])=>({source,target,value}))).flat()
:(concept.children||[]).map(concept=>concept.links()).flat();
 if(!vectors.length)vectors=concept.links();
 concept.descendants().filter(({relations})=>relations).forEach(node=>
 node.relations=Array.from(node.relations).map(target=>
 (Array.isArray(target[1])?target[1]:[target[1]]).map(value=>
 ({source:node,target:target[0]||target,value}))).flat());
 let svg=d3.select(fragment&&fragment.querySelector("svg")||
 scan({svg:
 {width,height,class:"d3"
 ,title:trace(concept,[])[0],"xmlns:xlink":"http://www.w3.org/1999/xlink"
 ,viewBox:[options.spread,0].reduce((spread,origo)=>
[({radial:-width,left:-width/2}[options.spread]||origo)
,({radial:-height,up:-height}[options.spread]||origo)
,({radial:width*2,left:origo}[options.spread]||width)
,({radial:height*2,up:origo}[options.spread]||height)
].join(" "))
 ,defs:{filter:[icons.shadow.svg.defs.filter,icons.shadow_white.svg.defs.filter]}
 ,g:
 {class:"network",transform:["translate(",{radial:[width/2,height/2],right:[10,0],left:[-10,0],down:[0,10],up:[0,-10]}[spread]||[0,0],")"].join("")
 ,g:
[{class:"links",fill:"none",stroke:"#555","stroke-width":1.5}
,{class:"nodes","stroke-linejoin":"round","stroke-width":1}
]
 }
 }    }));//.on("click",({srcElement})=>note(srcElement).classList.contains("node")&&click({target:srcElement},d3.select(target).datum()));
 let graph=svg.select("g.network");
 let links=graph.select("g.links").selectAll("g.link");
 let nodes=graph.select("g.nodes").selectAll("g.node");
 if(typeof navigator!="undefined"&&!options.still)
 svg.call(d3.zoom().scaleExtent([0.3,16]).on("zoom",event=>graph.attr("transform",event.transform)));
 let simulation=svg.node().simulation=(svg.node().simulation||d3.forceSimulation());
 if(fragment)
 rewire.bind(simulation)(links.data(vectors,linkindex).each(link=>fuse(link)))&&
 remove.bind(simulation)(nodes.data(note(concept.descendants().slice(1)),nodeindex).each((node,index,nodes)=>
 options.spread=="force"?[node.x,node.y]=
 [nodes[index].transform.baseVal[0].matrix,0].reduce(({e,f})=>[e,f]):null));
 let time=concept.descendants().map(node=>["start","end"].map(time=>
 [node.data,node.title,time].reduce((value,key)=>!value?undefined:value[key]))).flat().filter(Boolean).concat(Number(new Date("2021.03.01."))).sort((past,next)=>(past<next)-1);
 let [min,max]=["min","max"].map(key=>Math[key](...time));
 note(min,max)
 let span=(max-min)/14000000;
 simulation.time=d3.scaleLinear().domain([min-(max-min)/5,max+(max-min)/5]).range([0,span]);
 Object.assign(simulation,{window,svg,title,width,height,links,spread:options.spread,still,gradual});
 simulation.alphaTarget(0.01);
 simulation.nodes(nodes.data(),nodeindex);
 simulation.force("link",d3.forceLink(vectors,linkindex).strength(0));
 simulation.on("tick"
,simulate({density:0,exposure:0,imposure:0,internal:0,complexity:0,dominance:0}));
 note(options.source,options.fragment?"tethered.":"ready.");
 return svg.node();
}

function metrics(concepts)
{let [exposure,imposure,internal,balance]=concepts.reduce((metric,{exposure,imposure,complexity},index)=>
 {return [exposure,imposure,index=complexity&&(complexity!=Infinity),index?complexity:0].map((value,index)=>metric[index]+value)}
 ,[0,0,0,0]);
 let complexity=balance/internal;
 let dominance=(12/(concepts.length**3-concepts.length))*concepts.reduce((hierarchy,concept,index)=>hierarchy+(((concept.imposure-imposure)/concepts.length)**2),0)
 return {exposure,imposure,internal,complexity,dominance};
};

var simulate=({width,height,density,exposure,imposure,internal,complexity,dominance,tick=0})=>function()
{if(!this.svg.node().parentNode)//||(spread!="force")
 note(this.svg.attr("title")+" detached.")&&
 this.stop();
 let nodes=this.svg.select("g.network").select("g.nodes").selectAll("g.node");
 
 if(this.spread=="force")
 nodes.attr("transform",({x,y})=>"translate("+x+","+y+")")
,this.links.select("path.link").attr("d",line(this.spread))
,this.links.select("path.arrow").attr("d",(link,index,arrows)=>arrows[index].getPointAtLength
?[[0,scale(link.source.centrality)].map(length=>arrows[index].previousSibling.getPointAtLength(length)),null].reduce(([start,split])=>
 "M"+start.x+","+start.y+"S"+start.x+","+start.y+" "+split.x+","+split.y)
:line(this.spread)(link));

 let hold=tick++%5;
 if(this.gradual&&hold)return;
 tick-=tick-1;

 let linked=this.force("link").links();
 let grow=this.nodes().length!=nodes.size();
 let link=linked.length!=this.links.size();
 if(!grow&&!link)return;
 this.alpha(1)

 link=linked.slice(0,this.gradual?links.size()+1:undefined);
 this.links=this.links.data(link,linkindex).join(compose(wire.bind(this),rewire.bind(this))
,update=>this.spread!="force"?rewire.bind(this)(update)
:[update.select("path.link"),update.select("path.arrow")].map((path,node)=>
 path.attr("stroke-width",link=>scale(link.value||1)/7))[0].select(function(){return this.parentNode})
,exit=>exit.remove().data().map(({target})=>
 this.force("link").links().filter(link=>link.target==target).length||
 this.nodes(this.nodes().filter(node=>node!=target),nodeindex)));

 if(this.spread=="force")
 density=this.force("link").links().length/this.nodes().length**2
,[width,height]=["width","height"].map(dimension=>scale(this.nodes().length**2/density))
,({exposure,imposure,internal,complexity,dominance}=metrics(this.nodes()));
 //form.style.backgroundImage=nodes.size()==this.nodes()[0].value?"":"linear-gradient(to right,"+[...this.nodes(),...new Array(this.nodes()[0].value-this.nodes().length)].map(node=>!node?"var(--isle)":paint(node).replace(")",",0.3)")).join(",")+")";
 
 nodes=nodes.data(this.nodes(),nodeindex).join(
 compose(node.bind(this),remove.bind({[this.spread]:true}))
,remove.bind({[this.spread]:true})
,exit=>exit.remove());

 if(this.spread!="force")
 return;
 this.svg.attr("viewBox","-"+0+" -"+0+" "+this.width+" "+this.height).attr("width",this.width).attr("height",this.height);
 this.force("link").distance(1/density).strength(nodes.size()/this.links.size());
 this.force("center",d3.forceCenter(this.width/2,this.height/2));
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

function wire(enter)
{return enter.append(function(link,index,paths)
{let nodes=this.nodes();
 this.nodes(nodes.concat(fuse(link).filter(node=>!nodes.includes(node))),nodeindex);
 let cluster=!label(link.source,this.title)&&!link.source.parent;
 link=scan({g:
 {class:"link",style:"opacity:0.5",title:{"#text":{R:"responsible",A:"accountable",C:"consulted",I:"informed"}[link.value]}
 ,path:
[{class:"link",stroke:paint(link.value&&isNaN(link.value)?link.value:link.source)
 }
,{class:"arrow","stroke-width":scale(link.value||1)/14
 ,"marker-end":"url(#"+[(trace(link.source,[])).pop().replace(/[^\w\d]/g,"")||"none",0].reduce(marker=>
 this.svg.select("#"+(!!parseInt(marker)||marker)).size()?marker:this.svg.select("defs").append(none=>scan(
 {marker:
 {id:marker,orient:"auto",markerWidth:"2",refX:"0.1",refY:"1"
 ,path:{d:"M0,0 V2 L2,1 Z",fill:paint(link.source)}
 }
 },null,svgns)).attr("id"))+")"}
]}          },null,svgns);
 return link;
}.bind(this)).on("mouseover",focus).on("mouseout",focus)
}

function rewire(links)
{let spread=this.spread;
 return links.each(function(link,index,paths)
{let twins=links.select(function(twin){return ["source","target"].every(key=>twin[key]==link[key])&&this}).data();
 let twindex=twins.indexOf(link);
 let stroke=scale(!link.value||isNaN(link.value)?1:link.value)/7;
 let d=line(spread,index,paths)(link);
 link=d3.select(this).attr("transform","translate(0,"+(stroke/twins.length)*Math.ceil(twindex/2)*(twindex%2||-1)+")");
 link=link.select("path.link").attr("stroke-width",stroke);
 link.attr("d",d);
})
}

function line(spread,index,paths)
{let axis=[["left","right"],["up","down"]].findIndex(axis=>axis.includes(spread));
 spread=["horizontal","vertical"][axis]||spread;
 let line=Object.fromEntries(
[["radial","Radial","angle","radius"]
,["vertical","Vertical","x","y"]
,["horizontal","Horizontal","x","y"]
].map(([spread,line,tilt,steer])=>
 [spread,d3["link"+line]()[tilt](({x})=>x)[steer](({y})=>y)]));
 return function(node)
{if(line[spread])
 if(!(spread=="radial"&&!node.source.parent))
 return line[spread](node);
 let {source,target:{x,y}}=node;
 return "M"+source.x+","+source.y+(!["horizontal","vertical"].includes(spread)?""
://"C"+source.x+","+(source.y+y)/2+" "+x+","+(source.y+y)/2:
[{distance:Math.sqrt((source.x-x)**2+(source.x-x)**2),middle:(y+source.y)/2,ascent:Math.sqrt(Math.abs(y*source.y))
 ,side:(paths[index]._parent.closest("svg").getAttribute("width")/2<source.x?1:-1)
 ,steer:Math.abs(source.x-paths[index]._parent.closest("svg").getAttribute("width")/2)
 ,feedback:trace(source)=="stakeholder",scope:0,descent:0
 }
,"derive descent and scope"
,"define curve"
].reduce(({distance,middle,side,steer,scope,feedback,ascent,descent},phase)=>
 phase=="derive descent and scope"
?{distance,middle,side,steer,feedback,ascent,descent:y+source.y-ascent,scope:((paths[index]._parent.closest("svg").getAttribute("width")/2/steer)*Math.sqrt(steer*steer/4))}
:"C"+(feedback?source.x+","+(source.y-scope/3):source.x+","+ascent)
    +(feedback?" "+(source.x+scope*side)+","+(source.y-scope/3):"")
+" "+(feedback?source.x+scope*side+","+middle:x+","+descent)
    +(feedback?" "+(source.x+scope*side)+","+(y+distance):"")
    +(feedback?" "+(x)+","+(y+scope/3):"")))
+" "+(spread=="radial"?Math.cos(x-Math.PI/2)*y+","+Math.sin(x-Math.PI/2)*y:(x+","+y));
}
};

function node(nodes)
{let simulation=this;
 let defs=simulation.svg.selectAll("defs");
 nodes=nodes.size()&&nodes.append(function(node,index)
{if(this.spread=="force")["x","y"].map((x,index)=>node[x]=([simulation.width,simulation.height][index]/2));
 let size=scale(node.centrality)||10;
 let mark={g:
 {class:"node",filter:"url(#shadow)"
 ,title:{"#text":node.title}
 }        };
 Object.assign(mark,circle(node,this.spread=="force",this.title,size));
 let progress=[node.data,node.title,"progress"].reduce((value,key)=>!value?undefined:value[key]);
 let [start,end]=["start","end"].map(time=>[node.data,node.title,time].reduce((value,key)=>!value?undefined:value[key]));
 let x=start?simulation.time(start):0;
 let width=start?simulation.time(end||Date.now())-simulation.time(start):0;
 if(start)
 Object.assign(mark,{rect:{width,height:5,y:-2.5,x,title:{"#text":[start,end].map(time=>clock(time,"date")).join("-")}}})
 if(this.title&&this.title.includes("image"))
 defs.selectAll("pattern").data(defs.selectAll("pattern").data().concat(node),({title})=>title.replace(/[^\d\w]/g,"")).join(enter=>
 enter.append(node=>scan(
 {pattern:
 {id:node.title.replace(/[^\d\w]/g,"")
 ,name:node.data[title]||title,x:0,y:0,width:1,height:1
 ,viewBox:"0 0"+(" "+(size)).repeat(2)
 }
 },null,svgns)).each(patternify));
 else
 Object.assign(mark
,{text:this.spread=="force"
?!node.title||node.title.toString().match(/.+?(_|\/|$)/g).reduce((wrap,split,index,splits)=>
 wrap.concat(index&&(split.length+wrap[wrap.length-1].length<18)
?wrap.pop()+split
:split.match(new RegExp(".{1,"+18+"}","g"))),[]).map((text,index,wrap)=>
({class:"label",fill:"black",stroke:"black",opacity:0.5,"text-anchor":"middle"
 ,"font-size":(size)/5+"px"
 ,"#text":text,dy:(index+1-(wrap.length)/2)*10+"px"
 }))
:{class:"label",stroke:"black","stroke-width":0.5,dy:".25em"
 ,"#text":node.parent?node.title:""
 ,...((this.spread=="radial"?node.x<Math.PI||!node.parent:(node.x<0))?["start",7]:["end",-7]).reduce((anchor,x)=>(
 {"text-anchor":anchor,x}))
 ,transform:this.spread=="radial"&&(node.x>=Math.PI)?"rotate(180)":null
 }
 });
 mark=scan(mark,null,svgns);
 if(progress&&(Number(progress)==100))
 Promise.resolve(awesome).then(check=>mark.appendChild(scan(
 {g:
 {check:fragment(awesome["fas fa-check"]).firstChild.firstChild
 ,transform:"translate("+(x+width+(start?5:-5))+" -8) scale(0.025)",fill:"#81c784"
 }
 },null,svgns)));
 return mark;
}).on("mouseover",hover).on("mouseout",hover).on("click",click)||nodes;
 if(typeof navigator!="undefined")
 nodes.call(d3.drag().on("start",function(event,node)
{["x","y"].map(dimension=>node["s"+dimension]=node[dimension]);
 //setTimeout(tick=>event.target.editing&&this.window.subject.reform({delete:{name:node.title}}),event.target.editing=1000);
}).on("drag",function(drag,node)
{let siblings=node.parent.children;
 let index=siblings.indexOf(node);
 let sort=[index,-1,1].reduce((index,proxy,next)=>
 [index+1?siblings[index+proxy]:0,0].reduce(sibling=>sibling?
 [node,sibling].sort(node=>next-2).reduce((first,next)=>
 first.y<next.y)?next-1?0:index:proxy:index));
 let sibling=sort&&siblings[index+sort];
 if(sibling)
 node.edited=note(node.parent.data[node.parent.title]=Object.fromEntries(
[Object.entries(node.parent.data[node.parent.title]||{})
//,d3.select(this.parentNode).selectAll("g.node")
,node.parent.children
].map(list=>list.sort((...pair)=>
 pair.every(entry=>[node.title,sibling.title].includes(entry.title||entry[0]))
?((pair[0][1]||pair[0]).title==(sort>0?node:sibling).title)-1
:0))[0]))&&
 ["x","y"].forEach(dimension=>[node["s"+dimension],sibling[dimension]]=[sibling[dimension],node["s"+dimension]]);
 ["x","y"].forEach(dimension=>node["f"+dimension]=drag[dimension]);
 [this,sort&&this[(sort<0?"previous":"next")+"Sibling"]].filter(Boolean).map(d3.select).forEach(node=>
 remove.bind(simulation)(node)&&
 rewire.bind(simulation)(simulation.links.filter(({source,target})=>[source,target].includes(node.datum()))));
 this.style.zIndex=0;
 //delete this.editing;
}).on("end",function(event,target)
{let radius=+this.querySelector("circle").getAttribute("r");
 let source=simulation.find(target.x,target.y,radius);
 if(simulation.still)["x","y"].map(dimension=>target[dimension]=target["s"+dimension]);
 remove.bind(simulation)(d3.select(this));
 rewire.bind(simulation)(simulation.links.filter((link)=>[link.source,link.target].includes(target)))
 delete target.fx&&delete target.fy;
 delete target.sx&&delete target.sy;
 delete this.style.zIndex;
 if(node.edited)
 delete node.edited&&
 Object.entries({join:this.title,put:{room:this.title,body}}).forEach(([emit,body])=>
 window.subject.room.emit(emit,body));
 let nodes=simulation.nodes();
 let index=nodes.indexOf(target);
 nodes.splice(index,1);
 simulation.nodes(nodes,nodeindex);
 nodes.splice(index,0,target);
 simulation.nodes(nodes,nodeindex);
 if(!source)return;
 let links=simulation.force("link").links();
 simulation.force("link").links(links.concat({source,target}));
 //simulation.restart();
})).each((node,index,nodes)=>
 this.spread!="force"||Array.from(nodes[index].querySelectorAll("text.label")).forEach(text=>
 ["font-size","stroke-width"].forEach((attribute,stroke)=>
 text.setAttribute(attribute,(scale(node.centrality)||10)*(stroke?.002:.2)+"px"))));
 return nodes;
};

function remove(nodes)
{let {up,down,right,left,radial,force}={[this.spread]:true};
 if(force)
 [nodes.select("circle.label"),nodes.select("circle.node")].map((circle,index)=>
 circle.attr("r",({centrality})=>(scale(centrality)||10)*(index||0.9)))[1].select(function(){return this.parentNode});
 else nodes.attr("fill",node=>paint(node)).attr("transform",node=>radial
?"rotate("+(node.x*180/Math.PI-90)+") translate("+node.y+",0)"
:"translate("+[node.x,node.y]+") rotate("+(right?0:down?90:up?-90:0)+")").select("circle").attr("fill",node=>paint(node));
 return nodes
}

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
 scan({img:{crossOrigin:"Anonymous",src}}).addEventListener("load",function(load)
{//if(!colors[color])svg.select("circle#"+id).attr("fill",["rgb(",...new Vibrant(this).swatches()["Vibrant"].rgb].reduce((hex,hue,index)=>hex+hue+(index<2?",":")")));
 let canvas=scan({canvas:{width:this.naturalWidth,height:this.naturalHeight}});
 canvas.getContext("2d").drawImage(this,0,0);
 pattern.appendChild(scan(
 {image:
 {width:scale(node.centrality)
 ,height:!src.endsWith("png")&&canvas.height>canvas.width?null:scale(node.centrality)
 ,y:label(node)=="desertification"||(color=["hazard","stakeholder"].includes(color))?scale(node.centrality)*.2:undefined
 ,[color=canvas.width>canvas.height&&color?"width":"height"]:color?undefined:scale(node.centrality)*(color=="width"?1:label(node)=="desertification"?1:.6)
 }
 },null,svgns)).setAttributeNS("http://www.w3.org/1999/xlink","href",canvas.toDataURL("image/"+src.slice(-3)));
}))
};

export function subceive(concept)
{let children=Array.isArray(concept.children)?concept.children.map(subceive):[];
 Object.assign(concept.data[concept.title]||{},...children);
 return concept.data;
}

export function conceive(resource,options={})
{let {relations,spread,title,monospace}=options;
 monospace=monospace||10;
 let links=matrix(resource,options.matrix);
 let direct=links.every(([key])=>Array.isArray(key));
 let concept=d3.hierarchy(resource,concept=>concept[relations]||(
 typeof concept!="object"?[]
:Object.entries(Object.entries(concept)[1]
?concept
:typeof Object.values(concept)[0]!="string"
?Object.values(concept)[0]||{}
:[]).map(([key,value],index)=>parseInt(key)==index
?typeof value=="object"||!direct?value:undefined
:typeof value=="object"&&!Array.isArray(value)?{[key]:value}:undefined).filter(Boolean)));
 concept.descendants().forEach((node,index,nodes)=>node.depth>options.depth&&
 node.parent.children.splice(node.parent.children.indexOf(node),1)&&
 !node.parent.children.length&&
 delete node.parent.children)
 concept.descendants().forEach((node,index,nodes)=>Object.assign(node
,{title:label(node,title,path(options.source))
 ,width:node.descendants().length*monospace*2
 ,value:nodes.length
 }));
 return [concept,...links].reduce(infer);
}

function matrix(resource,scope)
{let values=Object.entries(resource).filter(([key,fields])=>
 Array.isArray(fields)&&fields.every(record=>
 Array.isArray(record)&&record.every(vector=>
 !isNaN(vector)))&&delete resource[key]);
 let matrix=values.length>0;
 if(!matrix)
 values=Object.entries(resource).map(([key,value])=>
 [[key],value]).reduce(function array(matrix,[path,values])
{let record=!values?[]:Object.values(values).map(value=>
 Object.entries(value).find(([,value])=>
 Array.isArray(value)));
 if(record.length)
 record=record.reduce((matrix,entry)=>
 matrix&&entry&&(entry[0]==matrix[0])&&matrix);
 if(values)
 if(record)
 Object.entries(values).forEach(([name,record])=>typeof record=="object"&&
 Object.entries(record).forEach(([,field])=>Array.isArray(field)&&
 matrix.push([[...path,name],[field]])));
 else Object.entries(values).forEach(([key,value])=>typeof value=="object"&&
 array(matrix,[[...path,key],value]));
 return matrix;
},[]);
 return values.filter(([key])=>[key.join?key.join("/"):key,"average",true,undefined].includes(scope));
}

function infer(domain,[origin,matrix])
{matrix.forEach((record,index)=>
 record.forEach((vector,field)=>
{if(!vector)return;
 let [source,target]=Array.isArray(origin)?
[[domain,...origin].reduce((domain,origin)=>
 domain.children.find(({title})=>title==origin))
,domain.children[0].leaves()[field]
]
:domain.children.map((domain,order)=>
 domain.leaves()[[field,index][order]]);
 [source,target]=[source,target].sort((source,target)=>
 [false,...[source,target].map(({parent:{title}})=>title)].reduce((independent,domain)=>
 !independent?["service","provider"].includes(domain):domain=="stakeholder")-1); 
 [source,target].forEach(concept=>
 concept.occurrence=(concept.occurrence||new Set()).add(origin));
 source.adjacency=Object.assign(source.adjacency=source.adjacency||{}
,{[target.title]:(source.adjacency[target.title]||new Set()).add(origin)});
 let relation=source.relations&&source.relations.get(target);
 source.relations=(source.relations||new Map()).set(target,isNaN(vector)
?(relation||[]).concat(vector)
:((relation||0)+vector)/source.adjacency[target.title].size);
}))
 return domain;
};

export function spread(root,options={})
{let {spread,monospace}=options;
 heritage(["title","length"],root).splice(1,0,Math.min(...root.titlelength?root.titlelength.slice(1):[]));
 for(let node of root.descendants())
 if(node.titlelength)
 node.height=node.titlelength.reduce((sum,length)=>sum+length)*monospace;
 let matrix=(root.children||[]).some(domain=>
 domain.leaves().some(({relations})=>relations&&(relations.constructor.name=="Map")));
 if(matrix)
 root.width=Math.max(...root.children.map(({width})=>width));
 if(spread!="force")
 (matrix?Object.assign(root).children:[root]).forEach(domain=>
 d3[options.cluster?"cluster":"tree"]().size(
[spread=="radial"?Math.PI*2:domain.width
,domain.titlelength.reduce((sum,height)=>sum+height)*monospace
]).separation(({depth,parent},following)=>
 spread=="radial"?(parent==following.parent?1:2)/depth:1)(domain));
 if(["up","down","left","right"].includes(spread))
 root.children.forEach((domain,dependent)=>
 domain.descendants().map(node=>Object.assign(node
,{y:(node.children?domain.titlelength.slice(0,node.depth-domain.depth+1):domain.titlelength||[domain.title.length]).reduce((sum,height)=>
 sum+height)*monospace+domain.width*(matrix?dependent?-0.868:-1.55:0)
 ,x:node.x+(domain.width*(matrix?domain.width!=root.width:0)/2)
 })).forEach(node=>
 [node.x,node.y]=[node.x,node.y].reduce((x,y)=>(
 {right:[y,x],left:[-y,x],down:[x,y],up:[x,-y]}
 [matrix&&dependent?{right:"left",left:"right",up:"down",down:"up"}[spread]:spread]))));
 if(["left","right"].includes(spread))
 [root.width,root.height]=matrix
?["height","width"].map((dimension,index)=>
 Math.max(...root.children.map(domain=>domain[dimension]))*(index||4.5))
:[root.height,root.width];
 return root;
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

 function heritage(field,concept)
{if(!Array.isArray(field))field=[field];
 let value=[concept,...field].reduce((property,field)=>property[field]);
 let {children}=concept;
 if(!children||!children.length)return [value];
 children=children.map(heritage.bind(null,field));
 children=children.reduce((heritage,branch)=>
 Array(Math.max(heritage.length,branch.length)).fill(0).map((zero,index)=>
 [heritage[index],branch[index]].reduce((heritage,branch)=>
 Math.max(heritage,branch)||[heritage,branch].find(Boolean)||0)));
 return concept[field.join("")]=[value,...children];
}


function circle(node,force,title,size)
{//if(progress)
 //return {g:{...(icons[progress<100?"worm":"dragon"].svg),transform:"scale(0.2) translate(-80,-60)"}};
 let circle=
[{class:"node",r:force?size:5,fill:paint(node),name:node.parent&&!node.children?node.parent.data.title+"_"+node.data.title:null
 ,title:[[node.data,node.title,"progress"].reduce((data,key)=>!data?undefined:data[key]),0].reduce(progress=>progress?{"#text":progress+"%"}:undefined)
 }
];
 if(title&&title.includes("image"))
 circle.push({class:"label",fill:"url(#"+node.title.replace(/ /g,"_")+")",r:scale(node.centrality)*0.9||9});
 return {circle}
}

function hover({type},node)
{let filter={mouseover:"url(#shadow_white)",mouseout:"url(#shadow)"};
 this.closest("g").setAttribute("filter",filter[type]);
 let simulation=this.closest("svg").simulation;
 if(node.selected)
 return;
 let relations=node.relations;
 if(!relations)
 relations=simulation.nodes().map(({relations})=>
 relations?relations.filter(({target})=>target==node):[]).flat();
 if(!relations.length)
 return;
 relations=relations.filter(({source,target})=>![source,target].some(end=>end.selected));
 simulation=simulation.force("link");
 let removed=simulation.links().length-
 simulation.links(simulation.links().filter(link=>
 //[link.source,link.target].sort(past=>Boolean(node.relations)-1).reduce((near,far)=>near!=node||far.children||far.selected)||
 !relations.includes(link)||
 !fuse(link,-1))).links().length;
 if(removed)return;
 if(type=="mouseover")
 simulation.links(simulation.links().concat(relations));
}

function click({target},node)
{if(target.editing)
 return;
 let simulation=this.closest("svg").simulation.force("link");
 if(trace(node,[])[0]=="get")
 return window.location=trace(node,[]).slice(1).join("/")+"/";
 if(!node.parent)return retreat();
 //let linked=simulation.links().length-
 //note(simulation.links(simulation.links().filter(link=>
 //!node.descendants().includes(link.source)||
 //!fuse(link,-1))).links()).length
 //if(linked)return;
 //let links=node.descendants().slice(1).map(target=>({source:(target[0]||target).parent,target:target[0]||target,value:target[1]||1}));
 //simulation.links(simulation.links().concat(links));
 edit.bind(this)(node);
}

function edit(node)
{let label=this.querySelector("text.label");
 let fragment=this.closest("svg").parentNode;
 let form=Array.from(fragment.querySelectorAll("form.subject")||[]).find(({title})=>title==node.title);
 label.style.display=form?"block":"none";
 if(form)return delete node.selected&&form.remove();
 node.selected=true;
 let {x,width,y,height}=this.querySelector("circle").getBoundingClientRect();
 let style=
 {position:"absolute",color:label.getAttribute("fill")
 ,left:x+width+fragment.scrollLeft,top:node.y-10
 ,"font-size":height*1.3
 ,"text-shadow":"black 0px 0px 2px,black 0px 0px 2px,black 0px 0px 2px"
 ,"white-space":"nowrap"
 ,overflow:"scroll"
 };
 style["max-width"]=fragment.width-style.left;
 style=JSON.stringify(style).replace(/\"*[,]\"|{\"*|}/g,";").replace(/\"*[:]\"*/g,":");
 form=scan({form:{class:"subject",title:node.title,style}});
 open(fragment.appendChild(form));
 form.inputs.source=String;
 form.inputs.start=Date;
 form.inputs.end=Date;
 form.escape=function(){label.style.display="block";delete node.selected;this.remove();}
 let record=Object.entries(node.data[node.title]);
 record=record.filter(([key,value])=>typeof value=="string"||form.inputs[key]);
 record.unshift(["name",node.title]);
 reform.bind(form)({[node.title]:Object.fromEntries(record)});
 form.appendChild(scan({span:{"#text":"+",style:"cursor:pointer"}})).onclick=
 click=>form.reform({extend:{key:"",value:""}});
 //form.source.style.textAlign="left"
 form.source.focus()
 form.removeEventListener("switch",form.events.switch);
 form.removeEventListener("submit",form.events.submit);
 form.addEventListener("keydown",function({keyCode}){keyCode==27&&this.escape()});
 form.addEventListener("submit",function(event)
{event.preventDefault();
 let record=Object.fromEntries(Object.values(form.elements).map(({id,value})=>[id,value]));
 for(let [key,value] of Object.entries(record))
 if(form.inputs[key]==Date)
 record[key]=Number(new Date(value));
 if(record.key)
 Object.assign(record,{[record.key]:record.value})&&
 delete record.key&&delete record.value;
 let svg=fragment.querySelector("svg");
 let blank=!record.name&&confirm("delete "+node.title+"?");
 let match=blank?d3.select()
:d3.select(svg).selectAll("g.node").select(function(other){return other!=node&&(other.parent==node.parent)&&(other.title==record.name)&&this});
 let progress=node.data[node.title].progress;
 progress=!progress||[record.progress,progress].map(Number).reduce((was,is)=>was-is);
 if(match.size()||isNaN(progress))
 return [form[isNaN(progress)?"progress":"name"],...match.nodes()].forEach(node=>node.style.animation="pulse 2s");
 let root=[svg.simulation.nodes()[0],0].reduce(function root(node){return node.parent?root(node.parent):node});
 update(node,blank?undefined:record,root);
 let room=fragment.getAttribute("title");
 let body=root.data;
 let report={join:room,put:[]};
 report.put.push({room,body})
 if(progress)
 report.put.push(
 {room:room.replace(/\.json$/,"_log.json"),append:true,body:
 {[Date.now()]:root.children[1].leaves().map(task=>
 task.data[task.title]).filter(Boolean).reduce((progress,task)=>
 progress+Number(task.progress||0)/100,0)
 }
 });
 Object.entries(report).forEach(([emit,body])=>
 (Array.isArray(body)?body:[body]).forEach(body=>
 window.subject.room.emit(emit,body)));
 this.escape();
 //Object.entries({join:this.closest("div").title,put:{room,body}}).forEach(entry=>window.subject.room.emit(...entry));
});
 window.subject.room.on("put",function({body,room})
{window.Tone.Transport.start();
 if(fragment.getAttribute("title")==room)
 network(conceive(body),{fragment,still:true,spread:"left",cluster:true});
 else actions.get({name:room},window.document.querySelector("div[title$='"+room+"']"))
});
}

function update(node,body,root)
{let presence=[node.parent.data[node.parent.title],node.data];
 if(!body)return presence.forEach(place=>place[node.title]=undefined);
 let related=root.descendants().filter(({relations})=>relations);
 let domain=root.children[0];
 let relations=related.map(({relations})=>relations.filter(({target})=>target==node))
 relations=relations.flat().reduce((relations,{source:{title},value})=>Object.assign(relations
,{[title]:!relations[title]?value
:(Array.isArray(relations[title])?relations[title]:[relations[title]]).concat(value)}),{});
 node[domain.title]=domain.leaves().map(({title})=>relations[title]);
 Object.entries(body).forEach(function([key,value])
{if(key==node.title)
 return value?node.data[body.name][value]={roles:[],progress:0}:null;
 note(key,value)
 if(key!="name"||node.data[node.title][key])
 return (value||confirm("delete "+key+"?"))&&
 (node.data[body.name][key]=!value?undefined:
 Array.isArray(node.data[node.title][key])?value.split(","):value);
 if(value==node.title)return;
 value={[value]:node.data[node.title],[node.title]:undefined};
 presence.forEach(data=>Object.assign(data,value));
});
 note(node.data)
}

function focus()
{this.style.opacity=+(Number(this.style.opacity)<1)||0.5;
}

function paint(node,scale)
{if(typeof node=="string")
 return {R:color.red,A:color.yellow,C:color.green}[node]||color.indigo;
 let {progress}=node.data[node.title]||{};
 return typeof progress=="undefined"
?color[trace(node)]||(scale||color.rainbow)(node.height/(node.depth+node.height))
:Number(progress)?color.health(Number(progress)/100):"#616161";
};

var label=({data},label,root)=>!data||data[label]||(typeof data=="string"?data:Array.isArray(data)?root
:Object.entries(data).reduce((label,[key,value],index,entries)=>
 label||(entries.length-1?root:[key,value].find(side=>typeof side=="string"))
,""));

export var trace=(node,path)=>!path&&color[node.title]?node.title:!node.parent
?[node.title,...path||[]]
:trace(node.parent,path?[node.title,...path]:path);
function scale(value){return Math.cbrt(value*13000)};
var linkindex=({source,target,value})=>source.title+target.title+value;
var nodeindex=node=>trace(node,[]).join("/");
