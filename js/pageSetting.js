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

function checkSamePass(){
    var pass = document.getElementById("passSignUp").value;
    var repass = document.getElementById("repassSignUp").value;

    if(repass === pass)
    {
            document.getElementById("repassSignUp").style.borderColor = "PaleGreen";
    }else
    {
        document.getElementById("repassSignUp").style.borderColor = "red";
    }
}

function checkValidPass()
{
    var pass = document.getElementById("passSignUp").value
    var required = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;


    if(!required.test(pass))
    {
       document.getElementById("passSignUp").style.borderColor = "red"; 
    }else
    {
        document.getElementById("passSignUp").style.borderColor = "Pale"; 
    }
}