import http from "http";
import assert from "assert";
function compose(...operations){return operations.reduce((composition,operation)=>(...input)=>operation(composition(...input)));};
function note(...note){let stack=new Error().stack.split("\n");console.log(stack[2].replace(/at ([^ ]+) \((.*)\)/g,(match,stack,place)=>place.replace(typeof window!="undefined"?window.location.protocol+"//"+window.location.hostname:import.meta.url,".")+" ("+stack+"):\n"),...note);return note[0]};

export function check(module)
{import(import.meta.url).then(test=>
{var fails=test.default.reduce((fails,[[test,check],[input,output]])=>
{try
{let result=check(test.split("/").reduce((module,test)=>
 module[test],module)(...input||[]),...output||[]);
 return fails;
}catch(fail)
{return fails.concat([[test,fail]]);
}
},[]);
 //fails.map(([name,fail])=>console.log("\x1b[0m"+name+"\n\x1b[31m"+fail.stack));
 console.log(
 [["TESTING MODULE:"],fails,test.default,module].reduce((tests,part,index,parts)=>
 tests.concat([["\n\x1b[31m):","\n\x1b[32m(:","\n\x1b[34m::"][index-1]
,...(part.length?part:Object.entries(part)).reduce(function enumerate(tests,test,label)
{return [...tests
,(label=Array.isArray(test)?Array.isArray(test[0])?test[0][0]:test[0]:test)
,...Object.entries(index>1&&!test[1].length?test[1]:[]).reduce(enumerate,[]).map(test=>label+"/"+test)
        ]
},[]).filter(test=>!tests.includes(test))])).map((item,index,items)=>item+(index%Math.floor(process.stdout.columns/(items=items.reduce((length,item)=>item.length>length?item.length:length,0)))?" ".repeat(items-item.length):"\n")).join(""));
})
}

export default
[
[["default/get",(output,expected)=>output.then(output=>(output=Object.values(output).map(String))&&assert(["file","[object Object]"].every(type=>output.includes(type))))],
[[""]
]
]
,
[["default/scan",compose(String.startsWith,assert.ok)],
[[{"head":{"title":"layout"},"body":{"h1":[{"literal":"1"},{"literal":"2"}]}}]
,["<html"]
]
]
,
[["default/peripherals",assert.deepEqual],
[[{"head":{"title":"layout"},"body":{"h1":[{"literal":"1"},{"literal":"2"}]}}]
,["<html"]
]
]
,
[["frame",assert.deepEqual],
[["a",{"a":"b"}]
,[{"literal":"b","for":"a","href":"a/","title":"a","id":"a"}]
]
]
,
[["repeat",assert.deepEqual],
[["a",{"a":"b"}]
,[{"literal":"b","for":"a","href":"a/","title":"a","id":"a"}]
]
]
,
[["formify",assert.deepEqual],
[[{"a":"b"}]
 ,[{"label":[{"for":"a","literal":"a","input":{"id":"a","name":"a","type":"text","onchange":undefined,"value":"b"}}]}]
]
]
]