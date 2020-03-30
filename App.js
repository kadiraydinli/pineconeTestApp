import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar, Image, Platform, TouchableOpacity } from 'react-native';
import {
  Text, Badge, Avatar, Divider, Button, Card, Modal, Slider, Clock, ProgressBar, Snackbar, Toast,
  Header, IconButton, Fab, Input, Icon
} from './pinecone/src';
import * as Progress from 'react-native-progress';
//import { List  } from 'react-native-paper';
import { ListItem } from 'react-native-elements'

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

  const list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman'
    },
    {
      name: 'KAdir',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman'
    },
]

  return (
    <SafeAreaView style={styles.container}>
      <Text color="red">Kadi</Text>
      <Avatar value="KD" backgroundColor="blue" size={70} onPress={() => alert('Avatar')} avatarMini={<Badge value="11" />} />
      <View style={{ width: "90%" }}>
            {list.map((value, i) => (
              <ListItem
                onPress={() => alert(value.name)}
                roundAvatar
                avatar={{ uri: value.avatar_url }}
                key={value.name}
                title={value.name}
              />
            ))
          }
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
