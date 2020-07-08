   var load_content='';
  load_content=load_content+'<div class="form-horizontal">';
  load_content=load_content+'<div class="txt1 text-center p-t-26 p-b-20">';
  load_content=load_content+'<div  class="lds-roller"><div></div><div></div><div>';
  load_content=load_content+'</div><div></div><div></div><div></div><div></div><div></div></div></div></div><br>';

function check(form) {  
	   var new_pass=document.getElementById("new_pass").value;
	   var retype_pass=document.getElementById("retype_pass").value;
	   var content='';
        content=content+'<div class="alert alert-danger" role="alert">';
        var input = $('.validate-input .input100');

  
     if (new_pass=='' && retype_pass=='') {
	 		  	var thisAlert = $(input[1]).parent();
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
       var mail_s=localStorage.getItem("recovery_mail");
             
					     	userid=mail_s.replace(".","");
					     	firebase.database().ref('user/' + userid).update({
              				   		password : new_pass
              					  }, function(error) {
              					    if (error) {
              					    	content=content+'<strong>Failed </strong> to save new Password!! </div> ';
                              document.getElementById("alert_there").innerHTML=content;
              					    } 
                            else
                            {

                              window.location.replace("recovery_code_change_confirm.html");
              					    }
              					  });



	   
	   	
	   	 

	   }



              
                 
                     
     }
