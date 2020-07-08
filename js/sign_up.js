   //document.getElementById("loader").disabled = true;

 var load_content='';
   load_content=load_content+'<div class="form-horizontal">';
  load_content=load_content+'<div class="txt1 text-center p-t-26 p-b-20">';
  load_content=load_content+'<div  class="lds-roller"><div></div><div></div><div>';
  load_content=load_content+'</div><div></div><div></div><div></div><div></div><div></div></div></div></div>';
  var content='<br>';
    content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';

function check(form) { 

		 var content='';
        content=content+'<div class="alert alert-danger" role="alert">';
        var input = $('.validate-input .input100');

		var name_s=document.getElementById("name").value;
		var address_s=document.getElementById("address").value;
		var contact_s=document.getElementById("contact").value;
		var mail_s=document.getElementById("mail").value;
		var dob_s=document.getElementById("dob").value;
		var password_s=document.getElementById("password").value;
		var confirm_password_s=document.getElementById("confirm_password").value;
		var role_s=document.getElementById("role").value;
		var request_status_s="pending";
		var c=0;

		if (name_s=='') {
				var thisAlert = $(input[0]).parent();
       			$(thisAlert).addClass('alert-validate');
            	c=c+1;
		}
		if (address_s=='') {
				var thisAlert = $(input[1]).parent();
       			$(thisAlert).addClass('alert-validate');
            	c=c+1;
		}
		if (contact_s=='') {
				var thisAlert = $(input[2]).parent();
       			$(thisAlert).addClass('alert-validate');
            	c=c+1;
		}
		if (mail_s=='') {
				var thisAlert = $(input[3]).parent();
       			$(thisAlert).addClass('alert-validate');
            	c=c+1;
		}
		if (dob_s=='') {
				var thisAlert = $(input[4]).parent();
       			$(thisAlert).addClass('alert-validate');
            	c=c+1;
		}
		if (password_s=='') {
				var thisAlert = $(input[5]).parent();
       			$(thisAlert).addClass('alert-validate');
            	c=c+1;
		}
		if (confirm_password_s=='') {
				var thisAlert = $(input[6]).parent();
       			$(thisAlert).addClass('alert-validate');
            	c=c+1;
		}
		if (password_s!=confirm_password_s) {
			content=content+'Password and confirm password did not match! </div> ';
            document.getElementById("alert_there").innerHTML=content;
			c=c+1;
		}
		if (c!=0) {
				
				content=content+'Fill Out All The Fields! </div> ';
            	document.getElementById("alert_there").innerHTML=content;
		}
		if (c==0) {

			document.getElementById("loader").innerHTML=load_content;
         	var str = mail_s;
			mail_s = str.replace(".", "");
  			firebase.database().ref('user/'+mail_s).once('value').then(function(snapshot) {
  				if (snapshot.exists()) {
  				content='<br>';
   				content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
   				content=content+'Same <strong>e-mail</strong> already used in the system. Try another...! </div> ';
   				document.getElementById("alert_there").innerHTML=content;
   				document.getElementById("loader").innerHTML='';
  				}
  				else
  				{
		  					firebase.database().ref('user/' + mail_s).set({
								name: name_s,
								address: address_s,
								contact: contact_s,
								mail: mail_s,
								dob: dob_s,
								password : password_s,
								role: role_s,
								request_status: request_status_s
						  }, function(error) {
						    if (error) {
						    	content='<br>';
				   				content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
				   				content=content+'Check your <strong>internet </strong>connection and try again...! </div> ';
				   				 document.getElementById("alert_there").innerHTML=content;
						    } else {
						    	window.location.replace("sign_up_confirm.html");
						  
						    }
						  });
  				}
		     
		  
		}, function(error) {
		    if (error) {
		    	content='<br>';
   				content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
   				content=content+'Check your <strong>internet </strong>connection! </div> ';
   				 document.getElementById("alert_there").innerHTML=content;
		    } else {
		    	
		   
		    }
		  });



			


		 }                          
}
