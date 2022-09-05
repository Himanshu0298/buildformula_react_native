import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import CustomCheckbox from 'components/Atoms/CustomCheckbox';
import SearchDropdown from 'components/Atoms/SearchDropdown';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Caption, Divider, Text, withTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from 'styles/theme';

const CHECKLIST_DATA = [
  {title: 'Rohan Sharma', email: 'rohan@gmail.com', status: true},
  {title: 'Jay Solanki', email: 'rohan@gmail.com', status: true},
  {title: 'Prem Patel', email: 'rohan@gmail.com', status: true},
];

function ShareTask(props) {
  const {navigation} = props;

  const [addItemIndex, setAddItemIndex] = useState();
  const [checklists, setChecklists] = useState(CHECKLIST_DATA);

  const toggleAddItem = v => setAddItemIndex(v);

  const toggleItemStatus = (checklistIndex, itemIndex) => {
    const _checklists = cloneDeep(checklists);
    const {status} = _checklists[checklistIndex].items[itemIndex];
    _checklists[checklistIndex].items[itemIndex].status = !status;

    setChecklists(_checklists);
  };

  return (
    <View style={styles.container}>
      <Text style={{color: '#005BE4', fontSize: 15, paddingTop: 10}}>
        Share Task
      </Text>
      <View style={styles.closeButton}>
        <View style={{marginRight: 10}}>
          <OpacityButton
            opacity={0.1}
            color={theme.colors.primary}
            style={{borderRadius: 50}}>
            <MaterialCommunityIcons
              name="check"
              size={17}
              color={theme.colors.primary}
            />
          </OpacityButton>
        </View>
        <View>
          <OpacityButton
            opacity={0.1}
            color={theme.colors.error}
            style={{borderRadius: 50}}>
            <MaterialCommunityIcons
              name="close"
              size={17}
              color={theme.colors.error}
              onPress={navigation.goBack}
            />
          </OpacityButton>
        </View>
      </View>
      <View style={{marginTop: 30}}>
        <Caption style={{fontSize: 15, paddingBottom: 10}}>
          Enter person name to share
        </Caption>
        <SearchDropdown
          placeholder="label_search_peoples"
          // options={visitorOptions}
          // searchQuery={visitorSearchText}
          // selected={values.selectedVisitor}
          // onSelect={setSelectedVisitor}
          // onChangeText={setVisitorSearchText}
        />
      </View>
      <View style={{marginTop: 30}}>
        {CHECKLIST_DATA.map((item, index) => {
          return (
            <View>
              <CustomCheckbox
                label={item.title}
                checked={item.status}
                onChange={() => toggleItemStatus(index, index)}
              />
              <Caption style={{marginLeft: 40, paddingBottom: 10}}>
                {item.email}
              </Caption>
              <Divider />
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default withTheme(ShareTask);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 15,
  },

  closeButton: {
    margin: 10,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    position: 'absolute',
  },
});
