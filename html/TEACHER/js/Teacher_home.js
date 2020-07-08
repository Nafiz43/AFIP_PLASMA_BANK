
//alert('printing from js');
//alert('hello');

var greetings='Hello ';
greetings=greetings+'<strong>'+localStorage.getItem("value_username")+'</strong>!'
//var username = localStorage.getItem("value_username");
var userid = '<span class="fa fa-user"></span>' +' '+ localStorage.getItem("value_username");
document.getElementById("kickoff2").innerHTML=greetings;
