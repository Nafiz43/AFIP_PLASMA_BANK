   var load_content='';
  load_content=load_content+'<div class="form-horizontal">';
  load_content=load_content+'<div class="txt1 text-center p-t-26 p-b-20">';
  load_content=load_content+'<div  class="lds-roller"><div></div><div></div><div>';
  load_content=load_content+'</div><div></div><div></div><div></div><div></div><div></div></div></div></div><br>';

function check(form) { 
 // document.getElementById("loader").innerHTML='';
		var userid=localStorage.getItem("value");
	   var current_pass=document.getElementById("current_pass").value;
     
	   var new_pass=document.getElementById("new_pass").value;
	   var retype_pass=document.getElementById("retype_pass").value;
	   var content='';
        content=content+'<div class="alert alert-danger" role="alert">';
        var input = $('.validate-input .input100');

  

        if (current_pass=='' && new_pass=='' && retype_pass=='') {
        		var thisAlert = $(input).parent();
       			$(thisAlert).addClass('alert-validate');
       			content=content+'Fill Out All The Fields! </div> ';
            	document.getElementById("alert_there").innerHTML=content;
        }
	   else if (current_pass=='' && new_pass=='') {
	 		  	var thisAlert = $(input[0]).parent();
       			$(thisAlert).addClass('alert-validate');

       			var thisAlert = $(input[1]).parent();
       			$(thisAlert).addClass('alert-validate');

       			content=content+'Fill Out All The Fields! </div> ';
            	document.getElementById("alert_there").innerHTML=content;	   		
	   }
	   else if (new_pass=='' && retype_pass=='') {
	 		  	var thisAlert = $(input[1]).parent();
       			$(thisAlert).addClass('alert-validate');

       			var thisAlert = $(input[2]).parent();
       			$(thisAlert).addClass('alert-validate');

       			content=content+'Fill Out All The Fields! </div> ';
            	document.getElementById("alert_there").innerHTML=content;	   		
	   }
	   else if (current_pass=='' && retype_pass=='') {
	 		  	var thisAlert = $(input[0]).parent();
       			$(thisAlert).addClass('alert-validate');

       			var thisAlert = $(input[2]).parent();
       			$(thisAlert).addClass('alert-validate');

       			content=content+'Fill Out All The Fields! </div> ';
            	document.getElementById("alert_there").innerHTML=content;	   		
	   }
	   else if(new_pass!=retype_pass){
	   			content=content+'New Password and Retype Password Field not matched! </div> ';
            	document.getElementById("alert_there").innerHTML=content;

	   }
	   else if(current_pass==''){
	   	 	var thisAlert = $(input[0]).parent();
	        $(thisAlert).addClass('alert-validate');
	  	 	content=content+'Empty Current Password field not allowed! </div> ';
            document.getElementById("alert_there").innerHTML=content;

	   }
	   else if (new_pass=='') {
	   		
		   	var thisAlert = $(input[1]).parent();
	        $(thisAlert).addClass('alert-validate');

	   		content=content+'New Password is required! </div> ';
            document.getElementById("alert_there").innerHTML=content;
	   }
	   else if (retype_pass=='') {
	   	
		   	var thisAlert = $(input[2]).parent();
	        $(thisAlert).addClass('alert-validate');

	   		content=content+'Retype New Password! </div> ';
            document.getElementById("alert_there").innerHTML=content;
	   }
	   else{
       document.getElementById("loader").innerHTML=load_content;      
      userid=userid.replace(".","");
	   	firebase.database().ref('user/' + userid).once('value').then(function(snapshot) {
                      var s_userpass = snapshot.val().password;                      
                      if(s_userpass==current_pass){
                            firebase.database().ref('user/' + userid).update({
              				   		password : new_pass
              					  }, function(error) {
              					    if (error) {
              					    	content=content+'<strong>Failed </strong> to save new Password!! </div> ';
                              document.getElementById("alert_there").innerHTML=content;
              					    } 
                            else
                            {
                              window.location.replace("change_password_confirm.html");
              					    }
              					  });
                      }
                      else
                      {
                        content=content+'<strong>Current Password </strong> did not matched!! </div> ';
                        document.getElementById("alert_there").innerHTML=content;
                        document.getElementById("loader").innerHTML='';
                      }
                    
                      
                  }).catch(function(error) {
                        content=content+'Check your <strong>internet </strong> connection and try again...!! </div> ';
                        document.getElementById("alert_there").innerHTML=content;
                        document.getElementById("loader").innerHTML='';
                });
	   	
	   	 

	   }



              
                 
                     
     }
