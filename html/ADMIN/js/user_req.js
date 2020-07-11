


var load_content='';	
	load_content=load_content+'<div class="form-horizontal">';
	load_content=load_content+'<div class="col-sm-offset-5 col-sm-10">';
	load_content=load_content+'<div  class="lds-roller"><div></div><div></div><div>';
	load_content=load_content+'</div><div></div><div></div><div></div><div></div><div></div></div></div></div>';
document.getElementById("loader").innerHTML=load_content;
 {
var basic_content=''
    var final_content='';
	var table_content='';

	basic_content=basic_content+"<thead>";
	basic_content=basic_content+"<tr>";
	basic_content=basic_content+"<th>Serial</th>";
	basic_content=basic_content+"<th>Name</th>";
	basic_content=basic_content+"<th>E-mail</th>";
	basic_content=basic_content+"<th>DOB</th>";
	basic_content=basic_content+"<th>Option</th>";
	basic_content=basic_content+"</tr>";
	basic_content=basic_content+"</thead>";
	basic_content=basic_content+"<tbody>";       
  
  	var c=1;

  	var rootRef = firebase.database().ref();
  var urlRef = rootRef.child('user');
  urlRef.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    //m=child.val().App_ID;
    //n=child.val().App_date;
    document.getElementById("loader").innerHTML='';
    if (child.val().request_status=="pending") {
      				table_content=table_content+"<tr>";
  					table_content=table_content+" <td>"+c+"</td>";
  					table_content=table_content+"<td>"+child.val().name+"</td>";
  					table_content=table_content+"<td>"+child.val().mail+"</td>";
  					table_content=table_content+"<td>"+child.val().dob+"</td>";
  					var a1=child.val().mail;
  					table_content=table_content+"<td><button id="+a1+" onClick='process123(this.id)'>details</button> </td>";
  					table_content=table_content+"</tr>";
  					

  					final_content="</tbody>";
  					document.getElementById("table").innerHTML=basic_content+table_content+final_content;
  					
  					c=c+1;
				  	content='<br>';
	   				content=content+'<div style="font-size: 16pt" class="alert alert-success" role="alert">';
	   				content=content+'<strong>Data </strong> found! </div> ';
	   				 document.getElementById("alert_there").innerHTML=content;
	   				 document.getElementById("loader").innerHTML='';
        

    }
    else
    {
       document.getElementById("loader").innerHTML='';
    }
    
  });
}, function(error) {
		    if (error) {
		    	content='';
			   	content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
			   	content=content+'Check your <strong> internet </strong>connection! </div> ';
		   		document.getElementById("alert_there").innerHTML=content;
		    } else {
		    	document.getElementById("loader").innerHTML='';    
		    	alert("User removed from the system");
		    	window.location.replace("user_approved.html");

		    	content='';
			   	content=content+'<div style="font-size: 16pt" class="alert alert-success" role="alert">';
			   	content=content+'User  <strong> removed </strong> from the system! </div> ';
			   	document.getElementById("alert_there").innerHTML=content;
		    }
		  });

	
}

function process123(mail_s) {
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
	localStorage.setItem("user_req",mail_s);
	 window.location.replace("user_req_details.html");
	// body...
}
