'use strict';

document.addEventListener('DOMContentLoaded', () => {
    //rowDiv needs to be let becuase it is redefined later.
    //and needs to be up here so it can be used in the if and out.
    let rowDiv = document.createElement("div")//make new row
    const allButtons = [7, 8, 9, '/', 4, 5, 6, '*', 1, 2, 3, '+', 'C', 0, '.', '-', '='];
    const buttonsPerRow =4;
    const buttonSize = 40;
    
    for(let i =0; i<allButtons.length; i++){ 
        if(i%buttonsPerRow == '0') { //if row is full
            rowDiv = document.createElement("div"); //make new row
            document.getElementById('buttons').append(rowDiv); //add row
        }
        const button = document.createElement('button');
              button.innerHTML = allButtons[i]; //put the index as the inner HTML
              button.style.width = buttonSize + 'px';
              button.style.height = buttonSize + 'px';
              button.addEventListener('click', calcButtonClicked);
        if(allButtons[i] === '=') button.style.width = buttonSize*4 + 'px';
        //add the buttons to the rows
        rowDiv.append(button);
    }
    
    document.getElementById('result').innerHTML = 0;
});

let entry = [];
const calcButtonClicked = (event) => {
    const val = event.target.innerHTML;
    let currResult = Number(document.getElementById('result').innerHTML)
    if(isNaN(Number(val))){
        //do an operation
        //first save the input
        entry.push(currResult);
        //If they want the final answer
        if (val === '=') {
            //turn entry array into a string
            const entryString = entry.join('');
            //evaluate answer
            const answer = eval(entryString);
            console.log(answer);
            //Display asnwer
            document.getElementById('result').innerHTML = answer;
            //empty out the entry 
            entry = []
        } else { //they pressed a number
            //then save the operation
            entry.push(val);
            //then 0 out the result field
            document.getElementById('result').innerHTML = 0;
        }
    } else {
        //is result was 0, make it an
        if(currResult ===0) currResult = ``;
        //interpret current result as a string and concat that was typed
        const output = `${currResult}` + event.target.innerHTML;
        //set result innerHTML to concatenated string.
        document.getElementById('result').innerHTML = output;
    }
}
    //now that I am through, ad the operator buttons
    const operators = ['/', '*', '-', '+', '.', 'C'];
    //traverse the hierarchy of divs just made and 
    //put on special operator button at the end of each row
    const buttonDivs = document.getElementById('buttons').childNodes;
    for(let i=0; i<buttonDivs.length; i++) {
        const button = document.createElement('button');
              button.innerHTML = operators[i]; //put the index as the innerHTML
              button.addEventListener('click', (event) => {
                  document.getElementById('result').innerHTML +=
                      event.target.innerHTML;
              });
        buttonDivs[i].append(button);
    }
    
    document.getElementById('result').innerHTML = 0
