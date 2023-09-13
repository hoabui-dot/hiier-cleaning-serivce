import { ITheme, useTheme } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { Image, Text, View } from "react-native";
import { ScrollView, StyleSheet } from "react-native";
import Card from "../../../components/Card";
import { TaskApi } from "../../../services/api/task";
import { IProductTool } from "../../../types/ui";

const Chemical = () => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);
  const [data, setData] = useState<IProductTool[]>([]);

  useEffect(() => {
    const getProduct = () => {
      TaskApi.getChemicalTools().then((response) => {
        setData(response.data.resource);
      });
    };

    getProduct();
  }, []);

  return (
    <ScrollView>
      {data?.map((tool: any) => (
        <Card cardStyle={styles.card}>
          <View style={styles.cardContent}>
            <View>
              <Image
                style={styles.image}
                source={{
                  uri: tool.image.length
                    ? tool.image
                    : 'https://tse1.mm.bing.net/th?id=OIP.nUZwUooehXf715yYw94aSQHaE0&pid=Api&P=0&h=180',
                }}
              />
            </View>
            <View style={styles.content}>
              <Text style={styles.name}>{tool.name}</Text>
              <Text style={styles.wrapDescription}>{`Đơn giá: ${tool.ranges}`}</Text>
              <View style={styles.description}>
                <Text>Nơi bán:</Text>
                <Text style={{marginLeft: 4}}>{tool.store}</Text>
              </View>
            </View>
          </View>
        </Card>
      ))}
    </ScrollView>
  )
}

export default Chemical;

const makeStyles = (args: ITheme) =>
  StyleSheet.create({
    backgroundViolet: {
      backgroundColor: args.colors.violet['400'],
      height: 80,
    },
    image: { width: 100, height: 100 },
    cardContent: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      overflow: 'hidden'
    },
    card: {
      margin: 10,
    },
    content: {
      marginLeft: 10,
      flex: 1,
    },
    name: {
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 10
    },
    wrapDescription: {
      fontSize: 14
    },
    description: {
      flexDirection: 'row',
    }
  });
