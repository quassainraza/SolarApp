export const APP_VERSION = 'v1.0.0';
export const THEME_COLOR = '#F4005A';
export const SPLASH_TIME = 300;

export const DeviceOptions = [
  { label: 'Solar Panel', value: 'solar panel' },
  { label: 'Solar Geyser', value: 'solar geyser' },
];

const production = false;
let SOLAR_API = 'http://127.0.0.1:1337/';

if (production) {
  // SOLAR_API = 'http://ec2-52-56-204-249.eu-west-2.compute.amazonaws.com:1337';
  SOLAR_API = 'https://apps.marillionex.com:1337';
}

export { SOLAR_API };
  