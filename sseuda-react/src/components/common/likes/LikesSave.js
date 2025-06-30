import React, { useState } from 'react'
import { decodeJwt } from '../../../utils/tokenUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function LikesSave({postId}) {

 const [folders, setFolders] = useState([]);

 const accessToken = localStorage.getItem('accessToken');
 const decodedToken = accessToken ? decodeJwt(accessToken) : null;
 const username = decodedToken ? decodedToken.sub : null;

 const FOLDER_STORAGE_KEY = `userFolders_${username}`;

     // 특정 폴더에 게시글 저장
  const savePostToFolder = (folderId, postId) => {
    const updatedFolders = folders.map(folder => {
      if (folder.id === folderId) {
        // 이미 저장된 게시글 중복 저장 방지
        if (!folder.posts.includes(postId)) {
          return { ...folder, posts: [...folder.posts, postId] };
        }
      }
      return folder;
    });

    setFolders(updatedFolders);
    localStorage.setItem(FOLDER_STORAGE_KEY, JSON.stringify(updatedFolders));
    alert("게시글이 저장되었습니다.");
  };


  // 특정 폴더별 게시글 제거
  const removePostFromFolder = (folderId, postId) => {
    const updatedFolders = folders.map(folder => {
      if (folder.id === folderId) {
        return { ...folder, posts: folder.posts.filter(id => id !== postId) };
      }
      return folder;
    });

    setFolders(updatedFolders);
    localStorage.setItem(FOLDER_STORAGE_KEY, JSON.stringify(updatedFolders));
  };

  return (
    <>
      <FontAwesomeIcon icon={faHeart} />
      {/* {folders.length === 0 && <p>폴더 없음</p>} */}
      {folders.map(folder => (
        <button key={folder.id} onClick={() => savePostToFolder(folder.id, postId)}>
          {folder.name}에 저장
        </button>
      ))}
    </>
  )
}

export default LikesSave;