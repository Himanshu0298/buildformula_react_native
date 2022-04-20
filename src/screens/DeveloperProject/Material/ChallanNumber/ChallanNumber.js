import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import Header from '../CommonComponents/Header';

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
