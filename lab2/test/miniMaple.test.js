const { MiniMaple } = require('../src/miniMaple');

describe('MiniMaple', () => {
    let miniMaple;

    beforeEach(() => {
        miniMaple = new MiniMaple();
    });

    test('Дифференцирование полинома по x', () => {
        expect(miniMaple.diff('4*x^3 - x^2 + 2*y^2', 'x')).toBe('12x^2-2x');
    });

    test('Дифференцирование полинома по y', () => {
        expect(miniMaple.diff('4*x^3 - x^2 + 2*y^2', 'y')).toBe('4y');
    });

    test('Дифференцирование константы', () => {
        expect(miniMaple.diff('5', 'x')).toBe('0');
    });

    test('Проверка на пустой полином', () => {
        expect(() => miniMaple.diff('', 'x')).toThrow('Некорректный формат полинома');
    });

    test('Дифференцирование полинома по x', () => {
        expect(miniMaple.diff('4*x^3 - x^2 + 2*y^2 -5x^2 +10y^2', 'x')).toBe('12x^2-2x-10x');
    });

    test('Дифференцирование полинома по y', () => {
        expect(miniMaple.diff('4*x^3 - x^2 + 2*y^2 -5x^2 +10y^2', 'y')).toBe('4y+20y');
    });
    test('Дифференцирование полинома степени 1', () => {
        expect(miniMaple.diff('y', 'y')).toBe('1');
    });
    test('Дифференцирование полинома по другой переменной', () => {
        expect(miniMaple.diff('5x', 'a')).toBe('0');
    });

});
