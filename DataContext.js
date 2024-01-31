import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './services/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [locations, setLocations] = useState([]);
    const [aeds, setAeds] = useState([]);

    //Values to be passed to children
    const value = {
        locations,
        setLocations,
        aeds,
        setAeds,
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const locations = await loadData('Locations');
                const aeds = await loadData('Aeds');
                setLocations(locations);
                setAeds(aeds);
            } catch (error) {

            }        
        }
        fetchData();
    },[]);


    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
