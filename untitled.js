/*

DadeS
Just trying to learn javascript,
see what I can do

*/

//switch to modern
"use strict";

//variables
let message = "hi";
let expression = undefined;


//calculator
confirm("Write a math expression to be calculated.");
expression = prompt( "Expression:", undefined );

//allows string to be evaluated
// **UNSECURE** vulnerable to injection attacks
alert(eval(expression));

