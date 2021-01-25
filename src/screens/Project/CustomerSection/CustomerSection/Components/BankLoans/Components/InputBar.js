import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

function InputBar(props) {
  const {onSendPressed, onChangeText, onSizeChange, value} = props;
  const inputRef = React.createRef();

  return (
    <View style={styles.inputBar}>
      <AutoGrowingTextInput
        style={styles.textBox}
        ref={inputRef}
        multiline={true}
        defaultHeight={30}
        onChangeText={onChangeText}
        onContentSizeChange={onSizeChange}
        value={value}
      />
      <TouchableOpacity style={styles.sendButton} onPress={onSendPressed}>
        <Text style={{color: 'white'}}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 3,
  },

  textBox: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },

  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    marginLeft: 5,
    paddingRight: 15,
    borderRadius: 5,
    backgroundColor: '#66db30',
  },
});

export default InputBar;
