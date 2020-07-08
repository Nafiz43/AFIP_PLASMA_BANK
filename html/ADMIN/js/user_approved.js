
var load_content='';	
	load_content=load_content+'<div class="form-horizontal">';
	load_content=load_content+'<div class="col-sm-offset-5 col-sm-10">';
	load_content=load_content+'<div  class="lds-roller"><div></div><div></div><div>';
	load_content=load_content+'</div><div></div><div></div><div></div><div></div><div></div></div></div></div>';
document.getElementById("loader").innerHTML=load_content;

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
    if (child.val().request_status=="approved") {
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
				  	content='';
	   				content=content+'<div style="font-size: 16pt" class="alert alert-success" role="alert">';
	   				content=content+'<strong>Data </strong> found! </div> ';
	   				 document.getElementById("alert_there").innerHTML=content;
	   				 document.getElementById("loader").innerHTML='';
        

    }
    else
    {
      //alert('error occured');
    }
    
  });
});

 // document.getElementById("loader").innerHTML=load_content;
 //  			firebase.database().ref('user').child().orderByChild("request_status").equalTo("pending").once('value').then(function(snapshot) {

 //  				if (snapshot.exists()) {
  				

 //  				}
 //  				else
 //  				{
 //  					content='<br>';
	//    				content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
	//    				content=content+'<strong>No Pending </strong>request found! </div> ';
 //   				 	document.getElementById("alert_there").innerHTML=content;
 //  				}
		     
		  
	// 	}, function(error) {
	// 	    if (error) {
	// 	    	alert("asasasas");
	// 	    	content='<br>';
 //   				content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
 //   				content=content+'<strong>No data </strong>found! </div> ';
 //   				 document.getElementById("alert_there").innerHTML=content;
	// 	      // The write failed...
	// 	    } else {
	// 	    	alert('asasas');
	// 	    	content='<br>';
 //   				content=content+'<div style="font-size: 16pt" class="alert alert-success" role="alert">';
 //   				content=content+'<strong>Data </strong> found! </div> ';
 //   				 document.getElementById("alert_there").innerHTML=content;
		   
	// 	    }
	// 	  });

function process123(mail_s) {
	localStorage.setItem("user_approved",mail_s);
	 window.location.replace("user_approved_details.html");
	// body...
}

