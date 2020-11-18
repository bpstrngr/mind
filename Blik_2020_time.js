export default function clock(date,precision="time")
{if(!date||!date.getFullYear)
 date=new Date();
 let time=
[""
,...precision.includes("date")?[date.getFullYear(),date.getMonth(),date.getDay()]:Array(3)
,...precision.includes("time")?[date.getHours(),date.getMinutes(),date.getSeconds()]:Array(3)
].map(unit=>unit===undefined?"":String(unit)).reduce((time,unit,mark)=>
{let {length}=unit;
 mark=mark==6?"":[". ",":"][mark-3>0?1:0];
 unit=unit?"0".repeat(Math.max(2,length)-length)+unit+mark:"";
 return time+unit;
});
 return time;
}
