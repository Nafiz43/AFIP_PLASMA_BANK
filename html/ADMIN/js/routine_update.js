var content;
function update() {
	var course =document.getElementById("course");
	var course_text=course.options[course.selectedIndex].text;

	var classroom =document.getElementById("classroom");
	var classroom_text = classroom.options[classroom.selectedIndex].text;

	


	var sun_1st= document.getElementById("sun_1st").innerHTML;
	var sun_2nd= document.getElementById("sun_2nd").innerHTML;
	var sun_3rd= document.getElementById("sun_3rd").innerHTML;
	var sun_4th= document.getElementById("sun_4th").innerHTML;
	var sun_5th= document.getElementById("sun_5th").innerHTML;
	var sun_6th= document.getElementById("sun_6th").innerHTML;
	var sun_7th= document.getElementById("sun_7th").innerHTML;

	var mon_1st = document.getElementById("mon_1st").innerHTML;
	var mon_2nd = document.getElementById("mon_2nd").innerHTML;
	var mon_3rd = document.getElementById("mon_3rd").innerHTML;
	var mon_4th = document.getElementById("mon_4th").innerHTML;
	var mon_5th = document.getElementById("mon_5th").innerHTML;
	var mon_6th = document.getElementById("mon_6th").innerHTML;
	var mon_7th = document.getElementById("mon_7th").innerHTML;

	var tue_1st = document.getElementById("tue_1st").innerHTML;
	var tue_2nd = document.getElementById("tue_2nd").innerHTML;
	var tue_3rd = document.getElementById("tue_3rd").innerHTML;
	var tue_4th = document.getElementById("tue_4th").innerHTML;
	var tue_5th = document.getElementById("tue_5th").innerHTML;
	var tue_6th = document.getElementById("tue_6th").innerHTML;
	var tue_7th = document.getElementById("tue_7th").innerHTML;

	var wed_1st = document.getElementById("wed_1st").innerHTML;
	var wed_2nd = document.getElementById("wed_2nd").innerHTML;
	var wed_3rd = document.getElementById("wed_3rd").innerHTML;
	var wed_4th = document.getElementById("wed_4th").innerHTML;
	var wed_5th = document.getElementById("wed_5th").innerHTML;
	var wed_6th = document.getElementById("wed_6th").innerHTML;
	var wed_7th = document.getElementById("wed_7th").innerHTML;

	var thu_1st = document.getElementById("thu_1st").innerHTML;
	var thu_2nd = document.getElementById("thu_2nd").innerHTML;
	var thu_3rd = document.getElementById("thu_3rd").innerHTML;
	var thu_4th = document.getElementById("thu_4th").innerHTML;
	var thu_5th = document.getElementById("thu_5th").innerHTML;
	var thu_6th = document.getElementById("thu_6th").innerHTML;
	var thu_7th = document.getElementById("thu_7th").innerHTML;
	
	

	if (course_text=="Choose your option") {
			content='';
	   		content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
	   		content=content+' Select <strong> course!</strong> </div> ';
	}
	else if (classroom_text == "Choose your option" ) {
			content='';
	   		content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
	   		content=content+' Select <strong> classroom! </strong> </div> ';
	}
	else {
		   firebase.database().ref('Routine/' + classroom_text).set({
		    sun_1st : sun_1st,
		    sun_2nd : sun_2nd,
		    sun_3rd : sun_3rd,
		    sun_4th : sun_4th,
		    sun_5th : sun_5th,
		    sun_6th : sun_6th,
		    sun_7th : sun_7th,

		    mon_1st : mon_1st,
		    mon_2nd : mon_2nd,
		    mon_3rd : mon_3rd,
		    mon_4th : mon_4th,
		    mon_5th : mon_5th,
		    mon_6th : mon_6th,
		    mon_7th : mon_7th,

		    tue_1st : tue_1st,
		    tue_2nd : tue_2nd,
		    tue_3rd : tue_3rd,
		    tue_4th : tue_4th,
		    tue_5th : tue_5th,
		    tue_6th : tue_6th,
		    tue_7th : tue_7th,

		    wed_1st : wed_1st,
		    wed_2nd : wed_2nd,
		    wed_3rd : wed_3rd,
		    wed_4th : wed_4th,
		    wed_5th : wed_5th,
		    wed_6th : wed_6th,
		    wed_7th : wed_7th,

		    thu_1st : thu_1st,
		    thu_2nd : thu_2nd,
		    thu_3rd : thu_3rd,
		    thu_4th : thu_4th,
		    thu_5th : thu_5th,
		    thu_6th : thu_6th,
		    thu_7th : thu_7th


		  }, function(error) {
		    if (error) {
		    	alert("Failed to Save data");
		      // The write failed...
		    } else {
		    		content='';
			   		content=content+'<div style="font-size: 16pt" class="alert alert-success" role="alert">';
			   		content=content+' Data <strong> saved </strong> successfully! </div> ';
		    	//alert("Successfully Saved");
		    	//location.reload();
		    	document.getElementById("alert_there").innerHTML=content;
	   		document.getElementById("course").innerHTML='';
	   		document.getElementById("classroom").innerHTML='';
	   		
	   		document.getElementById("sun_1st").innerHTML='';
	   		document.getElementById("sun_2nd").innerHTML='';
			document.getElementById("sun_3rd").innerHTML='';
			document.getElementById("sun_4th").innerHTML='';
			document.getElementById("sun_5th").innerHTML='';
			document.getElementById("sun_6th").innerHTML='';
			document.getElementById("sun_7th").innerHTML='';

			document.getElementById("mon_1st").innerHTML='';
			document.getElementById("mon_2nd").innerHTML='';
			document.getElementById("mon_3rd").innerHTML='';
			document.getElementById("mon_4th").innerHTML='';
			document.getElementById("mon_5th").innerHTML='';
			document.getElementById("mon_6th").innerHTML='';
			document.getElementById("mon_7th").innerHTML='';

			document.getElementById("tue_1st").innerHTML='';
			document.getElementById("tue_2nd").innerHTML='';
			document.getElementById("tue_3rd").innerHTML='';
			document.getElementById("tue_4th").innerHTML='';
			document.getElementById("tue_5th").innerHTML='';
			document.getElementById("tue_6th").innerHTML='';
			document.getElementById("tue_7th").innerHTML='';

			document.getElementById("wed_1st").innerHTML='';
			document.getElementById("wed_2nd").innerHTML='';
			document.getElementById("wed_3rd").innerHTML='';
			document.getElementById("wed_4th").innerHTML='';
			document.getElementById("wed_5th").innerHTML='';
			document.getElementById("wed_6th").innerHTML='';
			document.getElementById("wed_7th").innerHTML='';

			document.getElementById("thu_1st").innerHTML='';
			document.getElementById("thu_2nd").innerHTML='';
			document.getElementById("thu_3rd").innerHTML='';
			document.getElementById("thu_4th").innerHTML='';
			document.getElementById("thu_5th").innerHTML='';
			document.getElementById("thu_6th").innerHTML='';
			document.getElementById("thu_7th").innerHTML='';

		      // Data saved successfully!
		    }
		  });
	}
	// body...
}
function search() {

	var course =document.getElementById("course");
	var course_text=course.options[course.selectedIndex].text;

	var classroom =document.getElementById("classroom");
	var classroom_text = classroom.options[classroom.selectedIndex].text;

	if (course_text=='Choose your option' && classroom_text=='Choose your option') 
	{
		content='';
   		content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
   		content=content+'<strong>Fill out</strong> the fields! </div> ';
   		document.getElementById("alert_there").innerHTML=content;
	}
	else if(course_text=='Choose your option')
	{
		content='';
   		content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
   		content=content+' Select <strong>course</strong></div> ';
   		document.getElementById("alert_there").innerHTML=content;
	}
	else if(classroom_text=='Choose your option')
	{
		content='';
   		content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
   		content=content+'Select <strong>classroom</strong> </div> ';
   		document.getElementById("alert_there").innerHTML=content;
	}
	else
	{




		firebase.database().ref('Routine/'+ classroom_text).once('value').then(function(snapshot) {
    	//var sun_1st = snapshot.val().sun_1st;
    	//var sun_2nd = snapshot.val().sun_2nd;
    	if (!snapshot.exists()) {
    		content='';
   			content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
   			content=content+'<strong>Data </strong> not found!</div> ';
   			document.getElementById("alert_there").innerHTML=content;

    	}
    	else{

    		content='';
   			content=content+'<div style="font-size: 16pt" class="alert alert-success" role="alert">';
   			content=content+'<strong>Data </strong> found!</div> ';
   			document.getElementById("alert_there").innerHTML=content;

		    var sun_1st= snapshot.val().sun_1st;
			var sun_2nd= snapshot.val().sun_2nd;
			var sun_3rd= snapshot.val().sun_3rd;
			var sun_4th= snapshot.val().sun_4th;
			var sun_5th= snapshot.val().sun_5th;
			var sun_6th= snapshot.val().sun_6th;
			var sun_7th= snapshot.val().sun_7th;

			var mon_1st = snapshot.val().mon_1st;
			var mon_2nd = snapshot.val().mon_2nd;
			var mon_3rd = snapshot.val().mon_3rd;
			var mon_4th = snapshot.val().mon_4th;
			var mon_5th = snapshot.val().mon_5th;
			var mon_6th = snapshot.val().mon_6th;
			var mon_7th = snapshot.val().mon_7th;

			var tue_1st = snapshot.val().tue_1st;
			var tue_2nd = snapshot.val().tue_2nd;
			var tue_3rd = snapshot.val().tue_3rd;
			var tue_4th = snapshot.val().tue_4th;
			var tue_5th = snapshot.val().tue_5th;
			var tue_6th = snapshot.val().tue_6th;
			var tue_7th = snapshot.val().tue_7th;

			var wed_1st = snapshot.val().wed_1st;
			var wed_2nd = snapshot.val().wed_2nd;
			var wed_3rd = snapshot.val().wed_3rd;
			var wed_4th = snapshot.val().wed_4th;
			var wed_5th = snapshot.val().wed_5th;
			var wed_6th = snapshot.val().wed_6th;
			var wed_7th = snapshot.val().wed_7th;

			var thu_1st = snapshot.val().thu_1st;
			var thu_2nd = snapshot.val().thu_2nd;
			var thu_3rd = snapshot.val().thu_3rd;
			var thu_4th = snapshot.val().thu_4th;
			var thu_5th = snapshot.val().thu_5th;
			var thu_6th = snapshot.val().thu_6th;
			var thu_7th = snapshot.val().thu_7th;

		      //s_category = snapshot.val().usercategory;
		      //	alert(sun_2nd);

		      document.getElementById("sun_1st").innerHTML = sun_1st;
			  document.getElementById("sun_2nd").innerHTML = sun_2nd;
			  document.getElementById("sun_3rd").innerHTML = sun_3rd;
			  document.getElementById("sun_4th").innerHTML = sun_4th;
			  document.getElementById("sun_5th").innerHTML = sun_5th;
			  document.getElementById("sun_6th").innerHTML = sun_6th;
			  document.getElementById("sun_7th").innerHTML = sun_7th;

			  document.getElementById("mon_1st").innerHTML = mon_1st;
			  document.getElementById("mon_2nd").innerHTML = mon_2nd;
			  document.getElementById("mon_3rd").innerHTML = mon_3rd;
			  document.getElementById("mon_4th").innerHTML = mon_4th;
			  document.getElementById("mon_5th").innerHTML = mon_5th;
			  document.getElementById("mon_6th").innerHTML = mon_6th;
			  document.getElementById("mon_7th").innerHTML = mon_7th;

			   document.getElementById("tue_1st").innerHTML = tue_1st;
			  document.getElementById("tue_2nd").innerHTML = tue_2nd;
			  document.getElementById("tue_3rd").innerHTML = tue_3rd;
			  document.getElementById("tue_4th").innerHTML = tue_4th;
			  document.getElementById("tue_5th").innerHTML = tue_5th;
			  document.getElementById("tue_6th").innerHTML = tue_6th;
			  document.getElementById("tue_7th").innerHTML = tue_7th;

			   document.getElementById("wed_1st").innerHTML = wed_1st;
			  document.getElementById("wed_2nd").innerHTML = wed_2nd;
			  document.getElementById("wed_3rd").innerHTML = wed_3rd;
			  document.getElementById("wed_4th").innerHTML = wed_4th;
			  document.getElementById("wed_5th").innerHTML = wed_5th;
			  document.getElementById("wed_6th").innerHTML = wed_6th;
			  document.getElementById("wed_7th").innerHTML = wed_7th;

			   document.getElementById("thu_1st").innerHTML = thu_1st;
			  document.getElementById("thu_2nd").innerHTML = thu_2nd;
			  document.getElementById("thu_3rd").innerHTML = thu_3rd;
			  document.getElementById("thu_4th").innerHTML = thu_4th;
			  document.getElementById("thu_5th").innerHTML = thu_5th;
			  document.getElementById("thu_6th").innerHTML = thu_6th;
			  document.getElementById("thu_7th").innerHTML = thu_7th;


	  
	  
	  
	  
	  
	 // document.getElementById("pass").value =  s_userpass;
	  //alert("successful");
	}

  

  //var all=snapshot.val();
  //(s_username);
  // ...
});
	}

	//alert('hello ');
	// body...
}