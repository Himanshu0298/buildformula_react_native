import React from 'react';
import {StyleSheet, View} from 'react-native';
import {withTheme, Title, Caption, IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {secondaryTheme} from 'styles/theme';

function FormTitle({title, renderTitle, subTitle, navigation}) {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top', 'left', 'right']}>
        <View style={styles.subContainer}>
          <IconButton
            icon="keyboard-backspace"
            size={22}
            color="#ffff"
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          />
          <Title theme={secondaryTheme}>
            {title || (renderTitle && renderTitle())}
          </Title>
        </View>
        <View style={styles.subTitleContainer}>
          <Caption theme={secondaryTheme}>{subTitle}</Caption>
        </View>
      </SafeAreaView>
    </View>
  );
}

FormTitle.defaultProps = {
  title: 'title',
  renderTitle: undefined,
  subTitle: 'subTitle',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4872F4',
    wight: '100%',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTitleContainer: {
    marginLeft: 40,
    paddingBottom: 20,
  },
});

export default withTheme(FormTitle);
