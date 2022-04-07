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
      <div className='ratings-main-container' onClick={this.handleClick} >
        <Texts />
        <RatingsNumbers />
      </div>
    );
  }

}

class Texts extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      clicked: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.setState({
      clicked: true
    });

    setTimeout(() => {
      this.setState({
        clicked: false
      })
    }, 500);
  }

  render(){
    return(
      <div className='texts-container'>
        <div className={'star-icon-container noselect' + (this.state.clicked === true ? ' clicked' : '')} onClick={this.handleClick}>
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

  //this is just an easter egg for double clicking/tapping on the thank you section used for debugging on browsers without the reload functionality(i.e. facebook messenger, instagram... etc.)
  handleTap(){
    this.setState(state => ({
      taps: state.taps + 1
    }));

    if (this.state.taps >= 1){
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
  constructor(props){
    super(props);

    this.state ={
      show: false,
      rate: 0,
      clickedSubmit: false
    }

  }

  handleClick(){
    this.setState({
      clickedSubmit: true
    });
  }

  render(){

    //get the data of the form to render in the thank you section
    //went with a form tag to be able to handle the action if the form does need to go somewhere
    const handleSubmit = (event) => {
      event.preventDefault();

      let formData = new FormData(document.forms.ratingsForm);
      let ratingSubmit = formData.get('ratingSubmission');

      if (ratingSubmit > 0){
        this.setState({
          show: true,
          rate: ratingSubmit,
          clickedSubmit: true
        });
      }

    }

    return(
      <div className="form-container">
        <form onSubmit={handleSubmit} action="#" className="ratings-form" id="ratingsForm" name="ratingsForm">
          <Rating clickedSubmit={this.state.clickedSubmit}/>
        </form>
        <ThankYou rating={this.state.rate} show={this.state.show}/>
      </div>
    );
  }
}

class Rating extends React.Component{
  constructor(props){
    super(props);

    this.ratingInput = React.createRef();

    this.state = {
      showNotif: false,
      activeRating: 0,
      clicked: false,
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
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleNotif = this.handleNotif.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.ratingInput && !this.ratingInput.current.contains(event.target) && this.props.clickedSubmit !== true) {
      this.setState({
        activeRating: 0,
        clicked: true
      })
    }
  }

  //get the current selected number's id to apply the class
  handleClick = id => {
    this.setState({
      activeRating: id,
      clicked: false,
      showNotif: false
    });
  }

  handleNotif(){

    if (this.state.activeRating < 1){
      this.setState({
        showNotif: true
      });

      setTimeout(() => {
        this.setState({
          showNotif: false
        })
      }, 1500);
    }

  }
 
  render(){

    return(
      <div ref={this.ratingInput}>
        <div className="ratings-numbers">
            {
              this.state.ratings.map(rating => {
                return (
                <div key={rating.id} id={rating.id} onClick={() => ( this.handleClick(rating.id) )} className={rating.className + (rating.id === this.state.activeRating && this.state.clicked === false ? " selected" : "")}>
                  <label>{rating.id}</label>
                </div>
                )
              })
            }
            <Notification isShown={this.state.showNotif}/>
            {/* this input element's value property is rendered with the id of the current selected div of this component to be able to give the input data into the form tag */}
            <input type="hidden" id="ratingSubmission" name='ratingSubmission' value={this.state.activeRating} />
        </div>
        <button className="submit noselect" type="submit" value="submit" onClick={this.handleNotif}>Submit</button>
      </div>
    )
  }
}

class Notification extends React.Component{

  render(){
    return(
      <div className={'notification-wrapper' + (this.props.isShown === true ? ' is-shown' : '')}>
        <div className="notification">
          <p>Please consider selecting a rating first 😊</p>
        </div>
        <div className="pointer">
        </div>
      </div>
    )
  }

}