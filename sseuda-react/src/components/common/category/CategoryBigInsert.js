import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { callBigCategoryApi, callInsertBigCategoryApi } from '../../../apis/CategoryAPICalls';

function CategoryBigInsert({reloadCategories}) {

    const dispatch = useDispatch();
    const [bigCategoryName, setBigCategoryName] = useState("");
    const [bigCategory, setBigCategory] = useState([]);
    const [reloadTrigger, setReloadTrigger] = useState(false);  // 변경 감지용


    useEffect(() => {
      const fetchCategories = async () => {
        const result = await dispatch(callBigCategoryApi());
        setBigCategory(result);
      };

      fetchCategories();
    }, [reloadTrigger]);

    
    const handleAddBigCategory = async () => {
      if (bigCategoryName.trim() === "") return;

      await dispatch(callInsertBigCategoryApi({ bigCategoryName }));

      setBigCategoryName("");        // input 초기화

      setReloadTrigger(prev => !prev);  // 상태 변경 -> useEffect 재실행으로 목록 갱신
      // await reloadCategories();      // 부모의 카테고리 다시 불러오기
  };


  return (
    <>
        {/* 상위 카테고리 추가 */}
        <div className="admin-category-section">
            <h3>상위 카테고리 추가</h3>
            <input
            type="text"
            placeholder="대분류 이름"
            value={bigCategoryName}
            onChange={(e) => setBigCategoryName(e.target.value)}
            />
            <button onClick={handleAddBigCategory}>등록</button>
        </div>
      </>
  )
}

export default CategoryBigInsert;