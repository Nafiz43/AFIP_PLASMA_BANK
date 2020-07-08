    //ATTACHING LISTENERS TO THE DAYS BEFORE OPTIONS
    searchBySerialNoRadaioButtonFunction();
    addTableHeader("donorListTable",["REG","NAME","ADDRESS","BLOOD","CONTACT",
      "DOB","MAIL","MED HISTORY","NEG DATE","POS DATE","LAST DONATION","OPTION"]);



if (localStorage.getItem("value_role")== "Admin") {
}
else
{
  document.getElementById("user_list").style.visibility = "hidden";
}




//This is the constant for controlling table size
var tableRowLimit=10;


function printHelloWorld(){
  document.getElementById("firstHeader").innerHTML="Hello  World";
}




//Function used to enter a row of data from an array into a tablle
function printDataIntoTable(tableID,dataArray,color){
  
  table=document.getElementById(tableID);
  tableRowString="<tr "+"style=background-color:"+color+">";
  
  
  var keyData=dataArray[0];
  for(var i=0;i<dataArray.length;i++){
    //console.log("i="+i);
    tableRowString+="<td>"
    tableRowString+=dataArray[i]; 
      
    tableRowString+="</td>"

  }
  tableRowString+="<td>"
  tableRowString+="<button class='btn btn-secondary' onClick='storeDataArrayInLocalStorage("+keyData+")'>Details</button>";
  tableRowString+="</td>"
  tableRowString+="</tr>" 
  table.innerHTML=table.innerHTML+tableRowString
  //console.log(table.innerHTML);
}


//FUNCTION USED TO STORE THE REG NO OF THE USER IN LOCAL STORAGE WITH KEY="key"
function storeDataArrayInLocalStorage(key){
  localStorage.setItem('key', key);
  //window.location.href = "donorInfo.html";
  window.open('donorInfo.html', '_blank');
}


//THIS FUNCTION PRINTS THE TABLE HEADER FROM TEH PASSED ARRAY
function addTableHeader(tableID,dataArray){
  table=document.getElementById(tableID);
  tableRowString="<tr>";
  //console.log(tableRowString);
  //console.log("Data sent to me:"+dataArray+",length="+dataArray.length);
  for(var i=0;i<dataArray.length;i++){
    //console.log("i="+i);
    tableRowString+="<th>"
    tableRowString+=dataArray[i]; 
    tableRowString+="</th>"

  }
  tableRowString+="</tr>" 
  tableRowString+="</tr>" 

  table.innerHTML=table.innerHTML+tableRowString
}


//THIS FUNCTION CLEARS INCLUDING HEADER
function clearTableWithTableId(tableId){
  document.getElementById(tableId).innerHTML="";

}


//THIS FUNCTION CHECKS WHICH RADIO BUTTON IS CHECKED
//THEN IT CALLS THE SEARCH FUNCTION AS PER RADIO BUTTON
//IT ALSO CLEARS THE TABLE DATA ROWS
function searchButtonFunction(){
  
  //Getting reference to the radio buttons
  searchBySerialNoRadioButton=document.getElementById("searchBySerialNoRadioButton");
  searchByAreaAndDistrictRadioButton=document.getElementById("searchByDistrictAndAreaRadioButton");
  advancedSearchRadioButton=document.getElementById("advancedSearchRadioButton");
  //Reference obtained successfully

  //Checking which radio button has been selected
  

  if(searchByAreaAndDistrictRadioButton.checked){
    clearTableWithTableId("donorListTable");
    addTableHeader("donorListTable",["REG","NAME","ADDRESS","BLOOD","CONTACT",
      "DOB","MAIL","NEG DATE","POS DATE","LAST DONATION","OPTION"]);
    searchByDistrictAndArea();  
    
  }
  else if(searchBySerialNoRadioButton.checked){

    var regNo=document.getElementById("input1").value;
    console.log("Searching with:"+regNo)
    clearTableWithTableId("donorListTable");
    addTableHeader("donorListTable",["REG","NAME","ADDRESS","BLOOD","CONTACT",
      "DOB","MAIL","NEG DATE","POS DATE","LAST DONATION","OPTION"]);
    searchBySerialNumber(regNo);
    

  }
  else if(advancedSearchRadioButton.checked){
    clearTableWithTableId("donorListTable");
    addTableHeader("donorListTable",["REG","NAME","ADDRESS","BLOOD","CONTACT",
      "DOB","MAIL","NEG DATE","POS DATE","LAST DONATION","OPTION"]);
    advancedSearch();

  }

  
}

