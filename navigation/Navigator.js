import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Constants
import COLORS from '../constants/Colors';

// Screens
import ContentOverviewScreen from '../screens/ContentOverviewScreen';
import ContentDetailsScreen from '../screens/ContentDetailsScreen';
import ContentTrailerScreen from '../screens/ContentTrailerScreen';
import SearchScreen from '../screens/SearchScreen';

// Default Navigation Options
const defaultNavOptions = {
    headerStyle: {
        backgroundColor: COLORS.BACKGROUND,
    },
    headerTintColor: COLORS.PRIMARY
};

// Main Stack Navigator
const MainNavigator = createStackNavigator({
    ContentOverview: ContentOverviewScreen,
    ContentDetails: ContentDetailsScreen,
    ContentTrailer: ContentTrailerScreen,
    Search: SearchScreen
}, {
    defaultNavigationOptions: defaultNavOptions
});

export default createAppContainer(MainNavigator);