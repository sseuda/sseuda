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
  // const username = useParams();
  
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

  const accessToken = window.localStorage.getItem("accessToken");
  const username = accessToken ? decodeJwt(accessToken).sub : null;

  
    console.log("username : ", username);
    console.log("token : ", accessToken);

    
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
          'Authorization': `Bearer ${accessToken}`,
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
  const quill = quillRef.current?.getEditor?.();
  const postContent = post.postContent || ''; // null 방지

  // ✅ 필수 입력값 검증
  if (!post.postTitle.trim()) {
    alert('제목을 입력해주세요.');
    return;
  }

  if (!post.categoryBig) {
    alert('대분류 카테고리를 선택해주세요.');
    return;
  }

  if (!post.categorySmall) {
    alert('소분류 카테고리를 선택해주세요.');
    return;
  }

  // ✅ 이미지가 포함되지 않았는지 검사 (quill content 안에 <img ...> 있는지 체크)
  const hasImage = /<img[^>]+src="([^">]+)"/.test(postContent);
  if (!hasImage) {
    alert('이미지를 한 장 이상 첨부해주세요.');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('postTitle', post.postTitle);
    formData.append('postContent', postContent);
    formData.append('createAt', post.createAt);
    formData.append('categoryBig', post.categoryBig);
    formData.append('smallCategoryId', post.categorySmall);

    if (post.image) {
      formData.append('image', post.image);
    }

    const response = await axios.post(`http://localhost:8080/post/${username}/posting`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    console.log('저장 성공', response.data);
    navigate(`/post/mypage/${username}`, { replace: false });
  } catch (err) {
    console.error('저장 실패', err);
    alert('서버 오류가 발생했습니다.');
  }
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