//FUNCTION USED FOR GETTING DATA BY SERIAL NO
function searchBySerialNumber(serialNo){
  console.log("You want to search using serial number");
  var rootReference=firebase.database().ref("donor/"+serialNo);
  
  var data=rootReference.once("value",function(snapshot){
    console.log("snapshot val:"+snapshot.val());
    if(snapshot.val()!=null){
      
      var regNo=serialNo;
      var name=snapshot.val().name;
      var address=snapshot.val().address;
      var bloodGroup=snapshot.val().blood_group;
      var contact=snapshot.val().contact;
      var dob=snapshot.val().dob;
      var mail=snapshot.val().mail;
      //var medHistory=snapshot.val().med_history;
      var negDate=snapshot.val().neg_date;
      var posDate=snapshot.val().pos_date;
      var lasDonation=snapshot.val().last_donation_date;  

      var rowDataArray=[regNo,name,address,bloodGroup,contact,dob,mail,
                negDate,posDate,lasDonation];
      

      
      //****************CODE TO INSERT THE TABLE COLORWISE********************//          
      var color;
      if(getDateWithSubtraction(28).localeCompare(negDate)==-1){
        color="#D0312D";
      }else{
        color="#3CB043";
      }         
      
      if(lasDonation==undefined){
        lasDonation="none";
        
      }
      else if(getDateWithSubtraction(90).localeCompare(lasDonation)==-1){
        color="#D0312D";
      }
      else{
        color="#3CB043";
      }

      var rowDataArray=[regNo,name,address,bloodGroup,contact,dob,mail,
                negDate,posDate,lasDonation];
      printDataIntoTable("donorListTable",rowDataArray,color);  
      //****************END OF CODE TO INSERT THE TABLE COLORWISE********************//

    }





  });

}
//FUNCTION USED TO SEARCH DATA BY DISTRICT (MAINLY)
function searchByDistrictAndArea(){
  console.log("You want to search using district and area");
  var districtName=document.getElementById("input9").value;
  var areaName=document.getElementById("input10").value;

  
  var minDaysAfterNegative=document.getElementById("input7").value.trim();
  var minDaysAfterDonation=document.getElementById("input8").value.trim();

  var thresholdNegativeDate=getDateWithSubtraction(minDaysAfterNegative);
  var thresholdDonationDate=getDateWithSubtraction(minDaysAfterDonation);

  var searchBlood=document.getElementById("input3").value.trim();

  //*********************MAKING SURE THAT THE USER IS GIVING CORRECT INPUT***************//
  if(districtName==""||minDaysAfterNegative==""||minDaysAfterDonation=="" ){
    document.getElementById("input7").value=0;
    document.getElementById("input8").value=0;
    alert("District and days cannot be empty");
    return;
  }

  if(parseInt(minDaysAfterNegative)<parseInt(minDaysAfterDonation) ){
    alert("Impossible days");
    document.getElementById("input7").value=0;
    document.getElementById("input8").value=0;
    return;
  }
  if(parseInt(minDaysAfterNegative)<0||parseInt(minDaysAfterDonation)<0){
    alert("Impossible days");
    document.getElementById("input7").value=0;
    document.getElementById("input8").value=0;
    return; 
  }
  //*********************MADE SURE THAT THE USER IS GIVING CORRECT INPUT***************//
  var rootReference=firebase.database().ref();
  var reference=rootReference.child("donor").orderByChild("district").equalTo(districtName);
  data=reference.once("value",function(snapshot){
    var count=0;
    snapshot.forEach(function(child) {
      //*******************CHECKING IF TABLE ROW LIMIT REACHED***************//
        
        console.log("DEBUG count="+count);
        if(count==tableRowLimit){
          return true;
        }
        //**************I AM COLLECTING ALL DATA*****************//
        var regNo=child.key;
      var name=child.val().name;
      var address=child.val().address;
      var district=child.val().district;
      var area=child.val().area;
      var bloodGroup=child.val().blood_group;
      var contact=child.val().contact;
      var dob=child.val().dob;
      var mail=child.val().mail;
      //var medHistory=child.val().med_history;
      var negDate=child.val().neg_date;
      var posDate=child.val().pos_date;
      var lastDonationDate=child.val().last_donation_date;  
      var lasDonation=lastDonationDate;
      //**************COLLECTED THE DATA*****************//

      //****************************CHECKING WITH AREA ,NEG DATA AND DONATE DATE********************//
      
      //************CHECKING WITH AREA*******************//
      if(areaName=="" || area==areaName){
        //all ok continue
      }else{
        return;
      }
      if(searchBlood=="" || searchBlood==bloodGroup){
        //all ok continue
      }else{
        return;
      }
      //**********CHECKING WITH DATE*******************//
      //console.log("Thresh dates:"+thresholdNegativeDate+","+thresholdDonationDate);
      if(thresholdNegativeDate.localeCompare(negDate)==+1 || thresholdNegativeDate.localeCompare(negDate)==0){
        //console.log(name+" is neg enough days");
      }else{
        //console.log(name+" is NOT neg enough days");
        return;
      }
      //console.log("lastDonationDate="+lastDonationDate);

      if(lastDonationDate==undefined){
        lastDonationDate="none";
        //console.log(name+" last donation enough days NEVER DONATED"); 
      }
      else if(thresholdDonationDate.localeCompare(lastDonationDate)==+1 || thresholdDonationDate.localeCompare(lastDonationDate)==0){
        //console.log(name+" last donation enough days");
      }else{
        //console.log(name+"  NOT lastDonation enough days");
        return;
      }
      //****************************DONE CHECKING WITH AREA ,NEG DATA AND DONATE DATE********************//
      //************************I AM ENTERING THE DATA INTO THE TABLE******************//
      //****************CODE TO INSERT THE TABLE COLORWISE********************//          
      var color;
      if(getDateWithSubtraction(28).localeCompare(negDate)==-1){
        color="#D0312D";
      }else{
        color="#3CB043";
      }         
      
      if(lasDonation==undefined){
        lasDonation="none";
        
      }
      else if(getDateWithSubtraction(90).localeCompare(lasDonation)==-1){
        color="#D0312D";
      }
      else{
        color="#3CB043";
      }

      var rowDataArray=[regNo,name,address,bloodGroup,contact,dob,mail,
                negDate,posDate,lasDonation];
      printDataIntoTable("donorListTable",rowDataArray,color);  
      count++;
      //****************END OF CODE TO INSERT THE TABLE COLORWISE********************//
      //************************ENTERED THE DATA INTO THE TABLE******************// 

      });


  });

}

