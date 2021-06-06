import * as React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Badge,
  Button,
  Caption,
  Divider,
  Subheading,
  Text,
  Title,
} from 'react-native-paper';
import {BOOKING_STATUS_STYLES} from 'components/Molecules/UnitSelector/RenderUnits';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from 'styles/theme';

function Account(props) {
  const {route, theme} = props;
  const {project_id, unit} = route?.params || {};

  console.log('-----> unit.booking_status', unit.booking_status);

  const bookingStyle = BOOKING_STATUS_STYLES.standby || {};

  const toggleStatusDialog = () => {};

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <Subheading>Booking status</Subheading>
        <View style={styles.statusCard}>
          <View style={styles.statusLeft}>
            <Badge
              style={[
                styles.badge,
                {backgroundColor: bookingStyle.borderColor},
              ]}>
              {bookingStyle.badge}
            </Badge>
            <Text>{bookingStyle.label}</Text>
          </View>
          <View>
            <OpacityButton
              opacity={0.1}
              style={styles.editIcon}
              onPress={toggleStatusDialog}>
              <MaterialIcon
                name="pencil"
                color={theme.colors.primary}
                size={18}
              />
            </OpacityButton>
          </View>
        </View>
        <View style={styles.documentationContainer}>
          <Subheading style={{color: theme.colors.documentation}}>
            Documentation charges
          </Subheading>

          <View
            style={[
              styles.documentationChargesContainer,
              {borderColor: theme.colors.documentation},
            ]}>
            <View
              style={[
                styles.section,
                {
                  borderRightWidth: 1,
                  borderColor: theme.colors.documentation,
                  backgroundColor: 'rgba(243, 122, 80, 0.1)',
                },
              ]}>
              <Subheading style={{fontWeight: 'bold'}}>₹ 10,00,000</Subheading>
              <Caption style={{fontSize: 16}}>Total amount</Caption>
            </View>
            <View
              style={[
                styles.section,
                {backgroundColor: 'rgba(243, 122, 80, 0.1)'},
              ]}>
              <Subheading style={{fontWeight: 'bold'}}>₹ 3,00,000</Subheading>
              <Caption style={{fontSize: 16}}>Amount collected</Caption>
            </View>
          </View>
        </View>

        <View style={styles.documentationContainer}>
          <Subheading>Property Final Amount </Subheading>

          <View style={styles.amountContainer}>
            <View
              style={[
                styles.section,
                {borderRightWidth: 1, borderColor: 'rgba(222, 225, 231, 1)'},
              ]}>
              <Subheading style={{fontWeight: 'bold'}}>₹ 10,00,000</Subheading>
              <Caption style={{fontSize: 16}}>Total amount</Caption>
            </View>
            <View style={styles.section}>
              <Subheading style={{fontWeight: 'bold'}}>₹ 3,00,000</Subheading>
              <Caption style={{fontSize: 16}}>Amount collected</Caption>
            </View>
          </View>
        </View>

        <View style={styles.actionRow}>
          <Button
            mode="outlined"
            style={styles.actionButton}
            uppercase={false}
            theme={{roundness: 7}}>
            Add collection
          </Button>
          <Button
            mode="outlined"
            style={styles.actionButton}
            uppercase={false}
            theme={{roundness: 7}}>
            View activity
          </Button>
        </View>

        <View style={styles.detailCard}>
          <Subheading style={{color: theme.colors.primary}}>
            Payment Schedule
          </Subheading>

          <View style={styles.cardItemsContainer}>
            <TouchableOpacity style={styles.cardItem}>
              <Text>Bank loan details</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity style={styles.cardItem}>
              <Text style={{color: theme.colors.documentation}}>
                Documentation charges
              </Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity style={styles.cardItem}>
              <Text>Property Final Amount</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.detailCard}>
          <Subheading style={{color: theme.colors.primary}}>
            Payment collection
          </Subheading>

          <View style={styles.cardItemsContainer}>
            <TouchableOpacity style={styles.cardItem}>
              <Text style={{color: theme.colors.documentation}}>
                Documentation charges
              </Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity style={styles.cardItem}>
              <Text>Property Final Amount</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity style={styles.cardItem}>
              <Text>GST Amount</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    marginBottom: 20,
  },
  statusCard: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(222, 225, 231, 1)',
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    marginRight: 10,
  },
  editIcon: {
    borderRadius: 50,
  },
  documentationContainer: {
    marginTop: 10,
  },
  documentationChargesContainer: {
    marginTop: 3,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountContainer: {
    marginTop: 3,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(222, 225, 231, 1)',
  },
  section: {
    padding: 10,
    flex: 1,
  },
  actionRow: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  actionButton: {
    borderColor: theme.colors.primary,
    width: '40%',
  },
  detailCard: {
    marginTop: 20,
    backgroundColor: 'rgba(242, 244, 245, 1)',
    padding: 15,
    borderRadius: 10,
  },
  cardItemsContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  cardItem: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});

export default Account;
