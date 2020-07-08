		var s_id ;
	    //var s_id = localStorage.getItem("value");
		var absent_count=0;
		var present_count=0;
		var excused_count=0;
		var percentage=0;
		var g_course;
		//var course_text;
		var c=1;
	
		var content='';
		var count=0;
		var basic_content='';
    	var final_content='';
		var table_content='';
		var initial_course='';
		var f_course_text;
		var promises = [];

var load_content='';	
	load_content=load_content+'<div class="form-horizontal">';
	load_content=load_content+'<div class="col-sm-offset-5 col-sm-10">';
	load_content=load_content+'<div  class="lds-roller"><div></div><div></div><div>';
	load_content=load_content+'</div><div></div><div></div><div></div><div></div><div></div></div></div></div>';

	


document.getElementById("detailed_content").style.visibility = "hidden";
 function process(s_id)
{
	
	//alert("calling for "+s_id);
	initial_course='';
	present_count=0;
	absent_count=0;
	excused_count=0;

	 promise =new Promise((resolve,reject)=>{
    setTimeout(function() {
				  		

	   var rootRef0 = firebase.database().ref();
 	 var urlRef0 = rootRef0.child('Enrolled/CSE-17A/');
 	 urlRef0.once("value", function(snapshot) {
    snapshot.forEach(function(child) {

    	 //course_text=child.key;
    	 var course_text=child.key;
    	 //alert("all courses "+course_text);
    	// alert(f_course_text+" "+course_text);
    	 if (f_course_text==course_text || course_text=='CSE-499') {
    	//alert("out loop "+course_text);
    	 var rootRef_0 = firebase.database().ref();
 	 var urlRef_0 = rootRef_0.child('Enrolled/CSE-17A/'+course_text+'/');
 	 urlRef_0.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
     					if (child.val().ID==s_id) {
     						//alert("in loop millo");
							{
				  		//alert("start processing");
    						var rootRef = firebase.database().ref();
						  var urlRef = rootRef.child('attendance/CSE-17A/'+course_text+'/');
						  urlRef.once("value", function(snapshot) {
						    snapshot.forEach(function(child) {
						    	 
						    var faculty=child.key; //teacher name
						    
						   	//	alert(faculty);
							    var rootRef2 = firebase.database().ref();
							  	var urlRef2 = rootRef2.child('attendance/CSE-17A/'+course_text+'/'+faculty+'/');
							 	urlRef2.once("value", function(snapshot) {
							    snapshot.forEach(function(child) {
							    var m2=child.key; //date is there
							  //date is assigned as m2=date

							  //  alert(m2);
							    	var rootRef3 = firebase.database().ref();
								  	var urlRef3 = rootRef3.child('attendance/CSE-17A/'+course_text+'/'+faculty+'/'+m2+'/');
								 	urlRef3.once("value", function(snapshot) {
								    snapshot.forEach(function(child) {
								    var m3=child.key; //got the time slot
								//	alert(m3);
								    	c=0;
								    	//alert(course_text+" "+faculty+" "+m2+" "+m3+" "+s_id);
									    firebase.database().ref('attendance/CSE-17A/'+course_text+'/'+faculty+'/'+m2+'/'+m3+'/'+s_id).once('value').then(function(snapshot) {
								  				if (snapshot.exists()) {

								  					//alert(initial_course+" "+course_text);
											        if (initial_course=='') {
											        	initial_course=course_text;
											        }
											        else if(initial_course==course_text)
											        {

											        //	alert(c+" "+course_text+" "+ present_count+" "+absent_count+" "+excused_count+" "+percentage);
											        }
											        else if (initial_course!=course_text)
											        {
											        	
											        	//alert("here goes the resolve");
											        	//alert(c+" "+course_text+" "+ present_count+" "+absent_count+" "+excused_count+" "+percentage);
											        	count=count+1;
														//alert("res :"+initial_course+" "+ present_count+" "+absent_count+" "+excused_count+" "+percentage);
														table_content=table_content+'<td align="center">'+count+'</td>';
														  					
														  					table_content=table_content+'<td align="center">'+s_id+'</td>';
														  					table_content=table_content+'<td align="center">'+c+'</td>';
														  					table_content=table_content+'<td align="center">'+present_count+'</td>';  //total present
														  					table_content=table_content+'<td align="center">'+absent_count+'</td>';  //absent
														  					table_content=table_content+'<td align="center">'+excused_count+'</td>';  //excused
														  					table_content=table_content+'<td align="center">'+percentage+'% </td>'; 
														  					if (percentage>=89) {
														  						table_content=table_content+'<td align="center">'+'Collegiate'+'</td>';
														  					}
														  					else if(percentage>74 && percentage<89)
														  					{
														  						table_content=table_content+'<td align="center">'+'Non-Collegiate'+'</td>';
														  					}
														  					else
														  					{
														  						table_content=table_content+'<td align="center">'+'Dis-Collegiate'+'</td>';
														  					}
														  					//table_content=table_content+'<td align="center">'+'Collegiate'+'</td>'; 
														  					
																			table_content=table_content+'</td>';
																			table_content=table_content+'</tr>';
														  					 
																			 final_content=final_content+'</tbody>';
																			final_content=final_content+'</table>';
																			
																			document.getElementById("table_content").innerHTML=basic_content+table_content+final_content;
																			final_content='';
																			c=0;
																			//alert("issue solved");
																			initial_course=course_text;
																			present_count=0;
																			absent_count=0;
																			excused_count=0;
																			//if (course_text=='CSE-499') {
																				resolve("done");
																			//}
																			 document.getElementById("loader").innerHTML='';


											        }
											        

								  					c=c+1;
								  					//alert("hello");
								  					 s_present = snapshot.val().p_status;
								  					 s_excused = snapshot.val().p_excused;
								  					 s_absent  = 1- s_present;
								  					 

								  					// // alert(s_present+'  '+s_excused);
								  				
								  					 if (s_present==1) {
								  					 	present_count=present_count+1;
								  					 	
								  					 }
								  					 else
								  					 {
								  					 	absent_count=absent_count+1;
								  					 
								  					 }


								  					  if (s_excused==1) {
								  					  	excused_count=excused_count+1;
								  					 	//table_content=table_content+'<td><label><input type="checkbox" disabled checked></label> </td>';
								  					 }
								  					 
								  			
													content='';
											    	content=content+'<div style="font-size: 16pt" class="alert alert-success" role="alert">';
											 		content=content+'<strong>Data </strong>Found! </div> ';
											        document.getElementById("alert_there").innerHTML=content;
											        percentage = parseFloat((present_count/(c- excused_count) )*100 );
													

											        
			
			 
												


								  					 
								  				}
								  				else
								  				{
								  					//content='<br>';
									   				//content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
									   				//content=content+'<strong>No data as no snapshot </strong>found! </div> ';
								   				 	//document.getElementById("alert_there").innerHTML=content;
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

										    	alert('asasas');
										    	content='<br>';
								   				content=content+'<div style="font-size: 16pt" class="alert alert-success" role="alert">';
								   				content=content+'<strong>Data </strong> found! </div> ';
								   				 document.getElementById("alert_there").innerHTML=content;
										   		content=content+'<div style="font-size: 16pt" class="alert alert-success" role="alert">';
												content=content+'<strong>Data </strong>Found! </div> ';
    										    document.getElementById("alert_there").innerHTML=content;
										    }
										  });
											
											//alert(present_count+" "+absent_count+" "+excused_count+" "+percentage);
									  });
									});

							    
								  });
								});

						    
						  });
						});

	

    			}
     					}
    		
			    	 });
				});

			}
    	 });
	});

		
		}, 10);

    });
    promises.push(promise);
}

