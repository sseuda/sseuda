import axios from 'axios';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from './css/PostTextEditor.module.css';

function TextEditor() {
  const [post, setPost] = useState({
    postTitle: '',
    postContent: '',
    createdAt: '',
    categoryBig: '',
    categorySmall: '',
    image: null,
  });

  const [category, setCategory] = useState([]);
  const [smallCategory, setSmallCategory] = useState([]);
  const quillRef = useRef(null);

const imageHandler = () => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('/api/upload', formData);
      const imageUrl = res.data.url;

      const editor = quillRef.current.getEditor();
      const range = editor.getSelection(true);
      editor.insertEmbed(range.index, 'image', imageUrl);
      editor.setSelection(range.index + 1);
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
    setPost(prev => ({ ...prev, createdAt: today }));


    axios.get('/post/userpage')
    .then(res => {
      const rawData = res.data.data;

      // 대분류별 소분류 묶이
      const categoryMap = {};

      rawData.forEach(item => {
        const bigName = item.categoryBigDTO.bigCategoryName;
        const smallName = item.smallCategoryName;

        if(!categoryMap[bigName]){
          categoryMap[bigName] = [];
        }

        categoryMap[bigName].push(smallName)
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
      formData.append('postTitle', post.postTitle);
      formData.append('postContent', post.postContent);
      formData.append('createAt', post.createdAt);
      formData.append('categoryBig', post.categoryBig);
      formData.append('categorySmall', post.categorySmall);
      formData.append('image', post.image);

      const response = await axios.post('/post/posting', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('저장 성공', response.data);
    } catch (err) {
      console.error('저장 실패', err);
    }
  };

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
            <option key={small} value={small}>{small}</option>
          ))}
        </select>
      </div>

      <ReactQuill
        ref={quillRef}
        value={post.postContent}
        onChange={value => setPost({ ...post, postContent: value })}
        modules={modules}
        style={{ width: '1280px' }}
      />

      <div>
        <button onClick={handleSave}>저장</button>
      </div>
    </div>
  );
}

export default TextEditor;
