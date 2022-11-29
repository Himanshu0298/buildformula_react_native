import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {
  Caption,
  Divider,
  FAB,
  Subheading,
  Text,
  withTheme,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UploadFileIcon from 'assets/images/file_icon.png';

import {getShadow} from 'utils';
import {PIList} from './PIData';

function PIListing(props) {
  const {navigation, theme} = props;
  const {colors} = theme;

  const [selectDialog, setSelectDialog] = React.useState(false);

  const toggleSelectDialog = () => setSelectDialog(v => !v);

  const FAB_ACTIONS = [
    {
      icon: UploadFileIcon,
      color: theme.colors.primary,
      label: 'From PR',
      onPress: () => navigation.navigate('CreatePI'),
    },
    {
      icon: UploadFileIcon,
      color: theme.colors.primary,
      label: 'Direct PR',
      onPress: () => {
        navigation.navigate('PIRequest');
      },
    },
  ];

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Subheading style={styles.headerText}>PI Listing</Subheading>
        </View>
        <View style={styles.bodyContainer}>
          <FlatList
            style={styles.flatList}
            data={PIList}
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
                    <View style={styles.cardDetails}>
                      <View style={styles.cardContent}>
                        <Caption>Inquiry Date:</Caption>
                        <Text style={styles.detail}>{item.inquiryDate}</Text>
                      </View>
                      <View style={styles.cardContent}>
                        <Caption>Validity Date:</Caption>
                        <Text style={styles.detail}>{item.validityDate}</Text>
                      </View>
                      <View style={styles.cardContent}>
                        <Caption>Created By:</Caption>
                        <Text style={styles.detail}>{item.createdBy}</Text>
                      </View>
                      <View style={styles.contentContainer}>
                        <View style={styles.detailContainer}>
                          <Caption>Shared:</Caption>
                          <Text>{item.shared}</Text>
                        </View>

                        <View style={styles.detailContainer}>
                          <Caption>Submitted:</Caption>
                          <Text>{item.submitted}</Text>
                        </View>
                      </View>
                      <Divider />
                      <View style={styles.socialContainer}>
                        <View style={styles.iconContainer}>
                          <MaterialCommunityIcons
                            name="text-box"
                            size={15}
                            color="#4872f4"
                          />
                          <Text style={styles.textContainer}>Create PO</Text>
                        </View>
                        <View style={styles.iconContainer}>
                          <MaterialCommunityIcons
                            name="compare"
                            size={15}
                            color="#4872f4"
                          />
                          <Text style={styles.textContainer}> Compare</Text>
                        </View>
                        <View style={styles.iconContainer}>
                          <MaterialCommunityIcons
                            name="share-variant"
                            size={15}
                            color="#4872f4"
                          />
                          <Text style={styles.textContainer}>Share</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>

      <FAB.Group
        open={selectDialog}
        // style={styles.fab}
        fabStyle={{
          backgroundColor: selectDialog ? colors.white : colors.primary,
        }}
        icon={selectDialog ? 'window-close' : 'plus'}
        small
        onPress={toggleSelectDialog}
        onStateChange={() => {
          console.log('-----> onStateChange');
        }}
        actions={FAB_ACTIONS}
      />
    </>
  );
}

export default withTheme(PIListing);

const styles = StyleSheet.create({
  container: {
    margin: 15,
    flexGrow: 1,
  },

  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 10,
  },
  textContainer: {
    fontSize: 10,
    padding: 5,
  },

  socialContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerContainer: {
    marginBottom: 10,
  },
  flatList: {
    height: '96%',
  },
  headerText: {
    fontSize: 18,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  cardContainer: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    ...getShadow(5),
  },

  cardDetails: {
    marginBottom: 10,
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
    borderRadius: 5,
    paddingHorizontal: 5,
    fontSize: 15,
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

  detail: {
    marginLeft: 7,
  },
});
