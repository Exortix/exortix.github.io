const exortix = {}
exortix.console = console;
console = {};
clear = {};
const navigationTitles = ['Home', 'Movies', 'Anime', 'Back'];
// const deviceType = () => {
//   const ua = navigator.userAgent;
//   if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
//     return "tablet";
//   }
//   else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
//     return "mobile";
//   }
//   return "desktop";
// };
$(document).ready(function () {
  exortix.console.clear()
  exortix.console.log(`%cWelcome to Exortix's Home.\nEnjoy! ❤️`, 'font-size: x-large');
  let element =  document.querySelector('.audio-controller');
  if (!localStorage.getItem("home_bgm_play"))
    localStorage.setItem('home_bgm_play', 'on');
  if (localStorage.getItem("home_bgm_play") == "on") {
    $('.audio-controller').toggleClass('off', false);
    $('.audio-controller').toggleClass('on', true).trigger('classChange');;
  } else if (localStorage.getItem("home_bgm_play") == "off") {
    $('.audio-controller').toggleClass('on', false);
    $('.audio-controller').toggleClass('off', true).trigger('classChange');;
  }
});

$('.audio-controller > img').click(function (e) { 
  e.preventDefault();
  let element =  document.querySelector('.audio-controller');
  if (element.classList.contains('off')) {
    $('.audio-controller').toggleClass('off', false);
    $('.audio-controller').toggleClass('on', true).trigger('classChange');
  }
  else if (element.classList.contains('on')) {
    $('.audio-controller').toggleClass('on', false);
    $('.audio-controller').toggleClass('off', true).trigger('classChange');
  }
});

$('.audio-controller').on('classChange', function(e){
  let element =  document.querySelector('.audio-controller');
  if (element.classList.contains('off')) {
    element.querySelector('img').setAttribute('src', `${window.origin}/img/mute.png`)
    localStorage.setItem('home_bgm_play', 'off');
    document.querySelector('audio').pause();
  } else if (element.classList.contains('on')) {    
    document.querySelector('audio').play().then( () => {
      // already allowed
      element.querySelector('img').setAttribute('src', `${window.origin}/img/play.png`)
      localStorage.setItem('home_bgm_play', 'on');
      setInterval(() => {
        $('.audio-controller.on > img').css({filter: `sepia(3%) saturate(7465%) hue-rotate(${Math.floor(Math.random() * 361)}deg)`}, 0);
      }, 1000);
    } )
    .catch( () => {
      $('.audio-controller').toggleClass('on', false);
      $('.audio-controller').toggleClass('off', true).trigger('classChange');
      alert('Set "Sound" Permissions to Allow to Enable Autoplay');
    });
  }
  e.preventDefault();
});

new fullpage('#fullpage', {
	autoScrolling: true,
  navigation: true,
  anchors: ['home', 'movies', 'anime', 'novels', 'manga', 'contact'],
  navigationTooltips: navigationTitles,
  showActiveTooltip: true,
  scrollingSpeed: 850,
  controlArrows: false,
  slidesNavigation: true,
	scrollHorizontally: true,
  responsiveWidth: 319,
  loopTop: false,
  loopHorizontal: false,
  onLeave: function(origin, destination, direction){
    exortix.console.clear()
    exortix.console.log(`%cWelcome to Exortix's Home.\nEnjoy! ❤️`, 'font-size: x-large');
    let activeSlide = fullpage_api.getActiveSlide();
    if(activeSlide){
      if (direction == "down") {
        if (activeSlide.isLast) {
          return true;
        }
        else
          fullpage_api.moveSlideRight();
      } else if (direction == "up") {
        if (activeSlide.isFirst) {
          return true;
        }
        else
          fullpage_api.moveSlideLeft();
      }
      return false;
    }
  },
	afterResize: function(width, height){
		var fullpageContainer = this;
    fullpage_api.reBuild();
    // if (deviceType() != "desktop") {
    //   fullpage_api.setResponsive(true);
    // }
	},
  afterResponsive: function(isResponsive) {
    return true;
  },
  afterLoad: function (origin, destination, direction) {
    exortix.console.clear()
    exortix.console.log(`%cWelcome to Exortix's Home.\nEnjoy! ❤️`, 'font-size: x-large');
    document.title = navigationTitles[destination.index]
    document.querySelector('.header > h2').textContent = document.title
    fullpage_api.reBuild();
  }
});


//methods
fullpage_api.setLockAnchors(true);

// if (deviceType() != "desktop") {
//   fullpage_api.setResponsive(true);
// }