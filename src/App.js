import iconStar from './images/icon-star.svg'
import illustration from './images/ty.svg'
import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RatingsContainer />
      </header>
    </div>
  );
}

export default App;

class RatingsContainer extends React.Component{
  render(){
    return(
      <div className='ratings-main-container'>
        <Texts />
        <RatingsNumbers />
      </div>
    );
  }
}

class Texts extends React.Component{
  render(){
    return(
      <div className='texts-container'>
        <div className='star-icon-container'>
          <img src={iconStar} alt="Star Icon" />
        </div>
        <h1>How did we do?</h1>
        <p>Please let us know how we did with your support request. All feedback is appreciated to help us improve our offering!</p>
      </div>
    )
  }
}

class ThankYou extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      taps: 0,
      hide: false,
      unhide: true
    }

    this.handleTap = this.handleTap.bind(this);
  }

  handleTap(){
    this.setState({
      taps: this.state.taps + 1
    });

    if (this.state.taps === 2){
      window.location.reload();
    } 
  };

  render(){

    return(
      <div onClick={this.handleTap} className={'thank-you-container' + (this.props.show === true ? ' show-thank-you' : '') + (this.state.hide === true ? ' hide' : '') }>
        <img src={illustration} alt="Thank You" className='noselect' />
        <div className='finalRating'>
          <p>You selected {this.props.rating} out of 5</p>
        </div>
        <div className='texts-container'>
          <h1>Thank You!</h1>
          <p>We appreciate you taking the time to give a rating. If you ever need more support, don't hesitate to get it touch!</p>
        </div>
      </div>
    )
  }
}

ThankYou.defaultProps = {
    rating: 0
}

class RatingsNumbers extends React.Component{

  state = {
    show: false,
    rate: 0
  }

  render(){

    const handleSubmit = (event) => {
      event.preventDefault();

      let formData = new FormData(document.forms.ratingsForm);
      let ratingSubmit = formData.get('ratingSubmission');

      this.setState({
        show: true,
        rate: ratingSubmit
      });


    }

    return(
      <div>
        <form onSubmit={handleSubmit} action="#" className="ratings-form" id="ratingsForm" name="ratingsForm">
          <Rating />
          <button className="submit noselect" type="submit" value="submit">Submit</button>
        </form>
        <ThankYou rating={this.state.rate} show={this.state.show}/>
      </div>
    );
  }
}

class Rating extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      activeRating: 0,
      ratings: 
      [{
        id: 1,
        className: 'rating-number noselect'
      },
      {
        id: 2,
        className: 'rating-number noselect'
      },
      {
        id: 3,
        className: 'rating-number noselect'
      },
      {
        id: 4,
        className: 'rating-number noselect'
      },
      {
        id: 5,
        className: 'rating-number noselect'
      }]
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = id => {
    this.setState({
      activeRating: id
    });
  }
 
  render(){

    return(
      <div className="ratings-numbers">
          {
            this.state.ratings.map(rating => {
              return (
              <div key={rating.id} id={rating.id} onClick={() => (this.handleClick(rating.id) )} className={rating.className + (rating.id === this.state.activeRating ? " selected" : "")}>
                <label>{rating.id}</label>
              </div>
              )
            })
          }
          <input type="hidden" id="ratingSubmission" name='ratingSubmission' value={this.state.activeRating} />
      </div>
    )
  }
}