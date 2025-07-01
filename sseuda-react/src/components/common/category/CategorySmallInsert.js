import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callBigCategoryApi, callInsertSmallCategoryApi } from '../../../apis/CategoryAPICalls';

function CategorySmallInsert({ reloadCategories }) {
  const dispatch = useDispatch();
  const bigCategory = useSelector(state => state.categoryReducer.bigCategoryList) || [];

  const [smallCategoryName, setSmallCategoryName] = useState("");
  const [bigCategoryId, setBigCategoryId] = useState("");

  // 대분류 리스트 불러오기
  const fetchBigCategories = async () => {
    await dispatch(callBigCategoryApi());
  };

  useEffect(() => {
    fetchBigCategories();
  }, []);

  // 드롭다운 옵션 캐싱
  const categoryOptions = useMemo(() => {
    return bigCategory.map(bigCat => (
      <option key={bigCat.bigCategoryId} value={bigCat.bigCategoryId}>
        {bigCat.bigCategoryName}
      </option>
    ));
  }, [bigCategory]);

  // 소분류 등록
  const handleAddSmallCategory = async () => {
    if (!bigCategoryId) {
      alert("상위 카테고리를 선택하세요.");
      return;
    }
    if (smallCategoryName.trim() === "") {
      alert("소분류 이름을 입력하세요.");
      return;
    }

    await dispatch(callInsertSmallCategoryApi({
      smallCategoryName: smallCategoryName.trim(),
      bigCategoryId: Number(bigCategoryId),   // 숫자 ID로 보내기
    }));

    // 입력값 초기화
    setSmallCategoryName("");
    setBigCategoryId("");

    // 대분류 리스트 다시 불러오기
    await fetchBigCategories();

    // 부모에 리로드 요청 (예: 목록 새로고침)
    if (reloadCategories) {
      reloadCategories();
    }
  };

  return (
    <div className="admin-category-section">
      <h3>하위 카테고리 추가</h3>

      <select
        value={bigCategoryId}
        onChange={(e) => setBigCategoryId(e.target.value)}
      >
        <option value="">-- 상위 카테고리 선택 --</option>
        {categoryOptions}
      </select>

      <input
        type="text"
        placeholder="소분류 이름"
        value={smallCategoryName}
        onChange={(e) => setSmallCategoryName(e.target.value)}
      />

      <button onClick={handleAddSmallCategory}>등록</button>
    </div>
  );
}

export default CategorySmallInsert;
