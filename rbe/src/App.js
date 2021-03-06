import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import $ from 'jquery';
import jquery from 'jquery';
import timeago from 'timeago';

class Heading extends Component {
  render() {
    var headingStyle = {
      backgroundColor: 'LightCyan',
      color: 'Gray',
      fontSize: '18px'
    };
    return (
      <th style={headingStyle}>{this.props.heading}</th>
    );
  }
}

class Headings extends Component {
  render() {
    var headings = this.props.headings.map(
      function(name, index) {
        return(
          <Heading heading = {name} key={"heading-"+index}/>
        );
      }
    );
    return (
      <thead>
        <tr className='table-th'>
          {headings}
        </tr>
      </thead>
    );
  }
}


class Row extends Component {
  render() {
    var trStyle = {backgroundColor: 'aliceblue'};
    return (
      <tr key={this.props.changeSet.key} style={trStyle}>
        <td> { this.props.changeSet.when } </td>
        <td> { this.props.changeSet.who } </td>
        <td> { this.props.changeSet.description } </td>
      </tr>);
  }
}

class Rows extends Component {
  render() {
    var rows = this.props.changeSets.map(function(changeSet, index){
      return (
        <Row changeSet = {changeSet} key = {index}/>
      );
    });
    return (
      <tbody>
        {rows}
      </tbody>
    );
  }
}

class RecentChangesTable extends Component {
  render() {
    return (
      <table>
        {this.props.children}
      </table>
    );
  }
}






class App extends Component {

  constructor(props) {
    console.log("constructor");
    super(props);
    this.state = {
      changeSets: [],
      headings: ['Updated At', 'Author', 'Change']
    }
  }

  fetchData() {
    var self = this;

    $.get('http://openlibrary.org/recentchanges.json?limit=10').then(function(events) {
      var promises = $.map(events, function(change) {//$.map() loops through events.items and returns an array
          return $.get('http://openlibrary.org'+change.author.key+'.json').then(function(authordata) {
            console.log(authordata);
            change.authorname = authordata.displayname;
            return change;
          });
      });
      
      Promise.all(promises).then(function(results){
        let changeSets = [];
        results.map(function(change) {
          changeSets.push(
            {
              "when": jquery.timeago(change.timestamp),
              "who": change.authorname,
              "description": change.comment
            }
          );
        })
        self.setState({changeSets: changeSets});
      });
  });
};




  componentDidMount() {
    console.log("componentDidMount");
    this.fetchData();
  }

  componentWillMount() {
    console.log("componentWillMount");
  }

  render() {
    console.log("render");

    return (
      <div className="App">
        
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ReactJS by Example</h1>
        </header>
        
        <section>
          <h1>
            {this.props.title}
          </h1>
          <RecentChangesTable>
            <Headings headings={this.props.headings} />
            <Rows changeSets={this.state.changeSets} />
          </RecentChangesTable>
        </section>
      
      </div>
    );  

  }
}



App.conextTypes = {
  headings: PropTypes.array,
  changeSets: PropTypes.array,
  title: PropTypes.string
}


export default App;
