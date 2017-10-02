import React from 'react';
import axios from 'axios';
import $ from 'jquery';

class ResultsTwoEntry extends React.Component {
  constructor() {
    super();
    this.state = {
      business: "",
      reviews: ""
    };
    this.handleItemSelect = this.handleItemSelect.bind(this);
  }
  
  componentDidMount(){
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

  handleItemSelect(e){
    this.props.clickEvent(e);
    if(!$(e.target).hasClass('NONO')){
      this.props.handleSelect(this.props.item);
    }
  }

  render() {
    return (
      <div className="card card2 NONO" onClick={this.handleItemSelect}>
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
              }}) : null}
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
        <span className="describe"> REVIEWS ({this.props.item.review_count})</span>

        {this.state.reviews ? 
          this.state.reviews.map((items, i) => {
            return <div className="card2 NONO">
            <div className="row NONO">
                <div className="col-md-12 NONO">
                  <p className="card-text NONO">{items.user.name} {items.rating} | {items.text}</p> 
                </div>
              </div>
          </div>
        })
        : null}


        <a className="card-text" href={this.props.item.url} target="_blank">More Information</a>
      </div>
    );
  }
}
export default ResultsTwoEntry;