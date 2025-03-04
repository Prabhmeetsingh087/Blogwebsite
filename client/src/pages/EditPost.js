import React from 'react'
import {useState} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Editor from '../Editor';
import { useEffect } from 'react';

const EditPost = () => {

    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        fetch('http://localhost:4000/post/'+id)
            .then(response => {
                response.json().then(postInfo => {
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary);
                });
            });
    }, []);

    async function updatePost(ev)
    {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }

        // const response = await fetch('http://localhost:4000/post', {
        //     method: 'PUT',
        //     body: data,
        //     credentials: 'include',
        // });

        // if (response.ok) {
        //     setRedirect(true);
        // }

        try {
            const response = await fetch('http://localhost:4000/post', {
                method: 'PUT',
                body: data,
                credentials: 'include',
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const responseData = await response.json();
            console.log('Server response:', responseData);
        
            setRedirect(true);
        } catch (error) {
            console.error('-> Error updating post:', error);
            // Handle the error, show a message, or retry the request
        }
        
    }

    if (redirect) {
        nav("/post/" + id );
    }

    return (
        <form onSubmit={updatePost} >
            <input type="title" placeholder={'Title'} value={title}
                    onChange={e => setTitle(e.target.value)} />
            <input type="summary" placeholder={'Summary'} value={summary}
                    onChange={e => setSummary(e.target.value)} />
            
            {/* added input type file for user to add image for cover */}
            <input className="file_input" type="file"
                    onChange={e => setFiles(e.target.files)} />
                    
            <Editor value={content} onChange={setContent} />

            <button className="create_post_btn">Edit post</button>
        </form>
    )
}

export default EditPost