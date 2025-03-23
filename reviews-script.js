(function () {
  function injectReviews() {
    console.log('Attempting to inject reviews...');

    let singleProductDiv = document.querySelector('#single-product');
    let attempts = 0;
    const maxAttempts = 20; // Increased attempts for mobile

    const interval = setInterval(() => {
      singleProductDiv = document.querySelector('#single-product');
      attempts++;

      console.log(`Attempt ${attempts}: singleProductDiv found: ${!!singleProductDiv}`);

      if (singleProductDiv || attempts >= maxAttempts) {
        clearInterval(interval);

        if (!singleProductDiv) {
          console.log('singleProductDiv not found, using fallback injection point');
          // Fallback: Look for a common product page element or use document.body
          singleProductDiv = document.querySelector('.js-product-container') || document.body;
        }

        console.log('Injecting reviews section...');

        const reviewsSection = document.createElement('div');
        reviewsSection.classList.add('reviews-section');
        reviewsSection.innerHTML = `
          <h3>Opiniones de clientes</h3>
          <div class="reviews-container">
            <button class="slider-arrow slider-arrow-left" aria-label="Previous review">❮</button>
            <div class="reviews-slider">
              <div class="review">
                <div class="stars">★★★★★</div>
                <h4>Perfecto</h4>
                <p>Hermosos, no me causan alergia y la verdad que son de excelente calidad</p>
                <p class="reviewer">Marcela<br>3 días atrás</p>
              </div>
              <div class="review">
                <div class="stars">★★★★★</div>
                <h4>Hermosos</h4>
                <p>Hermosos los aros, no producen reacción alérgica y son de excelente calidad</p>
                <p class="reviewer">Adriana Sartori<br>Aros Emilia Gold</p>
              </div>
              <div class="review">
                <div class="stars">★★★★★</div>
                <h4>Divino</h4>
                <p>Muy buena calidad y es hermoso. Soy alérgica a todos así que los compré con miedo y no tuve problema!</p>
                <p class="reviewer">Estefania Giorgis<br>Buenos Aires, Argentina</p>
              </div>
              <div class="review">
                <div class="stars">★★★★★</div>
                <h4>Calidad</h4>
                <p>Hermosos, no me dejaron la oreja roja y son de gran calidad!</p>
                <p class="reviewer">Adriana Monteresino<br>Aros Conie Silver</p>
              </div>
              <div class="review">
                <div class="stars">★★★★★</div>
                <h4>Hermoso</h4>
                <p>Gracias me encantó el collar era lo q estaba buscando, que no me cause alergia y q quede bien con un jean y camisa o con algo más de vestir. Hermoso.</p>
                <p class="reviewer">Silvia Luna Ocampo<br>Collar Luna Gold</p>
              </div>
            </div>
            <button class="slider-arrow slider-arrow-right" aria-label="Next review">❯</button>
          </div>
        `;

        if (singleProductDiv === document.body) {
          singleProductDiv.appendChild(reviewsSection);
        } else {
          singleProductDiv.parentNode.insertBefore(reviewsSection, singleProductDiv.nextSibling);
        }

        console.log('Reviews section injected');

        const style = document.createElement('style');
        style.textContent = `
          .reviews-section {
            margin: 20px 0;
            padding: 0 15px;
            display: block !important;
          }

          .reviews-section h3 {
            font-size: 1.5em;
            margin-bottom: 15px;
          }

          .reviews-container {
            position: relative;
            width: 100%;
          }

          .reviews-slider {
            display: flex !important;
            overflow-x: auto !important;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x mandatory;
            -webkit-scroll-snap-type: x mandatory;
            gap: 10px;
            width: 100%;
            -webkit-user-select: none;
            user-select: none;
          }

          .review {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            flex: 0 0 20%;
            box-sizing: border-box;
            scroll-snap-align: start;
          }

          .stars {
            color: #f5c518;
            font-size: 1.2em;
            margin-bottom: 5px;
          }

          .review h4 {
            font-size: 1.1em;
            margin: 5px 0;
          }

          .review p {
            font-size: 0.9em;
            margin: 5px 0;
          }

          .reviewer {
            font-style: italic;
            color: #666;
          }

          .slider-arrow {
            display: none;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            padding: 10px;
            cursor: pointer;
            z-index: 10;
            font-size: 1.5em;
          }

          .slider-arrow-left {
            left: 0;
          }

          .slider-arrow-right {
            right: 0;
          }

          @media (max-width: 768px) {
            .reviews-slider {
              overflow-x: auto !important;
              scroll-snap-type: x mandatory;
              -webkit-scroll-snap-type: x mandatory;
            }

            .review {
              flex: 0 0 80% !important;
              scroll-snap-align: start;
            }

            .slider-arrow {
              display: block;
            }
          }

          @supports not (scroll-snap-type: x mandatory) {
            .reviews-slider {
              overflow-x: scroll !important;
            }

            .review {
              margin-right: 10px;
            }
          }
        `;
        document.head.appendChild(style);

        const slider = reviewsSection.querySelector('.reviews-slider');
        const leftArrow = reviewsSection.querySelector('.slider-arrow-left');
        const rightArrow = reviewsSection.querySelector('.slider-arrow-right');

        if (slider) {
          console.log('Slider found, adding event listeners');
          slider.addEventListener('scroll', function () {
            const reviews = slider.querySelectorAll('.review');
            reviews.forEach(review => {
              review.style.transition = 'transform 0.3s ease';
            });
          });

          leftArrow.addEventListener('click', () => {
            slider.scrollBy({ left: -slider.offsetWidth * 0.8, behavior: 'smooth' });
          });

          rightArrow.addEventListener('click', () => {
            slider.scrollBy({ left: slider.offsetWidth * 0.8, behavior: 'smooth' });
          });
        } else {
          console.log('Slider not found');
        }
      }
    }, 100);
  }

  document.addEventListener('DOMContentLoaded', injectReviews);
  const observer = new MutationObserver((mutations, observer) => {
    if (document.querySelector('#single-product')) {
      injectReviews();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
