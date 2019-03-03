import React, { Component } from 'react';
import fire from '../App';


class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user:null });
        localStorage.removeItem('user');
      }
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }

  signOut() {
    this.props.firebase.auth().signOut().then(() => {
    this.props.setUser(null);
  })
  .catch(function(error) {
       console.log(error);
       console.log('Failed to Sign Out');
  });
}

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({user})
      }
    })
  }

  render() {
    return(
      <div>
         <button onClick={this.signIn}>Sign In</button>
         <button onClick={this.signOut}>Sign Out</button>
         <section className="sign-in">
            Sign In As:
            {this.props.user ? this.props.user.displayName : 'Guest'}
          </section>
       </div>

  )
}
}

export default User;
