


if (localStorage.getItem("value_role")== "Admin") {
}
else
{
  document.getElementById("user_list").style.visibility = "hidden";
}
//This is the constant for controlling table size
var tableRowLimit=10;


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
  tableRowString+="<button class='btn btn-primary' onClick='storeDataArrayInLocalStorage("+keyData+")'>Details</button>";
  tableRowString+="</td>"
  tableRowString+="</tr>" 
  table.innerHTML=table.innerHTML+tableRowString
  //console.log(table.innerHTML);
}


//FUNCTION USED TO STORE THE REG NO OF THE USER IN LOCAL STORAGE WITH KEY="key"
function storeDataArrayInLocalStorage(key){
  localStorage.setItem('key', key);
  window.location.href = "donorInfo.html";
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
      "DOB","MAIL","MED HISTORY","NEG DATE","POS DATE","LAST DONATION","OPTION"]);
    searchByDistrictAndArea();  
    
  }
  else if(searchBySerialNoRadioButton.checked){

    var regNo=document.getElementById("input1").value;
    console.log("Searching with:"+regNo)
    clearTableWithTableId("donorListTable");
    addTableHeader("donorListTable",["REG","NAME","ADDRESS","BLOOD","CONTACT",
      "DOB","MAIL","MED HISTORY","NEG DATE","POS DATE","LAST DONATION","OPTION"]);
    searchBySerialNumber(regNo);
    

  }
  else if(advancedSearchRadioButton.checked){
    clearTableWithTableId("donorListTable");
    addTableHeader("donorListTable",["REG","NAME","ADDRESS","BLOOD","CONTACT",
      "DOB","MAIL","MED HISTORY","NEG DATE","POS DATE","LAST DONATION","OPTION"]);
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
      var medHistory=snapshot.val().med_history;
      var negDate=snapshot.val().neg_date;
      var posDate=snapshot.val().pos_date;
      var lasDonation=snapshot.val().last_donation_date;  

      var rowDataArray=[regNo,name,address,bloodGroup,contact,dob,mail,
                medHistory,negDate,posDate,lasDonation];
      

      
      //****************CODE TO INSERT THE TABLE COLORWISE********************//          
      var color;
      if(getDateWithSubtraction(28).localeCompare(negDate)==-1){
        color="#D0312D";
      }else{
        color="#3CB043";
      }         
      
      if(lasDonation==undefined){
        lasDonation="#D0312D";
        
      }
      else if(getDateWithSubtraction(90).localeCompare(lasDonation)==-1){
        color="#D0312D";
      }
      else{
        color="#3CB043";
      }

      var rowDataArray=[regNo,name,address,bloodGroup,contact,dob,mail,
                medHistory,negDate,posDate,lasDonation];
      printDataIntoTable("donorListTable",rowDataArray,color);  
      //****************END OF CODE TO INSERT THE TABLE COLORWISE********************//

    }





  });

}
//FUNCTION USED TO SEARCH DATA BY DISTRICT (MAINLY)
function searchByDistrictAndArea(){
  console.log("You want to search using district and area");
  var districtName=document.getElementById("input9").value.trim();
  var areaName=document.getElementById("input10").value.trim();
  
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
      var medHistory=child.val().med_history;
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
        color="red";
      }else{
        color="green";
      }         
      
      if(lasDonation==undefined){
        lasDonation="none";
        
      }
      else if(getDateWithSubtraction(90).localeCompare(lasDonation)==-1){
        color="red";
      }
      else{
        color="green";
      }

      var rowDataArray=[regNo,name,address,bloodGroup,contact,dob,mail,
                medHistory,negDate,posDate,lasDonation];
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
      var medHistory=child.val().med_history;
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
        color="red";
      }else{
        color="green";
      }         
      
      if(lasDonation==undefined){
        lasDonation="none";
        
      }
      else if(getDateWithSubtraction(90).localeCompare(lasDonation)==-1){
        color="red";
      }
      else{
        color="green";
      }

      var rowDataArray=[regNo,name,address,bloodGroup,contact,dob,mail,
                medHistory,negDate,posDate,lasDonation];
      printDataIntoTable("donorListTable",rowDataArray,color);  
      count++;
      //****************END OF CODE TO INSERT THE TABLE COLORWISE********************//
      //************************ENTERED THE DATA INTO THE TABLE******************// 

      });


  }); 

}





//ONCLICK FUNCTIONS FOR RADIO BUTTONS TO MAKE SOME INPUT HTML ELEMENTS DISAPPEAR
function searchByDistrictAreaRadaioButtonFunction() {

  for(i =1;i<=10;i++){
    id="inputl"+i;
    if(i==7||i==8||i==9||i==10||i==3)
    {
      document.getElementById(id).style.display="block";  
    }
    else
    {
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




