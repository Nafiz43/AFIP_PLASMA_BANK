
var load_content='';	
	load_content=load_content+'<div class="form-horizontal">';
	load_content=load_content+'<div class="col-sm-offset-5 col-sm-10">';
	load_content=load_content+'<div  class="lds-roller"><div></div><div></div><div>';
	load_content=load_content+'</div><div></div><div></div><div></div><div></div><div></div></div></div></div>';

	document.getElementById("name").disabled=true;
	document.getElementById("dob").disabled=true;
	document.getElementById("role").disabled=true;
	document.getElementById("mail").disabled=true;
	document.getElementById("address").disabled=true;
	
	document.getElementById("contact").disabled=true;
	document.getElementById("save").style.visibility = "hidden";

	var mail_s= localStorage.getItem("value");
	mail_s=mail_s.replace(".","");
			document.getElementById("loader").innerHTML=load_content;
  			firebase.database().ref('user/'+mail_s).once('value').then(function(snapshot) {
  				if (snapshot.exists()) {

  					document.getElementById("name").value=snapshot.val().name;
  					document.getElementById("dob").value=snapshot.val().dob;
					document.getElementById("role").value=snapshot.val().role;
					document.getElementById("address").value=snapshot.val().address;
					document.getElementById("mail").value=snapshot.val().mail;
					document.getElementById("contact").value= snapshot.val().contact;
	   				 document.getElementById("loader").innerHTML='';
  				}
  				else
  				{
  					content='<br>';
	   				content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
	   				content=content+'<strong>No data </strong>found! </div> ';
   				 	document.getElementById("alert_there").innerHTML=content;
  				}
		     
		  
		}, function(error) {
		    if (error) {
		    	alert("asasasas");
		    	content='<br>';
   				content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
   				content=content+'<strong>No data </strong>found! </div> ';
   				 document.getElementById("alert_there").innerHTML=content;
		      // The write failed...
		    } else {
		    	//enable_btn();
		   
		    }
		  });	
function enable_btn() {
	document.getElementById("name").disabled=false;
	//document.getElementById("dob").disabled=false;
	//document.getElementById("role").disabled=false;
	document.getElementById("address").disabled=false;
	//document.getElementById("mail").disabled=false;
	document.getElementById("contact").disabled=false;
	document.getElementById("save").style.visibility = "visible";
}
function disable_btn() {
	document.getElementById("name").disabled=true;
	document.getElementById("dob").disabled=true;
	document.getElementById("role").disabled=true;
	document.getElementById("address").disabled=true;
	document.getElementById("mail").disabled=true;
	document.getElementById("contact").disabled=true;
	document.getElementById("save").style.visibility = "hidden";
}

function save_info() {
		var name_s=document.getElementById("name").value;
		var address_s=document.getElementById("address").value;
		var contact_s=document.getElementById("contact").value;

	

	if (name_s=='') {
		document.getElementById("name").style.borderColor = "red";

		content='';
	   	content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
	   	content=content+'<strong>Name </strong>cannot be empty! </div> ';
   		document.getElementById("alert_there").innerHTML=content;
	}
	else if (address_s=='') {
		document.getElementById("address").style.borderColor = "red";

		content='';
	   	content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
	   	content=content+'<strong>Address </strong>cannot be empty! </div> ';
   		document.getElementById("alert_there").innerHTML=content;
	}
	else if (contact_s=='') {
		document.getElementById("contact").style.borderColor = "red";

		content='';
	   	content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
	   	content=content+'<strong>Contact </strong>cannot be empty! </div> ';
   		document.getElementById("alert_there").innerHTML=content;
	}
	else
	{
		firebase.database().ref('user/'+mail_s).update({
	        name: name_s,
	   		address : address_s,
	   		contact : contact_s
			    }, function(error) {
		    if (error) {
		    	content='';
			   	content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
			   	content=content+'Check your <strong> internet </strong>connection! </div> ';
		   		document.getElementById("alert_there").innerHTML=content;
		    } else {
		    	disable_btn();
		    }
		  });


	}

}
