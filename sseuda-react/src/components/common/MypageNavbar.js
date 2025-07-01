import React, { useState } from 'react'
import MyNav from './Global/MypageNavbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MypageNavbar() {

    const navigate = useNavigate();
    const {username} = useParams();
    const {navBgColor, btnBgColor} = useSelector((state) => state.user);
    const [activeBtn, setActiveBtn] = useState(null);

    const myPageHandler = () => {
    setActiveBtn('myPage');
    navigate(`/mypage/${username}`);
  };

    const myInformationHandler = () => {
    setActiveBtn('myInfo');
    navigate(`/mypage/member/${username}`);
  };


  return (
    <div 
    className={MyNav.navBox}
    style={{ backgroundColor: navBgColor }}>
        <div 
        className={MyNav.posting}
        onClick={myPageHandler}
        style={{ backgroundColor: activeBtn === 'myPage' ? btnBgColor : '' }}>
            <div className={MyNav.iconBox}>
                <FontAwesomeIcon className={MyNav.plusIcon} icon={faPlus} />
            </div>
        </div>

        <div 
        className={MyNav.user}
        onClick={myInformationHandler}
        style={{ backgroundColor: activeBtn === 'myInfo' ? btnBgColor : '' }}
        >
            <div className={MyNav.iconBox}>
                <FontAwesomeIcon className={MyNav.addressBookIcon} icon={faAddressBook} />
            </div>
        </div>
    </div>
  )
}

export default MypageNavbar;