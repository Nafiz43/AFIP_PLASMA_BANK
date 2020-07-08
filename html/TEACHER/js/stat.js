var load_content='';	
	load_content=load_content+'<div class="form-horizontal">';
	load_content=load_content+'<div class="col-sm-offset-5 col-sm-10">';
	load_content=load_content+'<div  class="lds-roller"><div></div><div></div><div>';
	load_content=load_content+'</div><div></div><div></div><div></div><div></div><div></div></div></div></div>';


		var present_count=0;
		var absent_count=0;
		var excused_count=0;

document.getElementById("detailed_content").style.visibility = "hidden";
function stat() {
	var s_id = localStorage.getItem("value");
	var basic_content=''
    var final_content='';
	var table_content='';
	var content='';

	var course=document.getElementById("course");
	var course_text=course.options[course.selectedIndex].text;

	var level_term=document.getElementById("batch");
	var level_term_text=level_term.options[level_term.selectedIndex].text;
	
    content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
	 
	if (course_text=='Choose your option' && level_term_text=='Choose your option') {
		document.getElementById("course").style.borderColor = "red";
		document.getElementById("level_term").style.borderColor = "red";
		content=content+'<strong>Fill Out </strong>The Fields! </div> ';
        document.getElementById("alert_there").innerHTML=content;
		
	}
	else if(course_text=='Choose your option')
	{
		document.getElementById("course").style.borderColor = "red";
		content=content+'Select <strong> Course </strong></div> ';
        document.getElementById("alert_there").innerHTML=content;
	}
	else if(level_term_text=='Choose your option')
	{
		document.getElementById("level_term").style.borderColor = "red";
		content=content+'Select <strong> Level/Term </strong></div> ';
        document.getElementById("alert_there").innerHTML=content;
	}
	else
	{
		var data_x=[];
		var data_y=[];
		table_content='';
		// document.getElementById("mybtn").disabled = true;
		 document.getElementById("loader").innerHTML=load_content;
		basic_content='';
		basic_content=basic_content+'<table class="table table-striped" border="1">';

		basic_content=basic_content+'<thead >';
		basic_content=basic_content+'<tr class="bg-success">';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Ser No.</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Course Code</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Faculty</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Date</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Time</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Present</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Absent</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Excused</th>';
		//content=content+'<th scope="col">Excused</th>';
		basic_content=basic_content+'  </tr>';
		basic_content=basic_content+' </thead>';
		basic_content=basic_content+'<tbody>';



		var c=0;
		var initial_count=0;
		//alert(batch_text+course_text);


    	

    	var s_present;
    	var s_excused;
    	var s_absent;
    	

    	var initial_date='';
    	var initial_time='';
        

       
	var count=0;
	var cc=1;

  var rootRef = firebase.database().ref();
  var urlRef = rootRef.child('attendance/CSE-17A/'+course_text+'/');
  urlRef.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    	 
    var faculty=child.key; //teacher name
    	//alert(faculty);
   
	    var rootRef2 = firebase.database().ref();
	  	var urlRef2 = rootRef2.child('attendance/CSE-17A/'+course_text+'/'+faculty+'/');
	 	urlRef2.once("value", function(snapshot) {
	    snapshot.forEach(function(child) {
	    var m2=child.key; //date is there
	  //date is assigned as m2=date

	    //alert(m2);
	    	var rootRef3 = firebase.database().ref();
		  	var urlRef3 = rootRef3.child('attendance/CSE-17A/'+course_text+'/'+faculty+'/'+m2+'/');
		 	urlRef3.once("value", function(snapshot) {
		    snapshot.forEach(function(child) {
		    var m3=child.key; //got the time slot


		    var rootRef4 = firebase.database().ref();
		  	var urlRef4 = rootRef4.child('attendance/CSE-17A/'+course_text+'/'+faculty+'/'+m2+'/'+m3);
		 	urlRef4.once("value", function(snapshot) {
		    snapshot.forEach(function(child) {
		    var m4=child.key;// got s_id
		    		 firebase.database().ref('attendance/CSE-17A/'+course_text+'/'+faculty+'/'+m2+'/'+m3+'/'+m4).once('value').then(function(snapshot) {
		  				if (snapshot.exists()) {
		  						var f=0;
		  					
		  					
		  					 s_present = snapshot.val().p_status;
		  					 s_excused = snapshot.val().p_excused;
		  					 s_absent  = 1- s_present;
		  					// alert(s_present+'  '+s_excused);
		  					
					   		 
					  		 
					  		 
		  					 if (s_present==1) {
		  					 	present_count=present_count+1;
		  					 	//table_content=table_content+'<td align="center"><label><input type="checkbox"  disabled checked></label></td>';
		  					 }
		  					 else
		  					 {
		  					 	absent_count=absent_count+1;
		  					 	//table_content=table_content+'<td align="center"><label><input type="checkbox" disabled></label></td>';
		  					 }






		  					  if (s_excused==1) {
		  					  	excused_count=excused_count+1;
		  					 	//table_content=table_content+'<td align="center"><label><input type="checkbox" disabled checked></label> </td>';
		  					 }
		  					

							
							//alert(c);
							// document.getElementById("detailed_content").style.visibility = "visible";
							// document.getElementById("present").innerHTML = '<h4>'+present_count+'</h4>';
							// document.getElementById("absent").innerHTML = '<h4>'+ absent_count +'</h4>';
							// //alert()
							// document.getElementById("percentage").innerHTML = '<h4>'+ parseFloat((present_count/(c- excused_count) )*100 )+'% </h4>';
							// var content='';
					    	initial_date=m2;
					    	initial_time=m3;
							c=c+1;
							if (course_text=='CSE-401' && c==4) {
								 table_content=table_content+'<tr>';
		  						table_content=table_content+'<td align="center">'+cc+'</td>';
		  						table_content=table_content+'<td align="center">'+course_text+'</td>';
		  					    table_content=table_content+'<td align="center">'+faculty+'</td>';
		  					    table_content=table_content+'<td align="center">'+initial_date+'</td>';
		  					    table_content=table_content+'<td align="center">'+initial_time+'</td>';
		  					    table_content=table_content+'<td align="center">'+present_count+'</td>';
		  					    table_content=table_content+'<td align="center">'+absent_count+'</td>';
		  					    table_content=table_content+'<td align="center">'+excused_count+'</td>';
		  					    
		  					    data_x[cc-1]=cc;
		  					    data_y[cc-1]=(present_count/(present_count+absent_count))*100;
		  					    cc=cc+1;
		  					    
		  					    document.getElementById("loader").innerHTML='';
			  					 table_content=table_content+'</tr>';
			  					 final_content=final_content+'</tbody>';
								final_content=final_content+'</table>';
								document.getElementById("table_content").innerHTML=basic_content+table_content+final_content;
								final_content='';
								var content='';
								content=content+'<div style="font-size: 16pt" class="alert alert-success" role="alert">';
					 			content=content+'<strong>Data </strong>Found! </div> ';
					       		 document.getElementById("alert_there").innerHTML=content;
					       		 present_count=0;
		  						absent_count=0;
		  						excused_count=0;
		  						initial_time=m3;
		  						initial_date=m2;
		  						c=0;
							}
							else if(course_text=='CSE-402' && c==3)
							{
								table_content=table_content+'<tr>';
		  						table_content=table_content+'<td align="center">'+cc+'</td>';
		  						table_content=table_content+'<td align="center">'+course_text+'</td>';
		  					    table_content=table_content+'<td align="center">'+faculty+'</td>';
		  					    table_content=table_content+'<td align="center">'+initial_date+'</td>';
		  					    table_content=table_content+'<td align="center">'+initial_time+'</td>';
		  					    table_content=table_content+'<td align="center">'+present_count+'</td>';
		  					    table_content=table_content+'<td align="center">'+absent_count+'</td>';
		  					    table_content=table_content+'<td align="center">'+excused_count+'</td>';
		  					    cc=cc+1;
		  					    data_x[cc-1]=cc;
		  					    data_y[cc-1]=(present_count/(present_count+absent_count))*100;
		  					    document.getElementById("loader").innerHTML='';
			  					 table_content=table_content+'</tr>';
			  					 final_content=final_content+'</tbody>';
								final_content=final_content+'</table>';
								document.getElementById("table_content").innerHTML=basic_content+table_content+final_content;
								final_content='';
								var content='';
								content=content+'<div style="font-size: 16pt" class="alert alert-success" role="alert">';
					 			content=content+'<strong>Data </strong>Found! </div> ';
					       		 document.getElementById("alert_there").innerHTML=content;
					       		 present_count=0;
		  						absent_count=0;
		  						excused_count=0;
		  						initial_time=m3;
		  						initial_date=m2;
		  						c=0;
							}
							else if(course_text=='CSE-460' && c==5)
							{
								table_content=table_content+'<tr>';
		  						table_content=table_content+'<td align="center">'+cc+'</td>';
		  						table_content=table_content+'<td align="center">'+course_text+'</td>';
		  					    table_content=table_content+'<td align="center">'+faculty+'</td>';
		  					    table_content=table_content+'<td align="center">'+initial_date+'</td>';
		  					    table_content=table_content+'<td align="center">'+initial_time+'</td>';
		  					    table_content=table_content+'<td align="center">'+present_count+'</td>';
		  					    table_content=table_content+'<td align="center">'+absent_count+'</td>';
		  					    table_content=table_content+'<td align="center">'+excused_count+'</td>';
		  					    cc=cc+1;
		  					    data_x[cc-1]=cc;
		  					    data_y[cc-1]=(present_count/(present_count+absent_count))*100;
		  					    document.getElementById("loader").innerHTML='';
			  					 table_content=table_content+'</tr>';
			  					 final_content=final_content+'</tbody>';
								final_content=final_content+'</table>';
								document.getElementById("table_content").innerHTML=basic_content+table_content+final_content;
								final_content='';
								var content='';
								content=content+'<div style="font-size: 16pt" class="alert alert-success" role="alert">';
					 			content=content+'<strong>Data </strong>Found! </div> ';
					       		 document.getElementById("alert_there").innerHTML=content;
					       		 present_count=0;
		  						absent_count=0;
		  						excused_count=0;
		  						initial_time=m3;
		  						initial_date=m2;
		  						c=0;
							}



		  					 
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
		    		   //setTimeout(function(){ 
				    	//alert("Hello"); 
				    	// alert(present_count+" "+absent_count);
				    	// present_count=0;
				    	// absent_count=0;

						//}, 500);

		      });
			});


		   

		    //alert(m3);
		    
			   

			  });
			});

	    
		  });
		});

    
  });
});

		setTimeout(function(){
		let myChart = document.getElementById('myChart').getContext('2d');
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#000000';

    let massPopChart = new Chart(myChart, {
      type:'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
      	label:'class number',
        labels:data_x,
        datasets:[{
          label:'Percentage',
          data:data_y,
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
                max: 100,
                min: 0,
                stepSize: 10
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