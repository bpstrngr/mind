import {document,vectors,awesome,color,namespaces} from "./Blik_2020_fragment.js";
import {window,path,retreat,note,compose,route,sum} from "./Blik_2020_platform.js";
import * as d3 from './Bostock_2020_d3v6.js';
import clock from "./Blik_2020_time.js";

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

export function serialize(concept)
{let children=Array.isArray(concept.children)?concept.children.map(subceive):[];
 Object.assign(concept.data[concept.title]||{},...children);
 return concept.data;
}

export function sprawl(resource,options={})
{if(resource.constructor.name=="Node")
 return resource;
 let {relations,spread,title,monospace,cluster}=options;
 monospace=monospace||10;
 let matrix=records(resource);
 //resources may contain link definitions as single fields by name or index, or as full matrix. clear the latter now.
 let routes=matrix.map(([key])=>key);
 resource=Object.fromEntries(Object.entries(resource).filter(([key])=>!routes.includes(key)));
 matrix=matrix.filter(([key])=>[key.join?key.join("/"):key,"average",true,undefined].includes(options.matrix))
 let node=d3.hierarchy(resource,function disect(concept)
{if(!concept)return [];
 if(typeof concept=="string")return {[concept]:undefined};
 if(concept[relations])return concept[relations];
 return Object.entries(concept).filter(([key])=>key!=title).map(([key,value],index,{length})=>
 (parseInt(key)==index)||(length==1)
?!value||Object.keys(value)[1]?disect(value)
// routed records seek terminal objects. avoid string-based children.
:(matrix.some(([path])=>Array.isArray(path))&&Object.values(value).every(value=>typeof value=="string"||Array.isArray(value)))?[]
:value
:{[key]:value}).flat()
});
 node.descendants().forEach(function limit(node,index,nodes)
{if(node.depth>options.depth)
 if(node.parent.children.splice(node.parent.children.indexOf(node),1))
 if(!node.parent.children.length)
 delete node.parent.children;
});
 node.descendants().forEach(function adorn(node,index,{length})
{Object.assign(node
,{title:node.data[title]||(
 typeof node.data=="string"?node.data
:Array.isArray(node.data)?path(options.source)
:node.parent
?Object.keys(node.data).join("")
:options.source)
 ,value:length
 })
});
 Object.assign(node,{matrix,spread,monospace,cluster});
 return node;
};

function infer(node)
{note([node,...node.matrix]).reduce(function infer(domain,[path,records])
{records.forEach((vector,record)=>vector.forEach((value,field)=>
{if(!value)return;
 let [source,target]=Array.isArray(path)?
[[domain,...path].reduce(({children},path)=>children.find(({title})=>title==path))
,domain.children[0].leaves()[field]
]:[field,record].map((index,range)=>domain.children[range].leaves()[index]);
 // clear unintended field child nodes of source node. 
 let referral=Object.keys(source.data[source.title]||{}).find(key=>source.data[source.title][key]==records[0]);
 if(source.children?.find(({title})=>title==referral)||!source.children?.length)
 delete source.children;
 [source,target]=[source,target].sort((source,target)=>
 [source,target].map(({parent:{title}})=>title).reduce((independent,domain)=>
 !independent?["service","provider"].includes(domain):domain=="stakeholder",false)-1);
 [source,target].forEach(node=>node.occurrence=(node.occurrence||new Set()).add(path));
 (source.adjacency=source.adjacency||{})[target.title]=
 (source.adjacency[target.title]||new Set()).add(path);
 let relation=source.relations?.get(target);
 source.relations=(source.relations||new Map()).set(target,isNaN(value)
?[...relation||[],...Array.isArray(value)?value:[value]]
:((relation||0)+value)/source.adjacency[target.title].size);
}))
 return domain;
});
 node.descendants().filter(({relations})=>relations).forEach(source=>
 source.relations=Array.from(source.relations).map(([target,values])=>
 (Array.isArray(values)?values:[values]).map(value=>({source,target,value}))).flat());
 return node;
}