//THIS IS PART 1 FUNCTION FOR ADVANCED SEARCH. IT DECIDES THE MAIN ATTRIBUTE FOR ADVANCED SEARCH
function advancedSearch(){
  console.log("You want to search with advacned options");
  //COLLECTING THE VALUES FROM THE INPUT
  var searchName=document.getElementById("input2").value.trim();
  var searchBlood=document.getElementById("input3").value.trim();
  var searchContact=document.getElementById("input4").value.trim();
  var searchAddress=document.getElementById("input5").value.trim();
  var searchEmail=document.getElementById("input6").value.trim();
  var searchCoronaNegDays=document.getElementById("input7").value.trim();
  var searchLastDonationDays=document.getElementById("input8").value.trim();
  //SUCCSSULLY COLLECTED THE VALUES FROM THE INPUT
  //CONFIRMING PROPER INPUT
  if(searchCoronaNegDays=="" ||parseInt(searchCoronaNegDays)<0){
    document.getElementById("input7").value=0;
    searchCoronaNegDays=0;
  }
  if(searchLastDonationDays==""||parseInt(searchLastDonationDays)<0){
    document.getElementById("input8").value=0;
    searchLastDonationDays=0;
  } 


  if(parseInt(searchCoronaNegDays)>=parseInt(searchLastDonationDays)){
    
    console.log("Days are ok"+searchCoronaNegDays+","+searchLastDonationDays);
  }else{
    console.log("Days are NOT ok");
    alert("Impossible Days");
    return;
  }

  //DONE CONFIRMING PROPER INPUT
  //SEARCHING BY USING THE MAIN SEARCH ELEMENT
  if(searchContact!=""){
    advancedSearchMainAttributeSearch("contact",searchContact,false);
  }else if(searchEmail!=""){
    advancedSearchMainAttributeSearch("mail",searchEmail,false);
  }else if(searchBlood!=""){
    advancedSearchMainAttributeSearch("blood_group",searchBlood,false);
  }else if(searchAddress!=""){
    advancedSearchMainAttributeSearch("address",searchAddress,false);
  }else if(searchName!=""){
    advancedSearchMainAttributeSearch("name",searchName,false);
  }else{
    advancedSearchMainAttributeSearch("neg_date",getDateWithSubtraction(searchCoronaNegDays),true);
  }


  //DONE SEARCHING BY USING THE MAIN SEARCH ELEMENT 

}

