import React from 'react'
import {format} from "date-fns";
import { Link } from 'react-router-dom';

const Post = ({_id,title,summary,cover,content,author,createdAt}) => {
  return (
    // <div className='postCont'>
      <div className="post">

      <div className="image">
        {/* <img src="https://images.pexels.com/photos/17502664/pexels-photo-17502664/free-photo-of-close-up-of-robot.jpeg?auto=compress&cs=tinysrgb&w=600" /> */}
        <Link to={`/post/${_id}`}>
          {/* <img src={'http://localhost:4000/'+cover} /> */}
          {/* <img src={'https://source.unsplash.com/weekly?' + title } /> */}
          <img src={`https://picsum.photos/1600/900/?${title}/600/400`} />
        </Link>
      </div>

      <div className="texts"> 
        <Link to={`/post/${_id}`}>
          <h2> {title} </h2>
        </Link>
        <p className="summary">{summary}</p>
      </div>

      <hr></hr>

      <p className="info"> 
        <span className="author"> {author.username} </span>  
        {/* <time> { formatISO9075(new Date(createdAt) ) } </time> */}
        <time> { format(new Date(createdAt), 'MMM d, yyyy' ) } </time>
      </p>
 
      <Link to={`/post/${_id}`} className='readBtnLink'>
        <button className='readBtn'> Read </button>
      </Link>
      
    </div>
    // </div>
  )
}
   
export default Post