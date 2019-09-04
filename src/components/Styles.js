import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  editText: {
    // alignSelf: 'flex-start',
    color: 'black',
    marginBottom: 20,
    marginTop: 5,
    borderBottomColor: 'grey',
    borderBottomWidth: 2
  },
  mediumTextInputFont: {
    fontSize: 18
  },
  smallTextInputFont: {
    fontSize: 16
  },
  multiline: {
    textAlignVertical: 'top'
  },
  bold: {
    fontWeight: 'bold'
  }
});
