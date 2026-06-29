// Iron Temple Gym - JavaScript File

document.addEventListener('DOMContentLoaded', () => {
  // --- Header Scroll Effect ---
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Menu Toggle ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-links a');

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
    
    // Toggle hamburger icon animation
    const spans = mobileToggle.querySelectorAll('span');
    if (mobileToggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileToggle.classList.remove('active');
      const spans = mobileToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // --- Active Navigation Link on Scroll ---
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let currentSectionId = 'hero';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120; // adjust offset for header height
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // --- Reveal on Scroll ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Stop observing after animation triggers
      }
    });
  }, {
    threshold: 0.15 // trigger when 15% of the element is visible
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // --- Contact Form Submission & WhatsApp Forwarding ---
  const contactForm = document.getElementById('gym-contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const goalSelect = document.getElementById('form-goal');
      const goalText = goalSelect.options[goalSelect.selectedIndex].text;
      const message = document.getElementById('form-message').value;
      
      // WhatsApp redirection logic
      const whatsappBaseUrl = 'https://wa.me/1234567890';
      const promptText = `Hi Iron Temple Gym! I just submitted an inquiry on your site:\n\n*Name:* ${name}\n*Email:* ${email}\n*Fitness Goal:* ${goalText}\n*Message:* ${message}`;
      const encodedText = encodeURIComponent(promptText);
      const finalWhatsappUrl = `${whatsappBaseUrl}?text=${encodedText}`;

      // Custom alert and redirection choice
      const alertBox = document.createElement('div');
      alertBox.style.position = 'fixed';
      alertBox.style.top = '50%';
      alertBox.style.left = '50%';
      alertBox.style.transform = 'translate(-50%, -50%)';
      alertBox.style.background = 'var(--bg-secondary)';
      alertBox.style.border = '1px solid var(--accent-color)';
      alertBox.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.5)';
      alertBox.style.padding = '2rem';
      alertBox.style.borderRadius = '8px';
      alertBox.style.zIndex = '1000';
      alertBox.style.textAlign = 'center';
      alertBox.style.maxWidth = '400px';
      alertBox.style.width = '90%';

      alertBox.innerHTML = `
        <h4 style="color: #ff5400; font-family: 'Space Grotesk', sans-serif; font-size: 1.5rem; margin-bottom: 1rem; text-transform: uppercase;">Enquiry Received!</h4>
        <p style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 1.5rem;">Would you like to also send this message directly via WhatsApp for faster support?</p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <button id="whatsapp-redirect-confirm" style="background: #25d366; color: #000; font-weight: 700; padding: 0.75rem 1.5rem; border-radius: 4px; cursor: pointer; text-transform: uppercase; font-size: 0.85rem;">Send to WhatsApp</button>
          <button id="whatsapp-redirect-cancel" style="background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.1); font-weight: 700; padding: 0.75rem 1.5rem; border-radius: 4px; cursor: pointer; text-transform: uppercase; font-size: 0.85rem;">Just Close</button>
        </div>
      `;

      document.body.appendChild(alertBox);

      // Disable scrolling when dialog is open
      document.body.style.overflow = 'hidden';

      document.getElementById('whatsapp-redirect-confirm').addEventListener('click', () => {
        window.open(finalWhatsappUrl, '_blank');
        closeAlert();
      });

      document.getElementById('whatsapp-redirect-cancel').addEventListener('click', () => {
        closeAlert();
      });

      function closeAlert() {
        document.body.removeChild(alertBox);
        document.body.style.overflow = '';
        contactForm.reset();
      }
    });
  }

  // --- Three.js 3D Dumbbell Animation ---
  const initThreeDumbbell = () => {
    const container = document.getElementById('canvas-3d-container');
    if (!container || typeof THREE === 'undefined') return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group
    const dumbbell = new THREE.Group();

    // Materials
    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 0.95,
      roughness: 0.15,
    });

    const plateMaterial = new THREE.MeshStandardMaterial({
      color: 0x151515,
      metalness: 0.8,
      roughness: 0.35,
    });

    const textAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xff5400,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0xff5400,
      emissiveIntensity: 0.2,
    });

    // 1. Shaft/Handle (Horizontal cylinder)
    const shaftGeom = new THREE.CylinderGeometry(0.12, 0.12, 3.2, 32);
    shaftGeom.rotateZ(Math.PI / 2);
    const shaft = new THREE.Mesh(shaftGeom, steelMaterial);
    dumbbell.add(shaft);

    // Helper for adding plates
    const createPlatePair = (radius, thickness, xOffset, material) => {
      const plateGeom = new THREE.CylinderGeometry(radius, radius, thickness, 32);
      plateGeom.rotateZ(Math.PI / 2);

      const leftPlate = new THREE.Mesh(plateGeom, material);
      leftPlate.position.x = -xOffset;

      const rightPlate = new THREE.Mesh(plateGeom, material);
      rightPlate.position.x = xOffset;

      dumbbell.add(leftPlate);
      dumbbell.add(rightPlate);
    };

    // 2. Dumbbell Plates (Double side weights)
    createPlatePair(0.85, 0.35, 0.9, plateMaterial);  // Inner Large
    createPlatePair(0.78, 0.30, 1.25, plateMaterial); // Middle
    createPlatePair(0.70, 0.25, 1.55, plateMaterial); // Outer Small

    // 3. Colored Accent Trim Rings (Gives gym high-end look)
    createPlatePair(0.86, 0.05, 0.70, textAccentMaterial);
    
    // 4. End Collars / Screws
    createPlatePair(0.18, 0.12, 1.70, steelMaterial); // locking collars

    scene.add(dumbbell);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    // Colored Neon Lights
    const orangeLight = new THREE.PointLight(0xff5400, 3.5, 12);
    orangeLight.position.set(-3, -3, 3);
    scene.add(orangeLight);

    const amberLight = new THREE.PointLight(0xffaa00, 2, 10);
    amberLight.position.set(3, 4, 2);
    scene.add(amberLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation Loop
    let tick = 0;
    
    // Intro falling & spinning dampening variables
    let introYOffset = 6.0;   // start high up
    let introSpinX = 4.5;     // tumble offset X
    let introSpinY = 6.0;     // tumble offset Y

    const animate = () => {
      requestAnimationFrame(animate);

      tick += 0.01;

      // Exponential decay towards 0 (tumbles and settles smoothly)
      introYOffset *= 0.94;
      introSpinX *= 0.94;
      introSpinY *= 0.94;

      // Base spinning & floating combined with intro offsets
      const baseRotationX = tick * 0.4 + introSpinX;
      const baseRotationY = tick * 0.6 + introSpinY;
      const floatOffsetY = Math.sin(tick * 1.5) * 0.15;

      dumbbell.position.y = floatOffsetY + introYOffset;

      // Smooth mouse follow interpolation
      targetX = mouseX * 0.6;
      targetY = mouseY * 0.5;

      dumbbell.rotation.x += 0.05 * (targetY + baseRotationX - dumbbell.rotation.x);
      dumbbell.rotation.y += 0.05 * (targetX + baseRotationY - dumbbell.rotation.y);
      dumbbell.rotation.z = tick * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  };

  // Run Three.js animation
  setTimeout(initThreeDumbbell, 100);
});
document.querySelectorAll(".equipment-card").forEach(card => {

    card.addEventListener("click", () => {

        card.classList.toggle("active");

    });

});
