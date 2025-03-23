(function () {
  function injectReviews() {
    let singleProductDiv = document.querySelector('#single-product');
    let attempts = 0;
    const maxAttempts = 10;

    // Polling mechanism to wait for the #single-product div
    const interval = setInterval(() => {
      singleProductDiv = document.querySelector('#single-product');
      attempts++;

      if (singleProductDiv || attempts >= maxAttempts) {
        clearInterval(interval);

        // If #single-product is not found, use a fallback (e.g., append to body)
        if (!singleProductDiv) {
          singleProductDiv = document.body;
        }

        const reviewsSection = document.createElement('div');
        reviewsSection.classList.add('reviews-section');
        reviewsSection.innerHTML = `
          <h3>Opiniones de clientes</h3>
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
        `;

        // Inject the reviews section
        if (singleProductDiv === document.body) {
          singleProductDiv.appendChild(reviewsSection);
        } else {
          singleProductDiv.parentNode.insertBefore(reviewsSection, singleProductDiv.nextSibling);
        }

        const style = document.createElement('style');
        style.textContent = `
          .reviews-section {
            margin: 20px 0;
            padding: 0 15px;
          }

          .reviews-section h3 {
            font-size: 1.5em;
            margin-bottom: 15px;
          }

          .reviews-slider {
            display: flex;
            overflow-x: auto;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x mandatory;
            -webkit-scroll-snap-type: x mandatory;
            gap: 10px;
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

          @media (max-width: 768px) {
            .reviews-slider {
              overflow-x: auto;
              scroll-snap-type: x mandatory;
              -webkit-scroll-snap-type: x mandatory;
            }

            .review {
              flex: 0 0 80%;
              scroll-snap-align: start;
            }
          }
        `;
        document.head.appendChild(style);

        const slider = reviewsSection.querySelector('.reviews-slider');
        if (slider) {
          slider.addEventListener('scroll', function () {
            const reviews = slider.querySelectorAll('.review');
            reviews.forEach(review => {
              review.style.transition = 'transform 0.3s ease';
            });
          });
        }
      }
    }, 100); // Check every 100ms
  }

  // Run the script when the page loads or when the DOM changes
  document.addEventListener('DOMContentLoaded', injectReviews);
  // Fallback for dynamic page loads (e.g., if Tiendanube uses AJAX)
  const observer = new MutationObserver((mutations, observer) => {
    if (document.querySelector('#single-product')) {
      injectReviews();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
