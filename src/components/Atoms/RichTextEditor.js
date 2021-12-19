import React from 'react';
import {View, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {withTheme} from 'react-native-paper';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

function RichTextEditor(props) {
  const {theme, height, style, placeholder, value, onChangeText} = props;

  const richText = React.useRef();

  return (
    <View style={[styles.container, style, {height}]}>
      <KeyboardAwareScrollView>
        <RichEditor
          ref={richText}
          useContainer
          placeholder={placeholder}
          initialContentHTML={value}
          containerStyle={styles.editorContainer}
          onChange={onChangeText}
        />
      </KeyboardAwareScrollView>
      <RichToolbar
        editor={richText}
        style={styles.toolbar}
        selectedButtonStyle={{backgroundColor: theme.colors.primary}}
        selectedIconTint="#fff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
  },
  editorContainer: {
    minHeight: 150,
    borderRadius: 10,
  },
  toolbar: {
    borderRadius: 10,
  },
});

export default withTheme(RichTextEditor);
