
	  // document.getElementById("namep").style.visibility="hidden";
   //    document.getElementById("rankp").style.visibility="hidden";
   //    document.getElementById("unitp").style.visibility="hidden";
   //    document.getElementById("posDatep").style.visibility="hidden";
   //    document.getElementById("bloodp").style.visibility="hidden";
   //    document.getElementById("agep").style.visibility="hidden";
   //    document.getElementById("followUpCountp").style.visibility="hidden";

	  // document.getElementById("namep").style.visibility="hidden";
   //    document.getElementById("rankp").style.visibility="hidden";
   //    document.getElementById("unitp").style.visibility="hidden";
   //    document.getElementById("posDatep").style.visibility="hidden";
   //    document.getElementById("bloodp").style.visibility="hidden";
   //    document.getElementById("agep").style.visibility="hidden";
   //    document.getElementById("followUpCountp").style.visibility="hidden";
      
   //    document.getElementById("namep1").style.visibility="hidden";
   //    document.getElementById("rankp1").style.visibility="hidden";
   //    document.getElementById("unitp1").style.visibility="hidden";
   //    document.getElementById("posDatep1").style.visibility="hidden";
   //    document.getElementById("posDatep2").style.visibility="hidden";
   //    document.getElementById("bloodp1").style.visibility="hidden";
   //    document.getElementById("agep1").style.visibility="hidden";
   //    document.getElementById("followUpCountp1").style.visibility="hidden";

var id;
function getGeneralDataWithId(id){
	var rootReference=firebase.database().ref("patient/"+id);
	var data=rootReference.once("value",function(snapshot){
		console.log("snapshot val:"+snapshot.val());
		if(snapshot.val()!=null){
			
			
			var name=snapshot.val().name;
			var rank=snapshot.val().rank;
			var unit=snapshot.val().unit;
			var posDate=snapshot.val().positiveDate;
			var age=snapshot.val().age;
			var bloodGroup=snapshot.val().bloodGroup;
			var followUpCount=snapshot.val().followUpCount;
			var dataArray=[id,rank,name,unit,posDate,age,bloodGroup,followUpCount];
			insertGeneralDataIntoElements(dataArray);
			console.log(dataArray);



		}
		else{
			console.log("NO DATA RETURNED");
			var dataArray=["","","","","","","",""];
			insertGeneralDataIntoElements(dataArray);
		}	

	});
}


function insertGeneralDataIntoElements(dataArray){
	// document.getElementById("idp").value=dataArray[0];
	id=dataArray[0];
	document.getElementById("rankp").value=dataArray[1];
	document.getElementById("namep").value=dataArray[2];

	document.getElementById("unitp").value=dataArray[3];
	document.getElementById("posDatep").value=dataArray[4];
	document.getElementById("agep").value=dataArray[5];

	document.getElementById("bloodp").value=dataArray[6];
	document.getElementById("followUpCountp").value=dataArray[7];
}


//**********************NOW THE FUNCTIONS FOR MEDICAL DATA******************//


function getMedicalDataWithId(id){
	
	clearTableWithTableId("followUpTable");
	/*addTableHeader("followUpTable",["lung1","lung2","spo21","spo22","antibodyTitar"]);*/
	
	tableHeaderString='<tr ><th align="center" colspan="2"><center> Lung Involvement</center></th><th colspan="2">  <center> SPO2 </center>  </th><th> <center>Antibody Titar</center> </th></tr>';
	addTableHeaderWithString("followUpTable",tableHeaderString);	


	var rootReference=firebase.database().ref("patient/"+id+"/followups");
	rootReference.once("value").then(function(snapshot) {
    		snapshot.forEach(function(childSnapshot) {
      		 	var antibodyTitar=childSnapshot.val().antibodyTitar;
      		 	var lung1=childSnapshot.val().lung1;
      		 	var lung2=childSnapshot.val().lung2;
      		 	var spo21=childSnapshot.val().spo21;
      		 	var spo22=childSnapshot.val().spo22;

      		 	dataArray=[lung1,lung2,spo21,spo22,antibodyTitar];
      		 	console.log(dataArray);

      		 	printDataIntoTable("followUpTable",dataArray,"#ECDDDD");
      		
 		 });

    });
}


