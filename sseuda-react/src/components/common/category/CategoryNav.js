import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import categoryReducer from '../../../modules/CategoryModule';
import { callCategoryApi } from '../../../apis/CategoryAPICalls';
import { useNavigate, useParams } from 'react-router-dom';
import Category from './css/CategoryNavbar.module.css';
import { decodeJwt } from '../../../utils/tokenUtils';

function CategoryNav() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const {smallCategoryId, bigCategoryId} = useParams();
    const categoryList = useSelector(state => state.categoryReducer);
    console.log("categoryList : ", categoryList);

    const isLogin = window.localStorage.getItem('accessToken');
    const decodedToken = isLogin ? decodeJwt(isLogin) : null;
    const username = decodedToken?.sub ?? null;
    
    
      // function isTokenExpired(decodedToken) {
      //   const currentTime = Math.floor(Date.now() / 1000);
      //   return decodedToken.exp < currentTime;
      // }


    console.log("username>??????????????? ", username);
    useEffect(() =>{
      dispatch(callCategoryApi());
    },[]);

    // 💡 대분류 기준으로 그룹화
    const groupedCategories = {};
    if (Array.isArray(categoryList)) {
      categoryList.forEach(({ categoryBigDTO, smallCategoryId, smallCategoryName }) => {
        const bigName = categoryBigDTO?.bigCategoryName || '기타';
        if (!groupedCategories[bigName]) {
          groupedCategories[bigName] = [];
        }
        groupedCategories[bigName].push({id: smallCategoryId, name: smallCategoryName});
      });
    }


    const handleClick = (username, smallCategoryId) => {
    navigate(`/post/mypage/${username}/${smallCategoryId}`);
  };

  return (
    <div className={Category.categoryBox}>
      {Object.entries(groupedCategories).map(([bigName, smallList]) => (
        <div key={bigName} className={Category.navBox}>
          <ul className={Category.bigBox}>
            {bigName}
            {smallList.map((small) => (
              <li 
              key={small.id}
              onClick={() => handleClick(username, small.id)}
              className={Category.smallBox}>
                {small.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CategoryNav;