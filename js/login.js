function logIn()
{
	var emailWritten = document.getElementById("emailLogin").value;
	var passwordWritten = document.getElementById("passLogin").value;

	if(localStorage.getItem(emailWritten) !== null)
	{
		var account = JSON.parse(localStorage.getItem(emailWritten));

    	if(account.password === passwordWritten)
    	{
    		document.getElementById("loginTxt").innerHTML = "Login Successful!";
    		document.getElementById("loginTxt").style.color = "DarkGreen";
    		document.getElementById("userActionTxt").innerHTML = "Welcome " + account.name + (" ") + account.surname + "!";
			
			sessionStorage.setItem("loggedInUser", emailWritten);	
			
    		window.scrollTo(0,0);
    		
    	}else
		{
			document.getElementById("loginTxt").innerHTML = "E-Mail or Password were incorrect!";
			document.getElementById("loginTxt").style.color = "red";
		}

	}else
	{
		document.getElementById("loginTxt").innerHTML = "E-Mail or Password were incorrect!";
		document.getElementById("loginTxt").style.color = "red";
	}
}