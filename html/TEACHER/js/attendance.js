var load_content='';	
	load_content=load_content+'<div class="form-horizontal">';
	load_content=load_content+'<div class="col-sm-offset-5 col-sm-10">';
	load_content=load_content+'<div  class="lds-roller"><div></div><div></div><div>';
	load_content=load_content+'</div><div></div><div></div><div></div><div></div><div></div></div></div></div>';

document.getElementById("detailed_content").style.visibility = "hidden";
function attendance() {

	var teacher=localStorage.getItem("value_username");
	var flag=0;

	var date=document.getElementById("date").value;

	var course=document.getElementById("course");
	var course_text=course.options[course.selectedIndex].text;

	var slot=document.getElementById("slot");
	var slot_text=slot.options[slot.selectedIndex].text;

	var batch=document.getElementById("batch");
	var batch_text=batch.options[batch.selectedIndex].text;

    var basic_content=''
    var final_content='';
	var table_content='';
	var content='';
    content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
	 
	if (date=='' && course_text=='Choose your option' && slot_text=='Choose your option' && batch_text=='Choose your option') {
		document.getElementById("date").style.borderColor = "red";
		document.getElementById("course").style.borderColor = "red";
		document.getElementById("slot").style.borderColor = "red";
		document.getElementById("batch").style.borderColor = "red";
		content=content+'<strong>Fill Out </strong>The Fields! </div> ';
       document.getElementById("alert_there").innerHTML=content;
	}
	else if(course_text=='Choose your option' && date=='' && batch_text=='Choose your option')
	{
		document.getElementById("date").style.borderColor = "red";
		document.getElementById("course").style.borderColor = "red";
		document.getElementById("batch").style.borderColor = "red";
		content=content+'<strong>Fill Out </strong>The Fields! </div> ';
       document.getElementById("alert_there").innerHTML=content;
	}
	else if(course_text=='Choose your option' && slot_text=='Choose your option' && batch_text=='Choose your option')
	{
		document.getElementById("course").style.borderColor = "red";
		document.getElementById("slot").style.borderColor = "red";
		document.getElementById("batch").style.borderColor = "red";
		content=content+'<strong>Fill Out </strong>The Fields! </div> ';
       document.getElementById("alert_there").innerHTML=content;
	}
	else if(slot_text=='Choose your option' && date=='' && batch_text=='Choose your option')
	{
		document.getElementById("date").style.borderColor = "red";
		document.getElementById("slot").style.borderColor = "red";
		document.getElementById("batch").style.borderColor = "red";
		content=content+'<strong>Fill Out </strong>The Fields! </div> ';
       document.getElementById("alert_there").innerHTML=content;
	}
	else if(date=='' && course_text=='Choose your option')
	{
		document.getElementById("course").style.borderColor = "red";
		document.getElementById("date").style.borderColor = "red";
		content=content+'<strong>Fill Out </strong>The Fields! </div> ';
       document.getElementById("alert_there").innerHTML=content;
	}
	else if(slot_text=='Choose your option' && batch_text=='Choose your option')
	{
		document.getElementById("slot").style.borderColor = "red";
		document.getElementById("batch").style.borderColor = "red";
		content=content+'<strong>Fill Out </strong>The Fields! </div> ';
       document.getElementById("alert_there").innerHTML=content;
	}
	else if(course_text=='Choose your option' && batch_text=='Choose your option')
	{
		document.getElementById("course").style.borderColor = "red";
		document.getElementById("batch").style.borderColor = "red";
		content=content+'<strong>Fill Out </strong>The Fields! </div> ';
       document.getElementById("alert_there").innerHTML=content;
	}
	else if(date=='')
	{
		document.getElementById("date").style.borderColor = "red";
		content=content+'<strong>Select </strong>Date! </div> ';
       document.getElementById("alert_there").innerHTML=content;
	}
	else if(course_text=='Choose your option')
	{
		document.getElementById("course").style.borderColor = "red";
		content=content+'<strong>Select </strong>Course! </div> ';
       document.getElementById("alert_there").innerHTML=content;
	}
	else if(slot_text=='Choose your option')
	{
		document.getElementById("slot").style.borderColor = "red";
		content=content+'<strong>Select </strong>Slot! </div> ';
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
		 var data_x=[];
		 var data_y=[];
		 document.getElementById("loader").innerHTML=load_content;
		basic_content='';
		basic_content=basic_content+'<table class="table table-striped" border="1">';
		basic_content=basic_content+'<br>';
		basic_content=basic_content+'<br>';
		basic_content=basic_content+'<thead >';
		basic_content=basic_content+'<tr>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Ser No.</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Roll No.</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Name</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Present</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Absent</th>';
		basic_content=basic_content+'<th align="center" class="tg-3t0u">Excused</th>';
		//content=content+'<th scope="col">Excused</th>';
		basic_content=basic_content+'  </tr>';
		basic_content=basic_content+' </thead>';
		basic_content=basic_content+'<tbody>';

		var s_id;

		var c=1;
		var present_count=0;
		var absent_count=0;
		//alert(batch_text+course_text);

		var rootRef = firebase.database().ref();
	var urlRef = rootRef.child('Enrolled/'+batch_text+'/'+course_text);
	urlRef.once("value", function(snapshot) {
    snapshot.forEach(function(child) {

    	
    	var s_id=child.val().ID;
    	//alert(s_id);

    	var s_present;
    	var s_absent;
    	var s_name;
    	var s_excused;

    	

    	//for getting the name

    	firebase.database().ref('User/'+s_id).once('value').then(function(snapshot) {

    		s_name=snapshot.val().username;
  				
		 // alert(s_name);
		}, function(error) {
		    if (error) {
		    	
		      //alert("coming there");
		    } else {
		    	
		   
		    }
		  });
    	//name fetched

    	firebase.database().ref('attendance/'+batch_text+'/'+course_text+'/'+teacher+'/'+date+'/'+slot_text+'/'+s_id).once('value').then(function(snapshot) {
  				if (snapshot.exists()) {
  					
					 
				  	
  				}
  				else
  				{
  					firebase.database().ref('attendance/'+batch_text+'/'+course_text+'/'+teacher+'/'+date+'/'+slot_text+'/'+s_id).set({
		   
					    p_status : 0,
					    p_excused  : 0
					    
					  }, function(error) {
					    if (error) {
					    	
					     //  // The write failed...
					    } else {
					    	
					    }
					  });
  				}
  				
		     
		  
		});

    	//check whether enlisted student is present or not
    	
		//content=content+'<th scope="row">1</th>';
		//alert(batch_text+course_text+teacher+date+slot_text+s_id);
		setTimeout(function(){


 
    firebase.database().ref('attendance/'+batch_text+'/'+course_text+'/'+teacher+'/'+date+'/'+slot_text+'/'+s_id).once('value').then(function(snapshot) {
  				if (snapshot.exists()) {
  					//alert('hello');
  					s_present = snapshot.val().p_status;
  					s_absent=1- s_present;
  					s_excused  = snapshot.val().p_excused;
  					
  					table_content=table_content+'<tr>';

  					table_content=table_content+'<td align="center">'+c+'</td>';
  					
  					data_x[c-1]=s_id;
  					data_y[c-1]=s_present;
  					c=c+1;
  					table_content=table_content+'<td align="center">'+s_id+'</td>';
  					
  					table_content=table_content+'<td align="center">'+s_name+'</td>';
  					table_content=table_content+'<td align="center"><div class="checkbox">';
  					if (s_present==1) {
  						table_content=table_content+'<label><input type="checkbox" disabled checked></label>';
  						present_count=present_count+1;
  					}
  					else
  					{
  						table_content=table_content+'<label><input type="checkbox" disabled></label>';
  						absent_count=absent_count+1;
  					}
  					
					table_content=table_content+'</div>';
					table_content=table_content+'</td>';
					table_content=table_content+'<td align="center"><div class="checkbox">';
					if (s_absent==1) {
						table_content=table_content+'<label><input type="checkbox" disabled checked></label>';
					}
					else
					{
						table_content=table_content+'<label><input type="checkbox" disabled></label>';
					}
					
					table_content=table_content+'</div>';
					table_content=table_content+'</td>';
					// content=content+'<td><div class="checkbox">';
					// content=content+'<label><input type="checkbox" value=""></label>';
					// content=content+'</div>';
					// content=content+'</td>';
					table_content=table_content+'<td align="center"><div class="checkbox">';
					if (s_excused==1) {
						table_content=table_content+'<label><input type="checkbox" disabled checked></label>';
					}
					else
					{
						table_content=table_content+'<label><input type="checkbox" disabled ></label>';
					}
					
					table_content=table_content+'</div>';
					table_content=table_content+'</td>';
					table_content=table_content+'</tr>';
  					 
				    // alert(s_id+s_name+" "+s_present);

					 // alert(content);
					 final_content=final_content+'</tbody>';
					final_content=final_content+'</table>';
					
					document.getElementById("table_content").innerHTML=basic_content+table_content+final_content;
					final_content='';
					document.getElementById("detailed_content").style.visibility = "visible";
			    document.getElementById("present").innerHTML = '<h4>'+present_count+'</h4>';
				document.getElementById("absent").innerHTML = '<h4>'+ absent_count +'</h4>';
				document.getElementById("percentage").innerHTML = '<h4>'+ parseFloat((present_count/c)*100 )+'% </h4>';
				var content='';
		    	content=content+'<div style="font-size: 16pt" class="alert alert-success" role="alert">';
		 		content=content+'<strong>Data </strong>Found! </div> ';
		        document.getElementById("alert_there").innerHTML=content;
		        document.getElementById("loader").innerHTML='';
		        flag=1;
					 
				  	
  				}
  				else
  				{
  					var content='';
		    	content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
		 		content=content+'<strong>Data not </strong>Found! </div> ';
		        document.getElementById("alert_there").innerHTML=content;
  				}
  				
		     
		  
		});//asas
    }, 500);
  
  	
  });
});
		

		setTimeout(function(){
		let myChart = document.getElementById('myChart').getContext('2d');
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#000000';

    let massPopChart = new Chart(myChart, {
      type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels:data_x,
        datasets:[{
          label:'Present',
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
                max: 1,
                min: 0,
                stepSize: 1
            }
        }]
    },
        title:{
          display:true,
          text:'Graphical Representation',
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

	//alert('Hello From attendance page ');
	// body...
	

	
}