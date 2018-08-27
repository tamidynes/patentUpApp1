import React from 'react';
import './searchbar.css';

const ptoEndpoint = 'http://www.patentsview.org/api/assignees/query?q=';
let termsEndpoint = '';
//let messages = ['Looking for Patent Owners...', 'Sorting 25 top patent owners...', 'Wait for it...'];

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: [],

    };

    this.handleTermChange=this.handleTermChange.bind(this);
    this.handleClick=this.handleClick.bind(this);
    this.handleEnter=this.handleEnter.bind(this);
    this.setTermEndpoint=this.setTermEndpoint.bind(this);
    this.getOwners=this.getOwners.bind(this);
    this.termsList=this.termsList.bind(this);

  //  this.rotateMessage = this.rotateMessage.bind(this);
  }

  render() {
    return (
      <div>
        <div className="SearchBar">
          <input type="search" placeholder="Enter Technology Key-Term(s)" onChange={this.handleTermChange} onKeyPress={this.handleEnter}/>
          <a onClick={this.handleClick}>SEARCH</a>

        </div>



      </div>
    );
  }


  handleTermChange(event) {

    let termsArray = event.target.value.split(/[ ,;/|]+/);
    //split(/\s*,\s*/);
    this.setState({terms: termsArray});
  //  console.log(this.state.terms);
  }

  handleClick() {
    this.props.onSearch(true);

    this.termsList();
    this.setTermEndpoint();
    this.getOwners();
    this.props.changeMessage('Looking for Patent Owners...');
    setTimeout(this.props.changeMessage, 4000, 'Sorting 25 top patent owners...');
    setTimeout(this.props.changeMessage, 8000, 'Wait for it...');

  }

  handleEnter(event) {
    if (event.key === 'Enter') {

      this.props.onSearch(true);

      this.termsList();
      this.setTermEndpoint();
      this.getOwners();
      this.props.changeMessage('Looking for Patent Owners...');
      setTimeout(this.props.changeMessage, 4000, 'Sorting 25 top patent owners...');
      setTimeout(this.props.changeMessage, 8000, 'Wait for it...');



    }
  }

  setTermEndpoint() {
    let firstSearchTerms = this.state.terms[0];


    termsEndpoint = '{"_or":[{"_text_any":{"patent_abstract":"' + firstSearchTerms + '"}}, {"_text_any":{"patent_title":"' + firstSearchTerms + '"}}]}';
    this.state.terms.shift();
    this.state.terms.forEach(term => {
      termsEndpoint = termsEndpoint + ', {"_or":[{"_text_any":{"patent_abstract":"' + term + '"}}, {"_text_any":{"patent_title":"' + term + '"}}]}';
    });

    this.state.terms.unshift(firstSearchTerms);


  }

  getOwners() {
      //console.log(ptoEndpoint + '{"_and": [' + termsEndpoint + ']}&f=["assignee_id", "assignee_first_name", "assignee_last_name", "assignee_organization", "assignee_total_num_patents"]&o={"matched_subentities_only": "true", "include_subentity_total_counts": "true"}&s=[{"assignee_total_num_patents": "desc"}]');
      let newList = 'No Patent Owners Found';
      fetch(ptoEndpoint + '{"_and": [' + termsEndpoint + ']}&f=["assignee_id", "assignee_first_name", "assignee_last_name", "assignee_organization", "assignee_total_num_patents", "patent_number"]&o={"matched_subentities_only": "true", "include_subentity_total_counts": "true"}&s=[{"assignee_total_num_patents": "desc"}]').then(
        response => response.json()).then(jsonResponse => {


          console.log(jsonResponse);
          newList = jsonResponse.assignees.sort(function(a, b){return b.patents.length - a.patents.length}).map(assignee => {
            //console.log(assignee.assignee_id);
          /*  return assignee.assignee_id;*/

            if (assignee.assignee_organization){
              return <li key={assignee.assignee_id}>{assignee.assignee_organization + " | " + assignee.patents.length + " US Patents with" + this.props.terms + " in Title or Abstract"}</li>;
            } else {
              return <li key={assignee.assignee_id}>{assignee.assignee_first_name + assignee.assignee_last_name + " | US Patents:" + assignee.patents.map(patent => {return ' ' + patent.patent_number})}</li>;
            }
          });

          this.props.response(jsonResponse.assignees);

          this.props.onSearch(false);

          this.props.changeList(newList);
        }).catch(error => {

          this.props.onSearch(false);

          this.props.changeList(newList);
          console.log(JSON.stringify(error));
        })
  }

  termsList() {

      this.props.changeTermList(this.state.terms.map((term) => {

        return ' "' + term + '"';

      }));

  }



/*  rotateMessage() {

    let messageIndex = 0;
    messages.forEach(message =>
      {
        if (messageIndex > 0) {
          setTimeout(this.props.changeMessage(message), 3000);
          messageIndex++;


        } else {
          this.props.changeMessage('Looking for Patent Owners...');
          messageIndex++;

        }
      }
    )


  }*/


}

export default SearchBar;
