import {createDrawerNavigator} from 'react-navigation-drawer';

import CustomDrawer from '../components/CustomDrawer';
import Home from '../screens/Home';

//Tela de arrasto lateral
export default createDrawerNavigator(
  {
    Home,
  },
  {
    contentComponent: CustomDrawer,
  },
);
