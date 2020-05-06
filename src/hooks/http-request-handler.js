import {useState, useEffect} from 'react';

export default httpClient => {
  const [state, setState] = useState({error: null});

    const reqInt = httpClient.interceptors.request.use(res => {
      setState({error: null});
      return res;
    });      
    const respInt = httpClient.interceptors.response.use(res => res, err => {
      setState({error: err});
      return Promise.reject(err);
    });

    useEffect(() => {
      return () => {
        httpClient.interceptors.request.eject(reqInt);
        httpClient.interceptors.response.eject(respInt);
      }
    }, [reqInt, respInt])
    return [state, setState];
}