// @types/actioncable.d.ts

declare module '@rails/actioncable' {
  export interface Cable {
    subscriptions: {
      create: (channel: string, params: {
        disconnected: () => void; connected: () => void; received: (received_data: ReceivedData) => void;
      }) => Channel;
    };
  }

  export interface Channel {
    unsubscribe: () => void;
  }

  export function createConsumer(url: string): Cable;
}
