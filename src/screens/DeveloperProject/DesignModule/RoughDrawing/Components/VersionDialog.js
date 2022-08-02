import React from 'react';
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
import {theme} from 'styles/theme';
import NoResult from 'components/Atoms/NoResult';

function VersionFile(props) {
  const {modulePermissions, version, countVersion, handleDeleteVersion} = props;

  const snackbar = useSnackbar();

  const [versionMenu, setVersionMenu] = React.useState(false);
  const [downloading, setDownloading] = React.useState(false);
  const [downloaded, setDownloaded] = React.useState(false);

  React.useEffect(() => {
    if (version?.title) {
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
          <View style={styles.currentVersion}>
            <Text style={styles.text}>
              {!countVersion ? 'Current Version' : `Version ${countVersion}`}
            </Text>
            <Text numberOfLines={1} style={styles.text}>
              By {version?.user_id}
            </Text>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.versionDate}>
            <Text style={styles.date}>
              {dayjs(version?.created).format('DD MMM YYYY')}
            </Text>
            {downloading ? (
              <ActivityIndicator color={theme.colors.primary} />
            ) : downloaded ? (
              <Button
                compact
                labelStyle={styles.buttonLabelStyle}
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
                <Menu.Item
                  icon="delete"
                  onPress={() =>
                    handleDeleteVersion(
                      version,
                      !countVersion ? 'current' : 'version',
                    )
                  }
                  title="Delete"
                />
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
    modulePermissions,
    modalContent,
    versionData,
    handleNewVersionUpload,
    handleDeleteVersion,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.versionHeading}>
        <Subheading style={{color: theme.colors.primary}}>Versions</Subheading>
        {modulePermissions?.editor || modulePermissions?.admin ? (
          <Button
            uppercase={false}
            mode="contained"
            compact
            labelStyle={styles.labelStyle}
            onPress={() => handleNewVersionUpload(modalContent.id)}>
            Add New Version
          </Button>
        ) : null}
      </View>
      {versionData.length ? (
        <View>
          {versionData?.map((version, index) => (
            <VersionFile
              {...props}
              version={version}
              key={index}
              countVersion={index}
              handleDeleteVersion={handleDeleteVersion}
            />
          ))}
        </View>
      ) : (
        <NoResult title="No Data found!" />
      )}
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
  currentVersion: {
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  versionDate: {
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  labelStyle: {
    fontSize: 12,
  },
  buttonLabelStyle: {
    fontSize: 13,
    marginVertical: 3,
  },
});

export default VersionDialog;
