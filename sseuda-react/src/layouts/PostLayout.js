import React from 'react'
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Outlet } from 'react-router-dom';

function PostLayout() {
  return (
    <div>
			<Header />
			<main>
                <Outlet/>
			</main>
			<Footer />
		</div>
  )
}

export default PostLayout;