'use strict';


// update welcome message on load.
(function() {
    var currentHours = new Date().getHours();
    var welcome = document.querySelector('.js-welcome');
    var message = 'Good Morning';
    if(currentHours >= 12 && currentHours < 18) {
        message = 'Good Afternoon';
    } else if (currentHours >= 18) {
        message = 'Good Evening';
    }
    welcome.textContent = message;
}());

window.addEventListener('resize', function(e){
    console.log('hello');
});

var s = new SimpleSwipe(document.querySelectorAll('.swipe'),
    function(swipe) {
        var target = swipe.event.currentTarget;
        var docWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var clearBox = docWidth - (docWidth * 0.20);
        var targetRect = target.getBoundingClientRect();
        var swipeStopLocationX = event.changedTouches[0].clientX;
        if(swipe.direction === 'right') {
            target.style.transform = 'translateX(' + swipe.length + 'px)';
            //target.style.opacity = (targetRect.left / clearBox) / 2;
        }
        if(swipe.direction === 'left') {
            target.style.transform = 'translateX(-' + swipe.length + 'px)';
        }
    },
    function(swipe) {
        if(swipe.direction === 'left' || swipe.direction === 'right') {
            swipe.event.preventDefault();
        }
        var targetParent = document.querySelector('#swipeBox');
        var target = swipe.event.currentTarget;
        var docWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var clearBox = docWidth - (docWidth * 0.20);
        var swipeStopLocationX = event.changedTouches[0].clientX;
        var boxWrapper = target.parentNode;
        var targetRect = target.getBoundingClientRect();
        if(clearBox < swipeStopLocationX) {
            target.style.transform = 'translateX(1000px)';
            boxWrapper.style.height = 0;
            boxWrapper.style.padding = 0;
            setTimeout(function() {
                if (boxWrapper.parentNode) {
                    boxWrapper.parentNode.removeChild(boxWrapper);
                }
            }, 1000);
        } else {
            target.style.transform = 'translateX(0)';
            target.setAttribute('data-state', 'animate');
            setTimeout(function() {
                target.setAttribute('data-state', 'noAnimate');
                target.style.transform = 'initial';
            }, 300);
        }
        switch(swipe.direction) {
            //case 'left':
            //    target.style.backgroundColor = 'orange';
            //    break;
            //case 'right':
            //    target.style.backgroundColor = 'green';
            //    break;
            //case 'up':
            //    target.style.backgroundColor = 'maroon';
            //    break;
            //case 'down':
            //    target.style.backgroundColor = 'purple';
        }
    }
);
window.requestAnimationFrame(function(t) {
    console.log(t);
});
