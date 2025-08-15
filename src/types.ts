// Timer types
export type TimerOptions = {
  id: string;
  tag?: string;
  callback: () => void;
};

export type TimerSubscription = {
  id: string;
  tag?: string;
  callback: () => void;
  tickCount: number;
  active: boolean;
};

export type TimerContextValue = {
  registerTimer: (options: TimerOptions) => () => void;
  getTimers: () => TimerSubscription[];
  getActiveTimers: () => TimerSubscription[];
  pauseAll: () => void;
  resumeAll: () => void;
  pauseByTag: (tag: string) => void;
  resumeByTag: (tag: string) => void;
  subscribe: (callback: () => void) => { id: string };
  unsubscribe: (id: string) => void;
};

// Provider props
export type TimerProviderProps = {
  children: React.ReactNode;
};
