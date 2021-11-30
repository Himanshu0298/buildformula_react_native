import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {withTheme, Text, Button} from 'react-native-paper';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import {theme} from 'styles/theme';
import RichTextEditor from 'components/Atoms/RichTextEditor';
import RenderInput from 'components/Atoms/RenderInput';
import * as Yup from 'yup';
import {Formik} from 'formik';

const schema = Yup.object().shape({
  remark: Yup.string('Invalid').required('Required'),
});

function Remark(props) {
  const {navigation, route} = props;
  const {remark} = route?.params || {};

  const isHtml = remark?.includes('<') && remark?.includes('>');

  console.log('----->remark', remark);

  const {selectedProject} = useSelector(s => s.project);
  const {deleteBroker} = useSalesActions();

  const projectId = selectedProject.id;

  const onSubmit = values => {
    console.log('----->values', values);
  };

  const richText = React.createRef();
  // || useRef();

  return (
    <ScrollView style={{padding: 20}}>
      <Text style={{color: theme.colors.primary}}>Remark</Text>
      {/* <RichToolbar editor={richText} /> */}
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{remark: remark}}
        validationSchema={schema}
        onSubmit={onSubmit}>
        {({
          values,
          errors,
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          return (
            <View style={styles.dialogContentContainer}>
              {console.log('----->errors', errors)}
              {/* <RenderInput
                name="remark"
                multiline
                numberOfLines={8}
                label="Remark"
                value={values.remark}
                onChangeText={handleChange('remark')}
                onBlur={handleBlur('remark')}
                onSubmitEditing={handleSubmit}
                returnKeyType="done"
                error={errors.remark}
              /> */}

              <RichTextEditor
                name="remark"
                placeholder="Remark"
                value={values.remark}
                onChangeText={value => {
                  setFieldValue('remark', value);
                }}
              />

              <View style={styles.actionContainer}>
                <Button
                  style={{flex: 1, marginHorizontal: 5}}
                  contentStyle={{padding: 3}}
                  theme={{roundness: 15}}
                  onPress={navigation.goBack}>
                  Back
                </Button>
                <Button
                  style={{flex: 1, marginHorizontal: 5}}
                  mode="contained"
                  contentStyle={{padding: 3}}
                  theme={{roundness: 15}}
                  onPress={handleSubmit}>
                  Save
                </Button>
              </View>
            </View>
          );
        }}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  //   dialogActionContainer: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     marginTop: 20,
  //   },
});

export default withTheme(Remark);
