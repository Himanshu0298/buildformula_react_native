import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import RenderSelect from 'components/Atoms/RenderSelect';
import AddComments from './Components/AddComments';
import AddCallLogs from './Components/AddCallLogs';
import AddFollowUp from './Components/AddFollowUp';
import {SafeAreaView} from 'react-native-safe-area-context';

const AddDetails = props => {
  const {route} = props;
  const {type: selectedType} = route.params || {};

  const assignToRef = React.useRef();

  const [type, setType] = useState(selectedType);

  function renderSwitch() {
    switch (type) {
      case 'Comment':
        return <AddComments {...props} />;
      case 'Call Log':
        return <AddCallLogs {...props} />;
      case 'Follow-up':
        return <AddFollowUp {...props} />;
      default:
        return null;
    }
  }

  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <View style={styles.container}>
        <RenderSelect
          name="assign_to"
          ref={assignToRef}
          label={'Select'}
          options={['Comment', 'Call Log', 'Follow-up']}
          containerStyles={styles.input}
          value={type}
          onSelect={v => setType(v)}
        />
        {renderSwitch()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
});

export default AddDetails;
