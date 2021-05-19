import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {
  Text,
  Button,
  Headline,
  Caption,
  IconButton,
  Portal,
  Dialog,
  Subheading,
} from 'react-native-paper';
import {theme} from 'styles/theme';
import {Formik} from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import Radio from 'components/Atoms/Radio';
import {Table, Row, TableWrapper, Cell} from 'react-native-table-component';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import RenderInput from 'components/Atoms/RenderInput';

const addSchema = Yup.object().shape({
  description: Yup.string().required('Required'),
  quantity: Yup.number().required('Required'),
  unit_price: Yup.string().required('Required'),
  amount: Yup.string().required('Required'),
});

const schema = Yup.object().shape({});

const TABLE_HEAD = ['Description', 'Quantity', 'Unit Price', 'Amount', 'Del'];

function parseRowData(rows = []) {
  return rows.map(({description, unit_price, amount, quantity}) => {
    return [description, quantity, unit_price, amount, 1];
  });
}

function RenderClose(props) {
  const {index, handleRemove} = props;
  return (
    <IconButton
      icon="close-circle"
      size={20}
      color={'#FF5D5D'}
      onPress={() => handleRemove(index)}
    />
  );
}

function AddModificationDialog(props) {
  const {open, toggleDialog, onSubmit} = props;

  const {t} = useTranslation();

  return (
    <Portal>
      <Dialog visible={open} onDismiss={toggleDialog} style={{top: -100}}>
        <Dialog.Content>
          <Subheading>Add Modification</Subheading>
          <View style={styles.addContainer}>
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={{type: 'free'}}
              validationSchema={addSchema}
              onSubmit={async values => onSubmit(values)}>
              {({
                values,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
              }) => (
                <>
                  <RenderTextBox
                    name="description"
                    label={t('label_description')}
                    numberOfLines={3}
                    minHeight={40}
                    containerStyles={styles.input}
                    value={values.description}
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    error={errors.description}
                  />
                  <View style={{flexDirection: 'row'}}>
                    <RenderInput
                      name="quantity"
                      label={t('label_quantity')}
                      keyboardType="number-pad"
                      containerStyles={[
                        styles.input,
                        {flex: 1, marginRight: 5},
                      ]}
                      value={values.quantity}
                      onChangeText={handleChange('quantity')}
                      onBlur={handleBlur('quantity')}
                      error={errors.quantity}
                    />
                    <RenderInput
                      keyboardType="number-pad"
                      name="unit_price"
                      label={t('label_unit_price')}
                      containerStyles={[
                        styles.input,
                        {flex: 1, marginHorizontal: 5},
                      ]}
                      value={values.unit_price}
                      onChangeText={handleChange('unit_price')}
                      onBlur={handleBlur('unit_price')}
                      error={errors.unit_price}
                    />
                    <RenderInput
                      keyboardType="number-pad"
                      name="amount"
                      label={t('label_amount')}
                      containerStyles={[styles.input, {flex: 1, marginLeft: 5}]}
                      value={values.amount}
                      onChangeText={handleChange('amount')}
                      onBlur={handleBlur('amount')}
                      error={errors.amount}
                    />
                  </View>
                  <View style={styles.actionContainer}>
                    <Button
                      style={{width: '40%'}}
                      contentStyle={{padding: 1}}
                      theme={{roundness: 10}}
                      onPress={toggleDialog}>
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
                </>
              )}
            </Formik>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}

function ReviewForm(props) {
  const {navigation} = props;

  const {t} = useTranslation();

  const [addDialog, setAddDialog] = React.useState(false);

  const toggleAddDialog = () => setAddDialog(v => !v);

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{type: 'free'}}
      validationSchema={schema}
      onSubmit={async values => {}}>
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <View>
          <AddModificationDialog
            open={addDialog}
            toggleDialog={toggleAddDialog}
            onSubmit={v => {
              const {modifications = []} = values;
              modifications.push(v);
              setFieldValue('modifications', modifications);
              toggleAddDialog();
            }}
          />
          <View style={styles.radioRow}>
            <Text>Modification Type</Text>
            <View style={styles.radioContainer}>
              <Radio
                label={'Free'}
                value={'free'}
                checked={values.type === 'free'}
                onChange={value => setFieldValue('type', value)}
              />
              <Radio
                label={'Paid'}
                value={'paid'}
                checked={values.type === 'paid'}
                onChange={value => setFieldValue('type', value)}
              />
            </View>
          </View>
          <RenderTextBox
            name="review_description"
            label={t('label_review_description')}
            numberOfLines={5}
            minHeight={120}
            containerStyles={styles.input}
            value={values.review_description}
            onChangeText={handleChange('review_description')}
            onBlur={handleBlur('review_description')}
            error={errors.review_description}
          />
          {values.type === 'free' ? (
            <RenderTextBox
              name="modification_changes"
              label={t('label_modification_changes')}
              numberOfLines={5}
              minHeight={120}
              containerStyles={styles.input}
              value={values.modification_changes}
              onChangeText={handleChange('modification_changes')}
              onBlur={handleBlur('modification_changes')}
              error={errors.modification_changes}
            />
          ) : (
            <>
              <View style={styles.tableContainer}>
                <Table>
                  <Row
                    data={TABLE_HEAD}
                    flexArr={[2.5, 1, 1, 1, 0.5]}
                    style={styles.tableHead}
                    textStyle={styles.tableHeadText}
                  />
                  {parseRowData(values.modifications).map((rowData, index) => (
                    <TableWrapper key={index} style={styles.tableRow}>
                      {rowData.map((cellData, cellIndex) => (
                        <Cell
                          key={cellIndex}
                          height={30}
                          flex={[2.5, 1, 1, 1, 0.5][cellIndex]}
                          textStyle={styles.tableText}
                          style={[
                            styles.tableCell,
                            cellIndex && {
                              marginLeft: 3,
                              alignItems: 'center',
                            },
                          ]}
                          data={
                            cellIndex === 4 ? (
                              <RenderClose
                                index={index}
                                handleRemove={removeIndex => {
                                  const {modifications} = values;
                                  modifications.splice(removeIndex, 1);
                                  setFieldValue('modifications', modifications);
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
              </View>

              <View style={styles.addButtonContainer}>
                <OpacityButton
                  color={'#4872F4'}
                  opacity={0.18}
                  style={styles.addButton}
                  onPress={toggleAddDialog}>
                  <Text style={{color: theme.colors.primary}}>Add</Text>
                </OpacityButton>
              </View>

              <View style={[styles.addButtonContainer, {marginTop: 10}]}>
                <Text style={{marginRight: 40}}>Total</Text>
                <Text>Rs. 50,0000</Text>
              </View>
            </>
          )}

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
  );
}

function ReviewDetails(props) {
  return <View />;
}

function EngineerSection(props) {
  const {submitted} = props;

  return (
    <View style={styles.sectionContainer}>
      <Headline style={styles.headline}>2. Review</Headline>
      <View style={[styles.row, {justifyContent: 'space-between'}]}>
        <Caption>Date: {dayjs().format('DD-MM-YYYY')}</Caption>
        <Caption>Time: {dayjs().format('HH:mm A')}</Caption>
      </View>
      {submitted ? <ReviewDetails {...props} /> : <ReviewForm {...props} />}
    </View>
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
  input: {
    paddingVertical: 7,
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
    marginVertical: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    display: 'flex',
    marginTop: 5,
  },
  tableContainer: {
    marginTop: 10,
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
    justifyContent: 'center',
  },
  tableText: {
    fontSize: 13,
    color: '#5E6D7C',
  },
  addButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  addButton: {
    paddingHorizontal: 50,
    paddingVertical: 7,
  },
  addContainer: {
    // flexGrow: 1,
  },
});

export default EngineerSection;
