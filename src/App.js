import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { Switch, Route, Link } from 'react-router-dom';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.css';
import React from 'react';

/*const TopicsList = (props) => {
  console.log(props);
  return (<div>
    <h1>Topics List Page</h1>
    <Link to='/topics/1' >Topic 1</Link>
    <Link to='/topics/2' >Topic 2</Link>
    <button onClick={() => props.history.push('/topics/3')} >Topic 3</button>
    <Link to={`${props.match.path}/4`} >Topic 4</Link>
    <Link to={`${props.match.path}/5`} >Topic 5</Link>
  </div>)
};

const TopicDetail = (props) => (
  <div>
    <h1>Topic Detail Page: {props.match.params.topicId}</h1>
  </div>
);

const HatsPage = () => (
  <div>
    <h1>HatsPage</h1>
  </div>
);*/

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({
      //   currentUser: user,
      // });
      // console.log(user);

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          });

          console.log(this.state);
        });

        this.setState({currentUser: userAuth});

      } else {
        this.setState({
          currentUser: userAuth
        })
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
