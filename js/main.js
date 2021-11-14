const exortix = {}
exortix.console = console;
console = {};
clear = {};
const navigationTitles = ['Home', 'Projects', 'Contact'];
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
  if (!localStorage.getItem("home_bgm_play") || (window.chrome))
    localStorage.setItem('home_bgm_play', 'off');
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
    element.querySelector('img').setAttribute('src', 'img/mute.png')
    localStorage.setItem('home_bgm_play', 'off');
    document.querySelector('audio').pause();
  } else if (element.classList.contains('on')) {
    element.querySelector('img').setAttribute('src', 'img/play.png')
    localStorage.setItem('home_bgm_play', 'on');
    document.querySelector('audio').play();
    setInterval(() => {
      $('.audio-controller.on > img').css({filter: `sepia(3%) saturate(7465%) hue-rotate(${Math.floor(Math.random() * 361)}deg)`}, 0);
    }, 1000);
  }
  e.preventDefault();
});

new fullpage('#fullpage', {
	autoScrolling: true,
  navigation: true,
  anchors: ['home', 'projects', 'contact'],
  navigationTooltips: navigationTitles,
  showActiveTooltip: true,
  scrollingSpeed: 1000,
  controlArrows: false,
  slidesNavigation: true,
	scrollHorizontally: true,
  responsiveWidth: 0,
  loopTop: false,
  loopHorizontal: false,
  onLeave: function(origin, destination, direction){
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