

function fillUpThePersonInformation(serialNo){

	console.log("You want to search using serial number");
	var rootReference=firebase.database().ref("donor/"+serialNo);
	var data=rootReference.once("value",function(snapshot){
		console.log("snapshot val:"+snapshot.val());
		if(snapshot.val()!=null){
			
			var regNo=serialNo;
			var name=snapshot.val().name;
			var address=snapshot.val().address;
			var bloodGroup=snapshot.val().blood_group;
			var contact=snapshot.val().contact;
			var dob=snapshot.val().dob;
			var mail=snapshot.val().mail;
			//var medHistory=snapshot.val().med_history;
			var negDate=snapshot.val().neg_date;
			var posDate=snapshot.val().pos_date;
			var lasDonation=snapshot.val().last_donation_date;	

			var rowDataArray=[regNo,name,address,bloodGroup,contact,dob,mail,
								negDate,posDate,lasDonation];

			console.log(rowDataArray);

			document.getElementById("nameDiv").innerHTML="Name:"+name;
			document.getElementById("addressDiv").innerHTML="Address:"+address;
			document.getElementById("bloodDiv").innerHTML="Blood Group:"+bloodGroup;
			document.getElementById("contactDiv").innerHTML="Contact:"+contact;

			document.getElementById("dobDiv").innerHTML="Date of Birth:"+dob;			
			document.getElementById("emailDiv").innerHTML="Email:"+mail;

			document.getElementById("posDateDiv").innerHTML="Corona Positive Date:"+posDate;
			document.getElementById("negDateDiv").innerHTML="Corona Negative Date:"+negDate;			
					

			}


	});

}


function recordDonationButtonFunction(){
	var recordDonationDiv= document.getElementById("recordDonationDiv");
	if(recordDonationDiv.style.display=="none"){
		recordDonationDiv.style.display="block";
	}else if(recordDonationDiv.style.display=="block"){
		recordDonationDiv.style.display="none";
	}
}

function recordDonationAddButtonFunction(serialNo){
	var donationDateInputValue=document.getElementById("donationDateInput").value;	
	console.log("THE DATE TO BE STORED IS "+donationDateInputValue+"SN:"+serialNo);
	//Code for getting the number of donations
	ref=firebase.database().ref("donor/"+serialNo+"/donationDates");	
	ref.once("value",function(snapshot){
		var numOfChildren=snapshot.numChildren();
		var donatioNumber=parseInt(numOfChildren)+1;
		if(donationDateInputValue!=""){
			ref2=firebase.database().ref("donor/"+serialNo+"/donationDates/"+donatioNumber);	
			ref2.set(donationDateInput.value);	

			ref3=firebase.database().ref("donor/"+serialNo+"/last_donation_date/");	
			ref3.set(donationDateInput.value);	

			location.reload();
		}else{
			window.alert("You need to insert a date");
		}
		

		console.log("Donation="+donatioNumber);
	});
	

	//COMPLETED theCode for getting the number of donations


}

function editInfoButtonFunction(serialNo){
	var recordDonationDiv= document.getElementById("editInfoDiv");
	if(recordDonationDiv.style.display=="none"){
		recordDonationDiv.style.display="block";

		console.log("Serial No :"+serialNo);

		//PUTTING THE DATA INTO THE EDIT INPUTS
		var rootReference=firebase.database().ref("donor/"+serialNo);
		var data=rootReference.once("value",function(snapshot){
		console.log("snapshot val:"+snapshot.val());
		if(snapshot.val()!=null){
			
			var regNo=serialNo;
			var name=snapshot.val().name;
			var address=snapshot.val().address;
			var bloodGroup=snapshot.val().blood_group;
			var contact=snapshot.val().contact;
			var dob=snapshot.val().dob;
			var mail=snapshot.val().mail;
			//var medHistory=snapshot.val().med_history;
			var negDate=snapshot.val().neg_date;
			var posDate=snapshot.val().pos_date;
			var lasDonation=snapshot.val().last_donation_date;	

			var district=snapshot.val().district;
			var area=snapshot.val().area;



			var rowDataArray=[regNo,name,address,bloodGroup,contact,dob,mail,
								negDate,posDate,lasDonation];

			console.log(rowDataArray);

			//FIXING THE DATES
			dob=dob.replace("/","-");
			dob=dob.replace("/","-");
			dob=dob.replace("/","-");


			negDate=negDate.replace("/","-");
			negDate=negDate.replace("/","-");
			negDate=negDate.replace("/","-");

			posDate=posDate.replace("/","-");
			posDate=posDate.replace("/","-");
			posDate=posDate.replace("/","-");

			console.log("DOB="+dob);

			document.getElementById("nameEditInput").value=name;

			document.getElementById("addressEditInput").value=address;
			

			document.getElementById("bloodEditInput").value=bloodGroup;
			document.getElementById("contactEditInput").value=contact;

			document.getElementById("dobEditInput").value=dob;			
			document.getElementById("emailEditInput").value=mail;

			document.getElementById("coronaPosDateEditInput").value=posDate;
			document.getElementById("coronaNegDateEditInput").value=negDate;	

			document.getElementById("districtEditInput").value=district;
			document.getElementById("areaEditInput").value=area;
					

			}
	});
		//DONE PUTTING THE DATA INTO THE EDIT INPUTS




	}else if(recordDonationDiv.style.display=="block"){
		recordDonationDiv.style.display="none";
	}
}


