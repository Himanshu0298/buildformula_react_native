import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Avatar,
  Caption,
  Divider,
  Subheading,
  Text,
  withTheme,
} from 'react-native-paper';
import Modal from 'react-native-modal';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import dayjs from 'dayjs';

const RenderCollection = React.memo(props => {
  const {collection = {}} = props;
  const {user} = collection;

  return (
    <View style={styles.collectionContainer}>
      {user?.profile_pic ? (
        <Avatar.Image size={40} source={{uri: user.profile_pic}} />
      ) : (
        <Avatar.Text size={40} label="AP" />
      )}
      <View style={styles.collectionDetails}>
        <Text>Ashish Patel</Text>
        <Text>
          Added <Caption> Added payment collection with transition no </Caption>
          1271728506
        </Text>
      </View>
      <View>
        <Caption>10:40am</Caption>
      </View>
    </View>
  );
});

function ActivityDialog(props) {
  const {theme, open, data: activities = [], handleClose} = props;

  return (
    <Modal
      isVisible={open}
      backdropOpacity={0.4}
      onBackButtonPress={handleClose}
      onBackdropPress={handleClose}
      style={{justifyContent: 'flex-end', margin: 0}}>
      <ActionSheetProvider>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.titleContainer}>
              <Subheading style={{color: theme.colors.primary}}>
                Account activity
              </Subheading>
            </View>
            <View style={styles.actionContainer}>
              <OpacityButton
                opacity={0.1}
                color={theme.colors.error}
                style={{borderRadius: 50}}
                onPress={handleClose}>
                <MaterialIcon
                  name="close"
                  color={theme.colors.error}
                  size={18}
                />
              </OpacityButton>
            </View>
          </View>

          {activities.length ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}>
              <View style={styles.contentContainer}>
                {activities.map((activity, i) => {
                  const {date, collections} = activity;
                  return (
                    <View key={i} style={styles.groupContainer}>
                      <Caption style={{fontSize: 16}}>
                        {dayjs(date).format('DD MMM YYYY')}
                      </Caption>
                      <View style={styles.collectionsContainer}>
                        {collections.map((collection, index) => (
                          <React.Fragment key={index}>
                            <RenderCollection collection={collection} />
                            {index !== collections.length - 1 ? (
                              <Divider />
                            ) : null}
                          </React.Fragment>
                        ))}
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          ) : (
            <View style={styles.emptyContainer}>
              <Text>No Activities found!</Text>
            </View>
          )}
        </View>
      </ActionSheetProvider>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  headerContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {},
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 10,
  },
  groupContainer: {
    marginTop: 10,
  },
  collectionsContainer: {
    marginTop: 10,
  },
  collectionContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  collectionDetails: {
    marginLeft: 10,
    flex: 1,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});

export default withTheme(ActivityDialog);
