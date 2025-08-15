module.exports = {
  dependencies: {
    'react-native-global-timers': {
      platforms: {
        android: {
          sourceDir: '../android',
          packageImportPath: 'import com.reactnativeglobaltimers.ReactNativeGlobalTimersPackage;',
          packageInstance: 'new ReactNativeGlobalTimersPackage()',
        },
        ios: {
          sourceDir: '../ios',
          podspec: '../react-native-global-timers.podspec',
        },
      },
    },
  },
};
