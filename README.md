# React Native Global Timers

A powerful, context-based timer management system for React Native applications. This package provides a centralized way to manage multiple timers with features like pausing, resuming, tagging, and real-time monitoring.

## Features

- 🕒 **Global Timer Management**: Manage all timers from a single context
- 🏷️ **Tag-based Organization**: Group timers by tags for better organization
- ⏸️ **Pause/Resume Control**: Pause or resume individual timers, by tags, or all at once
- 📊 **Real-time Monitoring**: Built-in inspector widget for debugging and monitoring
- 🎯 **Performance Optimized**: Efficient timer execution with minimal overhead
- 🔄 **Subscription System**: Subscribe to timer updates for reactive UI updates
- 📱 **React Native Ready**: Built specifically for React Native applications

## Installation

```bash
npm i react-native-global-timers
# or
yarn add react-native-global-timers
```

## Quick Start

### 1. Wrap your app with TimerProvider

```tsx
import React from 'react';
import { TimerProvider } from 'react-native-global-timers';
import App from './App';

export default function Root() {
  return (
    <TimerProvider>
      <App />
    </TimerProvider>
  );
}
```

### 2. Use timers in your components

```tsx
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useTimerContext, useTimer } from 'react-native-global-timers';

function MyComponent() {
  const { registerTimer, getTimers } = useTimerContext();
  
  // Subscribe to timer updates
  useTimer(() => {
    console.log('Timer ticked!');
  });

  useEffect(() => {
    // Register a timer
    const cleanup = registerTimer({
      id: 'my-timer',
      tag: 'network',
      callback: () => {
        console.log('Network timer executed');
      },
    });

    // Cleanup when component unmounts
    return cleanup;
  }, []);

  const timers = getTimers();
  
  return (
    <View>
      <Text>Active timers: {timers.filter(t => t.active).length}</Text>
    </View>
  );
}
```

## API Reference

### TimerProvider

The main context provider that manages all timers.

```tsx
<TimerProvider>
  {/* Your app components */}
</TimerProvider>
```

### useTimerContext

Hook to access timer management functions.

```tsx
const {
  registerTimer,
  getTimers,
  getActiveTimers,
  pauseAll,
  resumeAll,
  pauseByTag,
  resumeByTag,
  subscribe,
  unsubscribe,
} = useTimerContext();
```

#### Methods

- **`registerTimer(options)`**: Register a new timer
  - `options.id`: Unique identifier for the timer
  - `options.tag`: Optional tag for grouping
  - `options.callback`: Function to execute on each tick
  - Returns cleanup function

- **`getTimers()`**: Get all registered timers
- **`getActiveTimers()`**: Get only active timers
- **`pauseAll()`**: Pause all timers
- **`resumeAll()`**: Resume all timers
- **`pauseByTag(tag)`**: Pause timers with specific tag
- **`resumeByTag(tag)`**: Resume timers with specific tag
- **`subscribe(callback)`**: Subscribe to timer updates
- **`unsubscribe(id)`**: Unsubscribe from timer updates

### useTimer

Simplified hook for subscribing to timer updates.

```tsx
useTimer(() => {
  // This runs every second when timers are active
  console.log('Timer update');
});
```

### TimerInspectorWidget

Debug widget for monitoring timers in development.

```tsx
import { TimerInspectorWidget } from 'react-native-global-timers';

function App() {
  return (
    <>
      {/* Your app content */}
      <TimerInspectorWidget />
    </>
  );
}
```

## Advanced Usage

### Timer Tagging

Organize timers by functionality:

```tsx
// Network-related timers
registerTimer({
  id: 'api-polling',
  tag: 'network',
  callback: () => fetchLatestData(),
});

// UI update timers
registerTimer({
  id: 'ui-refresh',
  tag: 'ui',
  callback: () => updateUI(),
});

// Pause all network timers
pauseByTag('network');
```

### Custom Timer Intervals

The system runs on a 1-second interval by default. For custom intervals, you can create multiple timers or use the subscription system:

```tsx
// Create a timer that counts every 5 seconds
let counter = 0;
registerTimer({
  id: 'custom-interval',
  callback: () => {
    counter++;
    if (counter % 5 === 0) {
      console.log('5 seconds passed');
    }
  },
});
```

### Performance Monitoring

Monitor timer performance in real-time:

```tsx
const timers = getTimers();
const activeCount = getActiveTimers().length;

console.log(`Total timers: ${timers.length}`);
console.log(`Active timers: ${activeCount}`);
console.log(`Paused timers: ${timers.length - activeCount}`);
```

## Examples

### Network Polling

```tsx
function NetworkService() {
  const { registerTimer } = useTimerContext();

  useEffect(() => {
    const cleanup = registerTimer({
      id: 'api-polling',
      tag: 'network',
      callback: async () => {
        try {
          const data = await fetch('/api/status');
          // Handle response
        } catch (error) {
          console.error('API polling failed:', error);
        }
      },
    });

    return cleanup;
  }, []);
}
```

### UI Refresh Timer

```tsx
function Dashboard() {
  const { registerTimer } = useTimerContext();
  const [data, setData] = useState(null);

  useEffect(() => {
    const cleanup = registerTimer({
      id: 'dashboard-refresh',
      tag: 'ui',
      callback: () => {
        setData(prevData => ({ ...prevData, lastUpdated: Date.now() }));
      },
    });

    return cleanup;
  }, []);
}
```

## Development

### Running Tests

```bash
npm test
```

### Building

```bash
npm run prepare
```

### Type Checking

```bash
npm run typecheck
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/NicoCagnina/react-native-global-timers/issues) on GitHub.
