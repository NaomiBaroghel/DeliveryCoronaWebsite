
import React, {Component} from 'react';
import {BsTrashFill} from 'react-icons/bs';
import {FaPencilAlt} from 'react-icons/fa';
import {FaCheck} from 'react-icons/fa';

class Blog extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        bloglist: [],
        isLoaded: false,
      };
    }
      readmorefunc(blog)
      {
        var id = blog.blog_id.toString();
        var moreText =document.getElementById(id+"content2");
        var dots = document.getElementById(id+"3dot");
        var btnText = document.getElementById(id+"readmore");

        if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read More";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read Less";
    moreText.style.display = "inline";
  }


      }


    async componentDidMount() {
      await fetch('/getblog', { method: 'GET',
      headers:{ 'Content-Type': 'application/json' },

       }).then(res => res.json())
       .then(result => {
         console.log(result.blog_list);
       this.setState({
         isLoaded: true,
         bloglist: result.blog_list
       })
     })
      .catch(error => console.error('Error:', error));

  }




  render(blog) {


      const bloglist  = this.state.bloglist;

      if (!this.state.isLoaded) {
        return (
          <div className='background' >
          <div className = 'bigwrap fadeInDown' >
            <h3 className = "fadeIn" style={{marginBottom:"15px"}}>Blog</h3>
            <div>Loading ... </div>
           </div>
          </div>
        )
      } else {
        return (
          <div className='background'>
          <div className = 'bigwrap fadeInDown' style={{marginTop:"15%"}} >
            <h3 className = "fadeIn" style={{marginBottom:"25px"}}>Blog</h3>

            <div style={{overflowX:"auto",overflowY:"auto",height:"500px"}}>

              {bloglist.map(blog => (


    <div className="blogbackground">
    <div className="blogtitle">
    {blog.title}

    </div>
    <div className="blogdate">
    {blog.date}

    </div>
    <div className="blogcontent" >
    <p>{blog.content.substr(0, 55)}<span id={blog.blog_id.toString()+"3dot"}>...</span><span id={blog.blog_id.toString()+"content2"} style={{display:"none"}}>{blog.content.substr(55)}</span></p>

    </div>


    <div className="">

    <a id={blog.blog_id + "readmore"} style={{cursor:"pointer"}} onClick={() => this.readmorefunc(blog)} > Read More </a>
    </div>

    </div>




              ))}
              </div>

           </div>

          </div>

        );
      }



}
}


export default Blog ;
