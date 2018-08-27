import React from 'react';
import logo from './patent-up-noback.png';
import './App.css';
import SearchBar from './components/SearchBar/searchbar';
//import SearchTerm from './components/SearchTerms/searchterms';
import SearchResults from './components/SearchResults/searchresults';
//import SearchResults from './components/SearchResults/searchresults';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      terms: [],
      termList: ' ',
      search: false,
      list: ' ',
      jsonResponse: [],
      message: 'Looking for Patent Owners...'
    };

  //  this.searchTerms = this.searchTerms.bind(this);
    this.changeTermList = this.changeTermList.bind(this);
    this.changeSearch=this.changeSearch.bind(this);
    this.changeList = this.changeList.bind(this);
    this.changeJson = this.changeJson.bind(this);
    this.changeMessage = this.changeMessage.bind(this);

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>by Tami Dynes</p>
          <h1 className="App-title">Find Top Patent Owners in Your Field</h1>
        </header>
        <SearchBar onSearch={this.changeSearch} changeList={this.changeList} changeTermList={this.changeTermList} changeMessage={this.changeMessage} terms={this.state.termList} response={this.changeJson}/>
        <div className="App-display">

          <SearchResults searchState={this.state.search} list={this.state.list} message={this.state.message} termList={this.state.termList} jsonResponse={this.state.jsonResponse}/>

        </div>
      </div>
    );
  }

  changeSearch(search) {

    //console.log(this.PTO.getOwners(term));

    this.setState({search: search });


  }

  changeList(list) {
    this.setState({list: list});
  }

  changeTermList(termList) {
    this.setState({termList: termList});
  }


  changeJson(response) {
    this.setState({jsonResponse: response});
  }

  changeMessage(message) {
    this.setState({message: message});
  }


}

export default App;
