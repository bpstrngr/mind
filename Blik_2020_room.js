import room from "./Blik_2020_room.js";
import file,{log} from "./Blik_2020_file.js";
import store from "./Blik_2020_store.js";
var note=log(import.meta.url).then(log=>note=log);

export async function open(port,socket)
{let module=await import(process.execPath.replace("bin/node","lib/node_modules")+"/socket.io/lib/index.js");
 module.default(port).on("connection",async peer=>
{let cookie=peer.handshake.headers.cookie;
 cookie=cookie.split("authority=")[1];
 let author=cookie
?await store("./Blik_2020_authority.json",{name:String,author:String},"author").get({...peer.handshake,url:[cookie.split(";")[0]]}).then(({author})=>author)
:peer.id;
 [Object.assign(peer,{author}),...Object.entries(socket)].reduce((peer,[key,value])=>
 typeof value!="function"?peer:peer.on(key,value)).broadcast.emit("send"
,{author:{name:"system",icon:"vector/deer"},message:peer.author+" entered"})
})
};

export default
{join(room)
{this.join(room);
 this.adapter.rooms[room].messages
?this.emit("messages",this.adapter.rooms[room].messages)
:this.adapter.rooms[room].messages=[];
 this._events.message.bind(this)({author:{name:"system",image:"vector/deer"},message:note(this.author+" joined "+room),room});
 return this.adapter.rooms[room];
}
,signal(room){this.server.sockets.in(room).emit("signal","micheld#scan{height:1em} "+this.author)}
,message({author,message,room})
{message={author:author||{name:this.author},message};
 if(!author)
 (this.adapter.rooms[room]||room.join.bind(this)(room)).messages.push(message);
 this.server.sockets.in(room).emit("message",message);
}
,save({room,content})
{this.room=this.adapter.rooms[room]||room.join(room);
 this.room[room].content=content;
 file.post(room,Buffer.from(content,'base64').toString(),true).then(file=>file
?this.sockets.emit("save",{author:mind.id,room,content:content})
:mind.emit("save","fail"));
}
,disconnect(text)
{Object.keys(this.adapter.rooms).forEach(room=>
 this.leave(room)&&
 this._events.message.bind(this)({author:{name:"system",icon:"vector/deer"},message:this.id+" left "+room,room}));
}
}