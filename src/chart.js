import React, {Component} from 'react';


import {XYPlot, VerticalBarSeries,RadialChart,Hint,XAxis,YAxis} from 'react-vis';
import '../node_modules/react-vis/dist/style.css';






class Chart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      deliverylist:[],
      arealist:[],
      areachoosenlist:[],
      areachoosen:"",
      chosendelivery:[],
       databar:[{x:0,y:0}],
       barhint:[{x:0,y:0}],
        databardone:[],
        barhintdone:[],
      datapie:[],
      piehint:[],
      valuebar:false,
      valuebardone:false,
      valuepie:false

      };

  }



  async componentDidMount() {
    await fetch('/getdeliverylist', { method: 'GET',
    headers:{ 'Content-Type': 'application/json' },

     }).then(res => res.json())
     .then(result => {
       console.log("deliverylist");
       console.log(result.list_delivery);
     this.setState({
       deliverylist: result.list_delivery
     })
   })
    .catch(error => console.error('Error:', error));

    await fetch('/getcity', { method: 'GET',
    headers:{ 'Content-Type': 'application/json' },

     }).then(res => res.json())
     .then(result => {
       console.log("listcity");
       console.log(result.list_city);
     this.setState({
       arealist: result.list_city
     })
   })
    .catch(error => console.error('Error:', error));
}



 selectcity(e)
{

document.getElementById("day").checked=false
document.getElementById("month").checked=false
document.getElementById("year").checked=false
this.setState({
 databar:[{x:0,y:0}],
 barhint:[{x:0,y:0}],
 databardone:[],
 barhintdone:[],
 datapie:[],
 piehint:[]  },
()=>console.log(this.state.barhint));

var citychosen=[]
var selectvalue = document.getElementById("selectarea").selectedOptions;

for(var i = 0; i<selectvalue.length;i++)
{
  citychosen.push(selectvalue[i].value)
}
console.log(citychosen);

  var alldeliverychosen=[]
  var listdelivery=this.state.deliverylist;
  for(var x = 0; x<citychosen.length;x++)
  {
    var deliverychosen=[]
  for (var i = 0; i < listdelivery.length; i++) {

  var delivery = listdelivery[i];
    if( (typeof delivery.address)!= "string" && delivery.address!=null)
    {
      for (var j = 0; j < delivery.address.length; j++) {
         if(delivery.address[j].split(',')[1].toLowerCase().includes(citychosen[x].toLowerCase()))
         {
           deliverychosen.push(delivery);

         }
    }
  }
    else if(delivery.address!=null)
    {
       if(delivery.address.split(',')[1].toLowerCase().includes(citychosen[x].toLowerCase()))
    {
      deliverychosen.push(delivery);
    }
  }
  }
  console.log("deliverychosen");
  console.log(deliverychosen);
  alldeliverychosen.push(deliverychosen);
  console.log(alldeliverychosen);
}

  this.setState({
    areachoosen:citychosen,
    chosendelivery:alldeliverychosen
  });
}



 displaybar()
{
  console.log("indisplaybar");

  if(document.getElementById("selectarea").value=="City" ||(document.getElementById("day").checked==false&&document.getElementById("month").checked==false&&document.getElementById("year").checked==false))
  {
        return;
  }
    var mydata="";
    var mydatahint="";
    var deliverychosen = this.state.chosendelivery[0];

  if(document.getElementById("day").checked==true)
{
  var today = new Date();
var days=[];
for(var i = 0; i<7; i++)
{
    var myday = new Date(today.setDate(today.getDate()-1))
    if(myday.getMonth()+1<10)
    {
      days.push(myday.getFullYear()+"-0"+(myday.getMonth()+1)+"-"+myday.getDate())

    }
    else {
      days.push(myday.getFullYear()+"-"+(myday.getMonth()+1)+"-"+myday.getDate())

    }
}
var yaxe=[];

for (var i = 0; i < days.length; i++) {

var counter=0;
for (var j = 0; j < deliverychosen.length; j++) {
  if(days[i]==deliverychosen[j].date_delivery)
  {
    counter+=1;
  }

}
yaxe.push(counter);
}

    mydata = [
      {x: 0, y: yaxe[6]},
      {x: 1, y: yaxe[5]},
      {x: 2, y: yaxe[4]},
      {x: 3, y: yaxe[3]},
      {x: 4, y: yaxe[2]},
      {x: 5, y: yaxe[1]},
      {x: 6, y: yaxe[0]}
    ];

    mydatahint = [
      {x: days[6].split('-')[2]+'-'+days[6].split('-')[1], Delivery: {Deliveries:yaxe[0]}},
      {x: days[5].split('-')[2]+'-'+days[5].split('-')[1], Delivery: {Deliveries:yaxe[1]}},
      {x: days[4].split('-')[2]+'-'+days[4].split('-')[1], Delivery: {Deliveries:yaxe[2]}},
      {x: days[3].split('-')[2]+'-'+days[3].split('-')[1], Delivery: {Deliveries:yaxe[3]}},
      {x: days[2].split('-')[2]+'-'+days[2].split('-')[1], Delivery:{Deliveries: yaxe[4]}},
      {x: days[1].split('-')[2]+'-'+days[1].split('-')[1], Delivery: {Deliveries:yaxe[5]}},
      {x: days[0].split('-')[2]+'-'+days[0].split('-')[1], Delivery: {Deliveries:yaxe[6]}}
    ];
  //  console.log(mydatahint);

document.getElementById("charttitle").innerHTML="Deliveries made in the last 7 days";
}
else if(document.getElementById("month").checked==true)
{


var yaxe=[];
var today = new Date();

for (var i = 1; i < 13; i++) {
  var month="";
  if(i<10)
  {
    month="0"+i;
  }
  else {
    month=i.toString();
  }
var counter=0;
for (var j = 0; j < deliverychosen.length; j++) {

  if(month==deliverychosen[j].date_delivery.split('-')[1] && today.getFullYear()==deliverychosen[j].date_delivery.split('-')[0])
  {
    counter+=1;
  }

}
yaxe.push(counter);
}


mydata = [
  {x: 0, y: yaxe[0]},
  {x: 1, y: yaxe[1]},
  {x: 2, y: yaxe[2]},
  {x: 3, y: yaxe[3]},
  {x: 4, y: yaxe[4]},
  {x: 5, y: yaxe[5]},
  {x: 6, y: yaxe[6]},
  {x: 7, y: yaxe[7]},
  {x: 8, y: yaxe[8]},
  {x: 9, y: yaxe[9]},
  {x: 10, y: yaxe[10]},
  {x: 11, y: yaxe[11]}

];

  mydatahint = [
    {x: "Januray", Delivery: {Deliveries:yaxe[0]}},
    {x: "February", Delivery:{Deliveries :yaxe[1]}},
    {x: "March", Delivery:{Deliveries :yaxe[2]}},
    {x: "April", Delivery:{Deliveries :yaxe[3]}},
    {x: "May", Delivery: {Deliveries: yaxe[4]}},
    {x: "June", Delivery:{Deliveries: yaxe[5]}},
    {x: "July", Delivery:{Deliveries: yaxe[6]}},
    {x: "August", Delivery:{Deliveries: yaxe[7]}},
    {x: "September", Delivery:{Deliveries: yaxe[8]}},
    {x: "October", Delivery: {Deliveries:yaxe[9]}},
    {x: "November", Delivery:{Deliveries: yaxe[10]}},
    {x: "December", Delivery:{Deliveries: yaxe[11]}}
  ];
//  console.log(mydatahint);
document.getElementById("charttitle").innerHTML="Deliveries made in the last months";

}
else //year
{
  var yaxe=[];
  var today = new Date();
  var years=[];
  for(var i = 0; i<7; i++)
  {
    years.push(today.getFullYear()-i)

  }

  for (var i = 0; i < 7; i++) {
  var counter=0;
  for (var j = 0; j < deliverychosen.length; j++) {

    if( years[i]==deliverychosen[j].date_delivery.split('-')[0])
    {
      counter+=1;
    }

  }
  yaxe.push(counter);
  }


  mydata = [
    {x: 0, y: yaxe[6]},
    {x: 1, y: yaxe[5]},
    {x: 2, y: yaxe[4]},
    {x: 3, y: yaxe[3]},
    {x: 4, y: yaxe[2]},
    {x: 5, y: yaxe[1]},
    {x: 6, y: yaxe[0]}

  ];

    mydatahint = [
      {x: years[6], Delivery: {Deliveries:yaxe[6]}},
      {x: years[5], Delivery: {Deliveries:yaxe[5]}},
      {x: years[4], Delivery: {Deliveries:yaxe[4]}},
      {x: years[3], Delivery: {Deliveries:yaxe[3]}},
      {x: years[2], Delivery: {Deliveries:yaxe[2]}},
      {x: years[1], Delivery: {Deliveries:yaxe[1]}},
      {x: years[0], Delivery: {Deliveries:yaxe[0]}}

    ];

    document.getElementById("charttitle").innerHTML="Deliveries made in the last years";

  //  console.log(mydatahint);
}
console.log(mydatahint);

/*await this.setState(
{
  databar:mydata,
  barhint:mydatahint
}
)*/

//document.getElementById("xaxisbar").tickFormat(v => ` ${mydatahint[v].x}`);


 this.setState({
  databar:mydata,
  barhint:mydatahint },
()=>console.log(this.state.barhint));


//console.log(this.state.barhint);
//console.log(this.state.databar);
}


 displaybardone()
{
  console.log("indisplaybar");

  if(document.getElementById("selectarea").value=="City" ||(document.getElementById("day").checked==false&&document.getElementById("month").checked==false&&document.getElementById("year").checked==false))
  {
        return;
  }
    var mydata="";
    var mydatahint="";
    var deliverychosen = this.state.chosendelivery[0];

  if(document.getElementById("day").checked==true)
{
  var today = new Date();
var days=[];
for(var i = 0; i<7; i++)
{
    var myday = new Date(today.setDate(today.getDate()-1))
    if(myday.getMonth()+1<10)
    {
      days.push(myday.getFullYear()+"-0"+(myday.getMonth()+1)+"-"+myday.getDate())

    }
    else {
      days.push(myday.getFullYear()+"-"+(myday.getMonth()+1)+"-"+myday.getDate())

    }
}
var yaxe=[];

for (var i = 0; i < days.length; i++) {

var counter=0;
for (var j = 0; j < deliverychosen.length; j++) {
  if(days[i]==deliverychosen[j].date_delivery)
  {
    if(deliverychosen[j].done==1)
    {
    counter+=1;
  }
  }

}
yaxe.push(counter);
}

    mydata = [
      {x: 0, y: yaxe[6]},
      {x: 1, y: yaxe[5]},
      {x: 2, y: yaxe[4]},
      {x: 3, y: yaxe[3]},
      {x: 4, y: yaxe[2]},
      {x: 5, y: yaxe[1]},
      {x: 6, y: yaxe[0]}
    ];

    mydatahint = [
      {x: days[6].split('-')[2]+'-'+days[6].split('-')[1], Delivery: {Done_Deliveries:yaxe[0]}},
      {x: days[5].split('-')[2]+'-'+days[5].split('-')[1], Delivery: {Done_Deliveries:yaxe[1]}},
      {x: days[4].split('-')[2]+'-'+days[4].split('-')[1], Delivery: {Done_Deliveries:yaxe[2]}},
      {x: days[3].split('-')[2]+'-'+days[3].split('-')[1], Delivery: {Done_Deliveries:yaxe[3]}},
      {x: days[2].split('-')[2]+'-'+days[2].split('-')[1], Delivery:{Done_Deliveries: yaxe[4]}},
      {x: days[1].split('-')[2]+'-'+days[1].split('-')[1], Delivery: {Done_Deliveries:yaxe[5]}},
      {x: days[0].split('-')[2]+'-'+days[0].split('-')[1], Delivery: {Done_Deliveries:yaxe[6]}}
    ];
  //  console.log(mydatahint);

document.getElementById("charttitle").innerHTML="Deliveries made in the last 7 days";
}
else if(document.getElementById("month").checked==true)
{


var yaxe=[];
var today = new Date();

for (var i = 1; i < 13; i++) {
  var month="";
  if(i<10)
  {
    month="0"+i;
  }
  else {
    month=i.toString();
  }
var counter=0;
for (var j = 0; j < deliverychosen.length; j++) {

  if(month==deliverychosen[j].date_delivery.split('-')[1] && today.getFullYear()==deliverychosen[j].date_delivery.split('-')[0])
  {
    if(deliverychosen[j].done==1)
    {
    counter+=1;
    }
    }

}
yaxe.push(counter);
}


mydata = [
  {x: 0, y: yaxe[0]},
  {x: 1, y: yaxe[1]},
  {x: 2, y: yaxe[2]},
  {x: 3, y: yaxe[3]},
  {x: 4, y: yaxe[4]},
  {x: 5, y: yaxe[5]},
  {x: 6, y: yaxe[6]},
  {x: 7, y: yaxe[7]},
  {x: 8, y: yaxe[8]},
  {x: 9, y: yaxe[9]},
  {x: 10, y: yaxe[10]},
  {x: 11, y: yaxe[11]}

];

  mydatahint = [
    {x: "Januray", Delivery: {Done_Deliveries:yaxe[0]}},
    {x: "February", Delivery:{Done_Deliveries :yaxe[1]}},
    {x: "March", Delivery:{Done_Deliveries :yaxe[2]}},
    {x: "April", Delivery:{Done_Deliveries :yaxe[3]}},
    {x: "May", Delivery: {Done_Deliveries: yaxe[4]}},
    {x: "June", Delivery:{Done_Deliveries: yaxe[5]}},
    {x: "July", Delivery:{Done_Deliveries: yaxe[6]}},
    {x: "August", Delivery:{Done_Deliveries: yaxe[7]}},
    {x: "September", Delivery:{Done_Deliveries: yaxe[8]}},
    {x: "October", Delivery: {Done_Deliveries:yaxe[9]}},
    {x: "November", Delivery:{Done_Deliveries: yaxe[10]}},
    {x: "December", Delivery:{Done_Deliveries: yaxe[11]}}
  ];
//  console.log(mydatahint);
document.getElementById("charttitle").innerHTML="Deliveries made in the last months";

}
else //year
{
  var yaxe=[];
  var today = new Date();
  var years=[];
  for(var i = 0; i<7; i++)
  {
    years.push(today.getFullYear()-i)

  }

  for (var i = 0; i < 7; i++) {
  var counter=0;
  for (var j = 0; j < deliverychosen.length; j++) {

    if( years[i]==deliverychosen[j].date_delivery.split('-')[0])
    {
      if(deliverychosen[j].done==1)
      {
      counter+=1;
      }
        }

  }
  yaxe.push(counter);
  }


  mydata = [
    {x: 0, y: yaxe[6]},
    {x: 1, y: yaxe[5]},
    {x: 2, y: yaxe[4]},
    {x: 3, y: yaxe[3]},
    {x: 4, y: yaxe[2]},
    {x: 5, y: yaxe[1]},
    {x: 6, y: yaxe[0]}

  ];

    mydatahint = [
      {x: years[6], Delivery: {Done_Deliveries:yaxe[6]}},
      {x: years[5], Delivery: {Done_Deliveries:yaxe[5]}},
      {x: years[4], Delivery: {Done_Deliveries:yaxe[4]}},
      {x: years[3], Delivery: {Done_Deliveries:yaxe[3]}},
      {x: years[2], Delivery: {Done_Deliveries:yaxe[2]}},
      {x: years[1], Delivery: {Done_Deliveries:yaxe[1]}},
      {x: years[0], Delivery: {Done_Deliveries:yaxe[0]}}

    ];

    document.getElementById("charttitle").innerHTML="Deliveries made in the last years";

  //  console.log(mydatahint);
}
console.log(mydatahint);

/*await this.setState(
{
  databar:mydata,
  barhint:mydatahint
}
)*/

//document.getElementById("xaxisbar").tickFormat(v => ` ${mydatahint[v].x}`);


 this.setState({
  databardone:mydata,
  barhintdone:mydatahint },
()=>console.log(this.state.barhintdone));


//console.log(this.state.barhint);
//console.log(this.state.databar);
}

