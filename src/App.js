import logo from './logo.svg';
import './App.css';
import appLogo from './assets/logo.png'
import Dashboard from './screens/Dashboard';
import { makeStyles } from '@material-ui/core/styles';
import PlayList from './screens/PlayList';
import AppNavigator from './Router';
import {Provider} from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store} >
        <AppNavigator/>
      </Provider>
    </div>
  );
}

export default App;
