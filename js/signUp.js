//Valiates that both passwords entered are identical
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

//Checks that the password the user wants fits the regulations set
function checkValidPass()
{
    var pass = document.getElementById("passSignUp").value
    var required = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;


    if(!required.test(pass))
    {
       document.getElementById("passSignUp").style.borderColor = "red"; 
    }else
    {
        document.getElementById("passSignUp").style.borderColor = "PaleGreen"; 
    }
}


//creates new account and saves it
function createNewAccount()
{
    var name = document.getElementById("nameSignUp").value;
    var surname = document.getElementById("surnameSignUp").value;
    var email = document.getElementById("emailSignUp").value; 
    var password = document.getElementById("passSignUp").value;
    var dob = document.getElementById("dobSignUp").value;
    var city = "";

    if(localStorage.getItem(email) === null)
    {
        var account = {name:name,surname:surname,password:password,dob:dob,highScore:0, city:city};

        store(email,account);

        setCity(email);

        sessionStorage.setItem("loggedInUser", email);

        document.getElementById("userActionTxt").innerHTML = "Account Created! Logged In.";
        window.scrollTo(0,0);

    }else
    {
        document.getElementById("validEmail").innerHTML = "Account with that E-mail already Exists!";
        document.getElementById("validEmail").style.Color = "red";
    }
}

function store(email, account)
{
    localStorage.setItem(email, JSON.stringify(account));
}

//Changes the border of the email field according to the users input
function instantEmailVerification()
{
    var email = document.getElementById("emailSignUp").value;

    if (localStorage.getItem(email) === null) 
    {
        document.getElementById("validEmail").innerHTML = "E-mail is ok";
        document.getElementById("validEmail").style.fontSize = "15px";
        document.getElementById("validEmail").style.color = "DarkGreen";
    }else
    {
        document.getElementById("validEmail").innerHTML = "E-mail is used";
        document.getElementById("validEmail").style.fontSize = "13px";
        document.getElementById("validEmail").style.color = "red";
    }
}

function setCity(email)
{
    $.get("https://ipinfo.io", function(response)
    {
        account = JSON.parse(localStorage.getItem(email))
        account.city = response.city;

       store(email,account);
    }, "jsonp");    
}




