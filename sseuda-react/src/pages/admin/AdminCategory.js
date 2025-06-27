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
  
  // const [bigCategoryList, setBigCategoryList] = useState([]);
  
  useEffect(() =>{
    dispatch(callCategoryApi());
   } ,[dispatch])



  // ✅ 상위 카테고리 수정
  const handleUpdateBigCategory = async (bigCategoryId, newName) => {
    if (newName) {
      const form = new FormData();
      form.append("bigCategoryId", bigCategoryId);
      form.append("bigCategoryName", newName);
      await dispatch(callUpdateCategoryApi({ form }));
      dispatch(callCategoryApi());
    }
  };

  // ✅ 하위 카테고리 수정
  const handleUpdateSmallCategory = async (smallCategoryId, newName) => {
    if (newName) {
      const form = new FormData();
      form.append("smallCategoryId", smallCategoryId);
      form.append("smallCategoryName", newName);
      await dispatch(callUpdateSmallCategoryApi({ form }));
      dispatch(callCategoryApi());
    }
  };

  // ✅ 상위 카테고리 삭제
  const handleDeleteBigCategory = async (bigCategoryId) => {
    const form = new FormData();
    form.append("bigCategoryId", bigCategoryId);
    await dispatch(callDeleteCategoryApi({ form }));
    dispatch(callCategoryApi());
  };

  // ✅ 하위 카테고리 삭제
  const handleDeleteSmallCategory = async (smallCategoryId) => {
    const form = new FormData();
    form.append("smallCategoryId", smallCategoryId);
    await dispatch(callDeleteSmallCategoryApi({ form }));
    dispatch(callCategoryApi());
  };

  // ✅ 드롭다운에 중복 없는 대분류만
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
              <th>대분류 이름</th>
              <th>대분류 ID</th>
              <th>소분류 이름</th>
              <th>소분류 ID</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
  {categories
    ?.filter(cat => cat.categoryBigDTO)
    .map((cat, index) => (
      <tr key={`cat-${cat.categoryBigDTO.bigCategoryId}-${cat.smallCategoryId}-${index}`}>
        <td>{cat.categoryBigDTO.bigCategoryName}</td>
        <td>{cat.categoryBigDTO.bigCategoryId}</td>
        <td>{cat.smallCategoryName}</td>
        <td>{cat.smallCategoryId}</td>
        <td>
          <button
            onClick={() => handleUpdateBigCategory(cat.categoryBigDTO.bigCategoryId, prompt("대분류 새 이름 입력"))}
          >
            대분류 수정
          </button>
          <button
            onClick={() => handleDeleteBigCategory(cat.categoryBigDTO.bigCategoryId)}
          >
            대분류 삭제
          </button>
          <button
            onClick={() => handleUpdateSmallCategory(cat.smallCategoryId, prompt("소분류 새 이름 입력"))}
          >
            소분류 수정
          </button>
          <button
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
