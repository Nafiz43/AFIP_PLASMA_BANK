document.getElementById("detailed_content").style.visibility = "hidden";
document.getElementById("detailed_content2").style.visibility = "hidden";
var load_content='';  
  load_content=load_content+'<div class="form-horizontal">';
  load_content=load_content+'<div class="col-sm-offset-5 col-sm-10">';
  load_content=load_content+'<div  class="lds-roller"><div></div><div></div><div>';
  load_content=load_content+'</div><div></div><div></div><div></div><div></div><div></div></div></div></div>';

var username;
var course_text;
var i=0;
var c=1;
var p;
var m;
var n;
var status;

function application_list() {
	
	var content2='';
	var content='<br>';
  
    username = localStorage.getItem("value_username");
    var course =document.getElementById("course");
	course_text=course.options[course.selectedIndex].text;
	if (course_text=='Choose your option') {
		var content= '<div class="alert alert-danger" role="alert">';
		content = content+ 'Select a course!';
		content = content+'</div>';
		document.getElementById("alert_there").innerHTML=content;
		
	}
	else
	{

	 document.getElementById("loader").innerHTML=load_content;
	var rootRef = firebase.database().ref();
	var urlRef = rootRef.child('application/'+username+'/'+course_text);
	urlRef.once("value", function(snapshot) {
 	snapshot.forEach(function(child) {
  	m=child.val().App_ID;
  	n=child.val().App_date;
    status=child.val().App_status;
   // alert(status);
    
  	//i++;
  	//alert(m);
  	//alert(m);
  	 content2 = content2 + '<button id='+m+' name='+n+' onclick=process(this.id,this.name) type="button" class="list-group-item list-group-item-action">' + '<strong>'+ m+'<strong>  '+n + '<strong> '+ status+ '</button>';
  	 document.getElementById("application_li").innerHTML=content2;
    //console.log(child.val().App_ID);
    document.getElementById("detailed_content").style.visibility = "visible";
    document.getElementById("detailed_content2").style.visibility = "visible";
    document.getElementById("total_application").innerHTML = '<h4>'+c+'</h4>';
    c=c+1;
    //alert(n);
    document.getElementById("loader").innerHTML='';
  });
});


	}


}


function process(m,n) {
	//alert(m);
  //alert(n);
	var rootRef = firebase.database().ref();
  var urlRef = rootRef.child('application/'+username+'/'+course_text);
  urlRef.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    //m=child.val().App_ID;
    //n=child.val().App_date;
    if (child.val().App_ID==m && child.val().App_date==n) {
      //alert('found');
      //alert(n);
      var userName=child.val().App_name;
        var date=child.val().App_date;
        var reason=child.val().App_reason;
        var link = child.val().App_link;
        var course = child.val().App_course;
        var id=m;
        var absent_from = child.val().App_absent_from;
        var absent_till = child.val().App_absent_till;
        var duration = child.val().App_duration;
        var sta= child.val().App_status;
        var fac=child.val().App_faculty;

        //localStorage.setItem()
      //  alert(username);
      //  alert('from process');
        localStorage.setItem("app_username", userName);
        localStorage.setItem("app_date", date);
        localStorage.setItem("app_reason", reason);
        localStorage.setItem("app_link", link);
        localStorage.setItem("app_course", course);
        localStorage.setItem("app_id", id);
        localStorage.setItem("app_absent_from", absent_from);
        localStorage.setItem("app_absent_till", absent_till);
        localStorage.setItem("app_duration", duration);
        localStorage.setItem("app_status", sta);
        localStorage.setItem("app_facult", fac);
        username = localStorage.getItem("value_username");
        if(username=='Brig Gen Mohammad Sajjad Hossain')
        {
           window.location.replace("application_viewhod.html");
        }
        else
        {
            window.location.replace("application_view.html");
        }
        

    }
    else
    {
      //alert('error occured');
    }
    
  });
});

	// firebase.database().ref('application/'+username+'/'+course_text).once('value').then(function(snapshot) {
    
 //      p=snapshot.val().App_ID;
 //      if (snapshot.val().App_ID==p) {
 //      	var username=snapshot.val().App_name;
 //      	var date=snapshot.val().App_date;
 //      	var reason=snapshot.val().App_reason;
 //      	var link = snapshot.val().App_link;
 //      	var course = snapshot.val().App_course;
 //      	var id=p;
 //      	//localStorage.setItem()
 //      	alert(username);
 //      	alert('from process');
 //      	localStorage.setItem("app_username", username);
 //      	localStorage.setItem("app_date", date);
 //      	localStorage.setItem("app_reason", reason);
 //      	localStorage.setItem("app_link", link);
 //      	localStorage.setItem("app_course", course);
 //      	localStorage.setItem("app_id", id);
 //      	window.location.replace("application_view.html");

 //      }

  
	// });

}