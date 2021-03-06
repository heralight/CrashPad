import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert,
Keyboard, ScrollView, FlatList, KeyboardAvoidingView, TextInput, TouchableWithoutFeedback} from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage,List, ListItem, Icon} from 'react-native-elements';
import InputScrollView from 'react-native-input-scroll-view';

import * as firebase from 'firebase';
import {inject, observer} from "mobx-react";

import Message from './Message.js';

const that = null;

@inject('inbox')
@observer
export class MessagesScreen extends Component{

  static navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state;
  return {
      title: "Messages",
      headerTitleStyle :{textAlign:'center',color:'#838889',fontFamily:'Circular Bold',fontSize:17, backgroundColor:'transparent', marginTop:-3},
      headerStyle: {backgroundColor:'white'},
      headerLeft:
       <Icon
        name='chevron-left'
        type='material-community'
        color='#FF5A5F'
        size = {40}
        containerStyle={{marginLeft:10}}
        onPress={() => that.props.inbox.leaveMessages(navigation)} />,
  };
};

  	constructor(props){
  		super(props);
      this.state = {
        height: 0
      }
    }

    componentDidMount(){
      that = this;
      this.scrollToEnd();
    }


    renderMessages = ({item}) => (
    <Message {...item} />
    );


    updateHeight(contentHeight){
      if(contentHeight < 150){
        this.setState({height:contentHeight})
      }
    }

    scrollToEnd = () => {
   this.scrollView.scrollToEnd();
 }

    sendMessage(){
      if(this.props.inbox.messageText.length!=0){
        this.props.inbox.sendMessage();
          this.scrollToEnd();
      }
    }

      render(){
        let messages = this.props.inbox.messages.slice();
        return (
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={61}
            style = {{flex:1,backgroundColor:'white',height:400}}
          >

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
          ref={(scrollView) => { this.scrollView = scrollView }}
          contentContainerStyle = {{paddingHorizontal:8, paddingTop:30}}

          >
          <FlatList
            data= {messages}
            renderItem={this.renderMessages}
            style = {{marginTop: -1 * this.state.height}}

          />
            </ScrollView>
            </TouchableWithoutFeedback>



            <View style = {{flexDirection:'row',justifyContent:'center', alignItems:'center', backgroundColor:'#eeeeee',padding:10}}>
            <View style = {{borderRadius:20, borderWidth:2, backgroundColor:'white', borderColor:'white', padding:9}}>
            <TextInput
            autoCapitalize = {'none'}
            placeholder=' Email'
            onChangeText={(message) => this.props.inbox.messageText = message}
            value={this.props.inbox.messageText}
            multiline = {true}
            onContentSizeChange={(event) =>  this.updateHeight(event.nativeEvent.contentSize.height)}
            onFocus = {() => this.scrollToEnd()}
            style = {{color:'red', width:200,borderBottomWidth:0,height: Math.max(15, this.state.height), maxHeight:200}}
             />
             </View>

             <Icon
              name='send'
              type='material-community'
              color='#FF5A5F'
              size = {30}
              containerStyle={{position:'absolute', right:16, opacity:this.props.inbox.messageText.length == 0 ? 0.2:1}}
              underlayColor = 'transparent'
              onPress={() => this.sendMessage()} />

             </View>




            </KeyboardAvoidingView>

        );
      }
  }


module.exports = MessagesScreen;
