import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callSearchPostsApi } from "../../apis/PostAPICalls";
import MainPost from "../../components/common/post/MainPost";

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

	return (
		<div className="search-result">
			<h2>🔍 "{keyword}" 검색 결과</h2>
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
	);
}

export default PostSearchResult;