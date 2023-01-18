import StructureSelector from 'components/Molecules/StructureSelector';
import React from 'react';
import {View} from 'react-native';

function StructurePreview(props) {
  const {navigation} = props;
  return (
    <View>
      <StructureSelector
        hideTitle
        onSelectStructure={() => navigation.navigate('TowerPreview')}
        projectTypes={[1, 2, 3, 4, 5, 6]}
        // activeTypes={activeTypes}
      />
    </View>
  );
}
export default StructurePreview;
