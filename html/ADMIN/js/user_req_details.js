

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
	var c=0;
	var mail_s= localStorage.getItem("user_req");
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
	   				 c=1;
  				}
  				else
  				{
  					content='<br>';
	   				content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
	   				content=content+'<strong>No data </strong>found! </div> ';
   				 	document.getElementById("alert_there").innerHTML=content;
   				 	document.getElementById("loader").innerHTML=load_content;
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
		    	if (c==0) {
		    			content='<br>';
	   				content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
	   				content=content+'<strong>No data </strong>found! </div> ';
   				 	document.getElementById("alert_there").innerHTML=content;
   				 	document.getElementById("loader").innerHTML=load_content;
		    	}
		    
		   
		    }
		  });	


function approve() {
		document.getElementById("loader").innerHTML=load_content;
		firebase.database().ref('user/'+mail_s).update({
	        request_status: "approved"
			    }, function(error) {
		    if (error) {
		    	content='';
			   	content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
			   	content=content+'Check your <strong> internet </strong>connection! </div> ';
		   		document.getElementById("alert_there").innerHTML=content;
		    } else {
		    	document.getElementById("loader").innerHTML='';
		    	alert("User request approved");
		    	window.location.replace("user_req.html");
		    	content='';
			   	content=content+'<div style="font-size: 16pt" class="alert alert-success" role="alert">';
			   	content=content+'User request <strong> approved </strong>! </div> ';
			   	document.getElementById("alert_there").innerHTML=content;
		    }
		  });
	
}
function reject() {
		firebase.database().ref('user/'+mail_s).update({
	        request_status: "rejected"
			    }, function(error) {
		    if (error) {
		    	content='';
			   	content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
			   	content=content+'Check your <strong> internet </strong>connection! </div> ';
		   		document.getElementById("alert_there").innerHTML=content;
		    } else {
		    	document.getElementById("loader").innerHTML='';
		    	alert("User request rejected");
		    	window.location.replace("user_req.html");
		    	content='';
			   	content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
			   	content=content+'User request <strong> rejected </strong>! </div> ';
			   	document.getElementById("alert_there").innerHTML=content;
		    }
		  });
	
}