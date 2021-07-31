import React, {useMemo} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {IconButton, Text, Menu, Divider, Button} from 'react-native-paper';
import PdfIcon from 'assets/images/pdf_icon.png';
import dayjs from 'dayjs';
import {theme} from 'styles/theme';

function VersionFile(props) {
  const {modulePermissions, version, countVersion, handleDownload} = props;
  const [versionMenu, setVersionMenu] = React.useState(false);

  const toggleVersionMenu = () => setVersionMenu(v => !v);

  return (
    <View>
      <View style={styles.versionFiles}>
        <View style={styles.sectionContainer}>
          <Image source={PdfIcon} style={styles.PdfIcon} />
          <View>
            {countVersion === 0 ? (
              <Text style={styles.text}>Current Version</Text>
            ) : (
              <Text style={styles.text}>Version {countVersion}</Text>
            )}
            <Text numberOfLines={1} style={styles.text}>
              By {version?.first_name} {version?.last_name}
            </Text>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View>
            <Text style={styles.date}>
              {dayjs(version?.created).format('DD MMM YYYY')}
            </Text>
          </View>
          <View>
            <Menu
              visible={versionMenu}
              onDismiss={toggleVersionMenu}
              anchor={
                <IconButton icon="dots-vertical" onPress={toggleVersionMenu} />
              }>
              <Menu.Item
                icon="download"
                onPress={() => handleDownload()}
                title="Download"
              />
              {modulePermissions?.editor || modulePermissions?.admin ? (
                <>
                  <Divider />
                  <Menu.Item icon="delete" onPress={() => {}} title="Delete" />
                </>
              ) : null}
            </Menu>
          </View>
        </View>
      </View>
      <Divider />
    </View>
  );
}

function VersionDialog(props) {
  const {
    modulePermissions,
    modalContent,
    versionData,
    handleNewVersionUpload,
  } = props;

  const filteredVersion = useMemo(() => {
    return [versionData?.current, ...(versionData?.lists || [])];
  }, [versionData]);

  return (
    <View style={styles.container}>
      <View style={styles.versionHeading}>
        <Text style={{color: theme.colors.primary, fontSize: 18}}>
          Versions
        </Text>
        {modulePermissions?.editor || modulePermissions?.admin ? (
          <Button
            uppercase={false}
            mode="contained"
            compact
            labelStyle={{fontSize: 12}}
            onPress={() => handleNewVersionUpload(modalContent.id)}>
            Add New Version
          </Button>
        ) : null}
      </View>

      <View>
        {filteredVersion?.map((version, index) => (
          <VersionFile
            {...props}
            version={version}
            key={index}
            countVersion={index}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  PdfIcon: {
    width: 38,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  text: {
    color: '#080707',
    paddingHorizontal: 10,
    fontSize: 14,
    alignItems: 'center',
    maxWidth: 170,
  },
  date: {
    color: '#080707',
  },
  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  versionFiles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  versionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
});

export default VersionDialog;