function records(resource)
{//resources may contain matrix definitions as {domain,range,matrix:[...records]}.
 let records=Object.entries(resource).filter(([key,fields])=>
 Array.isArray(fields)&&fields.length&&fields.some(record=>
 Array.isArray(record)&&record.every(vector=>
 !isNaN(vector))));
 let matrix=records.length>0;
 if(!matrix)
 // they may also be referential values by title or index 
 // with uniform "record" keys as {range,domain:{path:{to:{record:[...fields]}}}}.
 // WARNING two-branch trees may contain such arrays intended as children not links.
 if(Object.entries(resource).length==2)
 records=Object.entries(resource).map(([key,value])=>[[key],value]).reduce(function trace(matrix,[path,value])
{if(typeof value!="object")return matrix;
 let arrays=Object.entries(value||[]).map(([key,value])=>
[key,Object.entries(value||[]).find(([,value])=>
 Array.isArray(value)&&value.length&&value.flat().every(field=>typeof field=="string"||!field))
]);
 let record=arrays.every(([key,entry],index,[[,first]])=>entry&&(entry[0]==first[0]));
 if(record)
 arrays.forEach(([key,[,record]])=>matrix.push([[...path,key],[record]]));
 else Object.entries(value).forEach(([key,value])=>
 trace(matrix,[[...path,key],value]));
 return matrix;
},[]);
 return records;
}

export function spread(root)
{let {spread,monospace}=root;
 let cyclical=root.matrix.every(([key])=>Array.isArray(key));
 let {force,radial,up,down,left,right}={[spread]:true};
 let horizontal=left||right;
 let inverse=left||up;
 let path=["title","length"];
 gauge(root,path)//.splice(1,0,Math.min(...root[path.join("")]?.slice(1)||[]));
 root.descendants().forEach(node=>
 Object.assign(node
,[node.leaves().length,sum(node[path.join("")])].map(scale=>
 scale*monospace).reduce((width,height)=>(
 {width,height}))));
 if(horizontal&&cyclical)
 [root.width,root.height]=
[Math.max(...root.children.map(({width})=>width))*2
,sum(root.children.map(({height})=>height))*2
].sort(width=>horizontal&&-1);
 if(force)
 return root;
 (cyclical?root.children:[root]).forEach(domain=>
 [radial?Math.PI*2:domain.width*2,domain.height].reduce((width,height)=>
 d3[root.cluster?"cluster":"tree"]().size([width,height]).separation(({depth,parent},following)=>
 radial?(parent==following.parent?1:2)/depth:1)(domain)));
 let offset=cyclical?root[horizontal?"width":"height"]:0;
 if(up||down||left||right)
 root.children.forEach((domain,range)=>
 domain.descendants().map(node=>
 Object.assign(node,
[node.x+(root.height/2-domain.width)
,sum(gauge(domain,path).slice(0,node.children?node.depth-domain.depth+1:undefined))*monospace-((inverse?!range:range)&&offset)
].reduce((width,height)=>
 [width,height].map((offset,height)=>
 offset*(height&&(inverse?!range:range)?-1:1)).sort(width=>
 !horizontal-1).reduce((x,y)=>(
 {x,y}))))));
 return root;
}

function gauge(node,path)
{if(!Array.isArray(path))path=[path];
 let value=route.call(node,[...path]);
 let {children}=node;
 let periphery=!children||!children.length;
 if(periphery)return node[path.join("")]=[value];
 let branches=children.map(node=>gauge(node,path));
 let values=branches.reduce((values,branch)=>
 Array(Math.max(...[values,branch].map(({length})=>length))).fill(0).map((gauge,depth)=>
 [values,branch].map(node=>node[depth]).reduce((gauge,branch)=>
 Math.max(gauge,branch)||[gauge,branch].find(Boolean)||0)));
 return node[path.join("")]=[value,...values];
}

