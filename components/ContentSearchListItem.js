import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform
} from 'react-native';

import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/Ionicons';

import COLORS from '../constants/Colors';
import CONSTANTS from '../constants/Constants';

const ContentSearchListItem = props => {

    const [genreLabel, setGenreLabel] = useState('');

    const { movieGenres, seriesGenres } = props;
    const genreIds = props.content.genreIds;
    const category = props.content.category;

    useEffect(() => {
        for (i=0; i<genreIds.length; i++) {
            const id = genreIds[i];
            let genreName;
            if (category === 'MOVIE') {
                if (movieGenres.length > 0) {
                    const genreOfId = movieGenres.find(genre => genre.id === id);
                    if (genreOfId) {
                        genreName = genreOfId.name;
                    }  
                }
            } else {
                if (seriesGenres.length > 0) {
                    const genreOfId = seriesGenres.find(genre => genre.id === id);
                    if (genreOfId) {
                        genreName = genreOfId.name;
                    }
                }
            }
            if (i === genreIds.length - 1) {
                setGenreLabel(label => label + genreName);
            } else {
                setGenreLabel(label => label + genreName + ', ');
            }
        }
    }, [movieGenres, seriesGenres, genreIds, category]);

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
                props.navigation.navigate({
                    routeName: 'ContentDetails',
                    params: {
                        content: props.content
                    }
                })
            }}>
            <View style={styles.contentContainer}>
                <View style={styles.imageContainer}>
                    <Image 
                        style={styles.image}
                        source = {{ uri: CONSTANTS.URL_TINY_IMAGE + props.content.posterPath }}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{props.content.title.toUpperCase()}</Text>
                    <Text style={styles.genreLabel}>{genreLabel}</Text>
                    <View style={styles.ratingExternalContainer}>
                        <View style={styles.ratingContainer}>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={props.content.voteAverage * 0.5}
                                starSize={18}
                                emptyStarColor={COLORS.PRIMARY}
                                fullStarColor={COLORS.PRIMARY}
                                halfStarColor={COLORS.PRIMARY}
                                halfStarEnabled={true}
                            />
                            <Text style={styles.textRating}>{props.content.voteCount}</Text>
                        </View>
                    <Icon 
                        name={Platform.OS === 'android' ? 'md-star-outline' : 'ios-star-outline'}
                        size={22}
                        color={COLORS.ACCENT}/>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

};

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginHorizontal: 15,
        marginVertical: 10
    },
    imageContainer: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderColor: COLORS.PRIMARY,
        borderWidth: 1,
        height: 138,
        width: 92,
        borderRadius: 10,
        overflow: 'hidden'
    },
    image: {
        height: 138,
        width: 92
    },
    textContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: 138,
        width: Dimensions.get('window').width - 130,
        marginHorizontal: 15
    },
    title: {
        fontSize: 20,
        fontFamily: 'roboto-bold',
        marginHorizontal: 5,
        marginTop: 4,
        color: COLORS.TEXT,
        padding: 3
    },
    genreLabel: {
        fontSize: 16,
        fontFamily: 'roboto-regular',
        marginHorizontal: 5,
        marginTop: 3,
        marginBottom: 6,
        color: COLORS.TEXT,
        padding: 3
    },
    ratingExternalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Dimensions.get('window').width - 150
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginHorizontal: 5,
        padding: 3
    },
    textRating: {
        fontSize: 15,
        fontFamily: 'roboto-medium',
        marginHorizontal: 5,
        color: COLORS.TEXT
    }
});

export default ContentSearchListItem;