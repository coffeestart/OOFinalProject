//		排程監控

//IP
var turnkeyLogTask_Url="https://evmiogc.micloud.tw/v1.0";
//DatastreamsId
var turnkeyLogTask_DatastreamsId="12";
var turnkeyLogTask_Schedule_Name="TurnkeyLogTask";
//設定排程時間
var turnkeyLogTask_RepeatTime=7.084;

//IP
var writeInvoiceInfoTask_Url="https://evmiogc.micloud.tw/v1.0";
//DatastreamsId
var writeInvoiceInfoTask_DatastreamsId="18";
var writeInvoiceInfoTask_Schedule_Name="WriteInvoiceInfoTask";
//設定排程時間
var writeInvoiceInfoTask_RepeatTime=3.084;

//IP
var turnkey_Url="https://evmiogc.micloud.tw/v1.0";
//DatastreamsId
var turnkey_DatastreamsId="6";
var turnkey_Schedule_Name="Turnkey";
//設定排程時間
var turnkey_RepeatTime=5.084;


//		檔案監控

//IP
var MiTMS_TP2AP01_Url="https://evmiogc.micloud.tw/v1.0";
//ThingsId
var MiTMS_TP2AP01_ThingId="21";

//IP
var MiTMS_TP2NFS_Url="https://evmiogc.micloud.tw/v1.0";
//ThingsId
var MiTMS_TP2NFS_ThingId="33";



function TurnkeyLogTask(){
	tableAjax(turnkeyLogTask_Schedule_Name,turnkeyLogTask_Url,turnkeyLogTask_DatastreamsId,turnkeyLogTask_RepeatTime);
}
function WriteInvoiceInfoTask(){
	tableAjax(writeInvoiceInfoTask_Schedule_Name,writeInvoiceInfoTask_Url,writeInvoiceInfoTask_DatastreamsId,writeInvoiceInfoTask_RepeatTime);
} 
function Turnkey(){
	tableAjax(turnkey_Schedule_Name,turnkey_Url,turnkey_DatastreamsId,turnkey_RepeatTime);
}
function MiTMSTP2AP01(){
	fileAjax(MiTMS_TP2AP01_Url,MiTMS_TP2AP01_ThingId);
}
function MiTMSTP2NFS(){
	fileAjax(MiTMS_TP2NFS_Url,MiTMS_TP2NFS_ThingId)
}
function tableAjax(name,url,dsId,scheduleTime){
var nowTime=new Date().valueOf();
var dt;
var date;
var tempDate;
var tempTime;
var color;
$.ajax({
   async:false,
   url:""+url+"/Datastreams("+dsId+")?$expand=Observations($select=phenomenonTime,result)",
   dataType:"json",
   type:"GET"
}).done(function(response){
	lastdatatime=new Date(response.Observations[0]["phenomenonTime"]).valueOf();
	if((nowTime-lastdatatime)/60000 > scheduleTime*3){
		setTimeout(function(){ play() }, 1000);
		}else{}
		
$.each(response.Observations,function(key,value){     /*jQuery  .each(arr,function(index,value))
													  或者是   .each(對象,function(key,value)) 
													  ex: var person{
															name: '1',
															age: '2'
													  	  } 
															name age->key   1 2 ->value
													  */											
	date=new Date(value.phenomenonTime);
	
	dt=(nowTime-date.valueOf())/60000;
//	console.log("dt"+dt)
    
	nowTime=date.valueOf();
	if(dt>(scheduleTime*3)){
		color="tomato";
	}else if(dt>scheduleTime){
		color="yellow";
	}else if(dt<=scheduleTime){
		color="yellowgreen";
	}else {
		color="black";
		console.log("dt error")
	}
	tempDate=date.getFullYear()+ "/" + (date.getMonth() + 1) + "/" + date.getDate();
	tempTime=date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() 
	$('#TurnkeyLogTask').append("<tr style='background-color:"+color+"'><td>"+name
+"</td><td>"+tempDate+" "+tempTime+"</td><td>"+dt.toFixed(1)+"分鐘</td></tr>");
			})		
		})	
}
function fileAjax(url,thingId){
var dt;
var date;
var tempDate;
var tempTime;
$.ajax({
	async:false,
	url:""+url+"/Things("+thingId+")?$expand=Datastreams/Observations($select=result,phenomenonTime)",
dataType:"json",
type:"GET"	
}).done(function(response){
	$.each(response.Datastreams,function(key,value){
	$.each(value.Observations,function(ObsKey,ObsValue){
		date=new Date(ObsValue.phenomenonTime);
		tempDate=date.getFullYear()+ "/" + (date.getMonth() + 1) + "/" + date.getDate();
		tempTime=date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() 
		if(value["name"].includes("發送")){
			tempstr="發送"
				}else{tempstr="接收"
					}
		$('#MiTMS_TP2AP01').append("<tr><td>"+tempstr+"</td><td>"+ObsValue.result+"</td><td>"+tempDate+" "+tempTime+"</td></tr>");
		})
	})

})	
}
function play(){
	var x = document.getElementById("myAudio");
	x.play();
}

