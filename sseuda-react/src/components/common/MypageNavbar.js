import React from 'react'
import MyNav from './Global/MypageNavbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faAddressBook } from '@fortawesome/free-solid-svg-icons';

function MypageNavbar() {

  return (
    <div className={MyNav.navBox}>
        <div className={MyNav.posting}>
            <div className={MyNav.iconBox}>
                <FontAwesomeIcon className={MyNav.plusIcon} icon={faPlus} />
            </div>
        </div>

        <div className={MyNav.user}>
            <div className={MyNav.iconBox}>
                <FontAwesomeIcon className={MyNav.addressBookIcon} icon={faAddressBook} />
            </div>
        </div>
    </div>
  )
}

export default MypageNavbar;