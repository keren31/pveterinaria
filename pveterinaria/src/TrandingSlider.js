import React, { useEffect, useRef, useState } from 'react'
import './TrandingSlider.css'
import imagen from './imagenes2/Producto1.jpg';
import imagen2 from './imagenes2/Producto2.jpg';
import imagen3 from './imagenes2/Producto3.jpg';
import imagen4 from './imagenes2/Producto4.jpg';
import imagen5 from './imagenes2/producto5.jpg'
import imagen6 from './imagenes2/producto6.jpg'

function TrandingSlider() {
    
  useEffect(() => {
    const script = document.createElement('script');
    script.src = './script.js'; // Reemplaza '/path/to/script.js' con la ruta real de tu archivo JavaScript
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

    return (
      <section id="tranding">
      <div className="container">
        <div className="swiper tranding-slider">
          <div className="swiper-wrapper">

            <div className="swiper-slide tranding-slide">
              <div className="tranding-slide-img">
                <img src={imagen} alt="Tranding"/>
              </div>
              <div className="tranding-slide-content">
                <h1 className="food-price">$20</h1>
                <div className="tranding-slide-content-bottom">
                  <h2 className="food-name">
                    Cama
                  </h2>
                  <h3 className="food-rating">
                    <span>4.5</span>
                    <div className="rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </h3>
                </div>
              </div>
            </div>

            <div className="swiper-slide tranding-slide">
              <div className="tranding-slide-img">
                <img src={imagen2}  alt="Tranding"/>
              </div>
              <div className="tranding-slide-content">
                <h1 className="food-price">$20</h1>
                <div className="tranding-slide-content-bottom">
                  <h2 className="food-name">
                    Juguetes
                  </h2>
                  <h3 className="food-rating">
                    <span>4.5</span>
                    <div className="rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </h3>
                </div>
              </div>
            </div>
         
            <div className="swiper-slide tranding-slide">
              <div className="tranding-slide-img">
                <img src={imagen4}  alt="Tranding"/>
              </div>
              <div className="tranding-slide-content">
                <h1 className="food-price">$40</h1>
                <div className="tranding-slide-content-bottom">
                  <h2 className="food-name">
                    Botella de agua 
                  </h2>
                  <h3 className="food-rating">
                    <span>4.5</span>
                    <div className="rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </h3>
                </div>
              </div>
            </div>
         
            <div className="swiper-slide tranding-slide">
              <div className="tranding-slide-img">
                <img src={imagen3}  alt="Tranding"/>
              </div>
              <div className="tranding-slide-content">
                <h1 className="food-price">$15</h1>
                <div className="tranding-slide-content-bottom">
                  <h2 className="food-name">
                    Comedero
                  </h2>
                  <h3 className="food-rating">
                    <span>4.5</span>
                    <div className="rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </h3>
                </div>
              </div>
            </div>
         
            <div className="swiper-slide tranding-slide">
              <div className="tranding-slide-img">
                <img src={imagen5}  alt="Tranding"/>
              </div>
              <div className="tranding-slide-content">
                <h1 className="food-price">$15</h1>
                <div className="tranding-slide-content-bottom">
                  <h2 className="food-name">
                    Cama
                  </h2>
                  <h3 className="food-rating">
                    <span>4.5</span>
                    <div className="rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </h3>
                </div>
              </div>
            </div>
         
            <div className="swiper-slide tranding-slide">
              <div className="tranding-slide-img">
                <img src={imagen6}  alt="Tranding"/>
              </div>
              <div className="tranding-slide-content">
                <h1 className="food-price">$20</h1>
                <div className="tranding-slide-content-bottom">
                  <h2 className="food-name">
                    Vanilla cake
                  </h2>
                  <h3 className="food-rating">
                    <span>4.5</span>
                    <div className="rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </h3>
                </div>
              </div>
            </div>
         
            <div className="swiper-slide tranding-slide">
              <div className="tranding-slide-img">
                <img src={imagen3}  alt="Tranding"/>
              </div>
              <div className="tranding-slide-content">
                <h1 className="food-price">$8</h1>
                <div className="tranding-slide-content-bottom">
                  <h2 className="food-name">
                    Comedero
                  </h2>
                  <h3 className="food-rating">
                    <span>4.5</span>
                    <div className="rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </h3>
                </div>
              </div>
            </div>
        
          </div>

          <div className="tranding-slider-control">
            <div className="swiper-button-prev slider-arrow">
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div className="swiper-button-next slider-arrow">
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
            <div className="swiper-pagination"></div>
          </div>

        </div>
      </div>
    </section>
    );
}

export default TrandingSlider;