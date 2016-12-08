//Hides all Content when called
function hideContent(){
    var sectionContent = document.getElementsByClassName("sectionContent");

    //Hides all the content 
    for (var i = 0; i < sectionContent.length; i++) {
        sectionContent[i].style.display = "none";
    }
}

//Tabs Javascript Code
function openTab(evt, tabName) {
    var tabs = document.getElementsByClassName("tab");

    hideContent();

    // Remove any active Class set on the tabs
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace("active", "");
    }

    // Show the current sectionContent, and add an "active" class to the tab clicked
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += "active";

    return false;
}


