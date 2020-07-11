   //document.getElementById("loader").disabled = true;

 var load_content='';
   load_content=load_content+'<div class="form-horizontal">';
  load_content=load_content+'<div class="txt1 text-center p-t-26 p-b-20">';
  load_content=load_content+'<div  class="lds-roller"><div></div><div></div><div>';
  load_content=load_content+'</div><div></div><div></div><div></div><div></div><div></div></div></div></div>';

function check(form) { 
		var s_mail;
	    var s_username;
	   	var s_userpass;
	   	var m_body='';
	   var userid=document.getElementById("userid").value;
	  // var retype_pass=document.getElementById("retype_pass").value;
	   var content='';
        content=content+'<div class="alert alert-danger" role="alert">';
        var input = $('.validate-input .input100');

        if (userid=='') {
	 		  	var thisAlert = $(input[0]).parent();
       			$(thisAlert).addClass('alert-validate');

       			content=content+'UserID cannot be empty! </div> ';
            	document.getElementById("alert_there").innerHTML=content;	   		
	   }
	   else{
	   		
	   		document.getElementById("loader").innerHTML=load_content;
	   		var mail_s=userid.replace(".","");
	   		mail_s=mail_s.replace(".","");
	   		mail_s=mail_s.replace(".","");
	   		mail_s=mail_s.replace(".","");
	   		mail_s=mail_s.replace(".","");
	   		mail_s=mail_s.replace(".","");
	   		mail_s=mail_s.replace(".","");
	   		mail_s=mail_s.replace(".","");
	   		mail_s=mail_s.replace(".","");
	   		mail_s=mail_s.replace(".","");
	   		mail_s=mail_s.replace(".","");
	   		mail_s=mail_s.replace(".","");

	   		firebase.database().ref('user/' + mail_s).once('value').then(function(snapshot) {

                     s_username = snapshot.val().username;
                      s_userpass = snapshot.val().userpass;
		                {
		                 var recovery=	Math.floor((Math.random() * 100000) + 1);
		               
		                  m_body=m_body+"Hello "
		                  m_body=m_body+s_username;
					   	  m_body=m_body+"!! Your Recovery code is : ";
					   	  m_body=m_body+recovery;
					   	  localStorage.setItem("recovery_code",recovery);
					   	  localStorage.setItem("recovery_mail",mail_s);

						Email.send({
						Host: "smtp.gmail.com",
						Username : "cmhplasmatherapy@gmail.com",
						Password : "CSE-0101",
						To : userid,
						From : "cmhplasmatherapy@gmail.com",
						Subject : "Recovery Password",
						Body : m_body ,
						}).then(function(message){
				            alert("Recovery code is sent to your e-mail");
							window.location.replace("recovery_code.html");

						});

		                 }
  
                      
                  }).catch(function(error) {
                    content=content+'Invalid UserID!! </div> ';
                    document.getElementById("alert_there").innerHTML=content;
                    document.getElementById("loader").innerHTML='';
                    //document.getElementById("userid").style.borderColor = "red";
  // Uh-oh, an error occurred!
                });
                  


				

	   		// window.close();
              //  	window.open('forgot_password_confirm.html');
	   			   	 

	   }



              
                 
                     
     }
