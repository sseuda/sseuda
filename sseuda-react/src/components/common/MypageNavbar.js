import React from 'react'
import MyNav from './Global/MypageNavbar.module.css';

function MypageNavbar() {

  return (
    <div className={MyNav.navBox}>
        <div className={MyNav.posting}>
            <div className={MyNav.iconBox}>
                <p>icon</p>
            </div>
        </div>

        <div className={MyNav.user}>
            <div className={MyNav.iconBox}>
                <p>icon</p>
            </div>
        </div>
    </div>
  )
}

export default MypageNavbar;