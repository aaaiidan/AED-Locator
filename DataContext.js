import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './services/firebaseConfig';
import { getStorage, ref, getBlob} from 'firebase/storage'


const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [locations, setLocations] = useState([]);
    const [aeds, setAeds] = useState([]);
    const [imagesBase64, setImagesBase64] = useState({});

    //Values to be passed to children
    const value = {
        locations,
        aeds,
        imagesBase64
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
            const storageRef = ref(getStorage(), imagePath.path.replace('gs:/', 'gs://'))
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
                const locations = await loadData('Locations');
                const aeds = await loadData('Aeds');
                setLocations(locations);
                setAeds(aeds);

                const storageDataUpdates = {};
                await Promise.all(aeds.map(async (aed) => {
                    if (aed.Image) {
                        const imageData = await fetchImages(aed.Image);
                        storageDataUpdates[aed.id] = imageData;
                    }
                }));

                setImagesBase64(prevStorageData => ({ ...prevStorageData, ...storageDataUpdates }));
                
            } catch (error) {

            }        
        }
        fetchData();
    },[]);

   


    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
