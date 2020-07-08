var content;
function delete_routine() {
	var classroom = document.getElementById("classroom");

	//var classroom=document.getElementById("classroom");
	var classroom_text=classroom.options[classroom.selectedIndex].text;
	if (classroom_text=='Choose your option') {
			content='';
	   		content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
	   		content=content+' Select <strong> classroom!</strong> </div> ';
	   		document.getElementById("alert_there").innerHTML=content;
	}
	else
	{
		let userRef = firebase.database().ref('Routine/' + classroom_text);
	    userRef.remove();

	   // alert("Successfully Removed");
	    content='';
	   		content=content+'<div style="font-size: 16pt" class="alert alert-success" role="alert">';
	   		content=content+'  <strong> Deleted!</strong> from database </div> ';
	   		document.getElementById("alert_there").innerHTML=content;
	}

	//alert(classroom_text);

	

	
	// body...
}