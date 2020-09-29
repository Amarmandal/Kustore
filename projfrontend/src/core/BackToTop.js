import React, {useState} from 'react';
import {FaLocationArrow} from 'react-icons/fa';

function BackToTop() {
    const [showScroll, setShowScroll] = useState(false)

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 600){
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 400){
            setShowScroll(false)
        }
    };

    const scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    window.addEventListener('scroll', checkScrollTop)

    return (
        <div>
            <FaLocationArrow className="scrollTop" onClick={scrollTop} style={{height: 20, display: showScroll ? 'flex' : 'none'}}/>
        </div>
    )
}

export default BackToTop;