//*******************THIS IS THE FUNCTION RELATED TO MEDICAL HISTORY**************************//
function insertMedicalHistoryIntoTable(id){
	clearTableWithTableId("medicalHistoryTable");
		
	tableHeaderString="<tr><th colspan='10'><center>MEDICAL HISTORY</center></th></tr>";
	addTableHeaderWithString("medicalHistoryTable",tableHeaderString);	

	addTableHeader("medicalHistoryTable",["Diabetes","Asthma","HyperTension","Kidney Disease","Liver Disease"
		,"Lung Disease","Skin Disease","Heart Disease","CNS Disease","Other"]);



	var rootReference=firebase.database().ref("patient/"+id+"");
	var data=rootReference.once("value",function(snapshot){
		console.log("snapshot val:"+snapshot.val());
		if(snapshot.val()!=null){
			
			
			var asthma=snapshot.val().asthma;
			var diabetes=snapshot.val().diabetes;
			var hyperTension=snapshot.val().hyperTension;
			var kidneyDisease=snapshot.val().kidneyDisease;

			var liverDisease=snapshot.val().liverDisease;
			var lungDisease=snapshot.val().lungDisease;
			var skinDisease=snapshot.val().skinDisease;

			var heartDisease=snapshot.val().heartDisease;
			var cnsDisease=snapshot.val().cnsDisease;
			var otherDisease=snapshot.val().otherDisease;

			var dataArray=[diabetes,asthma,hyperTension,kidneyDisease,liverDisease,lungDisease,
			skinDisease,heartDisease,cnsDisease,otherDisease];
			printDataIntoTable("medicalHistoryTable",dataArray,"#ECDDDD");
			//console.log(+dataArray);



		}
		else{
			console.log("NO DATA MEDICAL RETURNED");
			var dataArray=["","","","","","","",""];
			insertGeneralDataIntoElements(dataArray);
		}	

	});

}

//*******************DONE MAKING THE FUNCTION RELATED TO MEDICAL HISTORY**************************//


//**********************THERE ARE TABLE RELATED FUNCTIONS*****************//
function printDataIntoTable(tableID,dataArray,color){
	
	table=document.getElementById(tableID);
	tableRowString="<tr >";
	
	
	var keyData=dataArray[0];
	for(var i=0;i<dataArray.length;i++){
		//console.log("i="+i);
		tableRowString+='<td align="center">'
		tableRowString+=dataArray[i];	
			
		tableRowString+="</td>"

	}
	
	tableRowString+="</tr>"	
	table.innerHTML=table.innerHTML+tableRowString
	//console.log(table.innerHTML);
}


function addTableHeader(tableID,dataArray){
	table=document.getElementById(tableID);
	tableRowString="<tr>";
	//console.log(tableRowString);
	//console.log("Data sent to me:"+dataArray+",length="+dataArray.length);
	for(var i=0;i<dataArray.length;i++){
		//console.log("i="+i);
		tableRowString+='<th align="center" class="tg-3t0u">'
		tableRowString+=dataArray[i];	
		tableRowString+="</th>"

	}
	tableRowString+="</tr>"	
	tableRowString+="</tr>"	

	table.innerHTML=table.innerHTML+tableRowString
}


function addTableHeaderWithString(tableId,htmlString){
	table=document.getElementById(tableId);
	table.innerHTML=table.innerHTML+htmlString;
}


//THIS FUNCTION CLEARS INCLUDING HEADER
function clearTableWithTableId(tableId){
	document.getElementById(tableId).innerHTML="";

}
//**********************DONE WITH TABLE RELATED FUNCTIONS*****************//


function makeTheFormVisible(){
	document.getElementById("followUpEntryDiv").style.display="block";
	
}


function addFollowUpToDatabase(){



	// =document.getElementById("idp").value;
	var spo21=document.getElementById("spo21").value;
	var spo22=document.getElementById("spo22").value;
	var lung1=document.getElementById("lung1").value;
	var lung2=document.getElementById("lung2").value;
	var antibodyTitar=document.getElementById("antibodyTitar").value;
	var followupCount=document.getElementById("followUpCountp").value;
	followupCount=parseInt(followupCount)+1;

	console.log(id+spo21+spo22+lung1+lung2+antibodyTitar+followupCount);
	
	

	firebase.database().ref('patient/' +id+"/followups/followup"+followupCount).set({
    spo21: spo21,
    spo22: spo22,
    lung1: lung1,
    lung2: lung2,
    antibodyTitar:antibodyTitar,
    
  	});


  	firebase.database().ref('patient/' +id+"/followUpCount").set(followupCount);
	//****************RELOADING THE ENTIRE PAGE******************//	
	location.reload();


}

