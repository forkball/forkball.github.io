window.onload = function() {
    //nav event handlers, clicking
    document.getElementById("nav-about").addEventListener("click", function() { handleNavigationClick("nav-about") });
    document.getElementById("nav-work").addEventListener("click", function() { handleNavigationClick("nav-work") });
    document.getElementById("nav-projects").addEventListener("click", function() { handleNavigationClick("nav-projects") });
    document.getElementById("nav-games").addEventListener("click", function() { handleNavigationClick("nav-games") });

    //nav event handlers, enter
    document.getElementById("nav-about").addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("nav-about").click();
        }
    });

    document.getElementById("nav-work").addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("nav-work").click();
        }
    });

    document.getElementById("nav-projects").addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("nav-projects").click();
        }
    });

    document.getElementById("nav-games").addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("nav-games").click();
        }
    });
};

function handleNavigationClick(nav) {
    //nav management
    var activeNav = document.getElementsByClassName("is-active")[0]
    if (nav !== activeNav.children[0].id) {
        activeNav.classList.remove("is-active");
        document.getElementById(nav).parentElement.classList.add("is-active");

        //content management
        document.getElementById(nav.replace("nav", "content")).removeAttribute("hidden");
        document.getElementById((activeNav.children[0].id).replace("nav", "content")).setAttribute("hidden", "true");
    }
};