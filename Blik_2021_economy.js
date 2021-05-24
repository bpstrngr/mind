if(!globalThis.window&&(import.meta.url.replace("file://","")==process.argv[1])&&process.argv.slice(2).length)
[process.argv.splice(2),0].reduce(([command,...args])=>
import(import.meta.url).then(module=>module[command](...args)));
else note("import without arguments");

import clock from "./Blik_2020_time.js";
import {note,resolve,compose,digest} from "./Blik_2020_platform.js";
import {scan,markup} from "./Blik_2020_document.js";

function disclosure(date=new Date())
{let deadline={Month:1,Date:26}
 let previous=Object.entries(deadline).every(([key,value])=>date["get"+key]()<value);
 return new Date(date.getFullYear()+(previous?-1:1),...Object.values(deadline))
}

export async function submit(bill)
{//if(bill.created)return;
 let validate=(...entry)=>entry.reduce((value,pattern)=>pattern.test(value)&&value);
 let timestamp=validate(new Date().toISOString(),/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d{1,3})?Z/);
 let invoiceNumber=new Date(bill.created).getFullYear()+"/"+bill.id;
 let requestId=validate([new Date().getFullYear(),"QUERY",1].join("_"),/[+a-zA-Z0-9_]{1,30}/);
 let taxCode=bill.business["tax code"];
 let [taxNumber,vatCode,countyCode]=taxCode?taxCode.split("-"):[];
 let login=validate(parameters.tax.login,/[a-zA-Z0-9]{6,15}/);
 let signature=parameters.hungary.tax.signature;
 let exchangekey=parameters.hungary.tax.exchangekey;
 let softwareId=validate("HU"+taxNumber+"ECONOMY1",/[0-9A-Z\-]{18}/);
 let values={timestamp,requestId,taxNumber,login,softwareId};
 let missing=Object.entries(values).find(([,value])=>!value);
 if(missing)throw Error("missing "+missing[0]);
 let passwordHash=await new Promise(resolve=>import("repl").then(({start})=>start(
 {prompt:login+" password: "
 ,"eval":compose(digest("sha512"),hash=>hash.toUpperCase(),resolve)
 })));
 let partialAuthentication=requestId+timestamp.replace(/[^\d]/g,"").slice(0,14)+signature;
 let hash=compose(digest("sha3-512"),hash=>hash.toUpperCase());
 let TokenExchangeRequest=
 {"@xmlns":"http://schemas.nav.gov.hu/OSA/3.0/api"
 ,"@xmlns:common":"http://schemas.nav.gov.hu/NTCA/1.0/common"
 ,"common:header":
 {"common:requestId":requestId
 ,"common:timestamp":timestamp
 ,"common:requestVersion":"3.0"
 ,"common:headerVersion":"1.0"
 }
 ,"common:user":
 {"common:login":login
 ,"common:passwordHash":{"@cryptoType":"SHA-512","#text":passwordHash}
 ,"common:taxNumber":taxNumber
 ,"common:requestSignature":{"@cryptoType":"SHA3-512","#text":await hash(note(partialAuthentication))}
 } //"common.xsd"
 ,software:
 {softwareId
 ,softwareName:"economy"
 ,softwareOperation:"LOCAL_SOFTWARE"
 ,softwareMainVersion:"1"
 ,softwareDevName:"Patrik Blik"
 ,softwareDevContact:"blikpatrik@gmail.com"
 ,softwareDevCountryCode:undefined
 ,sofwareDevTaxNumber:undefined
 } //"invoiceApi.xsd"
 };
 let body=note(markup(JSON.parse(JSON.stringify({TokenExchangeRequest}))," "));
 let headers={"Content-Type":"application/xml",Accept:"application/xml"};
 let exchangeToken=await resolve("https://api.onlineszamla.nav.gov.hu/invoiceService/v3/tokenExchange",{method:"POST",headers,body}).then(note);
 let {createDecipheriv}=await import("crypto");
 let decipher=createDecipheriv('aes-128-ecb',exchangekey,"");
 decipher.setAutoPadding(true);
 exchangeToken=[decipher.update(exchangeToken,"base64","utf8"),decipher.final("utf8")].join('');
 //let business=await resolve("https://api.onlineszamla.nav.gov.hu/invoiceService/v3/queryTaxPayer",{method:"POST",headers,body}).then(note);
 let address=({country,zip,city,street,house})=>({countryCode:country,postalCode:zip||"0000",city,additionalAddressDetail:[street,house].join(" ")});
 let invoiceData=
 {invoiceNumber,invoiceIssueDate:bill.created,completenessIndicator:true
 ,invoiceMain:
 {invoice:
 {invoiceHead:
 {supplierInfo:{supplierName:bill.business.name,supplierTaxNumber:{taxpayerId:taxNumber,vatCode,countyCode},supplierAddress:address(bill.business)}
 ,customerInfo:{customerName:bill.client.name,customerVatStatus:"OTHER",customerVatData:{thirdStateTaxId:bill.client["tax code"]},customerAddress:address(bill.client)}
 ,invoiceDetail:{invoiceCategory:"SIMPLIFIED",invoiceAppearance:"ELECTRONIC",invoiceDeliveryDate:bill.delivered||bill.created,smallBusinessIndicator:true,currencyCode:"GBP",exchangeRate:bill.MNB,paymentDate:bill.expected}
 }
 ,invoiceLines:
 {line:
[{lineNumber:1
 ,lineExpressionIndicator:false
 ,quantity:1,unitOfMeasure:"PIECE",unitPrice:875
 ,lineGrossAmountSimplified:875
 ,lineGrossAmountSimplifiedHUF:875*bill.MNB
 ,lineVatRate:{outOfScope:{case:"ATK"}}
 }
]}
 }
 ,batchInvoice:undefined
 }
 };
 invoiceData=Buffer.from(JSON.stringify(invoiceData)).toString("base64");
 let compressedContent=Math.pow(1000,2)<invoiceData.size||false;
 let invoiceOperation=
