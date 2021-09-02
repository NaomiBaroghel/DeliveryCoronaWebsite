import React, {Component} from 'react';
import {BsTrashFill} from 'react-icons/bs';
import {FaPencilAlt} from 'react-icons/fa';
import {FaCheck} from 'react-icons/fa';
class Deliverylist extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        deliverylist: [],
        isLoaded: false,
      };
    }

    async componentDidMount() {
      await fetch('/getdeliverylist', { method: 'GET',
      headers:{ 'Content-Type': 'application/json' },

       }).then(res => res.json())
       .then(result => {
         console.log("listdelivery");
         console.log(result.list_delivery);
       this.setState({
         isLoaded: true,
         deliverylist: result.list_delivery
       })
     })
      .catch(error => console.error('Error:', error));

  }

  async donefunc()
       {


         await fetch('/donedeliveriesemployer', { method: 'POST',
         headers:{ 'Content-Type': 'application/json' },

       }).then(res => res.json())
       .then(result => {
         console.log("listdeliverydeliverdone");
         console.log(result.deliverydeliveremployerdone_list);
       this.setState({
         isLoaded: true,
         deliverylist: result.deliverydeliveremployerdone_list
       })


                    document.getElementById("completediv").style.display="block";
                    document.getElementById("donediv").style.display="block";
       })

      .catch(error => console.error('Error:', error));

   }


  render() {
      const deliverylist  = this.state.deliverylist;

      if (!this.state.isLoaded) {
        return (
          <div className='background' >
          <div className = 'wrapemployeelist fadeInDown' >
            <h3 className = "fadeIn" style={{marginBottom:"15px"}}>Delivery List</h3>
            <div>Loading ... </div>
           </div>
          </div>
        )
      } else {
        return (
          <div className='background'>

          <div className = 'wrapemployeelist fadeInDown' style={{marginTop:"15%"}} >

            <h3 className = "fadeIn" style={{marginBottom:"25px"}}>Delivery List</h3>
            <div style={{display:"flex",marginLeft:"0px"}}>
            <input type="submit" onClick={() => this.componentDidMount()} style={{marginBottom:"15px",marginLeft:"0px"}} className="fadeIn buttonattemployer " value="All"/>

              <input type="submit" onClick={() => this.donefunc()} style={{marginBottom:"15px",marginLeft:"0px"}} className="fadeIn buttonattemployer " value="Complete deliveries"/>
          </div>

          <div style={{overflowX:"auto",overflowY:"auto",height:"500px"}}>

            <div class="table">

              <div class="row headerblack ">
              <div class="cell">
              Deliver's name
              </div>
              <div class="cell" >
              Date
              </div>
              <div class="cell">
                Id
              </div>

                <div class="cell">
                  Address
                </div>

                <div class="cell">
                Monthly
                </div>


                <div class="cell">
                  Food
                </div>
                <div class="cell">
                  Medicines
                </div>

              </div>
              {deliverylist.map(delivery => (



    <div class="row">
    <div class="cell" data-title="Deliver's name">
      {delivery.name_deliver}
    </div>
    <div class="cell" data-title="Deliverey's date">
      {delivery.date_delivery}

    </div>
    <div class="cell" data-title="ID of the delivery">
  {delivery.delivery_id}
    </div>
      <div class="cell addresscell"  data-title="Address">
        {delivery.address + " "}
      </div>

        <div class="cell" data-title="Monthly">
          {delivery.monthly}
        </div>

      <div class="cell" data-title="Food">
      {delivery.food}
      </div>
      <div class="cell" data-title="Medicines">
        {delivery.medicines}
      </div>


    </div>
              ))}
              </div>

           </div>
          </div>
          </div>

        );
      }



}
}

export default Deliverylist ;
