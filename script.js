// script.js
// Currently minimal: feature-detect prefers-reduced-motion and provide simple accessibility hook
document.addEventListener('DOMContentLoaded', function(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(prefersReduced){
    // if user prefers reduced motion, ensure heart animation is off via attribute
    document.querySelectorAll('.heart').forEach(h=> h.style.animation = 'none');
  }
  
  // Add touch/click pulse: quick stronger beat when user taps or clicks the heart
  const heart = document.querySelector('.heart');
  if(heart && !prefersReduced){
    const doPulse = ()=>{
      // Add pulse class which triggers a short animation; remove after it ends
      if(heart.classList.contains('pulse')) return; // debounce
      heart.classList.add('pulse');
      // remove class after animation duration (slightly longer than pulse animation)
      setTimeout(()=> heart.classList.remove('pulse'), 420);
    };

    // Use pointerdown so it works for touch and mouse
    heart.addEventListener('pointerdown', doPulse);
    // Also allow keyboard Enter/Space to trigger pulse for accessibility
    heart.setAttribute('tabindex','0');
    heart.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); doPulse() }
    });
  }
});
