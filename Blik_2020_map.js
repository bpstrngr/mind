import * as d3 from './Bostock_2020_d3v6.js';

export async function cesium(source)
{await import("https://cesium.com/downloads/cesiumjs/releases/1.70.1/Build/Cesium/Cesium.js");
 let frame=note(scan({"div":{id:"cesiumContainer","style":"width:100vw;height:50vh"}}))
 var viewer = new Cesium.CesiumWidget(frame)//,{imageryProvider:Cesium.createWorldImagery()});
 var options = {camera:viewer.scene.camera,canvas:viewer.scene.canvas};
 note(source)
var datasources = new Cesium.DatasourceCollection();
var datasourceDisplay = new Cesium.DatasourceDisplay({
    scene: viewer.scene,
    datasourceCollection: datasources});
 viewer.scene.preRender.addEventListener(function(scene, time){datasourceDisplay.update(time);});
 datasources.add(Cesium.KmlDatasource.load("./Blik_2015_INFOGRAFY.kml",options));
 let c=frame.querySelector("canvas");
 c.setAttribute("width","100vw");
 c.setAttribute("height","50vh");
 frame.removeChild(frame.childNodes[1])
 frame.removeChild(frame.childNodes[1])
 return frame
}

export async function space(source)
{var versor=await import("./Bostock_2017_versor.js").then(module=>module.versor)
 var v0,r0,q0,rotationDelay=3000;
 var kml = new DOMParser().parseFromString(source,"text/xml");
 let mapbox=await import("./mapbox_2018_togeojson.js");
 //source = await fetch("blik_2015_infografy.geojson").then(json=>json.json());
 source=mapbox.kml(kml, { styles: true });
 let values=
[{"name":"kurjancs","activity":"0.1"}
,{"name":"glades","activity":"0.2"}
,{"name":"scrubs","activity":"-1.2"}
,{"name":"palacepark","activity":"0.7"}
,{"name":"shooting_range","activity":"0"}
,{"name":"moisture","activity":"0"}
,{"name":"scenery","activity":"0.2"}
,{"name":"greenness","activity":"0"}
,{"name":"terrain","activity":"-0.9"}
,{"name":"diversity","activity":"0.9"}
,{"name":"meadow","activity":"2.1"}
,{"name":"lake","activity":"1.1"}
,{"name":"marsh","activity":"0.4"}
,{"name":"oakforest","activity":"1.1"}
];
 values.forEach(item=>item.activity=item.activity*-1)
 let correspondence={"L":["oakforest","glades"],"R":["meadow"],"H":["meadow"],"S":["oakforest"],"P":["scrubs"],"O":["shooting_range"],"U":["shooting_range"],"K":["palacepark"],"w":["marsh"],"l":["lake"],"k":["kurjancs"]};
 let translation={"attraction":"látványosság","intelligence":"világkép","recreation":"feltöltődés","identity":"identitás","hay":"széna","air":"tiszta levegő","nectar":"nektár","herbs":"gyógynövény","invasion":"invázió","construction":"épitkezés","biking":"motorozás","forestation":"cserjésedés","civilisation":"civilizáció","litter":"szemetelés","trampling":"taposás","desolation":"elhanyagolás","reaping":"kaszálás","policy":"szabályozás","arson":"gyújtogatás","pollution":"szennyezés","desertification":"sivatagosodás","conflict":"konfliktus","fire":"tűz","lumbering":"favágás","grazing":"legeltetés","oakforest":"tölgyes","marsh":"láp","lake":"tó","meadow":"rét","diversity":"sokféleség","terrain":"domborzat","greenness":"zöldfelület","scenery":"kilátás","moisture":"nedvesség","shooting_range":"lőtér","palacepark":"kastélykert","scrubs":"cserjés","glades":"tisztás","kurjancs":"kurjancs","residents":"helyiek","government":"önkormányzat","associations":"egyesületek","hikers":"kirándulók","rangers":"Nemzeti Park","owners":"tulajdonosok","youth":"fiatalok","ministry":"állam","palace_director":"kastélyigazgató","teachers":"tanárok","secondary_residents":"kiköltözők","scientists":"kutatók","athletes":"sportolók","artists":"művészek","guardians":"mezőőrség","farmers":"gazdálkodók","health-conscious":"egészségtudatosak"};
 let color={"L":"#1b5e20","R":"#ffe082","H":"#ffc400","S":"#cddc39","O":"#283593","U":"#283593","P":"#2e7d32"};
 //await fetch("Blik_2020_somlyo_service_providers.geojson").then(response=>response.json()).then(json=>{source.features=source.features.concat(json.features.map((feature,index)=>{feature.properties.M_ANER=["Kastely","wetlands","kurjancs","lake"][index];return feature}))});
 let palette=d3.scaleLinear().range(["#c62828","#FBBC05"]).domain([Math.min(...values.map(v=>new Number(v.activity))),Math.max(...values.map(v=>new Number(v.activity)))]);
 let center=d3.geoCentroid(source);
 let [width,height]=[600,500]
 let projection=d3.geoOrthographic().scale(245).rotate([0, 0]).translate([width / 2, height / 2]).clipAngle(90);
  //geoMercator().center(center).scale(150).translate([width/2,height/2]);
 let path=d3.geoPath().projection(projection);
 var bounds  = path.bounds(source);
 var hscale  = 150*width  / (bounds[1][0] - bounds[0][0]);
 var vscale  = 150*height / (bounds[1][1] - bounds[0][1]);
 var scale   = (hscale < vscale) ? hscale : vscale;
 var offset  = [width - (bounds[0][0] + bounds[1][0])/2,height - (bounds[0][1] + bounds[1][1])/2];
 projection = projection.scale(scale).translate(offset);
var λ = d3.scaleLinear().domain([0,width]).range([-180,180]);
var φ = d3.scaleLinear().domain([0,height]).range([90,-90]);
 path = path.projection(projection);
 var svg=d3.create("svg").attr("width",width).attr("height",height);
 var drag=false
 svg.on("mousedown",down=>{console.log(drag);drag=!drag});
 svg.on("mouseup",up=>{console.log(drag);drag=!drag});
 svg.on("mousemove",function(){if(!drag)return;var p=d3.mouse(this);projection.rotate([λ(p[0]),φ(p[1])]);svg.selectAll("path").attr("d",path);});
//svg.on("touchmove", function() {var p = d3.mouse(this);projection.rotate([λ(p[0]), φ(p[1])]);svg.selectAll("path").attr("d", path);});
svg.call(d3.zoom().scaleExtent([.3, 16]).on("zoom",zoomed=>g.attr("transform",d3.event.transform)));
 var g=svg.append("g");
  svg.append("defs").append("pattern").attr('id','bgimage').attr("width", "100%").attr("height", "100%").attr("x", "0").attr("y", "0").attr("viewBox", "0 0 5400 3800").append('image').attr('width',5400).attr('height',3800).attr('xlink:href', "https://maps.googleapis.com/maps/api/staticmap?zoom=1&size=600x500&maptype=satellite&key=AIzaSyBm_YrOaYoIPU-ypkBNr1RR0KPCQSdMtzw")
 //g.append("image").attr('x',center[0]).attr('y',center[1]).attr("xlink:href", );
 svg.append("path")
 g.selectAll(".feature").data(source.features).enter().append("path").attr("fill",d=>d.color).attr("d",d=>path(d.geometry)).append("title").text(d=>d.activity);
 let labels=new Set();
 let legend=g.selectAll("text").data(source.features).enter();
 legend.append("text").attr("x",577).attr("y",(d,i)=>12*i+18).attr("text-anchor","end").attr("fill",d=>d.color).attr("font-size","10").attr("font-weight","700").attr("font-family","averia Libre").attr("style","text-shadow:0px 0px 2px #26a69a");
 svg.append("image").datum({"type":"satellite"}).attr('x',520).attr('y',430).attr("width","70").attr("xlink:href","Blik_2020_legend.png");
 //hscale = (bounds[1][0] - bounds[0][0]) * 100;
 //vscale = (bounds[1][1] - bounds[0][1]) * 100;
 //var rtranslate_x = (600 - hscale) / 2;
 //var rtranslate_y = (500 - vscale) / 2;
 return g.node().closest("svg");
}

