import {Alert, Platform, ToastAndroid} from 'react-native';
import {Async_Keys, getData} from '../utils';
import {BASE_URL} from './url';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAuthToken = async key => {
  const accesstoken = await getData(key);
  if (accesstoken != null) {
    return {
      Authorization: `Bearer ${accesstoken}`,
    };
  }
  return {};
};

const loginAgain = navigation => {
  Platform.OS === 'android' &&
    ToastAndroid.showWithGravityAndOffset(
      'Session expired!',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  AsyncStorage.clear();
};

export async function PostApiWithAuthorization(url, body) {
  const Authorization = await getAuthToken(Async_Keys.ACCESS_TOKEN);
  const actualUrl = BASE_URL + url;
  return await fetch(actualUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...Authorization,
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
    })
    .then(([statusCode, data]) => {
      console.log('PostApiToken_Data', statusCode, data);
      return {data, statusCode};
    })
    .catch(error => {
      console.error(error);
    });
}



export async function GetApiWithAuthorization(url, navigation) {
  const Authorization = await getAuthToken(Async_Keys.ACCESS_TOKEN);
  const actualUrl = BASE_URL + url;
  return await fetch(actualUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...Authorization,
    },
  })
    .then(async response => {
      const statusCode = response.status;
      const data = await response.json();
      console.log('🚀 ~ GetApiWithAuthorization ~ data:', actualUrl, data);

      if (statusCode === 401) {
        loginAgain(navigation);
        return;
      }
      return {statusCode, data}; // Return both status code and data
    })
    .catch(error => {
      console.error(error);
      throw error; // Rethrow the error to be caught in the catch block outside
    });
}

export async function DeleteApiWithAuthorization(url) {
  const Authorization = await getAuthToken(Async_Keys.ACCESS_TOKEN);
  const actualUrl = BASE_URL + url;
  return await fetch(actualUrl, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...Authorization,
    },
  })
    .then(response => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
    })
    .then(([statusCode, data]) => {
      console.log('DeleteApi_Data', statusCode, url, data);
      return data;
    })
    .catch(error => {
      console.error(error);
    });
}

export async function GetApi(url) {
  const actualUrl = BASE_URL + url;
  return await fetch(actualUrl)
    .then(response => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
    })
    .then(([statusCode, data]) => {
      console.log('GetApi_Data', statusCode, data);
      if (statusCode === 401) {
        Alert.alert('Session Expired!', 'Please login again', [
          {
            text: 'Ok',
            onPress: () => loginAgain(),
            style: 'cancel',
          },
        ]);
      }
      return data;
    })
    .catch(error => {
      console.error(error);
    });
}

export async function PostApi(url, body) {
  const actualUrl = BASE_URL + url;
  console.log('🚀 ~ PostApi ~ actualUrl:', actualUrl);
  return await fetch(actualUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
    })
    .then(([statusCode, data]) => {
      console.log('PostApi_Data', statusCode, data, actualUrl, body);
      return {statusCode, data};
    })
    .catch(error => {
      console.error(error);
    });
}

export async function PutApiWithAuthorization(url, body) {
  const Authorization = await getAuthToken(Async_Keys.ACCESS_TOKEN);

  const actualUrl = BASE_URL + url;
  return await fetch(actualUrl, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...Authorization,
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
    })
    .then(([statusCode, data]) => {
      console.log('PutApiToken_Data', statusCode, data);
      return {statusCode, data};
    })
    .catch(error => {
      console.error(error);
    });
}

export async function PostApiFormdata(url, body) {
  const Authorization = await getAuthToken(Async_Keys.ACCESS_TOKEN);
  const actualUrl = BASE_URL + url;

  console.log('PostApiFormdata', actualUrl, body);
  const formData = new FormData();
  if (body.hasOwnProperty('file')) {
    let file = body.file;
    let getFilename = file.uri.split('/');
    let name = file?.name
      ? file.name
      : file.fileName == null
      ? getFilename[getFilename.length - 1]
      : file.fileName;
    formData.append('file', {
      name: name,
      size: file.fileSize,
      type: file.type,
      uri:
        Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
    });
  }
  let object = body;
  object.hasOwnProperty('file') && delete object.file;
  for (const x in object) {
    formData.append(x, object[x]);
  }

  console.log('formData= ', JSON.stringify(formData));
  return await fetch(actualUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      ...Authorization,
    },
    body: formData,
  })
    .then(response => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
    })
    .then(([statusCode, data]) => {
      console.log('PostApiForm_Data', statusCode, data);
      return data;
    })
    .catch(error => {
      console.error(error);
    });
}