import React, { useState, useEffect } from 'react';
import { MoveRight } from 'lucide-react'; // Adjust this import based on your icon library
import Header from './Header';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If the user scrolls down more than 20px, set isScrolled to true
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <Header/>
    <nav
      className={`flex items-center justify-around pb-4 sticky top-0 transition-all duration-300 ease-in-out z-50 ${
        isScrolled 
          ? 'bg-black text-white pt-4 shadow-md' 
          : 'bg-transparent text-black mt-4 pt-0'
      }`}
    >
      <h1 className="text-4xl">careerforge.ai</h1>
      
      <div className="font-medium text-lg mt-2">
        <a className="mx-8" href="#product">
          Product
        </a>
        <a className="mx-8" href="#">
          Features
        </a>
        <a className="mx-8" href="#">
          Testimonials
        </a>
        <a className="mx-8" href="#">
          FAQ
        </a>
      </div>

      <button
        className={`group flex items-center gap-2 rounded-4xl text-lg cursor-pointer p-2 px-8 mx-4 transition-colors duration-300 ease-in-out ${
          isScrolled 
            ? 'bg-white text-black' 
            : 'bg-black text-white'
        }`}
      >
        Get Started
        <MoveRight
          className="transition-transform duration-300 ease-in-out group-hover:translate-x-1.5"
          size={22}
          color={isScrolled ? 'black' : 'white'}
        />
      </button>
    </nav>
    </>
  );
}