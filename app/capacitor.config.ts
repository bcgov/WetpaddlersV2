import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'DDS-OfflineMap-POC',
  webDir: 'dist',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    }
  }
};

export default config;
