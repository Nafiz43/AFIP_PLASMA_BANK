
var load_content='';    
    load_content=load_content+'<div class="form-horizontal">';
    load_content=load_content+'<div class="col-sm-offset-5 col-sm-10">';
    load_content=load_content+'<div  class="lds-roller"><div></div><div></div><div>';
    load_content=load_content+'</div><div></div><div></div><div></div><div></div><div></div></div></div></div>';

function push_user() {
	//alert("hello");
	var name=document.getElementById("name").value;
	//alert(name);
	var id=document.getElementById("id").value;
	var pass=document.getElementById("pass").value;

	var category=document.getElementById("category");
	var category_text=category.options[category.selectedIndex].text;
	var email = document.getElementById("email").value;
	

	var content='<br>';
    content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
    //content=content+'<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'
    // <strong>Info!</strong> This alert box could indicate a neutral informative change or action.

	
    if(name == '' && id =='' && pass=='' && category_text=='Choose your option' && email==''){
    	//alert("here");
    	document.getElementById("name").style.borderColor = "red";
    	document.getElementById("id").style.borderColor = "red";
    	document.getElementById("pass").style.borderColor = "red";
    	document.getElementById("category").style.borderColor = "red";
    	document.getElementById("email").style.borderColor = "red";
    	
    	 content=content+'<strong>Fill Out </strong>The Fields! </div> ';
         document.getElementById("alert_there").innerHTML=content;
    }
    else if(name=='' && id=='' && pass=='' && category_text=='Choose your option'){
    	document.getElementById("name").style.borderColor = "red";
    	document.getElementById("id").style.borderColor = "red";
    	document.getElementById("pass").style.borderColor = "red";
    	document.getElementById("category").style.borderColor = "red";
    	 content=content+'<strong>Fill Out </strong>The Fields! </div> ';
         document.getElementById("alert_there").innerHTML=content;
    }
     else if(name=='' && id=='' && pass==''){
    	document.getElementById("name").style.borderColor = "red";
    	document.getElementById("id").style.borderColor = "red";
    	document.getElementById("pass").style.borderColor = "red";
    	
    	
    	 content=content+'<strong>Fill Out </strong>The Fields! </div> ';
         document.getElementById("alert_there").innerHTML=content;
    }
     else if(name=='' && id==''){
    	document.getElementById("name").style.borderColor = "red";
    	document.getElementById("id").style.borderColor = "red";
    	//document.getElementById("pass").style.borderColor = "red";
    	
    	
    	 content=content+'<strong>Fill Out </strong>The Fields! </div> ';
         document.getElementById("alert_there").innerHTML=content;
    }
    else if(id=='' && pass=='' && category_text=='Choose your option' && email==''){
    	//document.getElementById("name").style.borderColor = "red";
    	document.getElementById("id").style.borderColor = "red";
    	document.getElementById("pass").style.borderColor = "red";
    	document.getElementById("category").style.borderColor = "red";
    	document.getElementById("email").style.borderColor = "red";
    	 content=content+'<strong>Fill Out </strong>The Fields! </div> ';
         document.getElementById("alert_there").innerHTML=content;
    }
    else if(pass=='' && category_text=='Choose your option' && email==''){
    	//document.getElementById("name").style.borderColor = "red";
    	//document.getElementById("id").style.borderColor = "red";
    	document.getElementById("pass").style.borderColor = "red";
    	document.getElementById("category").style.borderColor = "red";
    	document.getElementById("email").style.borderColor = "red";
    	 content=content+'<strong>Fill Out </strong>The Fields! </div> ';
         document.getElementById("alert_there").innerHTML=content;
    }

     else if(category_text=='Choose your option' && email==''){
    	//document.getElementById("name").style.borderColor = "red";
    	//document.getElementById("id").style.borderColor = "red";
    	document.getElementById("category").style.borderColor = "red";
    	document.getElementById("email").style.borderColor = "red";
    	 content=content+'<strong>Fill Out </strong>The Fields! </div> ';
         document.getElementById("alert_there").innerHTML=content;
    }
	else if (name=='') {
		//alert("Enter a Name");
		document.getElementById("name").style.borderColor = "red";
		 content=content+'Empty <strong>Name</strong> not allowed! </div> ';
         document.getElementById("alert_there").innerHTML=content;
	}
	else if (id=='') {
		//alert("Enter an ID");
		document.getElementById("id").style.borderColor = "red";
		//document.getElementById("name").style.borderColor = "red";
		 content=content+'Empty <strong>UserID</strong> not allowed! </div> ';
         document.getElementById("alert_there").innerHTML=content;
	}
	else if (pass=='') {
		//alert("Enter a Password");
		 document.getElementById("pass").style.borderColor = "red";
		 content=content+'Empty User <strong>Password</strong>  not allowed! </div> ';
         document.getElementById("alert_there").innerHTML=content;
	}
	else if (category_text=="Choose your option") {
		//alert("Empty category of user not allowed");
		document.getElementById("category").style.borderColor = "red";
		 content=content+'Empty <strong>Category</strong>  of user not allowed! </div> ';
         document.getElementById("alert_there").innerHTML=content;
	}
	 else if( email==''){
    	document.getElementById("name").style.borderColor = "red";
    	document.getElementById("id").style.borderColor = "red";
    	document.getElementById("pass").style.borderColor = "red";
    	document.getElementById("category").style.borderColor = "red";
    	 content=content+'Enter <strong>e-mail </strong> </div> ';
         document.getElementById("alert_there").innerHTML=content;
    }
	else
	{
		 document.getElementById("loader").innerHTML=load_content;
            pass= CryptoJS.AES.encrypt(pass, "CIPHERKEY").toString();

			firebase.database().ref('User/' + id).set({
		    username: name,
	   		userpass : pass,
	   		usercategory: category_text,
	   		useremail : email
		  });

			
		}

	}

