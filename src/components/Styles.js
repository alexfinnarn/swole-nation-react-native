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
    // marginBottom: 20,
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

export const home = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginTop: 6,
    marginBottom: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  sectionHeaderText: {
    flex: 1,
    fontSize: 18,
    // padding: 10
  },
  actionButton: {
    alignSelf: 'stretch',
    flex: 1,
  },
  actionButtonText: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 20
  },
  sectionLeft: {
    flex: 4,
    padding: 10,
    flexDirection: 'column'
  }
});
