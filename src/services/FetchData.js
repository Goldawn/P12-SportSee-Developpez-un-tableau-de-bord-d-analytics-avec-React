import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import mockedActivityData from '../data/activity.json'
import mockedAverageSessionsData from '../data/averageSessions.json'
import mockedPerformanceData from '../data/performance.json'
import mockedUserData from '../data/user.json'

const useMockedData = true;

/**
 * Custom Hook to recover data
 * @param { String } url - the API url
 * @param { string } type - the mocked data type
 * @returns { Object | Boolean } data, isDataLoading, error
*/

const FetchData = (url, type) => {
    
    const params = useParams()
    const [data, setData] = useState({});
    const [isDataLoading, setDataLoading] = useState(false);
    const [error, setError] = useState(false);
    
    useEffect(() => {	

        if ( useMockedData === true ) {
            switch (type) {
                case 'activity':
                    setData(mockedActivityData.find(mockedActivityData => mockedActivityData.data.userId === Number(params.id)).data)
                    setDataLoading(false);
                    break;
                case 'sessions' :
                    setData(mockedAverageSessionsData.find(mockedAverageSessionsData => mockedAverageSessionsData.data.userId === Number(params.id)).data)
                    setDataLoading(false);
                    break;
                case 'performance' :
                    setData(mockedPerformanceData.find(mockedPerformanceData => mockedPerformanceData.data.userId === Number(params.id)).data)
                    setDataLoading(false);
                    break;
                case 'user' :
                    setData(mockedUserData.find(mockedUserData => mockedUserData.data.id === Number(params.id)).data)
                    setDataLoading(false);
                    break;
                default:
                    break;
            }
        }
        else {

            setDataLoading(true);
            async function fetchFonction() {
                setDataLoading(true);
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    setData(data.data);
                } catch (err) {
                    setError(true);
                } finally {
                    setDataLoading(false);
                }
            }
            fetchFonction();
        }

        
    }, [url]);

    return { data, isDataLoading, error };

};

export default FetchData;

