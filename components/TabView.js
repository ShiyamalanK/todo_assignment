import * as React from 'react';
import { View, useWindowDimensions, Text, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { render } from 'react-native-web';

const TabViewComp = ({ tabTitles = ['Todo', 'Done'], tabContent = [FirstRoute, SecondRoute] }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(
    tabTitles.map((title, idx) => ({ key: `tab${idx}`, title }))
  );

//   const renderScene = SceneMap(
//     tabContent.reduce((scenes, SceneComponent, idx) => {
//       scenes[`tab${idx}`] = SceneComponent;
//       return scenes;
//     }, {})
//   );

  const renderScene = React.useMemo(() => SceneMap(
    tabContent.reduce((scenes, SceneComponent, idx) => {
      scenes[`tab${idx}`] = SceneComponent;
      return scenes;
    }, {})
  ), [tabContent]);

  const renderLabel = React.useCallback(({ route, focused }) => (
    <Text style={[styles.tabLabel, { color: focused ? '#fff' : '#aaa' }]}>
      {route.title}
    </Text>
  ), []);

  const CustomTabBar = (props) => (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
      labelStyle={styles.tabLabel}
      renderLabel={renderLabel}
      tabStyle = {styles.tab}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => <CustomTabBar {...props} />}
      style={styles.tabView}
      sceneContainerStyle = {styles.sceneContainer}
      
    />
  );
};

// Default scene components
const FirstRoute = () => (
  <View style={styles.firstScene}>
    {/* <Text style={styles.text}>Todo Content</Text> */}
  </View>
);

const SecondRoute = () => (
  <View style={styles.secondScene}>
    {/* <Text style={styles.text}>Done Content</Text> */}
  </View>
);

const styles = StyleSheet.create({
  tabView: {
    borderRadius: 10,
    elevation: 2,
  },
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
  indicator: {
    backgroundColor: '#fff', // Color of the indicator line
  },
  tabBar:{
    backgroundColor: '#044'
  },
  tabLabel:{
    fontWeight: 'bold',
  }, 
  firstScene: {
    flex: 1,
    backgroundColor: '#000', // Custom background color for the first tab
  },
  secondScene: {
    flex: 1,
    backgroundColor: '#000', // Custom background color for the second tab
  },
  sceneContainer:{
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#012'
  }
});

export default TabViewComp;
