import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import Navbar from './navbar';
import ResultsFive from './resultsFive';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categoryInput: "",
      currentType: "",
      priceRange: 0,
      lat: "",
      lon: "",
      showResults: false,
      fiveResults: []
    };
    this.handleCategoryInput = this.handleCategoryInput.bind(this);
    this.handleRandom = this.handleRandom.bind(this);
  }
  
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(function(position) {
      this.setState({lat: position.coords.latitude});
      this.setState({lon: position.coords.longitude});
      window.lat = position.coords.latitude;
      window.lon = position.coords.longitude
      console.log(position.coords);
      $('.button').animate({'opacity' : '1'}, 1000);
    }.bind(this));
  }

  handleCategoryInput(e){
    this.setState({categoryInput: e.target.value});
  }

  handleRandom(){
    axios.post('/random', {term: "", latitude: `${this.state.lat}`, longitude: `${this.state.lon}`})
    .then(data => {
      console.log(data);
      this.setState({ fiveResults : data.data});
      $('.background').css({ 'background' : 'url("./img/blank.png") fixed center'})
    })
    .then(() => {
      this.setState({showResults: !this.state.showResults});
    })
    .catch(error => {
      console.log(error);
    })
    console.log(this.state.lat, this.state.lon);
  }

  render() {
    return (
      <div className="theDiv">
        <div className="background">
        </div>
        <div className="main">
        <Navbar />
        {this.state.showResults 
        ? 
        <ResultsFive results={this.state.fiveResults}/> 
        : 
        <div className="">
          <div className="startScreen">
          <p className="header">FIND FOOD NOW</p>
          <p onClick={this.handleRandom} className="btn button describe">GO</p>
          </div>
        </div>
        }
        </div>
      </div>
    );
  }
}
export default App;



 // <input onChange={this.handleCategoryInput} placeholder="Enter category"/>
 //            <div id="slidecontainer">
 //              $<input className="slider" type="range" min="1" max="4" step="1" defaultValue="1"/>$$$$
 //            </div>
 //          </div>
 //          <div className="randomButtonDiv">
