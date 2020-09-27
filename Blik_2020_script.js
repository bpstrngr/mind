export default async function script(source,{name})
{let codemirror=await import("./haverbeke_2020_codemirror.js");
 let 
 {EditorView,keymap,EditorState,lineNumbers,standardKeymap
 ,closeBrackets,bracketMatching,foldCode,unfoldCode,foldGutter
 ,history,undo,redo,redoSelection
 ,autocompletion,startCompletion}=
 codemirror;
 console.log(standardKeymap)
 let mac=false;
  if(window.document.onkeydown!=suppresssave)window.document.onkeydown=suppresssave;
 if(!window.subject.content)
{let content=window.document.createElement("div");
 source=typeof source=="string"?source:JSON.stringify(source);
 window.form.content=new EditorView(
 {state:EditorState.create({doc:source})
 ,extensions:
[lineNumbers(),history(),foldGutter(),autocompletion(),bracketMatching(),closeBrackets
,keymap(standardKeymap.concat({key:"Ctrl-S",run:contribute}))
//[{"Mod-z":undo},{"Mod-Shift-z":redo},{"Mod-u":view=>undoSelection(view)||true},{[mac?"Mod-Shift-u":"Alt-u"]:redoSelection}
//,{"Ctrl-y":mac?undefined:redo},{"Mod-Alt-[":foldCode},{"Mod-Alt-]":unfoldCode},{"Mod-Space":startCompletion}
//])
]});
 window.form.content.contentDOM.style.whiteSpace="normal";
 /*CodeMirror(content,
 {lineNumbers:true,mode:"text",theme:"monokai",lineWrapping:true,cursorHeight:1,indentUnit:2
 ,indentWithTabs:false,tabSize:2,foldGutter:["CodeMirror-linenumbers","CodeMirror-foldgutter"]
 ,minimap:true,autoCloseBrackets:true,matchBrackets:true
 ,extraKeys:{"Ctrl-S":contribute,"Ctrl-/":"undo"}
 });
 if(!window.mirrorstyle)
{window.mirrorstyle=window.document.head.appendChild(window.document.createElement("link"));window.mirrorstyle.setAttribute("rel","stylesheet");window.mirrorstyle.href="./codemirror_2019/codemirror-5.48.4/lib/codemirror.css";
 window.monokai=window.document.head.appendChild(window.document.createElement("link"));window.monokai.setAttribute("rel","stylesheet");window.monokai.href="./codemirror_2019/codemirror-5.48.4/theme/monokai.css";
}//document.styleSheets[0].insertRule(Array.prototype.reduce.call(document.styleSheets[0].rules,(ruletext,rule,index)=>{if(rule.selectorText!=".cm-s-monokai.CodeMirror")return ruletext;document.styleSheets[0].removeRule(index);return ruletext},".cm-s-monokai.CodeMirror{position:absolute;background-color:transparent;text-align:left; height:"+window.innerHeight+"px;width:"+window.innerWidth+"px;"));
 window.form.content.setValue(typeof source=="string"?source:JSON.stringify(source));
 */
 window.form.socket;
 window.form.socket.on("save",({author,subject,content})=>subject?author!=window.form.socket.id?window.form.socket.content.setValue(decodeURIComponent(escape(atob(content)))):window.Tone.Transport.start():console.log("failed"));
}window.form.content.dom.title=name;
 return window.form.content.dom;
}

function suppresssave(e){e=e||window.event;if(!e.ctrlKey)return;switch(e.which||e.keyCode){case 83:case 87:e.preventDefault();e.stopPropagation();break;}};

function contribute(content)
{let buffer=new FileReader();
 let parcel=unescape(encodeURIComponent(content.getValue()));console.log(parcel)
 let parcelarray=new Array(parcel.length);
 for(let i=0;i<parcel.length;i++){parcelarray[i]=parcel.charCodeAt(i);};console.log(parcelarray)
 let bytes=new Uint8Array(parcelarray);console.log(bytes)
 var blob=new Blob([bytes],{type:'text/plain'});
 buffer.onload=function(event)
{window.form.socket.emit("save",{subject:content.display.wrapper.id,content:btoa(event.target.result)})
 //fetch("client/peer/comments",{"method":"POST",'Content-Type':'multipart/mixed;boundary="-------314159265358979323846"'}).then(response=>response.text()).then(console.log)
}
/*{gapi.client.drive.files.get({'fileId':instance.display.wrapper.name}).execute(response=>gapi.client.request(
{'path':'/upload/drive/v2/files/'+instance.display.wrapper.name,'method':'PUT','params':{'uploadType':'multipart','alt':'json'},'headers':{'Content-Type':'multipart/mixed;boundary="-------314159265358979323846"'},
 'body':"\r\n---------314159265358979323846\r\nContent-Type: application/json\r\n\r\n"+JSON.stringify(response)+"\r\n---------314159265358979323846\r\nContent-Type: "+(blob.type||'application/octet-stream')+'\r\nContent-Transfer-Encoding: base64\r\n\r\n'+btoa(event.target.result)+'\r\n---------314159265358979323846--'
}).execute(response=>{spin(window[instance.display.wrapper.name]);window[instance.display.wrapper.name].onclick();console.log(response)}));
}*/
 //while(window[instance.display.wrapper.name].lastChild.nodeName!="#text")window[instance.display.wrapper.name].removeChild(window[instance.display.wrapper.name].lastChild)
 //spin(window[instance.display.wrapper.name],true)
 buffer.readAsBinaryString(blob);
}