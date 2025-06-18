import React from 'react'
import MyNav from './Global/MypageNavbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';

function MypageNavbar() {

    const navigate = useNavigate();
    const {username} = useParams();
    
    const myPageHandler = () =>{
        navigate(`/mypage/${username}`, {replace:false});
    };

    const myInformationHandler = () => {
        navigate(`/mypage/member/${username}`, {replace:false});
    };

  return (
    <div className={MyNav.navBox}>
        <div 
        className={MyNav.posting}
        onClick={myPageHandler}>
            <div className={MyNav.iconBox}>
                <FontAwesomeIcon className={MyNav.plusIcon} icon={faPlus} />
            </div>
        </div>

        <div 
        className={MyNav.user}
        onClick={myInformationHandler}>
            <div className={MyNav.iconBox}>
                <FontAwesomeIcon className={MyNav.addressBookIcon} icon={faAddressBook} />
            </div>
        </div>
    </div>
  )
}

export default MypageNavbar;