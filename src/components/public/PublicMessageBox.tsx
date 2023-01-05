import React from 'react';
import styles from '../../stylesheets/components/public/PublicMessageBox.module.css';
import ReactDOM from "react-dom/client";
/*
* MsgText = String "Msg"
* */
function PublicMessageBox(MsgText: string) {
    let publicMsgBox = document.createElement('div');
    const root = document.getElementById('root');

    publicMsgBox.className = styles.public_msg_root;

    let addHtml = `
        <span>${MsgText}</span>
    `;

    publicMsgBox.insertAdjacentHTML('beforeend', addHtml);

    if(root !== null){
        root.append(publicMsgBox);
    }

    setTimeout(function(){
        publicMsgBox.remove();
    },1500)
}

export default PublicMessageBox;
