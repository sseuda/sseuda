import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { callBigCategoryApi, callInsertSmallCategoryApi } from '../../../apis/CategoryAPICalls';

function CategorySmallInsert() {

    const dispatch = useDispatch();
    // const bigCategory = useSelector(state => state.categoryReducer);
    const bigCategory = useSelector(state => state.categoryReducer) || [];
    console.log("bigCategory : ", bigCategory);

    const [smallCategoryName, setSmallCategoryName] = useState("");
    const [selectedBigCategoryId, setSelectedBigCategoryId] = useState(null);


    useEffect(() => {
        dispatch(callBigCategoryApi());
    }, [dispatch]);

    // const bigCategoryHandler = () =>{
    //     dispatch(callBigCategoryApi());
    // }

    // 하위 카테고리 추가
      const handleAddSmallCategory = async () => {
        if (!selectedBigCategoryId) {
          alert("상위 카테고리를 먼저 선택하세요.");
          return;
        }
    
        const form = new FormData();
        form.append("smallCategoryName", smallCategoryName);
        form.append("bigCategoryId", selectedBigCategoryId);
        await dispatch(callInsertSmallCategoryApi({ form }));
        await dispatch(callBigCategoryApi());
        setSmallCategoryName("");
      };

  return (
    <>
        {/* 하위 카테고리 추가 */}
        <div className="admin-category-section">
            <h3>하위 카테고리 추가</h3>
            <select
  onChange={(e) => setSelectedBigCategoryId(Number(e.target.value))}
  defaultValue=""
>
  <option value="" disabled>상위 카테고리 선택</option>
  {Array.isArray(bigCategory) && bigCategory.map((bigCat) => (
    <option key={`big-${bigCat.bigCategoryId}`} value={bigCat.bigCategoryId}>
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
  )
}

export default CategorySmallInsert;