//THIS IS PART 2 FUNCTION FOR ADVANCED SEARCH. IT GETS DATA AS PER THE MAIN ATTRIBUTE SELECTED
function advancedSearchMainAttributeSearch(attributeName,attributeContent,isDate){
  console.log("You are going to search using :"+attributeContent);
  //console.log(isDate);
  
  
  var minDaysAfterNegative=document.getElementById("input7").value.trim();
  var minDaysAfterDonation=document.getElementById("input8").value.trim();

  var searchName=document.getElementById("input2").value.trim();
  var searchBlood=document.getElementById("input3").value.trim();
  var searchContact=document.getElementById("input4").value.trim();
  var searchAddress=document.getElementById("input5").value.trim();
  var searchEmail=document.getElementById("input6").value.trim();




  var thresholdNegativeDate=getDateWithSubtraction(minDaysAfterNegative);
  var thresholdDonationDate=getDateWithSubtraction(minDaysAfterDonation);

  


  var dataRef;
  if(isDate){
    dataRef=firebase.database().ref().child("donor").orderByChild(attributeName).endAt(attributeContent);
  }else{
    dataRef=firebase.database().ref().child("donor").orderByChild(attributeName).equalTo(attributeContent);
  }
  console.log(dataRef+"<-DATA REF");  

  data=dataRef.once("value",function(snapshot){
    var count=0;
    
    
    snapshot.forEach(function(child) {
        //*******************CHECKING IF TABLE ROW LIMIT REACHED***************//
        
        console.log("DEBUG count="+count);
        if(count==tableRowLimit){
          return true;
        }
      //**************I AM COLLECTING ALL DATA*****************//


        var regNo=child.key;
      var name=child.val().name;
      var address=child.val().address;
      var district=child.val().district;
      var area=child.val().area;
      var bloodGroup=child.val().blood_group;
      var contact=child.val().contact;
      var dob=child.val().dob;
      var mail=child.val().mail;
      //var medHistory=child.val().med_history;
      var negDate=child.val().neg_date;
      var posDate=child.val().pos_date;
      var lastDonationDate=child.val().last_donation_date;  
      var lasDonation=lastDonationDate; 
      //**************COLLECTED THE DATA*****************//

      //****************************CHECKING WITH AREA ,NEG DATA AND DONATE DATE********************//
      
      
      //**********CHECKING WITH DATE*******************//
      //**********CHECKING WITH DATE*******************//
      //console.log("Thresh dates:"+thresholdNegativeDate+","+thresholdDonationDate);
      if(thresholdNegativeDate.localeCompare(negDate)==+1 || thresholdNegativeDate.localeCompare(negDate)==0){
        //console.log(name+" is neg enough days");
      }else{
        //console.log(name+" is NOT neg enough days");
        return;
      }
      //console.log("lastDonationDate="+lastDonationDate);

      if(lastDonationDate==undefined){
        lastDonationDate="none";
        //console.log(name+" last donation enough days NEVER DONATED"); 
      }
      else if(thresholdDonationDate.localeCompare(lastDonationDate)==+1 || thresholdDonationDate.localeCompare(lastDonationDate)==0){
        //console.log(name+" last donation enough days");
      }else{
        //console.log(name+"  NOT lastDonation enough days");
        return;
      }
      //****************************DONE CHECKING WITH NEG DATA AND DONATE DATE********************//

      //******************************NOW CHECKING THE OTHER CRITERIAS****************************//
      var nameConditionMet=(name.includes(searchName)) || searchName=="";
      var bloodConditionMet=(bloodGroup===searchBlood) || searchBlood=="";
      var contactConditionMet=(contact.includes(searchContact))||searchContact=="";
      var addressConditionMet=(address.includes(searchAddress))||searchAddress=="";
      var emailConditionMet=(mail.includes(searchEmail))||searchEmail=="";
      console.log(nameConditionMet+bloodConditionMet+contactConditionMet+addressConditionMet+emailConditionMet+"");
      
      if(nameConditionMet && bloodConditionMet && contactConditionMet && addressConditionMet && emailConditionMet){
        //All conditions met so this data wont be stopped from entering table
      }else{
        //some condition has been violated . So this data can't enter
        return;
      }


      //******************************DONE CHECKING THE OTHER CRITERIAS****************************//


      //************************I AM ENTERING THE DATA INTO THE TABLE******************//
      //****************CODE TO INSERT THE TABLE COLORWISE********************//          
      var color;
      if(getDateWithSubtraction(28).localeCompare(negDate)==-1){
        color="#D0312D";
      }else{
        color="#3CB043";
      }         
      
      if(lasDonation==undefined){
        lasDonation="none";
        
      }
      else if(getDateWithSubtraction(90).localeCompare(lasDonation)==-1){
        color="#D0312D";
      }
      else{
        color="#3CB043";
      }

      var rowDataArray=[regNo,name,address,bloodGroup,contact,dob,mail,
                negDate,posDate,lasDonation];
      printDataIntoTable("donorListTable",rowDataArray,color);  
      count++;
      //****************END OF CODE TO INSERT THE TABLE COLORWISE********************//
      //************************ENTERED THE DATA INTO THE TABLE******************// 

      });


  }); 

}





