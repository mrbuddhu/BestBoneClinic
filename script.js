// Mobile menu toggle and enhanced functionality
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu functionality
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle')
  const navMenu = document.querySelector('.nav-menu')
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay')
  
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active')
      mobileMenuOverlay.classList.toggle('active')
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : ''
    })
    
    // Close menu when clicking overlay
    mobileMenuOverlay.addEventListener('click', () => {
      navMenu.classList.remove('active')
      mobileMenuOverlay.classList.remove('active')
      document.body.style.overflow = ''
    })
    
    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a')
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active')
        mobileMenuOverlay.classList.remove('active')
        document.body.style.overflow = ''
      })
    })
  }

  // Smooth scrolling for anchor links
  const links = document.querySelectorAll('a[href^="#"]')
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })

  // Enhanced form submission with detailed validation
  const appointmentForm = document.getElementById("appointmentForm")
  if (appointmentForm) {
    appointmentForm.addEventListener("submit", function (e) {
      e.preventDefault()
      
      // Get form data
      const formData = new FormData(this)
      const name = formData.get('name')
      const phone = formData.get('phone')
      const email = formData.get('email')
      const service = formData.get('service')
      const urgency = formData.get('urgency')
      const preferredDate = formData.get('preferred_date')
      const preferredTime = formData.get('preferred_time')
      const message = formData.get('message')
      
      // Validation
      if (!name || !phone || !preferredDate || !preferredTime) {
        alert("Please fill in all required fields marked with *")
        return
      }
      
      // Email validation
      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
          alert("Please enter a valid email address.")
          return
        }
      }
      
      // Phone validation
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/
      if (!phoneRegex.test(phone)) {
        alert("Please enter a valid phone number.")
        return
      }
      
      // Create appointment message
      const appointmentMessage = `New Appointment Request:
Name: ${name}
Phone: ${phone}
Email: ${email || 'Not provided'}
Service: ${service}
Urgency: ${urgency}
Preferred Date: ${preferredDate}
Preferred Time: ${preferredTime}
Message: ${message || 'No additional message'}`

      // Show success message
      alert("Thank you for your appointment request! We will contact you within 24 hours to confirm your appointment.")
      
      // Send email notification
      sendEmailNotification(name, phone, email, service, urgency, preferredDate, preferredTime, message)
      
      // Optional: Send WhatsApp message
      const whatsappText = encodeURIComponent(`Hi, I need an appointment with Dr. Bipin Solanki.
Name: ${name}
Phone: ${phone}
Service: ${service}
Date: ${preferredDate}
Time: ${preferredTime}`)
      
      if (confirm("Would you like to send a WhatsApp message for immediate response?")) {
        window.open(`https://wa.me/919717289689?text=${whatsappText}`, '_blank')
      }
      
      // Reset form
      this.reset()
    })
  }

  // Email notification function
  function sendEmailNotification(name, phone, email, service, urgency, preferredDate, preferredTime, message) {
    const emailBody = `
New Appointment Request Received

Patient Details:
- Name: ${name}
- Phone: ${phone}
- Email: ${email || 'Not provided'}

Appointment Details:
- Service Required: ${service || 'General Consultation'}
- Urgency Level: ${urgency || 'Normal'}
- Preferred Date: ${preferredDate}
- Preferred Time: ${preferredTime}
- Additional Message: ${message || 'No additional message'}

Please contact the patient within 24 hours to confirm the appointment.

Best regards,
BBC Best Bone Clinic Website
    `.trim()

    // Method 1: Try to send via EmailJS (if configured)
    if (typeof emailjs !== 'undefined') {
      emailjs.send('service_id', 'template_id', {
        to_email: 'bipinsolanki007@gmail.com',
        to_name: 'Dr. Bipin Solanki',
        from_name: name,
        from_email: email || 'website@bestboneclinic.com',
        from_phone: phone,
        service: service || 'General Consultation',
        urgency: urgency || 'Normal',
        preferred_date: preferredDate,
        preferred_time: preferredTime,
        message: message || 'No additional message',
        subject: `New Appointment Request - ${name}`
      })
      .then(function(response) {
        console.log('Email sent successfully:', response);
      })
      .catch(function(error) {
        console.log('Email sending failed:', error);
        // Fallback to mailto
        fallbackEmailMethod(name, phone, email, service, urgency, preferredDate, preferredTime, message);
      });
    } else {
      // Method 2: Fallback to mailto link
      fallbackEmailMethod(name, phone, email, service, urgency, preferredDate, preferredTime, message);
    }
  }

  // Fallback email method using mailto
  function fallbackEmailMethod(name, phone, email, service, urgency, preferredDate, preferredTime, message) {
    const emailBody = `
New Appointment Request Received

Patient Details:
- Name: ${name}
- Phone: ${phone}
- Email: ${email || 'Not provided'}

Appointment Details:
- Service Required: ${service || 'General Consultation'}
- Urgency Level: ${urgency || 'Normal'}
- Preferred Date: ${preferredDate}
- Preferred Time: ${preferredTime}
- Additional Message: ${message || 'No additional message'}

Please contact the patient within 24 hours to confirm the appointment.

Best regards,
BBC Best Bone Clinic Website
    `.trim()

    // Create mailto link
    const mailtoLink = `mailto:bipinsolanki007@gmail.com?subject=New Appointment Request - ${name}&body=${encodeURIComponent(emailBody)}`
    
    // Open email client
    window.open(mailtoLink, '_blank')
  }

  // Dropdown menu functionality for mobile
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle")
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault()
        const dropdown = this.parentElement
        dropdown.classList.toggle("active")
      }
    })
  })

  // Add scroll effect to header
  const header = document.querySelector('.header')
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled')
      } else {
        header.classList.remove('scrolled')
      }
    })
  }

  // Highlight current page in navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html'
  const navLinks = document.querySelectorAll('.nav-menu a')
  navLinks.forEach(link => {
    const href = link.getAttribute('href')
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active')
    }
  })

  // Add animation to service cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
      }
    })
  }, observerOptions)

  // Observe service cards and testimonials
  document.querySelectorAll('.service-card, .testimonial-card, .blog-card').forEach(card => {
    observer.observe(card)
  })

  // FAQ accordion functionality
  const faqItems = document.querySelectorAll('.faq-item')
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question')
    const answer = item.querySelector('.faq-answer')
    const icon = item.querySelector('.faq-icon')
    
    if (question && answer) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open')
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('open')
        })
        
        // Toggle current item
        if (!isOpen) {
          item.classList.add('open')
        }

        // Update icons for plus/minus visual
        document.querySelectorAll('.faq-icon').forEach(i => i.textContent = '+')
        if (item.classList.contains('open') && icon) icon.textContent = '−'
      })
    }
  })

  // Hero slider functionality
  const slider = document.querySelector('.hero-slider')
  if (slider) {
    const slides = Array.from(slider.querySelectorAll('.slide'))
    const dotsContainer = slider.querySelector('.hero-dots')
    const prevBtn = slider.querySelector('.hero-arrow.prev')
    const nextBtn = slider.querySelector('.hero-arrow.next')
    let index = 0
    let timerId

    const createDots = () => {
      slides.forEach((_, i) => {
        const btn = document.createElement('button')
        btn.setAttribute('role', 'tab')
        btn.setAttribute('aria-label', `Go to slide ${i + 1}`)
        btn.addEventListener('click', () => goTo(i))
        dotsContainer.appendChild(btn)
      })
    }

    const updateUI = () => {
      slides.forEach((s, i) => s.classList.toggle('active', i === index))
      const dots = dotsContainer.querySelectorAll('button')
      dots.forEach((d, i) => d.classList.toggle('active', i === index))
    }

    const goTo = (i) => {
      index = (i + slides.length) % slides.length
      updateUI()
      restartAutoplay()
    }

    const next = () => goTo(index + 1)
    const prev = () => goTo(index - 1)

    const startAutoplay = () => {
      timerId = setInterval(next, 5000)
    }
    const stopAutoplay = () => timerId && clearInterval(timerId)
    const restartAutoplay = () => { stopAutoplay(); startAutoplay() }

    // Swipe support
    let startX = 0
    slider.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; stopAutoplay() }, {passive:true})
    slider.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - startX
      if (Math.abs(dx) > 40) { dx > 0 ? prev() : next() }
      startAutoplay()
    })

    // Init
    createDots()
    updateUI()
    startAutoplay()

    // Controls
    if (prevBtn) prevBtn.addEventListener('click', prev)
    if (nextBtn) nextBtn.addEventListener('click', next)
  }

  // Instagram carousel (simple)
  const insta = document.querySelector('.insta-carousel')
  if (insta) {
    const track = insta.querySelector('.insta-track')
    const cards = Array.from(insta.querySelectorAll('.insta-card'))
    const prev = insta.querySelector('.insta-arrow.prev')
    const next = insta.querySelector('.insta-arrow.next')
    let idx = 0

    const cardWidth = () => cards[0]?.getBoundingClientRect().width + 14 || 254
    const maxIdx = () => Math.max(0, cards.length - Math.floor(insta.querySelector('.insta-viewport').offsetWidth / cardWidth()))

    const update = () => {
      const x = -idx * cardWidth()
      track.style.transform = `translateX(${x}px)`
    }

    const go = (delta) => {
      idx = Math.min(Math.max(0, idx + delta), maxIdx())
      update()
    }

    prev?.addEventListener('click', () => go(-1))
    next?.addEventListener('click', () => go(1))
    window.addEventListener('resize', update)
    update()
  }
})

