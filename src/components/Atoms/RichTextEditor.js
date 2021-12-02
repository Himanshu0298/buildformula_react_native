import React from 'react';
import {
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

const RichTextEditor = props => {
  const {placeholder, value, onChangeText} = props;

  const richText = React.useRef();

  return (
    <View>
      <ScrollView style={{flexGrow: 1, borderWidth: 1, borderRadius: 10}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <RichEditor
            ref={richText}
            useContainer={false}
            placeholder={placeholder}
            initialContentHTML={value}
            containerStyle={{minHeight: 150, borderRadius: 10}}
            // editorStyle={{
            //   // backgroundColor: 'white',
            //   borderColor: 'blue',
            // }}
            onChange={onChangeText}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <RichToolbar
        editor={richText}
        selectedButtonStyle={{backgroundColor: 'black'}}
        // unselectedButtonStyle={{color: 'red'}}
        selectedIconTint={true}
        iconTint={true}
      />
    </View>
  );
};

export default RichTextEditor;
