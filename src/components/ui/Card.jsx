import React from 'react';
import clsx from 'clsx';
import './Card.css';

const Card = ({ children, className, onClick }) => {
    return (
        <div className={clsx('card', className)} onClick={onClick}>
            {children}
        </div>
    );
};

export default Card;
