## Avocadoo React Native Mobile App

#### Installation
`$ yarn install`

#### Configuration
##### iOS
`$ cd ios && pod install`

If you get an error for `react-native-netinfo` in pod installation, run the following command in terminal and install pod again.

`yarn add @react-native-community/netinfo`

##### Android
Gradles for all packages will be configured autumatically.

#### Run
`$ yarn ios` or `$ yarn android`

You might get the following error when you run the project.

`events.js:174
throw er; // Unhandled 'error' event
^`

Then run `yarn add react-script` and it works!