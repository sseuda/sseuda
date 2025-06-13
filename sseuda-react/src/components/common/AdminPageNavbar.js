import React from 'react';
import MyNav from './Global/MypageNavbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGear, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

function AdminPageNavbar() {

    return (
        <div className={MyNav.navBox}>

            {/* 회원 관리 */}
            <div className={MyNav.posting}>
                <div className={MyNav.iconBox}>
                    <FontAwesomeIcon className={MyNav.plusIcon} icon={faUserGear} />
                    <span className={MyNav.label}></span>
                </div>
            </div>

            {/* 신고 관리 */}
            <div className={MyNav.user}>
                <div className={MyNav.iconBox}>
                    <FontAwesomeIcon className={MyNav.addressBookIcon} icon={faTriangleExclamation} />
                    <span className={MyNav.label}></span>
                </div>
            </div>

        </div>
    );
}

export default AdminPageNavbar;