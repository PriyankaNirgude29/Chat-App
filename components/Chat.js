import React from 'react';
import { View, Text} from 'react-native';


export default class Chat extends React.Component {
    constructor(props) {
        super(props);
    }
  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    let { bgColor } = this.props.route.params;
   
    return (
        <View
        style={{
          backgroundColor: bgColor,
          flex: 1,
        }}
      />
    )
  }
}