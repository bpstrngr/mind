export default async function script(source,{name})
{if(!window.subject.room.content)
{let  
{EditorView,EditorState,basicSetup,historyKeymap
,lineNumbers,keymap,standardKeymap,closeBrackets,bracketMatching
,foldCode,unfoldCode,foldGutter,history,undo,redo,redoSelection
,defaultHighlighter,highlightSpecialChars,collab
,sendableUpdates,autocompletion,startCompletion
,Transaction,Annotation,getSyncedVersion
}=await import("./haverbeke_2020_codemirror.js");
 let content=window.document.createElement("div");
 let extensions=
[defaultHighlighter,highlightSpecialChars(),history()
,lineNumbers(),foldGutter(),autocompletion(),collab()
,bracketMatching(),closeBrackets()//,multipleSelections()
,keymap([...standardKeymap,...historyKeymap])
];
 source=typeof source=="string"?source:JSON.stringify(source);
 let state=EditorState.create({doc:source,extensions});
 window.subject.room.content=new EditorView({state,dispatch:function(transaction)
{window.subject.room.content.update([transaction]);
 if(transaction.changes.empty)return;
 let [version,updates]=
 [getSyncedVersion,sendableUpdates].map(method=>
 method(window.subject.room.content.viewState.state));
 updates=updates.map(({changes,transaction})=>
 [changes,transaction].map(detail=>
 !detail?detail:detail.toJSON())).map(([changes,transaction],index)=>(
 {...updates[index],changes,transaction}));
 let room=window.subject.room.content.dom.title;
 window.subject.room.emit("save",{room,updates,version})
}});
 Object.assign(window.subject.room.content.contentDOM.style,{whiteSpace:"normal",width:0});
};
 return Object.assign(window.subject.room.content.dom,{title:name});
}