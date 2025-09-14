// Вырианты функции
function func1(x) {
    return x**2 - Math.cos(x);
}

function func2(x) {
    return x**3 + Math.sin(x);
}

function func3(x) {
    return x**2 - x + 1;
}

function func4(x) {
    return x**2 - x + 1;
}

function func5(x) {
    return x * Math.cos(x);
}

function func6(x) {
    return 4*x - x**2;
}

function func7(x) {
    return x + x**2 - x**3;
}

function func8(x) {
    return x/16 + 4*Math.sin(x) - 3;
}


// Метод левых прямоугольников
function leftRiemannSum(a, b, f, n = 1000) {
    const width = (b - a) / n;
    let area = 0;

    for (let i = 0; i < n; i++) {
        let x_i = a + i * width;
        area += f(x_i) * width;
    }

    return area;
}


// Метод правых прямоугольников
function rightRiemannSum(a, b, f, n = 1000) {
    const width = (b - a) / n;
    let area = 0;

    for (let i = 1; i < n + 1; i++) {
        let x_i = a + i * width;
        area += f(x_i) * width;
    }

    return area;
}


// Метод средних прямоугольников
function midpointRule(a, b, f, n = 1000) {
    const width = (b - a) / n;
    let area = 0;

    for (let i = 0; i < n; i++) {
        let x_l = a + i * width;
        let x_r = x_l + width;
        let x_mid = (x_l + x_r) / 2;
        area += f(x_mid) * width;
    }

    return area;
}


// Метод трапеции
function trapezodialRule(a, b, f, n = 1000) {
    const width = (b - a) / n;
    let area = 0;

    area += f(a)
    for (let i = 1; i < n; i++) {
        area += 2 * f(a + i * width);
    }
    area += f(b);

    return area * width / 2;
}


// Получение функции от пользователя
function getFunc() {
    let funcs = [func1, func2, func3, func4, func5, func6, func7, func8];

    let funcChoice = prompt (
        "Выберите функцию для интегрирования:\n" +
        "1. f(x) = x² - cos(x)\n" +
        "2. f(x) = x³ + sin(x)\n" +
        "3. f(x) = x² - x + 1\n" +
        "4. f(x) = x² - x + 1\n" +
        "5. f(x) = x * cos(x)\n" +
        "6. f(x) = 4x - x²\n" +
        "7. f(x) = x + x² - x³\n" +
        "8. f(x) = x/16 + 4*sin(x) - 3"
    );
    if (funcChoice == null) return;

    funcChoice = parseInt(funcChoice);
    if (isNaN(funcChoice) || funcChoice < 1 || funcChoice > 8) {
        alert("Ошибка!!! Нужно ввести число от 1 до 8"); return;
    }

    return funcs[funcChoice - 1];
}


// Получение метода от пользователя
function getMethod() {
    let methods = [leftRiemannSum, rightRiemannSum, midpointRule, trapezodialRule]

    let methodChoice = prompt (
        "Выберите метод интегрирования:\n" +
        "1. Метод левых прямоугольников\n" +
        "2. Метод правых прямоугольников\n" +
        "3. Метод средних прямоугольников\n" +
        "4. Метод трапеций"
    )
    if (methodChoice == null) return;

    methodChoice = parseInt(methodChoice);
    if (isNaN(methodChoice) || methodChoice < 1 || methodChoice > 4) {
        alert("Ошибка!!! Нужно ввести число от 1 до 4"); return;
    }

    return methods[methodChoice - 1];
}


// Получение диапазона
function getRange() {
    let a = prompt("Введите нижний предел интегрирования a:");
    if (a == null) return;
    
    a = parseFloat(a);
    if(isNaN(a)) {
        alert("Ошибка!!! Нужно ввести число")
        return;
    }

    let b = prompt("Введите верхний предел интегрирования a:");
    if (b == null) return;
    
    b = parseFloat(b);
    if(isNaN(b)) {
        alert("Ошибка!!! Нужно ввести число");
        return;
    }

    if (a >= b) {
        alert("Ошибка!!! Нижний предел должен быть меньше верхнего");
    }

    return [a, b];
}


function runCalcIntegral() {
    // Выбор функции
    const selectedFunction = getFunc();
    if (!selectedFunction) return;

    // Выбор метода
    const selectedMethod = getMethod();
    if (!selectedMethod) return;

    // Получение диапозона
    const range = getRange();
    if (!range) return;
    const [a, b] = range;

    let result = selectedMethod(a, b, selectedFunction); // Вычисление интеграла

    alert (
        `Результат интегрирования: ${result.toFixed(6)}`
    )
}