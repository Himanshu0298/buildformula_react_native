import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  Title,
  withTheme,
  Caption,
  Subheading,
  Portal,
  Dialog,
  Paragraph,
  Button,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';
import splash from 'assets/animation/splash.json';
import LottieView from 'lottie-react-native';
import useAddProjectActions from 'redux/actions/addProjectActions';
import {secondaryTheme} from 'styles/theme';

function RoleBox({title, onSelectPlan, amount, colors}) {
  return (
    <TouchableOpacity
      onPress={() => onSelectPlan(amount)}
      style={styles.roleContainer}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={colors}
        style={styles.roleBox}>
        <Subheading theme={secondaryTheme}>{title}</Subheading>
      </LinearGradient>
    </TouchableOpacity>
  );
}

function PlanSelect(props) {
  const {navigation} = props;
  const [showAlert, setShowAlert] = useState(false);
  const {project, loading} = useSelector(state => state.addProject);
  const {selectPlan} = useAddProjectActions();

  const toggleAlert = () => setShowAlert(v => !v);

  function onSelectPlan(amount) {
    selectPlan({project_id: project.id, amount})
      .then(data => {
        toggleAlert();
      })
      .catch(error => {
        console.log('-----> error', error);
      });
  }

  const handleNext = () => {
    toggleAlert();
    navigation.push('AdminCreation', {adminSignUp: true, adminId: 2});
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent={''} />
      <Title style={{color: '#000'}}>Select Your Plan</Title>
      <Caption style={{color: 'rgba(0, 0, 0, 0.5)'}}>
        Choose your desired plan for the project
      </Caption>
      <RoleBox
        title="Basic Plan"
        colors={['#8C55FE', '#21D4FD']}
        onSelectPlan={onSelectPlan}
        amount={2000}
      />
      <RoleBox
        title="Enhanced Plan"
        colors={['#FA6A88', '#FF9A8B']}
        onSelectPlan={onSelectPlan}
        amount={10000}
      />
      <RoleBox
        title="Advanced Plan"
        colors={['#F5576C', '#F093FB']}
        onSelectPlan={onSelectPlan}
        amount={20000}
      />
      <Portal>
        <Dialog
          visible={showAlert}
          onDismiss={handleNext}
          theme={{roundness: 15}}>
          <Dialog.Content>
            <View style={styles.alertContainer}>
              <View style={styles.splashImage}>
                <LottieView source={splash} autoPlay loop speed={3} />
              </View>
              <Title style={styles.titleText}>Successful!</Title>
              <Paragraph style={styles.subtitleText}>
                First admin was added successfully! Proceed to add second and
                third admins
              </Paragraph>
              <Button
                mode="contained"
                onPress={handleNext}
                style={styles.button}>
                Ok
              </Button>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  roleContainer: {
    flex: 0.22,
    marginVertical: 15,
  },
  roleBox: {
    flex: 1,
    borderRadius: 15,
    padding: 12,
  },
  alertContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 15,
  },
  splashImage: {
    height: 150,
    width: 180,
  },
  titleText: {
    fontWeight: '600',
    marginTop: 20,
  },
  subtitleText: {
    textAlign: 'center',
    color: 'rgba(4, 29, 54, 0.5)',
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
});

export default withTheme(PlanSelect);
