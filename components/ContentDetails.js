import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';

import COLORS from '../constants/Colors';
import CONSTANTS from '../constants/Constants';

const ContentDetails = props => {

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
                    genreName = genreOfId.name;
                }
            } else {
                if (seriesGenres.length > 0) {
                    const genreOfId = seriesGenres.find(genre => genre.id === id);
                    genreName = genreOfId.name;
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
        <SafeAreaView style={{flex: 1}} forceInset={{ top: 'never' }}>
            <ScrollView
                contentContainerStyle={styles.container}>
                <Image 
                    style={styles.image}
                    source = {{ uri: CONSTANTS.URL_LARGE_IMAGE + props.content.posterPath }}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.textTitle}>{props.content.title}</Text>
                    <Text style={styles.textSubtitle}>{genreLabel}</Text>
                    <Text style={styles.textOverview}>{props.content.overview}</Text>
                </View>
                <TouchableOpacity
                    style={styles.FAB}
                    activeOpacity={0.7}
                    onPress={() => {
                        props.navigation.navigate({
                            routeName: 'ContentTrailer',
                            params: {
                                title: props.content.title,
                                genres: genreLabel
                            }
                        })
                    }}>
                    <View style={styles.roundButton}>
                        <Icon 
                            name={Platform.OS === 'android' ? 'md-play' : 'ios-play'} 
                            size={30} 
                            color='white'/>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: COLORS.BACKGROUND,
        paddingBottom: 30
    },
    image: {
        height: 600,
        width: Dimensions.get('window').width,
    },
    FAB: {
        position: 'absolute',
        top: 572,
        right: 20,
    },
    roundButton: {
        height: 56,
        width: 56,
        borderRadius: 28,
        backgroundColor: COLORS.ACCENT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 15
    },
    textTitle: {
        fontFamily: 'roboto-bold',
        fontSize: 26,
        color: COLORS.TEXT,
        marginTop: 10
    },
    textSubtitle: {
        fontFamily: 'roboto-medium',
        fontSize: 17,
        color: COLORS.TEXT,
        marginTop: 6
    },
    textOverview: {
        fontFamily: 'roboto-regular',
        fontSize: 16,
        marginBottom: 6,
        color: COLORS.TEXT,
        alignSelf: 'flex-start',
        marginTop: 10
    }
});

export default ContentDetails;