import { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import TimerStats from '../screens/TimersOverviewScreen';

const TimerInspectorWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 50,
          right: 20,
          backgroundColor: '#222',
          padding: 10,
          borderRadius: 30,
          zIndex: 9999,
        }}
        onPress={() => setOpen(true)}
      >
        <Text style={{ color: 'white' }}>🧪</Text>
      </TouchableOpacity>

      <Modal visible={open} animationType="slide">
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 50 }}>
          <View style={{ padding: 10, backgroundColor: '#ddd' }}>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Text style={{ fontSize: 18 }}>❌ Close Inspector</Text>
            </TouchableOpacity>
          </View>
          <TimerStats />
        </View>
      </Modal>
    </>
  );
};

export default TimerInspectorWidget;
