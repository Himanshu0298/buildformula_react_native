import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {
  Subheading,
  withTheme,
  Text,
  Button,
  Card,
  Divider,
  IconButton,
  Caption,
} from 'react-native-paper';
import WithRate from 'assets/images/WithRates.png';
import WithOutRates from 'assets/images/WithoutRates.png';
import {STRUCTURE_TYPE_LABELS} from 'utils/constant';
import {getFloorNumber, getTowerLabel} from 'utils';
import {ScrollView} from 'react-native-gesture-handler';

function InfoRow(props) {
  const {data} = props;

  return (
    <View style={styles.rowContainer}>
      {data.map(({title, value}) => (
        <View key={title} style={styles.rowCell}>
          <Caption>{title}: </Caption>
          <Text>{value}</Text>
        </View>
      ))}
    </View>
  );
}

function FormSection(props) {
  const {data, theme, handleClick} = props;
  const {title, subTitle, image, imageStyle} = data;

  return (
    <Card elevation={5} style={styles.optionContainer}>
      <Subheading style={{color: theme.colors.primary}}>{title}</Subheading>
      <Divider style={styles.divider} />
      <Caption>{subTitle}</Caption>
      <View style={styles.actionContainer}>
        <Button mode="contained" onPress={handleClick}>
          {data.ButtonText}
        </Button>

        <Image source={image} style={imageStyle} />
      </View>
    </Card>
  );
}

function BookingMode(props) {
  const {navigation, route} = props;

  const {structureType, selectedStructure, towerId, floorId, unitLabel} =
    route?.params || {};

  const navToBookingDetails = withRate => {
    navigation.navigate('BC_Step_Six', {...route?.params, withRate});
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity
          style={styles.headingContainer}
          onPress={navigation.goBack}>
          <IconButton icon="keyboard-backspace" />
          <Subheading>Booking form</Subheading>
        </TouchableOpacity>
        <Card elevation={5} style={styles.optionCard}>
          <Subheading>Property info</Subheading>
          <Divider style={styles.divider} />
          {towerId ? (
            <>
              <InfoRow
                data={[
                  {
                    title: 'Project type',
                    value:
                      STRUCTURE_TYPE_LABELS[structureType || selectedStructure],
                  },
                  {title: 'Tower', value: getTowerLabel(towerId)},
                ]}
              />
              <InfoRow
                data={[
                  {
                    title: 'Floor',
                    value: floorId ? getFloorNumber(floorId) : null,
                  },
                  {title: 'Unit Number', value: unitLabel},
                ]}
              />
            </>
          ) : (
            <InfoRow
              data={[
                {
                  title: 'Project type',
                  value:
                    STRUCTURE_TYPE_LABELS[structureType || selectedStructure],
                },
                {title: 'Unit Number', value: unitLabel},
              ]}
            />
          )}
        </Card>
        <FormSection
          {...props}
          handleClick={() => navToBookingDetails(true)}
          data={{
            title: 'Form With Rates Section',
            subTitle:
              'This booking form has the dedicated section where you can enter rates for different areas, along with basic amounts and other charges fees.',
            image: WithRate,
            ButtonText: 'Continue with rates',
            imageStyle: {width: 70, height: 70},
          }}
        />
        <FormSection
          {...props}
          handleClick={() => navToBookingDetails(false)}
          data={{
            title: 'Form Without Rates Section',
            subTitle:
              'This booking form does not have a dedicated section where you can enter your booking rate details.',
            image: WithOutRates,
            ButtonText: 'Continue without rates',
            imageStyle: {width: 60, height: 60},
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -10,
  },
  optionCard: {
    padding: 15,
  },
  divider: {
    height: 1,
    marginTop: 2,
    marginBottom: 5,
  },
  rowContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 3,
  },
  rowCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionContainer: {
    marginTop: 20,
    padding: 15,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 15,
  },
});

export default withTheme(BookingMode);
