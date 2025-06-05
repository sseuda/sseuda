import React from 'react'
import TextEditor from '../../components/common/post/TextEditor';
import editor from './css/PostTextEditor.module.css';
import { Link, useNavigate } from 'react-router-dom';


function PostTextEditor() {

    const navigate = useNavigate();

    const postEditor=()=>{
        navigate('post/mypage/editor');
    }

  return (
    <div onClick={()=>postEditor()} className={editor.editorBox}>
    </div>
  )
}

export default PostTextEditor;