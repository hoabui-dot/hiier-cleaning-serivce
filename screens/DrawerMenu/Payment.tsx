import { HStack, ITheme, useTheme } from 'native-base';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import Heading from '../../components/Base/HeadingBase';
import images from '../../assets';
import TabsPayment from '../../components/TabsPayment';
import Icons from '../../utils/Icon/Icons';
import Icon from '../../utils/Icon/Icon';
import { DEFAULT_HIPAY } from '../../utils/constants/ui';
import { TaskApi } from '../../services/api/task';
import { IHiPay } from '../../types/ui';
import Constants from 'expo-constants';

const PaymentScreen = ({ route, navigation }: any) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);
  const [data, setData] = useState<IHiPay>(DEFAULT_HIPAY);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getWalletInfo() {
      setIsLoading(true);
      await TaskApi.getWalletInfo()
        .then((response) => {
          setData(response.data?.resource || []);
          setIsLoading(false);
        })
        .catch((err) => console.log('errrrr: ', err));
    }

    getWalletInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header headerText="Hii Pay" backButton />
      <ImageBackground
        source={images.card_violet}
        resizeMode="cover"
        borderRadius={10}
        style={styles.image}
      >
        <HStack
          alignItems={'center'}
          justifyContent={'space-between'}
          flex={1}
          borderBottomWidth={1}
          borderColor={'white'}
          borderStyle={'dashed'}
        >
          <Heading color={'white'} fontSize={'lg'}>
            HOABUI
          </Heading>
          <TouchableOpacity>
            <HStack alignItems={'center'} style={styles.pointsWrap}>
              <Image source={images.gold_rank} style={styles.rank} />
            </HStack>
          </TouchableOpacity>
        </HStack>
        <HStack alignItems={'center'} justifyContent={'space-between'} mt={3}>
          <TouchableOpacity onPress={() => navigation.navigate('PaymentTopUp')}>
            <HStack alignItems={'center'}>
              <Heading color={'white'} textTransform={'capitalize'}>
                Rút tiền
              </Heading>
              <Icon
                as={Icons.Recharge}
                size={8}
                color={'white'}
                style={{ transform: [{ rotate: '-90deg' }] }}
              />
            </HStack>
          </TouchableOpacity>
          {isLoading ? (
            <ActivityIndicator
              style={styles.loading}
              size="small"
              color="#ede9fe"
            />
          ) : (
            <Heading color={'white'} fontSize={'xl'}>
              {data.balance.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })}
            </Heading>
          )}
        </HStack>
      </ImageBackground>
      <TabsPayment />
    </SafeAreaView>
  );
};

const makeStyles = ({ colors, sizes, fontSizes, shadows }: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      marginTop: -Constants.statusBarHeight,
    },
    image: {
      // flex: 1,
      justifyContent: 'center',
      minHeight: 180,
      padding: sizes.padding * 2,
      margin: sizes.padding * 2,
    },
    rank: {
      height: 20,
      width: 20,
      resizeMode: 'contain',
    },
    pointsWrap: {
      backgroundColor: 'white',
      padding: 5,
      paddingHorizontal: 10,
      borderRadius: 50,
    },
    loading: {
      position: 'absolute',
      zIndex: 10,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default PaymentScreen;
