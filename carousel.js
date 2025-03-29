const track= document.querySelector('.carousel-track');
const slides= Array.from(track.children);
const nextButton= document.querySelector('.nextButton');
const prevButton=document.querySelector('.prevButton');
const nav =document.querySelector('.carousel-nav');
const slideWidth= slides[0].getBoundingClientRect().width;

const setSliderPosition =(slide,index)=>{
    slide.style.left=slideWidth* index +'px';
};
slides.forEach(setSliderPosition);

const moveToSlide= (track,currentSlide, targetSlide) =>{
    track.style.transofrom ='translareX(-'+targetSlide.style.left+')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
};

const createNavDots=()=>{
    slides.forEach((_,index)=>{
        const dot= document.createElement('button');
        dot.classList.add('carousel-dot');
        dot.setAttribute('aria-label', `go to slide ${index +1}`);
        nav.appendChild(dot);
    });
};
createNavDots();
            
const dots =Array.from(nav.children);

// Update dot appearance
const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('active');
  targetDot.classList.add('active');
};

// Set the first dot as active
dots[0].classList.add('active');

// Event listeners for buttons
prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = nav.querySelector('.active');
  const prevDot = currentDot.previousElementSibling;

  if (prevSlide) {
    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
  }
});

nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = nav.querySelector('.active');
  const nextDot = currentDot.nextElementSibling;

  if (nextSlide) {
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
  }
});

// Event listeners for dots
nav.addEventListener('click', e => {
  const targetDot = e.target.closest('button');

  if (!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = nav.querySelector('.active');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
});

// Set the first slide as current
slides[0].classList.add('current-slide');