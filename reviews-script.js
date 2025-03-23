(function () {
  let hasInjected = false; // Flag to prevent multiple injections

  function injectReviews() {
    // If already injected, exit to prevent duplicates
    if (hasInjected) {
      console.log('Reviews already injected, skipping...');
      return;
    }

    console.log('Attempting to inject reviews...');

    let singleProductDiv = document.querySelector('#single-product');
    let attempts = 0;
    const maxAttempts = 20;

    const interval = setInterval(() => {
      singleProductDiv = document.querySelector('#single-product');
      attempts++;

      console.log(`Attempt ${attempts}: singleProductDiv found: ${!!singleProductDiv}`);

      if (singleProductDiv || attempts >= maxAttempts) {
        clearInterval(interval);

        if (!singleProductDiv) {
          console.log('singleProductDiv not found, using fallback injection point');
          singleProductDiv = document.querySelector('.js-product-container') || document.body;
        }

        console.log('Injecting reviews section...');

        const reviewsSection = document.createElement('div');
        reviewsSection.classList.add('reviews-section');
        reviewsSection.innerHTML = `
          <h3>Opiniones de clientes</h3>
          <div class="reviews-container">
            <button class="slider-arrow slider-arrow-left" aria-label="Previous review">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
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
            <button class="slider-arrow slider-arrow-right" aria-label="Next review">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        `;

        if (singleProductDiv === document.body) {
          singleProductDiv.appendChild(reviewsSection);
        } else {
          singleProductDiv.parentNode.insertBefore(reviewsSection, singleProductDiv.nextSibling);
        }

        hasInjected = true; // Set flag to prevent further injections
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
            color: #333;
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
            background: #fff;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }

          .stars {
            color: #f5c518;
            font-size: 1.2em;
            margin-bottom: 5px;
          }

          .review h4 {
            font-size: 1.1em;
            margin: 5px 0;
            color: #333;
          }

          .review p {
            font-size: 0.9em;
            margin: 5px 0;
            color: #666;
          }

          .reviewer {
            font-style: italic;
            color: #999;
            font-size: 0.85em;
          }

          .slider-arrow {
            display: none;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: #ffffff;
            color: #333;
            border: 1px solid #ddd;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            padding: 0;
            cursor: pointer;
            z-index: 10;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            transition: background 0.3s ease, transform 0.3s ease;
          }

          .slider-arrow:hover,
          .slider-arrow:focus {
            background: #f5f5f5;
            transform: translateY(-50%) scale(1.1);
          }

          .slider-arrow:active {
            transform: translateY(-50%) scale(0.95);
          }

          .slider-arrow svg {
            width: 20px;
            height: 20px;
            display: block;
            margin: 0 auto;
          }

          .slider-arrow-left {
            left: 10px;
          }

          .slider-arrow-right {
            right: 10px;
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
              display: flex;
              align-items: center;
              justify-content: center;
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
    if (document.querySelector('#single-product') && !hasInjected) {
      injectReviews();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
