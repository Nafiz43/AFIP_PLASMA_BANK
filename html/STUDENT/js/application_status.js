var load_content='';	
	load_content=load_content+'<div class="form-horizontal">';
	load_content=load_content+'<div class="col-sm-offset-5 col-sm-10">';
	load_content=load_content+'<div  class="lds-roller"><div></div><div></div><div>';
	load_content=load_content+'</div><div></div><div></div><div></div><div></div><div></div></div></div></div>';
function application_status() {
		table_content='';
 		document.getElementById("loader").innerHTML=load_content;
 		var c=1;
		var basic_content=''
    	var final_content='';
		var table_content='';
		basic_content='';
		basic_content=basic_content+'<table class="table table-striped" border="1">';
	
		basic_content=basic_content+'<thead >';
		basic_content=basic_content+'<tr>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Ser No.</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Course Code</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Faculty</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Date</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Status</th>';
		basic_content=basic_content+'</tr>';
		basic_content=basic_content+' </thead>';
		basic_content=basic_content+'<tbody>';

		table_content=table_content+'<tr>';

 		var s_id = localStorage.getItem("value");
 		var faculty;
 		var course_id;

 	var rootRef = firebase.database().ref();
  var urlRef = rootRef.child('application/');
  urlRef.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    	 
    var faculty=child.key; //teacher name
    
   
	    var rootRef2 = firebase.database().ref();
	  	var urlRef2 = rootRef2.child('application/'+faculty+'/');
	 	urlRef2.once("value", function(snapshot) {
	    snapshot.forEach(function(child) {
	    var m2=child.key; //date is there
	  //date is assigned as m2=date

	    //alert(m2);
	    	var rootRef3 = firebase.database().ref();
		  	var urlRef3 = rootRef3.child('application/'+faculty+'/'+m2);
		 	urlRef3.once("value", function(snapshot) {
		    snapshot.forEach(function(child) {
		    var m3=child.key; //got the time slot
		   

		    if (child.val().App_ID==s_id) {
		    	table_content=table_content+'<td align="center">'+c+'</td>';
  					
  					table_content=table_content+'<td align="center">'+child.val().App_course+'</td>';
  					table_content=table_content+'<td align="center">'+child.val().App_faculty+'</td>';  
  					table_content=table_content+'<td align="center">'+child.val().App_date+'</td>';  

  					if (child.val().App_status=='Approved') {
  						table_content=table_content+'<td align="center"><b> <font color="green">'+child.val().App_status+'</font></b></td>'; 
  					}
  					else if(child.val().App_status=='pending' || child.val().App_status=='Pending')
  					{
  						table_content=table_content+'<td align="center"><b> <font color="blue">'+child.val().App_status+'</font></b></td>'; 
  					}
  					else
  					{
  						table_content=table_content+'<td align="center"><b> <font color="red">'+child.val().App_status+'</font></b></td>'; 
  					}
  					
  			
  				
					table_content=table_content+'</td>';
					table_content=table_content+'</tr>';
  					 
					 final_content=final_content+'</tbody>';
					final_content=final_content+'</table>';
					document.getElementById("loader").innerHTML='';
					document.getElementById("table_content").innerHTML=basic_content+table_content+final_content;
					final_content='';
					c=c+1;

					var content='';
			content=content+'<div style="font-size: 16pt" class="alert alert-success" role="alert">';
			content=content+'<strong>Data </strong>Found! </div> ';
        	document.getElementById("alert_there").innerHTML=content;
		    }
		    else
		    {
		    	if(c>1)
		    	{

		    	}
		    	else
		    	{
		    		var content='';
					content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
					content=content+'Data<strong> Not </strong>Found! </div> ';
        			document.getElementById("alert_there").innerHTML=content;
		    	}
		    	
		    }
		   // alert(faculty+" "+ child.val().App_ID);
		    
			    

			  });
			});
			// if (c>1) {

			// }
			// else
			// {
			// 	content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
			// content=content+'No <strong>Data </strong>Found! </div> ';
   //      	document.getElementById("alert_there").innerHTML=content;
			// }

	    
		  });
		});

    
  });
});


		

  					
	
}