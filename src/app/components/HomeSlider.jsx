'use client'

import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import SearchBox from './SearchBox';



function HomeSlider() {
    const slides = [
        {
            url: "https://images2.alphacoders.com/101/thumb-1920-1019901.jpg",
           

        },
        {
            url: 'https://wallpapercave.com/wp/wp3724325.jpg',
           
        },

        {
            url: 'https://www.itl.cat/pngfile/big/291-2918816_pizza-fast-food-vegetables-pizza-fast-food.jpg',
          
        },


    ]

    const [currentSlide, setCurrentSlide] = useState(0);

    const preSlide = () => {
        const isFirst = currentSlide === 0;
        const newSlide = isFirst ? slides.length - 1 : currentSlide - 1;
        setCurrentSlide(newSlide);
    };

    const nextSlide = () => {
        const isLast = currentSlide === slides.length - 1;
        const newSlide = isLast ? 0 : currentSlide + 1;
        setCurrentSlide(newSlide);
    };

   

    useEffect(() => {
        const interval = setInterval(nextSlide, 2000); // Change slide every 2 seconds
        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [currentSlide, nextSlide]);

    return (
        <div className='w-full h-[88vh] rounded-sm shadow-md m-auto   relative group'>
            <div className='w-full h-full rounded-sm bg-cover bg-center duration-500 relative' style={{ backgroundImage: `url(${slides[currentSlide].url})` }}>
                {/* Overlay with text */}
                <div className="absolute inset-0  flex flex-col justify-center items-center">
                 <h1 className='text-3xl font-semibold text-slate-50'>Deliciously Convenient :- Your Favorite Food, Delivered Fast!</h1>

                </div>
                {/* 
                
                
                {/* left arrow  */}
                <div className='hidden group-hover:block absolute top-1/2 -translate-x-0 translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <MdKeyboardArrowLeft onClick={preSlide} size={30} />
                </div>
                {/* right arrow */}
                <div className='hidden group-hover:block absolute top-1/2 -translate-x-0 translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <MdOutlineKeyboardArrowRight onClick={nextSlide} size={30} />
                </div>
            </div>
           
        </div>
    )
}

export default HomeSlider;
