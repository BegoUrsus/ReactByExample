import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';


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
          <Heading heading = {name} key={index}/>
        );
      }
    );
    return (
      <thead>
        <tr>
          {headings}
        </tr>
      </thead>
    );
  }
}


class Row extends Component {
  render() {
    return (
      <tr key={this.props.changeSet.key}>
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

  handleEvent (data) {
    console.log("handleEvent");
    this.setState({ changeSets: data.changeSets});
  }


  componentDidMount() {
    console.log("componentDidMount");
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
            <Rows changeSets={this.props.changeSets} />
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
