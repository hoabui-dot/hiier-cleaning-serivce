import React, { useEffect, useMemo, useState } from 'react';
import { TASK_STATUS } from '../../../utils/constants/ui';
import { TaskApi } from '../../../services/api/task';
import Card from '../../../components/Card';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { ITheme, useTheme } from 'native-base';
import { ITaskHistory } from '../../../types/ui';
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('screen');

const DoneTaskHistory = () => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);
  const [data, setData] = useState<ITaskHistory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getJobHistory() {
      setIsLoading(true);
      await TaskApi.listForEmployee({
        status: TASK_STATUS.DONE,
        page: 0,
        size: 20,
      }).then((response) => {
        setIsLoading(false);
        setData(response.data.resource.list || []);
      });
    }
    getJobHistory();
  }, []);

  return (
    <ScrollView>
      {isLoading ? (
        <View style={styles.wrapLoading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        data.map((task) => (
          <Card
            cardStyle={{ flexDirection: 'column', margin: 10, padding: 20 }}
          >
            <View>
              <Text style={[styles.title, styles.title_task]}>
                {task.serviceName}
              </Text>
            </View>
            <View style={styles.informationJob}>
              <Text style={styles.title}>Kết thúc vào:</Text>
              <Text style={styles.violetFontSize}>
                {new Date(task.taskStatus?.time).toLocaleString()}
              </Text>
            </View>
            <View style={styles.informationJob}>
              <Text style={styles.title}>Tổng tiền:</Text>
              <Text style={styles.violetFontSize}>{task.totalPrice}</Text>
            </View>
            <View style={styles.informationJob}>
              <Text style={styles.title}>Tên:</Text>
              <Text style={styles.violetFontSize}>
                {task.addressCustomerName}
              </Text>
            </View>
            <View style={styles.informationJob}>
              <Text style={styles.title}>Tại:</Text>
              <Text style={styles.violetFontSize}>{task.addressDetail}</Text>
            </View>
          </Card>
        ))
      )}
    </ScrollView>
  );
};

export default DoneTaskHistory;

const makeStyles = ({ colors }: ITheme) =>
  StyleSheet.create({
    title: {
      textTransform: 'uppercase',
      color: colors.primary.gold,
      fontWeight: '500',
    },
    title_task: {
      fontWeight: '500',
      fontSize: 22,
    },
    title_information: {
      marginRight: 8,
      textTransform: 'capitalize',
    },
    informationJob: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      flexWrap: 'wrap',
    },
    violetFontSize: {
      fontSize: 14,
      marginLeft: 10,
    },
    loading: {
      color: colors.primary.gold,
    },
    wrapLoading: {
      height: height - Constants.statusBarHeight - 90,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
