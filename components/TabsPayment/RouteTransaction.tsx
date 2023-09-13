import { HStack, ITheme, useTheme } from 'native-base';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import Heading from '../Heading';
import Result from '../Result';
import ViewSection from '../ViewSection';
import { Transaction } from '../../types/ui';
import moment from 'moment';
import { TransactionApi } from '../../services/api/transaction';

export interface RouteTransactionProps {}

const RouteTransaction = (props: RouteTransactionProps) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const res = await TransactionApi.getAll();
        setTransactions(res.resource);
      } catch (error) {
        console.log('transaction error message:', error);
      }
    };
    getTransactions();
  }, []);

  return (
    <ScrollView>
      {transactions?.length ? (
        transactions?.map((it, id) => (
          <TouchableOpacity
            key={id}
            // onPress={() => navigation.navigate('TaskDetail', { id: it.id })}
          >
            <ViewSection style={styles.item}>
              <HStack justifyContent={'space-between'} alignItems={'center'}>
                <View style={{ flexShrink: 1 }}>
                  <Heading mb={2}>{it.content}</Heading>
                  <Text>{moment(it.time).format('DD/MM/YYYY')}</Text>
                </View>
                {it.type === 'WITH_DRAW' ? (
                  <Heading color={'red.500'} fontSize={'lg'}>
                    -{it.amount} VND
                  </Heading>
                ) : (
                  <Heading color={'green.500'} fontSize={'lg'}>
                    +{it.amount} VND
                  </Heading>
                )}
              </HStack>
            </ViewSection>
          </TouchableOpacity>
        ))
      ) : (
        <Result />
      )}
    </ScrollView>
  );
};

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({
    item: {
      borderColor: colors.gray['200'],
      borderBottomWidth: 1,
      borderStyle: 'dashed',
      paddingVertical: sizes.padding * 2,
      marginTop: 0,
      backgroundColor: colors.white,
    },
  });

export default RouteTransaction;
