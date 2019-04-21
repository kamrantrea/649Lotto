//Kamran Trea
//Assignment 3
//Purpose of this assignment is to have a player choose their numbers or 
//let the computer randomly choose numbers to get a quick pick of 6 numbers. 
//Also we give the player the option to player the ticket once, twice or three times. 

//Using an IIFE to avoid declaring variables in the global scope.
window.onload = function () {
    var array1to49 = new Array();
    var chooseCustomerArray = new Array();
    var array1Play = new Array();
    var array2Play = new Array();
    var array3Play = new Array();
    //Referencing the select element in the HTML with the id numOfPlays
    //With an onchange for when the checkboxes are checked then go to the reset function.
    document.getElementById('numOfPlays').onchange = Reset;
    var lottos = document.getElementsByName('chooseNumbers[]');
    // Click event that is linked to the bTNClickHandler function so that when you click
    //play it will run the function 
    document.getElementById("buttonPlay").onclick = bTNClickHandler;
    //Setting array length to 0
    function Reset() {
        array1to49.length = 0; chooseCustomerArray.length = 0; array1Play.length = 0; array2Play.length = 0;
        array3Play.length = 0;

        }
    function bTNClickHandler() {
        document.getElementById('dynamicUserDiv').innerHTML = "";
        document.getElementById('dynamicPlayDiv').innerHTML = "";
        var selectedRadio = document.querySelector('input[name="yesNoRadioGroup"]:checked').value;

        var statusMessage = document.getElementById("statusMessage");
        var checkBoxCount = 0;
        /*If the user selects no, that they dont want the computer to pick
        the numbers for them , then run a loop depending on the numbers choosen
        by the user.
        */
        if (selectedRadio === "No") {

            for (var i = 0, len = lottos.length; i < len; i++) {
                if (lottos[i].checked) {
                    checkBoxCount++;
                    chooseCustomerArray.push(parseInt(lottos[i].value));
                } else {

                }
            }
            //If the user selects more than 6 checks boxes then display "ERROR: more than 6 selected"
            if (checkBoxCount > 6) {
                statusMessage.innerHTML = "ERROR: more than 6 selected"
                return false;
            }
            //If the user selects less than 6 checks boxes then display "ERROR: less than 6 selected"
            else if (checkBoxCount < 6) {
                statusMessage.innerHTML = "ERROR: less than 6 selected"
                return false;
            }
            else {
                statusMessage.innerHTML = "";
            }

        }
        //If the user picks the correct amount of Numbers then run the FillUpPlayArray function
        else {
            statusMessage.innerHTML = "";
            FillUpPlayArray("User");
        }
        /*Run the function FillUpArray through a loop that gets the numbers selected 
        and push the numbers selected  */
        function FillUpArray() {
            array1to49.length = 0;
            for (var i = 1; i < 50; i++) {
                array1to49.push(i);
            }
        }
        function sortNumber(a, b) {
            //Returning a negative value (ascending order)
            return a - b;
        }
        function FillUpPlayArray(val) {
            FillUpArray();
            var array = new Array();
            for (var i = 1; i < 7; i++) {

                var Lottoindex = Math.floor(Math.random() * array1to49.length);
                //new varuavke that links the 1-49 array to the variable lotto index
                var LottorandomNumber = array1to49[Lottoindex];
                // removing random number form the list to null the chance of duplicacy
                array1to49.splice(Lottoindex, 1);
                //Joining the two arrays with the concat methor.
                array = array.concat(LottorandomNumber);
            }
            //Sorting the new array order from the ascending order of the returning negative values of the sortNumber function
            //Depending on which option is picked by the user in the dropdown menu run the number of plays choosen
            //Through the array (array)
            array.sort(sortNumber);
            if (val === "User") { chooseCustomerArray = array; }
            else if (val === "1") { array1Play = array; }
            else if (val === "2") { array2Play = array; }
            else if (val === "3") { array3Play = array; }
        }
        //Depending on the option choosen if it is 1 2 or 3 plays
        //adjust the count of plays choosen
        var selectOptionValue = document.getElementById('numOfPlays').value;
        var count = 0;
        if (selectOptionValue === "1") {
            count = 1;
            FillUpPlayArray("1");
        }
        else if (selectOptionValue === "2") {
            count = 2;
            FillUpPlayArray("1"); FillUpPlayArray("2");
        }
        else if (selectOptionValue === "3") {
            count = 3;
            FillUpPlayArray("1"); FillUpPlayArray("2"); FillUpPlayArray("3");
        }
        //Update the various tables depending on the dropdown choosen this
        //is connected to the html so that it is dynamic
        //Depening on the results that the user receives
        addUserTable("dynamicUserDiv", chooseCustomerArray, count);
        addDynamicTable("dynamicPlayDiv", count);

        var myTableDiv = document.getElementById("dynamicPlayDiv");
        var pFinish = document.createElement('p');
        pFinish.innerHTML = "Try Again ! You have nothing to lose."
        myTableDiv.appendChild(pFinish);
        //Run the reset function 
        Reset();
        }
    //Another function to update the table depending on the users results and drop down selection
    function addUserTable(divname, array, count) {
        var myTableDiv = document.getElementById(divname);

        //This updates the p tag html element as well as the count depending on the number of plays
        var pCount = document.createElement('p'); pCount.innerHTML = "Number of Plays is " + count;
        myTableDiv.appendChild(pCount);
        var pTitle = document.createElement('p'); pTitle.innerHTML = "You picked the following numbers:";
        myTableDiv.appendChild(pTitle);

        var table = document.createElement('TABLE');
        //Border size for the table
        table.border = '1';

        var tableBody = document.createElement('TBODY');
        table.appendChild(tableBody);


        for (var i = 0; i < 1; i++) {
            var tr = document.createElement('TR');
            tableBody.appendChild(tr);

            for (var j = 0; j < 6; j++) {
                var td = document.createElement('TD');
                td.width = '75';
                td.appendChild(document.createTextNode(array[j]));
                tr.appendChild(td);
            }
        }
        myTableDiv.appendChild(table);


        }
    function addDynamicTable(divname, count) {
        var myTableDiv = document.getElementById(divname);
        var array = new Array();

        for (var i = 0; i < count; i++) {
            //Depending on the results of the play display a certain message depending on the results
            //This basically makes the p tag in the inner html dynamic depending on what happens.
            var p = document.createElement('p');
            if (i === 0) { array = array1Play; p.innerHTML = "Numbers drawn in 1st Play:"; }
            else if (i === 1) { array = array2Play; p.innerHTML = "Numbers drawn in 2nd Play:"; }
            else if (i === 2) { array = array3Play; p.innerHTML = "Numbers drawn in 3rd Play:"; }



            var table = document.createElement('TABLE');
            table.border = '1';

            var tableBody = document.createElement('TBODY');
            table.appendChild(tableBody);

            var tr = document.createElement('TR');
            tableBody.appendChild(tr);
            var winMessage = ""; var winCount = 0;
            for (var j = 0; j < 6; j++) {
                var td = document.createElement('TD');
                td.width = '75';
                td.appendChild(document.createTextNode(array[j]));

                for (var a = 0; a < chooseCustomerArray.length; a++) {
                    if (array[j] === chooseCustomerArray[a]) {
                        td.style.backgroundColor = 'yellow'; winCount++;
                    }
                }
                tr.appendChild(td);
            }
            //If the user gets no numbers that they've choosen, display that they have no matches
            if (winCount === 0) { winMessage = " no matches"; }
            //Else If the user gets 1 match that they've choosen, display that they get no prize
            else if (winCount === 1) { winMessage = " no prize for 1 match" }
            //Else If the user gets 2 matches that they've choosen, display that they get 5$
            else if (winCount === 2) { winMessage = " 2 matches win $5" }
            //Else If the user gets 3 matches that they've choosen, display that they get 10$
            else if (winCount === 3) { winMessage = " 3 matches win $10" }
            //Else If the user gets 4 matches that they've choosen, display that they get 100$
            else if (winCount === 4) { winMessage = " 4 matches win $100" }
            //Else If the user gets 5 matches that they've choosen, display that they get 10000$
            else if (winCount === 5) { winMessage = " 5 matches win $10000" }
            //Else If the user gets 6 matches that they've choosen, display that they get 1000000$
            else if (winCount === 6) { winMessage = " 6 matches win $1000000" }

            p.innerHTML += winMessage;
            myTableDiv.appendChild(p);
            myTableDiv.appendChild(table);


        }

        }
}