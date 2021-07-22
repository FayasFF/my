
(function() {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }


  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }


  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }


  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)


  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }


  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });


  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }


  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });


  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });


  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });


  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });
  

})()

$("#submitform").submit((e)=>{
  if(tex1&& mai1&& ph1){
      
  
     e.preventDefault()
     $.ajax({
         url:"https://script.google.com/macros/s/AKfycbwV3fbB9HW-eOfrVjEx1_QLU4TVyJycJ1KV0Zjg528ibhl5E0EldkG4T-gm3AxunLuw/exec",
         data:$("#submitform").serialize(),
         method:"post",
         success:function (response){
             alert("Form submitted successfully")
             window.location.reload()
             window.location.href="https://fayasff.github.io/port/?name=fayas&email=1%40gmail.com&phone=908sdfvb&subject="
         },
         error:function (err){
             alert("Something Error")

         }
     })
 }else{
     alert("Fill up Correctly")
 }
 })
var tex1
function Per(){
 var username = document.getElementById('name').value
 var check
 var pattern=/^[a-zA-Z-()]+(\s+[-a-zA-Z-()]+)*$/
 if(username==""){
    check="Enter the Name";
     tex1=false
 }else if(username.match(pattern)){
     check=""
    tex1=true
 }else{
     check="Please use Alphabets "
   tex1=false
 }

 document.getElementById('peer').innerHTML=check
}
var mai1
function mal(){
 var email = document.getElementById('email').value
 var check
 var pattern=/^[^]+@[^]+\.[a-z]{2,3}$/
 if(email==""){
    check="Enter the E-mail";
    mai1=false
 }else if(email.match(pattern)){
     check=""
     mai1=true
 }else{
     check="Enter correct Email"
     mai1=false
 }

 document.getElementById('maal').innerHTML=check
}
var ph1
function tel(){
 var phone = document.getElementById('phone').value
 var check
 var pattern=/^\d{10}$/
 var paattern=/^[a-zA-Z-()]+(\s+[-a-zA-Z-()]+)*$/
 if(phone==""){
    check="Enter valid number";
    ph1=false
 }else if(phone.match(pattern)){
     check=""
     ph1=true
 }else if(phone.match(paattern)){
     check="Don't Enter character"
     ph1=false
 }else{
     check="Please Enter correct 10 number"
     ph1=false
 }

 document.getElementById('teel').innerHTML=check
}
