// HTTP 요청 (POST/GET/DELETE/PUT) 을 위해 사용용
import axios from 'axios';
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
// Quill 에디터 css (필수)
import "react-quill/dist/quill.snow.css";


function TextEditor() {

    // quill의 내용을 저장할 상태 변수
    const [content, setContent] = useState("");

    // 상태(텍스트)가 변할때마다 상태를 업데이트하는 함수
    const handleChange = value => {
        setContent(value);
    }

    const handleSave = async () => {
        
        try{
            const response = await axios.post("/post/posts", {
                content: content    // Quill의 HTML 내용
            });
            console.log("저장 성공", response.data);
        }catch(err){
            console.log("저장 실패", err)
        }
    }

  return (
    <>
        {/* content = 현재 , onChange = 변하는 값(콜백) */}
        <ReactQuill value={content} onChange={handleChange}/>
        <div>
            <button onClick={handleSave}>저장</button>
            <h3>Preview:</h3>
            {/* handleChange에 따라 변하는 값을 보여준다 */}
            <div dangerouslySetInnerHTML={{ __html: content}}/>
        </div>
    </>
  )
}

export default TextEditor;
