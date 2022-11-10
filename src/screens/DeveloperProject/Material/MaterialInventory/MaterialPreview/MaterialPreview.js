import PostContent from 'components/Atoms/RenderSeeMore';
import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Text,
  Divider,
  Subheading,
  IconButton,
  Caption,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from 'styles/theme';

import {getShadow} from 'utils';
import {CardData} from '../Component/CardData';

const InventoryCard = props => {
  const {navigation, ele} = props;

  const {date, utility, description, Quantity, Stock} = ele;

  const navToSubListPreview = () => navigation.navigate('SubListPreview', ele);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardSubContainer}>
        <View>
          <Caption> Date</Caption>
          <Text>{date}</Text>
        </View>
        <View>
          <Caption> Material Utility</Caption>
          <Text>{utility}</Text>
        </View>
      </View>

      <PostContent description={description}>{description}</PostContent>

      <View style={styles.quantity}>
        <View>
          <Caption> Quantity</Caption>
          <Text>{Quantity}</Text>
        </View>
        <View>
          <Caption>Material Stock</Caption>
          <Text>{Stock}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={navToSubListPreview}>
        <View style={styles.button}>
          <Text style={{color: theme.colors.primary}}>See More</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={22}
            color={theme.colors.primary}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const MaterialHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.cardSubContainer}>
        <View>
          <Caption> Estimated Material</Caption>
          <Text> 6592.35</Text>
        </View>
        <View>
          <Caption> Delivered Material</Caption>
          <Text>2510.00</Text>
        </View>
      </View>
      <View style={styles.cardSubContainer}>
        <View>
          <Caption>Issue Material</Caption>
          <Text> 210.00</Text>
        </View>
        <View>
          <Caption>Damaged Material</Caption>
          <Text>32.00</Text>
        </View>
      </View>
      <View style={styles.cardSubContainer}>
        <View>
          <Caption> Order Remaining Quantity</Caption>
          <Text> 6592.35</Text>
        </View>
        <View>
          <Caption> Balanced Quantity</Caption>
          <Text> -187</Text>
        </View>
      </View>
    </View>
  );
};

function MaterialPreview(props) {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <View style={styles.dataRow}>
        <IconButton
          icon="keyboard-backspace"
          size={18}
          color={theme.colors.primary}
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        />
        <Subheading style={styles.headerText}>
          OPC - 43 Grade/ unit 1
        </Subheading>
      </View>
      <ScrollView>
        <View>
          <MaterialHeader />
        </View>
        <Divider />
        {CardData?.map(ele => {
          return <InventoryCard navigation={navigation} ele={ele} />;
        })}
        <Divider />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    margin: 10,
  },

  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    padding: 10,
    fontSize: 18,
  },
  backButton: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
  },

  cardSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerContainer: {
    margin: 10,
  },

  cardContainer: {
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    ...getShadow(2),
  },

  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: ' rgba(72, 114, 244, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    alignSelf: 'flex-end',
    borderRadius: 10,
  },
});

export default MaterialPreview;
