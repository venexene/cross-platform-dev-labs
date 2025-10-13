import {MiniMaple} from "../src/miniMaple.js";
document.addEventListener('DOMContentLoaded',setup)

function setup() {
    document.getElementById('diffButton').onclick = addSomething;
}

function addSomething(){
    const polynomial = document.getElementById('polynomial').value;
    const variable = document.getElementById('variable').value;
    const resultDiv = document.getElementById('result');

    const miniMaple = new MiniMaple();
    try {
        const result = miniMaple.diff(polynomial, variable);
        resultDiv.textContent = `Результат: ${result}`;
    } catch (error) {
        resultDiv.textContent = `Ошибка: ${error.message}`;
    }
    
}