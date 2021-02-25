import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {
  Subheading,
  withTheme,
  Text,
  Button,
  Headline,
  Divider,
  Caption,
  IconButton,
} from 'react-native-paper';
import {theme} from 'styles/theme';
import backArrow from 'assets/images/back_arrow.png';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useImagePicker from 'utils/useImagePicker';
import CustomCheckbox from 'components/Atoms/CustomCheckbox';
import dayjs from 'dayjs';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import Radio from 'components/Atoms/Radio';
import DetailsHeader from '../CustomerSection/Components/DetailsHeader';
import SignaturePanel from 'components/Atoms/SignaturePanel';
import {Table, Row, TableWrapper, Cell} from 'react-native-table-component';

const schema = Yup.object().shape({});

const TABLE_HEAD = ['Description', 'Quantity', 'Unit Price', 'Amount', 'Del'];
const TABLE_DATA = [
  [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    100,
    6,
    '₹600',
    1,
  ],
  ['Lorem', 100, 6, '₹600', 1],
];

function renderData(label, value) {
  return (
    <View style={styles.row}>
      <Text>{label}: </Text>
      <Text style={{color: theme.colors.primary}}>{value}</Text>
    </View>
  );
}

function RenderCustomerBox() {
  return (
    <View style={styles.customerContainer}>
      {renderData('Customer name', 'Apartment')}
      <View style={[styles.row, {paddingTop: 10}]}>
        {renderData('Mobile', 876455008)}
        {renderData('Unit', '1204')}
      </View>
      <Divider style={{marginVertical: 10, borderWidth: 0.2}} />
      <View style={[styles.row, {justifyContent: 'space-between'}]}>
        <Text style={{color: '#5E6D7C'}}>
          Date: {dayjs().format('DD-MM-YYYY')}
        </Text>
        <Text style={{color: '#5E6D7C'}}>
          Time: {dayjs().format('HH:mm A')}
        </Text>
      </View>
    </View>
  );
}

