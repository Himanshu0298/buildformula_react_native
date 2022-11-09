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
import {CardData} from './CardData';

const InventoryCard = props => {
  const [data] = CardData;

  const {date, utility, Description, Quantity, Stock} = data;

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
      <View>
        <Caption>Description</Caption>
        <Text>
          {Description}
          <TouchableOpacity>
            <Text style={{color: theme.colors.primary}}> see more... </Text>
          </TouchableOpacity>
        </Text>
      </View>

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
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    ...getShadow(2),
  },
  cardSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    padding: 10,
    alignSelf: 'flex-end',
    borderRadius: 10,
  },
});

export default InventoryCard;