//*************************EDIT BUTTON FUNCTIONS STARTS***********************//
function nameEditButtonFunction(){
	//document.getElementById("nameEditInput").disabled=!(getElementById("nameEditInput").disabled);
	document.getElementById("nameEditInput").disabled=!(document.getElementById("nameEditInput").disabled);
}	
function addressEditButtonFunction(){
	document.getElementById("addressEditInput").disabled=!(document.getElementById("addressEditInput").disabled);
}
function bloodEditButtonFunction(){
	document.getElementById("bloodEditInput").disabled=!(document.getElementById("bloodEditInput").disabled);
}

function contactEditButtonFunction(){
	document.getElementById("contactEditInput").disabled=!(document.getElementById("contactEditInput").disabled);
}


function dobEditButtonFunction(){
	document.getElementById("dobEditInput").disabled=!(document.getElementById("dobEditInput").disabled);
}


function emailEditButtonFunction(){
	document.getElementById("emailEditInput").disabled=!(document.getElementById("emailEditInput").disabled);
}

function coronaPosDateEditButtonFunction(){
	document.getElementById("coronaPosDateEditInput").disabled=!(document.getElementById("coronaPosDateEditInput").disabled);
}

function coronaNegDateEditButtonFunction(){
	document.getElementById("coronaNegDateEditInput").disabled=!(document.getElementById("coronaNegDateEditInput").disabled);
}

function districtEditButtonFunction(){
	document.getElementById("districtEditInput").disabled=!(document.getElementById("districtEditInput").disabled);	
}


function areaEditButtonFunction(){
	document.getElementById("areaEditInput").disabled=!(document.getElementById("areaEditInput").disabled);	
}
//*************************EDIT BUTTON FUNCTIONS ENDS***********************//


//****************************SUBMIT UPDATE BUTTON FUNCTION STARTS****************//
function submitUpdateFunction(id){
	name=document.getElementById("nameEditInput").value;
	address=document.getElementById("addressEditInput").value;
	blood=document.getElementById("bloodEditInput").value;
	contact=document.getElementById("contactEditInput").value;
	dob=document.getElementById("dobEditInput").value;
	email=document.getElementById("emailEditInput").value;
	posDate=document.getElementById("coronaPosDateEditInput").value;
	negDate=document.getElementById("coronaNegDateEditInput").value;
	district=document.getElementById("districtEditInput").value;
	area=document.getElementById("areaEditInput").value;

	//FIXING THE DATES
			dob=dob.replace("-","/");
			dob=dob.replace("-","/");
			dob=dob.replace("-","/");


			negDate=negDate.replace("-","/");
			negDate=negDate.replace("-","/");
			negDate=negDate.replace("-","/");

			posDate=posDate.replace("-","/");
			posDate=posDate.replace("-","/");
			posDate=posDate.replace("-","/");


	console.log(id+name+address+blood+contact+dob+email+posDate+negDate+area+district);


	
	firebase.database().ref('donor/' +id+"/name").set(name);
	firebase.database().ref('donor/' +id+"/address").set(address);
	firebase.database().ref('donor/' +id+"/blood_group").set(blood);
	firebase.database().ref('donor/' +id+"/contact").set(contact);
	firebase.database().ref('donor/' +id+"/dob").set(dob);
	firebase.database().ref('donor/' +id+"/mail").set(email);

	firebase.database().ref('donor/' +id+"/neg_date").set(negDate);
	firebase.database().ref('donor/' +id+"/pos_date").set(posDate);
	
	firebase.database().ref('donor/' +id+"/district").set(district);
	firebase.database().ref('donor/' +id+"/area").set(area);
	
		


}
//****************************SUBMIT UPDATE BUTTON FUNCTION ENDS****************//