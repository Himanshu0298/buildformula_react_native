import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {Subheading, withTheme, Divider} from 'react-native-paper';
import backArrow from 'assets/images/back_arrow.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DetailsHeader from '../CustomerSection/Components/DetailsHeader';
import {CustomerSection, EngineerSection, ManagerSection} from './Components';

function AddModifyRequest(props) {
  const {navigation, route} = props;
  const {params} = route;
  const {unit, project_id} = params;
  const {t} = useTranslation();

  const USER_TYPE = 2;
  const STATUS = 'submitted';

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <TouchableOpacity
          onPress={navigation.goBack}
          style={styles.titleContainer}>
          <Image source={backArrow} style={styles.backArrow} />
          <Subheading>{t('title_customer_section')}</Subheading>
        </TouchableOpacity>
        <DetailsHeader {...route?.params} />
        <Divider style={styles.divider} />

        <CustomerSection
          {...props}
          {...{params, submitted: STATUS === 'submitted'}}
        />
        {[2, 3].includes(USER_TYPE) ? (
          <EngineerSection
            {...props}
            {...{params, submitted: STATUS === 'reviewed'}}
          />
        ) : null}
        {USER_TYPE === 3 ? (
          <ManagerSection
            {...props}
            {...{
              params,
              submitted: ['rejected', 'approved'].includes(STATUS),
            }}
          />
        ) : null}
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  backArrow: {
    height: 25,
    width: 25,
    marginRight: 5,
  },
  divider: {
    marginTop: 8,
    marginBottom: 15,
    borderWidth: 0.2,
    borderColor: 'rgba(139, 149, 159, 0.25)',
  },
});

export default withTheme(AddModifyRequest);
