import React from 'react';
import MyNav from './Global/MypageNavbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGear, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons/faLayerGroup';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import useLoginInfo from '../../hooks/useLoginInfo';

function AdminPageNavbar() {
    const navigate = useNavigate();
    const { loginUserAuth } = useLoginInfo();

    return (
        <div className={MyNav.navBox}>

            {/* 회원 관리 */}
            <div className={MyNav.posting}
                onClick={() => navigate('/admin/members')}
                style={{ cursor: 'pointer' }}>
                <div className={MyNav.iconBox}>
                    <FontAwesomeIcon className={MyNav.plusIcon} icon={faUserGear} />
                    <span className={MyNav.label}></span>
                </div>
            </div>

            {/* 신고 관리 */}
            <div className={MyNav.user}
                onClick={() => navigate('/admin/reports')}
                style={{ cursor: 'pointer' }}>
                <div className={MyNav.iconBox}>
                    <FontAwesomeIcon className={MyNav.addressBookIcon} icon={faTriangleExclamation} />
                    <span className={MyNav.label}></span>
                </div>
            </div>

            {loginUserAuth === "SUPER" && (
            <div
                className={MyNav.user}
                onClick={() => navigate('/admin/super')}
                style={{ cursor: 'pointer' }}
            >
                <div className={MyNav.iconBox}>
                <FontAwesomeIcon className={MyNav.addressBookIcon} icon={faKey} />
                </div>
            </div>
            )}

            {/* 카테고리 관리 */}
            <div className={MyNav.user}
                onClick={() => navigate('/admin/super/category')}
                style={{ cursor: 'pointer' }}>
                <div className={MyNav.iconBox}>
                    <FontAwesomeIcon className={MyNav.addressBookIcon} icon={faLayerGroup} />
                    <span className={MyNav.label}></span>
                </div>
            </div>

        </div>
    );
}

export default AdminPageNavbar;