import React, { useRef, useState, useEffect } from 'react';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import Hit from './hit';
import api from '../api';
import { setCurrentPage, setHits, setMaxPages } from '../features/hitsSlice';
import { gethitsByPage, gethitsByCategory, gethitsFirst } from '../utils/hitsUtil';

export default function Hits() {
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const currentPage = useSelector((state) => state.hitsSlice.currentPage);
    const maxPages = useSelector((state) => state.hitsSlice.maxPages);
    const hits = useSelector((state) => state.hitsSlice.hits);
    console.log(hits);
    const dispatch = useDispatch();
    
    const handleClickPrev = async(event) =>{
        event.preventDefault();
        await gethitsByPage(currentPage - 1).then(res => {
            dispatch(setHits(res.data.hits));
            dispatch(setMaxPages(res.data.maxPages));
        });
        dispatch(setCurrentPage(currentPage - 1));
    }

    const handleClickNext = async(event) =>{
        event.preventDefault();
        await gethitsByPage(currentPage + 1).then(res => {
            dispatch(setHits(res.data.hits));
            dispatch(setMaxPages(res.data.maxPages));
        });
        dispatch(setCurrentPage(currentPage + 1));
        console.log(hits[0]);
    }

    const handleSearch = async(event) => {
        event.preventDefault();
        await gethitsFirst().then(res => {
            dispatch(setHits(res.data.hits));
            dispatch(setMaxPages(res.data.maxPages))
          });
        console.log('Input value:', inputValue);
        await gethitsByCategory(currentPage, inputValue).then(res => {
            dispatch(setHits(res.data.hits));
            console.log(currentPage);
        });
        
    };

    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (bool) => {
        setSelectedItem(bool);
    };

    const handleModalClose = () => {
        setSelectedItem(null);
    };


    

    return(
        <div>
            {/* creating button prevn */}
            <button className='button' 
                onClick={handleClickPrev} disabled={currentPage == 1}>Prev</button>
            {/* creating button next */}
            <button className='button'
                onClick={handleClickNext} disabled={currentPage == maxPages}>Next</button>


            {/* on press button, modal will appear  for selecting the type of the photos */}
            <div style={{right: '50%', position: 'fixed', top: '70px'}}>
                <button style={{width: '90px'}} className='button' type="submit" onClick={() => handleItemClick(true)}>Search</button>
                <Modal show={selectedItem !== null} onHide={handleModalClose} style={{width:'300px',
                    border: '2px solid #333', padding: '10px',  marginLeft: '0px', marginTop: '0px'}}>
                <Modal.Body> 
                    {selectedItem && (
                        <div>
                        <h3 style={{color: 'red'}}>select the type:</h3>
                        <button className='button' value={"animals"} onClick={handleInputChange} style={{color: 'red'}}>Animals</button>
                        <button className='button' value={"Sport"} onClick={handleInputChange} style={{color: 'red'}}>Sport</button>
                        <button className='button' value={"work"} onClick={handleInputChange} style={{color: 'red'}}>work</button><br/>
                        {/* server call to get the new data */}
                        <button className='button2' type="submit" onClick={handleSearch}>search</button>

                        
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button className='button2' 
                    variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            
            <div style={{justifyContent:'center', marginLeft: '20%'}}>
                {hits.map((hit, index) => {
                    return <Hit key={hit.id} hit={hit} index={index + 1} />
                })}
            </div>
        </div>
       
    )

}


