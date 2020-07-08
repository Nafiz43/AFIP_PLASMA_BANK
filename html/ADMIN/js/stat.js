

if (localStorage.getItem("value_role")== "Admin") {
}
else
{
  document.getElementById("user_list").style.visibility = "hidden";
}

var load_content='';	
	load_content=load_content+'<div class="form-horizontal">';
	load_content=load_content+'<div class="col-sm-offset-5 col-sm-10">';
	load_content=load_content+'<div  class="lds-roller"><div></div><div></div><div>';
	load_content=load_content+'</div><div></div><div></div><div></div><div></div><div></div></div></div></div>';

// document.getElementById("A-").value=snapshot.val().A-;
            // document.getElementById("B+").value=snapshot.val().B+;
            // document.getElementById("B-").value=snapshot.val().B-;
            // document.getElementById("O+").value=snapshot.val().O+;
            // document.getElementById("O-").value=snapshot.val().O-;
            // document.getElementById("AB+").value=snapshot.val().AB+;
            // document.getElementById("AB-").value=snapshot.val().AB-;
            //  document.getElementById("loader").innerHTML=''; 
var a1, a2, a3, a4, a5, a6, a7, a8, a10;
var datas=[];
document.getElementById("loader").innerHTML=load_content;
        firebase.database().ref('statistics/A+').once('value').then(function(snapshot) {
          a1=snapshot.val();
          document.getElementById("A+").innerHTML=a1;
          datas[0]=a1;

    }); 
         firebase.database().ref('statistics/A-').once('value').then(function(snapshot) {
          a2=snapshot.val();
          document.getElementById("A-").innerHTML=a2;
          datas[1]=a2;
    }); 
          firebase.database().ref('statistics/B+').once('value').then(function(snapshot) {
          a3=snapshot.val();
          document.getElementById("B+").innerHTML= a3;
          datas[2]=a3;
    }); 
           firebase.database().ref('statistics/B-').once('value').then(function(snapshot) {
            a4=snapshot.val();
          document.getElementById("B-").innerHTML=a4;
          datas[3]=a4;
    }); 
            firebase.database().ref('statistics/O+').once('value').then(function(snapshot) {
              a5=snapshot.val();
          document.getElementById("O+").innerHTML=a5;
          datas[4]=a5;
    }); 
             firebase.database().ref('statistics/O-').once('value').then(function(snapshot) {
              a6=snapshot.val();
          document.getElementById("O-").innerHTML=a6;
          datas[5]=a6;
    }); 
     firebase.database().ref('statistics/AB+').once('value').then(function(snapshot) {
          a7=snapshot.val();
          document.getElementById("AB+").innerHTML=a7;
          datas[6]=a7;
    }); 
     firebase.database().ref('statistics/AB-').once('value').then(function(snapshot) {
          a8=snapshot.val();
          document.getElementById("AB-").innerHTML=a8;
          datas[7]=a8;
    }, function(error) {
    if (error) {
      // The write failed...
    } else {
     //alert("seccess")
    }
  });         
  firebase.database().ref('statistics/count').once('value').then(function(snapshot) {
          a10=snapshot.val();
          document.getElementById("count").innerHTML="<b> Total Donors Available "+a10+"</b>";
          
    });  

	setTimeout(function(){
		let myChart = document.getElementById('myChart').getContext('2d');
    
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#000000';

    let massPopChart = new Chart(myChart, {
      type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels:['A+','A-','B+','B-','O+','O-','AB+','AB-'],
        datasets:[{
          label:'Percentage',
          data:datas,
          //backgroundColor:'green',
          backgroundColor:[
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
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
                // max: 100,
                // min: 0,
                // stepSize: 10
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
        
document.getElementById("loader").innerHTML='';
    	}, 5000);



// 	var s_id=document.getElementById("s_id").value;

//   var s_username;
//   var s_userpass;
//   var s_category;
//   var s_mail;
//   	if (s_id=='') {
//   		content='';
// 		content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
       
//         content=content+'Enter <strong> ID </strong> ! </div>';

//          document.getElementById("alert_there").innerHTML=content;

//   	}
//   	else
//   	{
//   		 document.getElementById("loader").innerHTML=load_content;
//   			firebase.database().ref('User/'+s_id).once('value').then(function(snapshot) {
//   				if (snapshot.exists()) {
//   					 s_username = snapshot.val().username;
// 				      s_userpass = snapshot.val().userpass;
// 				      s_category = snapshot.val().usercategory;
// 				      s_mail     = snapshot.val().useremail;

// 				      document.getElementById("id").value = s_id;
// 					  document.getElementById("name").value = s_username;
// 					  document.getElementById("pass").value =  s_userpass;
// 					  document.getElementById("email").value= s_mail;
					  
// 					  if (s_category=="Student") {
// 					//  	alert("Student");
// 					  	document.getElementById("category").selectedIndex = 1;
// 					  }
// 					  else if (s_category=="Teacher") {
// 					  	document.getElementById("category").selectedIndex = 2;
// 					  }
// 					   else if (s_category=="Admin") {
// 					  	document.getElementById("category").selectedIndex = 3;
// 				  	}
// 				  	content='<br>';
// 	   				content=content+'<div style="font-size: 16pt" class="alert alert-success" role="alert">';
// 	   				content=content+'<strong>Data </strong> found! </div> ';
// 	   				 document.getElementById("alert_there").innerHTML=content;
// 	   				 document.getElementById("loader").innerHTML='';
//   				}
//   				else
//   				{
//   					content='<br>';
// 	   				content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
// 	   				content=content+'<strong>No data </strong>found! </div> ';
//    				 	document.getElementById("alert_there").innerHTML=content;
//   				}
		     
		  
// 		}, function(error) {
// 		    if (error) {
// 		    	alert("asasasas");
// 		    	content='<br>';
//    				content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
//    				content=content+'<strong>No data </strong>found! </div> ';
//    				 document.getElementById("alert_there").innerHTML=content;
// 		      // The write failed...
// 		    } else {
// 		    	alert('asasas');
// 		    	content='<br>';
//    				content=content+'<div style="font-size: 16pt" class="alert alert-success" role="alert">';
//    				content=content+'<strong>Data </strong> found! </div> ';
//    				 document.getElementById("alert_there").innerHTML=content;
		   
// 		    }
// 		  });
  			
//   	}

// 	//alert(s_id);




	
// }

// function update_user() {
// 	//alert("Hello");

// // 	ref.child('User').orderByChild('userid').equalTo('201714043').on("value", function(snapshot) {
// //     console.log(snapshot.val());
// //     snapshot.forEach(function(data) {
// //         console.log(data.key);
// //     });
// // });
	


// 	// //alert("hello");
	
// 	    var name=document.getElementById("name").value;
// 		var id=document.getElementById("id").value;
// 		var pass=document.getElementById("pass").value;

// 		var category=document.getElementById("category");
// 		var category_text=category.options[category.selectedIndex].text;
// 		var s_mail=document.getElementById("email").value;

	

// 	if (name=='') {
// 		alert("Enter a Name");
// 		document.getElementById("name").style.borderColor = "red";
// 	}
// 	else if (id=='') {
// 		alert("Enter an ID");
// 		document.getElementById("id").style.borderColor = "red";
// 	}
// 	else if (pass=='') {
// 		alert("Enter a Password");
// 		document.getElementById("pass").style.borderColor = "red";
// 	}
// 	else if (category_text=="Choose your option") {
// 		alert("Select Category");
// 		document.getElementById("category").style.borderColor = "red";
// 	}
// 	else if(s_mail=='')
// 	{
// 		alert("Enter Email");
// 		document.getElementById("email").style.borderColor = "red";
// 	}
// 	else
// 	{
// 		// alert("Hello "+name);
// 		// alert(id);
// 		// alert(category_text);

// 		firebase.database().ref('User/'+id).set({
// 	        username: name,
// 	   		userpass : pass,
// 	   		usercategory : category_text,
// 	   		useremail    : s_mail
// 			    }, function(error) {
// 		    if (error) {
// 		    	alert("Failed to Save data");
// 		      // The write failed...
// 		    } else {
// 		    	alert("Successfully Saved");
// 		      // Data saved successfully!
// 		    }
// 		  });
		
// 		//setTimeout(function(){ alert("Successful"); }, 2000);

// 	}

	

	// body...
