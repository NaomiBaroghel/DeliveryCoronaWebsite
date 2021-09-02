import React, {Component} from 'react';
import ReactDOM from "react-dom";
import Calendar from 'react-calendar';
import './calendar.css';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

import { GiFoodTruck } from 'react-icons/gi';
import { AiFillMedicineBox } from 'react-icons/ai';
import { FaCalendarCheck } from 'react-icons/fa';

//import avec calendar
class AddDelivery extends React.Component {

      constructor(props) {
        super(props);
        this.state = {value:"Addresses",
          addresslist:[],
          userlist: [],
          listaddress:[],
          isLoaded: false,
          firstname:'',
          //address:null,
          user_id:null,
          statusfood:false,
          statusmedicine:false,
          statusmonthly:false,
          date:''


        };
        // this.handleChange = this.handleChange.bind(this);
    //    this.handleSubmit = this.handleSubmit.bind(this);
     this.handleChange = this.handleChange.bind(this);
     this._handleChange = this._handleChange.bind(this);

     this._handleChange2 = this._handleChange2.bind(this);


     this.onChange = this.onChange.bind(this);
          this.handleChange3 = this.handleChange3.bind(this);

            this.handleChange4 = this.handleChange4.bind(this);
 this.handleSubmit = this.handleSubmit.bind(this);
      }


            handleChange = event => {
              this.setState({ value: event.target.value });
            };


            _handleChange = event => {

              console.log(this.state.listaddress);
              var citychosen=[]
              var selectvalue = document.getElementById("selectaddress").selectedOptions;

              for(var i = 0; i<selectvalue.length;i++)
              {
                citychosen.push(selectvalue[i].value)
              }
              console.log(citychosen);

              this.setState({ listaddress: citychosen },
              ()=>console.log(this.state.listaddress));


            };

       onChange = date => {
        console.log(this.state.date);

      var dateString = this.state.date;
       var dateObj = new Date(dateString);
      var momentObj = moment(dateObj);
      var momentString = momentObj.format('YYYY-MM-DD');
      console.log(momentString);
      this.setState({ date },()=>console.log(this.state.date));}


      handleChange = event => {
        this.setState({ value: event.target.value });
      };
      async componentDidMount() {


        await fetch('/getaddresses', { method: 'POST',
        headers:{ 'Content-Type': 'application/json' },

         }).then(res => res.json())
         .then(result => {
           console.log(result.address_list);
         this.setState({
           isLoaded: true,
           addresslist: result.address_list
         })
       })
        .catch(error => console.error('Error:', error));

        await fetch('/getemployee', { method: 'GET',
        headers:{ 'Content-Type': 'application/json' },

         }).then(res => res.json())
         .then(result => {
           console.log(result.user_list);
         this.setState({
           isLoaded: true,
           userlist: result.user_list
         })
       })
        .catch(error => console.error('Error:', error));

    }



          _handleChange1 = event => {

            console.log(this.state.user_id);
            this.setState({ user_id: event.target.value },
            ()=>console.log(this.state.user_id));
          //  var userid=this.state.user_id;
            //var id=userid.split(":");

          };

          handleChange3= event => {
                      this.setState({ statusmedicine: event.target.checked },
                      ()=>console.log(this.state.statusmedicine),
                                    console.log("statusmedicine"));};

          _handleChange2= event => {


            this.setState({ statusfood: event.target.checked },
            ()=>console.log(this.state.statusfood),
              console.log("statusfood"));};


                        handleChange4= event => {
                                    this.setState({ statusmonthly: event.target.checked },
                                    ()=>console.log(this.state.statusmonthly),
                                                  console.log("statusmonthly"));};


          async handleSubmit(event) {
            event.preventDefault();
var dataId=this.state.user_id.split(":");
var queid=dataId[1];
var idenint=parseInt(queid, 10);
console.log(dataId);
console.log(idenint);
var datedata=this.state.date;
console.log("datedata");
console.log(datedata);
var dateString = this.state.date;
 var dateObj = new Date(dateString);
var momentObj = moment(dateObj);
var momentString = momentObj.format('YYYY-MM-DD');
console.log(momentString);

//this.state.date=momentString;
console.log("date apres momentstring");
console.log(  this.state.date);
            const data = { Addresslist:this.state.listaddress,user_id:idenint,statusfood:this.state.statusfood,statusmedicine:this.state.statusmedicine,statusmonthly:this.state.statusmonthly,Date:momentString};
            console.log("data");
            console.log(data);

            await fetch('/adddelivery', { method: 'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(data)

          })
          .then(function() {

            alert("The delivery was created");
            window.location.reload(true);

           })

            .catch(error => console.error('Error:', error));


           }


 //la value default du select ne se met pas
  render() {
      const userlist  = this.state.userlist;
      const addresslist  = this.state.addresslist;
      let optionItems = addresslist.map((address) =>
                   <option class="selectoptionchart" key={address.address}>{address.address}</option>
               );
      let optionItems1 = userlist.map((user) =>
                            <option  key={user.first_name +user.last_name +user.user_id}>{user.first_name +" " +user.last_name+" "+"id:"+user.user_id}</option>
                        );

    return (
      <div className='background'>
      <div className = 'wrapadddelivery fadeInDown'>
      <form onSubmit={this.handleSubmit}>


      <h3 className = "fadeIn" style={{marginBottom:"5%",marginLeft:"40%"}}>Add a delivery</h3>

<div class="containeradddelivery" style={{display:"flex",marginLeft:"5%"}}>
<div style={{width:"50%"}}>
    <div>
        <select multiple="multiple"   onChange={(e) => {this._handleChange(e)}}   className="selectadddelivery"  value={this.state.address} id="selectaddress">
           {optionItems}
        </select>
        </div>
<div>

        <select  onChange={(e) => {this._handleChange1(e)}} className="selectadddelivery" style={{marginLeft:"auto",marginRight:"auto",width:"70%",height:"45px",fontSize:"15px"}} value={this.state.user_id} id="selectfirstnamedeliver">
        <option default value="Choose a deliver" selected disabled hidden>Choose a deliver </option>

           {optionItems1}
        </select>

  </div>

  <div className="topping" style={{marginTop:"15px"}}>
    <input style={{marginRight:"5px"}} type="checkbox" checked={this.state.statusfood} onChange={this._handleChange2} id="topping" name="topping"
    value="Food" />
    Food <GiFoodTruck/>
  </div>
  <div className="topping" style={{marginTop:"15px"}}>
    <input  style={{marginRight:"5px"}} type="checkbox" id="topping" checked={this.state.statusmedicine} onChange={this.handleChange3} name="topping"
    value="Medicines" />
    Medicines <AiFillMedicineBox/>
  </div>
  <div className="topping" style={{marginTop:"15px"}}>
    <input  style={{marginRight:"5px"}} type="checkbox" id="topping" checked={this.state.statusmonthly} onChange={this.handleChange4} name="topping"
    value="Medicines" />
    Monthly <FaCalendarCheck/>
  </div>
</div>

    <div >
    <div>
          <Calendar className="calendar" style={{marginLeft:"auto",marginRight:"auto",width:"100%",height:"45px"}}
            onChange={this.onChange}
            value={this.state.date}
          />
        </div>
        </div>
        </div>

        <div>
        <input type="submit" style={{marginBottom:"15px",marginLeft:"35%"}} className="fadeIn buttonattemployer " value="Add a delivery"/>
    </div>


      </form>
      </div>
      </div>

    );
  }
}



export default AddDelivery;
