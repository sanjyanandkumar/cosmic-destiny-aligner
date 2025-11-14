import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.brahmax.cosmic',
  appName: 'cosmic-destiny-aligner',
  webDir: 'dist',
  server: {
    url: 'https://9478e628-c158-481a-b774-8f07692d3917.lovableproject.com?forceHideBadge=true',
    cleartext: true
  }
};

export default config;
