import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  callBigCategoryApi,
  callCategoryApi,
  callDeleteCategoryApi,
  callDeleteSmallCategoryApi,
  callUpdateCategoryApi,
  callUpdateSmallCategoryApi,
} from "../../apis/CategoryAPICalls";
import "./AdminCategory.css";
import CategoryBigInsert from "../../components/common/category/CategoryBigInsert";
import CategorySmallInsert from "../../components/common/category/CategorySmallInsert";

const ITEMS_PER_PAGE = 5;

function AdminCategory() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryReducer.categoryList) || [];
  const bigCategoryList = useSelector((state) => state.categoryReducer.bigCategoryList) || [];

  const [currentPage, setCurrentPage] = useState(1);
  const [reloadTrigger, setReloadTrigger] = useState(false);

  // 전체 카테고리 및 대분류 목록 불러오기
  const fetchAllCategories = async () => {
    await dispatch(callCategoryApi());
    await dispatch(callBigCategoryApi());
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchAllCategories();
  }, [reloadTrigger]);

  const handleReload = () => {
    setReloadTrigger((prev) => !prev);
  };

  // --- 카테고리 수정 및 삭제 핸들러들 ---

  const handleUpdateBigCategory = async (bigCategoryId, newName) => {
    if (newName) {
      const form = new FormData();
      form.append("bigCategoryId", bigCategoryId);
      form.append("bigCategoryName", newName);
      await dispatch(callUpdateCategoryApi({ form }));
      handleReload();
    }
  };

  const handleUpdateSmallCategory = async (smallCategoryId, bigCategoryId, newName) => {
    if (newName) {
      const form = new FormData();
      form.append("smallCategoryId", smallCategoryId);
      form.append("bigCategoryId", bigCategoryId);
      form.append("smallCategoryName", newName);
      await dispatch(callUpdateSmallCategoryApi({ form }));
      handleReload();
    }
  };

  const handleDeleteBigCategory = async (bigCategoryId) => {
    const confirmDelete = window.confirm(
      "이 대분류에 속한 소분류들과 관련 게시글도 모두 삭제됩니다. 정말 삭제하시겠습니까?"
    );
    if (confirmDelete) {
      const form = new FormData();
      form.append("bigCategoryId", bigCategoryId);
      await dispatch(callDeleteCategoryApi({ form }));
      handleReload();
    }
  };

  const handleDeleteSmallCategory = async (smallCategoryId, bigCategoryId) => {
    const confirmDelete = window.confirm(
      "이 소분류와 관련된 게시글도 모두 삭제됩니다. 정말 삭제하시겠습니까?"
    );
    if (confirmDelete) {
      const form = new FormData();
      form.append("smallCategoryId", smallCategoryId);
      form.append("bigCategoryId", bigCategoryId);
      await dispatch(callDeleteSmallCategoryApi({ form }));
      handleReload();
    }
  };

  // --- 페이지네이션 처리 ---
  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
  const pagedCategories = categories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="admin-category-container">
      <h2>카테고리 관리</h2>

      {/* 대분류 등록 */}
      <CategoryBigInsert reloadCategories={handleReload} />

      {/* 소분류 등록 */}
      <CategorySmallInsert reloadCategories={handleReload} />

      {/* 카테고리 목록 */}
      <div className="admin-category-section" style={{ minHeight: "580px" }}>
        <h3>카테고리 목록</h3>
        <table className="category-table">
          <thead>
            <tr>
              <th>대분류 ID</th>
              <th>대분류 이름</th>
              <th>소분류 ID</th>
              <th>소분류 이름</th>
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {pagedCategories
              .filter((cat) => cat.categoryBigDTO)
              .map((cat, index) => (
                <tr
                  key={`cat-${cat.categoryBigDTO?.bigCategoryId}-${cat.smallCategoryId}-${index}`}
                >
                  <td>{cat.categoryBigDTO?.bigCategoryId}</td>
                  <td>{cat.categoryBigDTO?.bigCategoryName}</td>
                  <td>{cat.smallCategoryId}</td>
                  <td>{cat.smallCategoryName}</td>
                  <td>
                    <div className="updateBtn">
                      <button
                        onClick={() =>
                          handleUpdateBigCategory(
                            cat.categoryBigDTO?.bigCategoryId,
                            prompt("대분류 새 이름 입력")
                          )
                        }
                      >
                        대분류 수정
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateSmallCategory(
                            cat.smallCategoryId,
                            cat.categoryBigDTO?.bigCategoryId,
                            prompt("소분류 새 이름 입력")
                          )
                        }
                      >
                        소분류 수정
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="deleteBtn">
                      <button
                        onClick={() =>
                          handleDeleteBigCategory(cat.categoryBigDTO?.bigCategoryId)
                        }
                      >
                        전체 삭제
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteSmallCategory(
                            cat.smallCategoryId,
                            cat.categoryBigDTO?.bigCategoryId
                          )
                        }
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

      {/* 페이지네이션 UI */}
      {totalPages > 1 && (
        <div className="pagination">
          {currentPage > 1 && (
            <button onClick={() => handlePageChange(currentPage - 1)}>« 이전</button>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={page === currentPage ? "active-page" : ""}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          {currentPage < totalPages && (
            <button onClick={() => handlePageChange(currentPage + 1)}>다음 »</button>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminCategory;
