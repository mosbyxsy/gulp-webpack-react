import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {route} from 'react-router';
import './layout.scss';
import './root.less';

class App extends Component{
  render() {
    return (
      <div className="app-wrap">
        这是测试页面
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));



