import Layout from 'utils/Layout';
import SheetHeader from 'components/Atoms/SheetHeader';
import banner from 'assets/images/vshwanLogo.png';
import image from 'assets/images/buildings.png';
import React from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import {
  Image,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const BANNER_WIDTH = Layout.window.width * 0.75;
const BANNER_HEIGHT = BANNER_WIDTH * (3 / 12);

const MARGIN_TOP = 40;
const IMAGE_WIDTH = Layout.window.width * 0.75;
const IMAGE_HEIGHT = IMAGE_WIDTH * (15 / 22);

const SNAP_POINTS = [
  Layout.window.height - (BANNER_HEIGHT + MARGIN_TOP),
  Layout.window.height - (BANNER_HEIGHT + (IMAGE_HEIGHT + MARGIN_TOP)),
];

const AuthLayout = props => {
  const {bottomSheetRef, renderContent, renderImage, renderHeader} = props;

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      style={styles.container}>
      <View style={styles.container}>
        <View style={styles.topImageContainer}>
          <View style={styles.bannerContainer}>
            <Image source={banner} style={styles.banner} />
          </View>
          {renderImage ? (
            renderImage()
          ) : (
            <View style={styles.imageContainer}>
              <Image source={image} style={styles.image} />
            </View>
          )}
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={SNAP_POINTS}
          initialSnap={1}
          renderHeader={renderHeader || (() => <SheetHeader />)}
          renderContent={renderContent}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topImageContainer: {
    flexGrow: 1,
  },
  bannerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  banner: {
    marginTop: MARGIN_TOP,
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
});

export default AuthLayout;
