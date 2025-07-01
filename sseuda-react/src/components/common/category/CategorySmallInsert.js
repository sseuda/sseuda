import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callBigCategoryApi, callInsertSmallCategoryApi } from "../../../apis/CategoryAPICalls";

function CategorySmallInsert({ reloadCategories }) {
  const dispatch = useDispatch();

  // 전역 스토어에서 대분류 리스트 가져오기
  const bigCategories = useSelector((state) => state.categoryReducer.bigCategoryList) || [];

  // 로컬 상태
  const [smallCategoryName, setSmallCategoryName] = useState("");
  const [bigCategoryId, setBigCategoryId] = useState("");

  // 대분류 리스트 처음 + 갱신 시 불러오기
  useEffect(() => {
    dispatch(callBigCategoryApi());
  }, []);

  // 소분류 등록 함수
  const handleAddSmallCategory = async () => {
    if (!bigCategoryId) {
      alert("상위 카테고리를 선택하세요.");
      return;
    }
    if (smallCategoryName.trim() === "") {
      alert("소분류 이름을 입력하세요.");
      return;
    }

    // 소분류 등록 API 호출
    await dispatch(
      callInsertSmallCategoryApi({
        smallCategoryName: smallCategoryName.trim(),
        bigCategoryId: bigCategoryId,
      })
    );

    // 입력값 초기화
    setSmallCategoryName("");
    setBigCategoryId("");

    // 대분류 리스트 새로고침
    await dispatch(callBigCategoryApi());

    // 부모 컴포넌트로도 갱신 알림 (목록 새로 불러오기용)
    if (reloadCategories) {
      reloadCategories();
    }
  };

  return (
    <div className="admin-category-section">
      <h3>하위 카테고리 추가</h3>

      {/* 상위 카테고리 드롭다운 */}
      <select
        value={bigCategoryId}
        onChange={(e) => setBigCategoryId(e.target.value)}
      >
        <option value="">-- 상위 카테고리 선택 --</option>
        {bigCategories
          .filter((bigCat) => bigCat.bigCategoryId !== undefined && bigCat.bigCategoryId !== null)
          .map((bigCat) => (
            <option key={`${bigCat.bigCategoryId}`} value={bigCat.bigCategoryId}>
              {bigCat.bigCategoryName}
            </option>
          ))}
      </select>

      {/* 소분류 이름 입력 */}
      <input
        type="text"
        placeholder="소분류 이름"
        value={smallCategoryName}
        onChange={(e) => setSmallCategoryName(e.target.value)}
      />

      {/* 등록 버튼 */}
      <button onClick={handleAddSmallCategory}>등록</button>
    </div>
  );
}

export default CategorySmallInsert;
