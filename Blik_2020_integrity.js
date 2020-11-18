import http from "http";
import {output} from "./Blik_2020_file.js";
var note=output(import.meta.url);

export var check=(module,tests)=>import(tests).then(function(test)
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
 note(
 [["INTEGRITY SCAN:"],fails,test.default,module].reduce((tests,part,index,parts)=>
 tests.concat([["\n\x1b[31m):","\n\x1b[32m(:","\n\x1b[34m()"][index-1]
,...(part.length?part:Object.entries(part)).reduce(function enumerate(tests,test,label)
{return [...tests
,(label=Array.isArray(test)?Array.isArray(test[0])?test[0][0]:test[0]:test)
,...Object.entries(index>1&&test[1]&&!test[1].length?test[1]:[]).reduce(enumerate,[]).map(test=>label+"/"+test)
        ]
},[]).filter(test=>!tests.includes(test))])).map((item,index,items)=>item+(index%Math.floor(process.stdout.columns/(items=items.reduce((length,item)=>item.length>length?item.length:length,0)))?" ".repeat(items-item.length):"\n")).join(""));
});