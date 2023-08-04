import dayjs from 'dayjs';
import React, {useMemo} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Caption,
  Divider,
  IconButton,
  Menu,
  Subheading,
  Text,
  Title,
  withTheme,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import ApprovalPanel from './Components/ApprovalPanel';
import AssignPersonPanel from './Components/AssignPersonPanel';
import AttachmentsPanel from './Components/AttachmentsPanel';
import ChecklistPanel from './Components/ChecklistPanel';
import DependencyPanel from './Components/DependencyPanel';
import DescriptionPanel from './Components/DescriptionPanel';
import PlanningDatePanel from './Components/PlanningDatePanel';
import ReviewPanel from './Components/ReviewPanel';

function PlanningDetails(props) {
  const {route, navigation} = props;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={18}
              style={{marginRight: 10}}
            />
            <Title>Planning</Title>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.panelContainer}>
        <View style={styles.panelSection}>
          <Caption>Created by</Caption>
          <Caption style={{lineHeight: 13}}>
            {dayjs().format('DD MMM YYYY, hh:mm A')}
          </Caption>
        </View>
        <View style={styles.panelSection}>
          <Caption>Last edited on</Caption>
          <Caption style={{lineHeight: 13}}>
            {dayjs().format('DD MMM YYYY, hh:mm A')}
          </Caption>
        </View>
      </View>

      <View style={styles.phaseTitle}>
        <Caption style={{fontSize: 16}}>Phase</Caption>
        <MaterialCommunityIcons
          name="label"
          size={18}
          color="rgba(4, 29, 54, 0.5)"
          style={{marginHorizontal: 10}}
        />
        <Caption style={{fontSize: 16}}>Subphase</Caption>
      </View>

      <View style={styles.headingContainer}>
        <Subheading>Activity Name</Subheading>
        <IconButton icon="pencil" size={18} />
      </View>

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <DescriptionPanel />
        <AssignPersonPanel />
        <PlanningDatePanel />
        <ChecklistPanel />
        <AttachmentsPanel />
        <DependencyPanel />
        <ReviewPanel />
        <ApprovalPanel />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  titleContainer: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  panelContainer: {
    marginVertical: 15,
    backgroundColor: '#F2F4F5',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  panelSection: {
    flex: 1,
    padding: 10,
  },
  phaseTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});

export default withTheme(PlanningDetails);
