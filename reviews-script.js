(function () {
  let hasInjected = false;

  function injectReviews() {
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

        // Check if reviews section already exists in the DOM
        if (document.querySelector('.reviews-section')) {
          console.log('Reviews section already exists in DOM, skipping injection...');
          hasInjected = true;
          return;
        }

        console.log('Injecting reviews section...');

        const reviewsSection = document.createElement('div');
        reviewsSection.classList.add('reviews-section');
        reviewsSection.innerHTML = `
          <h3>¿Qué opinan de nosotros?</h3>
          <div class="reviews-container">
            <div class="reviews-slider">
              <div class="review">
                <div class="stars">★★★★★</div>
                <h4>Amo esta marca</h4>
                <p>Los productos son de excelente calidad, únicos, elegantes y cancheros. Los aritos que tengo hace ya 4 años siguen dorados.</p>
                <p class="reviewer">Cecilia Aguilar<br>3 días atrás</p>
              </div>
              <div class="review">
                <div class="stars">★★★★★</div>
                <h4>Hermosos</h4>
                <p>Muy buena calidad y es hermoso. Soy alérgica a todos así que los compré con miedo y no tuve problema!</p>
                <p class="reviewer">Luisa Aguirre<br>Aros Aria Gold</p>
              </div>
              <div class="review">
                <div class="stars">★★★★★</div>
                <h4>Muy lindo el collar</h4>
                <p>Me encanta comprarles, consumo sus productos desde 2021. La relación precio calidad es buena, ni hablar del diseño que es una locura.</p>
                <p class="reviewer">Estefania Giorgis<br>Collar Blair Gold</p>
              </div>
              <div class="review">
                <div class="stars">★★★★★</div>
                <h4>Buena experiencia</h4>
                <p>Todo es un 10/10. La excelente atención desde que una inicia la compra, si hay un inconveniente son resolutivos y jamás se pierda la amabilidad y cortesía durante todo el proceso de compra.</p>
                <p class="reviewer">Adriana Monteresino<br>Aros Nova Silver</p>
              </div>
              <div class="review">
                <div class="stars">★★★★★</div>
                <h4>Me encantó el anillo</h4>
                <p>Muchas gracias por su recomendación, buscaba un anillo específico y me ofrecieron uno similar. Lo uso todos los días y está impecable.</p>
                <p class="reviewer">Silvia Luna Ocampo<br>Anillo Ayra Gold</p>
              </div>
            </div>
            <div class="pagination-dots"></div>
          </div>
        `;

        if (singleProductDiv === document.body) {
          singleProductDiv.appendChild(reviewsSection);
        } else {
          singleProductDiv.parentNode.insertBefore(reviewsSection, singleProductDiv.nextSibling);
        }

        hasInjected = true;
        console.log('Reviews section injected successfully');

        const style = document.createElement('style');
        style.textContent = `
          .reviews-section {
            margin: 20px 0;
            padding: 0 15px;
            display: block !important;
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
          }

          .reviews-section h3 {
            font-size: 1.5em;
            margin-bottom: 15px;
            color: #333;
          }

          .reviews-container {
            position: relative;
            width: 100%;
            overflow: hidden;
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
            padding: 0 15px;
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

          .pagination-dots {
            display: none;
            text-align: center;
            margin-top: 15px;
          }

          .pagination-dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            margin: 0 4px;
            background: #ddd;
            border-radius: 50%;
            cursor: pointer;
            transition: background 0.3s ease, width 0.3s ease;
          }

          .pagination-dot.active {
            background: #333;
            width: 16px;
            border-radius: 4px;
          }

          @media (max-width: 768px) {
            .reviews-section {
              padding: 0 10px;
            }

            .reviews-slider {
              overflow-x: auto !important;
              scroll-snap-type: x mandatory;
              -webkit-scroll-snap-type: x mandatory;
              padding: 0 30px;
            }

            .review {
              flex: 0 0 calc(100% - 90px) !important;
              scroll-snap-align: start;
              margin-right: 10px;
            }

            .pagination-dots {
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
        const paginationDotsContainer = reviewsSection.querySelector('.pagination-dots');
        const reviews = reviewsSection.querySelectorAll('.review');

        // Add pagination dots
        if (paginationDotsContainer && reviews.length > 0) {
          reviews.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('pagination-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
              slider.scrollTo({ left: index * (slider.offsetWidth - 60), behavior: 'smooth' });
            });
            paginationDotsContainer.appendChild(dot);
          });
        }

        if (slider) {
          console.log('Slider found, adding event listeners');

          // Update pagination dots on scroll
          slider.addEventListener('scroll', () => {
            const reviews = slider.querySelectorAll('.review');
            reviews.forEach(review => {
              review.style.transition = 'transform 0.3s ease';
            });

            // Calculate the current review index based on scroll position
            const scrollLeft = slider.scrollLeft;
            const reviewWidth = slider.offsetWidth - 60; // Adjust for padding
            const currentIndex = Math.round(scrollLeft / reviewWidth);

            // Update active dot
            const dots = paginationDotsContainer.querySelectorAll('.pagination-dot');
            dots.forEach((dot, index) => {
              dot.classList.toggle('active', index === currentIndex);
            });
          });
        } else {
          console.log('Slider not found');
        }
      }
    }, 100);
  }

  // Ensure the MutationObserver stops after injection
  const observer = new MutationObserver((mutations, observer) => {
    if (document.querySelector('#single-product') && !hasInjected) {
      console.log('MutationObserver triggered, injecting reviews...');
      injectReviews();
      observer.disconnect(); // Stop observing after injection
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Add event listener for DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired, attempting to inject reviews...');
    injectReviews();
  });
})();
