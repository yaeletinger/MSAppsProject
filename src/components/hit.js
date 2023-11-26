import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const Hit = ({hit, index}) => {

    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleModalClose = () => {
        setSelectedItem(null);
    };
    
    return (
        <>
        {/* on press on an image the modal appears and will show the relevant */}
        {/* parameters of the element */}
        <Modal show={selectedItem !== null} onHide={handleModalClose} style={{width:'150px',
        border: '2px solid #333', padding: '10px',  marginLeft: '0px', marginTop: '0px'}}>
            <Modal.Body> 
                {selectedItem && (
                    <div>
                    <p style={{color: 'red'}}>id: {selectedItem.id}</p>
                    <p style={{color: 'red'}}>downloads: {selectedItem.downloads}</p>
                    <p style={{color: 'red'}}>views: {selectedItem.views}</p>
                    <p style={{color: 'red'}}>collections: {selectedItem.collections}</p>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button className='button' 
                 variant="secondary" onClick={handleModalClose}>
                    Close
                </Button>
                </Modal.Footer>
        </Modal>
        {/* the images display 3*3 */}
        <img src={hit.webformatURL} width='300px' height='200px' onClick={() => handleItemClick(hit)}></img>
        {index % 3 == 0 ? (<br/>) : null}
        </>
    );
    
}

export default Hit;