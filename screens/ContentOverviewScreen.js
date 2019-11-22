import React, { useState, useEffect } from 'react';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';

// Header Buttons
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import HeaderButton from '../components/HeaderButton';
import ContentList from '../components/ContentList';
import ContentLarge from '../components/ContentLarge';

// Redux
import { useSelector, useDispatch } from 'react-redux';
// Actions
import * as contentActions from '../store/actions/content';
import * as genresActions from '../store/actions/genres';

import CONSTANTS from '../constants/Constants';
import COLORS from '../constants/Colors';

const ContentOverviewScreen = props => {

    const dispatch = useDispatch();

    const [isLoadingPopMovies, setIsLoadingPopMovies] = useState(true);
    const [errorPopMovies, setErrorPopMovies] = useState();
    const [currentPagePopMovies, setCurrentPagePopMovies] = useState(1);

    const [isLoadingPopSeries, setIsLoadingPopSeries] = useState(true);
    const [errorPopSeries, setErrorPopSeries] = useState();
    const [currentPagePopSeries, setCurrentPagePopSeries] = useState(1);

    const [isLoadingFamily, setIsLoadingFamily] = useState(true);
    const [errorFamily, setErrorFamily] = useState();
    const [currentPageFamily, setCurrentPageFamily] = useState(1);

    const [isLoadingDocumentary, setIsLoadingDocumentary] = useState(true);
    const [errorDocumentary, setErrorDocumentary] = useState();
    const [currentPageDocumentary, setCurrentPageDocumentary] = useState(1);

    // Retrieve pop movies and tv series from redux store
    const popularMovies = useSelector((state) => state.content.popularMoviesList);
    const popularSeries = useSelector((state) => state.content.popularSeriesList);
    const familyContent = useSelector((state) => state.content.familyContent);
    const documentaryContent = useSelector((state) => state.content.documentaryContent);

    //********* DATA LOADING
    // Load popular movies
    useEffect(() => {
        const loadMovies = async (currentPagePopMovies) => {
            setErrorPopMovies(null);
            setIsLoadingPopMovies(true);
            try {
                await dispatch(contentActions.getPopularMovies(currentPagePopMovies));
                setIsLoadingPopMovies(false);
            } catch (err) {
                // Error rethrown from the dispatch action
                setErrorPopMovies(err.message);
                setIsLoadingPopMovies(false);
            }
        };
        loadMovies(currentPagePopMovies);
    }, [currentPagePopMovies]);

    // Load popular series
    useEffect(() => {
        const loadSeries = async (currentPagePopSeries) => {
            setErrorPopSeries(null);
            setIsLoadingPopSeries(true);
            try {
                await dispatch(contentActions.getPopularSeries(currentPagePopSeries));
                setIsLoadingPopSeries(false);
            } catch (err) {
                // Error rethrown from the dispatch action
                setErrorPopSeries(err.message);
                setIsLoadingPopSeries(false);
            }
        };
        loadSeries(currentPagePopSeries);
    }, [currentPagePopSeries]);

    // Load family content from movies and series
    useEffect(() => {
        const loadFamilyContent = async (genreId, currentPageFamily) => {
            setErrorFamily(null);
            setIsLoadingFamily(true);
            try {
                await dispatch(contentActions.getMoviesByGenre(genreId, currentPageFamily));
                await dispatch(contentActions.getSeriesByGenre(genreId, currentPageFamily));
                setIsLoadingFamily(false);
            } catch (err) {
                // Error rethrown from the dispatch action
                setErrorFamily(err.message);
                setIsLoadingFamily(false);
            }
        };
        loadFamilyContent(10751, currentPageFamily);
    }, [currentPageFamily]);

    // Load documentary content from movies and series
    useEffect(() => {
        const loadDocumentaryContent = async (genreId, currentPageDocumentary) => {
            setErrorDocumentary(null);
            setIsLoadingDocumentary(true);
            try {
                await dispatch(contentActions.getMoviesByGenre(genreId, currentPageDocumentary));
                await dispatch(contentActions.getSeriesByGenre(genreId, currentPageDocumentary));
                setIsLoadingDocumentary(false);
            } catch (err) {
                // Error rethrown from the dispatch action
                setErrorDocumentary(err.message);
                setIsLoadingDocumentary(false);
            }
        };
        loadDocumentaryContent(99, currentPageDocumentary);
    }, [currentPageDocumentary]);

    // Load genres 
    useEffect(() => {
        const loadGenres = async () => {
            try {
                await dispatch(genresActions.getMoviesGenres());
                await dispatch(genresActions.getSeriesGenres());
            } catch (err) {
            }
        };
        loadGenres();
    }, [dispatch]);

    // Retrieve more content
    const morePopMoviesContentHandler = () => {
        if (currentPagePopMovies <= CONSTANTS.TOTAL_PAGES) {
            setCurrentPagePopMovies(page => page + 1);
        }
    }
    const morePopSeriesContentHandler = () => {
        if (currentPagePopSeries <= CONSTANTS.TOTAL_PAGES) {
            setCurrentPagePopSeries(page => page + 1);
        }
    };
    const moreFamilyContentHandler = () => {
        if (currentPageFamily <= CONSTANTS.TOTAL_PAGES) {
            setCurrentPageFamily(page => page + 1);
        }
    };
    const moreDocumentaryContentHandler = () => {
        if (currentPageDocumentary <= CONSTANTS.TOTAL_PAGES) {
            setCurrentPageDocumentary(page => page + 1);
        }
    };

    // ********** CONTENT FILTERING
    // Pass searchBoxHandler pointer to header button to open textInput
    useEffect(() => {
        props.navigation.setParams({
            searchBoxHandler: searchBoxHandler
        })
    }, [searchBoxHandler]);
    // Handles opening/closing of search box
    const searchBoxHandler = () => {
        props.navigation.navigate('Search');
    };
    
    //********* JSX    
    return (
        <SafeAreaView style={{flex: 1}} forceInset={{ top: 'never' }}>
            <ScrollView 
                style={styles.container}>
                {popularMovies.length > 0 && 
                    <ContentLarge
                        navigation={props.navigation}
                        content={popularMovies[0]}
                    />
                }
                <ContentList 
                    listTitle='POPULAR MOVIES'
                    listDescription='Keep up with mankind: watch them!'
                    contentData={popularMovies}
                    navigation={props.navigation}
                    onPressMore={morePopMoviesContentHandler}
                    isLoading={isLoadingPopMovies}
                    error={errorPopMovies}/>
                <ContentList 
                    listTitle='POPULAR TV SERIES'
                    listDescription='Prepare to glue your back to the couch'
                    contentData={popularSeries}
                    navigation={props.navigation}
                    onPressMore={morePopSeriesContentHandler}
                    isLoading={isLoadingPopSeries}
                    error={errorPopSeries}/>
                <ContentList 
                    listTitle='FAMILY'
                    listDescription='To enjoy with your kids and dogs'
                    contentData={familyContent}
                    navigation={props.navigation}
                    onPressMore={moreFamilyContentHandler}
                    isLoading={isLoadingFamily}
                    error={errorFamily}/>
                <ContentList 
                    listTitle='DOCUMENTARY'
                    listDescription='Learn new stuff to impress your friends'
                    contentData={documentaryContent}
                    navigation={props.navigation}
                    onPressMore={moreDocumentaryContentHandler}
                    isLoading={isLoadingDocumentary}
                    error={errorDocumentary}/>
            </ScrollView>
        </SafeAreaView>
    );
};

ContentOverviewScreen.navigationOptions = (navigationData) => {
    const searchBoxHandler = navigationData.navigation.getParam('searchBoxHandler');
    return {
        headerTitle: 'Discover',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='Search' 
                    iconName={Platform.OS === 'android' ? 'md-search' : 'ios-search'}
                    onPress={searchBoxHandler}
                />
            </HeaderButtons>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.BACKGROUND
    }
});

export default ContentOverviewScreen;