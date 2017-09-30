import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import Navbar from './navbar';
import ResultsFiveEntry from './resultsFiveEntry';
import ResultsTwo from './resultsTwo';

class ResultsFive extends React.Component {
  constructor() {
    super();
    this.state = {
      selected : [],
      showResultsTwo: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handlePickCss = this.handlePickCss.bind(this);
  }

  handleSubmit(){
    this.setState({showResultsTwo: true});
  }

  handleSelect(event){
    if(!this.state.selected.includes(event) && this.state.selected.length < 2){
      this.setState({selected: this.state.selected.concat(event)});
    } else if (this.state.selected.includes(event)){
      var old = this.state.selected;
      var ind = this.state.selected.indexOf(event)
      old.splice(ind, 1);
      this.setState({selected: old});
    }
  }

  handlePickCss(event){  
    $(event.target).parent().toggleClass('highlighted', 
      !$(event.target).parent().hasClass('highlighted') && this.state.selected.length < 2 && !$(event.target).hasClass('NONO'))
                            .toggleClass('', $(event.target).parent().hasClass('highlighted'));
  }

  render() {
    return (
      <div className="">
        {this.state.showResultsTwo ? <ResultsTwo selected={this.state.selected}/> :
          <div className="cardsFive">
            <div className="card-group">
            {this.props.results.map((item, i) => {
                  return <ResultsFiveEntry  clickEvent={this.handlePickCss} item={item} key={i} ind={i} handleSelect={this.handleSelect}/>
                })
              }
            </div>
            <button className="btn btn-secondary okButton" onClick={this.handleSubmit}>OK!</button>
            <div className="bar">
              <div className="progress">
                <div className="progress-bar progress-bar-success" role="progressbar"
                  aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{width:50+'%'}}>
                </div>
              </div>
            </div>
          </div>
        }
        
      </div>
    );
  }
}
export default ResultsFive;



