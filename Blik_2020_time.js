export default function clock(date,precision="time")
{if(date.constructor!==Date)
 date=new Date();
 let time=
[""
,...precision.includes("date")?[date.getFullYear(),date.getMonth(),date.getDay()]:Array(3)
,...precision.includes("time")?[date.getHours(),date.getMinutes(),date.getSeconds()]:Array(3)
].reduce((time,scale,index)=>
{let digit=String(scale),{length}=digit;
 index=index==6?"":[". ",":"][index-3>0?1:0];
 scale=scale?"0".repeat(Math.max(2,length)-length)+digit+index:"";
 return time+scale;
});
 return time;
}