[{index:1,invoiceData,invoiceOperation:"CREATE"
 ,electronicInvoiceHash:{"@cryptoType":"SHA3-512","#text":""}
 }
];
 let indexHashes=await Promise.all(ManageInvoiceRequest.invoiceOperations.invoiceOperation.map(({invoiceOperation,invoiceData})=>hash(invoiceOperation+invoiceData)));
 TokenExchangeRequest["common:user"]["common:requestSignature"]["#text"]=await hash(note(partialAuthentication+indexHashes.join("")));
 let ManageInvoiceRequest=
 {exchangeToken
 ,invoiceOperations:{invoiceOperation,compressedContent}
 };
 let QueryTransactionListRequest=
 {page:1
 ,insDate:{dateTimeFrom:"2021-05-08T06:46:42.223Z",dateTimeTo:"2021-05-12T08:53:16.165Z"}
 };
 Object.assign(QueryTransactionListRequest,TokenExchangeRequest);
 body=note(markup(JSON.parse(JSON.stringify({QueryTransactionListRequest}))," "));
 //note(scan(body,undefined,"http://schemas.nav.gov.hu/OSA/2.0/"))
 //resolve("https://api-test.onlineszamla.nav.gov.hu/invoiceService/v3/manageInvoice",{method:"POST",headers,body})
 await resolve("https://api.onlineszamla.nav.gov.hu/invoiceService/v3/queryTransactionList",{method:"POST",headers,body}).then(note);
}

