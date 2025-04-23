import {Dimensions, PixelRatio, Platform} from 'react-native';

import NetInfo from '@react-native-community/netinfo';
// based on iphone 5s's scale
const {height, width} = Dimensions.get('window');
let scale = width / 320;
  let orientation = 'PORTRAIT'; //LANDSCAPE
  let maxWidth = 428;

  const rem = size => { 
    let divisor = orientation === 'PORTRAIT' ? width : height;
    return Math.floor(size * (divisor / maxWidth))  
  };

function normalizeSize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else if (Platform.OS === 'web') {
    scale = width / 1024;
    return size + 2;
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

function isIphoneXorAbove() {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (height === 812 || width === 812 || height === 896 || width === 896)
  );
}

const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    return isIphoneXorAbove() ? 44 : 20;
  } else if (Platform.OS === 'android') {
    return 20;
  } else {
    return 0;
  }
};

const CheckNet = async () => {
  // return false;
  const value = await NetInfo.fetch().then(val => {
    return val.isConnected;
  });
  return value;
};

const validateEmail = email => {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const validatePhone = val => {
  var re = /^\d{9,10}$/;
  return re.test(val);
};

const validateChar = val => {
  var re = /[^a-zA-Z_ ]/;
  // var re= /^[a-zA-Z]/;
  return re.test(val);
};

const validateDigit = val => {
  var re = /^\d/;
  return re.test(val);
};

const validateOTP = val => {
  var re = /^\d{6}$/;
  return re.test(val);
};

//Check atleast one digit
const validatePass = val => {
  var re = /^.*[0-9].*$/;
  return re.test(val);
};

//Check at least one letter
const validateOneLetter = val => {
  var re = /[a-zA-Z]/;
  return re.test(val);
};

const validateExpression = val => {
  let re = /\W|_/g;
  return re.test(val);
};

const validateTwoSpecialChar = val => {
  var re = /^.*?[\W_].*[\W_].*$/;
  return re.test(val);
};

const CapitalizeName = name => {
  let i = 0;
  let val = true;
  let localname = '';
  let Name = '';
  if (name) {
    Name = name.toString();
  }
  if (Name) {
    for (i = 0; i < Name.length; i++) {
      if (val) {
        let v = Name.substring(i, i + 1)
          .charAt(0)
          .toUpperCase();
        localname = localname + v;
        val = false;
      } else {
        localname = localname + Name.substring(i, i + 1);
      }
      if (Name.substring(i, i + 1) == ' ') {
        val = true;
      }
    }
  } else {
    localname = '';
  }
  return localname;
};

export {
  rem,
  normalizeSize,
  getStatusBarHeight,
  CheckNet,
  validateEmail,
  validatePhone,
  validatePass,
  validateChar,
  validateExpression,
  validateOTP,
  validateOneLetter,
  validateTwoSpecialChar,
  validateDigit,
  CapitalizeName,
};