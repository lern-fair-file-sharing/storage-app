import { useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { View, Text, StyleSheet, Platform } from 'react-native';
import FileCard from "../components/FileCard";
import { FileCardType } from "../types/FileTypes";
import { searchFilesByKeyword } from '../utils/ServerRequests';

type SearchBarComponentProps = {
};

const FileSearchBar: React.FunctionComponent<SearchBarComponentProps> = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([] as FileCardType[]);

  const updateSearch = async (search: string) => {
      setSearch(search);
      if (String(search).length < 3) {
          return;
      }
      var results = await searchFilesByKeyword(search);

      //if (results) {
      //  setSearchResults(results);
      //  console.log(results);
      //}
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
  searchContainer: {
    padding: 0,
    backgroundColor: Platform.OS === 'ios' ? 'white' : 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  }
});

export default FileSearchBar;