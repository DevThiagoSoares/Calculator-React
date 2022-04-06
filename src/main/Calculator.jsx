import React, { Component} from "react";
import './Calculator.css';

import Button from "../components/Button";
import Display from "../components/Display";

// Estado inicial
const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0

}

export default class Calculator extends Component {
    
    state = {...initialState};

    constructor(props) {
        super(props);
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }

    clearMemory() {
        this.setState({...initialState});
    }
    
    setOperation(operation) {
        // verifica se o current está no indice 0
        if (this.state.current === 0) {
            // recebe o valor de operation
            // muda o estado de current par 1, clearMemory para true
            this.setState({operation, current: 1, clearDisplay: true});
        } else {
            const equals = operation === '=';
            const currentOperation = this.state.operation;

            const values = [...this.state.values];

            try {

                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
                if (isNaN(values[0]) || !isFinite(values[0])) {
                    this.clearMemory();
                    return;
                }
            } catch (error) {
                    values[0] = this.state.values[0];
            }
                
                values[1] = 0;               
                this.setState({
                    displayValue: values[0],
                    operation: equals ? null : operation,
                    current: equals ? 0 : 1,
                    clearDisplay: !equals,
                    values
                })

        }
    }
    
    addDigit(n) {
        // Para não permitir que seja digitado mais de 1 ponto 
        if(n === '.' && this.state.displayValue.includes('.')) {
            return;
        }
        // Se o display tiver 0, limpar antes de acresentar o número
        // para não ficar 0 a esquerda
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay;
        // Se o display for limpo ele pega um valor vazio
        // se não pega o estado de displayValue
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        // Novo valor que sera colocado no displayValue
        const displayValue = currentValue + n;
        // Mudar o estado
        this.setState({ displayValue, clearDisplay: false})

        // verifica se é um numero que esta sendo digitado
        // pois alem do ponto, somente numeros estao disponiveis
        if (n !== '.') {
            // pega o indice do valor que esta alterando
            const i = this.state.current;
            // converte para float
            const newValue = parseFloat(displayValue);
            // clona em um novo array
            const values = [...this.state.values];
            // altera o valor atual
            values[i] = newValue;
            // substitui o novo array dentro de state
            this.setState({values});
            console.log(values)
        }
    }
    
    render(){
         
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} operation/>
            </div>
        )
    }
}