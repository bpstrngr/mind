import assert from "assert";
function compose(...operations){return operations.reduce((composition,operation)=>(...input)=>operation(composition(...input)));};

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