import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {
  Caption,
  Divider,
  Title,
  Dialog,
  Portal,
  Button,
} from 'react-native-paper';
import {theme} from 'styles/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RenderHtml from 'react-native-render-html';
import Layout from 'utils/Layout';
import RenderInput from 'components/Atoms/RenderInput';

function SingleUnit(props) {
  const {sectionLeft, sectionRight} = props;
  return (
    <View style={{flexDirection: 'row', marginBottom: 10}}>
      <View
        style={{
          borderRightWidth: 1,
          borderRightColor: 'grey',
          flexDirection: 'row',
          paddingRight: 10,
        }}>
        <Text style={{color: 'grey'}}>{sectionLeft.label}: </Text>
        <Text>{sectionLeft.value} </Text>
      </View>
      <View style={{flexDirection: 'row', marginLeft: 10}}>
        <Text style={{color: 'grey'}}>{sectionRight.label}: </Text>
        <Text>{sectionRight.value} </Text>
      </View>
    </View>
  );
}

const DealsClosed = props => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const {dealsClosed, navigation} = props;

  const handleRemarkPress = remark => {
    navigation.navigate('Remark', {remark});
  };

  return (
    <ScrollView>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{borderRadius: 20, padding: 20}}>
          <View>
            <Text style={{color: '#4872f4', fontSize: 15}}>
              Brokerage Amount
            </Text>
            <RenderInput />
            <Dialog.Actions style={{marginTop: 10}}>
              <Button style={{marginRight: 20}} onPress={() => hideDialog()}>
                Cancel
              </Button>
              <Button onPress={() => console.log('Ok')}>Ok</Button>
            </Dialog.Actions>
          </View>
        </Dialog>
      </Portal>

      {dealsClosed?.map(value => {
        const remark = value.Remark;

        console.log(value);

        const isHtml = remark?.includes('<') && remark?.includes('>');

        return (
          <View
            style={{
              borderWidth: 1,
              marginTop: 20,
              borderColor: '#C3C3C3',
              margin: 10,
              borderRadius: 5,
            }}>
            <View style={{padding: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}>
                <Title>Property</Title>
                <Caption>{value.booking_date}</Caption>
              </View>
              <SingleUnit
                sectionLeft={{label: 'Type', value: value.projectType}}
                sectionRight={{label: 'Tower', value: value.Tower}}
              />
              <SingleUnit
                sectionLeft={{label: 'Floor', value: value.Floor}}
                sectionRight={{label: 'Unit', value: value.Unitnumber}}
              />
            </View>
            <Divider style={{height: 2}} />
            <View
              style={{
                paddingHorizontal: 10,
                paddingTop: 20,
                paddingBottom: 20,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text>Remark</Text>
                <OpacityButton
                  color={theme.colors.primary}
                  opacity={0.18}
                  style={{borderRadius: 20, marginLeft: 10, marginBottom: 10}}
                  onPress={() => {
                    handleRemarkPress(remark);
                  }}>
                  <MaterialIcons
                    name="edit"
                    color={theme.colors.primary}
                    size={10}
                  />
                </OpacityButton>
              </View>
              {!isHtml ? (
                <Text style={{marginTop: 10}}>{remark}</Text>
              ) : (
                <RenderHtml
                  source={{html: remark}}
                  contentWidth={Layout.window.width}
                />
              )}
            </View>
            <Divider style={{height: 2}} />
            <View
              style={{
                paddingHorizontal: 10,
                paddingTop: 20,
                paddingBottom: 20,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text>Total Brokerage</Text>
                  <OpacityButton
                    color={theme.colors.primary}
                    opacity={0.18}
                    style={{borderRadius: 20, marginLeft: 10, marginBottom: 10}}
                    onPress={() => {
                      showModal();
                    }}>
                    <MaterialIcons
                      name="edit"
                      color={theme.colors.primary}
                      size={10}
                    />
                  </OpacityButton>
                </View>
                <Text>Total Paid</Text>
              </View>
              <View style={styles.amountBox}>
                <Text style={styles.amnt}>Rs. 175000.00</Text>
                <Text style={styles.amnt}>Rs. 3500.00</Text>
              </View>
            </View>
            <Divider style={{height: 2}} />
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 15,
                alignItems: 'flex-end',
              }}>
              <Button
                direction="rtl"
                style={styles.button}
                mode="outlined"
                contentStyle={styles.buttonLabel}
                icon="chevron-right"
                theme={{roundness: 15}}
                onPress={() => navigation.navigate('DealsClosedDetails')}>
                View more
              </Button>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default DealsClosed;

const containerStyle = {backgroundColor: 'white', padding: 20, flexGrow: 1};

const styles = StyleSheet.create({
  // Button: {
  //   padding: 10,
  //   margin: 10,
  // },
  amountBox: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amnt: {
    color: '#4872f4',
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    width: 130,
  },
});
