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
		var basic_content=''
    	var final_content='';
		var table_content='';
		var initial_id='';
		var initial_course;


function process(s_id,course_text) {
	{
				  		//alert("start processing");
    						var rootRef = firebase.database().ref();
						  var urlRef = rootRef.child('attendance/CSE-17A/'+course_text+'/');
						  urlRef.once("value", function(snapshot) {
						    snapshot.forEach(function(child) {
						    	 
						    var faculty=child.key; //teacher name
						    
						   		alert(faculty+" "+s_id);
							    var rootRef2 = firebase.database().ref();
							  	var urlRef2 = rootRef2.child('attendance/CSE-17A/'+course_text+'/'+faculty+'/');
							 	urlRef2.once("value", function(snapshot) {
							    snapshot.forEach(function(child) {
							    var m2=child.key; //date is there
							  //date is assigned as m2=date

							   // alert(m2);
							    	var rootRef3 = firebase.database().ref();
								  	var urlRef3 = rootRef3.child('attendance/CSE-17A/'+course_text+'/'+faculty+'/'+m2+'/');
								 	urlRef3.once("value", function(snapshot) {
								    snapshot.forEach(function(child) {
								    var m3=child.key; //got the time slot
								
								//	alert(m3);
								    	c=0;
									    firebase.database().ref('attendance/CSE-17A/'+course_text+'/'+faculty+'/'+m2+'/'+m3+'/'+s_id).once('value').then(function(snapshot) {
								  				if (snapshot.exists()) {
								  					alert("res :"+s_id+" "+initial_course+" "+ present_count+" "+absent_count+" "+excused_count+" "+percentage);
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
											        	
											        //	alert("here goes the resolve");
											        	//alert(c+" "+course_text+" "+ present_count+" "+absent_count+" "+excused_count+" "+percentage);
											        	count=count+1;
														alert("res :"+s_id+" "+initial_course+" "+ present_count+" "+absent_count+" "+excused_count+" "+percentage);
														table_content=table_content+'<td>'+count+'</td>';
														  					
														  					table_content=table_content+'<td>'+initial_course+'</td>';
														  					table_content=table_content+'<td>'+c+'</td>';
														  					table_content=table_content+'<td>'+present_count+'</td>';  //total present
														  					table_content=table_content+'<td>'+absent_count+'</td>';  //absent
														  					table_content=table_content+'<td>'+excused_count+'</td>';  //excused
														  					table_content=table_content+'<td>'+percentage+'% </td>'; 
														  					if (percentage>=89) {
														  						table_content=table_content+'<td>'+'Collegiate'+'</td>';
														  					}
														  					else if(percentage>74 && percentage<89)
														  					{
														  						table_content=table_content+'<td>'+'Non-Collegiate'+'</td>';
														  					}
														  					else
														  					{
														  						table_content=table_content+'<td>'+'Dis-Collegiate'+'</td>';
														  					}
														  					//table_content=table_content+'<td>'+'Collegiate'+'</td>'; 
														  					
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
								  					content='<br>';
									   				content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
									   				content=content+'<strong>No data </strong>found! </div> ';
								   				 	document.getElementById("alert_there").innerHTML=content;
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
	// body...
}
document.getElementById("detailed_content").style.visibility = "hidden";
function collegiate() {
	var course=document.getElementById("course");
	var course_text=course.options[course.selectedIndex].text;

	var content='';
    content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';

	var batch=document.getElementById("batch");
	var batch_text=course.options[batch.selectedIndex].text;

	if(course_text=='Choose your option' && batch_text=='Choose your option')
	{
		document.getElementById("course").style.borderColor = "red";
		document.getElementById("batch").style.borderColor = "red";
		content=content+'<strong>Fill Out </strong>The Fields! </div> ';
       document.getElementById("alert_there").innerHTML=content;
	}
	else if(course_text=='Choose your option')
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
	 //  <table class="table table-striped" border="1">
  //   <thead class="thead-light">
  //     <tr>
  //       <th>Ser No.</th>
  //       <th>ID</th>
  //       <th>Name</th>
  //       <th>Total Present</th>
  //       <th>Total Absent</th>
  //       <th>Total Excused</th>
  //       <th>Percentage</th>
  //       <th>Status</th>
        

  //     </tr>
  //   </thead>
  //   <tbody>
  //     <tr>
  //       <td>1</td>
  //       <td>201714043</td>
  //       <td>Nafiz Imtiaz Khan</td>
  //       <td>20</td>
  //       <td>30</td>
  //       <td>1</td>
  //       <td>10%</td>
  //       <td>Collegiate</td>
  //     </tr>
    
  //   </tbody>
  // </table>

		// var c=1;
		// content=''
		// var basic_content=''
  //   	var final_content='';
		// var table_content='';
		// basic_content='';
		// basic_content=basic_content+'<table class="table table-striped" border="2">';
	
		// basic_content=basic_content+'<thead class="thead-light">';
		// basic_content=basic_content+'<tr>';
		// basic_content=basic_content+'<th scope="col">Ser No.</th>';
		// basic_content=basic_content+'<th scope="col">ID</th>';
		// basic_content=basic_content+'<th scope="col">Name</th>';
		// basic_content=basic_content+'<th scope="col">Total Present</th>';
		// basic_content=basic_content+'<th scope="col">Total Absent</th>';
		// basic_content=basic_content+'<th scope="col">Total Excused</th>';
		// basic_content=basic_content+'<th scope="col">Percentage</th>';
		// basic_content=basic_content+'<th scope="col">Status</th>';
		// basic_content=basic_content+'</tr>';
		// basic_content=basic_content+' </thead>';
		// basic_content=basic_content+'<tbody>';

		// table_content=table_content+'<tr>';

  // 					table_content=table_content+'<td>'+c+'</td>';
  					
  // 					table_content=table_content+'<td>'+'201714043'+'</td>';
  // 					table_content=table_content+'<td>'+'Nafiz Imtiaz Khan'+'</td>';  //total present
  // 					table_content=table_content+'<td>'+'20'+'</td>';  //absent
  // 					table_content=table_content+'<td>'+'10'+'</td>';  //excused
  // 					table_content=table_content+'<td>'+'1'+'</td>'; 
  // 					table_content=table_content+'<td>'+'10%'+'</td>'; 
  // 					table_content=table_content+'<td>'+'Collegiate'+'</td>'; 
  					
		// 			table_content=table_content+'</td>';
		// 			table_content=table_content+'</tr>';
  					 
		// 			 final_content=final_content+'</tbody>';
		// 			final_content=final_content+'</table>';
					
		// 			document.getElementById("table_content").innerHTML=basic_content+table_content+final_content;
		// 			final_content='';
		// 			document.getElementById("detailed_content").style.visibility = "visible";
		// 			document.getElementById("collegiate").innerHTML = '<h4>'+'10'+'</h4>';
		// 			document.getElementById("noncollegiate").innerHTML = '<h4>'+ '10' +'</h4>';
		// 			document.getElementById("discollegiate").innerHTML = '<h4>'+ '10' +'</h4>';

		// 			c=c+1;
		// content=content+'<div style="font-size: 16pt" class="alert alert-success" role="alert">';
		// content=content+'<strong>Data </strong>Found! </div> ';
  //       document.getElementById("alert_there").innerHTML=content;


        ///////////////////////
        var initial_course='';
			
		basic_content='';
		basic_content=basic_content+'<table class="table table-striped" border="2">';
	
		basic_content=basic_content+'<thead class="thead-light">';
		basic_content=basic_content+'<tr>';
		basic_content=basic_content+'<th scope="col">Ser No.</th>';
		basic_content=basic_content+'<th scope="col">ID</th>';
		basic_content=basic_content+'<th scope="col">Name</th>';
		basic_content=basic_content+'<th scope="col">Total Present</th>';
		basic_content=basic_content+'<th scope="col">Total Absent</th>';
		basic_content=basic_content+'<th scope="col">Total Excused</th>';
		basic_content=basic_content+'<th scope="col">Percentage</th>';
		basic_content=basic_content+'<th scope="col">Status</th>';
		basic_content=basic_content+'</tr>';
		basic_content=basic_content+' </thead>';
		basic_content=basic_content+'<tbody>';

		table_content=table_content+'<tr>';

  			// 		
  		content='';
		content=content+'<div style="font-size: 16pt" class="alert alert-success" role="alert">';
		content=content+'<strong>Data </strong>Found! </div> ';
        document.getElementById("alert_there").innerHTML=content;

   //       var rootRef0 = firebase.database().ref();
 	 // var urlRef0 = rootRef0.child('Enrolled/CSE-17A/');
 	 // urlRef0.once("value", function(snapshot) {
   //  snapshot.forEach(function(child) {

   //  	 //course_text=child.key;
   //  	 var course_text=child.key;
    	// alert("out loop"+p_course_text);
    	 var rootRef_0 = firebase.database().ref();
 	 var urlRef_0 = rootRef_0.child('Enrolled/CSE-17A/'+course_text+'/');
 	 urlRef_0.once("value", function(snapshot) {
 	 	setTimeout(function(){
    snapshot.forEach(function(child) {
    					var s_id
    					
    					 s_id=child.val().ID;
    					 alert(s_id);
    					 process(s_id,course_text);
    					 
    					
    					
     					//if (child.val().ID==s_id)
     					 {
     			//			alert("in loop");
							
     					}
    		
			    	 }); 
					}, 300);
				});


 //    	 });
	// });
		
	// });
	}

	
	// body...
}