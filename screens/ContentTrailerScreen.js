import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Dimensions,
    Platform
} from 'react-native';

import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';

import Icon from 'react-native-vector-icons/Ionicons';

// For Android
import { HideNavigationBar, ShowNavigationBar } from 'react-native-navigation-bar-color';

import Video from 'react-native-video';
import Orientation from 'react-native-orientation';

import COLORS from '../constants/Colors';

class ContentTrailerScreen extends React.Component {

    title = this.props.navigation.getParam('title');
    genres = this.props.navigation.getParam('genres');

    videoPlayer;
    constructor(props) {
        super(props);
        this.state = {
            currentTime: 0,
            duration: 0,
            isFullScreen: false,
            isLoading: true,
            paused: false,
            playerState: PLAYER_STATES.PLAYING,
        };
    }

    componentDidMount() {
        HideNavigationBar();
        StatusBar.setHidden(true);
        Orientation.lockToLandscapeRight();
    }
    componentWillUnmount() {
        ShowNavigationBar();
        StatusBar.setHidden(false);
        Orientation.lockToPortrait();
    }

    onSeek = seek => {
        this.videoPlayer.seek(seek);
    };

    onPaused = playerState => {
        this.setState({
            paused: !this.state.paused,
            playerState,
        });
    };

    onReplay = () => {
        this.setState({
            playerState: PLAYER_STATES.PLAYING
        });
        this.videoPlayer.seek(0);
    };

    onProgress = data => {
        const {
            isLoading,
            playerState
        } = this.state;
        // Video Player will continue progress even if the video already ended
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            this.setState({
                currentTime: data.currentTime
            });
        }
    };

    onLoad = data => this.setState({
        duration: data.duration,
        isLoading: false
    });

    onLoadStart = data => this.setState({
        isLoading: true
    });

    onEnd = () => this.setState({
        playerState: PLAYER_STATES.ENDED
    });

    onError = () => alert('Oh! ', error);

    renderToolbar = () => (
        <TouchableOpacity 
            style={styles.toolbar}
            activeOpacity={0.7}
            onPress={() => {
                this.props.navigation.goBack()
            }}>
            <Icon 
                name={ Platform.OS === 'android' ? 'md-arrow-round-back' : 'ios-arrow-round-back'} 
                color={COLORS.ACCENT}
                size={33}/>
                <View style={styles.textContainer}>
                    <Text style={styles.textToolbarTitle}>{this.title}</Text>
                    <Text style={styles.textToolbarGenres}>{this.genres}</Text>
                </View>
        </TouchableOpacity>
    );

    onSeeking = currentTime => this.setState({ currentTime });

    renderErrorMessage() {
        return (
            <View style={styles.centered}>
                <Text style={styles.text}>Ops...No content to show here</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Video  
                    ref={videoPlayer => (this.videoPlayer = videoPlayer)}
                    source = {require('../assets/big_buck_bunny.mp4')}
                    onError={this.renderErrorMessage}               
                    style={Platform.OS === "android" ? styles.videoContainerAndroid : styles.videoContainerIOS}
                    fullscreen={true}
                    control={true}
                    fullscreenOrientation='landscape'
                    resizeMode='cover'
                    onEnd={this.onEnd}
                    onLoad={this.onLoad}
                    onLoadStart={this.onLoadStart}
                    onProgress={this.onProgress}
                    paused={this.state.paused}
                />
                <MediaControls
                    mainColor={COLORS.ACCENT}
                    duration={this.state.duration}
                    isLoading={this.state.isLoading}
                    onPaused={this.onPaused}
                    onReplay={this.onReplay}
                    onSeek={this.onSeek}
                    onSeeking={this.onSeeking}
                    playerState={this.state.playerState}
                    progress={this.state.currentTime}
                    toolbar={this.renderToolbar()}
                />
            </View>
        );
    }
};

ContentTrailerScreen.navigationOptions = {
    header: null
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textContainer: {
        padding: 5,
        alignItems: 'center'
    },
    textToolbarTitle: {
        fontSize: 14,
        fontFamily: 'roboto-medium',
        color: COLORS.TEXT
    },
    textToolbarGenres: {
        fontSize: 12,
        fontFamily: 'roboto-regular',
        color: COLORS.TEXT
    },
    videoContainerAndroid: {
        height: "100%",
        width: "100%"
    },
    videoContainerIOS: {
        width: Dimensions.get('window').height,
        height: Dimensions.get('window').width,
        minWidth: Dimensions.get('window').height,
        minHeight: Dimensions.get('window').width,
        width: Dimensions.get('screen').height,
        height: Dimensions.get('screen').width,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginHorizontal: 20,
        backgroundColor: COLORS.BACKGROUND,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
});

export default ContentTrailerScreen;