import React, { useEffect, useMemo, useState } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { AirbnbRating } from 'react-native-ratings';
import { ROUTES, WHITE_COLOR } from '../../utils/constants/ui';
import { IDetailHiierInformation } from '../../types/ui';
import { DEFAULT_HIIER_INFORMATION } from '../../utils/constants/defaultValue';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { TaskApi } from '../../services/api/task';
import Constants from 'expo-constants';
import { ITheme, useTheme } from 'native-base';

const { width } = Dimensions.get('screen');

export interface CustomDrawerProps extends DrawerContentComponentProps {
  navigation: any;
  route: any;
}

const CustomDrawer = ({ navigation, route, ...props }: CustomDrawerProps) => {
  const [detailInformation, setDetailInformation] =
    useState<IDetailHiierInformation>(DEFAULT_HIIER_INFORMATION);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  useEffect(() => {
    async function getHiierDetailInformation() {
      setIsLoading(true);
      await TaskApi.getEmployeeInfo().then((response) => {
        if (!response?.data?.resource) {
          return;
        }
        setDetailInformation(response?.data?.resource);
        setIsLoading(false);
      });
    }
    getHiierDetailInformation();
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          backgroundColor: '#122620',
          height: 140 + Constants.statusBarHeight,
          marginTop: -Constants.statusBarHeight - 5,
        }}
      >
        <View style={{ margin: 5, marginTop: 5 + Constants.statusBarHeight }}>
          {isLoading ? (
            <ActivityIndicator style={styles.loading} size="small" />
          ) : (
            <Text style={styles.text}>{detailInformation.name}</Text>
          )}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ROUTES.DETAIL_INFORMATION, detailInformation);
            }}
          >
            <Text
              style={[styles.text, { color: '#B68D40', fontWeight: '400' }]}
            >
              Xem thông tin
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            right: 5,
            top: 5 + Constants.statusBarHeight,
          }}
        >
          <Text style={styles.text}>{`Lv: ${
            detailInformation.isPremium ? 'Premium Hiier' : 'Hiier'
          }`}</Text>

          <View style={styles.totalMoney}>
            <Text style={styles.text}>Tổng tiền:</Text>
            {isLoading ? (
              <ActivityIndicator style={styles.loading} size="small" />
            ) : (
              <Text style={[styles.text, styles.money]}>
                {detailInformation.virtualMoney ? detailInformation.virtualMoney : 'faild'}
              </Text>
            )}
          </View>
          <AirbnbRating
            count={5}
            isDisabled
            showRating={false}
            defaultRating={detailInformation.avgRating}
            size={14}
          />
        </View>
        <Image
          style={styles.userImage}
          source={{
            uri: detailInformation.avatar
              ? detailInformation.avatar
              : 'https://assets.capitalfm.com/2017/43/taylor-swift-1508765921.jpg',
          }}
        />
      </View>
      <View style={styles.itemList}>
        <DrawerItemList navigation={navigation} {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

const makeStyles = ({ colors, sizes, fontSizes, shadows }: ITheme) =>
  StyleSheet.create({
    userImage: {
      width: 110,
      height: 110,
      borderRadius: 110 / 2,
      position: 'absolute',
      left: width / 2 - 110,
      bottom: -110 / 2,
    },
    itemList: {
      marginTop: 110 / 2,
    },
    text: {
      fontSize: 16,
      fontWeight: '500',
      color: WHITE_COLOR,
    },
    money: {
      color: colors.primary.gold,
      marginLeft: 4
    },
    loading: {
      marginRight: 'auto',
      color: colors.primary.gold,
      marginLeft: 4
    },
    totalMoney: {
      flexDirection: 'row',
    },
  });

export default CustomDrawer;
