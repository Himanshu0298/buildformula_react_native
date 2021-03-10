import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Button, Headline, Caption} from 'react-native-paper';
import {theme} from 'styles/theme';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomCheckbox from 'components/Atoms/CustomCheckbox';
import dayjs from 'dayjs';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import SignaturePanel from 'components/Atoms/SignaturePanel';

const schema = Yup.object().shape({});

function ManagerSection(props) {
  const {params, navigation} = props;

  const {t} = useTranslation();

  const [showPanel, setShowPanel] = React.useState(false);

  const toggleSignature = () => setShowPanel((v) => !v);

  return (
    <>
      <View style={styles.sectionContainer}>
        <Headline style={styles.headline}>3. Approval</Headline>
        <View
          style={[
            styles.row,
            {justifyContent: 'space-between', marginBottom: 5},
          ]}>
          <Caption>Date: {dayjs().format('DD-MM-YYYY')}</Caption>
          <Caption>Time: {dayjs().format('HH:mm A')}</Caption>
        </View>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{accepted: false}}
          validationSchema={schema}
          onSubmit={async (values) => {}}>
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <View style={styles.formContainer}>
              <SignaturePanel
                visible={showPanel}
                toggleDialog={toggleSignature}
                onSave={(v) => {
                  console.log('----->onSave ');
                }}
              />

              <RenderTextBox
                name="comments"
                label={t('label_comments_for_staff')}
                numberOfLines={5}
                minHeight={120}
                containerStyles={styles.input}
                value={values.comments}
                onChangeText={handleChange('comments')}
                onBlur={handleBlur('comments')}
                error={errors.comments}
              />
              <Button mode="outlined" onPress={toggleSignature}>
                Signature
              </Button>
              <View style={styles.input}>
                <CustomCheckbox
                  label="I confirm this change order by my signature and approve to GEH to make  modifications at that particular stage"
                  checked={values.accepted}
                  onChange={() => {
                    setFieldValue('accepted', !values.accepted);
                  }}
                />
              </View>

              <View style={styles.actionContainer}>
                <Button
                  style={{width: '40%'}}
                  contentStyle={{padding: 1}}
                  theme={{roundness: 10}}
                  onPress={navigation.goBack}>
                  Decline
                </Button>
                <Button
                  style={{width: '40%'}}
                  mode="contained"
                  contentStyle={{padding: 1}}
                  theme={{roundness: 10}}
                  onPress={handleSubmit}>
                  Approve
                </Button>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {},
  headline: {
    fontSize: 18,
    color: theme.colors.primary,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  formContainer: {},
  input: {
    paddingVertical: 7,
  },
  actionContainer: {
    marginTop: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default ManagerSection;
