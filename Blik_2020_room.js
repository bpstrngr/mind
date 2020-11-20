import document from "./Blik_2020_document.js";
import {note,fetch,compose} from "./Blik_2020_window.js";

export async function open(port,room)
{let socket=await import(process.execPath.replace("bin/node","lib/node_modules")+"/socket.io/lib/index.js");
 socket=socket.default(port);
 socket.set("transports",['websocket']);
 socket.on("connection",async function(peer)
{let {referer,cookie}=peer.handshake.headers;
 let author=cookie&&cookie.match(/signature=[^;]+/);
 let url=author&&author[0].replace("=","/");
 ({author}=url?await fetch(url):{author:"anonymous"});
 [Object.assign(peer,{author}),...Object.entries(room)].reduce((peer,[key,value])=>
 typeof value!="function"?peer:peer.on(key,value)).broadcast.emit("send"
,{author:system,message:peer.author+" entered"});
})
};

export default
 {join(room)
{this.join(room);
 this.adapter.rooms[room].messages
?this.emit("messages",this.adapter.rooms[room].messages)
:this.adapter.rooms[room].messages=[];
 this._events.message.bind(this)({author:system,message:note(this.author+" joined "+room),room});
 return this.adapter.rooms[room];
},sign(author){this.author=author;}
 ,signal(room){this.server.sockets.in(room).emit("signal",this.author)}
 ,message({author,message,room})
{message={author:author||{name:this.author},message};
 if(!author)
 (this.adapter.rooms[room]||this._events.join.bind(this)(room)).messages.push(message);
 this.server.sockets.in(room).emit("message",message);
},save:async function({room,updates,version})
{this.room=this.adapter.rooms[room]||this.join(room);
 let {EditorState,collab,receiveUpdates,getSyncedVersion,ChangeSet}=
 await import("./haverbeke_2020_codemirror.js");
 if(!this.room.track)this.room.track=await fetch(room).then(doc=>
 EditorState.create({doc:doc.toString(),extensions:[collab()]}));
 let received=updates.map(serializechanges).map((changes,index)=>({...updates[index],changes}));
 //if(note([version,getSyncedVersion(this.room.content)]).reduce((next,past)=>next>past))
 this.room.track.update(receiveUpdates(this.room.track,received));
 let body=this.room.track.doc.toString();
 let headers={"Content-Type":"text/plain"};
 let message=await fetch(room+"?force=overwrite",{method:"put",body,headers});
 if(message instanceof Error)
 return this.emit("message",{author:system,message});
 else message=this.author+" edited "+room;
[["save",{author:this.author,room,updates}]
,["message",{author:system,message}]
].map(event=>
 this.server.sockets.in(room).emit(...event));
},disconnect(text)
{Object.keys(this.adapter.rooms).forEach(room=>
 this.leave(room)&&
 this._events.message.bind(this)({author:system,message:this.author+" left "+room,room}));
},put:async function({room,body})
{this.room=this.adapter.rooms[room]||this.join(room);
 if(!this.room.content)
 await fetch(room).then(content=>this.room.content=content);
 this.room.content=JSON.stringify(body);
 let message=await fetch(room+"?force=overwrite"
,{method:"put",body:this.room.content
 ,headers:{"Content-Type":"text/plain"}
 });
 if(message instanceof Error)
 return this.emit("message",{author:system,message});
[["put",{body}]
,["message",{author:system,message:this.author+" updated "+room}]
].map(event=>this.server.sockets.in(room).emit(...event))
}}

export var peer=
 {message({message,author:{name,image}})
{message=document.scan({li:{img:{src:image||"vector/anonymous",height:"12px"},div:{"#text":name||"anonymous"},span:{"#text":message}}})
 if(name=="system")
 setTimeout(done=>(message.style="opacity:0;transition:all 1s;")&&
 setTimeout(done=>message.remove()
,1000)
,10000);
 if(!this.message)
 this.reform({room:{message:"",...!this.labels.message&&{code:""}}})&&
 this.insertBefore(this.message.parentNode,this.querySelector("label"));
 this.message.parentNode.lastChild.addEventListener("click",click=>this.dispatchEvent(new Event("resign")));
 return this.message.parentNode.querySelector("ul").appendChild(message);
},signal(signal)
{let list=this.message.parentNode.querySelector("ul");
 let node=list.querySelector("span#signal");
 list[node?"replaceChild":"appendChild"](document.scan({span:{id:"signal",signal:window.document.createRange().createContextualFragment(signal)}}),node);
 node=list.querySelector("span#signal");
 signal=node.textContent;
 setTimeout(timeout=>node.textContent==signal&&node.remove(),3000);
},save({author,room,updates})
{if(author==window.subject.labels.message)
 return window.Tone.Transport.start();
 updates.map(serializechanges).forEach((changes,index)=>
 Object.assign(updates[index],{changes}));
 this.room.content.update([receiveUpdates(this.room.content.viewState.state,updates)]);
}}

var system={name:"system",icon:"vector/deer"};

var serializechanges=({changes})=>
Array.isArray(changes)
?ChangeSet.fromJSON(changes)
:changes.toJSON();