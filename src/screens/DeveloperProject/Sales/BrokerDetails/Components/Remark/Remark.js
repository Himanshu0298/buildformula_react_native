import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {withTheme, Text, Button} from 'react-native-paper';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import {theme} from 'styles/theme';
import RichTextEditor from 'components/Atoms/RichTextEditor';
import * as Yup from 'yup';
import {Formik} from 'formik';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSalesLoading} from 'redux/selectors';

const schema = Yup.object().shape({
  remark: Yup.string('Invalid').required('Required'),
});

function Remark(props) {
  const {navigation, route} = props;
  const {remark, userData} = route?.params || {};

  const {getBrokerDetails} = useSalesActions();

  const {brokerDetails} = useSelector(s => s.sales);

  const {selectedProject} = useSelector(s => s.project);
  const loading = useSalesLoading();

  const {updateBrokerRemark} = useSalesActions();

  const projectId = selectedProject.id;

  const {dealClosedInfo} = brokerDetails;

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, userData.id]);

  const loadData = async () => {
    await getBrokerDetails({project_id: projectId, broker_id: userData.id});
  };

  const bookingId = useMemo(() => {
    return dealClosedInfo?.find(i => i.id === bookingId);
  }, [dealClosedInfo]);

  const projectBookingId = bookingId?.booking_id;

  const onSubmit = values => {
    updateBrokerRemark({
      project_id: projectId,
      project_bookings_id: projectBookingId,
      broker_remark: values.remark,
    });
    loadData();
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Spinner visible={loading} textContent="" />

      <Text style={styles.remarkText}>Remark</Text>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{remark}}
        validationSchema={schema}
        onSubmit={onSubmit}>
        {({values, setFieldValue, handleSubmit}) => {
          return (
            <View style={styles.dialogContentContainer}>
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
                  style={styles.button}
                  contentStyle={styles.contentStyle}
                  theme={{roundness: 15}}
                  onPress={navigation.goBack}>
                  Back
                </Button>
                <Button
                  style={styles.button}
                  mode="contained"
                  contentStyle={styles.contentStyle}
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
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  contentStyle: {
    padding: 3,
  },
  remarkText: {
    color: theme.colors.primary,
    margin: 5,
    fontSize: 18,
  },
  container: {
    padding: 20,
    marginTop: 10,
  },
});

export default withTheme(Remark);
