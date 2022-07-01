import React,{ useState, useEffect, useCallback }  from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { GiftedChat,Bubble,InputToolbar } from 'react-native-gifted-chat';
import { collection, onSnapshot, addDoc, query, orderBy } from "firebase/firestore";
import { auth, db } from '../firebase/firebase-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export default function Chat (props){
 
  //State
  const {name, color} = props.route.params;
  const [messages, setMessages] = useState([]);

   // State to hold information if user is offline or online
   const [isConnected, setIsConnected] = useState();

      
  // Fetch collection and query on it
  const messagesCollection = collection(db, 'messages');

  // OFFLINE: Create functions to display messages when user is offline
    // 1. Save messages to async storage
    const saveMessages = async () => {
      try {
          await AsyncStorage.setItem('messages', JSON.stringify(messages));
      }
      catch (error) {
          console.log(error.message);
      }
  }

  // 2. Retrieve messages from async storage
  const getMessages = async () => {
      let mess = '';
      try {
          mess = await AsyncStorage.getItem('messages') || [];
          setMessages(JSON.parse(mess));
      }
      catch (error) {
          console.log(error.message);
      }
  }

  // 3. Delete messages from async storage (for development purposes only)
  const deleteMessages = async () => {
      try {
          await AsyncStorage.removeItem('messages');
      }
      catch (error) {
          console.log(error.message);
      }
  }

  
  //Run once after component mount         
  useEffect(() => {
                      // Set the title of the page and give's a name to it
  
  
                        props.navigation.setOptions({ headerShown: true})
                        props.navigation.setOptions({ title: props.route.params.name + '\'s chat' });
                        
                       // Create variable to hold unsubsriber
                        let unsubscribe;
                      // Check if user is offline or online using NetInfo
                       NetInfo.fetch().then(connection => {
                         if (connection.isConnected) {
                            setIsConnected(true);
                            console.log('online');
                        } else {
                           setIsConnected(false);
                           console.log('offline');
                       }
                     });

                     // If user is online, retrieve messages from firebase store, if offline use AsyncStorage
        if (isConnected) {
                      // Fetch collection and query on it
                      const messagesQuery = query(messagesCollection, orderBy("createdAt", "desc"));

                       // onSnapshot returns an unsubscriber, listening for updates to the messages collection
                      unsubscribe = onSnapshot(messagesQuery, getDatabaseMessages);
                       // Delete previously saved messages in asyncStorage
                       deleteMessages();
                       // Save messages to asyncStorage
                       saveMessages();

                      // unsubsribe snapshot listener on unmount
                      return () => unsubscribe();
                   }
           else {
                        // Load messages from asyncStorage
                       getMessages();
                } 
  
                    
                        
                  
  }, [isConnected])

// WORKING WITH FIREBASE

//Use addDoc() to add another document to the collection
const addMessage = (message) => {
                              addDoc(messagesCollection, 
                                {
                                  _id: message._id,
                                  text: message.text || '',
                                  createdAt: message.createdAt,
                                  user: message.user
                                });
}

  //Fecth messages from DB and setState
  const getDatabaseMessages = (querySnapshot) => {
    setMessages(
      querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text || '',
          user: doc.data().user,
      }))
  )           
                              
  }

  //Append message to the State and call addMessage()
  const sendMessageToDatabase = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    addMessage(messages[0]);
}, [])


 // Customize the color of the sender bubble
 const renderBubble = (props) => {
                                return (
                                  <Bubble {...props}
                                    textStyle={{
                                    right: {
                                      color: 'black',
                                    },
                                    left: {
                                      color: 'white',
                                    }
                                    }}
                                    wrapperStyle={{
                                    left: {
                                      backgroundColor: 'teal',
                                      padding: 7
                                    },
                                    right: {
                                      backgroundColor: 'darkorange',
                                      padding: 7
                                    }
                                    }}
                                  />
                                  );
  }
   // Hide input bar if user is offline so that they cannot create or send messages
   const renderInputToolbar = (props) => {
    if (!isConnected) {
        return (
              <View style={styles.offline}>
                      <Text style={styles.text}>You are offline, waiting to be back online</Text>
              </View>)
    }
    else {
        // Display Toolbar
        return (
            <InputToolbar
                {...props}
            />
        );
    }
}
  return (
              <View style={{flex: 1, backgroundColor: color }}>
              <GiftedChat
                  renderBubble={renderBubble}
                  renderInputToolbar={renderInputToolbar.bind()}
                  messages={messages}
                  onSend={messages => sendMessageToDatabase(messages)}
                  user={
                    {
                    _id: 1,
                    name: name,
                    avatar: 'https://placeimg.com/140/140/any'
                  }
                  }
              />
              {Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height'/> : null}
            </View> 
  )
}

const styles = StyleSheet.create({
text: {
margin: 'auto',
  color: '#757083',
  fontSize: 16,
  textAlign: 'center',
  color: 'white'
},
offline: {
  flex: 0.6,
  justifyContent: 'center'
},
});