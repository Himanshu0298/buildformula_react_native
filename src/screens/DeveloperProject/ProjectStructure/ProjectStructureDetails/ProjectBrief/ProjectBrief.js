import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import {IconButton, Title} from 'react-native-paper';
import RenderSelectMultiple from 'components/Atoms/RenderSelectMultiple';
import RichTextEditor from 'components/Atoms/RichTextEditor';
import ActionButtons from 'components/Atoms/ActionButtons';

const options = [
  {title: 'A', value: 1},
  {title: 'b', value: 2},
  {title: 'C', value: 3},
  {title: 'D', value: 4},
  {title: 'E', value: 5},
  {title: 'F', value: 6},
  {title: 'G', value: 7},
];

function RenderForm(props) {
  const {formikProps, handleClose} = props;

  const {
    values,
    errors,

    setFieldValue,
    handleSubmit,
  } = formikProps;

  return (
    <View style={styles.formContainer}>
      <View style={styles.formSubContainer}>
        <RenderSelectMultiple
          name="configurtion"
          label="Configuration"
          options={options}
          value={values.configurtion}
          containerStyles={styles.inputStyles}
          error={errors.configurtion}
          onSelect={v => {
            setFieldValue('configurtion', v);
          }}
        />
        <RichTextEditor
          name="remark"
          placeholder="Remark"
          value={values.remark}
          height={200}
          onChangeText={value => {
            setFieldValue('remark', value);
          }}
        />
      </View>
      <ActionButtons
        cancelLabel="Cancel"
        submitLabel="Save"
        onCancel={handleClose}
        onSubmit={handleSubmit}
      />
    </View>
  );
}

function ProjectBrief(props) {
  const {navigation} = props;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerWrapper}>
        <IconButton
          icon="keyboard-backspace"
          size={18}
          color="#4872f4"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Title> Project Brief</Title>
      </View>
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
        onSubmit={() => console.log('===========> ')}>
        {formikProps => (
          <RenderForm formikProps={formikProps} {...props} options={options} />
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  mainContainer: {
    margin: 10,
    flex: 1,
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },
  inputStyles: {
    marginVertical: 8,
  },
  formContainer: {
    flexGrow: 1,
  },

  formSubContainer: {
    margin: 10,
    flexGrow: 1,
  },
});

export default ProjectBrief;
