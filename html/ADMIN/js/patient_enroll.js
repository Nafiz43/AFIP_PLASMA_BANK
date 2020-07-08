
var load_content='';    
    load_content=load_content+'<div class="form-horizontal">';
    load_content=load_content+'<div class="col-sm-offset-5 col-sm-10">';
    load_content=load_content+'<div  class="lds-roller"><div></div><div></div><div>';
    load_content=load_content+'</div><div></div><div></div><div></div><div></div><div></div></div></div></div>';

    
    
function patient_enroll() {
    content='<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
    content=content+'<strong>Fill Out </strong>The Fields! </div> ';
    document.getElementById("alert_there").innerHTML=content;

    var name_s=document.getElementById("name").value;
    var id_s=document.getElementById("idp").value;
    id_s= id_s.replace("/","-");
    id_s= id_s.replace("/","-");
    id_s= id_s.replace("/","-");
    var rank_s=document.getElementById("rank").value;
    var unit_s=document.getElementById("unit").value;
    var pos_date_s=document.getElementById("pos_date").value;
    var blood_group_s=document.getElementById("blood_group").value;
    var age_s=document.getElementById("age").value;
    var spo21_s=document.getElementById("spo21").value;
    var spo22_s=document.getElementById("spo22").value;
    var lung1_s=document.getElementById("lung1").value;
    var lung2_s=document.getElementById("lung2").value;
    var titar_s=document.getElementById("antibodyTitar").value;

    var diabetes_s;
    if (document.getElementById("diabetes").checked) {
        diabetes_s='Positive';
    }
    else
    {
        diabetes_s='Negative';
    }
    
    var asthma_s;
    if (document.getElementById("asthma").checked) {
        asthma_s='Positive';
    }
    else
    {
        asthma_s='Negative';
    }


    var hypertension_s;
    if (document.getElementById("hypertension").checked) {
        hypertension_s='Positive';
    }
    else
    {
        hypertension_s='Negative';
    }

    var kidney_s;
    if (document.getElementById("kidney").checked) {
        kidney_s='Positive';
    }
    else
    {
        kidney_s='Negative';
    }


    var liver_s;
    if (document.getElementById("liver").checked) {
        liver_s='Positive';
    }
    else
    {
        liver_s='Negative';
    }

    var lung_s;
    if (document.getElementById("lung").checked) {
        lung_s='Positive';
    }
    else
    {
        lung_s='Negative';
    }


    var skin_s;
    if (document.getElementById("skin").checked) {
        skin_s='Positive';
    }
    else
    {
        skin_s='Negative';
    }

    var heart_s;
    if (document.getElementById("heart").checked) {
        heart_s='Positive';
    }
    else
    {
        heart_s='Negative';
    }


    var cns_s;
    if (document.getElementById("cns").checked) {
        cns_s='Positive';
    }
    else
    {
        cns_s='Negative';
    }
    var history_s = document.getElementById("history").value;

     if (id_s=='') {
        alert("Enter identification number!");
        content='<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
        content=content+'Enter <strong>identification number </strong>! </div> ';
        document.getElementById("alert_there").innerHTML=content;
    }
    else if(name_s=='')
    {   
        alert("Enter name!");
        content='<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
        content=content+'Enter <strong>name</strong>! </div> ';
        document.getElementById("alert_there").innerHTML=content;
    }
    else if(rank_s=='')
    {
        alert("Enter rank!");
        content='<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
        content=content+'Enter <strong>rank</strong>! </div> ';
        document.getElementById("alert_there").innerHTML=content;
    }
    else if(unit_s=='')
    {
        alert("Enter unit!");
        content='<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
        content=content+'Enter <strong>unit</strong>! </div> ';
        document.getElementById("alert_there").innerHTML=content;
    }
    else if(pos_date_s=='')
    {
        alert("Enter COVID-19 positive date!");
        content='<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
        content=content+'Enter <strong>COVID-19 positive date</strong>! </div> ';
        document.getElementById("alert_there").innerHTML=content;
    }
    else if(blood_group_s=='')
    {
        alert("Enter blood group!");
        content='<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
        content=content+'Enter <strong>blood group</strong>! </div> ';
        document.getElementById("alert_there").innerHTML=content;
    }
    else if(age_s=='')
    {
        alert("Enter age!");
        content='<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
        content=content+'Enter <strong>age</strong>! </div> ';
        document.getElementById("alert_there").innerHTML=content;
    }
    else
    {
        document.getElementById("loader").innerHTML=load_content;

            firebase.database().ref('patient/' + id_s).set({
            name: name_s,
            rank:rank_s,
            unit: unit_s,
            positiveDate:pos_date_s,
            bloodGroup: blood_group_s,
            age: age_s,
            otherDisease:history_s,
            diabetes: diabetes_s,
            asthma :asthma_s,
            hyperTension: hypertension_s,
            kidneyDisease:kidney_s,
            liverDisease:liver_s,
            lungDisease: lung_s,
            skinDisease: skin_s,
            heartDisease : heart_s,
            cnsDisease : cns_s
          }, function(error) {
            if (error) {
                content='<br>';
                content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
                content=content+'<strong>Failed</strong> to save data! </div> ';
                document.getElementById("alert_there").innerHTML=content;
            } else {
       
                content='<br>';
                content=content+'<div style="font-size: 16pt" class="alert alert-success" role="alert">';
                content=content+'Data <strong>saved</strong> successfully! </div> ';
                document.getElementById("alert_there").innerHTML=content;
                document.getElementById("loader").innerHTML='';

                
           
            }
          }); 


             firebase.database().ref('patient/' + id_s+'/followups/followup1').set({
               antibodyTitar: titar_s,
               lung1 : lung1_s,
               lung2 : lung2_s,
               spo21 : spo21_s,
               spo22 : spo22_s
          }, function(error) {
            if (error) {
                content='<br>';
                content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
                content=content+'<strong>Failed</strong> to save data! </div> ';
                document.getElementById("alert_there").innerHTML=content;
              // The write failed...
            } else {
            
                content='<br>';
                content=content+'<div style="font-size: 16pt" class="alert alert-success" role="alert">';
                content=content+'Data <strong>saved</strong> successfully! </div> ';
                document.getElementById("alert_there").innerHTML=content;
                document.getElementById("loader").innerHTML='';
                document.getElementById("name").disabled=true;
                document.getElementById("idp").disabled=true;
                document.getElementById("rank").disabled=true;
                document.getElementById("unit").disabled=true;
                document.getElementById("pos_date").disabled=true;
                document.getElementById("blood_group").disabled=true;
                document.getElementById("spo21").disabled=true;
                document.getElementById("spo22").disabled=true;
                document.getElementById("lung1").disabled=true;
                document.getElementById("lung2").disabled=true;
                document.getElementById("antibodyTitar").disabled=true;
                document.getElementById("diabetes").disabled=true;
                document.getElementById("asthma").disabled=true;
                document.getElementById("hypertension").disabled=true;
                document.getElementById("kidney").disabled=true;
                document.getElementById("liver").disabled=true;
                document.getElementById("lung").disabled=true;
                document.getElementById("skin").disabled=true;
                document.getElementById("heart").disabled=true;
                document.getElementById("cns").disabled=true;
                document.getElementById("sbt").disabled=true;  
           
            }
          }); 
    }

    



    // alert(id_s+name_s+rank_s+unit_s+pos_date_s+blood_group_s+age_s+history_s+spo21_s+spo22_s+lung1_s+lung2_s+titar_s);
    // alert(diabetes_s+asthma_s+hypertension_s+kidney_s+liver_s+lung_s+skin_s+heart_s+cns_s);



    // if (id_s=='') {
    //     content='<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
    //     content=content+'Enter <strong>identification number </strong>! </div> ';
    //     document.getElementById("alert_there").innerHTML=content;
    // }
    // else if()
    // {

    // }


}

