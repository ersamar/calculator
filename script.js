var exponent = true;
var output = document.getElementById('output');
var ans = null;
var memory = 0; // Initialize memory to zero

// for numbers
function number(number){
    if (number === 'π') {
        output.value += Math.PI;
    } else {
        output.value += number;
    }
}

// for operators
function operator(operator){
    output.value += operator;
    exponent = false;
}

// clear all function
function clearall(){
    output.value = '';
    exponent = false;
}

// ANS function
function useAns() {
    if (ans !== null) {
        output.value += ans;
        exponent = false;
    }
}

// calculation of square root
function addsquareroot(){
    output.value += "√";
}
function squareroot(){
    var sqr = output.value;
    var number = parseFloat(sqr.substring(1));
    output.value = Math.sqrt(number);
}

// erase input one by one
function del(){
    var del = output.value;
    output.value = del.slice(0,-1);
}

// calculation of cube root
function addcuberoot(){
    output.value += "3√";
}
function cuberoot(){
    var statement = output.value;
    var number = parseFloat(statement.substring(2));
    output.value = Math.cbrt(number);
}

// calculation of raised to any power
function raisetopower(symbol){
    var power = output.value;
    output.value += symbol;
}

// sine function
function addsine(){
    output.value += 'sin(';
}
function evaluatesin(){
    var statement = output.value;
    if (statement.startsWith('sin(')){
        var number = statement.substring(4);
        var degree = parseFloat(number);
        var radian = (degree * Math.PI) / 180;
        output.value = Math.sin(radian);
    }
}

// calling previous result
function getprevresult() {
    var previousResult = document.getElementById('previous-display').textContent;
    output.value = previousResult;
}

// cos function
function addcos(){
    output.value+= 'cos(';
}
function evaluatecos(){
    var statement = output.value;
    if (statement.startsWith('cos(')){
        var number = statement.substring(4);
        var degree = parseFloat(number);
        var radian = (degree * Math.PI) / 180;
        output.value = Math.cos(radian);
    }
}

// tan function
function addtan(){
    output.value += 'tan(';
}
function evaluatetan(){
    var statement = output.value;
    if (statement.startsWith('tan(')){
        var number = statement.substring(4);
        var degree = parseFloat(number);
        var radian = (degree * Math.PI) / 180;
        output.value = Math.tan(radian);
    }
}

// euler's constant
function addEuler(){
    output.value += 'e';
}
function euler(){
    var statement = output.value;
    var evaluatedStatement = statement.replace(/e/g, Math.E);
    output.value = eval(evaluatedStatement);
}

// calculation of LCM of array of numbers
function findLCM() {
    var numbers = output.value.split(',');
    output.value = lcm(numbers);
}
function lcm(numbers){
    if (numbers.length === 0){
        return 0;
    }
    function gcd(a, b){
        if (b === 0){
            return a;
        }
        return gcd(b, a % b);
    }
    var lcmResult = parseInt(numbers[0], 10);
    for (var i = 1; i < numbers.length; i++){
        var currentNumber = parseInt(numbers[i], 10);
        lcmResult = (lcmResult * currentNumber) / gcd(lcmResult, currentNumber);
    }
    return lcmResult;
}

// calculation of factorial
function factorial(){
    var number = parseInt(output.value);
    if (isNaN(number)){
        alert("Enter value to take factorial.");
    } else if (number < 0){
        alert("Doesn't work for negative integers.")
    } else {
        var fact = 1;
        for (var i = 1; i <= number; i++){
            fact *= i;
        }
        output.value = fact;
    }
}

// calculation of modulus
function percentage() {
    var statement = output.value;
    var parts = statement.split("%");
    var base = parseFloat(parts[0]);
    var rate = parseFloat(parts[1]);
    if (!isNaN(base) && !isNaN(rate)) {
        output.value = (rate / 100) * base;
    } else {
        output.value = 'Error: Invalid input';
    }
}

// natural log
function addnaturalog(){
    output.value += "ln(";
}
function naturalog(){
    var statement = output.value;
    var number = parseFloat(statement.substring(3));
    output.value = Math.log(number);
}

// log
function addlog(){
    output.value += "log(";
}
function log(){
    var statement = output.value;
    var number = parseFloat(statement.substring(4));
    output.value = Math.log10(number);
}

// M+ function (Add to memory)
function addToMemory() {
    if (output.value !== '') {
        memory += parseFloat(output.value);
        output.value = '';
    }
}

// M- function (Subtract from memory)
function subtractFromMemory() {
    if (output.value !== '') {
        memory -= parseFloat(output.value);
        output.value = '';
    }
}

// final result function
function result(){
    var statement = output.value;
    if (statement.includes("^")){
        var parts = statement.split("^");
        var base = parseFloat(parts[0]);
        var exp = parseFloat(parts[1]);
        output.value = Math.pow(base, exp);
    } else if (statement.startsWith("√")){
        squareroot();
    } else if (statement.startsWith("3√")){
        cuberoot();
    } else if (statement.startsWith("ln")){
        naturalog();
    } else if (statement.startsWith("log(")){
        log();
    } else if (statement.includes("e")){
        euler();
    } else if (statement.includes("%")){
        percentage();
    } else if (statement.startsWith("sin(")){
        evaluatesin();
    } else if (statement.startsWith("cos(")){
        evaluatecos();
    } else if (statement.startsWith("tan(")){
        evaluatetan();
    } else {
        // Replace π with its numerical value
        statement = statement.replace(/π/g, Math.PI);
        output.value = eval(statement);
    }
    
    // Store the result in ans variable
    ans = output.value;
    
    var previousResult = output.value;

    // Clear the input field
    output.value = '';

    // Remove any previous result display
    var previousDisplay = document.getElementById('previous-display');
    if (previousDisplay) {
        previousDisplay.remove();
    }

    // Create a result display element
    var resultDisplay = document.createElement('span');
    resultDisplay.id = 'previous-display';
    resultDisplay.textContent = previousResult;
    resultDisplay.style.fontSize = '12px';
    resultDisplay.style.display = 'block';
    output.parentNode.insertBefore(resultDisplay, output);

    // Create a wrapper div for the input field and result display
    var wrapperDiv = document.createElement('div');
    wrapperDiv.style.position = 'relative';
    wrapperDiv.appendChild(resultDisplay);
    output.parentNode.insertBefore(wrapperDiv, output);
    wrapperDiv.appendChild(output);
}

function saveResult(result) {
    $.ajax({
        url: 'server.php',
        method: 'POST',
        data: { result: result },
        success: function(response) {
            console.log(response); // Log the response from the server
            // You can handle the response as needed
        },
        error: function(xhr, status, error) {
            console.error('Error:', error); // Log any errors
        }
    });
}

// Function to retrieve results from database
function getResults() {
    $.ajax({
        url: 'server.php',
        method: 'GET',
        success: function(response) {
            console.log(response); // Log the response from the server
            // You can handle the response as needed
        },
        error: function(xhr, status, error) {
            console.error('Error:', error); // Log any errors
        }
    });
}
