import React, { useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Text } from 'react-native';
import { ITheme, useTheme } from 'native-base';
import Toast from 'react-native-root-toast';
import { Calendar } from 'react-native-calendars';
import {
  GOLD_COLOR,
  GRAY_COLOR,
  LIGHT_PURPLE_COLOR,
  PURPLE_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../../utils/constants/ui';
import { ScrollView } from 'react-native';
import moment from 'moment';
import { TaskApi } from '../../services/api/task';

const { width } = Dimensions.get('screen');

const CalendarJob = () => {
  const [tasks, setTasks] = useState<any>([]);
  const [alreadyTaskFullDate, setAlreadyTaskFullDate] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);
  const [isErrorMessage, setIsErrorMessage] = useState<boolean>(false);
  const [numOfTask, setNumOfTask] = useState<number>(0);

  useEffect(() => {
    const fetchTaskList = () => {
      TaskApi.getAlreadyTaskDate()
        .then((response) => {
          setAlreadyTaskFullDate(
            response.data.resource?.map((date: number) =>
              moment(new Date()).format('YYYY-MM-' + date)
            )
          );
        })
        .catch((err) => {
          setIsErrorMessage(true);
        });
    };
    fetchTaskList();
  }, []);

  const onGetTask = (date: number) => {
    setIsLoading(true);
    TaskApi.getTaskList(date)
      .then((res) => {
        setIsLoading(false);
        setTasks(res.data.resource);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsErrorMessage(true);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapCalendar}>
        <Calendar
          onDayPress={(day) => onGetTask(day.day)}
          theme={{
            backgroundColor: LIGHT_PURPLE_COLOR,
            calendarBackground: LIGHT_PURPLE_COLOR,
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: LIGHT_PURPLE_COLOR,
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
          }}
          markedDates={alreadyTaskFullDate.reduce(
            (a, v) => ({
              ...a,
              [v]: {
                selected: true,
                color: 'red',
                selectedTextColor: WHITE_COLOR,
                selectedColor: PURPLE_COLOR,
                customContainerStyle: { backgroundColor: 'red' },
              },
            }),
            {}
          )}
          headerStyle={{ backgroundColor: LIGHT_PURPLE_COLOR }}
        />
      </View>
      <View style={styles.taskList}>
        <Text style={styles.numOfTaskText}>{`Công việc (${numOfTask})`}</Text>
        {tasks.length ? (
          <View style={{ marginTop: 20 }}>
            {isLoading ? (
              tasks.map((task: any) => (
                <View style={styles.task}>
                  <Image
                    style={styles.taskItemImage}
                    source={{
                      uri: 'https://thumbs.dreamstime.com/z/girl-doing-housekeeping-tasks-washing-walls-her-apartment-woman-cleaning-washable-paint-house-session-135679278.jpg?w=992',
                    }}
                  />
                  <View>
                    <Text style={styles.taskTitle}>{task.serviceName}</Text>
                    <Text style={styles.customerName}>{task.customerName}</Text>
                    <Text style={styles.timeText}>{`${moment(
                      task.workDate
                    ).hour()}h:${moment(task.workDate).minute()} ngày ${moment(
                      task.workDate
                    ).format('DD-MM-YYYY')}`}</Text>
                  </View>
                </View>
              ))
            ) : (
              <ActivityIndicator color={GOLD_COLOR} size="large" />
            )}
          </View>
        ) : isLoading ? (
          <View style={styles.taskView}>
            <ActivityIndicator color={GOLD_COLOR} size="large" />
          </View>
        ) : (
          <View style={styles.taskView}>
            <Image
              resizeMode="contain"
              style={styles.taskImage}
              source={require('../../assets/taskList.png')}
            />
            <Text style={styles.notificationText}>
              Hiện tại bạn chưa có được công việc
            </Text>
          </View>
        )}
      </View>
      {isErrorMessage && (
        <Toast
          visible={isErrorMessage}
          position={100}
          duration={500}
          shadow={false}
          animation={true}
          textStyle={{ color: 'white', fontSize: 16 }}
          hideOnPress={true}
          onShown={() => {
            setTimeout(() => {
              setIsErrorMessage(false);
            }, 2000);
          }}
          backgroundColor={RED_COLOR}
        >
          Lỗi hệ thống !
        </Toast>
      )}
    </ScrollView>
  );
};

export default CalendarJob;

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: WHITE_COLOR,
      flex: 1,
      paddingHorizontal: 20,
    },
    wrapCalendar: {
      marginTop: 20,
      borderRadius: 20,
      overflow: 'hidden',
      height: 300,
    },
    numOfTaskText: {
      fontWeight: '500',
      fontSize: 18,
    },
    taskList: {
      marginTop: 10,
    },
    taskImage: {
      width: (width / 5) * 3,
      height: (width / 5) * 3,
    },
    taskView: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
    },
    notificationText: {
      fontSize: 20,
      fontWeight: '500',
      marginTop: 10,
    },
    task: {
      flexDirection: 'row',
      marginVertical: 8,
    },
    taskItemImage: {
      width: 120,
      height: 120,
      borderRadius: 20,
      marginRight: 20,
    },
    taskTitle: {
      fontWeight: '600',
      fontSize: 28,
    },
    customerName: {
      fontSize: 16,
      color: GRAY_COLOR,
      paddingVertical: 10,
    },
    timeText: {
      fontSize: 14,
    },
  });
