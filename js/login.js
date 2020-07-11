var load_content='';  
  load_content=load_content+'<div class="form-horizontal">';
  load_content=load_content+'<div class="txt1 text-center p-t-26 p-b-20">';
  load_content=load_content+'<div  class="lds-roller"><div></div><div></div><div>';
  load_content=load_content+'</div><div></div><div></div><div></div><div></div><div></div></div></div></div>';

   function check(form) {
                  var mail_s;

                  var content='<br>';
                  content=content+'<div class="alert alert-danger" role="alert">';
                  var input = $('.validate-input .input100');
                  var userid=document.getElementById("userid").value;
                  var password=document.getElementById("password").value;
                  
                //  localStorage.setItem("value_username",username);

                  if (userid=='' && password=='') {
                  	var thisAlert = $(input).parent();
       				$(thisAlert).addClass('alert-validate');
                    content=content+'Empty UserID and Password! </div> ';
                    document.getElementById("alert_there").innerHTML=content;
                    

                  }
                  else if (userid=='') {
                  	var thisAlert = $(input[0]).parent();
       				$(thisAlert).addClass('alert-validate');
                     content=content+'Empty UserID not allowed! </div> ';
                    document.getElementById("alert_there").innerHTML=content;
                   
                  }
                  else if (password=='') {
                  	var thisAlert = $(input[1]).parent();
       				$(thisAlert).addClass('alert-validate');
                     content=content+'Empty Password not allowed! </div> ';
                    document.getElementById("alert_there").innerHTML=content;
                    
                  }
                  else
                  {
                    var str = userid;
                    mail_s = str.replace(".", "");
                    mail_s = mail_s.replace(".", "");
                    mail_s = mail_s.replace(".", "");
                    mail_s = mail_s.replace(".", "");
                    mail_s = mail_s.replace(".", "");
                    mail_s = mail_s.replace(".", "");
                    mail_s = mail_s.replace(".", "");
                    mail_s = mail_s.replace(".", "");
                    mail_s = mail_s.replace(".", "");
                    mail_s = mail_s.replace(".", "");
                    mail_s = mail_s.replace(".", "");
                    

                     document.getElementById("loader").innerHTML=load_content;
                    firebase.database().ref('user/' + mail_s).once('value').then(function(snapshot) {
                     //alert("hello");

                      var s_userpass = snapshot.val().password;
                      var s_username = snapshot.val().name;
                      var s_status  = snapshot.val().request_status;
                      var s_role    = snapshot.val().role;
                      if (s_status=='approved') {
                                 if(s_userpass==password){
                                 {
                                    localStorage.setItem("value",mail_s);
                                     localStorage.setItem("value_role",s_role);
                                     localStorage.setItem("value_username",s_username);
                                     window.location.replace("html/ADMIN/Admin_Home.html");
                                }

                              }
                              else{
                                content=content+'Invalid UserID or Password!! </div> ';
                                document.getElementById("alert_there").innerHTML=content;
                                document.getElementById("loader").innerHTML='';
                              }

                      }
                      else
                      {
                                content=content+'Account is not yet verified by admin!! </div> ';
                                document.getElementById("alert_there").innerHTML=content;
                                document.getElementById("loader").innerHTML='';
                      }

                     
                     
                      
                  }).catch(function(error) {
                    content=content+'Invalid UserID or Password!! </div> ';
                    document.getElementById("alert_there").innerHTML=content;
                    document.getElementById("loader").innerHTML='';
                });






                  } 


                  
                  
                    
                  
            }

  