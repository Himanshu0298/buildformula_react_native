import PostContent from 'components/Atoms/RenderSeeMore';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Caption} from 'react-native-paper';

import {getShadow} from 'utils';
import {CardData} from './CardData';

const InventoryCard = () => {
  const [data] = CardData;

  const {date, utility, description, Quantity, Stock} = data;

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
        <Caption> Description</Caption>
        <PostContent description={description} />
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
});

export default InventoryCard;
