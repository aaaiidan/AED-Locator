# AED Locator
This is the logbook of my 4th year individual project for The University of Strathclyde. Dates, time and progress will be logged in here. Progress will include anything worked on
that is pushed to master, as well as any design, research, testing and thought process.

## Log Book

### 26/10/2023
* Initial creation of React Native project (4 hours 20 minutes)
* Design simple splash (1 hour)

### 27/10/2023
* Low-Fidelity wireframe design of a base version of the app (1 hour 10 minutes)
  * Home Screen
  * AED List Screen
  * AED Information Pop-Up
  * AED Direction Screen
  * Emergency Screen
  * Enhanced Image Pop-Up
* Research on similar apps (AED Registry and StrathApp) (1 hour)
* Initial creation of high-fidelity wireframe designs on Figma (1 hour 50 minutes)
  * Home Screen
  * AED List Screen
  * AED Information Pop-Up
  * AED Direction Screen

### 29/10/2023
* Further development of high-fidelity wireframe designs on Figma (50 minutes)
  * AED Direction Screen
  * Emergency Screen
  
### 4/11/2023
* Developed basic Home Screen with two buttons (3 hours 20 minutes)
  * Created soley to get a feel for React Native
  * Designed Home Screen
  * Design Button as a component

### 8/11/2023
* Created help page, navigation and header (5 hours 30 minutes)
  * Created Blank Help page
    
  * Used [Stack Navigation](https://github.com/react-navigation/react-navigation/tree/main/packages/native-stack) to allow for stacking animation while navigating pages
    * Created a container and added home and help to container
      
  * Created Three new components
    * header_image.js for the strathclyde logo at the top of the header
    * question_image.js for question mark icon to navigate to help screen
    * button.js for a basic button component
      
* Created main screen and added map to it (1 hour 40 minutes)
  * Used [react-native-maps](https://github.com/react-native-maps/react-native-maps) to allow for google maps usage
      * Created Map Component
      * Loaded said component on main screen
      * Added navigation to main screen (to stack navigation container)
      * Added ability to navigate to help screen from question_image compnent
        
### 13/11/2023
* Introduced tab navigation alongside stack navigation, removed both button components (no longer using), and deleted main screen (as just using home screen now) (6 hours 20 minutes)
  *  Used [Bottom-Tab-Navigation](https://github.com/react-navigation/react-navigation/tree/main/packages/bottom-tabs)
    *  Updated container to allow for both stack naviagtion and bottom tab navigation
    *  Added Home Screen and Help screen to tab navigation
      
  * Updated home screen to contain map component

### 14/11/2023
 * Updadated Container to contain new all AED Screen (1 hour 10 minutes)
   * Created new screen all AED Screen which contained a sub container that follows the same colour and style as sub containers in StathApp
     
* Further developed UI of AED Screen to look more like high-fidelity wireframe (50 minutes)
  * Introduced the individual pins as their own component within AED Screen
    
* Added ability to scroll within the sub container and automatically adjust size of sub container depending on number of AED (making it scalable) (4 hours 30 minutes)
  * Used [Scroll View](https://reactnative.dev/docs/scrollview) for scrolling functionality

### 15/11/2023
* Created new screen Test Screen to implement first version of modal for AED information pop-ups (6 hours 20 minutes)
  * Added Test Screen to tab navigation
    * Implemented basic version intitially using [Modal](https://reactnative.dev/docs/modal) for pop up functionality but changed to [React-Native-Modal](https://github.com/react-native-modal/react-native-modal) due to it being an improved version
      
  * Added Navigation from each pin in AED screen to home screen

### 17/11/2023
* Introduced two new components - down_arrow for closing modal, and aed_image_container for displaying the image of the AED in AED information pop up (2 hour 50 minutes)
  * AED image is a placeholder for development right now and for any issues with connections to back-end
  * Added swiping functionality to open/close modal

* Created sub container within modal to contain information on AED (1 hour 20 minutes)

* Introduces button for directions and added placeholder information for AEDs (50 minutes)

### 18/11/2023
* Created a new modal for expanding the image when clicked on (4 hour 30 mins)
  * New modal component created to display the image at a larger scale when clicked on
  * Took a while to get height of image to be correct

###
* Integrating image expand into original AED information pop up modal within Test Screen (3 hours 40 minutes)
  * Within Test Screen, many useStates and passing of props were used to communicate between the parent modal and the child modal

* Integrated Test Screen into Home screen and added new button to home screen (2 hours 30 minutes)