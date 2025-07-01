import React from 'react'
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Outlet } from 'react-router-dom';

function PostLayout() {
  return (
    <div style={{position: 'relative'}}>
		<Header />
		<div>
			<div>
				<Outlet/>
			</div>
		</div>
		<Footer style={{position: 'absolute', bottom: '0', left: '0'}}/>
	</div>
  )
}

export default PostLayout;