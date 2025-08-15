import { StyleSheet, SafeAreaView } from 'react-native';
import AdvancedExample from './AdvancedExample';
import { TimerProvider } from 'react-native-global-timers';

function AppContent() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AdvancedExample />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <TimerProvider>
      <AppContent />
    </TimerProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  stats: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '500',
  },
  buttons: {
    marginBottom: 30,
  },
  description: {
    textAlign: 'center',
    color: '#666',
    lineHeight: 20,
  },
});
