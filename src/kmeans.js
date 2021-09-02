import React, {Component} from 'react';
import { ReactBingmaps } from 'react-bingmaps';
import axios from 'axios';
const kmeans = require('kmeans-engine');







class KMeans extends Component {

  constructor(props) {
    super(props);

    this.state = {
      addresslist:[],
      addresslatlon:[],
      userlist:[],
      kmeanslist:[],
      kmean_index:0,
      center:[31.783333, 35.216667],
      zoom:8,
      infoboxlist :[],
      deliverylist:[]


      };

  }





   async calculatekmeans(){

document.getElementById("calculatebtn").innerHTML="Calculating..."
     await fetch('/getaddresses', { method: 'POST',
     headers:{ 'Content-Type': 'application/json' },

      }).then(res => res.json())
      .then(result => {
        console.log(result.address_list);
      this.setState({
        isLoaded: true,
        addresslist: result.address_list
      })
      console.log(this.state.addresslist);
    })
     .catch(error => console.error('Error:', error));


var address_longlat=[]
     for (let i = 0; i < this.state.addresslist.length; i++) {
  var searchaddress=this.state.addresslist[i].address;
      address_longlat[i]={lat:this.state.addresslist[i].lat, lon:this.state.addresslist[i].lon};

}

this.setState({
  addresslatlon: address_longlat
})
console.log(address_longlat);
console.log(this.state.addresslatlon);

await fetch('/getemployee', { method: 'GET',
headers:{ 'Content-Type': 'application/json' },

 }).then(res => res.json())
 .then(result => {
   console.log(result.user_list);
 this.setState({
   userlist: result.user_list
 })
})
.catch(error => console.error('Error:', error));



kmeans.clusterize(this.state.addresslatlon, { k: this.state.userlist.length, maxIterations: 5, debug: true,distance:((x, y) => {
    'use strict';

    // haversine :: (Num, Num) -> (Num, Num) -> Num
    const haversine = ([lat1, lon1], [lat2, lon2]) => {
        // Math lib function names
        const [pi, asin, sin, cos, sqrt, pow, round] = [
            'PI', 'asin', 'sin', 'cos', 'sqrt', 'pow', 'round'
        ]
        .map(k => Math[k]),

            // degrees as radians
            [rlat1, rlat2, rlon1, rlon2] = [lat1, lat2, lon1, lon2]
            .map(x => x / 180 * pi),

            dLat = rlat2 - rlat1,
            dLon = rlon2 - rlon1,
            radius = 6372.8; // km

        // km
        return round(
            radius * 2 * asin(
                sqrt(
                    pow(sin(dLat / 2), 2) +
                    pow(sin(dLon / 2), 2) *
                    cos(rlat1) * cos(rlat2)
                )
            ) * 100
        ) / 100;
    };

    // TEST
    return haversine(x, y);

    // --> 2887.26

})([36.12, -86.67], [33.94, -118.40])
 }, (err, res) => {
  console.log('----- Results -----');
  console.log(`Iterations: ${res.iterations}`);
  console.log('Clusters: ');
  console.log(res.clusters);
  var clusters = res.clusters;
  for (let i = 0; i < res.clusters.length; i++) {
    if(res.clusters[i].vectorIds.length==0)
    clusters.splice(i,i+1);
}
console.log("newclusters");
console.log(clusters);
  var lat = res.clusters[0].centroid.lat
  var lon = res.clusters[0].centroid.lon

var listinfobox=[]
  for (let i = 0; i < res.clusters[0].vectorIds.length; i++) {

var myaddress = this.state.addresslist[res.clusters[0].vectorIds[i]]
var mylonlat = this.state.addresslatlon[res.clusters[0].vectorIds[i]]
var newinfo = {
  "location":[mylonlat.lat, mylonlat.lon],
  "addHandler":"mouseover", //on mouseover the pushpin, infobox shown
  "infoboxOption": { title: myaddress.address, description:myaddress.address },
  "pushPinOption":{  color:"red" },
}
listinfobox.push(newinfo);
  }

  this.setState({
    center:[lat, lon],
    zoom:12,
    infoboxlist : listinfobox,
    kmeanslist:res.clusters,
    kmean_index:0

  })

  if(this.state.kmeanslist.length>1)
  {
  document.getElementById('nextbtn').disabled=false;
  }

});



document.getElementById("calculatebtn").innerHTML="Calculate KMeans";
document.getElementById("areaid").innerHTML=1;
document.getElementById("areaid2").innerHTML=1;



}

nextfunc()
{
console.log("enter to next");

if(this.state.kmeanslist.length==0)
{
  alert("Please calculate KMeans before using the next button")
  return;
}

if(document.getElementById("selectemployee").value=="Delivery Man")
{
  alert("Please choose a delivery man for this area")
  return;
}

this.createnewdelivery();


//go to next cluster
var newindex = this.state.kmean_index+1;
console.log(newindex);
var lat = this.state.kmeanslist[newindex].centroid.lat;
var lon = this.state.kmeanslist[newindex].centroid.lon;
  var listinfobox=[]
    for (let i = 0; i < this.state.kmeanslist[newindex].vectorIds.length; i++) {

  var myaddress = this.state.addresslist[this.state.kmeanslist[newindex].vectorIds[i]]
  var mylonlat = this.state.addresslatlon[this.state.kmeanslist[newindex].vectorIds[i]]
  var newinfo = {
    "location":[mylonlat.lat, mylonlat.lon],
    "addHandler":"mouseover", //on mouseover the pushpin, infobox shown
    "infoboxOption": { title: myaddress.address, description:myaddress.address },
    "pushPinOption":{  color:"red" },
  }
  listinfobox.push(newinfo);
  console.log(listinfobox);
    }


    this.setState({
      center:[lat, lon],
      zoom:12,
      infoboxlist : listinfobox,
      kmean_index:newindex

    })

    document.getElementById("areaid").innerHTML=newindex+1;
    document.getElementById("areaid2").innerHTML=newindex+1;
    document.getElementById("selectemployee").value="Delivery Man";
  if(newindex==(this.state.kmeanslist.length-1))
  {
    document.getElementById('nextbtn').style.display="none";
    document.getElementById('sendbtn').style.display="block";

  }
  /*if(newindex>=1)
  {
    document.getElementById('prevbtn').disabled=false;
  }*/

}

createnewdelivery()
{
  console.log(document.getElementById("selectemployee").value);
  var myemployee=document.getElementById("selectemployee").value;
  var index=this.state.kmean_index;
  var listaddress=[];
  console.log(this.state.kmeanslist);
  console.log(this.state.kmeanslist[index]);
    for (let i = 0; i < this.state.kmeanslist[index].vectorIds.length; i++)
    {

            var myaddress = this.state.addresslist[this.state.kmeanslist[index].vectorIds[i]];
            listaddress.push(myaddress.address);

    }



var today = new Date();
var date="";
if(today.getMonth()+1>=10)
{
 date = today.getFullYear() + '-'+(today.getMonth()+1)+'-'+today.getDate() ;
}
else {
date = today.getFullYear() + '-0'+(today.getMonth()+1)+'-'+today.getDate() ;
}

    var newdelivery= {Address:listaddress,user_id:parseInt(myemployee.split("#")[1],10),name_deliver:myemployee.split("#")[0],statusfood:true,statusmedecine:true,statusmonthly:false,date_delivery:date}
var newdeliverylist= this.state.deliverylist;
newdeliverylist.push(newdelivery)

//do not display the employee selected anymore
    for (let i = 0; i < document.getElementById("selectemployee").options.length; i++)
{
  if(document.getElementById("selectemployee").options[i].value==document.getElementById("selectemployee").value)
  {
    document.getElementById("selectemployee").options[i].hidden="true";
    return;
  }

  this.setState({
    deliverylist:newdeliverylist
  })

console.log("newdeliverylist");
console.log(this.state.deliverylist);
}


}
async sendfunc()
{

  if(document.getElementById("selectemployee").value=="Delivery Man")
  {
    alert("Please choose a delivery man for this area")
    return;
  }

this.createnewdelivery();

  const data = { listdelivery:this.state.deliverylist}
  console.log("data");
  console.log(data);

  await fetch('/adddeliverykmeans', { method: 'POST',
  headers:{ 'Content-Type': 'application/json' },
  body: JSON.stringify(data)

})
.then(function() {

  alert("The deliveries have been created");
  document.location.href="/deliverylist";

 })

  .catch(error => console.error('Error:', error));
}


prevfunc()
{
  console.log("enter to prev");
  var newindex = this.state.kmean_index-1;
  console.log(newindex);
  var lat = this.state.kmeanslist[newindex].centroid.lat;
  var lon = this.state.kmeanslist[newindex].centroid.lon;
  var listinfobox=[]
    for (let i = 0; i < this.state.kmeanslist[newindex].vectorIds.length; i++) {

  var myaddress = this.state.addresslist[this.state.kmeanslist[newindex].vectorIds[i]];
  var mylonlat = this.state.addresslatlon[this.state.kmeanslist[newindex].vectorIds[i]];
  var newinfo = {
    "location":[mylonlat.lat, mylonlat.lon],
    "addHandler":"mouseover", //on mouseover the pushpin, infobox shown
    "infoboxOption": { title: myaddress.address, description:myaddress.address },
    "pushPinOption":{  color:"red" },
  }
  listinfobox.push(newinfo);
  console.log(listinfobox);
    }

    this.setState({
      center:[lat, lon],
      zoom:26,
      infoboxlist : listinfobox,
      kmean_index:newindex

    })

  if(newindex==0)
  {
    document.getElementById('prevbtn').disabled=true;
  }
  if(this.state.kmeanslist.length>1)
  {
  document.getElementById('nextbtn').disabled=false;
  }

}





