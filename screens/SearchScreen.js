import React, { useState, useCallback, useEffect } from 'react';
import { View, Button, TextInput, StyleSheet, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-navigation';

// Redux
import { useSelector, useDispatch } from 'react-redux';
// Actions
import * as contentActions from '../store/actions/content';

import ContentSearchListItem from '../components/ContentSearchListItem';

import COLORS from '../constants/Colors';

const SearchScreen = props => {

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState();

    const movieGenres = useSelector((state) => state.genres.movieGenres);
    const seriesGenres = useSelector((state) => state.genres.seriesGenres);

    // Retrieve filtered content
    const filteredMovies = useSelector((state) => state.content.filteredMovies);
    const filteredSeries = useSelector((state) => state.content.filteredSeries);
    let filteredResults = [];
    if (filteredMovies && filteredSeries) {
        filteredResults = filteredMovies.concat(filteredSeries);
    }
    
    // Handles search input
    const searchInputHandler = (inputText) => {
        setSearchValue(inputText);
    };

    // Handles content filtering
    const searchContentHandler = () => {
        if (searchValue) {    
            setIsLoading(true);
            loadContent(searchValue, currentPage);
        }  
    };

    const loadContent = useCallback(async (searchValue, currentPage) => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(contentActions.getFilteredMovies(searchValue, currentPage));
            await dispatch(contentActions.getFilteredSeries(searchValue, currentPage));
            setIsLoading(false);
        } catch (err) {
            // Error rethrown from the dispatch action
            setError(err.message);
            setIsLoading(false);
        }
    }, [dispatch, setIsLoading, setError]);

    const loadMoreContentHandler = () => {
        setIsLoading(true);
        setCurrentPage(page => page + 1);
    };

    const clearContentHandler = () => {
        setSearchValue();
        dispatch(contentActions.deleteFilteredContent());
    };

    // Delete filterResults when component unmounts
    useEffect(() => {
        return () => {
            dispatch(contentActions.deleteFilteredContent());
        }
    }, []);

    useEffect(() => {
        if (currentPage > 1) {
            if (searchValue) {    
                loadContent(searchValue, currentPage);
            } 
        }
    }, [currentPage]);
    
    return (
        <SafeAreaView style={styles.screen} forceInset={{ top: 'never' }}>
            <View style={styles.textInputContainer}>
                <TextInput
                    autoFocus={true}  
                    blurOnSubmit
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder='Try: Joker or Leon'
                    placeholderTextColor={COLORS.ACCENT}
                    keyboardType='default'
                    returnKeyType='search'
                    onSubmitEditing={searchContentHandler}
                    style={styles.textInput}
                    onChangeText={searchInputHandler}
                    value={searchValue}/>
                {filteredResults.length > 0 && 
                    <View style={styles.buttonContainer}>   
                        <Button 
                            title='LOAD MORE'
                            color={COLORS.ACCENT}
                            onPress={loadMoreContentHandler}
                        />
                        <Button 
                            title='CLEAR'
                            color={'red'}
                            onPress={clearContentHandler}
                        />
                    </View> 
                }
            </View>
            {isLoading ? 
                <View style={styles.centered}>
                    <ActivityIndicator size='large' color={COLORS.PRIMARY}/>
                </View>
            :
                (error ? 
                    <View style={styles.centered}>
                        <Text style={styles.text}>There was a problem fetching the data</Text>
                    </View> 
                :
                    (filteredResults.length > 0 &&
                        <FlatList
                            contentContainerStyle={styles.contentContainerStyle}
                            keyExtractor={(item) => String(item.id)}
                            data={filteredResults}
                            renderItem={(itemData) =>
                                <ContentSearchListItem 
                                    content={itemData.item}
                                    navigation={props.navigation}
                                    movieGenres={movieGenres}
                                    seriesGenres={seriesGenres}
                                />
                            }
                        />
                    ) 
                )
            }
        </SafeAreaView>
    );
};

SearchScreen.navigationOptions = {
    headerTitle: 'Search'
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.BACKGROUND
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    textInputContainer: {
        width: '100%'
    },
    textInput: {
        textAlign: 'left',
        color: COLORS.TEXT,
        fontFamily: 'roboto-regular',
        fontSize: 18,
        height: 40,
        borderBottomColor: COLORS.ACCENT,
        borderBottomWidth: 1,
        marginVertical: 10,
        marginHorizontal: 15
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    contentContainerStyle: {
        width: Dimensions.get('window').width
    },
    text: {
        fontFamily: 'roboto-medium',
        fontSize: 18,
        color: COLORS.TEXT
    }
});

export default SearchScreen;