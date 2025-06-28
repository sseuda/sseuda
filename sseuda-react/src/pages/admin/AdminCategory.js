import { useDispatch, useSelector } from "react-redux";
import { callCategoryApi, callDeleteCategoryApi, callDeleteSmallCategoryApi, callUpdateCategoryApi, callUpdateSmallCategoryApi } from "../../apis/CategoryAPICalls";
import "./AdminCategory.css";
import CategoryBigInsert from "../../components/common/category/CategoryBigInsert";
import CategorySmallInsert from "../../components/common/category/CategorySmallInsert";
import { useEffect } from "react";

function AdminCategory() {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categoryReducer.categoryList);
  console.log("categories 상태 확인 👉", categories);
  
  
  useEffect(() =>{
    dispatch(callCategoryApi());
   } ,[dispatch])

  // 상위 카테고리 수정
  const handleUpdateBigCategory = async (bigCategoryId, newName) => {
    if (newName) {
      const form = new FormData();
      form.append("bigCategoryId", bigCategoryId);
      form.append("bigCategoryName", newName);
      await dispatch(callUpdateCategoryApi({ form }));
      dispatch(callCategoryApi());
    }
  };

  // 하위 카테고리 수정
  const handleUpdateSmallCategory = async (smallCategoryId, bigCategoryId, newName) => {
    if (newName) {
      const form = new FormData();
      form.append("smallCategoryId", smallCategoryId);
      form.append("bigCategoryId", bigCategoryId);
      form.append("smallCategoryName", newName);
      await dispatch(callUpdateSmallCategoryApi({ form }));
      dispatch(callCategoryApi());
    }
  };

  // 상위 카테고리 삭제
  const handleDeleteBigCategory = async (bigCategoryId) => {
    const confirmDelete = window.confirm(
      "이 대분류에 속한 소분류들과 관련 게시글도 모두 삭제됩니다. 정말 삭제하시겠습니까?"
    );
    
    if (confirmDelete) {
    const form = new FormData();
      form.append("bigCategoryId", bigCategoryId);
      await dispatch(callDeleteCategoryApi({ form }));
      dispatch(callCategoryApi());
    }
  };

  // 하위 카테고리 삭제
  const handleDeleteSmallCategory = async (smallCategoryId, bigCategoryId) => {
    const confirmDelete = window.confirm(
      "이 소분류와 관련된 게시글도 모두 삭제됩니다. 정말 삭제하시겠습니까?"
    );
    
    if (confirmDelete) {
      const form = new FormData();
      form.append("smallCategoryId", smallCategoryId);
      form.append("bigCategoryId", bigCategoryId);
      await dispatch(callDeleteSmallCategoryApi({ form }));
      dispatch(callCategoryApi());
    }
  };

  // 드롭다운에 중복 없는 대분류만
  const uniqueBigCategories = [
    ...new Map(
      categories.map(cat => [cat.categoryBigDTO.bigCategoryId, cat.categoryBigDTO])
    ).values()
  ];

  return (
    <div className="admin-category-container">
      <h2>카테고리 관리</h2>
      <CategoryBigInsert/>
      <CategorySmallInsert categories={categories}/>

      {/* 카테고리 목록 */}
      <div className="admin-category-section">
        <h3>카테고리 목록</h3>
        <table className="category-table">
          <thead>
            <tr>
              <th>대분류 ID</th>
              <th>대분류 이름</th>
              <th>소분류 ID</th>
              <th>소분류 이름</th>
              <th>카테고리 수정</th>
              <th>카테고리 삭제</th>
            </tr>
          </thead>
          <tbody>
  {categories
    ?.filter(cat => cat.categoryBigDTO)
    .map((cat, index) => (
      <tr key={`cat-${cat.categoryBigDTO.bigCategoryId}-${cat.smallCategoryId}-${index}`}>
        <td>{cat.categoryBigDTO.bigCategoryId}</td>
        <td>{cat.categoryBigDTO.bigCategoryName}</td>
        <td>{cat.smallCategoryId}</td>
        <td>{cat.smallCategoryName}</td>
        <td>
          <div className="updateBtn">
            <button
              onClick={() => handleUpdateBigCategory(cat.categoryBigDTO.bigCategoryId, prompt("대분류 새 이름 입력"))}
            >
              대분류 수정
            </button>
            <button
              onClick={() => handleUpdateSmallCategory(
                cat.smallCategoryId,
                cat.categoryBigDTO.bigCategoryId,
                prompt("소분류 새 이름 입력"))}
            >
              소분류 수정
            </button>
          </div>
        </td>

        <td>
          <div className="deleteBtn">
            <button
              onClick={() => handleDeleteBigCategory(cat.categoryBigDTO.bigCategoryId)}
            >
              전체 삭제
            </button>
            <button
              onClick={() => handleDeleteSmallCategory(
                cat.smallCategoryId,
                cat.categoryBigDTO.bigCategoryId
              )}
            >
              소분류 삭제
            </button>
          </div>
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
