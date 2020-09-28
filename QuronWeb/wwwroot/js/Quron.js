var lastConsoleHeight = '300px';




//------------------------------------------------------------------------------------------------------------------------------------------
// SideNav page routing and button handler
//------------------------------------------------------------------------------------------------------------------------------------------
function updateNav(clickedButtonID, pageName) {

    var i, buttons;
    buttons = document.getElementsByClassName("sideNav-Button");
    for (i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = "";
        buttons[i].style.color = "";
        buttons[i].className = buttons[i].className.replace(" active", "");
    }

    document.getElementById(clickedButtonID).className += " active";

    var page = document.getElementsByClassName("navPage");
    for (i = 0; i < page.length; i++) {
        page[i].style.display = "none";
    }

    document.getElementById(pageName).style.display = "";
}


//------------------------------------------------------------------------------------------------------------------------------------------
// Toggles the console window.
//------------------------------------------------------------------------------------------------------------------------------------------

function minimizeConsole() {
    var console = document.getElementById('consoleWindow');
    var consoleBar = document.getElementById('consoleBar');

    lastConsoleHeight = getComputedStyle(console, null).getPropertyValue('min-height');
    console.style.minHeight = '0px';
    console.style.maxHeight = '0px';
    consoleBar.style.minHeight = '27px';
    consoleBar.style.fontSize = '22px';
}

function maximizeConsole() {
    var console = document.getElementById('consoleWindow');
    var consoleBar = document.getElementById('consoleBar');

    console.style.minHeight = lastConsoleHeight;
    console.style.maxHeight = lastConsoleHeight;
    consoleBar.style.minHeight = '21px';
    consoleBar.style.fontSize = '17px';
}

function toggleConsole() {
    var console = document.getElementById('consoleWindow');
    var consoleHeight = parseFloat(getComputedStyle(console, null).getPropertyValue('min-height').replace('px', ''));

    if (consoleHeight > 0) {
        minimizeConsole();
    }
    else {
        maximizeConsole();
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------
// Console draggable resize
//------------------------------------------------------------------------------------------------------------------------------------------

function consoleResize() {


    var resizer = document.getElementById("consoleResizer");
    var console = document.getElementById("consoleWindow");
    var consoleBar = document.getElementById('consoleBar');


    console.style.transition = '0s';
    var startY = resizer.getBoundingClientRect().top;;
    var startHeight = parseFloat(getComputedStyle(console, null).getPropertyValue('min-height').replace('px', ''));
    var minHeight = 25;
    window.addEventListener('mousemove', startDrag, false);
    window.addEventListener('mouseup', stopDrag, false);

    function startDrag(e) {
        const height = startHeight - (e.pageY - startY)
        if (height > minHeight) {
            console.style.minHeight = height + 'px';
            console.style.maxHeight = height + 'px';
            consoleBar.style.minHeight = '21px';
            consoleBar.style.fontSize = '17px';
        }
    }

    function stopDrag() {
        window.removeEventListener('mousemove', startDrag, false);
        window.removeEventListener('mouseup', stopDrag, false);
        console.style.transition = 'all .35s';
    }
}


//------------------------------------------------------------------------------------------------------------------------------------------
// Tab Hovering Handler   (OnMouseLeave Unsupported by blazor currently)
//------------------------------------------------------------------------------------------------------------------------------------------

function hoverTab(e) {

    var tabChild = e.currentTarget.children;

    for (var i = 0; i < tabChild.length; i++) {

        if (tabChild[i].classList.contains("closeTab")) {

            tabChild = tabChild[i].children;

            for (var i = 0; i < tabChild.length; i++) {

                if (tabChild[i].classList.contains("closeTabIcon")) {

                    tabChild[i].style.display = "";
                    e.currentTarget.addEventListener('mouseleave', unhoverTab, false);
                    break;
                }
            }
            break;
        }
    }

    function unhoverTab(e) {

        var tabChild = e.currentTarget.children;

        for (var i = 0; i < tabChild.length; i++) {

            if (tabChild[i].classList.contains("closeTab")) {

                tabChild = tabChild[i].children;

                for (var i = 0; i < tabChild.length; i++) {

                    if (tabChild[i].classList.contains("closeTabIcon")) {

                        tabChild[i].style.display = "none";
                        e.currentTarget.addEventListener('mouseleave', unhoverTab, false);
                        break;
                    }
                }
                break;
            }
        }
    }
}


; (function ($) {
    'use strict';
    var content = $('#simPage1').smoothState({
        // onStart runs as soon as link has been activated
        onStart: {

            // Set the duration of our animation
            duration: 250,

            // Alterations to the page
            render: function () {

                // Quickly toggles a class and restarts css animations
                content.toggleAnimationClass('is-exiting');
            }
        }
    }).data('smoothState'); // makes public methods available
})(jQuery);