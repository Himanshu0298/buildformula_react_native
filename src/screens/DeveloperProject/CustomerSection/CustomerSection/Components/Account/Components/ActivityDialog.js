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
import {SafeAreaView} from 'react-native-safe-area-context';
import UserAvatar from 'components/Atoms/UserAvatar';

const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

const RenderCollection = React.memo(({collection}) => {
  const {
    first_name,
    last_name,
    profile_pic,
    message,
    transaction_number,
    log_time,
  } = collection;

  const name = `${first_name} ${last_name}`;
  const initials = name
    .match(/(\b\S)?/g)
    .join('')
    .match(/(^\S|\S$)?/g)
    .join('')
    .toUpperCase();

  return (
    <View style={styles.collectionContainer}>
      {profile_pic ? (
        <UserAvatar size={40} uri={profile_pic} />
      ) : (
        <Avatar.Text size={40} label={initials} />
      )}
      <View style={styles.collectionDetails}>
        <Text>{name}</Text>
        <Text>
          {message}{' '}
          {transaction_number ? (
            <>
              <Caption>with transition no </Caption>
              <Text>{transaction_number}</Text>
            </>
          ) : null}
        </Text>
      </View>
      <View>
        <Caption>{dayjs(log_time).format('hh:mm a')}</Caption>
      </View>
    </View>
  );
});

function ActivityDialog(props) {
  const {theme, open, data: activities = {}, handleClose} = props;

  return (
    <Modal
      isVisible={open}
      backdropOpacity={0.4}
      onBackButtonPress={handleClose}
      onBackdropPress={handleClose}
      style={{justifyContent: 'flex-end', margin: 0}}>
      <ActionSheetProvider>
        <View style={styles.container}>
          <SafeAreaView>
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

            {Object.keys(activities).length ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.contentContainer}>
                  {Object.keys(activities).map((key, i) => {
                    const collections = activities[key];

                    return (
                      <View key={i} style={styles.groupContainer}>
                        <Caption style={{fontSize: 16}}>
                          {dayjs(key, 'DD-MM-YYYY').format('DD MMM YYYY')}
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
          </SafeAreaView>
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
