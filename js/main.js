$(function(){
    $('.menu-btn').on('click', function(){
        $('.menu__list').toggleClass('active')


    })
    $('.menu-btn').on('click', function(){
        $('.menu__list-second').toggleClass('active')


    })

});

const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 400;

canvas.height = CANVAS_SIZE;
canvas.width = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);

ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
let painting = false;
let filling = false;
function stopPainting(){
    painting = false;
}
function startPainting(){
    painting = true;
}
function onMouseMove(event){
    x = event.offsetX;
    y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
function onMouseDown(event){
    painting = true;
}
function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function handleRangeChange(event){
    const rangeValue = event.target.value;
    ctx.lineWidth = rangeValue;
}
function handleModeClick(){
    if (filling === true) {
        filling = false;
        mode.innerText = 'Заливка';
    } else {
        filling = true;
        mode.innerText = 'Рисование';
    }
}
function handleCanvasClick(){
    if (filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = "PaintJS [Export]";
    link.click();
}


if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));
if (range) {
    range.addEventListener('input', handleRangeChange);
}

if (mode) {
    mode.addEventListener('click', handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener('click', handleSaveClick);
}


let progress = document.getElementById('progressbar')
let totalHeight = document.body.scrollHeight - window.innerHeight;
window.onscroll = function(){
    let progressHeight = (window.pageYOffset / totalHeight) * 100;
    progress.style.height = progressHeight + "%";
}

/**/ 
function startApp() {
    initEvents();
  }
  
  function initEvents() {
    document.addEventListener('keyup', keyup);
    document.addEventListener('wheel', wheel);
  
    document.addEventListener('touchstart', touchstart);
    document.addEventListener('touchend', touchend);
  
    const nav = document.querySelector('nav');
    nav.addEventListener('click', navClick)
  }
  
  const nextSlideDebaunces = debaunce(nextSlide, 1000);
  const previousSlideDebaunces = debaunce(previousSlide, 1000);
  const isActive = 'isActive';
  const hideDown = 'hideDown';
  const hideUp = 'hideUp';
  const slide = 'slide';
  
  function navClick(event) {
    const clickedSpan = event.target;
    const parentOfSpan = clickedSpan.parentNode;
  
    const parentList = parentOfSpan.parentNode;
    const children = Array.from(parentList.children);
    const indexOfChildren = children.indexOf(parentOfSpan);
  
    const currentSlideInfo = getCurrentSlideInfo();
    showSlideByIndex(currentSlideInfo.indexOfActive, indexOfChildren);
  }
  
  function updateNavigation(newIndex) {
    const nav = document.querySelector('nav');
    const oldActive = nav.querySelector('.' + isActive);
    oldActive.classList.remove(isActive);
    const navItems = nav.querySelectorAll('li');
    navItems[newIndex].classList.add(isActive);
  }
  
  function showSlideByIndex(currentIndex, newIndex) {
    const allSlides = document.querySelectorAll('.' + slide);
    if (newIndex !== currentIndex) {
      changeClassesForAnimation(allSlides, currentIndex, newIndex);
    }
  }
  
  function nextSlide() {
    showNewSlide(true);
  }
  
  function previousSlide() {
    showNewSlide(false);
  }
  
  function keyup(event) {
    const downKeyCode = 40;
    const upKeyCode = 38;
  
    switch (event.keyCode) {
      case downKeyCode:
        nextSlide();
        break;
      case upKeyCode:
        previousSlide();
        break;
    }
  }
  
  function wheel(event) {
    const delta = event.wheelDelta;
    if (delta < 0) {
      nextSlideDebaunces();
    } else {
      previousSlideDebaunces()
    }
  }
  
  function debaunce(f, ms) {
    let isCooldown = false;
    return function () {
      if (isCooldown) return;
      f.apply(this, arguments);
      isCooldown = true;
      setTimeout(() => isCooldown = false, ms)
    }
  }
  
  let yStart;
  function touchstart(event) {
    yStart = event.touches[0].clientY;
  }
  
  function touchend(event) {
    if (event.changedTouches[0].clientY > yStart) {
      previousSlide();
    } else {
      nextSlide();
    }
  }
  
  function showNewSlide(isNext) {
    const slidesInfo = getCurrentSlideInfo();
  
    if (slidesInfo.indexOfActive == -1) {
      return;
    }
    if (isNext) {
      if (slidesInfo.indexOfActive < slidesInfo.count - 1) {
        showSlideByIndex(slidesInfo.indexOfActive, slidesInfo.indexOfActive + 1);
      }
    } else {
      if (slidesInfo.indexOfActive > 0) {
        showSlideByIndex(slidesInfo.indexOfActive, slidesInfo.indexOfActive - 1);
      }
    }
  }
  
  function getCurrentSlideInfo() {
    const allSlides = document.querySelectorAll('.' + slide);
    const count = allSlides.length;
    let indexOfActive = -1;
    allSlides.forEach((slide, index) => {
      if (slide.classList.contains(isActive)) {
        indexOfActive = index;
      }
    });
    return { indexOfActive, count };
  }
  
  function addClassAndRemoveAfterTimeout(element, className) {
    element.classList.add(className);
    setTimeout(() => {
      element.classList.remove(className);
    }, 500)
  }
  
  function changeClassesForAnimation(elements, index, newIndex) {
    elements[index].classList.remove(isActive);
    const classNameToLeaveAnimation = index > newIndex ? hideUp : hideDown;
    addClassAndRemoveAfterTimeout(elements[index], classNameToLeaveAnimation);
    elements[newIndex].classList.add(isActive);
    updateNavigation(newIndex);
  }
