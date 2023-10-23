'use client'

import React, { useEffect } from 'react';
const WhatsAppClickHandler = () => {
  useEffect(() => {
    const handleClick = () => {
        console.log('CLICKED!')

        //fire GTM event
    }
    const handleLoad = () => {
      console.log('LOADED from component')
      //this gets the INNER button, not the bubble.
      const waButton = document.querySelector('.elfsight-app-a73b12f4-a34b-4fd4-8585-b9a9aed04015'); 
      console.log(waButton)
      waButton?.addEventListener('click', handleClick);
      
    };
    window.addEventListener('load', handleLoad);
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return <></>
};

export default WhatsAppClickHandler;