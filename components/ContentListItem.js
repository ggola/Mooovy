import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import COLORS from '../constants/Colors';
import CONSTANTS from '../constants/Constants';

const ContentListItem = props => {    

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
            <View style={styles.imageContainer}>
                <Image 
                    style={styles.image}
                    source = {{ uri: CONSTANTS.URL_SMALL_IMAGE + props.content.posterPath }}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{props.content.title}</Text>
                <Text style={styles.category}>{props.content.category}</Text>
            </View>
        </TouchableOpacity>
    );

};

const styles = StyleSheet.create({
    imageContainer: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderColor: COLORS.PRIMARY,
        borderWidth: 1,
        height: 231,
        width: 154,
        borderRadius: 10,
        overflow: 'hidden',
        marginLeft: 15
    },
    image: {
        height: 231,
        width: 154
    },
    textContainer: {
        position: 'absolute',
        bottom: 25,
        left: 5,
        right: 5,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        height: 60,
        marginLeft: 15
    },
    title: {
        fontSize: 16,
        fontFamily: 'roboto-bold',
        marginHorizontal: 5,
        marginTop: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: 3
    },
    category: {
        fontSize: 13,
        fontFamily: 'roboto-regular',
        marginHorizontal: 5,
        marginTop: 3,
        marginBottom: 6,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: 3
    }
});

export default ContentListItem;