import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Title, withTheme, Caption, Subheading } from 'react-native-paper';
import useAuthActions from '../../../redux/actions/authActions';
import { useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';

function PlanBox({ title, onPress, colors }) {
  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={colors} style={styles.planContainer}>
      <Subheading>{title}</Subheading>
    </LinearGradient>
  );
}

function PackageSelect(props) {

  return (
    <View style={styles.container}>
      <Title style={{ color: '#000' }}>Select Your Role</Title>
      <Caption style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Choose your Role for the project</Caption>
      <PlanBox
        title="Developer"
        colors={['#8C55FE', '#21D4FD']}
      />
      <PlanBox
        title="Supplier"
        colors={['#FA6A88', '#FF9A8B']}
      />
      <PlanBox
        title="Customer"
        colors={['#F5576C', '#F093FB']}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  planContainer: {
    flex: 0.22,
    padding: 12,
    borderRadius: 15,
    marginVertical: 15,
  },
});

export default withTheme(PackageSelect);
