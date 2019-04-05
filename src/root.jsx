import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {route} from 'react-router';
import App from './main';
import './root.less';

ReactDom.render(<App />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept()
}
