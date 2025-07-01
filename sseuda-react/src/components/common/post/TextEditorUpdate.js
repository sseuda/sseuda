import axios from 'axios';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { decodeJwt } from '../../../utils/tokenUtils';
import { useNavigate, useParams } from 'react-router-dom';
import Editor from './css/PostTextEditor.module.css';
import Global from '../Global/Button.module.css';

function TextEditorUpdate() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const quillRef = useRef(null);

  const [category, setCategory] = useState({}); // { 대분류명: [소분류객체, ...] }
  const [smallCategory, setSmallCategory] = useState([]);

  const accessToken = localStorage.getItem('accessToken');
  const username = accessToken ? decodeJwt(accessToken).sub : null;

  const [post, setPost] = useState({
    postTitle: '',
    postContent: '',
    categoryBig: '',
    categorySmall: '',
    image: null,
  });

  // 이미지 핸들러
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

        const imageUrl = `http://localhost:8080${res.data?.url || res.data}`;
        const editor = quillRef.current?.getEditor?.();
        if (editor) {
          const range = editor.getSelection(true);
          editor.insertEmbed(range.index, 'image', imageUrl);
          editor.setSelection(range.index + 1);
        }
      } catch (err) {
        alert('이미지 업로드 실패');
        console.error(err);
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

  // 1) 게시글 상세 데이터 불러오기
  useEffect(() => {
    if (!postId) return;

    axios.get(`http://localhost:8080/post/${postId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(res => {
        const data = res.data.data[0]; // 배열 안에 게시글 데이터가 있음
        if (data) {
          setPost({
            postTitle: data.postTitle || '',
            postContent: data.postContent || '',
            categoryBig: data.categoryBigName || '',  // 서버에서 대분류 이름이 어떻게 오는지 맞게 조정 필요
            categorySmall: data.smallCategoryId || '',
            image: null,
          });
        }
      })
      .catch(err => {
        console.error('게시글 상세 조회 실패', err);
        alert('게시글 상세 조회에 실패했습니다.');
      });
  }, [postId, accessToken]);

  // 2) 카테고리 목록 불러오기
  useEffect(() => {
    axios.get('http://localhost:8080/category/post/userpage', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(res => {
        const categoryMap = {};
        res.data.data.forEach(item => {
          const big = item.categoryBigDTO.bigCategoryName;
          const small = { id: item.smallCategoryId, name: item.smallCategoryName };
          if (!categoryMap[big]) categoryMap[big] = [];
          categoryMap[big].push(small);
        });
        setCategory(categoryMap);
      })
      .catch(err => {
        console.error('카테고리 로딩 실패', err);
      });
  }, [accessToken]);

  // 3) post.categoryBig가 바뀌면 smallCategory 세팅하기
  useEffect(() => {
    if (post.categoryBig && category[post.categoryBig]) {
      setSmallCategory(category[post.categoryBig]);
    } else {
      setSmallCategory([]);
    }
  }, [post.categoryBig, category]);

  // 저장 핸들러
  const handleSave = async () => {
    if (!post.postTitle.trim()) return alert('제목을 입력해주세요.');
    if (!post.categoryBig) return alert('대분류 카테고리를 선택해주세요.');
    if (!post.categorySmall) return alert('소분류 카테고리를 선택해주세요.');
    if (!/<img[^>]+src="([^">]+)"/.test(post.postContent)) {
      return alert('이미지를 한 장 이상 첨부해주세요.');
    }

    try {
      const formData = new FormData();
      formData.append('postTitle', post.postTitle);
      formData.append('postContent', post.postContent);
      formData.append('categoryBig', post.categoryBig);
      formData.append('smallCategoryId', post.categorySmall);

      if (post.image) {
        formData.append('image', post.image);
      }

      await axios.put(`http://localhost:8080/post/${username}/update?postId=${postId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      alert('게시글 수정 성공');
      navigate(`/mypage/${username}`);
    } catch (err) {
      console.error('게시글 수정 실패', err);
      alert('서버 오류로 게시글 수정 실패');
    }
  };

  return (
    <div className={Editor.editorBox}>
      <div className={Editor.titleBox}>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={post.postTitle}
          onChange={e => setPost(prev => ({ ...prev, postTitle: e.target.value }))}
        />
      </div>

      <div className={Editor.titleBox}>
        <div className={Editor.selectBox}>
          <select
            value={post.categoryBig}
            onChange={e => {
              const selected = e.target.value;
              setPost(prev => ({ ...prev, categoryBig: selected, categorySmall: '' }));
              setSmallCategory(category[selected] || []);
            }}
          >
            <option value="">대분류 선택</option>
            {Object.keys(category).map(big => (
              <option key={big} value={big}>{big}</option>
            ))}
          </select>

          <select
            value={post.categorySmall}
            onChange={e => setPost(prev => ({ ...prev, categorySmall: e.target.value }))}
            disabled={!post.categoryBig}
          >
            <option value="">소분류 선택</option>
            {smallCategory.map(small => (
              <option key={small.id} value={small.id}>{small.name}</option>
            ))}
          </select>
        </div>

        <button onClick={handleSave} className={Global.headerBTN}>수정</button>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) {
            setPost(prev => ({ ...prev, image: file }));

            const reader = new FileReader();
            reader.onload = () => {
              const quill = quillRef.current?.getEditor?.();
              const range = quill.getSelection(true);
              quill.insertEmbed(range.index, 'image', reader.result);
              quill.setSelection(range.index + 1);
            };
            reader.readAsDataURL(file);
          }
        }}
      />

      <ReactQuill
        ref={quillRef}
        value={post.postContent}
        onChange={value => setPost(prev => ({ ...prev, postContent: value }))}
        modules={modules}
        className={Editor.quill}
      />
    </div>
  );
}

export default TextEditorUpdate;
