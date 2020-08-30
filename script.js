'use strict';

/* jQuery(function(){

	(function($){
		*/

window.onload = function() {
  lax.setup(); // init

  const updateLax = () => {
    lax.update(window.scrollY);
    window.requestAnimationFrame(updateLax);
  };

  window.requestAnimationFrame(updateLax);


  /*
			//watch for content dom update
			var contentDom = new MutationObserver(reloadPRLX);
			contentDom.observe(document.querySelector('.article-content'), {
				subtree: true,
				attributes: true,
				characterData: true
			});

			function reloadPRLX(e) {
				//console.log(e);

				if(!e[0].target.classList.contains('prlx__image')) {
					console.log('update prlx')
					//lax.updateElements()
				}
				//console.log(4545)
			}
			*/
};

/*
		window.addEventListener("resize", function() {
			lax.updateElements()
		});
		*/
/*
		let w = window.innerWidth
		window.addEventListener("resize", function() {
			if(w !== window.innerWidth) {
				lax.updateElements()
				lax.populateElements()
			}
		});
		*/
/*
	})( jQuery );

})*/

document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.prlx.prlx-swiper').forEach((el)=>{
    const thisSwiper = el.innerHTML;
    // console.log(thisSwiper);
    const first = el.querySelector('.prlx__image__swipe.first');
    const swiperCount = el.dataset.count;
    // console.log(swiperCount);
    let maxHeight = 0;

    const imagesLoadedProsises = [];
    el.querySelectorAll('.prlx__image__swipe')
        .forEach((el)=>{
          imagesLoadedProsises.push(

              new Promise((resolve, reject)=>{
                const imgLoad = imagesLoaded( el );
                // bind with .on()

                function onAlways( instance ) {
                  maxHeight = (maxHeight < el.offsetHeight) ?
							el.offsetHeight : maxHeight;
                  // console.log(maxHeight);
                  resolve(el.offsetHeight);
                };
                imgLoad.on( 'always', onAlways );
                // console.log(el.offsetHeight);
              }));
        });


    Promise.all(imagesLoadedProsises).then((slideHeight) => {
      console.log('slideHeight: ' + slideHeight);
      console.log('Max height: ' + maxHeight);
      el.style.height = maxHeight + 'px';
      el.style.overflow = 'hidden';


      el.querySelector('.prlx__image__swipe:nth-last-child(1)')
          .classList.add('active');

      window.addEventListener('scroll', function() {
        const range = window.innerHeight - first.offsetHeight;
        const swiperHeight = range / swiperCount;
        const fromTop = el.getBoundingClientRect().top;
        // console.log(el);
        // console.log(fromTop);

        // console.log(fromTop / swiperHeight);

        // console.log(Math.round(fromTop / swiperHeight));

        function hideAll() {
          el.querySelectorAll('.prlx__image__swipe').forEach((el)=>{
            el.classList.remove('active');
          });
        }

        // console.log(Math.round(fromTop / swiperHeight) > (swiperCount+1));
        if (
          Math.round(fromTop / swiperHeight) > -1 &&
					Math.round(fromTop / swiperHeight) < (swiperCount+1)
        ) {
          const elSwipe = el.querySelector('.prlx__image__swipe:nth-child(' + (Math.round(fromTop / swiperHeight)+1) + ')');

          // console.log(elSwipe);


          if (elSwipe !== null) {
            hideAll();
            elSwipe.classList.add('active');
          }
        } else if (Math.round(fromTop / swiperHeight) > (swiperCount+1)) {
          hideAll();
          el.querySelector('.prlx__image__swipe:nth-last-child(1)')
              .classList.add('active');
        } else {
          hideAll();
          el.querySelector('.prlx__image__swipe:nth-child(1)')
              .classList.add('active');
        }
      });
    },
    );
  });
});

