import axios from 'axios';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from './css/PostTextEditor.module.css';
import { decodeJwt } from '../../../utils/tokenUtils';
import { useNavigate, useParams } from 'react-router-dom';
import { callUserPostsListApi } from '../../../apis/PostAPICalls';
import { useDispatch } from 'react-redux';
import './css/PostTextEditor.css';
import Global from '../Global/Button.module.css';

function TextEditor() {

  const navigate = useNavigate();
  const {paramUsername} = useParams();
  
  const [category, setCategory] = useState([]);
  const [smallCategory, setSmallCategory] = useState([]);
  
  const [post, setPost] = useState({
    username: '',
    postTitle: '',
    postContent: '',
    createAt: '',
    categoryBig: '',
    categorySmall: '',
    image: '',
  });
  
  const quillRef = useRef(null);

  const isLogin = window.localStorage.getItem('accessToken');
  const decodedToken = isLogin ? decodeJwt(isLogin) : null;
  const username = decodedToken?.sub ?? null;

  function isTokenExpired(decodedToken) {
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  }

  useEffect(() => {
      if (!isLogin || !decodedToken || isTokenExpired(decodedToken)) {
          alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
          navigate("/auth/login");
          return;
      }
  
    }, []);

    console.log("username : ", paramUsername);
    console.log("token : ", isLogin);

    
const imageHandler = () => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:8080/sseudaimgs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${isLogin}`,
        },
      });

      console.log('서버 응답:', res);
      const relativeImageUrl = res.data?.url || res.data; // 예: /sseudaimgs/1749438505160.png

      // 절대 경로로 변환
      const imageUrl = `http://localhost:8080${relativeImageUrl}`;

      const editor = quillRef.current?.getEditor?.();
      if (editor) {
        const range = editor.getSelection(true);
        editor.insertEmbed(range.index, 'image', imageUrl);
        editor.setSelection(range.index + 1);
      } else {
        console.error('에디터가 초기화되지 않았습니다.');
      }
    } catch (err) {
      console.error('이미지 업로드 실패', err);
    }
  };
};

const modules = useMemo(() => ({
  toolbar: {
    container: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['image'],
    ],
    handlers: {
      image: imageHandler,
    },
  },
}), []);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setPost(prev => ({ ...prev, createAt: today }));


    axios.get('/post/userpage')
    .then(res => {
      const rawData = res.data.data;

      // 대분류별 소분류 묶이
      const categoryMap = {};

      rawData.forEach(item => {
        const bigName = item.categoryBigDTO.bigCategoryName;
        const smallId = item.smallCategoryId;
        const smallName = item.smallCategoryName;

        if(!categoryMap[bigName]){
          categoryMap[bigName] = [];
        }

        categoryMap[bigName].push({id: smallId, name: smallName})
        console.log("카테고리 아이디는???????? ", smallId);
      });
      setCategory(categoryMap);
    })
    .catch(err => {
      console.log('카테고리 데이터 로드 실패', err);
    });


  }, []);

  // 대분류 변경 시
  const handleCategoryBigChange = (e) => {
    const selectedBig = e.target.value;
    setPost(prev => ({
      ...prev,
      categoryBig: selectedBig,
      categorySmall: '',
    }));

    if (selectedBig && category[selectedBig]) {
      setSmallCategory(category[selectedBig]);
    } else {
      setSmallCategory([]);
    }
  };

  // 소분류 변경 시
  const handleCategorySmallChange = (e) => {
    setPost(prev => ({
      ...prev,
      categorySmall: e.target.value,
    }));
  };

  

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('paramUsername', paramUsername);
      formData.append('postTitle', post.postTitle);
      formData.append('postContent', post.postContent);
      formData.append('createAt', post.createAt);
      formData.append('categoryBig', post.categoryBig);
      formData.append('smallCategoryId', post.categorySmall);
      formData.append('image', post.image);

      const response = await axios.post(`http://localhost:8080/post/${paramUsername}/posting`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${isLogin}`,  // ✅ 반드시 이 헤더 포함!
        },
      });

      console.log('저장 성공', response.data);
    } catch (err) {
      console.error('저장 실패', err);
    }

    navigate(`/post/mypage/${username}`, {replace:false});
  };

  console.log(post.image);

  return (
    <div className={Editor.editorBox}>
      <div className={Editor.titleBox}>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={post.postTitle}
          onChange={e => setPost({ ...post, postTitle: e.target.value })}
        />
      </div>

      <div className={Editor.titleBox}>

        <div className={Editor.selectBox}>
          {/* 대분류 셀렉트박스 */}
            <select value={post.categoryBig} onChange={handleCategoryBigChange}>
              <option value="">대분류 선택</option>
              {Object.keys(category).map(big => (
                <option key={big} value={big}>{big}</option>
              ))}
            </select>

            {/* 소분류 셀렉트박스 */}
            <select
              value={post.categorySmall}
              onChange={handleCategorySmallChange}
              disabled={!post.categoryBig}
              >
              <option value="">소분류 선택</option>
              {smallCategory.map(small => (
                <option key={small.id} value={small.id}>{small.name}</option>
              ))}
            </select>
        </div>
        

        <div>
          <button onClick={handleSave} className={Global.headerBTN}>저장</button>
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={e => {
          const file = e.target.files[0];
          if (file) {
            // 파일을 post 상태에도 저장 (기존 방식 유지)
            setPost(prev => ({ ...prev, image: file }));

            // 이미지 미리보기 URL 만들기
            const reader = new FileReader();
            reader.onload = () => {
              const quill = quillRef.current.getEditor();
              const range = quill.getSelection(true); // 현재 커서 위치
              quill.insertEmbed(range.index, 'image', reader.result);
              quill.setSelection(range.index + 1); // 커서 다음으로 이동
            };
            reader.readAsDataURL(file); // base64로 읽기
          }
        }}
      />

      <ReactQuill
        ref={quillRef}
        value={post.postContent}
        onChange={value => setPost({ ...post, postContent: value })}
        // modules={modules}
        className={Editor.quill}
      />
    </div>
  );
}

export default TextEditor;
