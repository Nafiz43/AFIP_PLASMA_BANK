var load_content='';	
	load_content=load_content+'<div class="form-horizontal">';
	load_content=load_content+'<div class="col-sm-offset-5 col-sm-10">';
	load_content=load_content+'<div  class="lds-roller"><div></div><div></div><div>';
	load_content=load_content+'</div><div></div><div></div><div></div><div></div><div></div></div></div></div>';

	var s_id = localStorage.getItem("value");
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
		var initial_course='';



function fine() {
	var level_term=document.getElementById("level_term");
	var level_term_text=level_term.options[level_term.selectedIndex].text;

	var content='';
	if (level_term_text=='Choose your option')
	{
		document.getElementById("level_term").style.borderColor = "red";
		content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
		content=content+'Select <strong>Level/Term</strong>! </div> ';
        document.getElementById("alert_there").innerHTML=content;
	}
	else
	{
	
		
		table_content='';
		 document.getElementById("loader").innerHTML=load_content;
		basic_content='';
		basic_content=basic_content+'<table class="table table-striped" border="1">';
	
		basic_content=basic_content+'<thead >';
		basic_content=basic_content+'<tr>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u" >Ser No.</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u" >Course Code</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u" >Total Class</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u" >Total Present</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u" >Total Absent</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u" >Total Excused</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u" >Percentage</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u" >Status</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u" >Fine</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u" >Pay Status</th>';
		basic_content=basic_content+'</tr>';
		basic_content=basic_content+' </thead>';
		basic_content=basic_content+'<tbody>';

		table_content=table_content+'<tr>';

  			// 		
		content=content+'<div style="font-size: 16pt" class="alert alert-success" role="alert">';
		content=content+'<strong>Data </strong>Found! </div> ';
        


        var label_course=[];
		var label_percentage=[];

        var rootRef0 = firebase.database().ref();
 	 var urlRef0 = rootRef0.child('Enrolled/CSE-17A/');
 	 urlRef0.once("value", function(snapshot) {
    snapshot.forEach(function(child) {

    	 //course_text=child.key;
    	 var course_text=child.key;
    	// alert("out loop"+p_course_text);
    	 var rootRef_0 = firebase.database().ref();
 	 var urlRef_0 = rootRef_0.child('Enrolled/CSE-17A/'+course_text+'/');
 	 urlRef_0.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
     					if (child.val().ID==s_id) {
     			//			alert("in loop");
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
											        	
											        //	alert("here goes the resolve");
											        	//alert(c+" "+course_text+" "+ present_count+" "+absent_count+" "+excused_count+" "+percentage);
											        	count=count+1;
														//alert("res :"+initial_course+" "+ present_count+" "+absent_count+" "+excused_count+" "+percentage);
														table_content=table_content+'<td align="center">'+count+'</td>';
														  					
														  					table_content=table_content+'<td align="center">'+initial_course+'</td>';
														  					table_content=table_content+'<td align="center">'+c+'</td>';
														  					table_content=table_content+'<td align="center">'+present_count+'</td>';  //total present
														  					table_content=table_content+'<td align="center">'+absent_count+'</td>';  //absent
														  					table_content=table_content+'<td align="center">'+excused_count+'</td>';  //excused
														  					table_content=table_content+'<td align="center">'+percentage+'% </td>'; 
														  					var r=0;
														  					if (percentage>=89) {
														  						table_content=table_content+'<td align="center">'+'Collegiate'+'</td>';
														  						table_content=table_content+'<td align="center">'+'0'+'</td>';
														  					}
														  					else if(percentage>74 && percentage<89)
														  					{
														  						r='1500';
														  						table_content=table_content+'<td align="center">'+'Non-Collegiate'+'</td>';
														  						table_content=table_content+'<td align="center">'+'1500'+'</td>';
														  					}
														  					else
														  					{
														  						r='3000';
														  						table_content=table_content+'<td align="center">'+'Dis-Collegiate'+'</td>';
														  						table_content=table_content+'<td align="center">'+'3000'+'</td>';
														  					}
														  					table_content=table_content+'<td align="center">'+'DUE'+'</td>';
														  					//table_content=table_content+'<td>'+'Collegiate'+'</td>'; 
														  					
																			table_content=table_content+'</td>';
																			table_content=table_content+'</tr>';
														  					 
																			 final_content=final_content+'</tbody>';
																			final_content=final_content+'</table>';
																			
																			document.getElementById("table_content").innerHTML=basic_content+table_content+final_content;
																			final_content='';
																			c=0;
																			//alert("issue solved");
																			label_course[count-1]=initial_course;
																			label_percentage[count-1]=r;

																			initial_course=course_text;
																			present_count=0;
																			absent_count=0;
																			excused_count=0;
																			document.getElementById("alert_there").innerHTML=content;
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
     					}
    		
			    	 });
				});


    	 });
	});
	setTimeout(function(){

		 //alert(label_course[0]);
		// alert(label_course[1]); 
		 //alert()

		let myChart = document.getElementById('myChart').getContext('2d');

    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#000000';

    let massPopChart = new Chart(myChart, {
      type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels:label_course,
        datasets:[{
          label:'Fine',
          data:label_percentage,
          //backgroundColor:'green',
          backgroundColor:[
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)'
          ],
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidth:3,
          hoverBorderColor:'#000'
        }]
      },
      options:{
      	 scales: {
        yAxes: [{
            ticks: {
                max: 4500,
                min: 0,
                stepSize: 500
            }
        }]
    },
        title:{
          display:true,
          text:'Summary of Term',
          fontSize:25
        },
        legend:{
          display:true,
          position:'right',
          labels:{
            fontColor:'#000'
          }
        },
        layout:{
          padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }
      }
    });
        

    	}, 5000);
		
        




	}
}


