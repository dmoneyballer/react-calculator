import React, { Component } from 'react';
import './App.css';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { ClearButton } from './components/ClearButton';
import * as math from 'mathjs';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      input: ""
    };
  }

  componentDidMount () {
    document.addEventListener("keydown", this.handleNumpad);
  }

  addToInput = val => {
    if (isNaN(val) && isNaN(this.state.input[this.state.input.length-1])){
      this.setState({input: this.state.input});
    } else {
      this.setState({input: this.state.input + val});
    }
  };

  handleEqual = () => {
    if (isNaN(this.state.input[this.state.input.length-1])) {
      this.setState({input: this.state.input})
    } else {
      let answer = String(math.eval(this.state.input))
      this.setState({input: answer})
    }
  };

  handleNumpad = e => {
    if (e.key === "Backspace") {
      let back = this.state.input.split("");
      back.pop();
      back = back.join("");
      this.setState({input: back});
    }
    if (e.key === "Delete") {
      this.handleClear();
    }
    if (e.key === "Enter") {
      this.handleEqual();
    } else if(e.key === "0" || e.key === "." || e.key === "1"  || e.key === "2" || e.key === "3" || e.key === "4" || e.key === "5" || e.key === "6" || e.key === "7" || e.key === "8" || e.key === "9" || e.key === "/" || e.key === "*" || e.key === "-" || e.key === "+") {
        if (isNaN(Number(e.key)) && isNaN(this.state.input[this.state.input.length-1])) {
        this.setState({input: this.state.input});
        } else {
        this.setState({input: this.state.input + e.key});
        }
      }
  }

handleClear = (e) => this.setState({input: ""})

  render() {
    return (<div className="App">
        <div className="calc-wrapper">
          <Input input={this.state.input}></Input>
          <div className="row">
            <Button handleClick={this.addToInput}>7</Button>
            <Button handleClick={this.addToInput}>8</Button>
            <Button handleClick={this.addToInput}>9</Button>
            <Button handleClick={this.addToInput}>/</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>4</Button>
            <Button handleClick={this.addToInput}>5</Button>
            <Button handleClick={this.addToInput}>6</Button>
            <Button handleClick={this.addToInput}>*</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>1</Button>
            <Button handleClick={this.addToInput}>2</Button>
            <Button handleClick={this.addToInput}>3</Button>
            <Button handleClick={this.addToInput}>+</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>.</Button>
            <Button handleClick={this.addToInput}>0</Button>
            <Button handleClick={() => this.handleEqual()}>=</Button>
            <Button handleClick={this.addToInput}>-</Button>
          </div>
          <div className="row">
          <ClearButton handleClear={this.handleClear}>
            Clear
          </ClearButton>
          </div>
        </div>

      </div>);
  }
}

export default App;
