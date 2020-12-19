import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import DashBoard from '../pages/Dashboard/DashBoard'
import EditUser from '../pages/Dashboard/EditUser'
import Categories from '../pages/Dashboard/Categories'
import AddTodo from '../pages/Dashboard/AddTodo'
import TodoInfo from '../pages/Dashboard/TodoInfo'

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Login}></Route>
      <Route exact path='/signup' component={Register}></Route>
      <Route exact path='/dash' component={DashBoard}></Route>
      <Route exact path='/edit_user' component={EditUser}></Route>
      <Route exact path='/categories' component={Categories}></Route>
      <Route exact path='/add' component={AddTodo}></Route>
      <Route exact path='/info/:id' component={TodoInfo}></Route>
    </Switch>
  );
}

export default Main;