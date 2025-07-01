import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callUserCategoryPostsListApi } from '../../apis/PostAPICalls';
import MypagePost from '../../components/common/post/MypagePost';
import CategoryNav from '../../components/common/category/CategoryNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import MainCSS from "../Main.module.css";

function UserPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, smallCategoryId: paramSmallCategoryId } = useParams();

  const smallCategoryId = paramSmallCategoryId || '1';
  const userList = useSelector((state) => state.postReducer);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(callUserCategoryPostsListApi({ username, smallCategoryId }));
  }, [dispatch, username, smallCategoryId]);

  // 페이지네이션 계산
  const totalPosts = Array.isArray(userList) ? userList.length : 0;
  const totalPages = Math.ceil(totalPosts / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPosts = Array.isArray(userList) ? userList.slice(startIdx, startIdx + ITEMS_PER_PAGE) : [];

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };


  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      alert("검색어를 입력해주세요.");
      return;
    }

    navigate(`/mypage/${username}/search?keyword=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh'}}>
      <CategoryNav style={{ position: 'absolute', top: '0', left: '0' }} />

      <div style={{ margin: '0 auto', flexDirection: 'column', padding: '2rem', width: '100%',  minHeight: '1500px', position: 'relative' }}>
        {/* 검색창 */}
        <div>
          <div className={MainCSS.searchWrapper} style={{margin: '50px 0 0 0'}}>
            <input
              type="text"
              className={MainCSS.searchInput}
              placeholder="검색어를 입력하세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button className={MainCSS.searchBtn} onClick={handleSearch}>
              <FontAwesomeIcon icon={faMagnifyingGlass} className={MainCSS.searchIcon} />
            </button>
          </div>
        </div>
    
        {/* 게시물 리스트 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          {currentPosts.map((post) => (
            <MypagePost key={post.postId} post={post} />
          ))}
        </div>

        {/* 페이지네이션 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', position: 'absolute', bottom: '50px', left: '50%' }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: currentPage === i + 1 ? '#007bff' : '#f0f0f0',
                color: currentPage === i + 1 ? '#fff' : '#000',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
