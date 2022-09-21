import {StyleSheet, View, FlatList, Dimensions} from 'react-native';
import React, {useState} from 'react';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {
  IconButton,
  Caption,
  Subheading,
  Text,
  Paragraph,
} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import ActionButtons from 'components/Atoms/ActionButtons';
import {useAlert} from 'components/Atoms/Alert';
import {getShadow} from 'utils';
import PRMaterialData from '../CreatePR/PRMaterialData';

const {height} = Dimensions.get('window');

const dynamicHeight = height - 245;

const PRPreview = props => {
  const {navigation} = props;
  const alert = useAlert();

  const [status, setStatus] = useState();

  return (
    <View style={styles.container}>
      <ProjectHeader {...props} />
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.ButtonContainer}>
            <IconButton
              icon="keyboard-backspace"
              size={22}
              color="#4872f4"
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            />
            <Subheading style={styles.headerText}>PR Preview</Subheading>
          </View>
          <View style={styles.statusContainer}>
            {status == null ? (
              <View style={styles.status}>
                <OpacityButton
                  color="#4872f4"
                  opacity={0.18}
                  onPress={() => {
                    navigation.navigate('CreatePR');
                  }}
                  style={styles.button}>
                  <MaterialIcons name="edit" color="#4872f4" size={13} />
                </OpacityButton>
              </View>
            ) : null}
            <View>
              <OpacityButton
                color="#FF5D5D"
                opacity={0.18}
                onPress={() => {
                  alert.show({
                    title: 'Alert',
                    message: 'Are you sure want to delete this?',
                    dismissable: false,
                  });
                }}
                style={styles.button}>
                <MaterialIcons name="delete" color="#FF5D5D" size={13} />
              </OpacityButton>
            </View>
          </View>
        </View>
        <View style={styles.bodyContent}>
          <View style={styles.materialListContainer}>
            <FlatList
              data={PRMaterialData}
              renderItem={({item}) => {
                return (
                  <View style={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                      <View style={styles.dataRow}>
                        <Caption style={styles.lightData}>Category:</Caption>
                        <Text>{item.category}</Text>
                      </View>
                    </View>
                    <View style={styles.dataRow}>
                      <Caption style={styles.lightData}>Sub Category:</Caption>
                      <Text>{item.subCategory}</Text>
                    </View>
                    <View style={styles.dataRow}>
                      <Caption style={styles.lightData}>Unit:</Caption>
                      <Text>{item.unit}</Text>
                    </View>
                    <View style={styles.dataRow}>
                      <Caption style={styles.lightData}>Required date:</Caption>
                      <Text>{item.requiredDate}</Text>
                    </View>
                    <View style={styles.dataRow}>
                      <Caption style={styles.lightData}>Quantity:</Caption>
                      <Text>{item.qty}</Text>
                    </View>
                  </View>
                );
              }}
              ListHeaderComponent={
                <View style={styles.cardContent}>
                  <View style={styles.headerContainer}>
                    <View style={styles.dataRow}>
                      <Caption style={styles.lightData}>PR ID:</Caption>
                      <Text>022</Text>
                    </View>
                    {status === 'PR Rejected' ? (
                      <View style={styles.statusButton}>
                        <MaterialIcons
                          name="cancel"
                          size={18}
                          color="#FF5D5D"
                        />
                        <Text style={styles.reject}>PR Rejected</Text>
                      </View>
                    ) : status === 'PR Approved' ? (
                      <View style={styles.statusButton}>
                        <MaterialIcons
                          name="check-circle"
                          size={18}
                          color="#07CA03"
                        />
                        <Text style={styles.Approved}>PR Approved</Text>
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.dataRow}>
                    <Caption style={styles.lightData}>Subject:</Caption>
                    <Text>OPC</Text>
                  </View>
                  <View style={styles.dataRow}>
                    <Caption style={styles.lightData}>Required Vendor:</Caption>
                    <Text>Hiren tarale</Text>
                  </View>
                  <View style={styles.dataRow}>
                    <Caption style={styles.lightData}>Required For:</Caption>
                    <Text>(Task Link, ID, Name)</Text>
                  </View>
                  <View style={styles.dataRow}>
                    <Caption style={styles.lightData}>Remark:</Caption>
                    <Paragraph style={styles.input}>
                      Please Soon as Possible Order it we have not enough
                      cement.
                    </Paragraph>
                  </View>
                  <View style={styles.dataRow}>
                    <Caption style={styles.lightData}>Creater Name:</Caption>
                    <Text>Jaismin Fataniya</Text>
                  </View>
                  <View style={styles.dataRow}>
                    <Caption style={styles.lightData}>Created on:</Caption>
                    <Text>15 April, 2022</Text>
                  </View>
                </View>
              }
            />
          </View>
          <View>
            <ActionButtons
              cancelLabel="Reject"
              submitLabel="Approve"
              onCancel={() => setStatus('PR Rejected')}
              onSubmit={() => setStatus('PR Approved')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PRPreview;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 15,
  },
  cardContent: {
    marginBottom: 10,
  },

  ButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusContainer: {
    flexDirection: 'row',
    marginEnd: 10,
    alignSelf: 'center',
  },
  status: {
    marginRight: 15,
  },
  button: {
    borderRadius: 20,
  },

  input: {
    flexShrink: 2,
  },

  statusButton: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  backButton: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  reject: {
    color: '#FF5D5D',
    marginLeft: 5,
  },

  Approved: {
    color: '#07CA03',
    marginLeft: 5,
  },

  mainContainer: {
    paddingHorizontal: 5,
  },

  headerText: {
    fontSize: 17,
  },
  lightData: {
    fontSize: 13,
    marginRight: 5,
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  materialListContainer: {
    marginTop: 10,
    height: dynamicHeight,
  },
  cardContainer: {
    margin: 5,

    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    ...getShadow(3),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
