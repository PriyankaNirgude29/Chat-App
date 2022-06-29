import React,{ useState, useEffect, useCallback }  from 'react';
import { View, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { GiftedChat,Bubble } from 'react-native-gifted-chat';
import { collection, onSnapshot, addDoc, query, orderBy } from "firebase/firestore";
import { auth, db } from '../firebase/firebase-config';

export default function Chat (props){
 
  //State
  const {name, color} = props.route.params;
  const [messages, setMessages] = useState([]);
      
  // Fetch collection and query on it
  const messagesCollection = collection(db, 'messages');
  
  //Run once after component mount         
  useEffect(() => {
                      // Set the title of the page and give's a name to it
  
  
                        props.navigation.setOptions({ headerShown: true})
                        props.navigation.setOptions({ title: props.route.params.name + '\'s chat' });
                        
                       // Create variable to hold unsubsriber
                        let unsubscribe;
  
  
                      // Fetch collection and query on it
                      const messagesQuery = query(messagesCollection, orderBy("createdAt", "desc"));

                       // onSnapshot returns an unsubscriber, listening for updates to the messages collection
                      unsubscribe = onSnapshot(messagesQuery, getDatabaseMessages);
                        
                          //In here code will run once the component will unmount
                          return () => unsubscribe();
                    
  },[])

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

  return (
              <View style={{flex: 1, backgroundColor: color }}>
              <GiftedChat
                  renderBubble={renderBubble}
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
  fontWeight: 300,
  textAlign: 'center',
  color: 'white'
},
offline: {
  flex: 0.6,
  justifyContent: 'center'
},
});