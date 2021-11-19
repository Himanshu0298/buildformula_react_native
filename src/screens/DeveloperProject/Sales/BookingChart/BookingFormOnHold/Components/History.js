import React from 'react';
import {StyleSheet, View} from 'react-native';
import {withTheme, Text, IconButton, Avatar, Caption} from 'react-native-paper';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';

function RenderSingleHistory(props) {
  const {navigation} = props;

  return (
    <>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Avatar.Image size={50} />
          <View style={{marginLeft: 10}}>
            <Text>random Text</Text>
            <Caption>At 2 june 2021</Caption>
          </View>
        </View>
      </View>
    </>
  );
}

function History(props) {
  const {navigation, route} = props;
  const {params = {}} = route;

  return (
    <ProjectLayout {...props} showTimer={true}>
      <View style={{padding: 15}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconButton
            icon="keyboard-backspace"
            onPress={() => navigation.goBack()}
          />
          <Text>History & Activities</Text>
        </View>
        <RenderSingleHistory />
      </View>
    </ProjectLayout>
  );
}

const styles = StyleSheet.create({
  inputsContainer: {
    flexGrow: 3,
  },
});

export default withTheme(History);
