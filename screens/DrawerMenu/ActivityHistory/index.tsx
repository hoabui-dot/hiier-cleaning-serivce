import React from 'react';
import { JOB_HISTORY_TAB } from '../../../utils/constants/ui';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DoneTaskHistory from './DoneTaskHistory';
import CancelTaskHistory from './CancelTaskHistory';

const JobHistory = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name={JOB_HISTORY_TAB.DONE} component={DoneTaskHistory} />
      <Tab.Screen name={JOB_HISTORY_TAB.CANCELED} component={CancelTaskHistory} />
    </Tab.Navigator>
  );
};

export default JobHistory;
