# AED Locator
The AED Locator App is a React Native mobile application designed to help users find Automated External Defibrillators (AEDs) across the University of Strathclyde's campus. It provides a map with pins indicating AED locations, detailed information, and the ability to get directions to each AED.

### Prerequisites
Before beginning, you will need to install:

- [Node.js](https://nodejs.org/) (which comes with [npm](http://npmjs.com/)) installed on your computer.
- [Expo CLI](https://expo.dev/tools#cli):
```bash
npm install -g expo-cli
```
### Creating Environment
First, clone the projects repository and then CD to it
```bash
git clone https://github.com/aaaiidan/AED-Locator.git)https://github.com/aaaiidan/AED-Locator.git
cd <project_directiory>
```
Following this run these commands to install all neccessary dependencies and to build the environment
```bash
npm install
expo start
```
Note that may need to put npm or npx before "expo start"

## Running the App
To run the application on a mobile device, follow these steps:

1. **Download and open the Expo Go application** on your device.
2. **Scan the QR code** shown in your terminal or access lan server through the application.
3. The app should start building and will be displayed on your device.

## Project Structure

- `assets`: Contains images, fonts, sounds, and JSON data.
- `components`: Reusable components such as buttons and headers as well as custom made component used for presenting information in the same design as StrathApp.
- `screens`: Contains all of the screen, including Home, Help, Emergency, AEDScreen, and the three nested help screens.
- `services`: Contains firebase configurations.
- `navigation`: Manages the navigation logic for the application (the nav-bar)
