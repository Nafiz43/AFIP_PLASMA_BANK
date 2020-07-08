
if (localStorage.getItem("value_role")== "Admin") {
}
else
{
  document.getElementById("user_list").style.visibility = "hidden";
}

var load_content='';    
    load_content=load_content+'<div class="form-horizontal">';
    load_content=load_content+'<div class="col-sm-offset-5 col-sm-10">';
    load_content=load_content+'<div  class="lds-roller"><div></div><div></div><div>';
    load_content=load_content+'</div><div></div><div></div><div></div><div></div><div></div></div></div></div>';

function enroll_donor() {

    var name_s=document.getElementById("name").value;
    var dob_s=document.getElementById("dob").value;
    var blood_group_s=document.getElementById("blood_group").value;
    var address_s=document.getElementById("address").value;
    var district_s=document.getElementById("district").value;
    var area_set_s=document.getElementById("area_set").value;
    var mail_s=document.getElementById("mail").value;
    var contact_s=document.getElementById("contact").value;
    var pos_date_s = document.getElementById("pos_date").value;
    var neg_date_s=  document.getElementById("neg_date").value;
    var history_s = document.getElementById("history").value;
    var hiv_s;
    if (document.getElementById("hiv").checked) {
        hiv_s='Positive';
    }
    else
    {
        hiv_s='Negative';
    }

    var hbv_s;
    if (document.getElementById("hbv").checked) {
        hbv_s='Positive';
    }
    else
    {
        hbv_s='Negative';
    }

    var hcv_s;
    if (document.getElementById("hcv").checked) {
        hcv_s='Positive';
    }
    else
    {
        hcv_s='Negative';
    }

    var malaria_s;
    if (document.getElementById("malaria").checked) {
        malaria_s='Positive';
    }
    else
    {
        malaria_s='Negative';
    }

    var syphilis_s;
    if (document.getElementById("syphilis").checked) {
        syphilis_s ='Positive';
    }
    else
    {
        syphilis_s ='Negative';
    }
    
    address_s=address_s+area_set_s+", "+district_s;
    if (name_s=='') {
                alert("Enter name");
                content='';  
                content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
                content=content+'Enter <strong>name</strong> ! </div> ';
                document.getElementById("alert_there").innerHTML=content;
    }
    else if (dob_s=='') {
                alert("Enter date-of-birth");
                content='';
                content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
                content=content+'Enter <strong>date-of-birth</strong> ! </div> ';
                document.getElementById("alert_there").innerHTML=content;
    }
     else if (blood_group_s=='') {
            alert("Enter blood group");
            content='';
                content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
                content=content+'Enter <strong>blood group</strong> ! </div> ';
                document.getElementById("alert_there").innerHTML=content;
    }
     else if (address_s=='') {
            alert("Enter address");
            content='';
                content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
                content=content+'Enter <strong>address</strong> ! </div> ';
                document.getElementById("alert_there").innerHTML=content;
    }
     else if (district_s=='') {
            alert("Enter district");
            content='';
                content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
                content=content+'Enter <strong>district</strong> ! </div> ';
                document.getElementById("alert_there").innerHTML=content;
    }
     else if (area_set_s=='') {
            alert("Enter area");
            content='';
                content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
                content=content+'Enter <strong>area</strong> ! </div> ';
                document.getElementById("alert_there").innerHTML=content;
    }
     else if (contact_s=='') {
            alert("Enter date-of-birth");
            content='';
                content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
                content=content+'Enter <strong>contact</strong> ! </div> ';
                document.getElementById("alert_there").innerHTML=content;
    }
     else if (pos_date_s=='') {
            alert("Enter COVID-19 positive date");
            content='';
                content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
                content=content+'Enter <strong>COVID-19 positive date</strong> ! </div> ';
                document.getElementById("alert_there").innerHTML=content;
    }
     else if (neg_date_s=='') {
        content='';
            alert("Enter COVID-19 negative date");
                content=content+'<div style="font-size: 16pt" class="alert alert-danger" role="alert">';
                content=content+'Enter <strong>COVID-19 negative date</strong> ! </div> ';
                document.getElementById("alert_there").innerHTML=content;
    }
    else
    {
        var blood_count=0;
         document.getElementById("loader").innerHTML=load_content;
         firebase.database().ref('statistics/reg_count').once('value').then(function(snapshot) {
          
              id_s= snapshot.val();
              
              firebase.database().ref('statistics/'+blood_group_s+'').once('value').then(function(snapshot) {
                                    blood_count=snapshot.val();

                                    id_s = parseInt(id_s, 10)+1;
                                    blood_count = parseInt(blood_count, 10)+1;
                                  
                                 
                              firebase.database().ref('donor/' + id_s).set({
                                name: name_s,
                                dob: dob_s,
                                blood_group : blood_group_s,
                                address : address_s,
                                district : district_s,
                                area_set : area_set_s,
                                mail : mail_s,
                                contact : contact_s,
                                pos_date : pos_date_s,
                                neg_date: neg_date_s,
                                med_history : history_s,
                                hiv : hiv_s,
                                hbv : hbv_s,
                                hcv : hcv_s,
                                malaria : malaria_s,
                                syphilis : syphilis_s
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

                                    document.getElementById("name").disabled=true;
                                    document.getElementById("dob").disabled=true;
                                    document.getElementById("blood_group").disabled=true;
                                    document.getElementById("address").disabled=true;
                                    document.getElementById("district").disabled=true;
                                    document.getElementById("area_set").disabled=true;
                                    document.getElementById("mail").disabled=true;
                                    document.getElementById("contact").disabled=true;
                                    document.getElementById("pos_date").disabled=true;
                                    document.getElementById("neg_date").disabled=true;
                                    document.getElementById("hiv").disabled=true;
                                    document.getElementById("hcv").disabled=true;
                                    document.getElementById("hbv").disabled=true;
                                    document.getElementById("malaria").disabled=true;
                                    document.getElementById("syphilis").disabled=true;
                                    document.getElementById("history").disabled=true;
                                    document.getElementById("sbt").disabled=true;
                                }
                              }); 

                            if (blood_group_s=='A+') {
                                firebase.database().ref('statistics').update({
                                reg_count : id_s,
                                'A+' : blood_count
                              });
                            }
                             if (blood_group_s=='A-') {
                                firebase.database().ref('statistics').update({
                                reg_count : id_s,
                                'A-' : blood_count
                              });
                            }
                             if (blood_group_s=='B+') {
                                firebase.database().ref('statistics').update({
                                reg_count : id_s,
                                'B+' : blood_count
                              });
                            }
                             if (blood_group_s=='O+') {
                                firebase.database().ref('statistics').update({
                                reg_count : id_s,
                                'O+' : blood_count
                              });
                            }
                             if (blood_group_s=='O-') {
                                firebase.database().ref('statistics').update({
                                reg_count : id_s,
                                'O-' : blood_count
                              });
                            }
                             if (blood_group_s=='AB+') {
                                firebase.database().ref('statistics').update({
                                reg_count : id_s,
                                'AB+' : blood_count
                              });
                            }
                             if (blood_group_s=='AB-') {
                                firebase.database().ref('statistics').update({
                                reg_count : id_s,
                                'AB-' : blood_count
                              });
                            }
                             
                              



              
            });


        }, function(error) {
        if (error) {
         alert("read failed");
        } else {
            


        }
      });     
       

           
    }
    

}



 var Dhaka="";
 
        Dhaka=Dhaka+"<option></option>";
        Dhaka=Dhaka+"<option  >Adabar </option>";
        Dhaka=Dhaka+"<option >Azampur</option>";
        Dhaka=Dhaka+"<option>Badda </option>";
        Dhaka=Dhaka+"<option>Bangsal </option>";
        Dhaka=Dhaka+"<option>Bimanbandar </option>";
        Dhaka=Dhaka+"<option>Cantonment </option>";
        Dhaka=Dhaka+"<option>Chowkbazar </option>";
        Dhaka=Dhaka+"<option>Darus Salam </option>";
        Dhaka=Dhaka+"<option>Demra </option>";
        Dhaka=Dhaka+"<option>Dhanmondi </option>";
        Dhaka=Dhaka+"<option onclick=process(Dhamrai)>Dhamrai</option>";
        Dhaka=Dhaka+"<option>Dohar</option>";
        Dhaka=Dhaka+"<option>Gendaria </option>";
        Dhaka=Dhaka+"<option>Gulshan </option>";
        Dhaka=Dhaka+"<option>Hazaribagh </option>";
        Dhaka=Dhaka+"<option>Kadamtali </option>";
        Dhaka=Dhaka+"<option>Kafrul </option>";
        Dhaka=Dhaka+"<option>Kalabagan</option>";
        Dhaka=Dhaka+"<option>Kamrangirchar </option>";
        Dhaka=Dhaka+"<option>Keraniganj</option>";
        Dhaka=Dhaka+"<option>Khilgaon </option>";
        Dhaka=Dhaka+"<option>Khilkhet </option>";
        Dhaka=Dhaka+"<option>Kotwali  </option>";
        Dhaka=Dhaka+"<option>Lalbagh </option>";
        Dhaka=Dhaka+"<option>Mirpur Model </option>";
        Dhaka=Dhaka+"<option>Mohammadpur </option>";
        Dhaka=Dhaka+"<option>Motijheel </option>";
        Dhaka=Dhaka+"<option>New Market </option>";
        Dhaka=Dhaka+"<option>Nawabganj</option>";
        Dhaka=Dhaka+"<option>Pallabi </option>";
        Dhaka=Dhaka+"<option>Paltan</option>";
        Dhaka=Dhaka+"<option>Panthapath</option>";
        Dhaka=Dhaka+"<option>Ramna </option>";
        Dhaka=Dhaka+"<option>Rampura </option>";
        Dhaka=Dhaka+"<option>Sabujbagh </option>";
        Dhaka=Dhaka+"<option>Shah Ali </option>";
        Dhaka=Dhaka+"<option>Shahbag</option>";
        Dhaka=Dhaka+"<option>Sher-e-Bangla Nagar</option>";
        Dhaka=Dhaka+"<option>Shyampur </option>";
        Dhaka=Dhaka+"<option>Sutrapur </option>";
        Dhaka=Dhaka+"<option>Savar</option>";
        Dhaka=Dhaka+"<option>Tejgaon Industrial Area </option>";
        Dhaka=Dhaka+"<option>Tejgaon </option>";
        Dhaka=Dhaka+"<option>Turag </option>";
        Dhaka=Dhaka+"<option>Uttar Khan </option>";
        Dhaka=Dhaka+"<option>Uttara </option>";
        Dhaka=Dhaka+"<option>Vatara </option>";
        Dhaka=Dhaka+"<option>Wari </option>";
    

    var Faridpur="";

        Faridpur=Faridpur+"<option></option>";
        Faridpur=Faridpur+"<option>Alfadanga</option>";
        Faridpur=Faridpur+"<option>Bhanga</option>";
        Faridpur=Faridpur+"<option>Boalmari</option>";
        Faridpur=Faridpur+"<option>Charbhadrasan</option>";
        Faridpur=Faridpur+"<option>Faridpur-S</option>";
        Faridpur=Faridpur+"<option>Madhukhali</option>";
        Faridpur=Faridpur+"<option>Nagarkanda</option>";
        Faridpur=Faridpur+"<option>Sadarpur</option>";
        Faridpur=Faridpur+"<option>Saltha</option>";
    


    var Bagerhat="";
        Bagerhat=Bagerhat+"<option></option>";
        Bagerhat=Bagerhat+"<option>Bagerhat-S</option>";
        Bagerhat=Bagerhat+"<option>Chitalmari</option>";
        Bagerhat=Bagerhat+"<option>Fakirhat</option>";
        Bagerhat=Bagerhat+"<option>Kachua</option>";
        Bagerhat=Bagerhat+"<option>Mollahat</option>";
        Bagerhat=Bagerhat+"<option>Mongla</option>";
        Bagerhat=Bagerhat+"<option>Morrelganj</option>";
        Bagerhat=Bagerhat+"<option>Rampal</option>";
        Bagerhat=Bagerhat+"<option>Sharankhola</option>";

    var Bandarban="";

        Bandarban=Bandarban+"<option></option>";
        Bandarban=Bandarban+"<option>Alikadam</option>";
        Bandarban=Bandarban+"<option>Bandarban-S</option>";
        Bandarban=Bandarban+"<option>Lama</option>";
        Bandarban=Bandarban+"<option>Naikhyongchari</option>";
        Bandarban=Bandarban+"<option>Rowangchari</option>";
        Bandarban=Bandarban+"<option>Ruma</option>";
        Bandarban=Bandarban+"<option>Thanchi</option>";
    

    var Barguna="";

        Barguna=Barguna+"<option></option>";
        Barguna=Barguna+"<option>Amtali</option>";
        Barguna=Barguna+"<option>Bamna</option>";
        Barguna=Barguna+"<option>Barguna-S</option>";
        Barguna=Barguna+"<option>Betagi</option>";
        Barguna=Barguna+"<option>Patharghata</option>";
        Barguna=Barguna+"<option>Taltali</option>";
    

    var Barisal="";

        Barisal=Barisal+"<option></option>";
        Barisal=Barisal+"<option>Agailjhara</option>";
        Barisal=Barisal+"<option>Babuganj</option>";
        Barisal=Barisal+"<option>Bakerganj</option>";
        Barisal=Barisal +"<option>Banaripara</option>";
        Barisal=Barisal+"<option>Barishal-S</option>";
        Barisal=Barisal+"<option>Gouranadi</option>";
        Barisal=Barisal+"<option>Hizla</option>";
        Barisal=Barisal+"<option>Mehendiganj</option>";
        Barisal=Barisal+"<option>Muladi</option>";
        Barisal=Barisal+"<option>Uzirpur</option>";
    

    var Bhola="";
        Bhola=Bhola+"<option></option>";
        Bhola=Bhola+"<option>Bhola-S</option>";
        Bhola=Bhola+"<option>Borhanuddin</option>";
        Bhola=Bhola+"<option>Charfassion</option>";
        Bhola=Bhola+"<option>Daulatkhan</option>";
        Bhola=Bhola+"<option>Lalmohan</option>";
        Bhola=Bhola+"<option>Monpura</option>";
        Bhola=Bhola+"<option>Tazumuddin</option>";
    

    var Bogra="";

        Bogra=Bogra+"<option></option>";
        Bogra=Bogra+"<option>Adamdighi</option>";
        Bogra=Bogra+"<option>Bogura-S</option>";
        Bogra=Bogra+"<option>Dhunot</option>";
        Bogra=Bogra+"<option>Dhupchancia</option>";
        Bogra=Bogra+"<option>Gabtali</option>";
        Bogra=Bogra+"<option>Kahaloo</option>";
        Bogra=Bogra+"<option>Nandigram</option>";
        Bogra=Bogra+"<option>Sariakandi</option>";
        Bogra=Bogra+"<option>Shajahanpur</option>";
        Bogra=Bogra+"<option>Sherpur</option>";
        Bogra=Bogra+"<option>Shibganj</option>";
        Bogra=Bogra+"<option>Sonatala</option>";
    

    var Brahmanbaria="";
        Brahmanbaria=Brahmanbaria+"<option></option>";
        Brahmanbaria=Brahmanbaria+"<option>Akhaura</option>";
        Brahmanbaria=Brahmanbaria+"<option>Ashuganj</option>";
        Brahmanbaria=Brahmanbaria+"<option>B.Baria-S</option>";
        Brahmanbaria=Brahmanbaria+"<option>Bancharampur</option>";
        Brahmanbaria=Brahmanbaria+"<option>Bijoynagar</option>";
        Brahmanbaria=Brahmanbaria+"<option>Kasba</option>";
        Brahmanbaria=Brahmanbaria+"<option>Nabinagar</option>";
        Brahmanbaria=Brahmanbaria+"<option>Nasirnagar</option>";
        Brahmanbaria=Brahmanbaria+"<option>Sarail</option>";
		
		
    var Chandpur="";

        Chandpur=Chandpur+"<option></option>";
        Chandpur=Chandpur+"<option>Chandpur-S</option>";
        Chandpur=Chandpur+"<option>Faridganj</option>";
        Chandpur=Chandpur+"<option>Haimchar</option>";
        Chandpur=Chandpur+"<option>Haziganj</option>";
        Chandpur=Chandpur+"<option>Kachua</option>";
        Chandpur=Chandpur +"<option>Matlab (Dakshin)</option>";
        Chandpur=Chandpur+"<option>Matlab (Uttar)</option>";
        Chandpur=Chandpur+"<option>Shahrasti</option>";
    

    var Chapainawabganj="";
        
        Chapainawabganj=Chapainawabganj+"<option></option>";
        Chapainawabganj=Chapainawabganj+"<option>Bholahat</option>";
        Chapainawabganj=Chapainawabganj+"<option>Gomostapur</option>";
        Chapainawabganj=Chapainawabganj+"<option>Nachol</option>";
        Chapainawabganj=Chapainawabganj+"<option>Nawabganj-S</option>";
        Chapainawabganj=Chapainawabganj+"<option>Shibganj</option>";
    

    var Chittagong="";
        Chittagong=Chittagong+"<option></option>";
        Chittagong=Chittagong+"<option>Anwara</option>";
        Chittagong=Chittagong+"<option>Banskhali</option>";
        Chittagong=Chittagong+"<option>Boalkhali</option>";
        Chittagong=Chittagong+"<option>Chandanish</option>";
        Chittagong=Chittagong+"<option>Fatikchari</option>";
        Chittagong=Chittagong+"<option>Hathazari</option>";
        Chittagong=Chittagong+"<option>Karnaphuli</option>";
        Chittagong=Chittagong+"<option>Lohagara</option>";
        Chittagong=Chittagong+"<option>Mirsharai</option>";
        Chittagong=Chittagong+"<option>Patiya</option>";
        Chittagong=Chittagong+"<option>Rangunia</option>";
        Chittagong=Chittagong+"<option>Raojan</option>";
        Chittagong=Chittagong+"<option>Sandwip</option>";
        Chittagong=Chittagong+"<option>Satkania</option>";
        Chittagong=Chittagong+"<option>Sitakunda</option>";
    

    var Chuadanga="";
        Chuadanga=Chuadanga+"<option></option>";
        Chuadanga=Chuadanga+"<option>Alamdanga</option>";
        Chuadanga=Chuadanga+"<option>Chuadanga-S</option>";
        Chuadanga=Chuadanga+"<option>Damurhuda</option>";
        Chuadanga=Chuadanga+"<option>Jibannagar</option>";
    
    var Comilla="";
        Comilla=Comilla+"<option></option>";
        Comilla=Comilla+"<option>Barura</option>";
        Comilla=Comilla+"<option>Brahmanpara</option>";
        Comilla=Comilla+"<option>Burichong</option>";
        Comilla=Comilla+"<option>Chandina</option>";
        Comilla=Comilla+"<option>Chouddagram</option>";
        Comilla=Comilla+"<option>Cumilla-S</option>";
        Comilla=Comilla+"<option>Cumilla-S Daksin</option>";
        Comilla=Comilla+"<option>Daudkandi</option>";
        Comilla=Comilla+"<option>Debidwar</option>";
        Comilla=Comilla+"<option>Homna</option>";
        Comilla=Comilla+"<option>Laksham</option>";
        Comilla=Comilla+"<option>Lalmai</option>";
        Comilla=Comilla+"<option>Meghna</option>";
        Comilla=Comilla+"<option>Monohorganj</option>";
        Comilla=Comilla+"<option>Muradnagar</option>";
        Comilla=Comilla+"<option>Nangalkot</option>";
        Comilla=Comilla+"<option>Titas</option>";
    


    var CoxsBazar="";
        CoxsBazar=CoxsBazar+"<option></option>";
        CoxsBazar=CoxsBazar+"<option>Chakoria</option>";
        CoxsBazar=CoxsBazar+"<option>CoxSBazar-S</option>";
        CoxsBazar=CoxsBazar+"<option>Kutubdia</option>";
        CoxsBazar=CoxsBazar+"<option>Moheskhali</option>";
        CoxsBazar=CoxsBazar+"<option>Pekua</option>";
        CoxsBazar=CoxsBazar+"<option>Ramu</option>";
        CoxsBazar=CoxsBazar+"<option>Teknaf</option>";
        CoxsBazar=CoxsBazar+"<option>Ukhiya</option>";
    

    var Dinajpur="";
        Dinajpur=Dinajpur+"<option></option>";
        Dinajpur=Dinajpur+"<option>Birampur</option>";
        Dinajpur=Dinajpur+"<option>Birganj</option>";
        Dinajpur=Dinajpur+"<option>Birol</option>";
        Dinajpur=Dinajpur+"<option>Bochaganj</option>";
        Dinajpur=Dinajpur+"<option>Chirirbandar</option>";
        Dinajpur=Dinajpur+"<option>Dinajpur-S</option>";
        Dinajpur=Dinajpur+"<option>Fulbari</option>";
        Dinajpur=Dinajpur+"<option>Ghoraghat</option>";
        Dinajpur=Dinajpur+"<option>Hakimpur</option>";
        Dinajpur=Dinajpur+"<option>Kaharol</option>";
        Dinajpur=Dinajpur+"<option>Khanshama</option>";
        Dinajpur=Dinajpur+"<option>Nawabganj</option>";
        Dinajpur=Dinajpur+"<option>Parbatipur</option>";
    



    var Feni="";

        Feni=Feni+"<option></option>";
        Feni=Feni+"<option>Chhagalniya</option>";
        Feni=Feni+"<option>Daganbhuiyan</option>";
        Feni=Feni+"<option>Feni-S</option>";
        Feni=Feni+"<option>Fulgazi</option>";
        Feni=Feni+"<option>Porshuram</option>";
        Feni=Feni+"<option>Sonagazi</option>";
    


    var Gaibandha="";


        Gaibandha=Gaibandha+"<option></option>";
        Gaibandha=Gaibandha+"<option>Fulchari</option>";
        Gaibandha=Gaibandha+"<option>Gaibandha-S</option>";
        Gaibandha=Gaibandha+"<option>Gobindaganj</option>";
        Gaibandha=Gaibandha+"<option>Palashbari</option>";
        Gaibandha=Gaibandha+"<option>Sadullapur</option>";
        Gaibandha=Gaibandha+"<option>Saghata</option>";
        Gaibandha=Gaibandha+"<option>Sundarganj</option>";
    
    var Gazipur="";
        Gazipur=Gazipur+"<option></option>";
        Gazipur=Gazipur+"<option>Gazipur-S</option>";
        Gazipur=Gazipur+"<option>Kaliakoir</option>";
        Gazipur=Gazipur+"<option>KaliganjGazipur</option>";
        Gazipur=Gazipur+"<option>Kapasia</option>";
        Gazipur=Gazipur+"<option>Sreepur</option>";
    
    var Gopalganj="";
        Gopalganj=Gopalganj+"<option></option>";
        Gopalganj=Gopalganj+"<option>Gopalganj-S</option>";
        Gopalganj=Gopalganj+"<option>Kasiani</option>";
        Gopalganj=Gopalganj+"<option>KotwaliparaGopalganj</option>";
        Gopalganj=Gopalganj+"<option>Muksudpur</option>";
        Gopalganj=Gopalganj+"<option>Tungipara</option>";
    
    var Habiganj="";
        Habiganj=Habiganj+"<option></option>";
        Habiganj=Habiganj+"<option>Azmiriganj</option>";
        Habiganj=Habiganj+"<option>Bahubal</option>";
        Habiganj=Habiganj+"<option>Baniachong</option>";
        Habiganj=Habiganj+"<option>Chunarughat</option>";
        Habiganj=Habiganj+"<option>Habiganj-S</option>";
        Habiganj=Habiganj+"<option>Lakhai</option>";
        Habiganj=Habiganj+"<option>Madhabpur</option>";
        Habiganj=Habiganj+"<option>Nabiganj</option>";
        Habiganj=Habiganj+"<option>Sayestaganj</option>";
    
    var Jamalpur="";

        Jamalpur=Jamalpur+"<option></option>";
        Jamalpur=Jamalpur+"<option>Bakshiganj</option>";
        Jamalpur=Jamalpur+"<option>Dewanganj</option>";
        Jamalpur=Jamalpur+"<option>Islampur</option>";
        Jamalpur=Jamalpur+"<option>Jamalpur-S</option>";
        Jamalpur=Jamalpur+"<option>Madarganj</option>";
        Jamalpur=Jamalpur+"<option>Melendah</option>";
        Jamalpur=Jamalpur+"<option>Sarishabari</option>";
    

    var Jessore="";
        Jessore=Jessore+"<option></option>";
        Jessore=Jessore+"<option>Abhoynagar</option>";
        Jessore=Jessore+"<option>Bagherpara</option>";
        Jessore=Jessore+"<option>Chowgacha</option>";
        Jessore=Jessore+"<option>Jashore-S</option>";
        Jessore=Jessore+"<option>Jhikargacha</option>";
        Jessore=Jessore+"<option>Keshabpur</option>";
        Jessore=Jessore+"<option>Monirampur</option>";
        Jessore=Jessore+"<option>Sarsha</option>";
    

    var Jhalokati="";
        Jhalokati=Jhalokati+"<option></option>";
        Jhalokati=Jhalokati+"<option>Jhalokathi-S</option>";
        Jhalokati=Jhalokati+"<option>Kathalia</option>";
        Jhalokati=Jhalokati+"<option>Nalchity</option>";
        Jhalokati=Jhalokati+"<option>Rajapur</option>";

    var Jhenaidah="";

        Jhenaidah=Jhenaidah+"<option></option>";
        Jhenaidah=Jhenaidah+"<option>Harinakunda</option>";
        Jhenaidah=Jhenaidah+"<option>Jhenaidah-S</option>";
        Jhenaidah=Jhenaidah+"<option>Kaliganj</option>";
        Jhenaidah=Jhenaidah+"<option>Kotchandpur</option>";
        Jhenaidah=Jhenaidah+"<option>Moheshpur</option>";
        Jhenaidah=Jhenaidah+"<option>Shailkupa</option>";
    
    var Joypurhat="";
        Joypurhat=Joypurhat+"<option></option>";
        Joypurhat=Joypurhat+"<option>Akkelpur</option>";
        Joypurhat=Joypurhat+"<option>Joypurhat-S</option>";
        Joypurhat=Joypurhat+"<option>Kalai</option>";
        Joypurhat=Joypurhat+"<option>Khetlal</option>";
        Joypurhat=Joypurhat+"<option>Panchbibi</option>";
    
    var Khagrachhari="";
        Khagrachhari=Khagrachhari+"<option></option>";
        Khagrachhari=Khagrachhari+"<option>Dighinala</option>";
        Khagrachhari=Khagrachhari+"<option>Guimara</option>";
        Khagrachhari=Khagrachhari+"<option>Khagrachari-S</option>";
        Khagrachhari=Khagrachhari+"<option>Laxmichari</option>";
        Khagrachhari=Khagrachhari+"<option>Mahalchari</option>";
        Khagrachhari=Khagrachhari+"<option>Manikchari</option>";
        Khagrachhari=Khagrachhari+"<option>Matiranga</option>";
        Khagrachhari=Khagrachhari+"<option>Panchari</option>";
        Khagrachhari=Khagrachhari+"<option>Ramgarh</option>";
    

    var Khulna="";

        Khulna=Khulna+"<option></option>";
        Khulna=Khulna+"<option>Batiaghata</option>";
        Khulna=Khulna+"<option>Dacope</option>";
        Khulna=Khulna+"<option>Dighalia</option>";
        Khulna=Khulna+"<option>Dumuria</option>";
        Khulna=Khulna+"<option>Koira</option>";
        Khulna=Khulna+"<option>Paikgacha</option>";
        Khulna=Khulna+"<option>Phultala</option>";
        Khulna=Khulna+"<option>Rupsa</option>";
        Khulna=Khulna+"<option>Terokhada</option>";
    
    var Kishoreganj="";

        Kishoreganj=Kishoreganj+"<option></option>";
        Kishoreganj=Kishoreganj+"<option>Austagram</option>";
        Kishoreganj=Kishoreganj+"<option>Bajitpur</option>";
        Kishoreganj=Kishoreganj+"<option>Bhairab</option>";
        Kishoreganj=Kishoreganj+"<option>Hossainpur</option>";
        Kishoreganj=Kishoreganj+"<option>Itna</option>";
        Kishoreganj=Kishoreganj+"<option>Karimganj</option>";
        Kishoreganj=Kishoreganj+"<option>KatiadiKishoreganj</option>";
        Kishoreganj=Kishoreganj+"<option>Kishoreganj-S</option>";
        Kishoreganj=Kishoreganj+"<option>Kuliarchar</option>";
        Kishoreganj=Kishoreganj+"<option>Mithamoin</option>";
        Kishoreganj=Kishoreganj+"<option>Nikli</option>";
        Kishoreganj=Kishoreganj+"<option>Pakundia</option>";
        Kishoreganj=Kishoreganj+"<option>Tarail</option>";
    
    var Kurigram="";
        Kurigram=Kurigram+"<option></option>";
        Kurigram=Kurigram+"<option>Bhurungamari</option>";
        Kurigram=Kurigram+"<option>Chilmari</option>";
        Kurigram=Kurigram+"<option>Fulbari</option>";
        Kurigram=Kurigram+"<option>Kurigram-S</option>";
        Kurigram=Kurigram+"<option>Nageswari</option>";
        Kurigram=Kurigram+"<option>Rajarhat</option>";
        Kurigram=Kurigram+"<option>Rajibpur</option>";
        Kurigram=Kurigram+"<option>Rowmari</option>";
        Kurigram=Kurigram+"<option>Ulipur</option>";
    

    var Kushtia="";

        Kushtia=Kushtia+"<option></option>";
        Kushtia=Kushtia+"<option>Bheramara</option>";
        Kushtia=Kushtia+"<option>Daulatpur</option>";
        Kushtia=Kushtia+"<option>Khoksha</option>";
        Kushtia=Kushtia+"<option>Kumarkhali</option>";
        Kushtia=Kushtia+"<option>Kushtia-S</option>";
        Kushtia=Kushtia+"<option>Mirpur</option>";
    

    var Lakshmipur="";

        Lakshmipur=Lakshmipur+"<option></option>";
        Lakshmipur=Lakshmipur+"<option>Komol Nagar</option>";
        Lakshmipur=Lakshmipur+"<option>Laxmipur-S</option>";
        Lakshmipur=Lakshmipur+"<option>RaipurLaxmipur</option>";
        Lakshmipur=Lakshmipur+"<option>Ramganj</option>";
        Lakshmipur=Lakshmipur+"<option>Ramgati</option>";
    

    var Lalmonirhat="";
        Lalmonirhat=Lalmonirhat+"<option></option>";
        Lalmonirhat=Lalmonirhat+"<option>Aditmari</option>";
        Lalmonirhat=Lalmonirhat+"<option>Hatibandha</option>";
        Lalmonirhat=Lalmonirhat+"<option>Kaliganj</option>";
        Lalmonirhat=Lalmonirhat+"<option>Lalmonirhat-S</option>";
        Lalmonirhat=Lalmonirhat+"<option>Patgram</option>";
    

    var Madaripur="";

        Madaripur=Madaripur+"<option></option>";
        Madaripur=Madaripur+"<option>Kalkini</option>";
        Madaripur=Madaripur+"<option>Madaripur-S</option>";
        Madaripur=Madaripur+"<option>Rajoir</option>";
        Madaripur=Madaripur+"<option>Shibchar</option>";
    
    var Magura="";
        Magura=Magura+"<option></option>";
        Magura=Magura+"<option>Magura-S</option>";
        Magura=Magura+"<option>Salikha</option>";
        Magura=Magura+"<option>Mohammadpur</option>";
        Magura=Magura+"<option>Salikha</option>";
        Magura=Magura+"<option>Sreepur</option>";
    

    var Manikganj="";
    
        Manikganj=Manikganj+"<option></option>";
        Manikganj=Manikganj+"<option>Daulatpur</option>";
        Manikganj=Manikganj+"<option>Ghior</option>";
        Manikganj=Manikganj+"<option>Harirampur</option>";
        Manikganj=Manikganj+"<option>Manikganj-S</option>";
        Manikganj=Manikganj+"<option>Saturia</option>";
        Manikganj=Manikganj+"<option>Shivalaya</option>";
        Manikganj=Manikganj+"<option>Singair</option>";

        
    var Meherpur="";
        Meherpur=Meherpur+"<option></option>";
        Meherpur=Meherpur+"<option>Gangni</option>";
        Meherpur=Meherpur+"<option>Meherpur-S</option>";
        Meherpur=Meherpur+"<option>Mujib Nagar</option>";
    
    var Moulvibazar="";
        Moulvibazar=Moulvibazar+"<option></option>";
        Moulvibazar=Moulvibazar+"<option>Barlekha</option>";
        Moulvibazar=Moulvibazar+"<option>Juri</option>";
        Moulvibazar=Moulvibazar+"<option>Kamalganj</option>";
        Moulvibazar=Moulvibazar+"<option>Kulaura</option>";
        Moulvibazar=Moulvibazar+"<option>Moulvibazar-S</option>";
        Moulvibazar=Moulvibazar+"<option>Rajnagar</option>";
        Moulvibazar=Moulvibazar+"<option>Sreemangal</option>";
    

    var Munshiganj="";

        Munshiganj=Munshiganj+"<option></option>";
        Munshiganj=Munshiganj+"<option>Gazaria</option>";
        Munshiganj=Munshiganj+"<option>Lauhajong</option>";
        Munshiganj=Munshiganj+"<option>Munshiganj-S</option>";
        Munshiganj=Munshiganj+"<option>Sirajdikhan</option>";
        Munshiganj=Munshiganj+"<option>Sreenagar</option>";
        Munshiganj=Munshiganj+"<option>Tongibari</option>";
    
    var Mymensingh="";

        Mymensingh=Mymensingh+"<option></option>";
        Mymensingh=Mymensingh+"<option>Bhaluka</option>";
        Mymensingh=Mymensingh+"<option>Dhobaura</option>";
        Mymensingh=Mymensingh+"<option>Fulbaria</option>";
        Mymensingh=Mymensingh+"<option>Gaffargaon</option>";
        Mymensingh=Mymensingh+"<option>Gouripur</option>";
        Mymensingh=Mymensingh+"<option>Haluaghat</option>";
        Mymensingh=Mymensingh+"<option>Ishwarganj</option>";
        Mymensingh=Mymensingh+"<option>Muktagacha</option>";
        Mymensingh=Mymensingh+"<option>Mymensingh-S</option>";
        Mymensingh=Mymensingh+"<option>Nandail</option>";
        Mymensingh=Mymensingh+"<option>Phulpur</option>";
        Mymensingh=Mymensingh+"<option>Tarakanda</option>";
        Mymensingh=Mymensingh+"<option>Trishal</option>";
    
    var Naogaon="";
        Naogaon=Naogaon+"<option></option>";
        Naogaon=Naogaon+"<option>Atrai</option>";
        Naogaon=Naogaon+"<option>Badalgachi</option>";
        Naogaon=Naogaon+"<option>Dhamoirhat</option>";
        Naogaon=Naogaon+"<option>Manda</option>";
        Naogaon=Naogaon+"<option>Mohadevpur</option>";
        Naogaon=Naogaon+"<option>Naogaon-S</option>";
        Naogaon=Naogaon+"<option>Niamatpur</option>";
        Naogaon=Naogaon+"<option>Patnitala</option>";
        Naogaon=Naogaon+"<option>Porsha</option>";
        Naogaon=Naogaon+"<option>Raninagar</option>";
        Naogaon=Naogaon+"<option>Shapahar</option>";
    
    var Narail="";
        Narail=Narail+"<option></option>";
        Narail=Narail+"<option>Kalia</option>";
        Narail=Narail+"<option>Lohagara</option>";
        Narail=Narail+"<option>Narail-S</option>";
    

    var Narayanganj="";
        Narayanganj=Narayanganj+"<option></option>";
        Narayanganj=Narayanganj+"<option>Araihazar</option>";
        Narayanganj=Narayanganj+"<option>Bandar</option>";
        Narayanganj=Narayanganj+"<option>Narayanganj-S</option>";
        Narayanganj=Narayanganj+"<option>Rupganj</option>";
        Narayanganj=Narayanganj+"<option>Sonargaon</option>";
    

    var Narsingdi="";
        Narsingdi=Narsingdi+"<option></option>";
        Narsingdi=Narsingdi+"<option>Belabo</option>";
        Narsingdi=Narsingdi+"<option>Monohardi</option>";
        Narsingdi=Narsingdi+"<option>Narshingdi-S</option>";
        Narsingdi=Narsingdi+"<option>Palash</option>";
        Narsingdi=Narsingdi+"<option>Raipura</option>";
        Narsingdi=Narsingdi+"<option>Shibpur</option>";
    

    var Natore="";
        Natore=Natore+"<option></option>";
        Natore=Natore+"<option>Bagatipara</option>";
        Natore=Natore+"<option>Baraigram</option>";
        Natore=Natore+"<option>Gurudaspur</option>";
        Natore=Natore+"<option>Lalpur</option>";
        Natore=Natore+"<option>Naldanga</option>";
        Natore=Natore+"<option>Natore-S</option>";
        Natore=Natore+"<option>Singra</option>";
    

    var Netrokona="";
        Netrokona=Netrokona+"<option></option>";
        Netrokona=Netrokona+"<option>Atpara</option>";
        Netrokona=Netrokona+"<option>Barhatta</option>";
        Netrokona=Netrokona+"<option>Durgapur</option>";
        Netrokona=Netrokona+"<option>Kalmakanda</option>";
        Netrokona=Netrokona+"<option>Kendua</option>";
        Netrokona=Netrokona+"<option>Khaliajuri</option>";
        Netrokona=Netrokona+"<option>Madan</option>";
        Netrokona=Netrokona+"<option>Mohanganj</option>";
        Netrokona=Netrokona+"<option>Netrakona-S</option>";
        Netrokona=Netrokona+"<option>Purbadhala</option>";
    

    var Nilphamari="";
        Nilphamari=Nilphamari+"<option></option>";
        Nilphamari=Nilphamari+"<option>Dimla</option>";
        Nilphamari=Nilphamari+"<option>Domar</option>";
        Nilphamari=Nilphamari+"<option>Jaldhaka</option>";
        Nilphamari=Nilphamari+"<option>Kishoreganj</option>";
        Nilphamari=Nilphamari+"<option>Nilphamari-S</option>";
        Nilphamari=Nilphamari+"<option>Sayedpur</option>";
    

    var Noakhali="";
        Noakhali=Noakhali+"<option></option>";
        Noakhali=Noakhali+"<option>Begumganj</option>";
        Noakhali=Noakhali+"<option>Chatkhil</option>";
        Noakhali=Noakhali+"<option>Companiganj</option>";
        Noakhali=Noakhali+"<option>Hatiya</option>";
        Noakhali=Noakhali+"<option>Kabir HatNoakhali</option>";
        Noakhali=Noakhali+"<option>Noakhali-S</option>";
        Noakhali=Noakhali+"<option>Senbag</option>";
        Noakhali=Noakhali+"<option>Sonaimuri</option>";
        Noakhali=Noakhali+"<option>Subarna Char</option>";
    

    var Pabna="";
        Pabna=Pabna+"<option></option>";
        Pabna=Pabna+"<option>Atghoria</option>";
        Pabna=Pabna+"<option>Bera</option>";
        Pabna=Pabna+"<option>Bhangura</option>";
        Pabna=Pabna+"<option>Chatmohar</option>";
        Pabna=Pabna+"<option>Faridpur</option>";
        Pabna=Pabna+"<option>Ishwardi</option>";
        Pabna=Pabna+"<option>Pabna-S</option>";
        Pabna=Pabna+"<option>Santhia</option>";
        Pabna=Pabna+"<option>Sujanagar</option>";
    

    var Panchagarh=""; 
        Panchagarh=Panchagarh+"<option></option>";
        Panchagarh=Panchagarh+"<option>Atwari</option>";
        Panchagarh=Panchagarh+"<option>Boda</option>";
        Panchagarh=Panchagarh+"<option>Debiganj</option>";
        Panchagarh=Panchagarh+"<option>Panchagarh-S</option>";
        Panchagarh=Panchagarh+"<option>Tetulia</option>";
    

    var Patuakhali="";
        Patuakhali=Patuakhali+"<option></option>";
        Patuakhali=Patuakhali+"<option>Bauphal</option>";
        Patuakhali=Patuakhali+"<option>Dashmina</option>";
        Patuakhali=Patuakhali+"<option>Dumki</option>";
        Patuakhali=Patuakhali+"<option>Galachipa</option>";
        Patuakhali=Patuakhali+"<option>Kalapara</option>";
        Patuakhali=Patuakhali+"<option>Mirjaganj</option>";
        Patuakhali=Patuakhali+"<option>Patuakhali-S</option>";
        Patuakhali=Patuakhali+"<option>Rangabali</option>";
    

    var Pirojpur="";
        Pirojpur=Pirojpur+"<option></option>";
        Pirojpur=Pirojpur+"<option>Bhandaria</option>";
        Pirojpur=Pirojpur+"<option>Kawkhali</option>";
        Pirojpur=Pirojpur+"<option>Mothbaria</option>";
        Pirojpur=Pirojpur+"<option>Nazirpur</option>";
        Pirojpur=Pirojpur+"<option>Nesarabad</option>";
        Pirojpur=Pirojpur+"<option>Pirojpur-S</option>";
        Pirojpur=Pirojpur+"<option>Zianagar</option>";
    

    var Rajbari="";
        Rajbari=Rajbari+"<option></option>";
        Rajbari=Rajbari+"<option>Baliakandi</option>";
        Rajbari=Rajbari+"<option>Goalanda</option>";
        Rajbari=Rajbari+"<option>Kalukhali</option>";
        Rajbari=Rajbari+"<option>Pangsha</option>";
        Rajbari=Rajbari+"<option>Rajbari-S</option>";
    

    var Rajshahi="";

        Rajshahi=Rajshahi+"<option></option>";
        Rajshahi=Rajshahi+"<option>Bagha</option>";
        Rajshahi=Rajshahi+"<option>Bagmara</option>";
        Rajshahi=Rajshahi+"<option>Charghat</option>";
        Rajshahi=Rajshahi+"<option>Durgapur</option>";
        Rajshahi=Rajshahi+"<option>Godagari</option>";
        Rajshahi=Rajshahi+"<option>Mohanpur</option>";
        Rajshahi=Rajshahi+"<option>Paba</option>";
        Rajshahi=Rajshahi+"<option>Puthia</option>";
        Rajshahi=Rajshahi+"<option>Rajshahi-S</option>";
        Rajshahi=Rajshahi+"<option>Tanore</option>";
    

    var Rangamati="";
        Rangamati=Rangamati+"<option></option>";
        Rangamati=Rangamati+"<option>Baghaichari</option>";
        Rangamati=Rangamati+"<option>Barkal</option>";
        Rangamati=Rangamati+"<option>Belaichari</option>";
        Rangamati=Rangamati+"<option>Juraichari</option>";
        Rangamati=Rangamati+"<option>KaptaiRangamati</option>";
        Rangamati=Rangamati+"<option>Kaukhali</option>";
        Rangamati=Rangamati+"<option>Langadu</option>";
        Rangamati=Rangamati+"<option>Nanniarchar</option>";
        Rangamati=Rangamati+"<option>Rajosthali</option>";
        Rangamati=Rangamati+"<option>Rangamati-S</option>";
    

    var Rangpur="";
        Rangpur=Rangpur+"<option></option>";
        Rangpur=Rangpur+"<option>Badarganj</option>";
        Rangpur=Rangpur+"<option>Gangachara</option>";
        Rangpur=Rangpur+"<option>Kaunia</option>";
        Rangpur=Rangpur+"<option>Mithapukur</option>";
        Rangpur=Rangpur+"<option>Pirgacha</option>";
        Rangpur=Rangpur+"<option>Pirganj</option>";
        Rangpur=Rangpur+"<option>Rangpur-S</option>";
        Rangpur=Rangpur+"<option>Taraganj</option>";
    

    var Satkhira="";
        Satkhira=Satkhira+"<option></option>";
        Satkhira=Satkhira+"<option>Assasuni</option>";
        Satkhira=Satkhira+"<option>Debhata</option>";
        Satkhira=Satkhira+"<option>Kalaroa</option>";
        Satkhira=Satkhira+"<option>Kaliganj</option>";
        Satkhira=Satkhira+"<option>Satkhira-S</option>";
        Satkhira=Satkhira+"<option>Shyamnagar</option>";
        Satkhira=Satkhira+"<option>Tala</option>";
    

    var Shariatpur="";
        Shariatpur=Shariatpur+"<option></option>";
        Shariatpur=Shariatpur+"<option>Bhedarganj</option>";
        Shariatpur=Shariatpur+"<option>Damuddya</option>";
        Shariatpur=Shariatpur+"<option>Goshairhat</option>";
        Shariatpur=Shariatpur+"<option>Janjira</option>";
        Shariatpur=Shariatpur+"<option>Naria</option>";
        Shariatpur=Shariatpur+"<option>Shariatpur-S</option>";
    

    var Sherpur="";

        Sherpur=Sherpur+"<option></option>";
        Sherpur=Sherpur+"<option>Jhenaigati</option>";
        Sherpur=Sherpur+"<option>Nakla</option>";
        Sherpur=Sherpur+"<option>Nalitabari</option>";
        Sherpur=Sherpur+"<option>Sherpur-S</option>";
        Sherpur=Sherpur+"<option>Sreebordi</option>";
    

    var Sirajganj="";
        Sirajganj=Sirajganj+"<option></option>";
        Sirajganj=Sirajganj+"<option>Belkuchi</option>";
        Sirajganj=Sirajganj+"<option>Chowhali</option>";
        Sirajganj=Sirajganj+"<option>Kamarkhand</option>";
        Sirajganj=Sirajganj+"<option>Kazipur</option>";
        Sirajganj=Sirajganj+"<option>Raiganj</option>";
        Sirajganj=Sirajganj+"<option>Shahzadpur</option>";
        Sirajganj=Sirajganj+"<option>Sirajganj-S</option>";
        Sirajganj=Sirajganj+"<option>Tarash</option>";
        Sirajganj=Sirajganj+"<option>Ullapara</option>";
    

    var Sunamganj="";
        Sunamganj=Sunamganj+"<option></option>";
        Sunamganj=Sunamganj+"<option>Biswamvarpur</option>";
        Sunamganj=Sunamganj+"<option>Chatak</option>";
        Sunamganj=Sunamganj+"<option>Dakhin Sunamganj</option>";
        Sunamganj=Sunamganj+"<option>Derai</option>";
        Sunamganj=Sunamganj+"<option>Dharmapasha</option>";
        Sunamganj=Sunamganj+"<option>Doarabazar</option>";
        Sunamganj=Sunamganj+"<option>Jagannathpur</option>";
        Sunamganj=Sunamganj+"<option>Jamalganj</option>";
        Sunamganj=Sunamganj+"<option>Sulla</option>";
        Sunamganj=Sunamganj+"<option>Sunamganj-S</option>";
        Sunamganj=Sunamganj+"<option>Tahirpur</option>";
    

    var Sylhet="";
        Sylhet=Sylhet+"<option></option>";
        Sylhet=Sylhet+"<option>Balaganj</option>";
        Sylhet=Sylhet+"<option>Beanibazar</option>";
        Sylhet=Sylhet+"<option>Biswanath</option>";
        Sylhet=Sylhet+"<option>Companiganj</option>";
        Sylhet=Sylhet+"<option>Dakshin Surma</option>";
        Sylhet=Sylhet+"<option>Fenchuganj</option>";
        Sylhet=Sylhet+"<option>Golapganj</option>";
        Sylhet=Sylhet+"<option>Gowainghat</option>";
        Sylhet=Sylhet+"<option>Jointiapur</option>";
        Sylhet=Sylhet+"<option>Kanaighat</option>";
        Sylhet=Sylhet+"<option>Osmaninagar</option>";
        Sylhet=Sylhet+"<option>Sylhet-S</option>";
        Sylhet=Sylhet+"<option>Zakiganj</option>";
    

    var Tangail="";
        Tangail=Tangail+"<option></option>";
        Tangail=Tangail+"<option>Basail</option>";
        Tangail=Tangail+"<option>Bhuapur</option>";
        Tangail=Tangail+"<option>Delduar</option>";
        Tangail=Tangail+"<option>Dhanbari</option>";
        Tangail=Tangail+"<option>Ghatail</option>";
        Tangail=Tangail+"<option>Gopalpur</option>";
        Tangail=Tangail+"<option>Kalihati</option>";
        Tangail=Tangail+"<option>Madhupur</option>";
        Tangail=Tangail+"<option>Mirzapur</option>";
        Tangail=Tangail+"<option>Nagarpur</option>";
        Tangail=Tangail+"<option>Shakhipur</option>";
        Tangail=Tangail+"<option>Tangail-S</option>";
    

    var Thakurgaon="";
        Thakurgaon=Thakurgaon+"<option></option>";
        Thakurgaon=Thakurgaon+"<option>Baliadangi</option>";
        Thakurgaon=Thakurgaon+"<option>Haripur</option>";
        Thakurgaon=Thakurgaon+"<option>Pirganj</option>";
        Thakurgaon=Thakurgaon+"<option>Ranisankail</option>";
        Thakurgaon=Thakurgaon+"<option>Thakurgaon-S</option>";
    

