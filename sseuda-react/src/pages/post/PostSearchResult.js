import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callSearchPostsApi } from "../../apis/PostAPICalls";
import MainPost from "../../components/common/post/MainPost";
import '../../pages/post/css/PostSearchResult.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function PostSearchResult() {
	const query = useQuery();
	const keyword = query.get("keyword");

	const dispatch = useDispatch();
	const posts = useSelector((state) => state.postReducer);

	useEffect(() => {
		if (keyword && keyword.trim() !== "") {
			dispatch(callSearchPostsApi(keyword));
		}
	}, [keyword, dispatch]);

	console.log('검색 결과 posts:', posts);

	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = () => {
		if (searchTerm.trim() === "") {
			alert("검색어를 입력해주세요.");
			return;
		}
		navigate(`/post/search?keyword=${encodeURIComponent(searchTerm)}`);
	}; 

	return (
		<div className='big-container'>
			<div className='searchWrapper'>
				<input
				type="text"
				className='searchInput'
				placeholder="검색어를 입력하세요"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				onKeyDown={(e) => e.key === "Enter" && handleSearch()}
				/>
				<button className='searchBtn' onClick={handleSearch}>
				<FontAwesomeIcon icon={faMagnifyingGlass} className='searchIcon' />
				</button>
			</div>
			<div className="search-result">
				<h3>🔍 <b>"{keyword}"</b> 검색 결과</h3>
				{posts && posts.length > 0 ? (
					<div className="post-list">
						{posts.map((post) => (
							<MainPost key={post.postId} post={post} />
						))}
					</div>
			) : (
				<p>검색 결과가 없습니다.</p>
			)}
		</div>
		</div>
	);
}

export default PostSearchResult;