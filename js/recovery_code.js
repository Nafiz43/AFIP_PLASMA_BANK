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

        if (userid=='') 
        {
	 		  	var thisAlert = $(input[0]).parent();
       			$(thisAlert).addClass('alert-validate');

       			content=content+'Enter recovery code! </div> ';
            	document.getElementById("alert_there").innerHTML=content;	   		
	   }
	   else
	   {
	      	document.getElementById("loader").innerHTML=load_content;
	   		var recovery= localStorage.getItem("recovery_code");
	   		if (userid==recovery) 
	   		{
	   			window.location.replace("recovery_code_change.html");
	   		}
	   		else
	   		{
	   			content=content+'Recovery code is not correct! </div> ';
            	document.getElementById("alert_there").innerHTML=content;	
	   		}
	   		


	   }



              
                 
                     
     }
