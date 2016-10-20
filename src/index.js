//var component = require('./component.js');
//
//component();

import React,{Component} from 'react';
import ReactDom,{render} from 'react-dom';

import * as Comp from './component.js';
console.log(Comp)

class App extends Component{
    render(){
        return (
            <div>
                <h1>你好</h1>
            </div>
            );
    }
}

let root = document.querySelector('#app');
render(<App/>,root);