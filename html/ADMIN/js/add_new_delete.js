
function delete_user() {
	
	var id=document.getElementById("id").value;
	//alert(id);

	if (id=='') {
		content='';
		content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
       
        content=content+'Enter <strong> ID </strong> ! </div>';

         document.getElementById("alert_there").innerHTML=content;
	}
	else
	{
		let userRef = firebase.database().ref('User/' + id);
   	    userRef.remove();
    	alert("Successfully Removed");

	}
	
	// body...
}