export async function map(source)
{if(typeof source=="string")
 try{source=JSON.parse(source);}catch(fail){source=await fetch(source).then(response=>response.json())};
 let values=
[/*{"name":"invasion","activity":"-0.9"}
,{"name":"construction","activity":"-1.6"}
,{"name":"biking","activity":"-0.2"}
,{"name":"forestation","activity":"-0.9"}
,{"name":"civilisation","activity":"0.1"}
,{"name":"litter","activity":"-2.4"}
,{"name":"trampling","activity":"-0.5"}
,{"name":"desolation","activity":"-1.7"}
,{"name":"reaping","activity":""}
,{"name":"policy","activity":"4.2"}
,{"name":"arson","activity":"-0.3"}
,{"name":"pollution","activity":"0.6"}
,{"name":"desertification","activity":"-0.4"}
,{"name":"conflict","activity":"3.2"}
,{"name":"fire","activity":""}
,{"name":"lumbering","activity":"-0.3"}
,{"name":"grazing","activity":"-0.9"}*/
 {"name":"kurjancs","activity":"0.1"}
,{"name":"glades","activity":"0.2"}
,{"name":"scrubs","activity":"-1.2"}
,{"name":"palacepark","activity":"0.7"}
,{"name":"shooting_range","activity":"0"}
,{"name":"moisture","activity":"0"}
,{"name":"scenery","activity":"0.2"}
,{"name":"greenness","activity":"0"}
,{"name":"terrain","activity":"-0.9"}
,{"name":"diversity","activity":"0.9"}
,{"name":"meadow","activity":"2.1"}
,{"name":"lake","activity":"1.1"}
,{"name":"marsh","activity":"0.4"}
,{"name":"oakforest","activity":"1.1"}/*
,{"name":"herbs","activity":"-0.1"}
,{"name":"nectar","activity":"0"}
,{"name":"air","activity":"0"}
,{"name":"hay","activity":"-1.0"}
,{"name":"identity","activity":"0.7"}
,{"name":"recreation","activity":"2.4"}
,{"name":"intelligence","activity":"0.8"}
,{"name":"attraction","activity":"0.1"}
,{"name":"health-conscious","activity":"0"}
,{"name":"farmers","activity":"0.2"}
,{"name":"guardians","activity":"0"}
,{"name":"artists","activity":"0"}
,{"name":"athletes","activity":"0"}
,{"name":"scientists","activity":"0"}
,{"name":"secondary_residents","activity":"0.0"}
,{"name":"teachers","activity":"0"}
,{"name":"palace_director","activity":"0"}
,{"name":"ministry","activity":"0"}
,{"name":"youth","activity":"-0.9"}
,{"name":"owners","activity":"0"}
,{"name":"rangers","activity":"0"}
,{"name":"hikers","activity":"0.8"}
,{"name":"associations","activity":"-8.6"}
,{"name":"government","activity":"0"}
,{"name":"residents","activity":"1.4"}*/
];
 values.forEach(item=>item.activity=item.activity*-1)
 let correspondence={"L":["oakforest","glades"],"R":["meadow"],"H":["meadow"],"S":["oakforest"],"P":["scrubs"],"O":["shooting_range"],"U":["shooting_range"],"K":["palacepark"],"w":["marsh"],"l":["lake"],"k":["kurjancs"]};
 let translation={"attraction":"látványosság","intelligence":"világkép","recreation":"feltöltődés","identity":"identitás","hay":"széna","air":"tiszta levegő","nectar":"nektár","herbs":"gyógynövény","invasion":"invázió","construction":"épitkezés","biking":"motorozás","forestation":"cserjésedés","civilisation":"civilizáció","litter":"szemetelés","trampling":"taposás","desolation":"elhanyagolás","reaping":"kaszálás","policy":"szabályozás","arson":"gyújtogatás","pollution":"szennyezés","desertification":"sivatagosodás","conflict":"konfliktus","fire":"tűz","lumbering":"favágás","grazing":"legeltetés","oakforest":"tölgyes","marsh":"láp","lake":"tó","meadow":"rét","diversity":"sokféleség","terrain":"domborzat","greenness":"zöldfelület","scenery":"kilátás","moisture":"nedvesség","shooting_range":"lőtér","palacepark":"kastélykert","scrubs":"cserjés","glades":"tisztás","kurjancs":"kurjancs","residents":"helyiek","government":"önkormányzat","associations":"egyesületek","hikers":"kirándulók","rangers":"Nemzeti Park","owners":"tulajdonosok","youth":"fiatalok","ministry":"állam","palace_director":"kastélyigazgató","teachers":"tanárok","secondary_residents":"kiköltözők","scientists":"kutatók","athletes":"sportolók","artists":"művészek","guardians":"mezőőrség","farmers":"gazdálkodók","health-conscious":"egészségtudatosak"};
 let color={"L":"#1b5e20","R":"#ffe082","H":"#ffc400","S":"#cddc39","O":"#283593","U":"#283593","P":"#2e7d32"};
 await fetch("Blik_2020_somlyo_service_providers.geojson").then(response=>response.json()).then(json=>{source.features=source.features.concat(json.features.map((feature,index)=>{feature.properties.M_ANER=["Kastely","wetlands","kurjancs","lake"][index];return feature}))});
 console.log(source);
 let palette=d3.scaleLinear().range(["#c62828","#FBBC05"]).domain([Math.min(...values.map(v=>new Number(v.activity))),Math.max(...values.map(v=>new Number(v.activity)))]);
 source.features=source.features.filter(feature=>feature.geometry.coordinates[0][0][1]<47.636).map(feature=>
{let activity=correspondence[feature.properties.M_ANER[0]].reduce((total,activity,index,range)=>total+new Number(values.find(value=>value.name==activity).activity)/(index+1==range.length?range.length:1),0);
 return {...feature,activity:activity,color:palette(activity),unit:correspondence[feature.properties.M_ANER[0]]}
});
 let center=d3.geoCentroid(source);
 let [width,height]=[600,500]
 let projection=d3.geoMercator().center(center).scale(150).translate([width/2,height/2]);
 let path=d3.geoPath().projection(projection);
 var bounds  = path.bounds(source);
 var hscale  = 150*width  / (bounds[1][0] - bounds[0][0]);
 var vscale  = 150*height / (bounds[1][1] - bounds[0][1]);
 var scale   = (hscale < vscale) ? hscale : vscale;
 var offset  = [width - (bounds[0][0] + bounds[1][0])/2,height - (bounds[0][1] + bounds[1][1])/2];
 projection = projection.scale(scale).translate(offset);
 path = path.projection(projection);
 var g=d3.create("svg").attr("width",width).attr("height",height).append("g");
 g.append("image").attr('x',center[0]).attr('y',center[1]).attr("xlink:href","https://maps.googleapis.com/maps/api/staticmap?center="+center[1]+","+center[0]+"&zoom=13&size=600x500&maptype=satellite&key=AIzaSyBm_YrOaYoIPU-ypkBNr1RR0KPCQSdMtzw").style("transform","translate(-20.5%, -30%) scale(1.335)");
 g.selectAll("path").data(source.features).enter().append("path").attr("fill",d=>d.color.replace(")",",0.5")).attr("d",d=>path(d.geometry)).append("title").text(d=>d.activity+" "+d.properties.M_ANER+correspondence[d.properties.M_ANER[0]].reduce((corres,provider,index,range)=>corres+provider+(index+1==range.length?"":", ")," (")+")");
 let labels=new Set();
 let legend=g.selectAll("text").data(source.features.filter(feature=>labels.has(correspondence[feature.properties.M_ANER[0]][0])?false:labels.add(correspondence[feature.properties.M_ANER[0]][0])).sort((feature,next)=>next.activity<feature.activity?-1:1)).enter();
 legend.append("text").attr("x",577).attr("y",(d,i)=>12*i+18).attr("text-anchor","end").attr("fill",d=>d.color).attr("font-size","10").attr("font-weight","700").attr("font-family","averia Libre").attr("style","text-shadow:0px 0px 2px #26a69a").text(d=>d.unit.reduce((label,unit,index,units)=>label+translation[unit]+(index+1==units.length?"":", "),"")+" "+d.activity.toFixed(1));
 legend.append("rect").attr("x",580).attr("y",(d,i)=>12*i+12).attr("width","10").attr("height","10").attr("fill",d=>d.color);
 legend.append("rect").attr("x",520).attr("y",495).attr("width","50").attr("height","2").attr("fill","#d5cbaf");
 legend.append("text").attr("x",590).attr("y",498).attr("text-anchor","end").attr("fill","#D5CBAF").attr("font-size","7").attr("font-family","averia Libre").text("500m");
 g.append("image").attr('x',520).attr('y',430).attr("width","70").attr("xlink:href","Blik_2020_legend.png");
 //hscale = (bounds[1][0] - bounds[0][0]) * 100;
 //vscale = (bounds[1][1] - bounds[0][1]) * 100;
 //var rtranslate_x = (600 - hscale) / 2;
 //var rtranslate_y = (500 - vscale) / 2;
 return g.node().closest("svg");
}

