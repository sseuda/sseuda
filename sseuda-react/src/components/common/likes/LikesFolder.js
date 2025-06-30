import React, { useEffect, useState } from 'react'
import { decodeJwt } from '../../../utils/tokenUtils';

function LikesFolder() {

  const [folders, setFolders] = useState([]);
  
  const accessToken = localStorage.getItem('accessToken');
  const decodedToken = accessToken ? decodeJwt(accessToken) : null;
  const username = decodedToken ? decodedToken.sub : null;

  const FOLDER_STORAGE_KEY = `userFolders_${username}`;


  // 첫 마운트 시 폴더 불러오기
  useEffect(() => {
    const storedFolders = JSON.parse(localStorage.getItem(FOLDER_STORAGE_KEY));
    if (storedFolders) {
      setFolders(storedFolders);
    }
  }, [username]);


  // 폴더 추가
  const addFolder = (newFolderName) => {
    const newFolder = {
      id: Date.now(),  // 고유 id
      name: newFolderName,
      posts: []        // 해당 폴더에 저장된 postId 리스트
    };

    const updatedFolders = [...folders, newFolder];
    setFolders(updatedFolders);
    localStorage.setItem(FOLDER_STORAGE_KEY, JSON.stringify(updatedFolders));
  };


  // 폴더 삭제
  const deleteFolder = (folderId) => {
    const updatedFolders = folders.filter(folder => folder.id !== folderId);
    setFolders(updatedFolders);
    localStorage.setItem(FOLDER_STORAGE_KEY, JSON.stringify(updatedFolders));
  };


  // 폴더 이름 변경
  const renameFolder = (folderId, newName) => {
    const updatedFolders = folders.map(folder =>
      folder.id === folderId ? { ...folder, name: newName } : folder
    );
    setFolders(updatedFolders);
    localStorage.setItem(FOLDER_STORAGE_KEY, JSON.stringify(updatedFolders));
  };

  return (
    <>
      {folders.map(folder => (
        <div key={folder.id}>
          <span>{folder.name}</span>
          <button onClick={() => deleteFolder(folder.id)}>삭제</button>
          <button onClick={() => renameFolder(folder.id, prompt('새 이름 입력:'))}>이름변경</button>
        </div>
      ))}

      <button onClick={() => addFolder(prompt('새 폴더 이름 입력:'))}>폴더 추가</button>
    </>
  )
}

export default LikesFolder;