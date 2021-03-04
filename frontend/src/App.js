import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/UIElements/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';

function App() {
  return (
    <div className="App">
     <Router>
       <MainNavigation/>
       <main>
       <Switch>
         <Route exact path="/">
           <Users/>
         </Route>
         <Route path="/:userId/places">
           <UserPlaces/>
         </Route>
         <Route exact path="/places/new">
           <NewPlace/>
         </Route>
         <Redirect to="/" />
       </Switch>
       </main>
     </Router>
    </div>
  );
}

export default App; 
