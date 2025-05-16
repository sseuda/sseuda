import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css";

function TextEditor() {

    const [content, setContent] = useState("");

    const handleChange = value => {
        setContent(value);
    }

  return (
    <>
        <ReactQuill value={content} onChange={handleChange}/>
        <div>
            <h3>Preview:</h3>
            <div dangerouslySetInnerHTML={{ __html: content}}/>
        </div>
    </>
  )
}

export default TextEditor;
