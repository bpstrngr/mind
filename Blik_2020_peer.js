import {vectors,awesome,note,path,compose} from "./Blik_2020_document.js";
import {window,fetch,resolve,newconsole} from "./Blik_2020_window.js";
import {reform,open} from "./Blik_2020_form.js";

if(globalThis.window)
window.onload=async function()
{window.console=newconsole.bind(this)();
 let keys=await fetch("google/key").then(response=>response.json().then(json=>JSON.parse(new TextDecoder("utf-8").decode(new Uint8Array(json.data))))).catch(note)
 if(!(keys instanceof Error))
 Promise.all(
[import("https://apis.google.com/js/api.js").then(module=>
 gapi.load("client:auth2",done=>gapi.auth2.init({client_id:keys.google.client,scope:"https://www.googleapis.com/auth/drive"})))
,import("https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js").then(firebase=>
 firebase.initializeApp(keys.google.firebase)&&
 import("https://www.gstatic.com/firebasejs/7.20.0/firebase-analytics.js").then(products=>
 firebase.analytics()))
,import("https://www.googletagmanager.com/gtag/js?id=UA-123329239-3").then(analytics=>
 Object.entries({js:new Date(),config:"UA-123329239-3"}).map(entry=>
 (window.dataLayer=window.dataLayer||[]).push(entry)))
]);
 await import('./Zwarts_2015_vibrant.js');
 this.tone=import("./Yotam_2019_Tone.js").then(done=>
 this.tone=
 {string:new Tone.PolySynth(16,this.Tone.Synth).toMaster()
 ,drum:new Tone.Synth({oscillator:{type:'sine',modulationFrequency:0.2},envelope:{attack:0,decay:0.1,sustain:0,release:0.1}}).toMaster()
 ,chord:new Tone.Sequence((time,note)=>note?this.tone.string.triggerAttackRelease(note,"5hz",time):this.Tone.Transport.stop(),["C4","A3","G3",false],"45n").start()
 });
 window.subject.room=import("./rauch_2014_socket.io.slim.js").then(done=>
 window.subject.room=io({transports:['websocket']}).connect(window.location.origin));
 await Promise.all([vectors,awesome]);
 open(window.subject);
 let fields=Object.fromEntries([...new URLSearchParams(window.location.search)]);
 if(fields.source)(fields.name=fields.source)&&delete fields.source;
 window.subject.reform({get:{name:fields.name||"",...fields}});
 if(window.location.hostname!="epistemology.cf")
 window.subject.dispatchEvent(new Event("submit"));
 Object.assign(window,{note,resolve});
}
