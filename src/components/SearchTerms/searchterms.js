import React from 'react';
import './searchterms.css';

//const ptoEndpoint = 'http://www.patentsview.org/api/assignees/query?q=';

class SearchTerm extends React.Component {


  render() {



    return (
      <div className="SearchTerm">
        <ul>{this.props.termList}</ul>

      </div>
    );
  }




}

export default SearchTerm;
