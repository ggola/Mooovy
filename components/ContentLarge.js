import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import CONSTANTS from '../constants/Constants';

const ContentLarge = props => {

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            onPress={() => {                
                props.navigation.navigate({
                    routeName: 'ContentDetails',
                    params: {
                        content: props.content
                    }
                })
            }}>
            <Image 
                style={styles.image}
                source = {{ uri: CONSTANTS.URL_LARGE_IMAGE + props.content.posterPath }}
            />
            <View style={styles.textContainer}>
                <Text style={styles.textOverview}>{props.content.overview}</Text>
                <Text style={styles.textTitle}>{props.content.title}</Text>
            </View>
        </TouchableOpacity>
    );

};

const styles = StyleSheet.create({
    container: {
        marginBottom: 40   
    },
    image: {
        height: 500,
        width: Dimensions.get('window').width
    },
    textContainer: {
        position: 'absolute',
        left: 15,
        right: 15,
        bottom: 20,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    textOverview: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        fontFamily: 'roboto-regular',
        fontSize: 16,
        marginBottom: 6,
        color: 'white',
        alignSelf: 'flex-start',
        padding: 4
    },
    textTitle: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        fontFamily: 'roboto-bold',
        fontSize: 26,
        color: 'white',
        padding: 4
    }
});

export default ContentLarge;