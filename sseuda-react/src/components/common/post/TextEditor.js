// HTTP 요청 (POST/GET/DELETE/PUT) 을 위해 사용용
import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { decodeJwt } from "../../utils/tokenUtils";
import ReactQuill from 'react-quill'
// Quill 에디터 css (필수)
import "react-quill/dist/quill.snow.css";
import Editor from './css/PostTextEditor.module.css';


function TextEditor() {

    // quill의 내용을 저장할 상태 변수
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [createAt, setCreateAt] = useState("");
    const [category, setCategory] = useState(1);

    // const isLogin = window.localStorage.getItem("accessToken"); // Local Storage에 token 정보 확인
    // const username = isLogin ? decodeJwt(isLogin).sub : null; // JWT에서 사용자 ID 추출


    useEffect(() =>{
      const today = new Date().toISOString().slice(0, 10);
      setCreateAt(today);
    }, []);

    // 상태(텍스트)가 변할때마다 상태를 업데이트하는 함수
    const handleChange = value => {
        setContent(value);
    }

    const handleSave = async () => {
        
        try{
            // const token = localStorage.getItem('token'); // 로그인 후 저장한 토큰

            const response = await axios.post(`/post/posting`, {
                postTitle: title,
                postContent: content,
                createAt: createAt,
                category: category
            },
            {
              // headers: {
              //   Authorization: `Bearer ${token}`
              // }
            }
          );
            console.log("저장 성공", response.data);
        }catch(err){
            console.log("저장 실패", err)
        }
    }

  return (
    <div className={Editor.editorBox}>
      <div className={Editor.titleBox}>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div className={Editor.titleBox}>
        <input
          type="number"
          value={category}
          onChange={e => setCategory(Number(e.target.value))}
        />
      </div>
      
      <ReactQuill style={{width: "1280px"}} value={content} onChange={handleChange} />
      <div>
        <button onClick={handleSave}>저장</button>
      </div>
    </div>
  )
}

export default TextEditor;
