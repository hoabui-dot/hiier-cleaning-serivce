import { Icon, ITheme, useTheme } from 'native-base';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { TRANSACTION_HISTORY_TYPE } from '../../utils/constants/ui';
import PagerView from 'react-native-pager-view';

import { TaskApi } from '../../services/api/task';
import { ITransactionHistory } from '../../types/ui';
import Icons from '../../utils/Icon/Icons';

const Transfer = () => {
  const [data, setData] = useState<ITransactionHistory[]>([]);
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getTransactionHistory() {
      setIsLoading(true);
      TaskApi.getTransactionHistory()
        .then((response) => {
          setData(response.data?.resource?.list || []);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log('transfer error message:', err);
        });
    }

    getTransactionHistory();
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.transaction}>
        <View style={styles.content}>
          <View>
            <Icon
              as={Icons.Coin}
              color={
                item.type === TRANSACTION_HISTORY_TYPE.TOP_UP
                  ? 'violet.500'
                  : 'gray.400'
              }
              size={10}
            />
          </View>
          <View style={styles.description}>
            <Text style={styles.boldText}>{item.content}</Text>
            <Text style={styles.thinText}>
              {new Date(item.time).toLocaleString()}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.amount}>
            {TRANSACTION_HISTORY_TYPE.TOP_UP
              ? `+${item.amount.toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })}`
              : `-${item.amount.toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })}`}
          </Text>
        </View>
      </View>
    ),
    [data]
  );

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#D6AD60" />
      ) : (
        <FlatList data={data} renderItem={renderItem} />
      )}
    </ScrollView>
  );
};

export default Transfer;

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({
    container: {
      margin: 10,
      height: '100%',
    },
    boldText: {
      fontSize: 14,
      fontWeight: 'bold',
      width: 160,
    },
    thinText: {
      fontSize: 12,
      fontWeight: '200',
    },
    content: {
      flexDirection: 'row',
    },
    description: {
      marginLeft: 10,
      justifyContent: 'center',
    },
    transaction: {
      marginVertical: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    amount: {
      fontWeight: '800',
      color: colors.green[500],
    },
  });
