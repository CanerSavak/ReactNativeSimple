import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import  {List, Avatar, Card, Button, Title, Paragraph,Badge } from 'react-native-paper'


export default function Detail({navigaiton, route }) {
 
 const item = route.params?.item 
 
 return (
    <View style={styles.container}>
      <ScrollView>
      
      <Card> 
      <Card.Cover source={{uri : item.images.         [0].normal}}/>
      </Card>
      <Title style={{textAlign:'center', marginTop: 10}}> { item.productName} </Title>
      <Badge size={30}>{item.price}₺</Badge>
      <Paragraph> {item.description}</Paragraph>
      
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  
});