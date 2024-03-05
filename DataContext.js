import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './services/firebaseConfig';
import { getStorage, ref, getBlob} from 'firebase/storage'
import { Audio } from 'expo-av';
import * as SplashScreen from 'expo-splash-screen';
import jsonData from './assets/JSON/consent.json'

const alertMessage = jsonData.join('\n\n');
const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [locations, setLocations] = useState(null);
    const [aeds, setAeds] = useState(null);
    const [coverImagesBase64, setCoverImagesBase64] = useState(null);
    const [indoorImagesBase64, setIndoorImagesBase64] = useState(null);
    const [cprSoundActivated, setCprSoundActivated] = useState(false);
    const [sound, setSound] = useState(null);

    //Values to be passed to children
    const value = {
        locations,
        aeds,
        coverImagesBase64,
        indoorImagesBase64,
        cprSoundActivated,
        setCprSoundActivated
    };

    const loadData = async (collectionName) => {
        try{
            const querySnapshot = await getDocs(collection(db, collectionName));
            const queryDocs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
            return queryDocs
        } catch (error) {
            console.error("error fetching data: ", error);
        }
    }

    const fetchImages = async (imagePath) => {
        if (imagePath != null){
            const storageRef = ref(getStorage(), imagePath)
            try {
                const blob = await getBlob(storageRef);
                return convertBlobToBase64(blob)
            } catch (error) {
                console.error(error)
                console.log('could not find image')
                return null
            }
        } else {
            return null
        }
    }

    const convertBlobToBase64 = (blob) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result); 
        };
        reader.readAsDataURL(blob);
    });

    useEffect(() => { 
        const fetchData = async () => {
            try {
                // Load locations and AEDs in parallel
                const [locationsLoaded, aedsLoaded] = await Promise.all([
                    loadData('Locations'),
                    loadData('Aeds')
                ]);
                setLocations(locationsLoaded != [] ? locationsLoaded : null);
                setAeds(aedsLoaded !=[] ? aedsLoaded : null);
    
                if(aedsLoaded){
                    const coverImagesPromises = aedsLoaded.map(aed => aed.Image ? fetchImages(aed.Image) : null);
                    const coverImages = await Promise.all(coverImagesPromises);
        
                    // Update state once with all images
                    const newCoverImagesBase64 = coverImages.reduce((acc, imageData, index) => {
                        if (imageData) {
                            acc[aedsLoaded[index].id] = imageData;
                        }
                        return acc;
                    }, {});
        
                    setCoverImagesBase64(prev => ({ ...prev, ...newCoverImagesBase64 }));


                    // Step 1: Map over aedsLoaded to handle each AED's IndoorDirections
                    const indoorImagesPromises = aedsLoaded.map(aed => 
                        aed.IndoorDirections 
                        ? Promise.all(aed.IndoorDirections.map(direction => 
                            direction.Image ? fetchImages(direction.Image) : Promise.resolve(null)
                            ))
                        : Promise.resolve([]) // Return a promise with an empty array for AEDs without IndoorDirections
                    );
                    
                    // Step 2: Await all promises to resolve
                    const indoorImagesResults = await Promise.all(indoorImagesPromises);
                    
                    // Step 3: Reduce the results to the desired structure for state update, keeping nulls
                    const newIndoorImagesBase64 = indoorImagesResults.reduce((acc, images, index) => {
                        // Directly use the images array, including nulls
                        acc[aedsLoaded[index].id] = images;
                        return acc;
                    }, {});
                    
                    // Update state once with all fetched (and non-fetched) images
                    setIndoorImagesBase64(prev => ({ ...prev, ...newIndoorImagesBase64 }));
  

                }
            
    
                // Similar approach for indoor images...
    
            } catch (error) {
                console.error("Error loading data", error);
                // Handle the error appropriately
            } finally {

                SplashScreen.hideAsync();
                Alert.alert('Consent', alertMessage, [
                    {
                      text: 'Decline',
                      onPress: () =>Alert.alert('Notice', 'You cannot use this app without providing consent. Please close the app.'),
                      style: 'cancel',
                    },
                    {text: 'Accept'},
                ]);
            }   
        };
    
        fetchData();
    }, []);
    

    async function playSound() {
        const { sound: newSound } = await Audio.Sound.createAsync(require('./assets/sounds/cpr.mp3'));
        setSound(newSound)
        await newSound.playAsync();
        newSound.setIsLoopingAsync(true);
    }

    useEffect(() => {
        if(cprSoundActivated){
           playSound();
        } else {
            if(sound) {
                sound.setIsLoopingAsync(false);
                sound.unloadAsync();
            }
        }
    }, [cprSoundActivated]);

    

    
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
