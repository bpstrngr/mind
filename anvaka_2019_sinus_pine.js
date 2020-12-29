import {window} from "./Blik_2020_window.js";

//https://github.com/anvaka/atree
var thetamin=0,thetamax=6*Math.PI,period=5,linespacing=1/30,linelength=linespacing/2,yscreenoffset=300,xscreenoffset=260,xscreenscale=360,yscreenscale=360,ycamera=2,zcamera=-3,rate=1/(2*Math.PI),factor=rate/3;
//everyrotationygetsonebiggerrate

export function run()
{let canvas=window.document.createElement('canvas');
 Object.entries({width:"500",height:"450"}).forEach(style=>
 canvas.setAttribute(...style));
 canvas.style.width="300";
 let context=canvas.getContext('2d');
 let spirals=
[{foreground:"#220000",angleoffset:Math.PI*0.92,factor:0.90*factor},
 {foreground:"#002211",angleoffset:-Math.PI*0.08,factor:0.90*factor},
 {foreground:"#660000",angleoffset:Math.PI*0.95,factor:0.93*factor},
 {foreground:"#003322",angleoffset:-Math.PI*0.05,factor:0.93*factor},
 {foreground:"#ff0000",angleoffset:Math.PI,factor:factor},
 {foreground:"#00ffcc",angleoffset:0,factor:factor}
].map(spec=>new Spiral(spec));//Secondshadowforredspiral,Secondshadowforcyanspiral,redspiralshadow,cyanspiralshadow,redSpiral,cyanspiral
!function renderFrame()//animationloopstartshere
{window.setTimeout(renderFrame,1000/24);
 context.clearRect(0,0,500,500);
 context.beginPath();
 spirals.forEach(spiral=>spiral.render(context));
}();
 console.log(context)
 return canvas;
}

function Spiral(config)
{var thetanew,thetaold,offset=0,
 factor=config.factor,
 lineSegments={};
 for(var offset=0;offset>-period;offset--)
{lineSegments[offset]=[];
 for(var theta=thetamin+getdtheta(thetamin,offset*linespacing/period,rate,factor);theta<thetamax;theta+=getdtheta(theta,linespacing,rate,factor))
{thetaold=(theta>=thetamin)?theta:thetamin;
 thetanew=theta+getdtheta(theta,linelength,rate,factor);
 if(thetanew<=thetamin)continue;
 lineSegments[offset].push({start:getPointByAngle(thetaold,factor,config.angleoffset,rate),end:getPointByAngle(thetanew,factor,config.angleoffset,rate)});
}
}
 this.render=function(context)
{offset-=1;if(offset<=-period)offset+=period;
 lineSegments[offset].forEach(segment=>{context.closePath();context.strokeStyle=config.foreground;context.globalAlpha=segment.start.alpha;context.stroke();context.beginPath();context.moveTo(segment.start.x,segment.start.y);context.lineTo(segment.end.x,segment.end.y);});
};
}

function getPointByAngle(theta,factor,angleoffset,rate)
{var x=theta*factor*Math.cos(theta+angleoffset),
 z=-theta*factor*Math.sin(theta+angleoffset),
 y=rate*theta;//nowthatwehave3dcoorinates,projecttheminto2dspace:
 var point={x:xscreenoffset+xscreenscale*(x/(z-zcamera)),y:yscreenoffset+yscreenscale*((y-ycamera)/(z-zcamera))};
 //calculatepoint'scoloralphalevel:
 point.alpha=Math.atan((y*factor/rate*0.1+0.02-z)*40)*0.35+0.65;
 return point;
}

function getdtheta(theta,lineLength,rate,factor){return lineLength/Math.sqrt(rate*rate+factor*factor*theta*theta);}
