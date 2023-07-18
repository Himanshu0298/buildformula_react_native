import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  View, // eslint-disable-next-line react-native/split-platform-components
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {
  Caption,
  Divider,
  Headline,
  Subheading,
  Switch,
  Text,
  withTheme,
} from 'react-native-paper';
import dayjs from 'dayjs';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAlert} from 'components/Atoms/Alert';
import useCustomerActions from 'redux/actions/customerActions';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
import {theme} from 'styles/theme';
import {useDownload} from 'components/Atoms/Download';
import ScreenTitle from 'components/Atoms/ScreenTitle';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {BASE_API_URL} from 'utils/constant';
import {config} from 'services/init';
import {useSnackbar} from 'components/Atoms/Snackbar';
import Modal from 'react-native-modal';
import ActionButtons from 'components/Atoms/ActionButtons';

const TITLE = {
  document: 'Documentation charges',
  property: 'Property Final Amount',
  gst: 'GST Amount',
};

function Item({label, value}) {
  return (
    <View style={styles.listItemContainer}>
      <Text>{label}</Text>
      <Caption>{value}</Caption>
    </View>
  );
}

const RenderCharge = React.memo(props => {
  const {charge, payment_mode, type, navToEdit, handleDelete} = props;

  const {
    id,
    bank_name,
    branch_name,
    transaction_number,
    transaction_date,
    transaction_type,
    amount,
    unit_id,
    project_id,
    remark,
  } = charge;

  const download = useDownload();

  const handleDownload = async () => {
    const data = {
      project_id,
      unit_id,
      customer_payment_collections_id: id,
    };

    const link = `${BASE_API_URL}cs_account_property_final_amount_single`;
    const name = `vshwan_document_${new Date().getTime()}.pdf`;

    download.link({name, data, link, showAction: true});
  };

  return (
    <View style={styles.chargeContainer}>
      <Item
        label="Date"
        value={dayjs(transaction_date).format('DD MMM YYYY')}
      />
      <Item label="Payment Mode" value={payment_mode} />

      {type !== 'document' ? (
        <>
          <Item
            label="Bank name &  branch"
            value={`${bank_name}, ${branch_name}`}
          />
          <Item
            label="Check no. /  Transection no."
            value={transaction_number}
          />
        </>
      ) : null}
      <View style={styles.itemRow}>
        <Item
          label="Credit"
          value={
            transaction_type === 'credit' ? `₹ ${parseFloat(amount)}` : '-'
          }
        />
        <Item
          label="Debit"
          value={transaction_type === 'debit' ? `₹ ${parseFloat(amount)}` : '-'}
        />
        <Item label="Balance" value={`₹ ${parseFloat(amount)}`} />
      </View>
      <Item label="Remark" value={remark} />
      <View style={styles.actionContainer}>
        {/* TODO: enable this */}
        {type !== 'document' && false ? (
          <OpacityButton
            opacity={0.08}
            color={theme.colors.primary}
            style={styles.rightContent}
            onPress={handleDownload}>
            <MaterialCommunityIcons
              name="download"
              size={18}
              color={theme.colors.primary}
            />
          </OpacityButton>
        ) : null}
        <OpacityButton
          opacity={0.1}
          color={theme.colors.primary}
          style={styles.rightContent}
          onPress={() => navToEdit(charge)}>
          <MaterialIcon name="edit" color={theme.colors.primary} size={18} />
        </OpacityButton>
        <OpacityButton
          opacity={0.1}
          color={theme.colors.red}
          style={styles.deleteButton}
          onPress={() => handleDelete(charge)}>
          <MaterialIcon name="delete" color={theme.colors.red} size={18} />
        </OpacityButton>
      </View>
    </View>
  );
});

