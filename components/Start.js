import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Pressable } from 'react-native';
import BackgroundImage from '../assets/Background_Image.png';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Start (props) {
    
    const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE']
    
    const [name, onChangeSetName] = useState('');
    const [color, onPressSetColor] = useState('#090C08')
   
    const onPressLogin = () => {
      //If the name isn't entered the app doesn't go to the Main Chat
      name && props.navigation.navigate('Chat', {name, color})
    }

    return (
      <View style={styles.container}>
          <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.background_image}>
              <View style={styles.header}>
                    <Text style={styles.title}>Chatty</Text>
              </View>
              
			        {/* Main View */}
              <View style={styles.main}>
                <View style={styles.searchSection}>
                    <FontAwesome5 name="user" size={16} style={styles.searchIcon} />
                    {/* Input box */}
                    <TextInput style={styles.input}
                          onChangeText={(text) => onChangeSetName(text)}
                          value={name}
                          placeholder='Your name'
                    >
                    </TextInput>
              </View>    
                
			        	{/* Label */}
                <Text style={styles.text}>Choose Background Color:</Text>
                    
                {/* Color Picker container */}
                <View style={styles.colorContainer}>
					
                        
                    {colors.map((c) => (
                          <TouchableOpacity
                          key={c}
                          onPress={() => onPressSetColor(c)}
                          style={[{ backgroundColor: c }, styles.colorCircle]}
                        />
                    ))}
                    </View>
                    
                    {/* Pressable button */}
					<Pressable
						onPress={() => onPressLogin()}
						style={[styles.button, {backgroundColor: color}]}
                    >
            			<Text style={styles.button}>Start Chatting</Text>
          			</Pressable>
              </View>
        </ImageBackground>
      </View>
    )
 }

 const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background_image: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: '100%',
  },
  text: {
	marginRight: 'auto',
	marginLeft: '7%',
    color: '#757083',
    fontSize: 16,
   
},
  header: {
    flex: 0.6,
    justifyContent: 'center'
  },
  title: {
    fontSize: 45,
    color: '#fff'
  },	
  main: {
    width: '88%',
    backgroundColor: 'white',
    alignItems: 'center',
    height: '44%',
    justifyContent: 'space-around',
	marginBottom: 20,
	borderRadius: 10
  },
  searchSection: {
    border: '2px solid lightgrey',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
	width: '88%',
},
  searchIcon: {
    paddingLeft: 10,
    color: 'grey'
},
input: {
	fontSize: 16,
    padding: 12,
    backgroundColor: '#fff',
    color: '#424242',
},
  colorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "88%",
  },
  button: {
	width: '88%',
    color: '#fff',
	textAlign: 'center',
    fontSize: 18,
    padding: 7,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});