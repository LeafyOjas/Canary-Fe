import * as THREE from 'three';
import gsap from 'gsap';
import { CSSRulePlugin } from 'gsap/all';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { section3Features } from './scripts/section3Features';
import { programFeaturesContent } from './scripts/programFeaturesContent';
import { aboutUs } from './scripts/aboutus';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, CSSRulePlugin);

ScrollSmoother.create({
  wrapper: ".wrapper",       
  content: ".container",  
  smooth: 1.5,        
  effects: true           
});


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(new THREE.Color('#21282a'), 1)
renderer.domElement.classList.add('three-canvas');
document.body.appendChild(renderer.domElement);

// Load a guaranteed working particle sprite
const particleTexture = new THREE.TextureLoader().load('/dot.png');

const particleCount = 5000;
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < positions.length; i++) {
  positions[i] = (Math.random() - 0.5) * (Math.random() * 5); // cube of size 1
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

let startColor = new THREE.Color(0xFFFFFF); // yellow
let endColor = new THREE.Color(0xFFA500);   // orange
let t = 0; // interpolation factor (0 → 1)
let direction = 1;
const geometry = new THREE.TorusGeometry(1, 0.3, 16, 100)
const spheregeometry = new THREE.SphereGeometry(
  1, 32, 32
);
const material1 = new THREE.PointsMaterial({
  size: 0.01,
  color: 0xFFFFFF,

});
const material = new THREE.PointsMaterial({
  size: 0.01,
  color: 0xFFFFFF,
  map: particleTexture,
  transparent: true,
  alphaTest: 0.01,    
  depthWrite: false,
  blending: THREE.AdditiveBlending,

});

const pointsLight = new THREE.PointLight(0xffffff, 1);
pointsLight.position.x = 2;
pointsLight.position.y = 3;
pointsLight.position.z = 4;

const cube = new THREE.Points(geometry, material1);
const particle = new THREE.Points(particlesGeometry, material)
scene.add(cube, particle);
scene.add(pointsLight)


let clientX = 0, clientY = 0;

const mouseMove = (event) => {
  clientX = event.clientX;
  clientY = event.clientY;
}

const clock = new THREE.Clock()
document.addEventListener('mousemove', mouseMove)
function animate() {
  requestAnimationFrame(animate);
  const deltaTime = clock.getDelta();
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  particle.rotation.y -= (((clientX + 100) * 0.0006) * deltaTime)
  particle.rotation.x -= (((clientY + 100) * 0.0006) * deltaTime)

  pointsLight.position.x = clientX * 3;
  pointsLight.position.y = clientY * 3;
  pointsLight.position.z = 2;


  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const renderTitle = () => {
  const title = document.querySelector('.title');
  const paragraph = document.querySelector('.para');
  const aboutUsTitle = document.querySelector('.about-title')

  programFeaturesContent()
  section3Features()
  aboutUs()

  const borderCssRules = CSSRulePlugin.getRule('.content::before')
  const tl = gsap.timeline();
  tl.from(borderCssRules, { delay: .5, duration: 4, cssRule: { scaleX: 0 } })
  tl.to(title, { duration: 2, clipPath: 'polygon(0 0  ,100% 0 , 100% 100% ,  0 100%)' }, "-=3")
  tl.to(paragraph, { duration: 2, clipPath: 'polygon(0 0  ,100% 0 , 100% 100% ,  0 100%)' }, "-=3")

  gsap.to(".c1", {
    rotation: "+=120",        
    scrollTrigger: {
      trigger: ".section2",    
      start: "top 50%",  
      end: "bottom 5%", 
      scrub: true,  
    },
  });

  gsap.to(".c2", {
    rotation: "-=120",        
    scrollTrigger: {
      trigger: ".section2",   
      start: "top 40%",  
      end: "bottom 0%",  
      scrub: true,        
    }
  });


  const fill = document.querySelector(".timeline-fill");
  const black_circle_container = document.querySelector(".black-circle-container");

  const dots = gsap.utils.toArray(".tc");
  const timelineWrapper = document.querySelector(".timeline");
  const timelineHeight = timelineWrapper.offsetHeight;

 
  dots.forEach(dot => {
    const topPx = parseFloat(getComputedStyle(dot).top);
    dot.dataset.fraction = topPx / timelineHeight;
  });

  gsap.to(black_circle_container , {
    y: 500,
    scrollTrigger:{
      trigger: timelineWrapper,
      start: "top top",
      end: "bottom 20%",
      scrub: true,
    }
  })

  gsap.to(aboutUsTitle , {
    y: 1200,
    scrollTrigger:{
      trigger: '.about_us',
      start: "top top",
      end: "bottom 20%",
      scrub: true,
    }
  })

  gsap.to(fill, {
    height: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: timelineWrapper,
      start: "top top",
      end: "bottom 50%",
      scrub: true,
      onUpdate: self => {
        const progress = self.progress;
        dots.forEach(dot => {
          const dotFraction = parseFloat(dot.dataset.fraction) - 0.001;
          dot.style.backgroundColor = progress >= dotFraction ? "#000" : "#ccc";
          dot.style.width = progress >= dotFraction ? "10px" : "6px";
          dot.style.height = progress >= dotFraction ? "10px" : "6px";
          dot.style.transform = `translateX(${progress >= dotFraction ? "-50%" : "-40%"})`;
        });
      },
    }
  });


  gsap.utils.toArray(".program_feature_item").forEach((item) => {
    gsap.to(item, {
      opacity: 1, // fully visible in center
      ease: "none",
      scrollTrigger: {
        trigger: item,
        start: "top 80%",   // starts fading in when 80% down viewport
        end: "bottom 20%",  // starts fading out when 20% from bottom
        scrub: true,
        onUpdate: (self) => {
          // Use progress to create a smooth fade in/out curve
          const fadeIn = self.progress < 0.5 ? self.progress * 2 : (1 - self.progress) * 2;
          item.style.opacity = fadeIn;
        },
      },
    });
  });

}

document.addEventListener('DOMContentLoaded', renderTitle)
