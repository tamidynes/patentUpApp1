import React from 'react';
import './searchresults.css';
//import PTO from '../../util/PTORequest/ownerspertech';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);

  /*  this.state = {
      message: 'Looking for Patent Owners...'
    }*/

    this.handleClick = this.handleClick.bind(this);
    this.responseAssigneesToCSV = this.responseAssigneesToCSV.bind(this);
    this.downloadCSV = this.downloadCSV.bind(this);


  }
  render() {
  /*  if (this.props.searchTerms === []) {
      return;
    }*/

      //this.terms();

      //termsEndpoint = '';



  //  this.props.setList(list);
    //console.log(this.state.list);
    //console.log(this.state.list);
    return (
      <div className="SearchResults">

        {/*<PTO list={this.ownersList} />*/}
        <h3>Top Patent Owners for Term(s): {this.props.termList}</h3>
        <button onClick={this.handleClick}>Download CSV</button>
        <ol>{this.props.searchState? this.props.message : this.props.list}</ol>
        {/*this.props.results.map(assignee => {
          if (!assignee.assignee_organization) {
            return <li key=assignee.assignee_id>{assignee.assignee_first_name} | {assignee.assignee_last_name}</li>
          } else return <li key=assignee.assignee_id>{assignee.assignee_organization}</li>})*/}

      </div>
    );
  }

  handleClick() {
    this.downloadCSV(this.props.jsonResponse);
  }

  responseAssigneesToCSV(args) {
        var result, lineDelimiter, data;

        args.forEach(assignee => {

          delete assignee.assignee_id;
          delete assignee.assignee_total_num_patents;



          if (assignee.assignee_organization) {
            assignee.assignee_organization = assignee.assignee_organization.replace(",","");

          }

          assignee.patents = assignee.patents.map(patent => {
            let hyperlink = '"=HYPERLINK(""http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=%2Fnetahtml%2FPTO%2Fsrchnum.htm&r=1&f=G&l=50&s1=' + patent.patent_number + '.PN.&OS=PN/' + patent.patent_number + '&RS=PN/' + patent.patent_number + '"", ""' + patent.patent_number + '"")"';
            return patent = hyperlink;
          });

        });
        console.log(args);

        data = args || null;
        if (data == null || !data.length) {
            return null;
        }


        //columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';


        let terms = '';
        this.props.termList.forEach(term => terms += term + ' ');

        result = 'patentUp - patents for startups\npatent-up.com\nby Tami Dynes\nPatent Owners for Term(s): ' + terms + '\n';
        result += 'Owner,US Patent Numbers (hyperlinks to full text)';
        result += lineDelimiter;

        data.forEach(function(item) {
            if (item.assignee_last_name) {
              result += item.assignee_first_name + ' ' + item.assignee_last_name + ',';
            } else result += item.assignee_organization + ',';

            item.patents.forEach(patent => {

                result += patent + ',';

            });
            result += lineDelimiter;
        });

        return result;
    }

    downloadCSV(args) {
        var data, filename, link;
        var csv = this.responseAssigneesToCSV(args);
        if (csv == null) return;

        filename = args.filename || 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();


    }

    





  /*terms() {

    let searchTerms = this.props.searchTerms;
    termsEndpoint = '{"_or":[{"_text_any":{"patent_abstract":"' + searchTerms[0] + '"}}, {"_text_any":{"patent_title":"' + searchTerms[0] + '"}}]}';
    searchTerms.shift();
    searchTerms.forEach(term => {
      termsEndpoint = termsEndpoint + ', {"_or":[{"_text_any":{"patent_abstract":"' + term + '"}}, {"_text_any":{"patent_title":"' + term + '"}}]}';
    });

    console.log(termsEndpoint);

  }*/



/*  setList() {
    this.getOwners(this.props.term);
    this.setState(list: this.props.setList(ownerList));
    return this.state.list;
  }*/
/*  ownersList() {
    this.getOwners(this.props.searchTerm);

  }*/


}

export default SearchResults;
