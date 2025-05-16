// HTTP 요청 (POST/GET/DELETE/PUT) 을 위해 사용용
import axios from 'axios';
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
// Quill 에디터 css (필수)
import "react-quill/dist/quill.snow.css";


function TextEditor() {

    // quill의 내용을 저장할 상태 변수
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [userId, setUserId] = useState(1);
    const [category, setCategory] = useState(1);

    // 상태(텍스트)가 변할때마다 상태를 업데이트하는 함수
    const handleChange = value => {
        setContent(value);
    }

    const handleSave = async () => {
        
        try{
            const response = await axios.post("/post/posts", {
                postTitle: title,
                userId: userId,
                postContent: content,
                smallCategoryId: category
            });
            console.log("저장 성공", response.data);
        }catch(err){
            console.log("저장 실패", err)
        }
    }

  return (
    <>
      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="작성자 ID"
        value={userId}
        onChange={e => setUserId(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="카테고리 ID"
        value={category}
        onChange={e => setCategory(Number(e.target.value))}
      />
      <ReactQuill value={content} onChange={handleChange} />
      <div>
        <button onClick={handleSave}>저장</button>
        <h3>Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </>
  )
}

export default TextEditor;
