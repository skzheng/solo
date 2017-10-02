import React from 'react';
import axios from 'axios';
import $ from 'jquery';

class ResultOne extends React.Component {
  constructor() {
    super();
    this.state = {
      business: "",
      reviews: "",
      number: "",
      message: ""
    };
    this.initMap = this.initMap.bind(this);
    this.sendInfo = this.sendInfo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  componentDidMount(){
    window.initMap = this.initMap;
    loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyBeC5Lj_m65MmAtTSfssxoREDFbIrbsNQs&callback=initMap");
    axios.post('/business', {id: this.props.item.id})
    .then(data => {
      this.setState({business: data.data});
    })
    .catch(error => {
      console.log(error);
    })

    axios.post('/reviews', {id: this.props.item.id})
    .then(data => {
      console.log(data.data);
      this.setState({reviews : data.data.reviews});
    })
    .catch(error => {
      console.log(error);
    })
  }

  sendInfo(){
    console.log('sent');

    axios.post('/message', {number: this.state.number, message: `${this.props.item.name}` })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  handleInputChange(e){
    this.setState({ number: `+1${e.target.value}` });
  }

  initMap() {
        console.log(this)
        var restLat = parseFloat(`${this.props.item.coordinates.latitude}`);
        var restLon = parseFloat(`${this.props.item.coordinates.longitude}`);
        console.log(window.lat, restLat);
        var current = {lat: window.lat, lng: window.lon};
        var restaurant = {lat: restLat, lng: restLon};
        var map = new google.maps.Map(document.getElementById('map'), {
          center: current,
          zoom: 7
        });
        var directionsDisplay = new google.maps.DirectionsRenderer({
          map: map
        });
        var request = {
          destination: restaurant,
          origin: current,
          travelMode: 'WALKING'
        };
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function(response, status) {
          if (status == 'OK') { 
            directionsDisplay.setDirections(response);
          }
        });
  }

  render() {
    return (
      <div>
        <div className="bar">
          <div className="progress">
            <div className="progress-bar progress-bar-success" role="progressbar"
              aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: 100+'%'}}>
            </div>
          </div>
        </div>
      <div className="one">
      <div className="card card2">
        <p className="card-header">{this.props.item.name}</p>
       
        <div id= {`carouselImages${this.props.ind}`} className="carousel slide card-img-top" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target={`#carouselImages${this.props.ind}`} data-slide-to="0" className="active"></li>
            <li data-target={`#carouselImages${this.props.ind}`} data-slide-to="1" ></li>
            <li data-target={`#carouselImages${this.props.ind}`} data-slide-to="2" ></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100 cardimgtop2 NONO" src={this.props.item.image_url}/>
            </div>
            {this.state.business.photos ? this.state.business.photos.map((items,i) => {
              if(i !== 0){
              return <div className="carousel-item" key={i}>
                <img className="d-block w-100 cardimgtop2 NONO" src={items}/>
               </div>
              }
            })
            :
            null
            }
          </div>
          <a className="carousel-control-prev NONO" href={`#carouselImages${this.props.ind}`} role="button" data-slide="prev">
            <span className="carousel-control-prev-icon NONO" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next NONO" href={`#carouselImages${this.props.ind}`} role="button" data-slide="next">
            <span className="carousel-control-next-icon NONO" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>

        <span className="describe"> CATEGORIES </span>
        <div className="card-text">{this.props.item.categories.reduce((array,item) => {
          array.push(item.title);
          return array;
        },[]).join(', ')}
        </div>
        <span className="describe"> PHONE </span>
        <div className="card-text"> {this.props.item.display_phone}</div> 
        <span className="describe"> ADDRESS </span>
        <p className="card-text">{this.props.item.location.display_address[0] + ' ' + this.props.item.location.display_address[1]}</p>
        <span className="describe"> PRICE </span>
        <p className="card-text">{this.props.item.price}</p>
        <span className="describe"> RATING </span>
        <p className="card-text">{this.props.item.rating}</p>
        <a className="card-text" href={this.props.item.url} target="_blank">More Information</a>
        </div>
        <div className="card card2">
          <p className="card-header">Directions</p>
          <div className="card-img-top">
            <div id="map" style={{height: '400px', width: '500px'}}></div>
          </div>
        <span className="describe"> REVIEWS ({this.props.item.review_count})</span> 
        {this.state.reviews ? 
          this.state.reviews.map((items, i) => {
            return <div className="card2">
            <div className="row">
                <div className="col-md-12">
                  <p className="card-text">{items.user.name} {items.rating} | {items.text}</p> 
                </div>
              </div>
          </div>
        })
        : null}    

        </div>
      </div>
        <div>
          <input type="text" onChange={this.handleInputChange} placeholder="Enter phone number"/>
          <button className="btn btn-secondary okButton"  onClick={this.sendInfo}>OK!</button>
        </div>
      </div>
    );
  }
}

function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}

export default ResultOne;


