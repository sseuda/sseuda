import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { callInsertBigCategoryApi } from '../../../apis/CategoryAPICalls';

function CategoryBigInsert() {

    const dispatch = useDispatch();
    const [bigCategoryName, setBigCategoryName] = useState("");

    // ✅ 상위 카테고리 추가
      const handleAddBigCategory = async () => {
        const form = new FormData();
        form.append("bigCategoryName", bigCategoryName);
        await dispatch(callInsertBigCategoryApi({ form }));  // 등록 먼저
        setBigCategoryName("");
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