  render() {
    const userlist  = this.state.userlist;

    let optionItems1 = userlist.map((user) =>
                          <option  key={user.first_name +user.last_name +user.user_id}> {user.first_name +" " +user.last_name+" "+"#"+user.user_id}</option>
                      );
    return (
  <div className='background'>
  <div className = 'wrapkmeans fadeInDown'>

    <h3 className = "fadeIn" style={{marginBottom:"25px"}}>KMeans</h3>



<p id="calculatebtn" className="buttonattemployer" onClick={this.calculatekmeans.bind(this)} style={{marginLeft:"0px",marginTop:"5px",marginBottom:"5px"}} > Calculate KMeans </p>


    <div className="contentkmeans">
    <div style={{height:"100%",width:"50%"}}>
    <p style={{marginLeft:"200px"}}>Map for area #<span id="areaid2"></span> : </p>
<br/>
    <div className="wrapmap">
    <ReactBingmaps
    bingmapKey = "TOdRmkW390gp17Kf6CJj~rckEG0baSMjfAKI50l7p8w~AmkUsdyKtsB_YUA1W-B9a3Hue5QSsBP6C0x3DADZ0PWV5Z-Hi4dvjgeXVOFab01y"
    id = "map"
    center = {this.state.center}
    zoom = {this.state.zoom}
    className = "mapclass"
    NavigationBar_Mode = {"compact"}
    infoboxesWithPushPins =  {this.state.infoboxlist}
             className = "mapclass"
    >
  </ReactBingmaps>
  </div>
  </div>

  <div className="contentkmeans2">

  <p>Choose the delivery man for this area #<span id="areaid"></span> : </p>

  <div >

          <select    id="selectemployee" style={{marginLeft:"auto",marginRight:"auto",width:"100%",height:"45px"}} >
          <option default value="Delivery Man" selected disabled hidden>Delivery Man </option>

             {optionItems1}
          </select>

    </div>

  <input onClick={this.nextfunc.bind(this)}  id="nextbtn" type="submit" style={{marginTop:"65px",marginBottom:"0px"}} className="fadeIn buttonattemployer " value="Next"/>
  <input onClick={this.sendfunc.bind(this)}  id="sendbtn" type="submit" style={{marginTop:"65px",marginBottom:"0px",display:"none"}} className="fadeIn buttonattemployer " value="Send"/>

  </div>

</div>


</div>
  </div>
);

}
}



export default KMeans;

/*<button id="prevbtn" onClick={this.prevfunc.bind(this)}  >Prev. </button>
<button id="nextbtn" onClick={this.nextfunc.bind(this)} > Next </button>*/
