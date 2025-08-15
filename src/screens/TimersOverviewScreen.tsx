import { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useTimerContext } from '../providers/TimerProvider';

const TimersOverviewScreen = () => {
  const {
    getTimers,
    getActiveTimers,
    pauseAll,
    resumeAll,
    registerTimer,
    pauseByTag,
    resumeByTag,
    subscribe,
    unsubscribe,
  } = useTimerContext();

  const [timers, setTimers] = useState(getTimers());
  const [paused, setPaused] = useState(false);
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  useEffect(() => {
    const subscription = subscribe(() => {
      setTimers(getTimers());
    });
    return () => unsubscribe(subscription.id);
  }, []);

  const togglePause = () => {
    if (paused) {
      resumeAll();
    } else {
      pauseAll();
    }
    setPaused(!paused);
  };

  const createRandomTimer = () => {
    const id = `timer-${Math.random().toString(36).substring(2, 8)}`;
    const tags = ['network', 'fetch', 'debug'];
    const tag = tags[Math.floor(Math.random() * tags.length)];

    let ticks = 0;

    registerTimer({
      id,
      tag,
      callback: () => {
        ticks++;
      },
    });
  };

  const createHundredTimers = () => {
    for (let i = 0; i < 100; i++) {
      createRandomTimer();
    }
  };

  const uniqueTags = Array.from(
    new Set(timers.map((t) => t.tag).filter(Boolean))
  );
  const filteredTimers = tagFilter
    ? timers.filter((t) => t.tag === tagFilter)
    : timers;

  return (
    <View style={{ padding: 20, paddingBottom: 250, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
        🕒 Timer Debug Panel
      </Text>

      <Text>Total timers: {timers.length}</Text>
      <Text>Active timers: {getActiveTimers().length}</Text>

      <View style={{ gap: 10, marginVertical: 10, alignItems: 'flex-start' }}>
        <Button
          title={paused ? '▶️ Resume All' : '⏸️ Pause All'}
          onPress={togglePause}
        />
        <Button title="➕ Add Random Timer" onPress={createRandomTimer} />
        <Button
          title="➕ Add 100 Random Timers"
          onPress={createHundredTimers}
        />
      </View>

      <View
        style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 }}
      >
        <Button title="All" onPress={() => setTagFilter(null)} />
        {uniqueTags.map((tag) => (
          <View key={tag} style={{ marginHorizontal: 4 }}>
            <Button
              title={tag as string}
              onPress={() => setTagFilter(tag as string)}
            />
          </View>
        ))}
      </View>

      {tagFilter && (
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Button
            title={`⏸️ Pause ${tagFilter}`}
            onPress={() => pauseByTag(tagFilter)}
          />
          <View style={{ width: 10 }} />
          <Button
            title={`▶️ Resume ${tagFilter}`}
            onPress={() => resumeByTag(tagFilter)}
          />
        </View>
      )}

      <FlatList
        data={filteredTimers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: '#ccc',
              paddingVertical: 6,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>
              {item.id} {item.tag ? `(${item.tag})` : ''}
            </Text>
            <Text>Ticks: {item.tickCount}</Text>
            <Text>Status: {item.active ? '✅ Running' : '⏸️ Paused'}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ marginTop: 10 }}>
            No timers found with current filter.
          </Text>
        }
      />
    </View>
  );
};

export default TimersOverviewScreen;
