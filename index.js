var sliderData = [
  {
    img: 'url(img/pc-pulscen.png)',
    text: {
      title: 'Портал Пульс Цен',
      logo: 'url(img/pulscen.png)',
      link: 'http://www.pulscen.ru/',
      list: [
        '9 млн посетителей в месяц',
        '1 млн компаний',
        '6 млн товаров и услуг',
        'мобильное приложение на ios и android'
      ]
    }
  },
  {
    img: 'url(img/pc-blizko.png)',
    text: {
      title: 'Портал Близко.ру',
      logo: 'url(img/blizko.png)',
      link: 'http://www.blizko.ru/',
      list: [
        '7,5 млн пользователей в  месяц',
        '2 млн компаний',
        '16,5 млн товаров и услуг',
        'мобильная версия'
      ]
    }
  },
  {
    img: 'url(img/pc-yapok.png)',
    text: {
      title: 'Портал ЯПокупаю.ру',
      logo: 'url(img/yapokupayu.png)',
      link: 'http://www.yapokupayu.ru/',
      list: [
        '1,2 млн пользователей в  месяц',
        '34 тыс компаний',
        '1,7 млн товаров и услуг',
        'мобильная версия'
      ]
    }
  }
];

var slideMove = false;

window.addEventListener('load', load);

function load() {
  var top = document.querySelector('.paralax-top');
  var paralax = document.querySelector('.paralax');
  var elems = document.querySelectorAll('.vacancy__item-wrapper');

  window.addEventListener('scroll', scroll.bind({}, top.firstElementChild));
  window.addEventListener('scroll', scroll.bind({}, paralax));

  for (var i = 0, l = elems.length; i < l; i++) {
    elems[i].addEventListener('click', toggler);
  }

  var prev = throttle(clickSlidePrev, 700);
  var next = throttle(clickSlideNext, 700);

  document.querySelector('.slider__arrow--right').addEventListener('click', next);
  document.querySelector('.slider__arrow--left').addEventListener('click', prev);
}

function throttle(func, ms) {

  var isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

function scroll(elem) {
  var y = elem.getBoundingClientRect().top / 3;
  elem.style.backgroundPosition = 'center '+ (y > 0 ? 0 : y) + 'px';
}

function toggler() {
  var elems = document.querySelectorAll('.vacancy__item-wrapper');

  if (this.classList.contains('open')) {
    for (var i = 0, l = elems.length; i < l; i++) {
      elems[i].classList.remove('open');
    }
  } else {
    for (var i = 0, l = elems.length; i < l; i++) {
      elems[i].classList.remove('open');
    }

    this.classList.add('open')
  }
}

function moveSlideData(next) {
  if (next) {
    _sliderData = sliderData.slice(1, 3);
    _sliderData.push(sliderData[0]);
  } else {
    _sliderData = sliderData.slice(0, 2);
    _sliderData.unshift(sliderData[2]);
  }

  return _sliderData;
}

function createSlideText(slideTextNextCildren, sliderData) {
  for (var i = 0, l = slideTextNextCildren.length; i < l; i++) {
    if(slideTextNextCildren[i].classList.contains('slider__title')) {
      slideTextNextCildren[i].children[0].innerText = sliderData[0].text.title
      slideTextNextCildren[i].children[1].style.backgroundImage = sliderData[0].text.logo;
    }

    if(slideTextNextCildren[i].classList.contains('slider__link')) {
      slideTextNextCildren[i].innerText = sliderData[0].text.link;
      slideTextNextCildren[i].href = sliderData[0].text.link;
    }

    if(slideTextNextCildren[i].classList.contains('slider__text')) {
      slideTextNextCildren[i].innerHTML = '';

      sliderData[0].text.list.forEach(function(item) {
        var li = document.createElement('li');

        li.innerText = item;
        li.classList.add('slider__text-row');

        slideTextNextCildren[i].appendChild(li);
      });
    }
  }

  return slideTextNextCildren;
}

function clickSlideNext() {
  if (!slideMove) {
    slideMove = true;

    var wrapper = document.querySelector('.slider__screen-wrapper');
    var wrapperText = document.querySelector('.slider__list');
    var slide = document.querySelector('.slider__screen');
    var slideText = document.querySelector('.slider__item');
    var slideNext = slide.cloneNode(true);
    var slideTextNext = slideText.cloneNode(true);
    var slideTextNextCildren = slideTextNext.children

    sliderData = moveSlideData(true);

    slideNext.style.left = '-380px';
    slideTextNext.style.left = '-380px';
    slideNext.style.backgroundImage = sliderData[0].img;

    slideTextNextCildren = createSlideText(slideTextNextCildren, sliderData)

    wrapper.insertBefore(slideNext, slide);
    wrapperText.insertBefore(slideTextNext, slideText);

    setTimeout(function() {
      slideNext.style.left = '0';
      slide.style.left = '380px';

      slideTextNext.style.left = '0';
      slideText.style.left = '380px';
      setTimeout(function() {
        wrapper.removeChild(slide);
        wrapperText.removeChild(slideText);
        slideMove = false;
      }, 500)
    }, 100)
  }
}

function clickSlidePrev() {
  if (!slideMove) {
    slideMove = true;

    var wrapper = document.querySelector('.slider__screen-wrapper');
    var wrapperText = document.querySelector('.slider__list');
    var slide = document.querySelector('.slider__screen');
    var slideText = document.querySelector('.slider__item');
    var slidePrev = slide.cloneNode(true);
    var slideTextPrev = slideText.cloneNode(true);
    var slideTextPrevCildren = slideTextPrev.children

    sliderData = moveSlideData(false);

    slidePrev.style.left = '380px';
    slideTextPrev.style.left = '380px';
    slidePrev.style.backgroundImage = sliderData[0].img;

    slideTextPrevCildren = createSlideText(slideTextPrevCildren, sliderData)

    wrapper.appendChild(slidePrev);
    wrapperText.appendChild(slideTextPrev);

    setTimeout(function() {
      slidePrev.style.left = '0';
      slide.style.left = '-380px';

      slideTextPrev.style.left = '0';
      slideText.style.left = '-380px';
      setTimeout(function() {
        wrapper.removeChild(slide);
        wrapperText.removeChild(slideText);
        slideMove = false;
      }, 500)
    }, 100)
  }
}
