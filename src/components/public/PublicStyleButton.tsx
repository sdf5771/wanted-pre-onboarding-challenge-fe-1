import React from 'react';
import style from '../../stylesheets/components/public/PublicStyleButton.module.css'

type PublicStyleButtonType = {
    buttonText: string,
    buttonImgSrc?: string,
    onClickEvent: React.MouseEventHandler<HTMLDivElement>,
    // onClickEvent: (MouseEvent | TouchEvent),
    // onClickEvent: React.MouseEvent,
    // onClickEvent: function,
}

function PublicStyleButton({buttonText, buttonImgSrc, onClickEvent}:PublicStyleButtonType){
    let addHtml = ``;
    if(buttonImgSrc !== ''){
        addHtml = `<img className={style.public_style_button_img} src={buttonImgSrc}/>`;
    }

    return (
        <div className={style.public_style_button_root} onClick={onClickEvent}>
            {addHtml}
            <div className={style.public_style_span_div}>
                <span>{buttonText}</span>
            </div>
        </div>
    );
}

export default PublicStyleButton;
