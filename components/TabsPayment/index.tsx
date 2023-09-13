import { ITheme, useTheme } from 'native-base';
import { useMemo, useState } from 'react';
import { useWindowDimensions, StyleSheet } from 'react-native';
import {
  TabView,
  SceneMap,
  TabBar,
  SceneRendererProps,
  NavigationState,
} from 'react-native-tab-view';
import RouteTransaction from './RouteTransaction';
import Transfer from './Transfer';

interface TabsPaymentProps {
  // navigateTaskDetail: (id: number) => void;
}
const TabsPayment = (props: TabsPaymentProps) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    // { key: 'transaction', title: 'Transaction' },
    { key: 'cardList', title: 'Chuyển khoản' },
  ]);

  const renderScene = SceneMap({
    transaction: RouteTransaction,
    cardList:() => <Transfer />,
  });

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{
        key: string;
        title: string;
      }>;
    }
  ) => (
    <TabBar
      {...props}
      style={styles.tabBar}
      tabStyle={styles.tab}
      indicatorStyle={styles.indicator}
      labelStyle={styles.label}
      activeColor={theme.colors.violet['500']}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({
    tabBar: {
      backgroundColor: colors.white,
    },
    tab: {
      minHeight: 40,
    },
    label: {
      fontSize: fontSizes.xs,
      textTransform: 'capitalize',
      color: colors.violet['300'],
      fontWeight: '500',
      margin: 0,
    },
    indicator: {
      backgroundColor: colors.violet['500'],
    },
    tabBarContent: {
      width: 200,
    },
  });

export default TabsPayment;
