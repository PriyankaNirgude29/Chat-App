import React, { Component } from "react";
import {
  ImageBackground,
  Image,
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

import BackgroundImage from "../assets/Background_Image.png";

export default class Start extends Component {
  //setting state for name and backgroundcolor
  constructor(props) {
    super(props);
    this.state = { name: "", bgColor: this.colors.dark };
  }

  // function to setState to change the backgroundcolor on user select of background
  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };

  // background colors the user can select
  colors = {
    dark: "#090C08",
    purple: "#474056",
    blue: "#8A95A5",
    green: "#B9C6AE",
  };

  //function that will invoke the setState of text
  // This will handle the input of the user

  render() {
    return (
      <ImageBackground
        source={BackgroundImage}
        style={styles.container}
        resize="cover"
      >
        <Text style={styles.title}>ChatApp</Text>
        <View style={styles.wrapper}>
          <View >
            {/* <Image source={require("./icon.png")} style={styles.image} /> */}
            <TextInput
              // value assign from the state text
              value={this.state.name}
              //onChangeText react native event handler, uses change of input from user
              onChangeText={(name) => this.setState({ name })}
              style={styles.input}
              placeholder="Your Name"
              accessible={true}
              accessibilityLabel="your name"
              accessibilityHint="Type the name you want to use in the chat session."
            />
          </View>
          <Text style={styles.text}>Choose Background Color</Text>
          <View style={styles.colorwrapper}>
            <TouchableOpacity
            
              style={styles.circle1}
              onPress={() => this.changeBgColor(this.colors.dark)}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Very dark (mostly black) green violet background color"
              accessibilityHint="Adds very dark (mostly black) green background color to the chat screen."
              
              
            ></TouchableOpacity>
            <TouchableOpacity
              style={styles.circle2}
              onPress={() => this.changeBgColor(this.colors.purple)}
              accessibilityRole="button"
              accessibilityLabel="Very dark grayish violet background color"
              accessibilityHint="Adds very dark grayish violet  background color to the chat screen."
            ></TouchableOpacity>
            <TouchableOpacity
              style={styles.circle3}
              onPress={() => this.changeBgColor(this.colors.blue)}
              accessibilityRole="button"
              accessibilityLabel=" Dark grayish blue background color"
              accessibilityHint="Adds  dark grayish blue background color to the chat screen."
              accessible={true}
             
            ></TouchableOpacity>
            <TouchableOpacity
              style={styles.circle4}
              onPress={() => this.changeBgColor(this.colors.green)}
               accessibilityRole="button"
              accessibilityLabel="Grayish green background color"
              accessibilityHint="Adds grayish green background color to the chat screen."
            ></TouchableOpacity>
          </View>
          <Button
            title="Start Chatting"
            color="#757083"
            style={styles.button}
            //onPress react native event handler, user presses on something
            // here the pressing of the button will navigate to the different (screen) component called "Chat"
            onPress={() =>
              this.props.navigation.navigate("Chat", {
                name: this.state.name,
                bgColor: this.state.bgColor,
              })
            }
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // image:{
  // height:2,
  // },
 
  wrapper: {
    backgroundColor: "white",
    width: "88%",
    height: "44%",
    padding: 20,
   marginBottom:300
  },
  button: {
    height: 50,
    marginTop: 30,
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  input: {
    paddingLeft: 20,
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.5,
    marginBottom: 30,
  },
  title: {
    marginTop: 20,
    color: "#FFFFFF",
    fontSize: 45,
    lineHeight: 600,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    textAlign:'center',
  },
  colorwrapper: { flex: 1, flexDirection: "row", marginTop: 10 ,justifyContent: 'space-evenly'},

  circle1: {
    backgroundColor: "#090C08",
    borderRadius: 25,
    width: 30,
    height: 30,
 
  },
  circle2: {
    backgroundColor: "#474056",
    borderRadius: 25,
    width: 30,
    height: 30,
   
  },
  circle3: {
    backgroundColor: "#8A95A5",
    borderRadius: 25,
    width: 30,
    height: 30,
   
  },
  circle4: {
    backgroundColor: "#B9C6AE",
    borderRadius: 25,
    width: 30,
    height: 30,
  
  },
});