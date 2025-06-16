import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import AdminPageNavbar from '../components/common/AdminPageNavbar';

function AdminPageLayout() {
	return (
		<div style={{position: 'relative'}}>
			<Header/>
		<div style={{display: 'flex', height: '93vh'}}>
		<AdminPageNavbar style={{position: 'absolute', top: '0', left: '0'}}/>
        <div style={{width: '1280px', margin: '0 auto'}}>
        	<Outlet/>
        </div>
		</div>
    </div>
	)
};

export default AdminPageLayout;
