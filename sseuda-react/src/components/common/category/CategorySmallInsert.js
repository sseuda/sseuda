import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callBigCategoryApi, callCategoryApi, callInsertSmallCategoryApi } from '../../../apis/CategoryAPICalls';

function CategorySmallInsert({ reloadCategories }) {
  const dispatch = useDispatch();
  const bigCategory = useSelector(state => state.categoryReducer.bigCategoryList) || [];

  const [smallCategoryName, setSmallCategoryName] = useState("");
  const [bigCategoryId, setBigCategoryId] = useState("");
  const [reloadTrigger, setReloadTrigger] = useState(false);

  useEffect(() => {
    const fetchBigCategories = async () => {
      await dispatch(callBigCategoryApi());
    };

    fetchBigCategories();
  }, [reloadTrigger]);

  // 하위 카테고리 추가
  const handleAddSmallCategory = async () => {
    if (!bigCategoryId) {
      alert("상위 카테고리를 먼저 선택하세요.");
      return;
    }
    if (smallCategoryName.trim() === "") {
      alert("소분류 이름을 입력하세요.");
      return;
    }

    await dispatch(callInsertSmallCategoryApi({ 
      smallCategoryName: smallCategoryName.trim(),
      bigCategoryId: bigCategoryId
    }));

    setSmallCategoryName("");
    setBigCategoryId("");

    setReloadTrigger(prev => !prev); // 트리거 변경으로 useEffect 다시 실행

    if (reloadCategories) {
      // reloadCategories(); // 부모의 카테고리 다시 불러오기 (필요시)
    }
  };

  useEffect(() => {
    const fetchBigCategories = async () => {
      await dispatch(callCategoryApi());
    };

    fetchBigCategories();
  }, [reloadTrigger]);


  return (
    <>
      {/* 하위 카테고리 추가 */}
      <div className="admin-category-section">
        <h3>하위 카테고리 추가</h3>
        <select
          value={bigCategoryId}
          onChange={(e) => setBigCategoryId(e.target.value)}
        >
          <option value="">-- 상위 카테고리 선택 --</option>
          {bigCategory.map(bigCat => (
            <option key={bigCat.bigCategoryId} value={bigCat.bigCategoryId}>
              {bigCat.bigCategoryName}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="소분류 이름"
          value={smallCategoryName}
          onChange={(e) => setSmallCategoryName(e.target.value)}
        />
        <button onClick={handleAddSmallCategory}>등록</button>
      </div>
    </>
  );
}

export default CategorySmallInsert;
