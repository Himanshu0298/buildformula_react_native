import React, {useRef, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Dialog, Portal, Text} from 'react-native-paper';
import SignatureCapture from 'react-native-signature-capture';

function SignaturePanel(props) {
  const {visible, toggleDialog, onSave} = props;

  const signatureRef = useRef();

  const saveSign = () => signatureRef.current.saveImage();
  const resetSign = () => signatureRef.current.resetImage();

  const _onSaveEvent = result => {
    console.log('-----> result', result);
    onSave(result);
  };
  const _onDragEvent = () => {
    // This callback will be called when the user enters signature
    console.log('dragged');
  };

  return (
    <Portal>
      <Dialog style={{flexGrow: 1}} visible={visible} onDismiss={toggleDialog}>
        <View style={{flex: 1}}>
          <SignatureCapture
            style={[{flex: 1}, styles.signature]}
            ref={signatureRef}
            onSaveEvent={_onSaveEvent}
            onDragEvent={_onDragEvent}
            saveImageFileInExtStorage={false}
            showNativeButtons={false}
            showTitleLabel={false}
            backgroundColor="#ffffff"
            strokeColor="#000000"
            minStrokeWidth={4}
            maxStrokeWidth={4}
            viewMode="portrait"
          />

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.buttonStyle} onPress={saveSign}>
              <Text>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={resetSign}>
              <Text>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#eeeeee',
    margin: 10,
  },
});

export default SignaturePanel;
