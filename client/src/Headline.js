import React from 'react'
import { Link } from 'react-router-dom'

const Headline = () => {
  return (
    <div className='headlineCont'>
        <div className='headlineTxt'>
            <h1 className='heading1'>Discover, Share, and Explore</h1>
            <h3 className='heading2'>Your Ultimate Blogging Destination</h3>
            <i className='heading3'>"Unleash your creativity and join our vibrant community of writers and readers. Dive into a world of captivating stories and insightful articles."</i>
            {/* <button className='createBtn'> Create </button> */}
            <Link to="/create" className='createBtn'> Create </Link>
        </div> 
        <div className='exploreImg'></div> 
    </div>
  )
}

export default Headline