function RenderCustomerForm({params, navigation}) {
  const {t} = useTranslation();

  const {openFilePicker} = useImagePicker();

  const titleRef = React.useRef();
  const descriptionRef = React.useRef();

  return (
    <View style={styles.sectionContainer}>
      <Subheading style={styles.headline}>1. Modify Request</Subheading>
      <RenderCustomerBox />
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
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
            <RenderInput
              name="title"
              label={t('label_title')}
              ref={titleRef}
              containerStyles={styles.input}
              value={values.title}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              onSubmitEditing={() => descriptionRef?.current?.focus()}
              error={errors.title}
            />
            <RenderTextBox
              name="description"
              label={t('label_modification_description')}
              ref={descriptionRef}
              numberOfLines={5}
              minHeight={120}
              containerStyles={styles.input}
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              error={errors.description}
            />
            <TouchableOpacity
              style={styles.attachFilesBox}
              onPress={() =>
                openFilePicker({
                  type: 'file',
                  multiple: true,
                  onChoose: (v) => {
                    console.log('-----> v', v);
                  },
                })
              }>
              <Text>Click here to attach files</Text>
            </TouchableOpacity>

            <View style={styles.actionContainer}>
              <Button
                style={{width: '40%'}}
                contentStyle={{padding: 1}}
                theme={{roundness: 10}}
                onPress={navigation.goBack}>
                Cancel
              </Button>
              <Button
                style={{width: '40%'}}
                mode="contained"
                contentStyle={{padding: 1}}
                theme={{roundness: 10}}
                onPress={handleSubmit}>
                Save
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

function RenderClose(props) {
  const {index, handleRemove} = props;
  return (
    <View style={{flex: 0.5}}>
      <IconButton
        icon="close-circle"
        size={20}
        color={'#FF5D5D'}
        onPress={() => handleRemove(index)}
      />
    </View>
  );
}

function RenderEngineerReviewForm({params, navigation}) {
  const {t} = useTranslation();

  return (
    <View style={styles.sectionContainer}>
      <Headline style={styles.headline}>2. Review</Headline>
      <View style={[styles.row, {justifyContent: 'space-between'}]}>
        <Caption>Date: {dayjs().format('DD-MM-YYYY')}</Caption>
        <Caption>Time: {dayjs().format('HH:mm A')}</Caption>
      </View>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{type: 'free'}}
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
          <View>
            <View style={styles.radioRow}>
              <Text>Modification Type</Text>
              <View style={styles.radioContainer}>
                <Radio
                  label={'Free'}
                  value={'free'}
                  checked={values.type === 'free'}
                  onChange={(value) => setFieldValue('type', value)}
                />
                <Radio
                  label={'Paid'}
                  value={'paid'}
                  checked={values.type === 'paid'}
                  onChange={(value) => setFieldValue('type', value)}
                />
              </View>
            </View>
            <RenderTextBox
              name="description"
              label={t('label_review_description')}
              numberOfLines={5}
              minHeight={120}
              containerStyles={styles.input}
              value={values.review_description}
              onChangeText={handleChange('review_description')}
              onBlur={handleBlur('review_description')}
              error={errors.review_description}
            />
            <Table>
              <Row
                data={TABLE_HEAD}
                flexArr={[2.5, 1, 1, 1, 0.5]}
                style={styles.tableHead}
                textStyle={styles.tableHeadText}
              />
              {TABLE_DATA.map((rowData, index) => (
                <TableWrapper key={index} style={styles.tableRow}>
                  {rowData.map((cellData, cellIndex) => (
                    <Cell
                      key={cellIndex}
                      flex={[2.5, 1, 1, 1, 0.5][cellIndex]}
                      textStyle={styles.tableText}
                      style={[
                        styles.tableCell,
                        cellIndex && {
                          alignItems: 'center',
                        },
                      ]}
                      data={
                        cellIndex === 4 ? (
                          <RenderClose
                            index={index}
                            handleRemove={() => {
                              console.log('----->handleRemove ');
                            }}
                          />
                        ) : (
                          cellData
                        )
                      }
                    />
                  ))}
                </TableWrapper>
              ))}
            </Table>

            <View style={styles.actionContainer}>
              <Button
                style={{width: '40%'}}
                contentStyle={{padding: 1}}
                theme={{roundness: 10}}
                onPress={navigation.goBack}>
                Cancel
              </Button>
              <Button
                style={{width: '40%'}}
                mode="contained"
                contentStyle={{padding: 1}}
                theme={{roundness: 10}}
                onPress={handleSubmit}>
                Save
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

function RenderApprovalForm({params, navigation}) {
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

function AddModifyRequest(props) {
  const {navigation, route} = props;
  const {params} = route;
  const {unit, project_id} = params;
  const {t} = useTranslation();

  console.log('----->unit.unitId ', unit.unitId);

  const USER_TYPE = 1;

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        stickyHeaderIndices={[0]}>
        <View>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={styles.titleContainer}>
            <Image source={backArrow} style={styles.backArrow} />
            <Subheading>{t('title_customer_section')}</Subheading>
          </TouchableOpacity>
        </View>
        <DetailsHeader {...route?.params} />
        <Divider style={styles.divider} />

        {USER_TYPE === 1 ? (
          <RenderCustomerForm {...props} {...{params}} />
        ) : null}
        {USER_TYPE === 2 ? (
          <RenderEngineerReviewForm {...props} {...{params}} />
        ) : null}
        {USER_TYPE === 3 ? (
          <RenderApprovalForm {...props} {...{params}} />
        ) : null}
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  backArrow: {
    height: 25,
    width: 25,
    marginRight: 5,
  },
  sectionContainer: {},
  headline: {
    fontSize: 18,
    color: theme.colors.primary,
  },
  divider: {
    marginTop: 8,
    marginBottom: 15,
    borderWidth: 0.2,
    borderColor: 'rgba(139, 149, 159, 0.25)',
  },
  customerContainer: {
    borderRadius: 5,
    backgroundColor: '#F2F4F5',
    padding: 10,
    marginTop: 10,
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
  attachFilesBox: {
    borderWidth: 2,
    borderColor: 'rgba(4, 29, 54, 0.1)',
    borderStyle: 'dashed',
    marginVertical: 7,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1,
  },
  actionContainer: {
    marginTop: 25,
    paddingHorizontal: 10,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  radioRow: {
    marginTop: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    display: 'flex',
    marginTop: 5,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHead: {
    height: 40,
  },
  tableHeadText: {
    marginHorizontal: 3,
    textAlign: 'center',
  },
  tableCell: {
    marginHorizontal: 3,
    justifyContent: 'center',
    marginVertical: 5,
  },
  tableText: {
    fontSize: 13,
    color: '#5E6D7C',
  },
});

export default withTheme(AddModifyRequest);
