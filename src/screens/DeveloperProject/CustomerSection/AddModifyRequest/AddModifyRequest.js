import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, RefreshControl} from 'react-native';
import {withTheme, Divider} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useCustomerActions from 'redux/actions/customerActions';
import ScreenTitle from 'components/Atoms/ScreenTitle';
import DetailsHeader from 'screens/DeveloperProject/CustomerSection/CustomerSection/Components/DetailsHeader';
import {CustomerSection, EngineerSection, ManagerSection} from './Components';

function AddModifyRequest(props) {
  const {route} = props;
  const {params} = route;
  const {unit, project_id} = params;

  const {t} = useTranslation();

  const {addModifyRequest, getModifyRequests} = useCustomerActions();

  const USER_TYPE = 1;
  const STATUS = '';

  const handleRefresh = () => getModifyRequests({project_id});

  const handleCreation = values => {
    const {title, description, files} = values;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('files', files);
    formData.append('project_id', project_id);
    formData.append('unit_id', unit?.id);

    addModifyRequest(formData).then(() => handleRefresh());
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleRefresh} />
        }>
        <ScreenTitle title={t('title_customer_section')} backIcon />

        <DetailsHeader {...route?.params} />
        <Divider style={styles.divider} />
        <CustomerSection
          {...props}
          params={params}
          submitted={STATUS === 'submitted'}
          onSubmit={handleCreation}
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

  divider: {
    marginTop: 8,
    marginBottom: 15,
    borderWidth: 0.2,
    borderColor: 'rgba(139, 149, 159, 0.25)',
  },
});

export default withTheme(AddModifyRequest);
