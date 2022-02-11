import React, {useMemo} from 'react';
import {StyleSheet, View, Image, ActivityIndicator} from 'react-native';
import {
  IconButton,
  Text,
  Menu,
  Divider,
  Button,
  Subheading,
} from 'react-native-paper';
import PdfIcon from 'assets/images/pdf_icon.png';
import dayjs from 'dayjs';
import {getDownloadUrl, downloadFile, checkDownloaded} from 'utils/download';
import {useSnackbar} from 'components/Atoms/Snackbar';
import FileViewer from 'react-native-file-viewer';

function VersionFile(props) {
  const {theme, modulePermissions, version, countVersion} = props;

  const snackbar = useSnackbar();

  const [versionMenu, setVersionMenu] = React.useState(false);
  const [downloading, setDownloading] = React.useState(false);
  const [downloaded, setDownloaded] = React.useState(false);

  React.useEffect(() => {
    if (version?.file_name) {
      setDownloading(false);
      checkDownloaded(version).then(result => {
        setDownloaded(result);
      });
    }
  }, [version]);

  const toggleDownloading = () => setDownloading(v => !v);
  const toggleVersionMenu = () => setVersionMenu(v => !v);

  const handleDownload = async () => {
    toggleVersionMenu();
    toggleDownloading();
    const fileUrl = getDownloadUrl(version, true);
    const {dir} = await downloadFile(version, fileUrl);
    snackbar.showMessage({message: 'File Downloaded Successfully!'});
    setDownloaded(dir);
    toggleDownloading();
  };

  const openFile = filePath => {
    filePath = filePath || downloaded;
    console.log('-----> open path', filePath);
    FileViewer.open(filePath);
  };

  return (
    <View>
      <View style={styles.versionFiles}>
        <View style={styles.sectionContainer}>
          <View style={styles.iconContainer}>
            <Image source={PdfIcon} style={styles.pdfIcon} />
          </View>
          <View
            style={{
              flexGrow: 1,
              justifyContent: 'space-around',
            }}>
            <Text style={styles.text}>
              {!countVersion ? 'Current Version' : `Version ${countVersion}`}
            </Text>
            <Text numberOfLines={1} style={styles.text}>
              By {version?.first_name} {version?.last_name}
            </Text>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View
            style={{
              flexGrow: 1,
              justifyContent: 'space-around',
              alignItems: 'flex-end',
            }}>
            <Text style={styles.date}>
              {dayjs(version?.created).format('DD MMM YYYY')}
            </Text>
            {downloading ? (
              <ActivityIndicator color={theme.colors.primary} />
            ) : downloaded ? (
              <Button
                compact
                labelStyle={{fontSize: 13, marginVertical: 3}}
                onPress={() => openFile()}>
                Open
              </Button>
            ) : null}
          </View>
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
      <Divider />
    </View>
  );
}

function VersionDialog(props) {
  const {
    theme,
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
        <Subheading style={{color: theme.colors.primary}}>Versions</Subheading>
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
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  pdfIcon: {
    width: 38,
    height: 38,
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
