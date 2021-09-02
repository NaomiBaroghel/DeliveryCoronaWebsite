import React, {Component} from 'react';
import { ReactBingmaps } from 'react-bingmaps';
import axios from 'axios';






class AddAddress extends Component {

  constructor(props) {
    super(props);

    this.state = {
      address:'',
      lat:0,
      lon:0,
      center:[31.783333, 35.216667],
      zoom:8,
      infoboxlist :""


      };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleChange(e) {
  this.setState({
    [e.target.name]: e.target.value
  })

this.searchfunc();

}

  async handleSubmit(event) {
    event.preventDefault();
    if(!this.state.address.includes(','))
    {
      alert("Please make sure to seperate the city with an ','")
      return;
    }
    this.searchfunc();
    document.getElementById("addaddressbtn").value="Adding the address..."

    const data = { Address:this.state.address,lat:this.state.lat,lon:this.state.lon}
    console.log("data");
    console.log(data);

    await fetch('/addAddress', { method: 'POST',
    headers:{ 'Content-Type': 'application/json' },
    body: JSON.stringify(data)

  })
  .then(function() {

    alert("The address was registrated with success");
    window.location.reload(true);

   })

    .catch(error => console.error('Error:', error));


   }

   async searchfunc(){
     var searchaddress= this.state.address;
     searchaddress=searchaddress.replaceAll(",","");
var url = 'https://us1.locationiq.com/v1/search.php?key=pk.7b5f5aad290078f85effb4d90cd1c984&q='+searchaddress.replaceAll(' ', '%20')+'&format=json'
   const response = await axios.get(url);
   console.log(response.data[0].lat, response.data[0].lon)
await this.setState({
  center:[parseFloat(response.data[0].lat), parseFloat(response.data[0].lon)],
  lat:parseFloat(response.data[0].lat),
  lon:parseFloat(response.data[0].lon),
  zoom:16,
  infoboxlist : [
             {
               "location":[parseFloat(response.data[0].lat), parseFloat(response.data[0].lon)],
               "addHandler":"mouseover", //on mouseover the pushpin, infobox shown
               "infoboxOption": { title: searchaddress, description: searchaddress },
               "pushPinOption":{  color:"red" },
             }

           ]

})


}





  render() {
    return (
  <div className='background'>
  <div className = 'wrapaddaddress fadeInDown'>

    <h3 className = "fadeIn" style={{marginBottom:"25px"}}>Add Address</h3>


    <form onSubmit={this.handleSubmit}  style={{height:"80%"}}>
    <p style={{fontSize:"14px",fontStyle:"italic"}}> Please make sur your address is correct by searching it on the map  </p>
    <p style={{fontSize:"14px",fontStyle:"italic"}}> Seperate the street and the city with an ',' </p>


<div style={{display:"flex",marginLeft: "120px"}}>
<input type="text" id="address" class="fadeIn inputaddaddress " name="address" placeholder="Search..." onChange={this.handleChange.bind(this)} required />
<p className="searchbtn" onClick={this.searchfunc.bind(this)}> Search </p>

    </div>
    <div className="wrapmap2">
    <ReactBingmaps
    bingmapKey = "TOdRmkW390gp17Kf6CJj~rckEG0baSMjfAKI50l7p8w~AmkUsdyKtsB_YUA1W-B9a3Hue5QSsBP6C0x3DADZ0PWV5Z-Hi4dvjgeXVOFab01y"
    id = "map"
    center = {this.state.center}
    zoom = {this.state.zoom}
    className = "mapclass"
    NavigationBar_Mode = {"compact"}
    infoboxesWithPushPins =  {this.state.infoboxlist}



    >

  </ReactBingmaps>
  </div>
  <div style={{height:"50px", width:"70%"}}>
            <div className="input-panel" id='inputPanel'></div>

  </div>
    <div>

    <input id="addaddressbtn" type="submit" style={{marginTop:"0px"}} className="fadeIn buttonattemployer " value="Add an address"/>
</div>
    </form>

   </div>
  </div>
);

}
}



export default AddAddress;


/*   pushPins = {
  [
    {
      "location":[31.783333, 35.216667],"option":{ title: 'Jerusalem', description: 'Hello you',color:"red" },  "addHandler": {"type" : "click", callback: this.callBackMethod }
    },

  ]
}*/
