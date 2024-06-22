import { useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { View, Text, StyleSheet, Platform } from 'react-native';

type SearchBarComponentProps = {};

const FileSearchBar: React.FunctionComponent<SearchBarComponentProps> = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (searc: any) => {
    setSearch(search);
  };

  return (
    <View style={styles.view}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        lightTheme={true}
        containerStyle={styles.searchContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
  },
  searchContainer:{
    padding: 0,
    backgroundColor: Platform.OS === 'ios' ? 'white' : 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  }
});

export default FileSearchBar;