export default async function network(resource,options)
{await vectors;
 let {monospace,source,incumbent,title,still,gradual}=options;
 options.monospace=monospace||10;
 let concept=compose(options,sprawl,infer,spread)(resource);
 let cyclical=concept.matrix.every(([key])=>Array.isArray(key));
 let links=cyclical?concept.children.map(domain=>domain.links()).flat():concept.links();
 if(!cyclical)links.concat(concept.descendants().map(({relations})=>relations).flat().filter(Boolean));
 note({concept,links});
 let {width,height}=concept;
 let svg=d3.select(incumbent||
 document({svg:
 {title:trace(concept,[])[0],"xmlns:xlink":"http://www.w3.org/1999/xlink"
 ,class:"d3",id:source
 ,width,height,preserveAspectRatio:"xMidYMid meet"
 ,viewBox:[options.spread,0].reduce((spread,origo)=>
[{radial:-width,left:origo},{radial:-height,up:-height}
,{radial:width*2,left:origo},{radial:height*2,up:origo}
].map((boundary,index)=>
 boundary[options.spread]||[0,0,width,height][index]||origo).join(" "))
 ,defs:{filter:[vectors.shadow.svg.defs.filter,vectors.shadow_white.svg.defs.filter]}
 ,g:
 {class:"network",transform:
["translate(",{radial:[width/2,height/2],right:[10,0],left:[-10,0],down:[0,10],up:[0,-10]}[options.spread]||[0,0],")"
].join("")
 ,g:
[{class:"links",fill:"none",stroke:"#555","stroke-width":1.5}
,{class:"nodes","stroke-linejoin":"round","stroke-width":1}
]}
 }        }).next().value);//.on("click",({srcElement})=>note(srcElement).classList.contains("node")&&click({target:srcElement},d3.select(incumbent).datum()));
 let graph=svg.select("g.network");
 let network=graph.select("g.links").selectAll("g.link");
 let cluster=graph.select("g.nodes").selectAll("g.node");
 if(typeof navigator!="undefined"&&!options.still)
 svg.call(d3.zoom().scaleExtent([0.3,16]).on("zoom",event=>graph.attr("transform",event.transform)));
 let simulation=svg.node().simulation=(svg.node().simulation||d3.forceSimulation());
 if(incumbent)
 [cluster,network]=
[cluster.data(concept.descendants(),nodeindex).each((node,index,cluster)=>options.spread=="force"&&
 ([node.x,node.y]=[cluster[index].transform.baseVal[0].matrix||{},0].reduce(({e,f})=>[e,f])))
,network.data(links,linkindex).each(link=>connect(link)).call(drag)
].map((selection,index)=>[remove,rewire][index].call(simulation,selection));
 Object.assign(simulation,{network,cluster,window,svg,title,width,height,spread:options.spread,still,gradual,clock:0});
 let time=concept.descendants().map(node=>["start","end"].map(time=>[node.data,node.title,time].reduce((value,key)=>
 !value?undefined:value[key]))).flat().filter(Boolean).concat(Number(new Date("2021.03.01."))).sort((past,next)=>(past<next)-1);
 let [min,max]=["min","max"].map(key=>Math[key](...time));
 simulation.time=d3.scaleLinear().domain([min-(max-min)/5,max+(max-min)/5]).range([0,(max-min)/14000000]);
 simulation.nodes(cluster.data(),nodeindex);
 simulation.alphaTarget(0.01);
 simulation.force("link",d3.forceLink(links,linkindex).strength(0));
 simulation.on("tick",simulate(simulation));
 note(options.source,incumbent?"tethered.":"ready.");
 return svg.node();
}

 function simulate(simulation)
{let [links,nodes]=[simulation.force("link").links(),simulation.nodes()];
 let [network,cluster]=["network","cluster"].map(selection=>simulation[selection].size())
 let density=links.length/nodes.length**2;
 let {complexity,centrality}=metrics(nodes);
 let {force}={[simulation.spread]:true};
 let [width,height]=["width","height"].map(dimension=>scale(nodes.length**2/density));
 if(force)
{simulation.svg.attr("viewBox","-"+0+" -"+0+" "+width+" "+height).attr("width",width).attr("height",height);
 simulation.alpha(1);
 simulation.force("link").distance(1/density).strength(cluster/network);
 simulation.force("center",d3.forceCenter(width/2,height/2));
 simulation.force("charge",d3.forceManyBody().strength(cluster/complexity*-1));
 simulation.force("collision",d3.forceCollide().radius(({centrality})=>scale(centrality)+5));
};
 //this.force("x",d3.forceX(width/2).strength(1)).force("y",d3.forceY(width/2).strength(1));
 //form.style.backgroundImage=nodes.size()==this.nodes()[0].value?"":"linear-gradient(to right,"+[...this.nodes(),...new Array(this.nodes()[0].value-this.nodes().length)].map(node=>!node?"var(--isle)":paint(node).replace(")",",0.3)")).join(",")+")";
 let tick=[force&&move,tether].filter(Boolean).map(step=>step.bind(simulation));
 return compose(...tick);
}

 function move()
{let motion=
 {transform:({x,y})=>"translate("+x+","+y+")"
 ,d:function reorient(link)
{let arrow=this.nextSibling;
 if(arrow.classList.contains("arrow"))
 arrow.setAttribute("d",
[link.source,link.source
,this.getPointAtLength&&this.getPointAtLength(scale(link.source.centrality))||link.target
].map(({x,y},index)=>
 ["M","S"," "][index]+x+","+y).join(""));
 return line("force")(link);
}};
 let [cluster,network]=[this.cluster,this.network.select("path.link")];
 Object.entries(motion).forEach((attribute,index)=>
 [cluster,network][index].attr(...attribute));
 return this;
};

 function tether(simulation)
{if(!this.svg.node().parentNode)//||(spread!="force")
 note(this.stop(),"detached");
 let hold=this.clock++%5;
 if(this.gradual&&hold)return;
 this.clock-=clock-1;
 let [links,nodes]=[this.force("link").links(),this.nodes()];
 let change=[links,nodes].some(({length},index)=>
 this[["network","cluster"][index]].size()!=length);
 if(!change)return;
 links=links.slice(0,this.gradual?this.network.size()+1:undefined);
 let [enter,update,exit]=
[compose(wire.bind(this),rewire.bind(this))
,update=>this.spread!="force"?rewire.call(this,update)
:[update.select("path.link"),update.select("path.arrow")].map((path,node)=>
 path.attr("stroke-width",({value})=>scale(value||1)/7))[0].select(function(){return this.parentNode})
,exit=>exit.remove().each(link=>
{connect(link,-1).filter(node=>
 !links.find(({source,target})=>[source,target].includes(node))).forEach(detached=>
 this.nodes(nodes.filter(node=>node!=link.target),nodeindex));
})
];
 this.network=this.network.data(links,linkindex).join(enter,update,exit);
 [enter,update,exit]=[compose(node.bind(this),remove.bind(this)),remove.bind(this),exit=>exit.remove()];
 this.cluster=this.cluster.data(this.nodes(),nodeindex).join(enter,update,exit);
 if(this.spread=="force"||change)
 simulate(this)
};

 function wire(enter)
{let simulation=this;
 let svg=this.svg.node();
 return enter.append(function(link,index,paths)
{let nodes=simulation.nodes();
 simulation.nodes(nodes.concat(connect(link).filter(node=>!nodes.includes(node))),nodeindex);
 let cluster=!link.source.title&&!link.source.parent;
 let title=[link,link.source,link.target].map(({value,title},index)=>
 index?title:{R:"responsible",A:"accountable",C:"consulted",I:"informed"}[value]||value).join("\n");
 let marker=(trace(link.source,[])).pop().replace(/[^\w\d]/g,"").replace(/^\d+$/,"")||"none";
 return document({g:
 {class:"link",style:"opacity:0.5",id:linkindex(link)
 ,title:{"#text":title}
 ,path:
[{class:"link",stroke:paint(link.value&&isNaN(link.value)?link.value:link.source)}
,{class:"arrow","stroke-width":scale(link.value||1)/14
 ,"marker-end":"url(#"+(svg.querySelector("#"+marker)?marker:simulation.svg.select("defs").append(none=>document(
 {marker:
 {id:marker,orient:"auto",markerWidth:"2",refX:"0.1",refY:"1"
 ,path:{d:"M0,0 V2 L2,1 Z",fill:paint(link.source)}
 }
 },"svg").next().value).attr("id"))+")"
 }
]}              },"svg",window.actions).next().value;
});
}

 function rewire(links)
{let spread=this.spread;
 return links.each(function(link,index,paths)
{let twins=links.select(function(twin){return ["source","target"].every(key=>twin[key]==link[key])&&this}).data();
 let twindex=twins.indexOf(link);
 let stroke=scale(!link.value||isNaN(link.value)?1:link.value)/7;
 let d=line(spread,index,paths)(link);
 link=d3.select(this).attr("transform","translate(0,"+(stroke/twins.length)*Math.ceil(twindex/2)*(twindex%2||-1)+")");
 link.select("path.link").attr("stroke-width",stroke).attr("d",d);
})
}

 var connect=({source,target,value},rate=1)=>
 [source,target].map((concept,vertex)=>
 ["imposure","exposure","outdegree","indegree"].map((score,index)=>
 concept[score]=index%2==vertex?(concept[score]||0)+(index<2&&value||1)*rate:concept[score]||0)&&
 Object.assign(concept,{degree:concept.indegree+concept.outdegree,centrality:concept.exposure+concept.imposure,complexity:concept.exposure/concept.imposure}));

 function line(spread,index,paths)
{let axis=[["left","right"],["up","down"]].findIndex(axis=>axis.includes(spread));
 spread=["horizontal","vertical"][axis]||spread;
 let line=Object.fromEntries(
[["radial","Radial","angle","radius"]
,["vertical","Vertical","x","y"]
,["horizontal","Horizontal","x","y"]
].map(([spread,line,tilt,steer])=>
 [spread,d3["link"+line]()[tilt](({x})=>x)[steer](({y})=>y)]));
 return function(link)
{let origo=spread=="radial"&&!link.source.parent;
 if(line[spread])
 if(!origo)
 return line[spread](link);
 let {source,target:{x,y}}=link;
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
{if(simulation.spread=="force")["x","y"].map((x,index)=>node[x]=([simulation.width,simulation.height][index]/2));
 let size=scale(node.centrality)||10;
 let g=
 {class:"node",filter:"url(#shadow)"
 ,id:nodeindex(node)
 ,title:{"#text":node.title}
 };
 Object.assign(g,circle(node,simulation.spread=="force",simulation.title,size));
 let progress=[node.data,node.title,"progress"].reduce((value,key)=>!value?undefined:value[key]);
 let [start,end]=["start","end"].map(time=>[node.data,node.title,time].reduce((value,key)=>!value?undefined:value[key]));
 let x=start?simulation.time(start):0;
 let width=start?simulation.time(end||Date.now())-simulation.time(start):0;
 if(start)
 Object.assign(g,{rect:{width,height:5,y:-2.5,x,title:{"#text":[start,end].map(time=>clock(time,"date")).join("-")}}})
 if(simulation.title&&simulation.title.includes("image"))
 defs.selectAll("pattern").data(defs.selectAll("pattern").data().concat(node),({title})=>title.replace(/[^\d\w]/g,"")).join(enter=>
 enter.append(node=>
 document({pattern:
 {id:node.title.replace(/[^\d\w]/g,"")
 ,name:node.data[title]||title,x:0,y:0,width:1,height:1
 ,viewBox:"0 0"+(" "+(size)).repeat(2)
 }        },"svg").next().value).each(patternify));
 else
 Object.assign(g
,{text:simulation.spread=="force"
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
 ,...((simulation.spread=="radial"?node.x<Math.PI||!node.parent:(node.x<simulation.width/2?node.parent:!node.parent))?["start",7]:["end",-7]).reduce((anchor,x)=>(
 {"text-anchor":anchor,x}))
 ,transform:simulation.spread=="radial"&&(node.x>=Math.PI)?"rotate(180)":null
 }
 });
 g=document({g},"svg",window.actions).next().value;
 if(progress&&(Number(progress)==100))
 Promise.resolve(awesome).then(check=>g.appendChild(
 document({g:
 {check:document(awesome["fas fa-check"]).next().value.firstChild.firstChild
 ,transform:"translate("+(x+width+(start?5:-5))+" -8) scale(0.025)",fill:"#81c784"
 }        },"svg").next().value));
 return g;
})||nodes;
 if(typeof navigator!="undefined")
 nodes.call(drag).each((node,index,nodes)=>
 simulation.spread!="force"||Array.from(nodes[index].querySelectorAll("text.label")).forEach(text=>
 ["font-size","stroke-width"].forEach((attribute,stroke)=>
 text.setAttribute(attribute,(scale(node.centrality)||10)*(stroke?.002:.2)+"px"))));
 return nodes;
};

 var drag=d3.drag().on("start",function(drag,node)
{["x","y"].forEach(dimension=>node["s"+dimension]=node[dimension]);
 //setTimeout(tick=>event.target.editing&&this.window.subject.reform({delete:{name:node.title}}),event.target.editing=1000);
}).on("drag",function(drag,node)
{["x","y"].forEach(dimension=>node["f"+dimension]=drag[dimension]);
 this.style.zIndex=0;
 if(this.spread=="force")return;
 let {simulation}=this.closest("svg");
 let siblings=node.parent.children;
 let index=siblings.indexOf(node);
 let [sort,sibling]=[-1,1].map(sort=>[sort,siblings[index+sort]]).filter(([,sibling])=>sibling).find(([,{y}],bigger)=>
 (node.y-y<0)!=Boolean(bigger))||[];
 let source=["data","title"].map(key=>node.parent[key]).reduce(Reflect.get);
 if(sibling)
{node.edited=true;
 node.parent.children=siblings.sort(({title})=>title==node.title&&sort);
 Object.assign(source,Object.fromEntries(Object.entries(source).sort(([key])=>key==node.title&&sort)));
 ["x","y"].forEach(dimension=>[node["s"+dimension],sibling[dimension]]=[sibling[dimension],node["s"+dimension]]);
 [this,this[(sort<0?"previous":"next")+"Sibling"]].filter(Boolean).map(d3.select).forEach(node=>
 remove.call(simulation,node)&&
 rewire.call(simulation,simulation.network.filter(({source,target})=>[source,target].includes(node.datum()))));
};
}).on("end",function(drag,node)
{let {simulation}=this.closest("svg");
 let radius=+this.querySelector("circle").getAttribute("r");
 let source=simulation.find(node.x,node.y,radius);
 ["x","y"].map(dimension=>node[dimension]=node["s"+dimension]);
 remove.call(simulation,d3.select(this));
 rewire.call(simulation,simulation.network.filter((link)=>[link.source,link.target].includes(node)))
 delete node.fx&&delete node.fy;
 delete node.sx&&delete node.sy;
 delete this.style.zIndex;
 if(node.edited)
 delete node.edited&&
 Object.entries({join:simulation.title,put:{room:simulation.title,body:node}}).forEach(([emit,body])=>
 window.subject.room.emit(emit,body));
 let nodes=simulation.nodes();
 let index=nodes.indexOf(node);
 nodes.splice(index,1);
 simulation.nodes(nodes,nodeindex);
 nodes.splice(index,0,node);
 simulation.nodes(nodes,nodeindex);
 if(!source)return;
 let links=simulation.force("link").links();
 simulation.force("link").links(links.concat({source,target:node}));
 //simulation.restart();
});

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

 function circle(node,force,title,size)
{//if(progress)
 //return {g:{...(vectors[progress<100?"worm":"dragon"].svg),transform:"scale(0.2) translate(-80,-60)"}};
 let circle=
[{class:"node",r:force?size:5,fill:paint(node),name:node.parent&&!node.children?node.parent.data.title+"_"+node.data.title:null
 ,title:[[node.data,node.title,"progress"].reduce((data,key)=>!data?undefined:data[key]),0].reduce(progress=>progress?{"#text":progress+"%"}:undefined)
 }
];
 if(title&&title.includes("image"))
 circle.push({class:"label",fill:"url(#"+node.title.replace(/ /g,"_")+")",r:scale(node.centrality)*0.9||9});
 return {circle}
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
 document({img:{crossOrigin:"Anonymous",src}}).next().value.addEventListener("load",function(load)
{//if(!colors[color])svg.select("circle#"+id).attr("fill",["rgb(",...new Vibrant(this).swatches()["Vibrant"].rgb].reduce((hex,hue,index)=>hex+hue+(index<2?",":")")));
 let canvas=document({canvas:{width:this.naturalWidth,height:this.naturalHeight}}).next().value;
 canvas.getContext("2d").drawImage(this,0,0);
 pattern.appendChild(document(
 {image:
 {width:scale(node.centrality)
 ,height:!src.endsWith("png")&&canvas.height>canvas.width?null:scale(node.centrality)
 ,y:label(node)=="desertification"||(color=["hazard","stakeholder"].includes(color))?scale(node.centrality)*.2:undefined
 ,[color=canvas.width>canvas.height&&color?"width":"height"]:color?undefined:scale(node.centrality)*(color=="width"?1:label(node)=="desertification"?1:.6)
 }
 },"svg").next().value).setAttributeNS("http://www.w3.org/1999/xlink","href",canvas.toDataURL("image/"+src.slice(-3)));
}))
};

 export var trace=(node,path)=>!path&&color[node.title]?node.title:!node.parent
