import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {
  Dialog,
  Portal,
  IconButton,
  Divider,
  withTheme,
} from 'react-native-paper';
import HoldBanner from 'assets/images/HoldBanner.png';
import BookBanner from 'assets/images/BookBanner.png';
import {theme} from 'styles/theme';

function Option({data, onPress}) {
  return (
    <View style={styles.optionContainer}>
      <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <Image source={data.image} style={styles.optionImage} />
      </TouchableOpacity>
      <Text style={styles.subTitle}>{data.subTitle}</Text>
    </View>
  );
}

function UnitBookingDialog(props) {
  const {visible, toggleDialog, handleBook, handleHold} = props;

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleDialog} style={styles.dialog}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Select an option to proceed </Text>
          <IconButton
            icon="close"
            size={15}
            color="white"
            onPress={toggleDialog}
            style={{backgroundColor: theme.colors.red}}
          />
        </View>
        <Divider style={styles.divider} />
        <View style={styles.contentContainer}>
          <Option
            data={{
              title: 'Book',
              subTitle:
                "Great! You've got new customer who is excited to buy this property.",
              image: BookBanner,
            }}
            onPress={handleBook}
          />
          <Option
            data={{
              title: 'Hold',
              subTitle:
                "Great! You've got new customer who is excited to buy this property.",
              image: HoldBanner,
            }}
            onPress={handleHold}
          />
        </View>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#EAECF1',
    marginBottom: 15,
  },
  heading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionImage: {
    width: 150,
    height: 121,
  },
  divider: {
    backgroundColor: '#D6D3D3',
    height: 2,
  },
  optionContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    marginVertical: 10,
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 13,
  },
});

export default withTheme(UnitBookingDialog);
