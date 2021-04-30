import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import AdvertsPage from '../pages/AdvertsPage';
import AdvertPage from '../pages/AdvertPage';
import NewAdvertPage from '../pages/NewAdvertPage';
import EditAdvertPage from '../pages/EditAdvertPage';
import PrivateRoute from '../auth/PrivateRoute';
import LoginPage from '../auth/LoginPage';
import { SignupPage, SignupConfirmPage } from '../pages/SignupPage';
import ForgotPassPage from '../pages/ForgotPassPage';
import ResetPassPage from '../pages/ResetPassPage';
import UserPage from '../pages/UserPage';
import EditUserPage from '../pages/EditUserPage';
import UserChatsPage from '../pages/UserChatsPage';
import ChatScreen from '../chat/ChatScreen';
import NotFoundPage from '../pages/NotFoundPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/adverts" />
        </Route>
        <Route path="/adverts" exact component={AdvertsPage} />

        <Route path="/adverts/view/:id" exact component={AdvertPage} />
        <Route path="/signup" exact>
          <SignupPage />
        </Route>
        <Route path="/signup/confirm/:token" component={SignupConfirmPage} />
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/forgotpass">
          <ForgotPassPage />
        </Route>
        <Route path="/resetpass/:hash" component={ResetPassPage} />
        <PrivateRoute path="/adverts/new" exact>
          <NewAdvertPage />
        </PrivateRoute>
        <PrivateRoute path="/adverts/edit/:id" exact>
          <EditAdvertPage />
        </PrivateRoute>
        <Route exact path="/chat" component={ChatScreen} />

        <Route path="/user/:username" exact>
          <UserPage mode="userAdverts" />
        </Route>

        <PrivateRoute path="/user/:username/favs" exact>
          <UserPage mode="favs" />
        </PrivateRoute>
        <PrivateRoute path="/user/:username/reserved" exact>
          <UserPage mode="reserved" />
        </PrivateRoute>
        <PrivateRoute path="/user/:username/sold" exact>
          <UserPage mode="sold" />
        </PrivateRoute>
        <PrivateRoute path="/user/:username/chats" exact>
          <UserChatsPage />
        </PrivateRoute>
        <Route path="/user/edit/:username" exact component={EditUserPage} />

        <Route path="/404" exact>
          <NotFoundPage />
        </Route>
        <Route>
          <Redirect to="/404" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
