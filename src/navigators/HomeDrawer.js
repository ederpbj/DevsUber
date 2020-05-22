import {createDrawerNavigator} from 'react-navigation-drawer';

import CustomDrawer from '../components/CustomDrawer';
import Home from '../screens/Home';
import Config from '../screens/Config';
import Trips from '../screens/Trips';

//Tela de arrasto lateral
export default createDrawerNavigator(
  {
    Home,
    Config,
    Trips,
  },
  {
    contentComponent: CustomDrawer,
  },
);
