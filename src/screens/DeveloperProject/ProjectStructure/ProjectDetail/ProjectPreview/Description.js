import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Caption, IconButton, Subheading} from 'react-native-paper';

function Description(props) {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerWrapper}>
        <IconButton
          icon="keyboard-backspace"
          size={18}
          color="#4872f4"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Subheading>Description</Subheading>
      </View>
      <Caption>
        ATS Casa Espana in Sector-121, Mohali is a ready-to-move housing
        society. It offers apartments and villas in varied budget range. These
        units are a perfect combination of comfort and style, specifically
        designed to suit your requirements and conveniences. There are 3BHK,
        4BHK and 5BHK Apartments and 3BHK villas available in this project. This
        housing society is now ready to be called home as families have started
        moving in. Check out some of the features of ATS Casa Espana housing
        society: *ATS Casa Espana Sector-121 has 11 towers, with 25 floors each
        and 580 units on offer. *Spread over an area of 25 acres, ATS Casa
        Espana is one of the spacious housing societies in the Mohali region.
        With all the basic amenities available, ATS Casa Espana fits into your
        budget and your lifestyle. *Sector-121 has good connectivity to some of
        the important areas in the proximity such as Dr B R Ambedkar State
        Institute, PTU Nalanda School of TQM and Khalsa College Mohali Of
        Technology and so on. ATS Casa Espana Price List If you are looking for
        ready to move projects, ATS Casa Espana is a right choice for you. Here,
        a 3BHK Apartment is available at a starting price of Rs. 1.24 Cr while a
        4BHK Apartment is offered at Rs. 1.65 Cr onwards. For a 5BHK Apartment
        at ATS Casa Espana, you will need to spend at least Rs. 2.5 Cr. Those
        who are looking for investment opportunities in ATS Casa Espana may find
        it worthy from a long-term perspective to earn rental income.
      </Caption>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    margin: 10,
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },
});

export default Description;
