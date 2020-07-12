
if (localStorage.getItem("value_role")== "Admin") {
	document.getElementById("role").innerHTML="Admin Dashboard";
	
}
else if (localStorage.getItem("value_role")== "Staff")
{
	document.getElementById("user_list").style.visibility = "hidden";
	document.getElementById("role").innerHTML="Staff Dashboard";
}
else if (localStorage.getItem("value_role")== "Doctor")
{
	document.getElementById("user_list").style.visibility = "hidden";
	document.getElementById("role").innerHTML="Doctor Dashboard";
}


var greetings='Welcome ';
greetings=greetings+'<strong>'+localStorage.getItem("value_username")+'</strong>!'
//var username = localStorage.getItem("value_username");
var userid = '<span class="fa fa-user"></span>' +' '+ localStorage.getItem("value_username");
document.getElementById("kickoff2").innerHTML=greetings;
