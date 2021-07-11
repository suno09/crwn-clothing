import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';

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

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
