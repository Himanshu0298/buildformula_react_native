import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React, {useRef, useEffect, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  RefreshControl,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import {
  IconButton,
  Subheading,
  Text,
  FAB,
  withTheme,
  Divider,
  Caption,
  Headline,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../../../styles/theme';
import Header from '../CommonComponents/Header';
import {OrderNo} from '../MaterialUtility/MaterialUtility';

const Detail = () => {
  return (
    <View>
      <Text style={{color: 'grey'}}>Challan Number</Text>
      <Text>90</Text>
    </View>
  );
};

// const Images = () => {
//   const images = [1, 2, 3, 4, 5];

//   return (
//     <View>
//       <Text style={{color: 'grey'}}>Challan Images</Text>
//       {images.map((item, index) => {
//         return (
//           <Image
//             // style={styles.stretch}
//             source={demo}
//           />
//         );
//       })}
//     </View>
//   );
// };

const ChallanNumber = props => {
  return (
    <View style={{padding: 20}}>
      <Header title="Challan Number" {...props} />
      <Detail />
    </View>
  );
};

export default ChallanNumber;
