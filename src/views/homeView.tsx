import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Body from '../containers/Body';


export default function HomeView() {

  return (
    <View>
        <Body/>
      <StatusBar style="auto" />
    </View>
  );
}

