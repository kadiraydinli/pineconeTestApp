import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar, Image, Platform, TouchableOpacity } from 'react-native';
import {
  Text, Badge, Avatar, Divider, Button, Card, Modal, Slider, Clock, ProgressBar, Snackbar, Toast,
  Header, IconButton, Fab, Input, Icon
} from './pinecone/src';
import * as Progress from 'react-native-progress';
import { TextInput } from 'react-native-paper';

const App = (props) => {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState("bottom");
  const [veri, setVeri] = useState(0);

  const [value, onChangeText] = React.useState('');

  const toast = useRef();

  useEffect(() => {

  });

  const action = [{ icon: "facebook", label: "fabeook", backgroundColor: "#4A6CA7", onPress: () => alert("samet"), iconColor: "white" },
  { icon: "twitter", backgroundColor: "#00B9EF", iconColor: "white", iconProps: { onLongPress: () => alert("sdkfş") } },
  { icon: "tumblr", backgroundColor: "#000000", iconColor: "white" },
  { icon: "instagram", backgroundColor: "#6091B2", iconColor: "white" },
  { icon: "twitch", backgroundColor: "#7A56B2", iconColor: "white" },
  { icon: "github", backgroundColor: "#000000", iconColor: "white", onPress: () => alert("fgfkl") },
  { icon: "gitlab", backgroundColor: "#ED5C38", iconColor: "white" }]

  return (
    <SafeAreaView style={styles.container}>
      <Toast text="kadir" ref={toast} />
      <Avatar icon={{ name: "facebook", color: "red" }} backgroundColor="blue" avatarMini={<Badge value="11" />} />
      <View style={{ width: "90%" }}>
        <Button iconLeft={{ name: "home", color: "red" }}
          iconRight={{ name: "home", color: "white", size: 24 }} type="rounded" title="Buraya Tıkla" onPress={() => { }} />
          <Divider title="kadir" />
        <Input value={value} onChangeText={value => onChangeText(value)} label="Hop hemşerim nereye?" type="outlined" />
      </View>
    </SafeAreaView>
  );
};

/**<Toast text="alll dsf sdj  df gkjdf lgkjfdlkg " childRef={ref => toast = ref} /> */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: '50%',
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: '#2E7D32',
    borderRadius: 7,
    margin: 10
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 5
  }
});

export default App;

/**
 * <Text success>Kadir Aydınlı</Text>
        <Button title="Tıkla" onPress={() => setVisible(!visible)} />
        <Image source={require('./kdr.jpg')} style={{width: 200, height: 200}} blurRadius={10} />
        <Modal visible={visible}
          backgroundImage={require('./kdr.jpg')}
          onRequestClose={() => setVisible(false)}>
          <Avatar
            source={require('./kdr.jpg')}
            size="large"
            type="rounded"
            onPress={() => alert('Avatar')}
            avatarMiniPosition="topRight"
            avatarMini={<Badge value="99+" warning />}
            avatarMiniOnPress={() => alert('Bagde')}
          />
          <Text>Kadir Aydınlı</Text>
        </Modal>
 */