//ONCLICK FUNCTIONS FOR RADIO BUTTONS TO MAKE SOME INPUT HTML ELEMENTS DISAPPEAR
function searchByDistrictAreaRadaioButtonFunction(){
  
  for(i =1;i<=10;i++){
    id="inputl"+i;
    if(i==7||i==8||i==9||i==10||i==3){
      
      document.getElementById(id).style.display="block";  
    }else{
      
      document.getElementById(id).style.display="none"; 
    }
    
  }
}

function searchBySerialNoRadaioButtonFunction(){
  for(i =1;i<=10;i++){
    id="inputl"+i;
    if(i==1){
      
      document.getElementById(id).style.display="block";  
    }else{
      
      document.getElementById(id).style.display="none"; 
    }
    
  }
  
}
function advancedSearchRadaioButtonFunction(){
  for(i =1;i<=10;i++){
    id="inputl"+i;
    if(i==1 || i==9 || i==10){
      
      document.getElementById(id).style.display="none"; 
    }else{
      
      document.getElementById(id).style.display="block";  
      
    }
    
  }
  
}


//CUSTOM UTILITY FUNCTION TO GET A THESHOLD DATE BY SUBTRACTING DAYS FROM THE PRESENT DATE
function getDateWithSubtraction(daysToSubtract){
  daysToSubtract=parseInt(daysToSubtract);
  var today = new Date();
  today.setDate( today.getDate() - daysToSubtract );
  
  
  var year=today.getFullYear();
  var month=today.getMonth()+1;
  if(month<10){
    month="0"+month;
  }
  var day=today.getDate();
  if(day<10){
    day="0"+day;
  }

  var date = year+"/"+month+"/"+day;
  //console.log("DATE DEBUG:"+date);
  return date;

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
  if (document.getElementById("input9").value=="Dhaka") {
    document.getElementById("input10").innerHTML=Dhaka; 
  }
  else if (document.getElementById("input9").value=="Faridpur") {
    document.getElementById("input10").innerHTML=Faridpur;
  }


  else if (document.getElementById("input9").value=="Bagerhat") {
    document.getElementById("input10").innerHTML=Bagerhat;
  }
  else if (document.getElementById("input9").value=="Bandarban") {
    document.getElementById("input10").innerHTML=Bandarban;
  }
  else if (document.getElementById("input9").value=="Barguna") {
    document.getElementById("input10").innerHTML=Barguna;
  }
  else if (document.getElementById("input9").value=="Barisal") {
    document.getElementById("input10").innerHTML=Barisal;
  }
  else if (document.getElementById("input9").value=="Bhola") {
    document.getElementById("input10").innerHTML=Bhola;
  }
  else if (document.getElementById("input9").value=="Bogra") {
    document.getElementById("input10").innerHTML=Bogra;
  }
  else if (document.getElementById("input9").value=="Brahmanbaria") {
    document.getElementById("input10").innerHTML=Brahmanbaria;
  }
  else if (document.getElementById("input9").value=="Chandpur") {
    document.getElementById("input10").innerHTML=Chandpur;
  }
  else if (document.getElementById("input9").value=="Faridpur") {
    document.getElementById("input10").innerHTML=Faridpur;
  }
  else if (document.getElementById("input9").value=="Chapainawabganj") {
    document.getElementById("input10").innerHTML=Chapainawabganj;
  }
  else if (document.getElementById("input9").value=="Chittagong") {
    document.getElementById("input10").innerHTML=Chittagong;
  }
  else if (document.getElementById("input9").value=="Chuadanga") {
    document.getElementById("input10").innerHTML=Chuadanga;
  }
  else if (document.getElementById("input9").value=="Comilla") {
    document.getElementById("input10").innerHTML=Comilla;
  }
  else if (document.getElementById("input9").value=="Coxs Bazar") {
    document.getElementById("input10").innerHTML=CoxsBazar;
  }
  else if (document.getElementById("input9").value=="Dinajpur") {
    document.getElementById("input10").innerHTML=Dinajpur;
  }
  else if (document.getElementById("input9").value=="Faridpur") {
    document.getElementById("input10").innerHTML=Faridpur;
  }
  else if (document.getElementById("input9").value=="Feni") {
    document.getElementById("input10").innerHTML=Feni;
  }
  else if (document.getElementById("input9").value=="Gaibandha") {
    document.getElementById("input10").innerHTML=Gaibandha;
  }
  else if (document.getElementById("input9").value=="Gazipur") {
    document.getElementById("input10").innerHTML=Gazipur;
  }
  else if (document.getElementById("input9").value=="Gopalganj") {
    document.getElementById("input10").innerHTML=Gopalganj;
  }
  else if (document.getElementById("input9").value=="Habiganj") {
    document.getElementById("input10").innerHTML=Habiganj;
  }
  else if (document.getElementById("input9").value=="Jamalpur") {
    document.getElementById("input10").innerHTML=Jamalpur;
  }
  else if (document.getElementById("input9").value=="Jessore") {
    document.getElementById("input10").innerHTML=Jessore;
  }
  else if (document.getElementById("input9").value=="Jhalokati") {
    document.getElementById("input10").innerHTML=Jhalokati;
  }
  else if (document.getElementById("input9").value=="Jhenaidah") {
    document.getElementById("input10").innerHTML=Jhenaidah;
  }
  else if (document.getElementById("input9").value=="Joypurhat") {
    document.getElementById("input10").innerHTML=Joypurhat;
  }else if (document.getElementById("input9").value=="Khagrachhari") {
    document.getElementById("input10").innerHTML=Khagrachhari;
  }
  else if (document.getElementById("input9").value=="Khulna") {
    document.getElementById("input10").innerHTML=Khulna;
  }
  else if (document.getElementById("input9").value=="Kishoreganj") {
    document.getElementById("input10").innerHTML=Kishoreganj;
  }
  else if (document.getElementById("input9").value=="Kurigram") {
    document.getElementById("input10").innerHTML=Kurigram;
  }
  else if (document.getElementById("input9").value=="Kushtia") {
    document.getElementById("input10").innerHTML=Kushtia;
  }
  else if (document.getElementById("input9").value=="Lakshmipur") {
    document.getElementById("input10").innerHTML=Lakshmipur;
  }
  else if (document.getElementById("input9").value=="Lalmonirhat") {
    document.getElementById("input10").innerHTML=Lalmonirhat;
  }
  else if (document.getElementById("input9").value=="Madaripur") {
    document.getElementById("input10").innerHTML=Madaripur;
  }
  else if (document.getElementById("input9").value=="Magura") {
    document.getElementById("input10").innerHTML=Magura;
  }
  else if (document.getElementById("input9").value=="Manikganj") {
    document.getElementById("input10").innerHTML=Manikganj;
  }
  else if (document.getElementById("input9").value=="Meherpur") {
    document.getElementById("input10").innerHTML=Meherpur;
  }
  else if (document.getElementById("input9").value=="Moulvibazar") {
    document.getElementById("input10").innerHTML=Moulvibazar;
  }
  else if (document.getElementById("input9").value=="Munshiganj") {
    document.getElementById("input10").innerHTML=Munshiganj;
  }
  else if (document.getElementById("input9").value=="Mymensingh") {
    document.getElementById("input10").innerHTML=Mymensingh;
  }
  else if (document.getElementById("input9").value=="Naogaon") {
    document.getElementById("input10").innerHTML=Naogaon;
  }
  else if (document.getElementById("input9").value=="Narail") {
    document.getElementById("input10").innerHTML=Narail;
  }
  else if (document.getElementById("input9").value=="Faridpur") {
    document.getElementById("input10").innerHTML=Faridpur;
  }
  else if (document.getElementById("input9").value=="Narayanganj") {
    document.getElementById("input10").innerHTML=Narayanganj;
  }
  else if (document.getElementById("input9").value=="Narsingdi") {
    document.getElementById("input10").innerHTML=Narsingdi;
  }
  else if (document.getElementById("input9").value=="Natore") {
    document.getElementById("input10").innerHTML=Natore;
  }
  else if (document.getElementById("input9").value=="Netrokona") {
    document.getElementById("input10").innerHTML=Netrokona;
  }
  else if (document.getElementById("input9").value=="Nilphamari") {
    document.getElementById("input10").innerHTML=Nilphamari;
  }
  else if (document.getElementById("input9").value=="Panchagarh") {
    document.getElementById("input10").innerHTML=Panchagarh;
  }
  else if (document.getElementById("input9").value=="Patuakhali") {
    document.getElementById("input10").innerHTML=Patuakhali;
  }
  else if (document.getElementById("input9").value=="Pirojpur") {
    document.getElementById("input10").innerHTML=Pirojpur;
  }
  else if (document.getElementById("input9").value=="Rajbari") {
    document.getElementById("input10").innerHTML=Rajbari;
  }
  else if (document.getElementById("input9").value=="Rajshahi") {
    document.getElementById("input10").innerHTML=Rajshahi;
  }
  else if (document.getElementById("input9").value=="Rangamati") {
    document.getElementById("input10").innerHTML=Rangamati;
  }
  else if (document.getElementById("input9").value=="Rangpur") {
    document.getElementById("input10").innerHTML=Rangpur;
  }
  else if (document.getElementById("input9").value=="Satkhira") {
    document.getElementById("input10").innerHTML=Satkhira;
  }
  else if (document.getElementById("input9").value=="Shariatpur") {
    document.getElementById("input10").innerHTML=Shariatpur;
  }
  else if (document.getElementById("input9").value=="Sherpur") {
    document.getElementById("input10").innerHTML=Sherpur;
  }
  else if (document.getElementById("input9").value=="Sirajganj") {
    document.getElementById("input10").innerHTML=Sirajganj;
  }
  else if (document.getElementById("input9").value=="Sunamganj") {
    document.getElementById("input10").innerHTML=Sunamganj;
  }
  else if (document.getElementById("input9").value=="Sylhet") {
    document.getElementById("input10").innerHTML=Sylhet;
  }
  else if (document.getElementById("input9").value=="Tangail") {
    document.getElementById("input10").innerHTML=Tangail;
  }
  else if (document.getElementById("input9").value=="Thakurgaon") {
    document.getElementById("input10").innerHTML=Thakurgaon;
  }
}