// Instagram Reels Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const instaTrack = document.querySelector('.insta-track');
    const instaCards = document.querySelectorAll('.insta-embed-card');
    const prevBtn = document.querySelector('.insta-nav-arrow.prev');
    const nextBtn = document.querySelector('.insta-nav-arrow.next');
    const swipeDots = document.querySelectorAll('.insta-swipe-dot');
    
    let currentSlide = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    
    // Get number of visible cards based on screen size
    function getVisibleCards() {
        if (window.innerWidth >= 1024) return 4; // Desktop
        if (window.innerWidth >= 768) return 2;  // Tablet
        return 1; // Mobile
    }
    
    // Update carousel position
    function updateCarousel() {
        const visibleCards = getVisibleCards();
        const cardWidth = instaCards[0].offsetWidth + 20; // Include gap
        const translateX = -currentSlide * cardWidth;
        
        instaTrack.style.transform = `translateX(${translateX}px)`;
        
        // Update swipe indicators
        swipeDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update navigation buttons
        prevBtn.style.display = currentSlide === 0 ? 'none' : 'flex';
        nextBtn.style.display = currentSlide >= instaCards.length - visibleCards ? 'none' : 'flex';
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        const visibleCards = getVisibleCards();
        const maxSlide = Math.max(0, instaCards.length - visibleCards);
        currentSlide = Math.max(0, Math.min(slideIndex, maxSlide));
        updateCarousel();
    }
    
    // Next slide
    function nextSlide() {
        const visibleCards = getVisibleCards();
        if (currentSlide < instaCards.length - visibleCards) {
            currentSlide++;
            updateCarousel();
        }
    }
    
    // Previous slide
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    }
    
    // Touch/swipe functionality
    function touchStart(e) {
        if (window.innerWidth <= 767) { // Only on mobile
            isDragging = true;
            startPos = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
            instaTrack.style.transition = 'none';
        }
    }
    
    function touchMove(e) {
        if (!isDragging) return;
        
        const currentPosition = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const diff = currentPosition - startPos;
        const cardWidth = instaCards[0].offsetWidth + 20;
        
        currentTranslate = prevTranslate + diff;
        
        // Limit dragging
        const maxTranslate = 0;
        const minTranslate = -(instaCards.length - 1) * cardWidth;
        currentTranslate = Math.max(minTranslate, Math.min(maxTranslate, currentTranslate));
        
        instaTrack.style.transform = `translateX(${currentTranslate}px)`;
    }
    
    function touchEnd() {
        if (!isDragging) return;
        
        isDragging = false;
        instaTrack.style.transition = 'transform 0.3s ease';
        
        const cardWidth = instaCards[0].offsetWidth + 20;
        const movedBy = currentTranslate - prevTranslate;
        
        // Determine if slide should change
        if (Math.abs(movedBy) > cardWidth * 0.3) {
            if (movedBy < 0 && currentSlide < instaCards.length - 1) {
                currentSlide++;
            } else if (movedBy > 0 && currentSlide > 0) {
                currentSlide--;
            }
        }
        
        prevTranslate = -currentSlide * cardWidth;
        updateCarousel();
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Swipe dot navigation
    swipeDots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Touch/swipe events
    instaTrack.addEventListener('mousedown', touchStart);
    instaTrack.addEventListener('mousemove', touchMove);
    instaTrack.addEventListener('mouseup', touchEnd);
    instaTrack.addEventListener('mouseleave', touchEnd);
    
    instaTrack.addEventListener('touchstart', touchStart);
    instaTrack.addEventListener('touchmove', touchMove);
    instaTrack.addEventListener('touchend', touchEnd);
    
    // Prevent context menu on long press
    instaTrack.addEventListener('contextmenu', e => e.preventDefault());
    
    // Initialize carousel
    updateCarousel();
    
    // Update on window resize
    window.addEventListener('resize', () => {
        const visibleCards = getVisibleCards();
        const maxSlide = Math.max(0, instaCards.length - visibleCards);
        currentSlide = Math.min(currentSlide, maxSlide);
        updateCarousel();
    });
});

// Audio control functionality
function toggleAudio(control) {
    const card = control.closest('.insta-embed-card');
    const iframe = card.querySelector('iframe');
    const audioIcon = control.querySelector('.audio-icon');
    
    // Toggle audio icon
    if (control.classList.contains('muted')) {
        control.classList.remove('muted');
        audioIcon.innerHTML = `
            <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15.54 8.46C16.4774 9.39764 17.0039 10.7538 17.0039 12.2C17.0039 13.6462 16.4774 15.0024 15.54 15.94" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `;
    } else {
        control.classList.add('muted');
        audioIcon.innerHTML = `
            <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `;
    }
    
    // Note: Instagram embeds handle their own audio, this is just for visual feedback
    // The actual audio control would need to be handled by Instagram's embed API
}
