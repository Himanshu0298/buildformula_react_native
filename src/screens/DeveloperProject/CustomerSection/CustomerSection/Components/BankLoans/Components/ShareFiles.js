import * as React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  Button,
  Caption,
  Divider,
  IconButton,
  Subheading,
  Text,
} from 'react-native-paper';
import {theme} from 'styles/theme';
import Modal from 'react-native-modal';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';

const LIST = [
  {
    phone: '6546980008',
    email: 'rohan@gmail.com',
  },
  {
    name: 'Rohan Sharma',
    email: 'rohan@gmail.com',
  },
  {
    name: 'Rohan Sharma',
    phone: '6546980008',
    email: 'rohan@gmail.com',
  },
  {
    name: 'Rohan Sharma',
    phone: '6546980008',
    email: 'rohan@gmail.com',
  },
  {
    name: 'Rohan Sharma',
    phone: '6546980008',
    email: 'rohan@gmail.com',
  },
  {
    name: 'Rohan Sharma',
    phone: '6546980008',
    email: 'rohan@gmail.com',
  },
  {
    name: 'Rohan Sharma',
    phone: '6546980008',
    email: 'rohan@gmail.com',
  },
  {
    name: 'Rohan Sharma',
    phone: '6546980008',
    email: 'rohan@gmail.com',
  },
  {
    name: 'Rohan Sharma',
    phone: '6546980008',
    email: 'rohan@gmail.com',
  },
  {
    name: 'Rohan Sharma',
    phone: '6546980008',
    email: 'rohan@gmail.com',
  },
];

const schema = Yup.object().shape({
  email: Yup.string().trim().email().required('Required'),
});

function RenderUser({item}) {
  const {name, phone, email} = item;
  return (
    <View style={styles.userContainer}>
      <View style={styles.row}>
        <Text>{name || 'Not Available'}</Text>
        <IconButton icon="delete" color={theme.colors.red} size={16} />
      </View>
      <View style={styles.row}>
        <Caption>{phone ? `+91 ${phone}` : 'NA'}</Caption>
        <Caption>{email || 'NA'}</Caption>
      </View>
    </View>
  );
}

function RenderUserListing({toggleAddForm}) {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.row}>
        <Caption style={{fontSize: 16}}>Shared with {LIST.length}</Caption>
        <Button
          icon="account-plus"
          mode="contained"
          contentStyle={{paddingHorizontal: 10}}
          theme={{roundness: 15}}
          onPress={toggleAddForm}>
          Add
        </Button>
      </View>
      <View>
        <FlatList
          data={LIST}
          extraData={LIST}
          showsVerticalScrollIndicator={false}
          style={{marginBottom: 30}}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({item, index}) => <RenderUser item={item} />}
          ItemSeparatorComponent={() => <Divider />}
        />
      </View>
    </View>
  );
}

function RenderAddForm({toggleAddForm}) {
  const {t} = useTranslation();
  return (
    <View style={styles.contentContainer}>
      <Caption style={{fontSize: 16}}>Add new bank person</Caption>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
        enableReinitialize
        validationSchema={schema}
        onSubmit={async values => {}}>
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        }) => (
          <>
            <View style={styles.inputContainer}>
              <RenderInput
                name="email"
                label={t('label_person_email')}
                containerStyles={styles.input}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                onSubmitEditing={handleSubmit}
                error={errors.email}
              />
            </View>
            <View style={styles.actionContainer}>
              <Button
                style={{width: '40%'}}
                contentStyle={{padding: 1}}
                theme={{roundness: 15}}
                onPress={toggleAddForm}>
                {'Cancel'}
              </Button>
              <Button
                style={{width: '40%'}}
                mode="contained"
                contentStyle={{padding: 1}}
                theme={{roundness: 15}}
                onPress={handleSubmit}>
                Add
              </Button>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

function ShareFiles(props) {
  const {open} = props;
  const [showAdd, setShowAdd] = React.useState(false);

  const toggleAddForm = () => setShowAdd(v => !v);

  const handleClose = () => {
    if (showAdd) {
      toggleAddForm();
    } else {
      props.handleClose();
    }
  };

  return (
    <Modal
      isVisible={open}
      backdropOpacity={0.4}
      onBackButtonPress={handleClose}
      onBackdropPress={handleClose}
      style={{justifyContent: 'flex-end', margin: 0}}>
      <View style={styles.sheetContainer}>
        <View style={styles.closeContainer}>
          <IconButton
            icon="close-circle"
            size={25}
            onPress={handleClose}
            color="grey"
          />
        </View>
        <Subheading
          style={{
            color: theme.colors.primary,
            marginBottom: 10,
          }}>
          Share with bank person
        </Subheading>
        {!showAdd ? (
          <RenderUserListing {...{toggleAddForm}} />
        ) : (
          <RenderAddForm {...{toggleAddForm}} />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 15,
    paddingBottom: 20,
    flex: 0.9,
  },
  closeContainer: {
    alignItems: 'flex-end',
  },
  contentContainer: {
    marginTop: 10,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userContainer: {
    paddingVertical: 10,
  },
  inputContainer: {
    marginVertical: 10,
  },
  actionContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default ShareFiles;
