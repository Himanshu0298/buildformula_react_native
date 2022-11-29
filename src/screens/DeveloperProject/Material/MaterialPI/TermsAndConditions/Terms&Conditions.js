import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

import {Subheading, withTheme} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import RenderSelect from 'components/Atoms/RenderSelect';
import {Formik} from 'formik';
import ActionButtons from 'components/Atoms/ActionButtons';
import RichTextEditor from 'components/Atoms/RichTextEditor';

const options = ['A', 'B', 'C'];

function TermsAndConditions(props) {
  const {navigation, value} = props;

  const [status, setStatus] = useState();
  const [text, setText] = useState(value);

  const onSubmit = () => {
    console.log('Create PI');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.subContainer}>
          <Subheading> Terms and Conditions</Subheading>
        </View>
        <View style={styles.statusContainer}>
          {status == null ? (
            <View style={styles.status}>
              <OpacityButton
                color="#4872f4"
                opacity={0.18}
                onPress={() => {
                  navigation.navigate('CreatePI');
                }}
                style={styles.button}>
                <MaterialIcons name="edit" color="#4872f4" size={13} />
              </OpacityButton>
            </View>
          ) : null}
        </View>
      </View>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={onSubmit}>
        {({handleBlur}) => {
          return (
            <View style={styles.inputContainer}>
              <RenderSelect
                name="select"
                label="T - 1"
                options={options}
                containerStyles={styles.inputStyles}
                onBlur={handleBlur('select')}
                onSelect={() => {
                  console.log('Select Box');
                }}
              />
              <RichTextEditor
                style={styles.textEditor}
                height={200}
                placeholder="Input Test here..."
                value={text}
                onChangeText={setText}
              />
            </View>
          );
        }}
      </Formik>

      <View>
        <ActionButtons
          cancelLabel="Previous"
          submitLabel="SAVE&FINISH"
          onCancel={navigation.goBack}
          onSubmit={() => navigation.navigate('PIPreview')}
        />
      </View>
    </View>
  );
}

export default withTheme(TermsAndConditions);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 10,
  },
  status: {
    marginRight: 15,
  },
  statusContainer: {
    flexDirection: 'row',
    marginEnd: 10,
    alignSelf: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textEditor: {
    flexGrow: 1,
    marginVertical: 10,
  },
  button: {
    borderRadius: 20,
  },
  inputContainer: {
    marginVertical: 15,
  },
});
