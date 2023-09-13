import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { ITheme, useTheme, Icon } from 'native-base';
import Icons from '../../utils/Icon/Icons';
import {
  GRAY_COLOR,
  LIGHT_PURPLE_COLOR,
  PURPLE_COLOR,
  RED_COLOR,
  ROUTES,
  WHITE_COLOR,
} from '../../utils/constants/ui';
import Constants from 'expo-constants';
import { Actionsheet } from 'native-base';
import Col from '../../components/Base/ColBase';

export interface DetailInformationProps {
  navigation: any;
  route: any;
}

const { width } = Dimensions.get('screen');

const DetailInformation = ({ navigation, route }: DetailInformationProps) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);
  const [isConfirmLogout, setIsConfirmLogout] = useState<boolean>(false);

  const ConfirmLogoutModal = ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) => (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <View style={styles.modalContainer}>
          <View style={styles.logoutWrapTitle}>
            <Text style={styles.logoutText}>Đăng Xuất</Text>
          </View>
          <Text style={styles.confirmText}>
            Bạn chắc chắn muốn đăng xuất khỏi tài khoản ?
          </Text>
          <View style={styles.wrapButton}>
            <Col numRows={2} style={styles.button}>
              <TouchableOpacity
                style={styles.detailButton}
                onPress={
                  onClose
              }
              >
                <Text style={styles.buttonText}>Huỷ bỏ</Text>
              </TouchableOpacity>
            </Col>
            <Col numRows={2} style={[styles.button, styles.activeButton]}>
              <TouchableOpacity
                style={styles.detailButton}
                onPress={() => {
                  onClose();
                  navigation.navigate(ROUTES.LOGIN);
                }}
              >
                <Text style={[styles.buttonText, { color: WHITE_COLOR }]}>
                  Xác nhận
                </Text>
              </TouchableOpacity>
            </Col>
          </View>
        </View>
      </Actionsheet.Content>
    </Actionsheet>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header headerText="THÔNG TIN CỦA TÔI" backButton />
      <Card cardStyle={{ margin: 10 }}>
        <View style={styles.mainInformation}>
          <View style={styles.wrapImage}>
            {route.params?.avatar ? (
              <Image
                style={styles.userImage}
                source={{ uri: route.params?.avatar }}
              />
            ) : (
              <Icon as={Icons.ImageProfile} size={40} />
            )}
          </View>
          <Text>{route.params?.name}</Text>
          <Text>{route.params?.phone}</Text>
        </View>
      </Card>
      <Card cardStyle={{ marginHorizontal: 10 }}>
        <TouchableOpacity
          onPress={() => {
            setIsConfirmLogout(true);
          }}
        >
          <View style={styles.loginText}>
            <Image
              style={styles.iconImage}
              source={require('../../assets/logout-icon.png')}
            />
            <Text style={styles.restart}>Đăng xuất</Text>
          </View>
        </TouchableOpacity>
      </Card>
      <ConfirmLogoutModal
        isOpen={isConfirmLogout}
        onClose={() => setIsConfirmLogout(false)}
      />
    </SafeAreaView>
  );
};

export default DetailInformation;

const makeStyles = (args: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      marginTop: -Constants.statusBarHeight,
    },
    modalContainer: {
      paddingHorizontal: 14,
      // backgroundColor: 'red',
      width: '100%',
    },
    mainInformation: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    restart: {
      color: args.colors.red[400],
      marginLeft: 10,
      fontSize: 16,
    },
    userImage: {
      width: 110,
      height: 110,
      borderRadius: 110 / 2,
    },
    wrapImage: {
      marginBottom: 10,
    },
    loginText: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconImage: {
      width: 20,
      height: 20,
    },
    logoutText: {
      color: RED_COLOR,
      fontWeight: '500',
      fontSize: 20,
    },
    logoutWrapTitle: {
      paddingVertical: 14,
      borderBottomColor: GRAY_COLOR,
      borderBottomWidth: 1,
      alignItems: 'center',
    },
    confirmText: {
      fontWeight: '700',
      fontSize: 16,
      paddingVertical: 20,
      textAlign: 'center',
    },
    wrapButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      marginRight: 4,
      borderRadius: 30,
      alignItems: 'center',
      backgroundColor: LIGHT_PURPLE_COLOR,
    },
    detailButton: {
      paddingVertical: 20,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '700',
      color: PURPLE_COLOR,
    },
    activeButton: {
      backgroundColor: PURPLE_COLOR,
    },
  });
