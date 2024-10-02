import ScrambleText from 'scramble-text'
import gsap from 'gsap'


function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

gsap.set(document.querySelectorAll('.dummy__print path'), {
		scale: 0,
		rotate: `${randomIntFromInterval(20, 180)}deg`,
		transformOrigin: '50% 50%',
	})


window.addEventListener('load', function(){
	document.documentElement.classList.add('_page-loaded')
	
	const chars = [
					'@', '#', '$', '%', '£', '&', '*', '§', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',]

	
	gsap.to('.dummy__body', {
		opacity: 1,
		translateY: 0,
		duration: 1.5,
		delay: 0.3,
		ease: "power3.out",
		onStart: () => {
			if (document.getElementById( 'dummy-title')) {
				const element = document.getElementById( 'dummy-title');
				
				new ScrambleText( element, {timeOffset : 150, chars} ).start().play();
			}
		},
		
	})
	gsap.to('.dummy__text-content', {
		opacity: 1,
		translateY: 0,
		scale: 1,
		duration: 1.3,
		stagger: 0.5,
		delay: 2,
		ease: "power3.out",
	})

	
	gsap.to('.dummy', {
		'--w1': '50rem',
		'--h1': '18rem',
		'--h2': 'calc(100% - 2rem)',
		duration: 3,
		delay: 1.3,
		ease: "power3.out",
		onComplete: () => {
			gsap.to('.dummy', {
				'--w2': '2rem',
				duration: 1.5,
				ease: "power3.out",
			})
		}
	})
	
	gsap.to(document.querySelectorAll('.dummy__print path'), {
		scale: 1,
		rotate: 0,
		duration: 3,
		stagger: 0.05,
		ease: "power3.out",
		
		delay: 1.3,
	})
	
})
