import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList,
    ActivityIndicator
} from 'react-native';

import ContentListItem from './ContentListItem';

import COLORS from '../constants/Colors';

const ContentList = props => {    

    return (
        <View style={styles.listContainer}> 
            <View style={styles.headerContainer}>
                <View>
                    <Text style={styles.title}>{props.listTitle}</Text>
                    <Text style={styles.description}>{props.listDescription}</Text>
                </View>
                <Button 
                    title='MORE'
                    color={COLORS.ACCENT}
                    onPress={props.onPressMore}
                />
            </View>
            {props.isLoading ? 
                <View style={styles.centered}>
                    <ActivityIndicator size='small' color={COLORS.PRIMARY}/>
                </View>
            :
                (props.error ? 
                    <View style={styles.centered}>
                        <Text style={styles.text}>There was a problem fetching the data</Text>
                    </View>                
                :
                    (props.contentData.length > 0 ?
                        <FlatList
                            horizontal
                            keyExtractor={(item) => String(item.id)}
                            data={props.contentData}
                            renderItem={(itemData) =>
                                <ContentListItem 
                                    content={itemData.item}
                                    navigation={props.navigation}
                                />
                            }
                        />
                    :
                        <View style={styles.centered}>
                            <Text style={styles.text}>Ops...No content to show here</Text>
                        </View>
                    )
                )
            }
        </View>
    );

};

const styles = StyleSheet.create({
    listContainer: {
        width: '100%',
        height: 300,
        marginBottom: 5
    },
    centered: {
        height: 231,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: 50,
        marginHorizontal: 15,
        marginTop: 0
    },
    title: {
        fontSize: 18,
        fontFamily: 'roboto-medium',
        marginBottom: 2,
        color: COLORS.TEXT
    },
    description: {
        fontSize: 14,
        fontFamily: 'roboto-regular',
        marginBottom: 6,
        color: COLORS.TEXT
    },
    text: {
        fontFamily: 'roboto-medium',
        fontSize: 18,
        color: COLORS.TEXT
    }
});

export default ContentList;