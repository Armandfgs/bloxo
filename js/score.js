//Saves Score to an account if logged in
function saveScore(score)
{
	if (sessionStorage.getItem("loggedInUser") != null) 
	{
		var email = sessionStorage.loggedInUser;

		var account = JSON.parse(localStorage.getItem(email));

		if(score > account.highScore)
		{
			account.highScore = score;
			store(email,account);
			document.getElementById("userActionTxt").innerHTML = "New High Score!";
			buildScoreboard();
		}
		else(score < account.highScore)
		{
			document.getElementById("userActionTxt").innerHTML = " ";
		}
	}

	if(sessionStorage.getItem("loggedInUser") == null)
	{
		document.getElementById("userActionTxt").innerHTML = "Login/Create Account to Save Score!";
	}
}

function buildScoreboard()
{
	var accounts = [];

	for(var i = 1; i < localStorage.length; i++)
	{	
		accounts.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
	}

	sortAccounts(accounts);

	clearTable();

	var count = 0;
	var finished = false;

	do
	{	
		fillPlacement(accounts[count]);
		count++;

		if(accounts.length > 10)
		{
			if(count >= 10)
			{
				finished =true;
			}
		}else if(count == accounts.length)
		{
			finished = true;
		}

	}while(!finished)
}

//Fills a given row for the scoreboard
function fillPlacement(account)
{	
	var fullName = account.name + " " + account.surname;

	var placement = ("<div class=\"position\"> " + account.city+ "</div>"
					+"<div class=\"position\"> " + fullName+ "</div>"
					+"<div class=\"position\"> " + account.highScore + "</div>");

	$("#positionsList").append(placement);
}

//Gets Value from score div
function getValue(id)
{
	var value = document.getElementById(id).getAttribute("dataValue");
	return value;
}

function sortAccounts(accounts)
{
	var swapped;
	do
	{
		swapped = false;

		for(var i = 0; i < accounts.length-1; i++)
		{
			if(accounts[i+1].highScore >= accounts[i].highScore)
			{
				var tempAccountHolder = accounts[i];

				accounts[i] = accounts[i+1];

				accounts[i+1] = tempAccountHolder;

				swapped = true;
			}
		}
	}while(swapped)
}

function clearTable()
{
	document.getElementById("positionsList").innerHTML = " ";
}