import React, { useState, useEffect, useRef } from 'react';
import Displayimg from '../icons_FEtask/Display.svg';
import Downimg from '../icons_FEtask/down.svg';
import './Header.css';

const Header = ({ onGroupingChange, onSortingChange, grouping, sorting }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Toggle the dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const handleGroupingChange = (value) => {
        onGroupingChange(value);
        setIsDropdownOpen(false); // Close dropdown after selecting
    };

    const handleSortingChange = (value) => {
        onSortingChange(value);
        setIsDropdownOpen(false); // Close dropdown after selecting
    };

    return (
        <div className="header">
            <button className="display-button" onClick={toggleDropdown}>
                <img src={Displayimg} alt="Display Img" /> Display <img src={Downimg} alt="Down Img" />
            </button>

            {isDropdownOpen && (
                <div className="dropdown-menu" ref={dropdownRef}>
                    <div className="dropdown-section">
                        <label>Grouping</label>
                        <select value={grouping} onChange={(e) => handleGroupingChange(e.target.value)}>
                            <option value="status">Status</option>
                            <option value="user">User</option>
                            <option value="priority">Priority</option>
                        </select>
                    </div>

                    <div className="dropdown-section">
                        <label>Ordering</label>
                        <select value={sorting} onChange={(e) => handleSortingChange(e.target.value)}>
                            <option value="priority">Priority</option>
                            <option value="title">Title</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
