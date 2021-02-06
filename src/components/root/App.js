import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState, useMemo } from 'react'; 
import SignInSide from '../authView/SignInSide';
import SignUp from '../authView/SignUp';
import {UserContext} from '../UserContext';
import BooksList from '../booksList/BooksList';

export function App() {
  const [user, setUser] = useState(null);
  const userValue = useMemo(() => ({user, setUser}), [user, setUser]);
  return (
    <div>
      <Router>
        <UserContext.Provider value={userValue}>
          <Switch>
            <Route exact path='/' exact component={SignUp} />
            <Route exact path='/signin' component={SignInSide} />
            <Route exact path='/booksList' component={BooksList} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
