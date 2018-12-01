import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {route} from 'react-router';
import Header from './component/header/index';
import Content from './component/content/index';
import Footer from './component/footer/index';
import './root.less';

class App extends Component{
  render() {
    return (
      <div className="app-wrap">
      	<Header/>
        <Content/>
        <Footer/>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));



