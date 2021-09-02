/*import React from 'react';

const AddBlog = () => (
  <div className='background'>
  <div className = 'bigwrap fadeInDown'>
    <h3 className = "fadeIn">Add Blog </h3>
   </div>
  </div>
);

export default AddBlog;*/

import React, {Component} from 'react';

import PersonImage from './person.png';
class AddBlog extends React.Component {

  constructor() {
    super();

    this.state = {
      title:'',
      content:'',
      };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  })
}

  async handleSubmit(event) {
    event.preventDefault();


    const data = { title:this.state.title, content:this.state.content}



      await fetch('/addblog', { method: 'POST',
       headers:{ 'Content-Type': 'application/json' },
       body: JSON.stringify(data) // data can be `string` or {object}!

        })
        .then(function() {
          document.location.href="/blog";


        })

       .catch(error => console.error('Error:', error));

     }




  render() {
    return (
  <div className='background'>
  <div className = 'bigwrap fadeInDown' style={{overflowX:"auto"}}>

    <h3 className = "fadeIn" style={{marginBottom:"25px"}}>Add Blog</h3>
    <form onSubmit={this.handleSubmit}>
    <label className="labeladdemployee"> Title </label> <br/>
    <input type="text" id="title" class="fadeIn inputaddemployer " name="title" placeholder="Title" onChange={this.handleChange} required /> <br/>

    <label className="labeladdemployee"> Content </label><br/>

    <textarea id="content" className="fadeIn inputaddemployer" name="content" placeholder="Today..." rows="10" cols="50" onChange={this.handleChange} required/>



      <input type="submit"  className="fadeIn buttonattemployer " value="Add Blog"/>

    </form>

   </div>
  </div>
);

}
}



export default AddBlog;
