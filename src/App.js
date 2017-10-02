import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import Navbar from './navbar';
import ResultsFive from './resultsFive';
const socket = io();

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
    // this.setSocketState = this.setSocketState.bind(this);
    // this.socketEmit = this.socketEmit.bind(this);
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

    // 
    // socket.on('change', function(newState){
    //   this.setState(newState);
    // })
  }

  // setSocketState(change){
  //   this.socketEmit(change);
  //   this.setState(change);
  // }

  // socketEmit(newState) {
  //   socket.emit('change', newState);
  // }

  handleCategoryInput(e){
    this.setState({categoryInput: e.target.value});
  }

  handleRandom(){
    axios.post('/random', {term: "", latitude: `${this.state.lat}`, longitude: `${this.state.lon}`})
    .then(data => {
      console.log(data);
      // this.setSocketState({ fiveResults : data.data});
      this.setState({ fiveResults : data.data});
      $('.background').css({ 'background' : 'url("./img/blank.png") fixed center'})
    })
    .then(() => {
      // this.setSocketState({showResults: !this.state.showResults});
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
          <p className="header">Find food now</p>
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
