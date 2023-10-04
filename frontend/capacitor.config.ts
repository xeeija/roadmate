import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.roadmate',
  appName: 'roadmate',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
