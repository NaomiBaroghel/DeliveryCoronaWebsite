import React, {Component} from 'react';
import {BsTrashFill} from 'react-icons/bs';
import {FaPencilAlt} from 'react-icons/fa';
import {FaCheck} from 'react-icons/fa';
//import { Button } from 'react-bootstrap';
class Dashboard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email:"",
        deliverlist: [],
        isLoaded: false,
      };
    };


    async componentDidMount() {


if(document.getElementById("titredone"))
{
  document.getElementById("titredone").style.display="none";

}


if(document.getElementById("donediv"))
{
  var els =document.getElementsByClassName("donediv");
  Array.prototype.forEach.call(els, function(el) {

    el.style.display="none";
});
}

     var allcookies = document.cookie.split(';');

     var id="";
     for (let i =0; i< allcookies.length; i++)
     {

     let cookiename = allcookies[i].split('=')[0];
     //alert(cookiename)
     let cookievalue = allcookies[i].split('=')[1];
     console.log(cookiename);
     console.log(cookievalue);
     //alert(cookievalue)
     if(cookiename.includes("sessionDelivery"))
     {



     id = cookievalue;
console.log("id");
     console.log(id);


     }


     }


      const data = { Email:id}
      console.log("data");
      console.log(data);

      await fetch('/getdeliverylistdeliver', { method: 'POST',
      headers:{ 'Content-Type': 'application/json' },
      body: JSON.stringify(data)

       }).then(res => res.json())
       .then(result => {
         console.log("listdeliverydeliver");
         console.log(result.deliverydeliver_list);
       this.setState({
         isLoaded: true,
         deliverlist: result.deliverydeliver_list
       })

     })
      .catch(error => console.error('Error:', error));

  }


       async checkfunc(delivery)
       {
               var data = {delivery_id:delivery.delivery_id}
         await fetch('/markascomplete', { method: 'POST',
         headers:{ 'Content-Type': 'application/json' },
         body: JSON.stringify(data) // data can be `string` or {object}!

       })
       .then(async function(res) {

                     alert("The delivery is done");
                     window.location.reload(true);
         console.log(res);


        })

         .catch(error => console.error('Error:', error));

     }




     async notdonefunc()
          {

            document.getElementById("titredone").style.display="inline";
            document.getElementById("donediv").style.display="inline";

            var els =document.getElementsByClassName("donediv");
            Array.prototype.forEach.call(els, function(el) {

              el.style.display="block";
       });



                 var allcookies = document.cookie.split(';');

                 var id="";
                 for (let i =0; i< allcookies.length; i++)
                 {

                 let cookiename = allcookies[i].split('=')[0];
                 //alert(cookiename)
                 let cookievalue = allcookies[i].split('=')[1];
                 console.log(cookiename);
                 console.log(cookievalue);
                 //alert(cookievalue)
                 if(cookiename.includes("sessionDelivery"))
                 {



                 id = cookievalue;
            console.log("id");
                 console.log(id);


                 }


                 }


                  const data = { Email:id}
                  console.log("data");
                  console.log(data);

            await fetch('/notdone', { method: 'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(data) // data can be `string` or {object}!

          }).then(res => res.json())
          .then(result => {
            console.log("listdeliverydelivernotdone");
            console.log(result.deliverydelivernotdone_list);
          this.setState({
            isLoaded: true,
            deliverlist: result.deliverydelivernotdone_list
          })


        })
         .catch(error => console.error('Error:', error));
      }

     async donefunc()
          {



                      document.getElementById("titredone").style.display="none";

                      var els =document.getElementsByClassName("donediv");
                      Array.prototype.forEach.call(els, function(el) {

                        el.style.display="none";
                 });
                 var allcookies = document.cookie.split(';');

                 var id="";
                 for (let i =0; i< allcookies.length; i++)
                 {

                 let cookiename = allcookies[i].split('=')[0];
                 //alert(cookiename)
                 let cookievalue = allcookies[i].split('=')[1];
                 console.log(cookiename);
                 console.log(cookievalue);
                 //alert(cookievalue)
                 if(cookiename.includes("sessionDelivery"))
                 {



                 id = cookievalue;
            console.log("id");
                 console.log(id);


                 }


                 }


                  const data = { Email:id}
                  console.log("data");
                  console.log(data);

            await fetch('/donedeliveries', { method: 'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(data) // data can be `string` or {object}!

          }).then(res => res.json())
          .then(result => {
            console.log("listdeliverydeliverdone");
            console.log(result.deliverydeliverdone_list);
          this.setState({
            isLoaded: true,
            deliverlist: result.deliverydeliverdone_list
          })

        })
         .catch(error => console.error('Error:', error));

      }



  render() {
      const deliverydeliverlist  = this.state.deliverlist;

      if (!this.state.isLoaded) {
        return (
          <div className='background' >
          <div className = 'wrapemployeelist fadeInDown' >
            <h3 className = "fadeIn" style={{marginBottom:"15px"}}>My delivery List</h3>
            <div>Loading ... </div>
           </div>
          </div>
        )
      } else {
        return (
          <div className='background'>

          <div className = 'wrapemployeelist fadeInDown' style={{marginTop:"15%"}} >
            <h3 className = "fadeIn" style={{marginBottom:"25px"}}>My delivery List</h3>
            <div style={{display:"flex"}}>
            <input type="submit" onClick={() => this.componentDidMount()} style={{marginBottom:"15px",marginLeft:"0px"}} className="fadeIn buttonattemployer " value="All"/>

              <input type="submit" onClick={() => this.donefunc()} style={{marginBottom:"15px",marginLeft:"0px"}} className="fadeIn buttonattemployer " value="Complete deliveries"/>
              <input type="submit" onClick={() => this.notdonefunc()} style={{marginBottom:"15px",marginLeft:"0px"}} className="fadeIn buttonattemployer " value="Mark as complete"/>
</div>

              <div style={{overflowX:"auto",overflowY:"auto",height:"500px"}}>


            <div class="table">

              <div class="row headerblack ">

                <div class="cell">
                  Address
                </div>
                <div class="cell">
                  Date
                </div>

                <div class="cell">
                Monthly
                </div>
                <div class="cell">
                  ID
                </div>


                <div class="cell">
                  Food
                </div>
                <div class="cell">
                  Medicines
                </div>

                <div style={{display:"none"}} id="titredone"class="cell">
                  Done
                </div>
              </div>
              {deliverydeliverlist.map(delivery => (



    <div class="row">
      <div class="cell addresscell" data-title="Address">
        {delivery.address}
      </div>
      <div class="cell" data-title="Address">
        {delivery.date_delivery}
      </div>

      <div class="cell" data-title="Address">
        {delivery.monthly}
      </div>
      <div class="cell" data-title="ID of the delivery">
    {delivery.delivery_id}
      </div>
      <div class="cell" data-title="Food">
      {delivery.food}
      </div>
      <div class="cell" data-title="Medicines">
        {delivery.medicines}
      </div>

      <div id="donediv" style={{display:"none"}} class="cell donediv" data-title="Done">
          <div style={{marginLeft: "15px",cursor:"pointer"}} id="ok" onClick={() => this.checkfunc(delivery)} class="fadeIn" ><FaCheck/></div>
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

export default Dashboard ;
