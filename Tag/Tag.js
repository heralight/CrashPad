import React, { Component } from 'react';
import { ActivityIndicator, Dimensions,Text,  View, Alert, TouchableOpacity, Image
} from 'react-native';
import {inject, observer} from "mobx-react";

import styles from '../Styles/listingStyles.js';


export class Tag extends Component{
  constructor(props){
    super(props);
  }

  render(){
    var colorChoice = this.props.color;
    return(
      <View style = {{paddingTop:10}}>
      <Text style={{color:colorChoice,fontSize: 13}}> {this.props.name}</Text>
      </View>
    );
  }
}

module.exports = Tag;
