import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { TOOLS } from '../../../utils/constants/ui';
import Tool from '.';
import Chemical from './Chemical';

const Tools = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name={TOOLS.TOOL} component={Tool} />
      <Tab.Screen name={TOOLS.CHEMICAL} component={Chemical} />
    </Tab.Navigator>
  );
};

export default Tools;