?[node.title,...path||[]]
:trace(node.parent,path?[node.title,...path]:path);
 function linkindex(link)
{return link
?[link.source,link.target].map(nodeindex).concat(link.value).join("_")
:this.getAttribute("id")
};
 function nodeindex(node)
{return node
?trace(node,[]).join("/")
:this.getAttribute("id")
};
 function metrics(concepts)
{let [exposure,imposure,internal,balance]=concepts.reduce((metric,{exposure,imposure,complexity},index)=>
[exposure,imposure,index=complexity&&(complexity!=Infinity),index?complexity:0
].map((value,index)=>metric[index]+value)
,[0,0,0,0]);
 let complexity=balance/internal;
 let dominance=(12/(concepts.length**3-concepts.length))*concepts.reduce((hierarchy,concept,index)=>hierarchy+(((concept.imposure-imposure)/concepts.length)**2),0)
 return {exposure,imposure,internal,complexity,dominance};
};
 function scale(value){return Math.cbrt(value*13000)};
 function paint(node,scale)
{if(typeof node=="string")
 return {R:color.red,A:color.yellow,C:color.green}[node]||color.indigo;
 let {progress}=node.data[node.title]||{};
 return typeof progress=="undefined"
?color[trace(node)]||(scale||color.rainbow)(node.height/(node.depth+node.height))
:Number(progress)?color.health(Number(progress)/100):"#616161";
};

