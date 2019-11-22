import React from 'react';
// Redux
import { useSelector } from 'react-redux';

import ContentDetails from '../components/ContentDetails';

const ContentDetailsScreen = props => {

    const content = props.navigation.getParam('content');
    const movieGenres = useSelector((state) => state.genres.movieGenres);
    const seriesGenres = useSelector((state) => state.genres.seriesGenres);

    return (
        <ContentDetails 
            content={content}
            navigation={props.navigation}
            movieGenres={movieGenres}
            seriesGenres={seriesGenres}
        />
    );
};

ContentDetailsScreen.navigationOptions = (navigationData) => {
    const content = navigationData.navigation.getParam('content')
    return {
        headerTitle: content.title
    }
}

export default ContentDetailsScreen;