import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  callCategoryApi,
  callInsertBigCategoryApi,
  callInsertSmallCategoryApi,
  callUpdateCategoryApi,
  callUpdateSmallCategoryApi,
  callDeleteCategoryApi,
  callDeleteSmallCategoryApi
} from "../../apis/CategoryAPICalls";

function AdminCategory() {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categoryReducer);
  console.log("categories에는 어떤게 있을까~ ", categories);

  const [bigCategoryName, setBigCategoryName] = useState("");
  const [smallCategoryName, setSmallCategoryName] = useState("");
  const [selectedBigCategoryId, setSelectedBigCategoryId] = useState(null);

  // ✅ 전체 카테고리 조회
  useEffect(() => {
    dispatch(callCategoryApi());
  }, [dispatch]);

  console.log("전체 카테고리 상태:", categories);

  // ✅ 상위 카테고리 추가
  const handleAddBigCategory = () => {
    const form = new FormData();
    form.append("bigCategoryName", bigCategoryName);

    dispatch(callInsertBigCategoryApi({ form }));
    setBigCategoryName("");
  };

  // ✅ 하위 카테고리 추가
  const handleAddSmallCategory = () => {
    if (!selectedBigCategoryId) {
      alert("상위 카테고리를 먼저 선택하세요.");
      return;
    }

    const form = new FormData();
    form.append("smallCategoryName", smallCategoryName);
    form.append("bigCategoryId", selectedBigCategoryId);

    dispatch(callInsertSmallCategoryApi({ form }));
    setSmallCategoryName("");
  };

  // 상위 카테고리 수정
  const handleUpdateBigCategory = (bigCategoryId, newName) => {
    const form = new FormData();
    form.append("bigCategoryId", bigCategoryId);
    form.append("bigCategoryName", newName);

    dispatch(callUpdateCategoryApi({ form }));
  };

  // 하위 카테고리 수정
  const handleUpdateSmallCategory = (smallCategoryId, newName) => {
    const form = new FormData();
    form.append("smallCategoryId", smallCategoryId);
    form.append("smallCategoryName", newName);

    dispatch(callUpdateSmallCategoryApi({ form }));
  };

  // 상위 카테고리 삭제
  const handleDeleteBigCategory = (bigCategoryId) => {
    const form = new FormData();
    form.append("bigCategoryId", bigCategoryId);

    dispatch(callDeleteCategoryApi({ form }));
  };

  // 하위 카테고리 삭제
  const handleDeleteSmallCategory = (smallCategoryId) => {
    const form = new FormData();
    form.append("smallCategoryId", smallCategoryId);

    dispatch(callDeleteSmallCategoryApi({ form }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>카테고리 관리</h2>

      {/* 상위 카테고리 추가 */}
      <div>
        <h3>상위 카테고리 추가</h3>
        <input
          type="text"
          placeholder="대분류 이름"
          value={bigCategoryName}
          onChange={(e) => setBigCategoryName(e.target.value)}
        />
        <button onClick={handleAddBigCategory}>등록</button>
      </div>

      {/* 하위 카테고리 추가 */}
      <div>
        <h3>하위 카테고리 추가</h3>
        <select onChange={(e) => setSelectedBigCategoryId(e.target.value)} defaultValue="">
          <option value="" disabled>상위 카테고리 선택</option>
          {categories?.map((cat) => (
            <option key={cat.categoryBigDTO.bigCategoryId} value={cat.categoryBigDTO.bigCategoryId}>
              {cat.categoryBigDTO.bigCategoryName}
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

      {/* 전체 카테고리 목록 */}
      <div style={{ marginTop: "20px" }}>
        <h3>카테고리 목록</h3>
        {categories?.map((cat) => (
          <div key={cat.smallCategoryId} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
            <strong>대분류: {cat.categoryBigDTO.bigCategoryName}</strong> (ID: {cat.bigCategoryId})
            <button onClick={() => handleUpdateBigCategory(cat.bigCategoryId, prompt("대분류 새 이름 입력"))}>수정</button>
            <button onClick={() => handleDeleteBigCategory(cat.bigCategoryId)}>삭제</button>

            <div style={{ marginLeft: "20px", marginTop: "5px" }}>
              소분류: {cat.smallCategoryName} (ID: {cat.smallCategoryId})
              <button onClick={() => handleUpdateSmallCategory(cat.smallCategoryId, prompt("소분류 새 이름 입력"))}>수정</button>
              <button onClick={() => handleDeleteSmallCategory(cat.smallCategoryId)}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCategory;
