import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import categoryReducer from '../../../modules/CategoryModule';
import { callCategoryApi } from '../../../apis/CategoryAPICalls';
import { useParams } from 'react-router-dom';
import Category from './css/CategoryNavbar.module.css';

function CategoryNav() {

    const dispatch = useDispatch();
    // const {smallCategoryId, bigCategoryId} = useParams();
    const categoryList = useSelector(state => state.categoryReducer);
    console.log("categoryList : ", categoryList);

    useEffect(() =>{
      dispatch(callCategoryApi());
    },[]);

    // 💡 대분류 기준으로 그룹화
    const groupedCategories = {};
    if (Array.isArray(categoryList)) {
      categoryList.forEach(({ categoryBigDTO, smallCategoryName }) => {
        const bigName = categoryBigDTO?.bigCategoryName || '기타';
        if (!groupedCategories[bigName]) {
          groupedCategories[bigName] = [];
        }
        groupedCategories[bigName].push(smallCategoryName);
      });
    }


  return (
    <div className={Category.categoryBox}>
      {Object.entries(groupedCategories).map(([bigName, smallList]) => (
        <div key={bigName} className={Category.navBox}>
          <ul className={Category.bigBox}>
            {bigName}
            {smallList.map((small, index) => (
              <li key={index} className={Category.smallBox}>
                {small}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CategoryNav;