function PaymentCollections(props) {
  const {navigation, route} = props;
  const {type, project_id, unit} = route?.params || {};
  const unitid = unit?.id;

  const alert = useAlert();
  const {deleteCollection, getAccountDetails} = useCustomerActions();

  const {loading, accountDetails} = useSelector(s => s.customer);
  const {paymentCollection = {}} = accountDetails;

  const [Visible, setVisible] = React.useState(false);
  const [docCharges, setDocCharges] = React.useState(false);
  const [finalAmount, setFinalAmount] = React.useState(false);
  const [validationMsg, setValidationMsg] = React.useState();

  const charges = React.useMemo(() => {
    const {documentcharges, propertyfinalamount, gst} = paymentCollection;

    switch (type) {
      case 'document':
        return documentcharges || [];
      case 'property':
        return propertyfinalamount || [];
      case 'gst':
        return gst || [];
      default:
        return [];
    }
  }, [paymentCollection, type]);

  const amountCollected = React.useMemo(() => {
    return charges.reduce((sum, i) => sum + parseFloat(i.amount), 0);
  }, [charges]);

  const navToEdit = collection => {
    navigation.navigate('AddCollection', {...route.params, collection});
  };
  const navToAddCollection = () =>
    navigation.navigate('AddCollection', {...route.params});

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleDelete = ({project_id, id, unit_id}) => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete this collection?',
      confirmText: 'Yes',
      onConfirm: async () => {
        await deleteCollection({project_id, collection_id: id});
        getAccountDetails({project_id, unit_id});
      },
    });
  };

  const snackbar = useSnackbar();

  const downloadPermissions = async () => {
    if (Platform.OS === 'ios') {
      actualDownload();
    } else if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          actualDownload();
        } else {
          snackbar.showMessage({
            message: 'You need to give storage permission to download the file',
            variant: 'error',
          });
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      snackbar.showMessage({
        message: 'File is already downloaded.',
        variant: 'warning',
      });
    }
  };
  const actualDownload = async () => {
    const {dirs} = ReactNativeBlobUtil.fs;
    console.log(dirs.DocumentDir);
    const data = {
      project_id,
      unitid,
      print_document_charge: (await docCharges)
        ? JSON.stringify(docCharges)
        : '',
      print_property_final: (await finalAmount)
        ? JSON.stringify(finalAmount)
        : '',
    };

    const dirToSave =
      Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    const configfb = {
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: `CS_Account-${unit?.project_tower}-${unit?.project_floor}-${unit?.project_unit}`,
      path: `${dirToSave}/CS_Account-${unit?.project_tower}-${unit?.project_floor}-${unit?.project_unit}.pdf`,
    };
    const configOptions = Platform.select({
      ios: {
        title: configfb.title,
        path: configfb.path,
        appendExt: 'pdf',
      },
      android: configfb,
    });

    ReactNativeBlobUtil.config(configOptions)
      .fetch(
        'POST',
        `${BASE_API_URL}customers/print/account`,
        config({multipart: false}).headers,
        JSON.stringify(data),
      )
      .then(res => {
        if (Platform.OS === 'ios') {
          ReactNativeBlobUtil.ios.previewDocument(configfb.path);
        }
        if (Platform.OS === 'android') {
          ReactNativeBlobUtil.android.actionViewIntent(configfb.path);
        }
      })
      .catch(e => {
        console.log('The file saved to ERROR', e.message);
      });
  };

  const onToggleDocCharges = () => {
    setDocCharges(!docCharges);
    setValidationMsg('');
  };
  const onToggleFinalAmount = () => {
    setFinalAmount(!finalAmount);
    setValidationMsg('');
  };

  const handleDownload = async () => {
    if (docCharges || finalAmount) {
      await downloadPermissions();
      setVisible(false);
    } else {
      setValidationMsg('Please select atleast one option to proceed');
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <Modal isVisible={Visible}>
        <View style={styles.printModal}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
            }}>
            <Subheading>Select Print Option</Subheading>
            <OpacityButton
              opacity={0.1}
              color={theme.colors.red}
              style={styles.deleteButton}
              onPress={() => setVisible(!Visible)}>
              <MaterialIcon name="cancel" color={theme.colors.red} size={18} />
            </OpacityButton>
          </View>
          <Divider />
          <Text style={styles.printError}>{validationMsg}</Text>
          <View style={styles.extraDetailsRow}>
            <Subheading>Documentation charges</Subheading>
            <Switch
              value={Boolean(docCharges)}
              onValueChange={onToggleDocCharges}
              color="#07CA03"
            />
          </View>
          <View style={styles.extraDetailsRow}>
            <Subheading>Final Amount</Subheading>
            <Switch
              value={Boolean(finalAmount)}
              onValueChange={onToggleFinalAmount}
              color="#07CA03"
            />
          </View>
          <Divider />
          <ActionButtons
            cancelLabel="Cancel"
            submitLabel="Print"
            onCancel={() => setVisible(false)}
            onSubmit={() => handleDownload()}
          />
        </View>
      </Modal>
      <Spinner visible={loading} textContent="" />
      <View style={styles.container}>
        <View style={styles.actionButton}>
          <ScreenTitle title="Payment Collection" backIcon />
          <View style={styles.actionRow}>
            <OpacityButton opacity={0.2} onPress={navToAddCollection}>
              {/* <Text style={[{color: theme.colors.primary,styles.buttonLabel }]}> */}
              <Text style={[{color: theme.colors.primary}, styles.buttonLabel]}>
                Add collection
              </Text>
            </OpacityButton>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={{color: theme.colors.documentation}}>{TITLE[type]}</Text>
          <View style={styles.totalCollection}>
            <Caption>Total collected:</Caption>
            <Caption
              style={[styles.amount, {color: theme.colors.documentation}]}>
              ₹ {amountCollected || 0}
            </Caption>
            <OpacityButton
              opacity={0.1}
              color={theme.colors.primary}
              style={styles.printAll}
              onPress={() => setVisible(!Visible)}>
              <Ionicons name="print" size={22} color={theme.colors.primary} />
            </OpacityButton>
          </View>

          {charges?.map((charge, i) => (
            <RenderCharge
              key={i}
              {...props}
              {...{charge, type, navToEdit, handleDelete}}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    marginVertical: 15,
  },
  chargeContainer: {
    position: 'relative',
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(222, 225, 231, 1)',
    borderRadius: 10,
  },
  actionContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemContainer: {
    marginVertical: 5,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonLabel: {
    paddingHorizontal: 5,
  },
  totalCollection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  printAll: {
    borderRadius: 50,
    marginRight: 10,
  },
  rightContent: {
    borderRadius: 50,
    marginRight: 10,
  },
  deleteButton: {
    borderRadius: 50,
  },
  amount: {
    alignSelf: 'center',
    paddingEnd: 150,
  },
  printModal: {
    backgroundColor: '#fff',
    paddingBottom: 25,
    paddingTop: 7,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  extraDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  printError: {
    color: theme.colors.error,
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default withTheme(PaymentCollections);
