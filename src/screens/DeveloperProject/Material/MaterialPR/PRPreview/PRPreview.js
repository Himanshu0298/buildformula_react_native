import {StyleSheet, View, Dimensions} from 'react-native';
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
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

const {height} = Dimensions.get('window');

const dynamicHeight = height - 245;

function PRPreview(props) {
  const {navigation, route} = props;
  const {id} = route?.params || {};

  const alert = useAlert();

  const [status, setStatus] = useState();
  const {getPRMaterialDetails} = useMaterialManagementActions();

  const {materialPRDetails, loading} = useSelector(s => s.materialManagement);
  const {selectedProject} = useSelector(s => s.project);

  React.useEffect(() => {
    getPRMaterialDetails({
      project_id: selectedProject.id,
      id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <ProjectHeader {...props} />
      <View style={styles.mainContainer}>
        <Spinner visible={loading} textContent="" />

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
            {materialPRDetails.map(item => {
              return (
                <>
                  <View style={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                      <View style={styles.dataRow}>
                        <Caption style={styles.lightData}>Category:</Caption>
                        <Text>{item.materialcategrytitle}</Text>
                      </View>
                    </View>
                    <View style={styles.dataRow}>
                      <Caption style={styles.lightData}>Sub Category:</Caption>
                      <Text>{item.subcategorytitle}</Text>
                    </View>
                    <View style={styles.dataRow}>
                      <Caption style={styles.lightData}>Unit:</Caption>
                      <Text>{item.materialunitstitle}</Text>
                    </View>
                    <View style={styles.dataRow}>
                      <Caption style={styles.lightData}>Required date:</Caption>
                      <Text>{item.material_dates}</Text>
                    </View>
                    <View style={styles.dataRow}>
                      <Caption style={styles.lightData}>Quantity:</Caption>
                      <Text>{item.material_units_id}</Text>
                    </View>
                  </View>
                  <View style={styles.cardContent}>
                    <View style={styles.headerContainer}>
                      <View style={styles.dataRow}>
                        <Caption style={styles.lightData}>PR ID:</Caption>
                        <Text>{item.id}</Text>
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
                      <Text>{item.subject}</Text>
                    </View>
                    <View style={styles.dataRow}>
                      <Caption style={styles.lightData}>
                        Required Vendor:
                      </Caption>
                      <Text>Hiren tarale</Text>
                    </View>
                    <View style={styles.dataRow}>
                      <Caption style={styles.lightData}>Required For:</Caption>
                      <Text>{item.required_for_data}</Text>
                    </View>
                    <View style={styles.dataRow}>
                      <Caption style={styles.lightData}>Remark:</Caption>
                      <Paragraph style={styles.input}>{item.remarks}</Paragraph>
                    </View>
                    <View style={styles.dataRow}>
                      <Caption style={styles.lightData}>Creater Name:</Caption>
                      <Text>
                        {item.first_name} {item.last_name}
                      </Text>
                    </View>
                    <View style={styles.dataRow}>
                      <Caption style={styles.lightData}>Created on:</Caption>
                      <Text>{item.created}</Text>
                    </View>
                  </View>
                </>
              );
            })}
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
}

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