displaypie()
{
 console.log("indisplaypie");

 if( document.getElementById("selectarea").value=="City" ||(document.getElementById("day").checked==false&&document.getElementById("month").checked==false&&document.getElementById("year").checked==false))
 {
       return;
 }

   var mydata=[];
   var mydatahint=[];
   var deliverychosen = this.state.chosendelivery;

 if(document.getElementById("day").checked==true)
{
 var today = new Date();
   if(today.getMonth()+1<10)
   {
     today = today.getFullYear()+"-0"+(today.getMonth()+1)+"-"+today.getDate()

   }
   else {
     today= today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()

   }

//today="2021-08-26"

var dataexist = false;
for (var i = 0; i < deliverychosen.length; i++) {
  var onedeliverchosen= deliverychosen[i];

var counter=0;
for (var j = 0; j < onedeliverchosen.length; j++) {
 if(today==onedeliverchosen[j].date_delivery)
 {
   counter+=1;
   dataexist=true;
 }

}
mydata.push({angle:counter});
mydatahint.push({City:this.state.areachoosen[i],Delivery:counter})
}

if(dataexist)
{
document.getElementById("charttitle").innerHTML="Deliveries made in the last day";
}
else {
  document.getElementById("charttitle").innerHTML="Sorry, there is not enough data yet";

}


}
else if(document.getElementById("month").checked==true)
{


var yaxe=[];
var today = new Date();
var month=""

if(today.getMonth()+1<10)
{
  month = "0"+(today.getMonth()+1)

}
else {
  month= (today.getMonth()+1)

}

var dataexist = false;

for (var i = 0; i < deliverychosen.length; i++) {
  var onedeliverchosen= deliverychosen[i];

var counter=0;
for (var j = 0; j < onedeliverchosen.length; j++) {
 if(month==onedeliverchosen[j].date_delivery.split('-')[1] && today.getFullYear()==onedeliverchosen[j].date_delivery.split('-')[0])
 {
   counter+=1;
   dataexist=true;
 }

}
mydata.push({angle:counter});
mydatahint.push({City:this.state.areachoosen[i],Delivery:counter})
}


if(dataexist)
{
  document.getElementById("charttitle").innerHTML="Deliveries made in the last month";
}
else {
  document.getElementById("charttitle").innerHTML="Sorry, there is not enough data yet";

}
}
else //year
{
 var today = new Date();


 var dataexist = false;

 for (var i = 0; i < deliverychosen.length; i++) {
   var onedeliverchosen= deliverychosen[i];

 var counter=0;
 for (var j = 0; j < onedeliverchosen.length; j++) {

   if( today.getFullYear()==onedeliverchosen[j].date_delivery.split('-')[0])
   {
     counter+=1;
     dataexist=true;
   }

 }
 mydata.push({angle:counter});
 mydatahint.push({City:this.state.areachoosen[i],Delivery:counter})
}

if(dataexist)
{
  document.getElementById("charttitle").innerHTML="Deliveries made in the last year";
}
else {
  document.getElementById("charttitle").innerHTML="Sorry, there is not enough data yet";

}
}
console.log(mydatahint);


this.setState({
  databar:[],
  barhint:[],
 datapie:mydata,
 piehint:mydatahint },
()=>console.log(this.state.datapie));


}