function set_area() {
	if (document.getElementById("district").value=="Dhaka") {
		document.getElementById("area_set").innerHTML=Dhaka;	
	}
	else if (document.getElementById("district").value=="Faridpur") {
		document.getElementById("area_set").innerHTML=Faridpur;
	}


	else if (document.getElementById("district").value=="Bagerhat") {
		document.getElementById("area_set").innerHTML=Bagerhat;
	}
	else if (document.getElementById("district").value=="Bandarban") {
		document.getElementById("area_set").innerHTML=Bandarban;
	}
	else if (document.getElementById("district").value=="Barguna") {
		document.getElementById("area_set").innerHTML=Barguna;
	}
	else if (document.getElementById("district").value=="Barisal") {
		document.getElementById("area_set").innerHTML=Barisal;
	}
	else if (document.getElementById("district").value=="Bhola") {
		document.getElementById("area_set").innerHTML=Bhola;
	}
	else if (document.getElementById("district").value=="Bogra") {
		document.getElementById("area_set").innerHTML=Bogra;
	}
	else if (document.getElementById("district").value=="Brahmanbaria") {
		document.getElementById("area_set").innerHTML=Brahmanbaria;
	}
	else if (document.getElementById("district").value=="Chandpur") {
		document.getElementById("area_set").innerHTML=Chandpur;
	}
	else if (document.getElementById("district").value=="Faridpur") {
		document.getElementById("area_set").innerHTML=Faridpur;
	}
	else if (document.getElementById("district").value=="Chapainawabganj") {
		document.getElementById("area_set").innerHTML=Chapainawabganj;
	}
	else if (document.getElementById("district").value=="Chittagong") {
		document.getElementById("area_set").innerHTML=Chittagong;
	}
	else if (document.getElementById("district").value=="Chuadanga") {
		document.getElementById("area_set").innerHTML=Chuadanga;
	}
	else if (document.getElementById("district").value=="Comilla") {
		document.getElementById("area_set").innerHTML=Comilla;
	}
	else if (document.getElementById("district").value=="Coxs Bazar") {
		document.getElementById("area_set").innerHTML=CoxsBazar;
	}
	else if (document.getElementById("district").value=="Dinajpur") {
		document.getElementById("area_set").innerHTML=Dinajpur;
	}
	else if (document.getElementById("district").value=="Faridpur") {
		document.getElementById("area_set").innerHTML=Faridpur;
	}
	else if (document.getElementById("district").value=="Feni") {
		document.getElementById("area_set").innerHTML=Feni;
	}
	else if (document.getElementById("district").value=="Gaibandha") {
		document.getElementById("area_set").innerHTML=Gaibandha;
	}
	else if (document.getElementById("district").value=="Gazipur") {
		document.getElementById("area_set").innerHTML=Gazipur;
	}
	else if (document.getElementById("district").value=="Gopalganj") {
		document.getElementById("area_set").innerHTML=Gopalganj;
	}
	else if (document.getElementById("district").value=="Habiganj") {
		document.getElementById("area_set").innerHTML=Habiganj;
	}
	else if (document.getElementById("district").value=="Jamalpur") {
		document.getElementById("area_set").innerHTML=Jamalpur;
	}
	else if (document.getElementById("district").value=="Jessore") {
		document.getElementById("area_set").innerHTML=Jessore;
	}
	else if (document.getElementById("district").value=="Jhalokati") {
		document.getElementById("area_set").innerHTML=Jhalokati;
	}
	else if (document.getElementById("district").value=="Jhenaidah") {
		document.getElementById("area_set").innerHTML=Jhenaidah;
	}
	else if (document.getElementById("district").value=="Joypurhat") {
		document.getElementById("area_set").innerHTML=Joypurhat;
	}else if (document.getElementById("district").value=="Khagrachhari") {
		document.getElementById("area_set").innerHTML=Khagrachhari;
	}
	else if (document.getElementById("district").value=="Khulna") {
		document.getElementById("area_set").innerHTML=Khulna;
	}
	else if (document.getElementById("district").value=="Kishoreganj") {
		document.getElementById("area_set").innerHTML=Kishoreganj;
	}
	else if (document.getElementById("district").value=="Kurigram") {
		document.getElementById("area_set").innerHTML=Kurigram;
	}
	else if (document.getElementById("district").value=="Kushtia") {
		document.getElementById("area_set").innerHTML=Kushtia;
	}
	else if (document.getElementById("district").value=="Lakshmipur") {
		document.getElementById("area_set").innerHTML=Lakshmipur;
	}
	else if (document.getElementById("district").value=="Lalmonirhat") {
		document.getElementById("area_set").innerHTML=Lalmonirhat;
	}
	else if (document.getElementById("district").value=="Madaripur") {
		document.getElementById("area_set").innerHTML=Madaripur;
	}
	else if (document.getElementById("district").value=="Magura") {
		document.getElementById("area_set").innerHTML=Magura;
	}
	else if (document.getElementById("district").value=="Manikganj") {
		document.getElementById("area_set").innerHTML=Manikganj;
	}
	else if (document.getElementById("district").value=="Meherpur") {
		document.getElementById("area_set").innerHTML=Meherpur;
	}
	else if (document.getElementById("district").value=="Moulvibazar") {
		document.getElementById("area_set").innerHTML=Moulvibazar;
	}
	else if (document.getElementById("district").value=="Munshiganj") {
		document.getElementById("area_set").innerHTML=Munshiganj;
	}
	else if (document.getElementById("district").value=="Mymensingh") {
		document.getElementById("area_set").innerHTML=Mymensingh;
	}
	else if (document.getElementById("district").value=="Naogaon") {
		document.getElementById("area_set").innerHTML=Naogaon;
	}
	else if (document.getElementById("district").value=="Narail") {
		document.getElementById("area_set").innerHTML=Narail;
	}
	else if (document.getElementById("district").value=="Faridpur") {
		document.getElementById("area_set").innerHTML=Faridpur;
	}
	else if (document.getElementById("district").value=="Narayanganj") {
		document.getElementById("area_set").innerHTML=Narayanganj;
	}
	else if (document.getElementById("district").value=="Narsingdi") {
		document.getElementById("area_set").innerHTML=Narsingdi;
	}
	else if (document.getElementById("district").value=="Natore") {
		document.getElementById("area_set").innerHTML=Natore;
	}
	else if (document.getElementById("district").value=="Netrokona") {
		document.getElementById("area_set").innerHTML=Netrokona;
	}
	else if (document.getElementById("district").value=="Nilphamari") {
		document.getElementById("area_set").innerHTML=Nilphamari;
	}
	else if (document.getElementById("district").value=="Panchagarh") {
		document.getElementById("area_set").innerHTML=Panchagarh;
	}
	else if (document.getElementById("district").value=="Patuakhali") {
		document.getElementById("area_set").innerHTML=Patuakhali;
	}
	else if (document.getElementById("district").value=="Pirojpur") {
		document.getElementById("area_set").innerHTML=Pirojpur;
	}
	else if (document.getElementById("district").value=="Rajbari") {
		document.getElementById("area_set").innerHTML=Rajbari;
	}
	else if (document.getElementById("district").value=="Rajshahi") {
		document.getElementById("area_set").innerHTML=Rajshahi;
	}
	else if (document.getElementById("district").value=="Rangamati") {
		document.getElementById("area_set").innerHTML=Rangamati;
	}
	else if (document.getElementById("district").value=="Rangpur") {
		document.getElementById("area_set").innerHTML=Rangpur;
	}
	else if (document.getElementById("district").value=="Satkhira") {
		document.getElementById("area_set").innerHTML=Satkhira;
	}
	else if (document.getElementById("district").value=="Shariatpur") {
		document.getElementById("area_set").innerHTML=Shariatpur;
	}
	else if (document.getElementById("district").value=="Sherpur") {
		document.getElementById("area_set").innerHTML=Sherpur;
	}
	else if (document.getElementById("district").value=="Sirajganj") {
		document.getElementById("area_set").innerHTML=Sirajganj;
	}
	else if (document.getElementById("district").value=="Sunamganj") {
		document.getElementById("area_set").innerHTML=Sunamganj;
	}
	else if (document.getElementById("district").value=="Sylhet") {
		document.getElementById("area_set").innerHTML=Sylhet;
	}
	else if (document.getElementById("district").value=="Tangail") {
		document.getElementById("area_set").innerHTML=Tangail;
	}
	else if (document.getElementById("district").value=="Thakurgaon") {
		document.getElementById("area_set").innerHTML=Thakurgaon;
	}

	
	// body...
}