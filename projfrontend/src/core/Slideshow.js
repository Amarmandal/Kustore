import React from 'react';
import { Slide } from 'react-slideshow-image';
import '../styles.css';
import 'react-slideshow-image/dist/styles.css';

const properties = {
    duration: 6000,
    transitionDuration: 1000,
    infinite: true,
    indicators: true,
    arrows: true
}

const scrollPage = () => {
    window.scrollBy({
      top: 700,
      behavior: 'smooth'
    });
}

const Slideshow = () => {
    return (
      <div>
        <Slide {...properties} easing="ease">
          <div className="each-slide">
            <div className = 'img1'>
              <div className = 'text'>
                  <h1>KUstore</h1>
                  <h2>An online platform to</h2>
                  <h2>Buy and Sell your products</h2>
                  <button className = 'btn btn-lg btn-primary' onClick = {scrollPage}>Shop Now</button>
              </div>
            </div>
          </div>
          <div className="each-slide">
            <div className = 'img2'>
                <div className = 'text-1'>
                    <h1 className = 'center'>KUstore</h1>
                    <h2>Happy Dashain Tihar and Chhath!</h2>
                    <button className = 'btn btn-lg btn-primary' onClick = {scrollPage}>Shop Now</button>
                </div>
            </div>
          </div>
          <div className="each-slide">
            <div className = 'img3'>
                <div className = 'text-1'>
                    <h1 className = 'center'>KUstore</h1>
                    <h1><b>COVID-19 PANDEMIC </b></h1>
                    <h2>Stay Home, Stay Safe!</h2>
                    <button className = 'btn btn-lg btn-primary' onClick = {scrollPage}>Shop Now</button>
                </div>
            </div>
          </div>
        </Slide>
      </div>
    )
};

export default Slideshow;