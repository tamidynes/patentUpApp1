import React from 'react';

/*const ptoEndpoint = 'http://www.patentsview.org/api/assignees/query?q=';
let ownerList = [];*/
class PTO extends React.Component {

    render() {

  //  console.log(this.getOwners(this.props.term));

    return (
      <div>
        <ul>{this.props.list}</ul>
      </div>
    )
  }


}

export default PTO;
