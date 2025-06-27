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
import "./AdminCategory.css";

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

  // ✅ 상위 카테고리 수정
  const handleUpdateBigCategory = (bigCategoryId, newName) => {
    const form = new FormData();
    form.append("bigCategoryId", bigCategoryId);
    form.append("bigCategoryName", newName);

    dispatch(callUpdateCategoryApi({ form }));
  };

  // ✅ 하위 카테고리 수정
  const handleUpdateSmallCategory = (smallCategoryId, newName) => {
    const form = new FormData();
    form.append("smallCategoryId", smallCategoryId);
    form.append("smallCategoryName", newName);

    dispatch(callUpdateSmallCategoryApi({ form }));
  };

  // ✅ 상위 카테고리 삭제
  const handleDeleteBigCategory = (bigCategoryId) => {
    const form = new FormData();
    form.append("bigCategoryId", bigCategoryId);

    dispatch(callDeleteCategoryApi({ form }));
  };

  // ✅ 하위 카테고리 삭제
  const handleDeleteSmallCategory = (smallCategoryId) => {
    const form = new FormData();
    form.append("smallCategoryId", smallCategoryId);

    dispatch(callDeleteSmallCategoryApi({ form }));
  };

  return (
    <div className="admin-category-container">
      <h2>카테고리 관리</h2>

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

      {/* 하위 카테고리 추가 */}
      <div className="admin-category-section">
        <h3>하위 카테고리 추가</h3>
        <select
          onChange={(e) => setSelectedBigCategoryId(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>상위 카테고리 선택</option>
          {categories?.map((cat) => (
            <option
              key={cat.categoryBigDTO.bigCategoryId}
              value={cat.categoryBigDTO.bigCategoryId}
            >
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

      {/* 카테고리 목록 */}
      <div className="admin-category-section">
        <h3>카테고리 목록</h3>
        <table className="category-table">
          <thead>
            <tr>
              <th>대분류 이름</th>
              <th>대분류 ID</th>
              <th>소분류 이름</th>
              <th>소분류 ID</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((cat) => (
              <tr key={cat.smallCategoryId}>
                <td>{cat.categoryBigDTO.bigCategoryName}</td>
                <td>{cat.bigCategoryId}</td>
                <td>{cat.smallCategoryName}</td>
                <td>{cat.smallCategoryId}</td>
                <td>
                  <button
                    className="category-action-btn"
                    onClick={() =>
                      handleUpdateBigCategory(
                        cat.bigCategoryId,
                        prompt("대분류 새 이름 입력")
                      )
                    }
                  >
                    대분류 수정
                  </button>
                  <button
                    className="category-action-btn"
                    onClick={() => handleDeleteBigCategory(cat.bigCategoryId)}
                  >
                    대분류 삭제
                  </button>
                  <button
                    className="category-action-btn"
                    onClick={() =>
                      handleUpdateSmallCategory(
                        cat.smallCategoryId,
                        prompt("소분류 새 이름 입력")
                      )
                    }
                  >
                    소분류 수정
                  </button>
                  <button
                    className="category-action-btn"
                    onClick={() => handleDeleteSmallCategory(cat.smallCategoryId)}
                  >
                    소분류 삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminCategory;
