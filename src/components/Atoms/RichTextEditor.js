import {Formik} from 'formik';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {withTheme} from 'react-native-paper';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import * as Yup from 'yup';
import CustomDialog from './CustomDialog';
import RenderTextBox from './RenderTextbox';

const schema = Yup.object().shape({
  title: Yup.string('Required').required('Required'),
  url: Yup.string('Required').required('Required'),
});

function InsertLinkDialog(props) {
  const {handleSubmit} = props;

  const onSubmit = values => handleSubmit(values.title, values.url);

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{}}
      validationSchema={schema}
      onSubmit={onSubmit}>
      {({values, errors, handleChange, handleBlur}) => (
        <CustomDialog {...props} title="Insert Link" submitForm={handleSubmit}>
          <KeyboardAwareScrollView>
            <View style={styles.dialogContent}>
              <RenderTextBox
                name="title"
                label="Text"
                numberOfLines={3}
                containerStyles={styles.input}
                value={values.title}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                error={errors.title}
              />
              <RenderTextBox
                name="url"
                label="URL"
                numberOfLines={3}
                containerStyles={styles.input}
                value={values.url}
                onChangeText={handleChange('url')}
                onBlur={handleBlur('url')}
                error={errors.url}
              />
            </View>
          </KeyboardAwareScrollView>
        </CustomDialog>
      )}
    </Formik>
  );
}

function RichTextEditor(props) {
  const {theme, height, style, placeholder, value, onChangeText} = props;

  const richText = React.useRef();

  const [dialog, setDialog] = useState(false);

  const toggleModal = () => setDialog(v => !v);

  return (
    <View style={[styles.container, style, {height}]}>
      {dialog ? (
        <InsertLinkDialog
          open={dialog}
          handleClose={toggleModal}
          handleSubmit={(title, url) => {
            richText.current?.insertLink(title, url);
            toggleModal();
          }}
        />
      ) : null}
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
        selectedIconTint={theme.colors.white}
        onInsertLink={toggleModal}
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
  dialogContent: {
    paddingHorizontal: 15,
  },
  input: {
    marginVertical: 7,
  },
});

export default withTheme(RichTextEditor);
