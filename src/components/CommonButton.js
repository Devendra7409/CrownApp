import { ActivityIndicator, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';

const CommonButton = ({ title, onPress, colors, loading, disabled,style = {}, }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: disabled ? '#ccc' : colors[0] },style,]}
      onPress={onPress}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CommonButton;






// import React from 'react';
// import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// const CommonButton = ({
//   title,
//   onPress,
//   backgroundColor = '#333',
//   textColor = '#fff',
//   disabled = false,
//   style = {},
// }) => {
//   return (
//     <TouchableOpacity
//       style={[
//         styles.button,
//         { backgroundColor: disabled ? '#ccc' : backgroundColor },
//         style,
//       ]}
//       onPress={onPress}
//       disabled={disabled}
//     >
//       <Text style={[styles.text, { color: textColor }]}>{title}</Text>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     borderRadius: 8,
//     padding: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 10,
//   },
//   text: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default CommonButton;