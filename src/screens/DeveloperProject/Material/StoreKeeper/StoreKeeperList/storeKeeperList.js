// import {
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   FlatList,
//   RefreshControl,
// } from 'react-native';
// import NoResult from 'components/Atoms/NoResult';

// import React from 'react';
// import {Caption, Divider, FAB, Subheading, Text} from 'react-native-paper';
// import {theme} from 'styles/theme';
// import {getShadow} from 'utils';
// import {STORE_KEEPER_DATA} from './StoreKeeperData';

// const ListingCard = props => {
//   const {item} = props;

//   const {id, validityDate, createdBy, createrEmail: creatorEmail, query} = item;

//   return (
//     <TouchableOpacity>
//       <View style={styles.cardContainer}>
//         <View style={styles.cardHeader}>
//           <Text style={styles.ID}>{id}</Text>
//         </View>
//         <Divider />
//         <View style={styles.cardDetails}>
//           <Subheading>{createdBy}</Subheading>
//           <View style={styles.cardContent}>
//             <Text style={styles.detail}>{creatorEmail}</Text>
//           </View>
//           <View style={styles.cardHeader}>
//             <Caption>{validityDate}</Caption>
//             <Caption> {query}</Caption>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// function MaterialIndentListing(props) {
//   const {navigation} = props;
//   const [selectDialog, setSelectDialog] = React.useState(false);

//   const {colors} = theme;

//   const toggleSelectDialog = () => setSelectDialog(v => !v);

//   const renderEmpty = () => <NoResult />;

//   return (
//     <View style={styles.mainContainer}>
//       <View style={styles.headerContainer}>
//         <Subheading style={styles.headerText}>Material Indent</Subheading>
//       </View>
//       <View style={styles.bodyContainer}>
//         <FlatList
//           style={styles.flatList}
//           data={STORE_KEEPER_DATA}
//           refreshControl={<RefreshControl refreshing={false} />}
//           showsVerticalScrollIndicator={false}
//           keyExtractor={item => item.id}
//           renderItem={({item}) => {
//             return <ListingCard {...props} item={item} />;
//           }}
//         />
//       </View>
//     </View>
//   );
// }

// export default MaterialIndentListing;

// const styles = StyleSheet.create({
//   mainContainer: {
//     flexGrow: 1,
//     padding: 20,
//   },

//   headerContainer: {
//     marginBottom: 10,
//   },
//   flatList: {
//     height: '96%',
//   },
//   headerText: {
//     fontSize: 18,
//   },
//   cardContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   cardContainer: {
//     marginBottom: 10,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     ...getShadow(2),
//   },

//   cardDetails: {
//     padding: 5,
//   },
//   cardHeader: {
//     padding: 10,
//     paddingHorizontal: 0,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   ID: {
//     backgroundColor: '#E5EAFA',
//     padding: 7,
//     borderRadius: 5,
//     fontSize: 10,
//     color: 'rgba(72, 114, 244, 1)',
//   },
//   detail: {
//     marginLeft: 7,
//   },
// });
