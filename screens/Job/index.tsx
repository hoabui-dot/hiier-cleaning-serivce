import { JOB_TAB } from '../../utils/constants/ui';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';

import NewJobTab from './NewJobTab';
import ConfirmedTab from './ConfirmedTab';
import Calendar from './CalendarJob';

const Home = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name={JOB_TAB.NEW} component={NewJobTab} />
      <Tab.Screen name={JOB_TAB.CONFIRMED} component={ConfirmedTab} />
      <Tab.Screen name={JOB_TAB.CALENDAR} component={Calendar} />
    </Tab.Navigator>
  );
};

export default Home;
