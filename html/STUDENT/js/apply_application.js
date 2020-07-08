var load_content='';	
	load_content=load_content+'<div class="form-horizontal">';
	load_content=load_content+'<div class="col-sm-offset-5 col-sm-10">';
	load_content=load_content+'<div  class="lds-roller"><div></div><div></div><div>';
	load_content=load_content+'</div><div></div><div></div><div></div><div></div><div></div></div></div></div>';

function apply_application() {

	var userId=localStorage.getItem("value");
	var username=localStorage.getItem("value_username");
	 var UR;
	//alert("hello world");
	var date =document.getElementById("date").value;
	//alert(date);
	var absent_from =document.getElementById("absent_from").value;
	var absent_till =document.getElementById("absent_till").value;
	var duration =document.getElementById("duration").value;
	
	var course =document.getElementById("course");
	var course_text=course.options[course.selectedIndex].text;
	// alert(course_text);
	// alert("till there");
	
	var faculty=document.getElementById("faculty");
	var faculty_text=faculty.options[faculty.selectedIndex].text;

	// alert(faculty_text);
	
	//var reason=document.getElementById("rsn").value;
	//var document_text =document.getElementById("dcm").value;

	var reason=document.getElementById("reason");
	var reason_text=reason.options[reason.selectedIndex].text;


	var content='<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
	// alert(reason);
	// alert(document_text);
	if (date=='' && course_text=='Choose your option' && faculty_text=='Choose your option' && reason_text=='Choose your option' && absent_from=='' && absent_till=='' && duration=='') {
		//alert("there");
		document.getElementById("date").style.borderColor = "red";
		document.getElementById("course").style.borderColor = "red";
		document.getElementById("faculty").style.borderColor = "red";
		document.getElementById("reason").style.borderColor = "red";
		document.getElementById("absent_from").style.borderColor = "red";
		document.getElementById("absent_till").style.borderColor = "red";
		document.getElementById("duration").style.borderColor = "red";
		content=content+' <strong> Fill Out </strong> All The Fields! </div>';
		document.getElementById("alert_there").innerHTML=content;

	}
	else if(course_text=='Choose your option' && faculty_text=='Choose your option' && reason_text=='Choose your option'){
		document.getElementById("course").style.borderColor = "red";
		document.getElementById("faculty").style.borderColor = "red";
		document.getElementById("rsn").style.borderColor = "red";
		content=content+' <strong> Fill Out </strong> All The Fields! </div>';
		document.getElementById("alert_there").innerHTML=content;

	}
	else if(faculty_text=='Choose your option' && reason_text=='Choose your option'){
		
		document.getElementById("faculty").style.borderColor = "red";
		document.getElementById("rsn").style.borderColor = "red";
		content=content+' <strong> Fill Out </strong> All The Fields! </div>';
		document.getElementById("alert_there").innerHTML=content;

	}
	// alert(document_text);
	else if (date=='' && course_text=='Choose your option' && faculty_text=='Choose your option') {
		document.getElementById("date").style.borderColor = "red";
		document.getElementById("course").style.borderColor = "red";
		document.getElementById("faculty").style.borderColor = "red";
		content=content+' <strong> Fill Out </strong> All The Fields! </div>';
		document.getElementById("alert_there").innerHTML=content;

	}
	else if (date=='' && course_text=='Choose your option') {
		document.getElementById("date").style.borderColor = "red";
		document.getElementById("course").style.borderColor = "red";
		content=content+' <strong> Fill Out </strong> All The Fields! </div>';
		document.getElementById("alert_there").innerHTML=content;
		

	}
	else if (date=='') {
		document.getElementById("date").style.borderColor = "red";
		content=content+' Enter <strong>Date!  </strong>  </div>';
		document.getElementById("alert_there").innerHTML=content;
		
		//alert("Enter Date");
	}
	else if(course_text=="Choose your option"){
		//alert("");
		document.getElementById("course").style.borderColor = "red";
		content=content+'Enter <strong>Course  </strong>   Name! </div>';
		document.getElementById("alert_there").innerHTML=content;
	}
	else if (faculty_text=="Choose your option") {
		//alert("Enter Faculty Name");
		document.getElementById("faculty").style.borderColor = "red";
		content=content+'Enter <strong>Faculty</strong>   Name! </div>';
		document.getElementById("alert_there").innerHTML=content;
	}
	else if(reason_text=='Choose your option'){
		//alert("Enter a Reason");
		document.getElementById("rsn").style.borderColor = "red";
		content=content+'Enter <strong>Reason!</strong>   </div>';
		document.getElementById("alert_there").innerHTML=content;
	
	}
	else if(absent_from=='')
	{
		document.getElementById("absent_from").style.borderColor = "red";
		content=content+'Enter <strong>Absent From date!</strong>   </div>';
		document.getElementById("alert_there").innerHTML=content;
	}
	else if(absent_till=='')
	{
		document.getElementById("absent_till").style.borderColor = "red";
		content=content+'Enter <strong>Absent till date!</strong>   </div>';
		document.getElementById("alert_there").innerHTML=content;
	}
	else if(duration=='')
	{
		document.getElementById("duration").style.borderColor = "red";
		content=content+'Enter <strong>duration!</strong>   </div>';
		document.getElementById("alert_there").innerHTML=content;
	}
	else{
		//alert("hello");
		 document.getElementById("loader").innerHTML=load_content;
		firebase.database().ref('application/'+faculty_text + '/' +course_text ).push({
			App_ID : userId,
			App_name : username,
			App_date : date,
			App_course : course_text,
			App_faculty : faculty_text,
			App_reason : reason_text,
			App_absent_from : absent_from,
			App_absent_till : absent_till,
			App_duration    : duration,
			App_link : 'image',
		    App_status: 'Pending'
			 }, function(error) {
		    if (error) {
		    	alert("Failed to Save data");
		      // The write failed...
		    } else {
		    	//window.location.href = "apply_application_add.html";
		    	alert("Successfully Saved data");
		      // Data saved successfully!
		    }
		  });
		
       
		const ref = firebase.storage().ref();
        const file = document.querySelector('#dcm').files[0]
        const name = userId + ' ' + date;
       // const name = (+new Date()) + '-' + file.name;
        const metadata = {
           contentType: file.type
        };
        const task = ref.child(name).put(file, metadata);
        task
           .then(snapshot => snapshot.ref.getDownloadURL())
           .then((url) => {
           console.log(url);
          // UR=url;
          // alert("image saved");
           window.location.href = "apply_application_add.html";

			document.getElementById("loader").innerHTML='';
          // document.querySelector('#someImageTagID').src = url;
        })
        .catch(console.error);

//request.auth == null
        
		


	}
	
}