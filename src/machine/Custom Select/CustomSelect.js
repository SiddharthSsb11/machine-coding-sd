import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./CustomSelect.css"; // Add a CSS file for styling

const CustomSelect = ({
  options,
  onChange,
  isMultiSelect = false,
  customStyles = {},
  placeholder = "Select...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const dropdownRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (value) => {
    if (isMultiSelect) {
      setSelectedValues((prev) => {
        const isAlreadySelected = prev.includes(value);
        if (isAlreadySelected) {
          return prev.filter((v) => v !== value);
        } else {
          return [...prev, value];
        }
      });
      onChange(selectedValues);
    } else {
      setSelectedValues([value]);
      onChange(value);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) =>
        Math.min(prev + 1, filteredOptions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      const selectedOption = filteredOptions[highlightedIndex];
      if (selectedOption) {
        handleSelect(selectedOption);
      }
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  return (
    <div
      className="custom-select-container"
      style={customStyles.container}
      ref={dropdownRef}
    >
      <div
        className="custom-select-input"
        style={customStyles.input}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="selected-values">
          {isMultiSelect
            ? selectedValues.map((value, index) => (
                <span
                  key={index}
                  className="selected-tag"
                  style={customStyles.tag}
                >
                  {value}
                </span>
              ))
            : selectedValues[0] || placeholder}
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          style={customStyles.searchInput}
          placeholder={isMultiSelect ? "" : placeholder}
        />
      </div>
      {isOpen && (
        <ul className="custom-select-dropdown" style={customStyles.dropdown}>
          {filteredOptions.map((option, index) => (
            <li
              key={option}
              className={`dropdown-item ${
                highlightedIndex === index ? "highlighted" : ""
              }`}
              style={customStyles.option}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  isMultiSelect: PropTypes.bool,
  customStyles: PropTypes.object,
  placeholder: PropTypes.string,
};

export default CustomSelect;
