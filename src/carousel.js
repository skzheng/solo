import React from 'react';
import axios from 'axios';
import $ from 'jquery';

class Carousel extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
       
        <div id="carouselImages" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselImages" data-slide-to="0" className="active"></li>
            <li data-target="#carouselImages" data-slide-to="1" ></li>
            <li data-target="#carouselImages" data-slide-to="2" ></li>
            <li data-target="#carouselImages" data-slide-to="3" ></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100 cardimgtop5" src={this.props.item.image_url}/>
            </div>
            {this.props.business.photos.map((items,i) => {
              return <div className="carousel-item">
                <img className="d-block w-100" src={items}/>
               </div>
            })}
          </div>
          <a className="carousel-control-prev" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselImages" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
    );
  }
}
export default Carousel;
