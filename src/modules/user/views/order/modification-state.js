import React from 'react'
import { Check, Circle, Slash } from 'react-feather'
import './order.css'
function PopupAlert({ message, onYes, onNo }) {
    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '2%',
            border: '0.1% solid #ccc',
            boxShadow: '0 0.2% 1% rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            borderRadius: '1%'
        }}>
            <p>{message}</p>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10%' }}>
                <button
                    onClick={onYes}
                    className="pretty-button yes-button small-button" // Added small-button class
                >
                    <Check size={16} />
                </button>
                <button
                    onClick={onNo}
                    className="pretty-button no-button small-button" // Added small-button class
                >
                    <Circle size={16} style={{ position: 'absolute' }} />
                    <Slash size={16} />
                </button>
            </div>
        </div>
    )
}

export default PopupAlert