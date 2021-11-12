import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import {BASE_API_URL} from './constant';
import {store} from 'redux/store';
import * as mime from 'react-native-mime-types';

const {DocumentDir, DownloadDir} = RNFetchBlob.fs.dirs;

const DIR = Platform.OS === 'ios' ? DocumentDir : DownloadDir;

const normalizeFilePath = path =>
  path.startsWith('file://') ? path.slice(7) : path;

const getFileName = name => {
  const split = name.split('.');
  return split[0];
};

const getFileExtension = fileUrl => {
  // To get the file extension
  const fileExt = /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;

  return fileExt[0];
};

function getFilePath(file) {
  const {file_name, file_url} = file;

  const fileName = getFileName(file_name);
  const fileExt = getFileExtension(file_url);

  return DIR + `/${fileName}.${fileExt}`;
}

export async function checkDownloaded(file) {
  const path = getFilePath(file);
  const result = await RNFS.exists(path);
  return result ? path : result;
}

export function getDownloadUrl(file, version) {
  const {id, project_id} = file;
  let url = `files/downloadversoin/${project_id}/current/${id}`;

  if (version) {
    url = `files/downloadversoin/${project_id}/version/${id}`;
  }

  return `${BASE_API_URL}${url}`;
}

export async function downloadFile(file, fileUrl, getBase64) {
  const path = getFilePath(file);

  const {token} = store.getState().user;

  const Authorization = `Bearer ${token}`;

  const options = {
    fileCache: true,
    path,
    addAndroidDownloads: {
      path,
      description: 'downloading file...',
      notification: true,
      // useDownloadManager works with Android only
      useDownloadManager: true,
    },
  };

  const downloaded = await checkDownloaded(file);

  if (downloaded) {
    await RNFS.unlink(path);
  }

  return RNFetchBlob.config(options)
    .fetch('GET', fileUrl, {Authorization})
    .then(async res => {
      // Alert after successful downloading
      console.log('res -> ', JSON.stringify(res));

      const downloadDir = normalizeFilePath(res.data);
      let base64;
      if (getBase64) {
        const base64Data = await RNFS.readFile(downloadDir, 'base64');
        const mimeType = mime.lookup(file.file_name);
        base64 = `data:${mimeType};base64,${base64Data}`;
      }

      return {base64, dir: downloadDir};
    })
    .catch(async error => {
      console.log('-----> error', error);
      throw error;
    });
}
