import '../ReadPost.css';
import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {formatISO9075} from "date-fns";
import { UserContext } from "../userContext";
import {Link} from 'react-router-dom';

export default function ReadPost() {

  const [postInfo,setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext);
  const {id} = useParams();
  
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
        });
      });
  }, []);

  if (!postInfo) return '';

  return (
    <div className="postPage">

        <div className="postPageImg">
            <img src={ `https://picsum.photos/1600/900/?${postInfo.title}/600/400`}/>
        </div>

        <h1 className='postTitle'> {postInfo.title} </h1>

        <div className='detailBox' style={{ display:'flex', justifyContent:'space-between', alignContent:'center'}}>
          
          <div className='postDetails'>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <i> by &nbsp;{postInfo.author.username} </i>
          </div>
          
          <div style={{ display:'flex', alignContent:'center'}}>
            <Link to={`/edit/${postInfo._id}`} className='editDltBtn'>
              <button className='postEditBtn'> 
                <span className='edit_img_cont'> <img className='edit_img' src='../edit_img.png' alt='' /> </span>
                <b className='edit_text'> EDIT </b> 
              </button>
            </Link>
            <button className='postDltBtn'> 
              <span className='dlt_img_cont'> <img className='dlt_img' src='../dlt_img.png' alt='' /> </span>
              <b className='dlt_text'> DLT </b> 
            </button>
          </div>

        </div>

        <div dangerouslySetInnerHTML={{__html:postInfo.content}} />
    </div>
  );
}