async function collegiate() {
	var course=document.getElementById("course");
	f_course_text=course.options[course.selectedIndex].text;

	var content='';
    content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';

	var batch=document.getElementById("batch");
	var batch_text=course.options[batch.selectedIndex].text;

	if(f_course_text=='Choose your option' && batch_text=='Choose your option')
	{
		document.getElementById("course").style.borderColor = "red";
		document.getElementById("batch").style.borderColor = "red";
		content=content+'<strong>Fill Out </strong>The Fields! </div> ';
       document.getElementById("alert_there").innerHTML=content;
	}
	else if(f_course_text=='Choose your option')
	{
		document.getElementById("course").style.borderColor = "red";
		content=content+'<strong>Select </strong>Course! </div> ';
       document.getElementById("alert_there").innerHTML=content;
	}
	
	else if(batch_text=='Choose your option')
	{
		document.getElementById("batch").style.borderColor = "red";
		content=content+'<strong>Select </strong>Batch! </div> ';
       document.getElementById("alert_there").innerHTML=content;
	}
	else
	{ 
		content='';
		table_content='';
		 document.getElementById("loader").innerHTML=load_content;
  		var arr=[];
				
		basic_content='';
		basic_content=basic_content+'<table class="table table-striped" border="2">';
	
		basic_content=basic_content+'<thead >';
		basic_content=basic_content+'<tr>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Ser No.</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">ID</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Total Class</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Total Present</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Total Absent</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Total Excused</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Percentage</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Status</th>';
		basic_content=basic_content+'</tr>';
		basic_content=basic_content+' </thead>';
		basic_content=basic_content+'<tbody>';

		table_content=table_content+'<tr>';

  			// 		
		

      //  s_id='201714023';
        

        
        
          
           
      var kk=0;
         var rootRef_10 = firebase.database().ref();
 	 var urlRef_10 = rootRef_10.child('Enrolled/CSE-17A/'+f_course_text+'/');
 	 urlRef_10.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    	//alert(child.val().ID);
    	arr[kk]=child.val().ID;
    	//alert(arr[kk].toString());
    	kk=kk+1;
    	

    	// alert("in loop");
    	//  s_id=
    	 // alert(s_id);
    	  //process(s_id);
    	  //result = await Promise.all(promises);

    	 // alert("hello man");
    	  //alert(s_id);
    	// // s_id='201714043';
    	// // process(s_id);







    	});
	});
 	 
setTimeout(async function(){ 
	//alert(kk);
 	// alert("Now here");
 	 for (var i = 0; i < kk; i++) {
 	 	//alert("array printing");
 	 //	alert(arr[i]);
 	 	process(arr[i]);
    	 result = await Promise.all(promises);
 	 }
	 }, 2000);


     

		
	}

	
	// body...
}