checkdisplay(e)
{
  console.log(e.target.id)
var checkid = e.target.id;
  if(checkid=="day")
  {
    document.getElementById("month").checked=false;
     document.getElementById("year").checked=false;

  }
  if(checkid=="month")
  {
    document.getElementById("day").checked=false;
     document.getElementById("year").checked=false;

  }
  if(checkid=="year")
  {
    document.getElementById("month").checked=false;
     document.getElementById("day").checked=false;

  }

if(this.state.areachoosen.length>1)
{
  this.displaypie();

}
else {
  this.displaybar();
  this.displaybardone();

}
}


  render() {




    const arealist  = this.state.arealist;
    var data = this.state.data;

    var optionItems1 = arealist.map((cityname) =>
                          <option className="selectoptionchart"   key={cityname}> {cityname}</option>);




    return (
  <div className='background'>
  <div className = 'wrapchart fadeInDown'>

    <h3 className = "fadeIn" style={{marginBottom:"25px"}}>Chart</h3>

<div style={{display:"flex"}}>

    <div style={{display:"inline",width:"70%",marginLeft:"auto",marginRight:"auto",}}>

    <p id="charttitle"> </p>

      <XYPlot  height={300} width={700} style={{display:"inline",marginBottom:"0"}} >
       <XAxis   tickFormat={v => {if(v>0) {console.log(this.state.barhint[parseInt(v,10)].x);return this.state.barhint[parseInt(v,10)].x;}}} />
          <YAxis />
      <VerticalBarSeries   data={this.state.databar}
      onValueMouseOver={v => {
             this.setState({valuebar: this.state.barhint[v.x]});
          //   console.log(v);
           }}
          onSeriesMouseOut={v => this.setState({valuebar: false})}
          style={{ mark: { stroke: 'white' } }}
    />
    <VerticalBarSeries   data={this.state.databardone}
    onValueMouseOver={v => {
           this.setState({valuebardone: this.state.barhintdone[v.x]});
        //   console.log(v);
         }}
        onSeriesMouseOut={v => this.setState({valuebardone: false})}
        style={{ mark: { stroke: 'white' } }}
  />



                 {this.state.valuebar ? <Hint value={this.state.valuebar.Delivery}  style={{
                   position:'relative', marginLeft:"15%",marginTop:"-20%",
         value: {
           color: 'white'
         }
          }} /> : null}

          {this.state.valuebardone ? <Hint value={this.state.valuebardone.Delivery}  style={{
            position:'relative', marginLeft:"15%",marginTop:"-20%",
  value: {
    color: 'white'
  }
   }} /> : null}

    </XYPlot>


      <RadialChart height={300} width={500} data={this.state.datapie} style={{display:"inline"}}
      onValueMouseOver={v => {console.log(this.state.piehint[v.color]);
             this.setState({valuepie: this.state.piehint[(this.state.piehint.length-v.color-1)]});
            // console.log(v);
           }}
          onSeriesMouseOut={v => this.setState({valuepie: false})}
          style={{ mark: { stroke: 'black' } }}>

      {this.state.valuepie ? <Hint value={this.state.valuepie} style={{
        position:'relative', marginLeft:"15%",marginTop:"-20%",
    fontSize: 24,
    // text: {
    //   display: 'none'
    // },
    value: {
    color: 'white'
    }
    }} /> : null}
    </RadialChart>

    </div>

      <div style={{width:"30%",marginLeft:"55px"}} >
      <div>
        <input onClick={this.checkdisplay.bind(this)}  type="checkbox" id="day" name="day" />
        <label className="checkboxchart" for="day">Day</label>
      </div>
      <div>
      <input onClick={this.checkdisplay.bind(this)}  type="checkbox" id="month" name="month" />
      <label className="checkboxchart" for="month">Month</label>
    </div>
    <div>
      <input onClick={this.checkdisplay.bind(this)}   type="checkbox" id="year" name="year" />
      <label className="checkboxchart" for="year">Year</label>
    </div>





<select multiple="multiple" onChange={this.selectcity.bind(this)}    id="selectarea" className="selectchart"  >
<option default value="City" selected disabled hidden>City </option>

   {optionItems1}
</select>

</div>


</div>



  </div>
  </div>



);

}
}



export default Chart;
