import AsyncStorage from '@react-native-async-storage/async-storage';

export const Async_Keys = {
  USER_DATA: 'USER_DATA',
  ISLOGGEDIN: 'ISLOGGEDIN',
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
};

export const setData = async (key, value) => {
  try {
    console.log(key, value);
    if (value) {
      let tempval = JSON.stringify(value);
      await AsyncStorage.setItem(key, tempval);
    }
  } catch (error) {
    console.error(error, 'AsyncStorage');
  }
};

export const getData = async key => {
  try {
    let value = await AsyncStorage.getItem(key);
    if (value) {
      let newvalue = JSON.parse(value);
      return newvalue;
    } else {
      return value;
    }
  } catch (error) {
    console.error(error, 'AsyncStorage');
  }
};

export function generateRandomId() {
  const hexDigits = '0123456789abcdef';
  let id = '';

  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      id += '-';
    } else if (i === 14) {
      id += '4'; // Set the 14th character to '4'
    } else if (i === 19) {
      const randomDigit = Math.floor(Math.random() * 4); // Generate a random digit (0-3)
      id += hexDigits[randomDigit]; // Use the random digit
    } else {
      const randomDigit = Math.floor(Math.random() * 16); // Generate a random hexadecimal digit (0-15)
      id += hexDigits[randomDigit]; // Use the random hexadecimal digit
    }
  }

  return id;
}

export function replacePlaceholders(text, values) {
  if (!text) return;
  // Use a regular expression to find and replace placeholders
  return text.replace(/\{\{(\d+)\}\}/g, (match, index) => {
    const value = values[index - 1]; // Values are 0-based
    return value !== undefined ? value : match; // Replace with the value or keep the placeholder
  });
}

export function checkMediaType(fileName) {
  const imageFileExtensions =
    /(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.svg|\.webp|\.tiff)$/i;
  const videoFileExtensions =
    /(\.mp4|\.mov|\.avi|\.mkv|\.flv|\.webm|\.wmv|\.mpg|\.mpeg|\.3gp)$/i;
  const documentFileExtensions =
    /(\.pdf|\.doc|\.docx|\.ppt|\.pptx|\.xls|\.xlsx|\.txt)$/i;

  if (imageFileExtensions.test(fileName)) {
    return 'image';
  } else if (videoFileExtensions.test(fileName)) {
    return 'video';
  } else if (
    documentFileExtensions.test(
      fileName.includes('\n\n') ? fileName.split('\n\n')[0] : fileName,
    )
  ) {
    return 'document';
  } else {
    return 'text';
  }
}

export const onPressAttachment = async file => {
  // try {
  //   const result = await DocumentPicker.pick({
  //     type:
  //       file === 'IMAGE'
  //         ? [DocumentPicker.types.images]
  //         : file === 'VIDEO'
  //         ? [DocumentPicker.types.video]
  //         : [DocumentPicker.types.allFiles],
  //     presentationStyle: 'fullScreen',
  //   });
  //   // You can store or process the selected file as needed
  //   return result[0];
  // } catch (err) {
  //   if (DocumentPicker.isCancel(err)) {
  //     // User canceled the picker
  //   } else {
  //     throw err;
  //   }
  // }
};

export const getMediaMsg = (message, userId) => {
  const isReciever = message.SentBy === 'agent';
  return {
    _id: message.id || generateRandomId(),
    image: message.MessageType == 'image' ? message.MediaUrl : '', //await mediaURL(message.media),
    video: message.MessageType == 'video' ? message.MediaUrl : '',
    text:
      message.MessageType === 'image' ||
      message.MessageType === 'text' ||
      message.MessageType === 'event' ||
      message.MessageType === 'video' ||
      message.MessageType === 'template' || //todo: handle template containing image
      message.MessageType === 'button'
        ? message.Text
        : message.MediaUrl + '\n\n' + message.Text,
    createdAt: message.created_at,
    user: {
      _id: isReciever ? userId : 0,
      name: message.SenderName,
    },
    system: message.MessageType == 'event' ? true : false,
    sent: isReciever ? message?.Statuses?.sent?.isPresent ?? false : false,
    received: isReciever
      ? message?.Statuses?.delivered?.isPresent ?? false
      : false,
    pending: isReciever ? message?.Statuses?.read?.isPresent ?? false : false,
  };
};

export const extractFileName = file => {
  const newFile = file.split('\n\n');
  const parts = newFile[0].split('/');
  const fileName = parts[parts.length - 1];
  return fileName;
};

export function formatTimestamp(timestamp) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const date = new Date(timestamp);
  const diffDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // Current date timestamp: Show its time
    return date.toLocaleTimeString();
  } else if (diffDays < 7) {
    // Past 7 days timestamp: Show day name
    return daysOfWeek[date.getDay()];
  } else {
    // Rest: Show DD/MM format
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
  }
}

export const calculateAge = selectedDate => {
  const today = new Date();
  const birthDate = new Date(selectedDate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

export const transformArrayToObject = array => {
  if (!Array.isArray(array)) {
    return array;
  }
  return array.reduce((acc, curr) => {
    acc[curr.status] = curr.count;
    return acc;
  }, {});
};

export function cropStringAfterLastColon(str) {
  const lastColonIndex = str.lastIndexOf(':');
  if (lastColonIndex === -1) {
    return str; // Return the original string if no colon is found
  }
  return str.substring(0, lastColonIndex);
}