import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './services/firebaseConfig';
import { getStorage, ref, getBlob} from 'firebase/storage'
import { Audio } from 'expo-av';
import * as SplashScreen from 'expo-splash-screen';


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
                const [locations, aeds] = await Promise.all([
                    loadData('Locations'),
                  //  loadData('Aeds')
                ]);
                setLocations(locations);
                setAeds(aeds);
    
                // Fetch all images in parallel after AEDs are loaded
                const coverImagesPromises = aeds.map(aed => aed.Image ? fetchImages(aed.Image) : null);
                const coverImages = await Promise.all(coverImagesPromises);
    
                // Update state once with all images
                const newCoverImagesBase64 = coverImages.reduce((acc, imageData, index) => {
                    if (imageData) {
                        acc[aeds[index].id] = imageData;
                    }
                    return acc;
                }, {});
    
                setCoverImagesBase64(prev => ({ ...prev, ...newCoverImagesBase64 }));
    
                // Similar approach for indoor images...
    
            } catch (error) {
                console.error("Error loading data", error);
                // Handle the error appropriately
            } finally {
                SplashScreen.hideAsync();
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
