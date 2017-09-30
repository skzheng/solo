import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import Navbar from './navbar';
import ResultsTwoEntry from './resultsTwoEntry';
import ResultOne from './resultOne';
window.twoSelectCounter = 0;

class ResultsTwo extends React.Component {
  constructor() {
    super();
    this.state = {
      selected : "",
      showResultOne: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handlePick = this.handlePick.bind(this);
  }

  handleSubmit(){
    this.setState({showResultOne: true});
  }

  handleSelect(event){
    if(this.state.selected === "") {
      this.setState({selected: event});
    } else if(this.state.selected === event){
      this.setState({selected: ""});
    }
  }

  handlePick(event){
      $(event.target).parent().toggleClass('highlighted', this.state.selected === "" && !$(event.target).hasClass('NONO'));
  }

  render() {
    return (
      <div className="">
        {this.state.showResultOne ? <ResultOne item={this.state.selected}/> :
          <div className="two">
            <div className="card-group">
            {this.props.selected.map((item, i) => {
                  return <ResultsTwoEntry clickEvent={this.handlePick} item={item} key={i} ind={i} handleSelect={this.handleSelect}/>
                })
              }
            </div>
            <button className="btn btn-secondary okButton" onClick={this.handleSubmit}>OK!</button>
          </div>
        }
      </div>
    );
  }
}
export default ResultsTwo;



