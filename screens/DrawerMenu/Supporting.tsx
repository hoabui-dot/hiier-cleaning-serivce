import { ITheme, Text, useTheme } from 'native-base';
import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Card from '../../components/Card';

const Supporting = () => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  return (
    <SafeAreaView>
      <Card cardStyle={{ padding: 20, margin: 10 }}>
        <Text style={styles.title}>
          Tổng dài hỗ trợ các vấn đề về Nhân sự (mở, khoá tài khoản, xin tạm
          nghỉ...)
        </Text>
        <Text style={styles.title}>Lịch làm việc</Text>
        <Text style={styles.title}>
          Trong giờ hành chính, từ thứ 2 đến thứ 6
        </Text>
        <Text>8:30 - 12:00</Text>
        <Text>13:30 - 18:00</Text>
        <View style={styles.saturday}>
          <Text style={styles.title}>Thứ bảy</Text>
          <Text style={{ marginLeft: 10 }}>8:30 - 12:00</Text>
        </View>
        <Text style={styles.title}>Không hỗ trợ ngoài giờ làm việc</Text>
      </Card>
    </SafeAreaView>
  );
};

export default Supporting;

const makeStyles = ({ colors }: ITheme) =>
  StyleSheet.create({
    title: {
      fontWeight: 'bold',
      fontSize: 14,
      marginVertical: 4,
    },
    saturday: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
