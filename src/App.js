import React, { Component} from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Hits from './components/hits';
import { setHits, setMaxPages } from './features/hitsSlice';
import { gethitsFirst } from './utils/hitsUtil';

function App() {

  const [message, setMessage] = useState("Hits");
  const hits = useSelector(state => state.hitsSlice.hits);
  const dispatch = useDispatch();

  // a server call to the URL
  //call the function that render from the data first 9 photos
  useEffect(() => {
    if(!hits.length)
      gethitsFirst().then(res => {
        dispatch(setHits(res.data.hits));
        dispatch(setMaxPages(res.data.maxPages))
      });
  }, []);

  
    return (
      <div style={{overflow: 'scroll'}}>
         <h1 style={{color: 'red', textAlign: 'center'}}>{message}</h1>  
            <Hits/>
      </div>
    );
  
  
}



export default App;