export async function vegetation(source)
{if(typeof source=="string")
 try{source=JSON.parse(source);}catch(fail){source=await fetch(source).then(response=>response.json())};
 let color={"L":"#1b5e20","R":"#ffe082","H":"#ffc400","S":"#cddc39","O":"#283593","U":"#283593","P":"#2e7d32"};
 source.features=source.features.filter(feature=>!feature.geometry||!feature.geometry.coordinates[0][0]?true:feature.geometry.coordinates[0][0][1]<47.636).map(feature=>({...feature,color:color[(feature.properties.M_ANER||[])[0]]}))
 let center=d3.geoCentroid(source);
 let [width,height,scale]=[600,600,150]
 let projection=d3.geoMercator().center(center).scale(scale).translate([width/2,height/2]);
 let path=d3.geoPath().projection(projection);
 var bounds  = path.bounds(source);
 var hscale  = scale*width  / (bounds[1][0] - bounds[0][0]);
 var vscale  = scale*height / (bounds[1][1] - bounds[0][1]);
 scale=(hscale<vscale?hscale:vscale);
 var offset  = [width - (bounds[0][0] + bounds[1][0])/2,height - (bounds[0][1] + bounds[1][1])/2];
 projection = projection.scale(scale).translate(offset);
 path = path.projection(projection);
 [width,height]=[650,650]
 var g=d3.create("svg").attr("width",width).attr("height",height).append("g");
 g.append("image").attr('x',center[0]).attr('y',center[1]).attr("xlink:href","https://maps.googleapis.com/maps/api/staticmap?center="+center[1]+","+center[0]+"&zoom=14&size="+width+"x"+height+"&maptype=satellite&key=AIzaSyBm_YrOaYoIPU-ypkBNr1RR0KPCQSdMtzw").style("transform","translate(-33%, -44%) scale(1.58)");
 g.selectAll("path").data(source.features).enter().append("path").attr("fill",d=>d.color+"ab").attr("d",d=>path(d.geometry)).append("title").text(d=>d.properties.M_ANER+" ("+d.properties.EREDETI_EH+")");
 let labels=new Set();
 let legend=g.selectAll("text").data(source.features/*.filter(feature=>labels.has(feature.properties.M_ANER[0])?false:labels.add(feature.properties.M_ANER[0]))*/.sort((feature,next)=>next.color<feature.color?-1:1)).enter();
 legend.append("text").attr("x",(d,i,list)=>width-173+70*Math.floor(i/(list.length/3))).attr("y",(d,i,list)=>12*Math.floor(i%(list.length/3))+20).attr("text-anchor","end").attr("fill","#d5cbaf").attr("font-size","8").attr("font-weight","700").attr("font-family","averia Libre").attr("style","text-shadow:0px 0px 2px #26a69a").text(d=>d.properties.M_ANER);
 legend.append("rect").attr("x",(d,i,list)=>width-170+70*Math.floor(i/(list.length/3))).attr("y",(d,i,list)=>12*Math.floor(i%(list.length/3))+12).attr("width","10").attr("height","10").attr("fill",d=>d.color);
 legend.append("rect").attr("x",width-80).attr("y",height-5).attr("width","50").attr("height","2").attr("fill","#d5cbaf");
 legend.append("text").attr("x",width-10).attr("y",height-2).attr("text-anchor","end").attr("fill","#D5CBAF").attr("font-size","7").attr("font-family","averia Libre").text("250m");
 g.append("image").attr('x',width-80).attr('y',height-70).attr("width","70").attr("xlink:href","Blik_2020_legend.png");
 //hscale = (bounds[1][0] - bounds[0][0]) * 100;
 //vscale = (bounds[1][1] - bounds[0][1]) * 100;
 //var rtranslate_x = (600 - hscale) / 2;
 //var rtranslate_y = (500 - vscale) / 2;
 return g.node().closest("svg");
}