import RenderInput from 'components/Atoms/RenderInput';
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Checkbox, Button, Title} from 'react-native-paper';

const AddComments = () => {
  const [comment, setComment] = useState('');
  const [check, setCheck] = useState(false);

  const handleChange = text => {
    setComment(text);
  };

  return (
    <View style={{flexGrow: 1, justifyContent: 'space-between'}}>
      <View>
        <Title style={{marginLeft: 10, marginTop: 20}}>Add comment</Title>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Checkbox
            status={check ? 'checked' : 'unchecked'}
            onPress={() => {
              setCheck(!check);
            }}
          />
          <Text>Mark as important</Text>
        </View>
        <RenderInput
          name="remarks"
          multiline
          numberOfLines={8}
          label={'Add Comment'}
          containerStyles={styles.input}
          value={comment}
          onChangeText={handleChange}
          // onBlur={handleBlur('remarks')}
          // onSubmitEditing={handleSubmit}
          returnKeyType="done"
        />
      </View>
      <View style={styles.actionContainer}>
        <Button
          mode="contained"
          contentStyle={{padding: 3}}
          theme={{roundness: 15}}>
          Save
        </Button>
      </View>
    </View>
  );
};

export default AddComments;

const styles = StyleSheet.create({
  input: {
    paddingVertical: 7,
    padding: 10,
  },
});
