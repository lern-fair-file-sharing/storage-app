import { useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import { FileCardType } from "../types/FileTypes";
import { searchFilesByKeyword } from '../utils/ServerRequests';
import Colors from '../utils/Colors';


type SearchBarProps = {
    callback: () => void;
    setSearchResultHandler: (files: FileCardType[]) => void;
};

const FileSearchBar: React.FunctionComponent<SearchBarProps> = (props: SearchBarProps) => {
    const [search, setSearch] = useState<string>("");
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const updateSearch = async (search: string) => {
        setSearch(search);
        if (String(search).length < 3) {
            return;
        }
        var results = await searchFilesByKeyword(search);

        if (results && results !== undefined) {
            props.setSearchResultHandler(results);
        }
    };

    return (
        <SearchBar
            placeholder="Durchsuchen..."
            onChangeText={updateSearch}
            value={search}
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchInput}
            onFocus={() => {
                setIsFocused(true);
                props.callback()
            }}
            onBlur={() => {
                setIsFocused(false);
                setSearch("")
            }}
            searchIcon={{ color: isFocused ? Colors.yellow : Colors.lightGray }}
            placeholderTextColor={isFocused ? Colors.yellow : Colors.lightGray }
        />
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        height: 40,
        padding: 0,
        backgroundColor: "white",
        borderColor: Colors.lightGray,
        borderRadius: 100,
        borderWidth: 1,
    },
    searchInput: {
        height: 40,
        backgroundColor: 'transparent',
    }
});

export default FileSearchBar;