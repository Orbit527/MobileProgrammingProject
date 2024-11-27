# Mobile Programming Final Project

## Note
Please note that firebaseConfig.js and app.json with API keys are not in the repository.

## Description
This is the final project for the course Mobile Programming (SOF008AS3AE-3003) for Haaga-Helia UAS. This is a running app, that tracks the phone/user, when they click on the Track button. Routes can than be stored, when the user is logged in. The routes can be displayed and deleted. On the home screen is a weather component, that displays the current and future weather, to check if it is suitable to go out. 

## Important Packages

### async-storage
this is used to store the logged in user and to store settings persistently
### bottom-tabs
used for navigating between screens on the bottom
### native-stack
this package is used for navigating screens directly, by buttons
### expo-keep-awake
important, so the app is beeing kept open and the tracking keeps going. The app won't track, when you close it
### expo-location
used for tracking the phone
### firebase
the database for this project is firebase, therefore the firebase package is needed. Functionalities are: reading, writing, deleting and authentication
### react-native-maps
used for displaying routes on a map. Another important aspect here is Polylines
### react-native-paper
styling library