async function document(bill,gbprate)
{if(bill.created)return;else
 bill.created=note(clock(new Date(),"date").trim());
 let address=business=>["zip","city","street","house"].map(key=>business[key]).join(" ");
 let title=text=>["Kiállító","Vevo","Tételek"].some(title=>text.includes(title));
 let verticaloffset=texts=>texts.reduce((height,text)=>height+(Array.isArray(text)?text.length:1),0);
 import("./mrrio_2020_jspdf"+(globalThis.window?".js":"_node.js")).then(({jsPDF,__moduleExports})=>
{let pdf=new (jsPDF||__moduleExports.jsPDF)({format:[20,8],unit:"cm"}).setFontSize(9).setFont("courier","bold");
 let lineheight=4.1/pdf.getFontSize();
 let texts=
["Elektronikus számla"
,""
,"Sorszám:                 "+new Date(bill.created).getFullYear()+"/"+bill.id+"."
,"Kiállítva:           "+bill.created
,""
,["Kiállító:",bill.business.name,bill.business.type].join(" ")
,""
,pdf.splitTextToSize("Cím: "+address(bill.business),6)
,"Adóazonosító jel:       "+bill.business.identifier
,"Adószám:           "+bill.business["tax code"]
,"Bank:           "+bill.business.bank
,""
,["Vevo:",note(bill.client).name,bill.client.type].join(" ")
,""
,pdf.splitTextToSize("Cím: "+address(bill.client),6)
,"Adószám:           "+bill.client["tax code"]
,""
,"Tételek  (egységár * menny.; ÁFA):"
,""
,bill.name
,String(bill.value)+" * 1; TEHK"
,""
,"TEHK: Áfa területi hatályán kívül"
,"Nettó összeg:            "+bill.value+" GBP"
,"ÁFA:                       0 GBP"
,"Bruttó összeg:           "+bill.value+" GBP"
,"Napi árfolyam (MNB):     "+gbprate
,"Bruttó összeg:        "+Math.round(bill.value*gbprate)+" HUF"
,""
,"Teljesítve:           "+(bill.delivered||bill.created)
,...bill.expected?["Fizetési határido:    "+bill.expected.replace(/-/g,".")+"."]:[]
];
 texts.reduce((pdf,text,index,texts)=>
{pdf.setFont("courier",!index||title(text)?"bold":"normal");
 pdf.text(text
,index?title(text)?0.75:(text[0]=="8")?7.1:0.9:pdf.internal.pageSize.width/2
,lineheight*verticaloffset(texts.slice(0,index))+2
,index?text[0]=="8"?{align:"right"}:undefined:{align:"center"});
 return pdf;
},pdf);
 texts.map(title).map((title,index)=>
 title&&index&&((verticaloffset(texts.slice(0,index))+5)*lineheight)).filter(Boolean).forEach(line=>
 pdf.line(0.75,line,pdf.internal.pageSize.width-0.75,line,"F"));
 pdf.setFontSize(4).text(",,",3.98,16.34)
 pdf.setFontSize(4).text(",,",1.35,7.7)
 let file=
[bill.business.name.split(" ")[0],bill.created.replace(/\./g,""),bill.client.name.split(" ")[0],bill.id
].join("_")+".pdf";
 return pdf.save(note(file,"saved"))
});
 return bill.value||0;
}

async function report(bills,gbprate)
{let scope=[new Date(),13].reduce((date,pivot)=>
 date.getDate()<pivot?(date.getMonth()||12):date.getMonth());
 let subject=bills.filter(({created})=>
 new Date(created).getMonth()==scope);
 let profit=bills.reduce((sum,{value})=>value||0+sum,0);
 //note(scan({"soap:Envelope":{"tns:GetCurrentExchangeRatesRequestBody":{}}},undefined,"http://www.mnb.hu/webservices/"))
 subject.map(bill=>document(bill,gbprate));
 subject.map(bill=>submit(bill,gbprate).catch(note));
 let tax=0;
 if(profit>debt["yearly tax-free profit limit"])
 tax=["monthly profit tax","foreign share"].reduce((tax,key)=>
 tax*debt[key]
,profit-debt["yearly tax-free profit limit"]);
 let debts=["business tax","camara commission"];
 debts=Object.fromEntries(debts.map(key=>[key,debt[key]]));
 let closure=disclosure();
 note({bills:bills.length,subject:subject.length,profit,tax,...debts,scope,closure})
}

export default async function invoice(economy)
{let gbprate=await resolve("http://www.mnb.hu/arfolyamok.asmx"
,{method:"POST",body:`<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://www.mnb.hu/webservices/">
    <soap:Body><tns:GetCurrentExchangeRatesRequestBody/></soap:Body>
  </soap:Envelope>
`,headers:{"Content-Type":"text/xml",SOAPAction:"GetCurrentExchangeRates",Accept:"text/xml"}
 }).then(soap=>soap.match(/GBP\"&gt;([0-9,]*)/)[1].replace(",",".")).then(Number);
 ({default:economy}=await resolve(economy));
 let businesses=Object.entries(economy).map(([name,business])=>Object.assign(business
,{name:name.split(".").map(name=>name[0].toUpperCase()+name.slice(1)).join(" ")
 }));
 businesses.forEach(business=>
 Object.entries(business.bill||{}).map(([client,bills])=>
 bills.map(bill=>
 Object.assign(bill,
 {business:{...business,bill:undefined}
 ,client:{...economy[client],bill:undefined}
 }))).forEach(bills=>report(bills,gbprate)));
}

export async function respond()
{
}

const debt=
 {"camara commission":5000
 ,"municipal business tax":5000
 ,"incomeshare-europeanshare-etc tax":50000
 ,"yearly tax-free profit limit":3000000
 ,"monthly average tax-free limit":1000000
 ,"monthly profit tax":0.4
 ,"monthly average tax":0.4
 ,"foreign share":0.7142
 ,"company vehicle tax":0
 ,"conservation tax":0
 ,"environment tax":0
 ,"health tax":0
 ,"exchange rate":"MNB"
 };
