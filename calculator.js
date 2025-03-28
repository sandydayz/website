/*
Gonna make a string parser that
calculates an input expression.
*/

//switch to modern
"use strict";

//variables
let expression = undefined;
let parsed = [];
let numbers = [];
let syntaxes = [];
let spaces = [];
let currentCharacter = undefined;
let accumulator = "";
let result = undefined;

//get input
confirm("Write a math expression to be calculated.");
expression = prompt( "Expression:", undefined );

//parse expression
parsed = expression.from("");

//iterate each character in the expression
for (let i = 0; i <= expression.length; i++){
    currentCharacter = parsed[i];

    if (/\d/.test(currentCharacter)){
        //if the check for it being a digit
        //is true, just accumulate it
        accumulator += currentCharacter;
    } else if (/[+-*/]/.test(currentCharacter)){
        //if the check for it being an operator
        //is true, add the previous number and
        //the operator to the stack to let the
        //operator affect its target with it
        numbers.push(parseInt(accumulator, 10));
        syntaxes.push(currentCharacter);
        //reset accumulator
        accumulator = "";
    }
}

//test
print(numbers);
print(syntaxes);


