
var load_content='';	
	load_content=load_content+'<div class="form-horizontal">';
	load_content=load_content+'<div class="col-sm-offset-5 col-sm-10">';
	load_content=load_content+'<div  class="lds-roller"><div></div><div></div><div>';
	load_content=load_content+'</div><div></div><div></div><div></div><div></div><div></div></div></div></div>';

var a1, a2, a3, a4, a5, a6, a7, a8, a10;
var datas=[];
document.getElementById("loader").innerHTML=load_content;
        firebase.database().ref('statistics/A+').once('value').then(function(snapshot) {
          a1=snapshot.val();
          document.getElementById("A+").innerHTML=a1;
          datas[0]=a1;

    }); 
         firebase.database().ref('statistics/A-').once('value').then(function(snapshot) {
          a2=snapshot.val();
          document.getElementById("A-").innerHTML=a2;
          datas[1]=a2;
    }); 
          firebase.database().ref('statistics/B+').once('value').then(function(snapshot) {
          a3=snapshot.val();
          document.getElementById("B+").innerHTML= a3;
          datas[2]=a3;
    }); 
           firebase.database().ref('statistics/B-').once('value').then(function(snapshot) {
            a4=snapshot.val();
          document.getElementById("B-").innerHTML=a4;
          datas[3]=a4;
    }); 
            firebase.database().ref('statistics/O+').once('value').then(function(snapshot) {
              a5=snapshot.val();
          document.getElementById("O+").innerHTML=a5;
          datas[4]=a5;
    }); 
             firebase.database().ref('statistics/O-').once('value').then(function(snapshot) {
              a6=snapshot.val();
          document.getElementById("O-").innerHTML=a6;
          datas[5]=a6;
    }); 
     firebase.database().ref('statistics/AB+').once('value').then(function(snapshot) {
          a7=snapshot.val();
          document.getElementById("AB+").innerHTML=a7;
          datas[6]=a7;
    }); 
     firebase.database().ref('statistics/AB-').once('value').then(function(snapshot) {
          a8=snapshot.val();
          document.getElementById("AB-").innerHTML=a8;
          datas[7]=a8;
    }, function(error) {
    if (error) {
      //alert("not seccess")
    } else {
    // alert("seccess")
    }
  });         
  firebase.database().ref('statistics/count').once('value').then(function(snapshot) {
          a10=snapshot.val();
          document.getElementById("count").innerHTML="<b> Total Donors Available "+a10+"</b>";
          
    }, function(error) {
    if (error) {
      // The write failed...
    } else {
      //alert("seccess");
    }
  });
  
	setTimeout(function(){
		let myChart = document.getElementById('myChart').getContext('2d');
    
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#000000';

    let massPopChart = new Chart(myChart, {
      type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels:['A+','A-','B+','B-','O+','O-','AB+','AB-'],
        datasets:[{
          label:'Percentage',
          data:datas,
          //backgroundColor:'green',
          backgroundColor:[
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
          ],
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidth:3,
          hoverBorderColor:'#000'
        }]
      },
      options:{
      	 scales: {
        yAxes: [{
            ticks: {
                // max: 100,
                // min: 0,
                // stepSize: 10
            }
        }]
    },
        title:{
          display:true,
          text:'Blood group wise available donors',
          fontSize:25
        },
        legend:{
          display:true,
          position:'right',
          labels:{
            fontColor:'#000'
          }
        },
        layout:{
          padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }
      }
    });
        
document.getElementById("loader").innerHTML='';
    	}, 5000);

