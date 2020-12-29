export default function clock(date,precision="time")
{if(!isNaN(Number(date)))
 date=new Date(date);
 if(!date||!date.getFullYear)
 date=new Date();
 let time=
[""
,...precision.includes("date")?[date.getFullYear(),date.getMonth()+1,date.getDate()]:Array(3)
,...precision.includes("time")?[date.getHours(),date.getMinutes(),date.getSeconds()]:Array(3)
].map(value=>value===undefined?"":String(value)).reduce((time,value,index)=>
{let zeros="0".repeat(Math.max(2,value.length)-value.length);
 let separator=index<6?index<4?index==3?". ":".":":":"";
 if(!value)return time;
 return time+zeros+value+separator;
});
 return time;
}
