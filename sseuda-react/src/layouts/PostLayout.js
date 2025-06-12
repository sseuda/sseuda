import React from 'react'
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Outlet } from 'react-router-dom';
import CategoryNav from '../components/common/category/CategoryNav';

function PostLayout() {
  return (
    <div style={{position: 'relative'}}>
		<Header />
		<div>
			{/* <CategoryNav style={{position: 'absolute', top: '0', left: '0'}}/> */}
			<div>
				<Outlet/>
			</div>
		</div>
		<Footer style={{position: 'absolute', bottom: '0', left: '0'}}/>
	</div>
  )
}

export default PostLayout;