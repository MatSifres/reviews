(function () {
  // Function to inject reviews into the page
  function injectReviews() {
    // Find the spot to inject the reviews
    // Based on your product.tpl, we'll inject after the #single-product div
    const singleProductDiv = document.querySelector('#single-product');
    if (!singleProductDiv) return; // Exit if the element isn't found

    // Create the reviews section
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

    // Inject the reviews section after the #single-product div
    singleProductDiv.parentNode.insertBefore(reviewsSection, singleProductDiv.nextSibling);

    // Add CSS for styling
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
        overflow-x: hidden;
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
      }

      .review {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 15px;
        margin-right: 10px;
        flex: 0 0 20%;
        box-sizing: border-box;
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

      /* Mobile styles for slider */
      @media (max-width: 768px) {
        .reviews-slider {
          overflow-x: auto;
          scroll-snap-type: x mandatory;
        }

        .review {
          flex: 0 0 80%;
          scroll-snap-align: start;
        }
      }
    `;
    document.head.appendChild(style);

    // Add smooth scrolling behavior for the slider
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

  // Run the script when the page loads
  document.addEventListener('DOMContentLoaded', injectReviews);
})();
