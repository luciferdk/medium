import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const logout = () => {
  // Remove the token from local storage
  localStorage.removeItem('token');
  
  // Check if the token was removed successfully
  return !localStorage.getItem('token'); // Return true if logout is successful
}




export const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleLogout = async () => {
    const isLoggedOut = await logout();
    if (isLoggedOut) {
        navigate('/signin');
    } else {
        console.error('Logout failed');
    }
};

  return (
    <div className="bg-gray-400 h-10 w-10 flex justify-center flex-col" ref={dropdownRef}>
      {/* Profile Icon */}
      <div className="flex justify-center">
        <button onClick={toggleDropdown} className="flex items-center space-x-2">
          <img
            src="https://www.hindustantimes.com/ht-img/img/2024/02/28/550x309/laapataa_ladies_review_1709124058956_1709124059133.png"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-12 mt-3 w-40 rounded-md focus:outline-none">
          <ul className=" bg-gray-700 py-2" aria-labelledby="user-menu-button">
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                Profile
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                Earnings
              </a>
            </li>
            <li>
              <a
                onClick={handleLogout} // Call the logout function
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};




