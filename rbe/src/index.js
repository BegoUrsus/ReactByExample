import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var data = [
    { 
      "when": "2 minutes ago",
      "who": "Jill Dupre",
      "description": "Created new account"
    },
    {
      "when": "1 hour ago",
      "who": "Lose White",
      "description": "Added fist chapter"
    },
    {
      "when": "2 hours ago",
      "who": "Jordan Whash",
      "description": "Created new account"
    }
];

var headings = ['When', 'Who', 'Description'];
var title = "Recent changes";
var props = {headings: headings, changeSets: data, title: title};

/*ReactDOM.render(
    <App {changeSets = {data} headings = {headings} title={title}/>, 
    document.getElementById('root')
);*/
ReactDOM.render(
    <App {...props} headings = {['Updated at', 'Author', 'Change']}/>, 
    document.getElementById('root')
);

registerServiceWorker();
