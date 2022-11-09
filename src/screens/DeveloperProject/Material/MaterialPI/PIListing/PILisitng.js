import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {theme} from 'styles/theme';
import {Title, Divider, FAB, Caption} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {PIData} from './PIData';

const PILisitng = props => {
  const {navigation} = props;
  const {colors} = theme;

  const [selectDialog, setSelectDialog] = useState(false);

  const toggleSelectDialog = () => setSelectDialog(v => !v);
  const onStateChange = ({open}) => setSelectDialog({open});

  return (
    <View style={styles.mainContainer}>
      <Title>PILisitng</Title>
      <View style={styles.piContainer}>
        <FlatList
          style={{height: '93%'}}
          data={PIData}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('PIPreview');
                }}>
                <View style={styles.cardContainer}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.ID}>{item.id}</Text>
                    <Text
                      style={
                        item.status === 'Pending'
                          ? styles.pending
                          : item.status === 'Rejected'
                          ? styles.rejected
                          : item.status === 'Approved'
                          ? styles.approved
                          : null
                      }>
                      {item.status}
                    </Text>
                  </View>
                  <View>
                    <View style={styles.piCardContent}>
                      <Caption>Inquiry Date:</Caption>
                      <Text>{item.inquiryDT}</Text>
                    </View>
                    <View style={styles.piCardContent}>
                      <Caption>Validity Date:</Caption>
                      <Text>{item.validityDT}</Text>
                    </View>
                    <View style={styles.piCardContent}>
                      <Caption>Created by:</Caption>
                      <Text>{item.createdBy}</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.piCardContent,
                      {justifyContent: 'space-between'},
                    ]}>
                    <View style={styles.piCardContent}>
                      <Caption>Shared:</Caption>
                      <Text>{item.shared}</Text>
                    </View>
                    <View style={styles.piCardContent}>
                      <Caption>Submitted:</Caption>
                      <Text>{item.submitted}</Text>
                    </View>
                  </View>
                  <Divider
                    style={{
                      color: 'rgba(0, 0, 0, 0.2)',
                      height: 1,
                      marginVertical: 5,
                    }}
                  />
                  <View
                    style={[
                      styles.piCardContent,
                      {justifyContent: 'space-between'},
                    ]}>
                    <TouchableOpacity
                      style={styles.piBTNBOX}
                      onPress={() => {
                        Alert.alert('pressed btn');
                      }}>
                      <MaterialIcons name="share" size={16} color="#4872f4" />
                      <Text>Share</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.piBTNBOX}
                      onPress={() => {
                        Alert.alert('pressed btn');
                      }}>
                      <MaterialIcons name="compare" size={16} color="#4872f4" />
                      <Text style={styles.piBTNTXT}>Compare</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.piBTNBOX}
                      onPress={() => {
                        Alert.alert('pressed btn');
                      }}>
                      <MaterialIcons name="receipt" size={16} color="#4872f4" />
                      <Text>Create PO</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <FAB.Group
        onPress={toggleSelectDialog}
        onStateChange={onStateChange}
        open={selectDialog.open}
        fabStyle={{
          backgroundColor: selectDialog.open ? colors.white : colors.primary,
        }}
        icon={selectDialog.open ? 'window-close' : 'plus'}
        small
        actions={[
          {
            icon: 'file-document-multiple-outline',
            label: 'From PR',
            onPress: () => navigation.navigate('FROMPR'),
          },
          {
            icon: 'file-document-outline',
            label: 'Direct PR',
            onPress: () =>
              navigation.navigate('CreatePI', {PO_Type: 'directPO'}),
          },
        ]}
      />
    </View>
  );
};

export default PILisitng;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  piCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#e5eafa',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  cardHeader: {
    padding: 10,
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ID: {
    backgroundColor: '#E5EAFA',
    padding: 5,
    borderRadius: 5,
    color: 'rgba(72, 114, 244, 1)',
  },
  pending: {
    color: 'rgba(244, 175, 72, 1)',
  },
  rejected: {
    color: 'rgba(255, 93, 93, 1)',
  },
  approved: {
    color: 'rgba(7, 202, 3, 1)',
  },
  piBTNBOX: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 50,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
