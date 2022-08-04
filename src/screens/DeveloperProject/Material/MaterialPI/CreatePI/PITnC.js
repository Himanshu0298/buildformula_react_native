import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Title} from 'react-native-paper';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RenderSelect from 'components/Atoms/RenderSelect';
import {Formik} from 'formik';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderInput from 'components/Atoms/RenderInput';
import RichTextEditor from 'components/Atoms/RichTextEditor';
import RenderTextBox from 'components/Atoms/RenderTextbox';

const PITnC = props => {
  const {navigation} = props;
  const options = ['A', 'B', 'C'];
  const onSubmit = () => {
    console.log('Create PR');
  };

  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <View style={styles.mainContainer}>
        <Title>Terms and Conditions</Title>
        <View style={{flexGrow: 1}}>
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{
              editTnC: '',
            }}
            onSubmit={onSubmit}>
            {({
              values,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => {
              return (
                <View style={{flexGrow: 1}}>
                  <View>
                    <RenderSelect
                      name="subCategory"
                      label="Select T&C"
                      options={options}
                      containerStyles={styles.inputStyles}
                      onBlur={handleBlur('subCategory')}
                      onSelect={() => {
                        console.log('Select Box');
                      }}
                    />
                    <RichTextEditor
                      name="remarks"
                      placeholder="Terms"
                      value={values.remarks}
                      height={200}
                      onChangeText={value => setFieldValue('remarks', value)}
                    />
                  </View>

                  <View style={styles.btnContainer}>
                    <ActionButtons
                      cancelLabel="Previous"
                      submitLabel="Save & Finsih"
                      onCancel={navigation.goBack}
                      onSubmit={() => navigation.navigate('PIPreview')}
                    />
                  </View>
                </View>
              );
            }}
          </Formik>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PITnC;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 5,
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputStyles: {
    marginVertical: 8,
  },
  btnContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});
