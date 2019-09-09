import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 15
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
  },
  autocompleteContainer: {
    left: 0,
    position: 'absolute',
    right: 50,
    top: 20,
    zIndex: 1
  },
  itemText: {
    fontSize: 18,
    margin: 2
  },
});
