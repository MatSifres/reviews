(function () {
  let hasInjectedReviews = false;
  let hasInjectedBanner = false;

  // Función para verificar si estamos en una página de producto
  function isProductPage() {
    const currentUrl = window.location.pathname;
    const isProduct = currentUrl.includes('/productos/');
    console.log(`Checking if on product page: ${currentUrl} - Is product page: ${isProduct}`);
    return isProduct;
  }

  // Inyectar los estilos al inicio para que estén disponibles inmediatamente
  const style = document.createElement('style');
  style.textContent = `
    /* Estilos para el cartel */
    .promo-banner {
      background-color: #FFF9C4;
      color: #333;
      padding: 10px 15px;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 10px;
      max-width: 100%;
      box-sizing: border-box;
    }

    .promo-banner p {
      margin: 0;
      font-size: 1.1em;
      font-weight: 500;
      line-height: 1.2;
    }

    .promo-banner .countdown {
      display: inline;
      font-weight: 700;
    }

    /* Estilos para las reseñas */
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

  // Función para calcular el tiempo restante hasta las 00:00 de Argentina (GMT-3)
  function getTimeRemaining() {
    // Obtener la fecha y hora actual en UTC
    const now = new Date();
    
    // Convertir a GMT-3 (Argentina)
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60 * 1000); // Convertir a UTC
    const argentinaTime = new Date(utcTime - (3 * 60 * 60 * 1000)); // Ajustar a GMT-3

    // Obtener la fecha de mañana a las 00:00 en Argentina
    const tomorrow = new Date(argentinaTime);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Medianoche del próximo día

    // Calcular la diferencia en milisegundos
    const timeDiff = tomorrow - argentinaTime;

    // Convertir a horas, minutos y segundos
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    };
  }

  // Función para actualizar el contador
  function updateCountdown() {
    const countdownElement = document.querySelector('.promo-banner .countdown');
    if (countdownElement) {
      const { hours, minutes, seconds } = getTimeRemaining();
      countdownElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
  }

  // Función para inyectar las reseñas
  function injectReviews() {
    if (hasInjectedReviews) {
      console.log('Reviews already injected, skipping...');
      return;
    }

    if (!isProductPage()) {
      console.log('Not on a product page, skipping reviews injection...');
      hasInjectedReviews = true;
      return;
    }

    console.log('Attempting to inject reviews...');

    let singleProductDiv = document.querySelector('#single-product');
    let attempts = 0;
    const maxAttempts = 30;

    const interval = setInterval(() => {
      singleProductDiv = document.querySelector('#single-product');
      attempts++;

      console.log(`Attempt ${attempts}: singleProductDiv found: ${!!singleProductDiv}`);

      if (singleProductDiv || attempts >= maxAttempts) {
        clearInterval(interval);

        if (!singleProductDiv) {
          console.log('singleProductDiv not found after max attempts, cannot inject reviews');
          hasInjectedReviews = true;
          return;
        }

        if (document.querySelector('.reviews-section')) {
          console.log('Reviews section already exists in DOM, skipping injection...');
          hasInjectedReviews = true;
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

        singleProductDiv.parentNode.insertBefore(reviewsSection, singleProductDiv.nextSibling);

        hasInjectedReviews = true;
        console.log('Reviews section injected successfully');

        const slider = reviewsSection.querySelector('.reviews-slider');
        const paginationDotsContainer = reviewsSection.querySelector('.pagination-dots');
        const reviews = reviewsSection.querySelectorAll('.review');

        if (paginationDotsContainer && reviews && reviews.length > 0) {
          reviews.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('pagination-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
              slider.scrollTo({ left: index * (slider.offsetWidth - 60), behavior: 'smooth' });
            });
            paginationDotsContainer.appendChild(dot);
          });

          slider.addEventListener('scroll', () => {
            const reviews = slider.querySelectorAll('.review');
            reviews.forEach(review => {
              review.style.transition = 'transform 0.3s ease';
            });

            const scrollLeft = slider.scrollLeft;
            const reviewWidth = slider.offsetWidth - 60;
            const currentIndex = Math.round(scrollLeft / reviewWidth);

            const dots = paginationDotsContainer.querySelectorAll('.pagination-dot');
            dots.forEach((dot, index) => {
              dot.classList.toggle('active', index === currentIndex);
            });
          });
        } else {
          console.log('Slider or pagination dots container not found');
        }
      }
    }, 100);
  }

  // Función para inyectar el cartel
  function injectBanner() {
    if (hasInjectedBanner) {
      console.log('Banner already injected, skipping...');
      return;
    }

    if (!isProductPage()) {
      console.log('Not on a product page, skipping banner injection...');
      hasInjectedBanner = true;
      return;
    }

    console.log('Attempting to inject banner...');

    let addToCartButton = document.querySelector('.js-addtocart');
    let attempts = 0;
    const maxAttempts = 30;

    const interval = setInterval(() => {
      addToCartButton = document.querySelector('.js-addtocart');
      attempts++;

      console.log(`Attempt ${attempts}: addToCartButton found: ${!!addToCartButton}`);

      if (addToCartButton || attempts >= maxAttempts) {
        clearInterval(interval);

        if (!addToCartButton) {
          console.log('Add to cart button not found after max attempts, cannot inject banner');
          hasInjectedBanner = true;
          return;
        }

        if (document.querySelector('.promo-banner')) {
          console.log('Promo banner already exists in DOM, skipping injection...');
          hasInjectedBanner = true;
          return;
        }

        console.log('Injecting promo banner...');

        const banner = document.createElement('div');
        banner.classList.add('promo-banner');
        banner.innerHTML = `
          <p>Sólo por hoy: 20% de descuento y un par de aros de regalo. <br>Te quedan <span class="countdown">00:00:00</span> para aprovechar la promoción.<br></p>
        `;

        addToCartButton.parentNode.insertBefore(banner, addToCartButton);

        hasInjectedBanner = true;
        console.log('Promo banner injected successfully');

        // Iniciar el contador regresivo
        updateCountdown();
        setInterval(updateCountdown, 1000);
      }
    }, 100);
  }

  // Configurar el MutationObserver para ambas inyecciones
  const observer = new MutationObserver((mutations, observer) => {
    if (!isProductPage()) {
      console.log('Not on a product page, disconnecting observer...');
      observer.disconnect();
      return;
    }

    if (document.querySelector('#single-product') && !hasInjectedReviews) {
      console.log('MutationObserver triggered, injecting reviews...');
      injectReviews();
    }
    if (document.querySelector('.js-addtocart') && !hasInjectedBanner) {
      console.log('MutationObserver triggered, injecting banner...');
      injectBanner();
    }
    if (hasInjectedReviews && hasInjectedBanner) {
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Ejecutar ambas funciones al cargar la página
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired, checking if on product page...');
    if (isProductPage()) {
      injectReviews();
      injectBanner();
    } else {
      console.log('Not on a product page, skipping injection...');
    }
  });

  // Ejecutar inmediatamente en caso de que el DOM ya esté cargado
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('DOM already loaded, checking if on product page...');
    if (isProductPage()) {
      injectReviews();
      injectBanner();
    } else {
      console.log('Not on a product page, skipping injection...');
    }
  }
})();
