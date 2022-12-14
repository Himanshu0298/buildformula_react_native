import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import NoResult from 'components/Atoms/NoResult';

import React from 'react';
import {
  Caption,
  Colors,
  Divider,
  FAB,
  Subheading,
  Text,
} from 'react-native-paper';
import {theme} from 'styles/theme';
import {getShadow} from 'utils';
import {PR_REQUEST_STATUS} from 'utils/constant';
import store_keeper from 'assets/images/store_keeper.png';
import reload from 'assets/images/reload.png';
import {MaterialIndentData} from './MaterialIndentData';

const ListingCard = props => {
  const {item} = props;

  const {
    id,
    status,
    validityDate,
    createdBy,
    createrEmail: creatorEmail,
    query,
  } = item;

  return (
    <TouchableOpacity>
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.ID}>{id}</Text>
          {/* <Caption
            style={{
              color: PR_REQUEST_STATUS[status]?.color,
            }}>
            {PR_REQUEST_STATUS[status]?.label}
          </Caption> */}
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
        <Divider />
        <View style={styles.cardDetails}>
          <Subheading>{createdBy}</Subheading>
          <View style={styles.cardContent}>
            <Text style={styles.detail}>{creatorEmail}</Text>
          </View>
          <View style={styles.cardHeader}>
            <Caption>{validityDate}</Caption>
            <Caption> {query}</Caption>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function MaterialIndentListing(props) {
  const {navigation} = props;
  const [selectDialog, setSelectDialog] = React.useState(false);

  const {colors} = theme;

  const toggleSelectDialog = () => setSelectDialog(v => !v);

  const renderEmpty = () => <NoResult />;

  const FAB_ACTIONS = [
    {
      icon: store_keeper,
      color: theme.colors.primary,
      label: 'Issue material',
      onPress: () => navigation.navigate('CreateIssueIndent'),
    },
    {
      icon: reload,
      color: theme.colors.primary,
      label: 'Return Material',
      onPress: () => navigation.navigate('CreateReturnIndent'),
    },
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Subheading style={styles.headerText}>Material Indent</Subheading>
      </View>
      <View style={styles.bodyContainer}>
        <FlatList
          style={styles.flatList}
          data={MaterialIndentData.sort().reverse()}
          refreshControl={<RefreshControl refreshing={false} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmpty}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <ListingCard {...props} item={item} />;
          }}
        />
      </View>
      <FAB.Group
        open={selectDialog}
        // style={styles.fab}
        fabStyle={{
          backgroundColor: selectDialog ? Colors.white : colors.primary,
        }}
        icon={selectDialog ? 'window-close' : 'plus'}
        small
        onPress={toggleSelectDialog}
        onStateChange={() => {
          console.log('-----> onStateChange');
        }}
        actions={FAB_ACTIONS}
      />
    </View>
  );
}

export default MaterialIndentListing;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    padding: 20,
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
    marginTop: 10,
  },
  cardContainer: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    ...getShadow(2),
  },

  cardDetails: {
    padding: 5,
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
    padding: 7,
    borderRadius: 5,
    fontSize: 10,
    color: 'rgba(72, 114, 244, 1)',
  },
  detail: {
    marginLeft: 7,
  },

  pending: {
    color: 'rgba(72, 114, 244, 1)',
  },
  rejected: {
    color: 'rgba(255, 93, 93, 1)',
  },
  approved: {
    color: 'rgba(7, 202, 3, 1)',
  },
});
