import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import Dashboard from './screens/Dashboard';
  import PlayList from './screens/PlayList';
import Trainers from "./screens/Trainers";
import MiniDrawer from './screens/Demo'
import QuestionBank from './screens/QuestionBank';
import VideoBank from './screens/VideoBank';
import HeroCarousel from './screens/HeroCarousel'
import Users from './screens/Users';
import Login from './screens/Login';
import { useSelector } from 'react-redux';
import UserDashboard from './screens/UserDashboard';
import SendNotification from './screens/Notification';


export default function AppNavigator() {
  const loginData = useSelector(state => state.auth.loginData)
  const isToken = window.localStorage.getItem('token')
    return (
      
      <Router>
        {(isToken) ?  
          <MiniDrawer>
              <Switch>
                <Route exact path="/">
                  <Dashboard/>
                </Route>
                <Route path="/programme">
                  <PlayList />
                </Route>
                <Route path="/notification">
                  <SendNotification />
                </Route>
                <Route path="/dashboard">
                  <UserDashboard />
                </Route>
                <Route path="/trainers">
                  <Trainers />
                </Route>
                <Route path="/question-bank">
                  <QuestionBank />
                </Route>
                <Route path="/hero-carousel">
                  <HeroCarousel />
                </Route>
                <Route path="/video-bank">
                  <VideoBank />
                </Route>
                <Route path="/users">
                  <Users />
                </Route>
              </Switch>
          </MiniDrawer> :
          <Route exact path="/">
            <Login/>
          </Route>
        }
        </Router>
    )
}