import React, { useMemo, useState } from 'react';
import Toast from 'react-native-root-toast';
import { Link } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { ILoginAccount, Address } from '../../types/ui';
import * as ExpoLocation from 'expo-location';
import { reverseGeocoding } from '../../services/api/googleMapApi';

import {
  defaultLoginValue,
  FOCUS_INPUT_WHEN_USER_LOGIN,
  GOLD_COLOR,
  GRAY_COLOR,
  PLACE_HOLDER_TEXT_COLOR,
  PURPLE_COLOR,
  ROUTES,
  USER_TYPE,
  WHITE_COLOR,
  GREEN_COLOR,
} from '../../utils/constants/ui';
import { initAddress } from '../../utils/constants/defaultValue';
import Icon from '../../utils/Icon/Icon';
import Icons from '../../utils/Icon/Icons';

import {
  Text,
  SafeAreaView,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Platform
} from 'react-native';
import { TaskApi } from '../../services/api/task';

import { ITheme, useTheme } from 'native-base';

export interface LoginProps {
  navigation: any;
}

const { height, width } = Dimensions.get('window');

const Login = ({ route, navigation }: any) => {
  // TODO: get default value by isoCode
  const [responseOfData, setResponseOfData] = useState<any>({});
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [isShownPassword, setIsShowPassword] = useState<boolean>(true);
  const [isBlurInput, setIsBlurInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { control, handleSubmit } = useForm({
    defaultValues: defaultLoginValue,
  });
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  const onSubmit = (value: ILoginAccount) => {
    setIsLoading(true);
    TaskApi.login({
      phone: value.phone,
      password: value.password,
      role: USER_TYPE.EMPLOYEE,
      countryCodeId: 1,
    })
      .then(async (response: any) => {
        setIsLoading(false);
        const { status } =
          await ExpoLocation.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(status);
          return;
        }
        const location = await ExpoLocation.getCurrentPositionAsync({
          accuracy: ExpoLocation.Accuracy.Highest,
        });
        const res = await reverseGeocoding(location.coords);
        if (location && res) {
          setLocationLoading(false);
          const _address: Address = {
            ...initAddress,
            detail: res.formatted_address,
            location: location.coords,
          };
          navigation.navigate(ROUTES.HIIER, {
            secretHash: response?.data?.resource?.secretHash,
            token: response?.data?.resource?.token,
            address: _address,
          });
        }
        setIsSuccessMessage(true);
        setResponseOfData(response);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage('Lỗi hệ thống');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.title}>Login to your Account</Text>
          </View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.wrapInput}>
                <Icon
                  color={
                    isBlurInput === FOCUS_INPUT_WHEN_USER_LOGIN.PHONE
                      ? PURPLE_COLOR
                      : GRAY_COLOR
                  }
                  style={styles.inputIcon}
                  as={Icons.Call}
                />
                <TextInput
                  style={[
                    styles.input,
                    isBlurInput === FOCUS_INPUT_WHEN_USER_LOGIN.PHONE
                      ? styles.focusInput
                      : {},
                  ]}
                  placeholder="Số điện thoại"
                  onBlur={() => {
                    setIsBlurInput('');
                    onBlur;
                  }}
                  placeholderTextColor={PLACE_HOLDER_TEXT_COLOR}
                  onFocus={() =>
                    setIsBlurInput(FOCUS_INPUT_WHEN_USER_LOGIN.PHONE)
                  }
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
            rules={{
              minLength: 4,
              maxLength: 16,
            }}
            name="phone"
          />
          {responseOfData?.response?.status === 400 && (
            <Text>Đăng nhập thất bại</Text>
          )}
          <Controller
            control={control}
            rules={{
              maxLength: 16,
              minLength: 4,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={[styles.wrapInput, { marginTop: 18 }]}>
                <Icon
                  color={
                    isBlurInput === FOCUS_INPUT_WHEN_USER_LOGIN.PASSWORD
                      ? PURPLE_COLOR
                      : GRAY_COLOR
                  }
                  style={styles.inputIcon}
                  as={Icons.Lock}
                />
                <TextInput
                  style={[
                    styles.input,
                    isBlurInput === FOCUS_INPUT_WHEN_USER_LOGIN.PASSWORD
                      ? styles.focusInput
                      : {},
                  ]}
                  placeholder={'Mật khẩu'}
                  autoCapitalize="none"
                  placeholderTextColor={PLACE_HOLDER_TEXT_COLOR}
                  onFocus={() =>
                    setIsBlurInput(FOCUS_INPUT_WHEN_USER_LOGIN.PASSWORD)
                  }
                  onBlur={() => {
                    setIsBlurInput('');
                    onBlur;
                  }}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={isShownPassword}
                />
                <TouchableOpacity
                  onPress={() => setIsShowPassword(!isShownPassword)}
                  style={styles.shownPassword}
                >
                  {isShownPassword ? (
                    <Icon
                      as={Icons.HiddenPassword}
                      color={
                        isBlurInput === FOCUS_INPUT_WHEN_USER_LOGIN.PASSWORD
                          ? PURPLE_COLOR
                          : GRAY_COLOR
                      }
                    />
                  ) : (
                    <Icon
                      as={Icons.ShowPassword}
                      color={
                        isBlurInput === FOCUS_INPUT_WHEN_USER_LOGIN.PASSWORD
                          ? PURPLE_COLOR
                          : GRAY_COLOR
                      }
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}
            name="password"
          />
          <Text style={{ color: 'red' }}>{errorMessage}</Text>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={GOLD_COLOR} size="small" />
            ) : (
              <Text style={styles.submitButtonText}>Đăng nhập</Text>
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <Link
          style={{ marginTop: 8 }}
          to={{ screen: 'ForgotPassword' } as any}
        >
          <Text style={[styles.buttonText, { textAlign: 'center' }]}>
            Quên mật khẩu ?
          </Text>
        </Link>
      </View>
      <View style={styles.registerButton}>
        <Text style={{ fontSize: 16, marginRight: 4 }}>
          Bạn chưa có tài khoản ?
        </Text>
        <Link to={{ screen: 'REGISTRATION_ACCOUNT' } as any}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </Link>
      </View>
      {responseOfData?.status === 200 && (
        <Toast
          visible={isSuccessMessage}
          position={50}
          duration={500}
          shadow={false}
          onShown={() =>
            setTimeout(() => {
              setIsSuccessMessage(false);
            }, 2000)
          }
          animation={true}
          style={{ marginTop: 10 }}
          backgroundColor={GREEN_COLOR}
          textColor={WHITE_COLOR}
        >
          {responseOfData.data.message}
        </Toast>
      )}
      {route?.params?.isRegister ?? (
        <Toast
          position={100}
          duration={500}
          shadow={false}
          animation={true}
          textStyle={{ color: 'white', fontSize: 16 }}
          hideOnPress={true}
          style={{ position: 'absolute' }}
          onShown={() => {
            setTimeout(() => {}, 2000);
          }}
          backgroundColor={GREEN_COLOR}
        >
          <Text>Đăng ký tài khoản thành công</Text>
        </Toast>
      )}
    </SafeAreaView>
  );
};

export default Login;

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: width,
      height: height,
      paddingHorizontal: 14,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: WHITE_COLOR,
    },
    title: {
      fontSize: 38,
      color: '#000',
      fontWeight: 'bold',
    },
    wrapInput: {
      position: 'relative',
    },
    input: {
      width: width - 28,
      padding: 20,
      paddingLeft: 48,
      borderRadius: 8,
      backgroundColor: '#FAFAFA',
      fontSize: 16,
    },
    inputIcon: {
      position: 'absolute',
      top: 20,
      left: 20,
      zIndex: 1,
    },
    shownPassword: {
      position: 'absolute',
      right: 20,
      top: 20,
    },
    buttonText: {
      color: PURPLE_COLOR,
      fontWeight: 'bold',
      fontSize: 16,
    },
    registerButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 14,
    },
    focusInput: {
      borderWidth: 1,
      borderColor: PURPLE_COLOR,
      backgroundColor: '#F3ECFE',
    },
    focusInputWithIcon: {
      color: PURPLE_COLOR,
    },
    submitButton: {
      paddingVertical: 20,
      backgroundColor: PURPLE_COLOR,
      borderRadius: 30,
      marginTop: 20,
    },
    submitButtonText: {
      fontSize: 18,
      fontWeight: '500',
      textAlign: 'center',
      color: WHITE_COLOR,
    },
  });
