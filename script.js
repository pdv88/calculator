let operator = ""
let currentVal = ""
let previousVal = ""


let numbers = document.querySelectorAll(".numBtn")
let operators = document.querySelectorAll(".oprBtn")

let clear = document.querySelector(".clear")
let del = document.querySelector(".delete")
let equal = document.querySelector(".equalBtn")
let decimal = document.querySelector(".decBtn")

let previousDisplay = document.querySelector(".previousDisplay")
let currentDisplay = document.querySelector(".currentDisplay")



del.addEventListener("click", function(){
    currentVal = currentVal.slice(0, -1)
    currentDisplay.textContent = currentVal
})

clear.addEventListener("click", function(){
    currentVal = ""
    previousVal = ""
    currentDisplay.textContent = currentVal
    previousDisplay.textContent = previousVal
})

numbers.forEach((num) => num.addEventListener("click", function(e){
    del.disabled = false
    handleNumber(e.target.textContent)
    currentDisplay.textContent = currentVal
}))

operators.forEach((opr) => opr.addEventListener("click", function(e){
    handleOperator(e.target.textContent)
    previousDisplay.textContent = `${operator} ${previousVal}`
    currentDisplay.textContent = currentVal
}))

equal.addEventListener("click", function(){
    if(currentVal != "" && previousVal != ""){
        operate()
        currentDisplay.textContent = previousVal 
        currentVal = previousVal
        previousVal = ""
        del.disabled = true
    }
})

decimal.addEventListener("click", function(){
    if(!currentVal.includes(".")){
        currentVal += "."
        currentDisplay.textContent = currentVal
    }
})

function handleNumber(number){
    currentVal += number
}

function handleOperator(opr){
    operator = opr
    previousVal = currentVal
    currentVal = ""
}

function operate() {
    previousVal = Number(previousVal)
    currentVal = Number(currentVal)

    if(operator === "-") {
        previousVal -= currentVal
    } else if (operator === "+") {
        previousVal += currentVal
    } else if (operator === "x") {
        previousVal *= currentVal
    } else if (operator === "/") {
        if(currentVal <= 0){
            previousVal = "ERROR"
            currentDisplay.textContent = previousVal
            previousDisplay.textContent = ""
            operator = "" 
            currentVal = ""
            return
        } else {
        previousVal /= currentVal
        }
    }
    previousVal = roundNum(previousVal)
    previousVal = previousVal.toString()
    currentVal = currentVal.toString()
}

function roundNum(num) {
    return Math.round(num * 1000) / 1000
}
