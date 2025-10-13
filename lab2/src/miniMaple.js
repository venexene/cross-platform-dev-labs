class PolynomialTerm {
    constructor(coefficient = 1, variable = '', exponent = 0) {
        this.coefficient = coefficient;
        this.variable = variable;
        this.exponent = exponent;
    }

    static parse(termString) {
        const cleanTerm = termString.replace(/\s+/g, '');
        
        const sign = cleanTerm.startsWith('-') ? -1 : 1;
        const unsignedTerm = cleanTerm.replace(/^[+-]/, '');
        
        const variableMatch = unsignedTerm.match(/[a-z]/);
        if (!variableMatch) {
            return new PolynomialTerm(parseFloat(unsignedTerm) * sign, '', 0);
        }

        const variable = variableMatch[0];
        const variableIndex = unsignedTerm.indexOf(variable);
        
        const coefficientPart = unsignedTerm.slice(0, variableIndex).replace('*', '');
        let coefficient = coefficientPart ? parseFloat(coefficientPart) : 1;
        coefficient *= sign;

        const exponentPart = unsignedTerm.slice(variableIndex + 1);
        let exponent = 0;
        
        if (exponentPart.startsWith('^')) {
            exponent = parseInt(exponentPart.slice(1)) || 1;
        } else if (exponentPart.length === 0) {
            exponent = 1;
        }

        return new PolynomialTerm(coefficient, variable, exponent);
    }

    differentiate(respectToVariable) {
        if (this.variable !== respectToVariable || this.exponent === 0) {
            return new PolynomialTerm(0, '', 0);
        }

        const newCoefficient = this.coefficient * this.exponent;
        const newExponent = this.exponent - 1;
        
        return new PolynomialTerm(newCoefficient, this.variable, newExponent);
    }

    toString() {
        if (this.coefficient === 0) return '';
        
        const absCoefficient = Math.abs(this.coefficient);
        const sign = this.coefficient < 0 ? '-' : '+';
        
        let termString = '';
        
        if (this.exponent === 0) {
            termString = absCoefficient.toString();
        } else {
            const coefficientPart = absCoefficient !== 1 ? absCoefficient.toString() : '';
            const exponentPart = this.exponent === 1 ? '' : `^${this.exponent}`;
            termString = `${coefficientPart}${this.variable}${exponentPart}`;
        }

        return { sign, termString };
    }
}


class MiniMaple {
    constructor() {
        this.termPattern = /([+-]?\d*\.?\d*\*?[a-z]?\^?\d*)/g;
    }

    isValidPolynomial(expression) {
        if (!expression || typeof expression !== 'string') return false;
        
        const cleanExpression = expression.replace(/\s+/g, '');
        const polynomialRegex = /^([+-]?(\d*\.?\d*\*?[a-z](\^\d+)?|\d+\.?\d*))+$/;
        
        return polynomialRegex.test(cleanExpression);
    }

    parsePolynomial(expression) {
        const cleanExpression = expression.replace(/\s+/g, '');
        const termStrings = cleanExpression.match(this.termPattern) || [];
        
        return termStrings
            .filter(term => term.trim() !== '')
            .map(term => PolynomialTerm.parse(term))
            .filter(term => term.coefficient !== 0);
    }

    diff(expression, respectToVariable) {
        if (!this.isValidPolynomial(expression)) {
            throw new Error('Некорректный формат полинома');
        }

        if (!respectToVariable || !/^[a-z]$/.test(respectToVariable)) {
            throw new Error('Некорректная переменная дифференцирования');
        }

        const terms = this.parsePolynomial(expression);
        const differentiatedTerms = terms.map(term => 
            term.differentiate(respectToVariable)
        );

        return this.formatResult(differentiatedTerms);
    }

    formatResult(terms) {
        const nonZeroTerms = terms.filter(term => term.coefficient !== 0);
        
        if (nonZeroTerms.length === 0) {
            return '0';
        }

        const termStrings = nonZeroTerms.map((term, index) => {
            const { sign, termString } = term.toString();
            const prefix = index === 0 && sign === '+' ? '' : sign;
            return `${prefix}${termString}`;
        });

        return termStrings.join('');
    }
}

module.exports = { MiniMaple: MiniMaple };