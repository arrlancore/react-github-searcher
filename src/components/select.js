import React, { useState, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const SelectContainer = styled.div`
  position: relative;
  max-width: 220px;
  width: 100%;
`;

const SelectedValue = styled.div`
  padding: 8px 16px 8px 8px;
  border: 1px solid #d3d3d3;
  cursor: pointer;
  font-size: 14px;
`;

const OptionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #d3d3d3;
  background-color: white;
  z-index: 1;
  box-sizing: border-box;
`;

const Option = styled.div`
  padding: 8px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #f7f7f7;
  }
`;

const Placeholder = styled.div`
  color: #777;
  font-size: 14px;
`;

const ImgIcon = styled.img`
  position: absolute;
  right: 2px;
  top: 10px;
  cursor: pointer;
`;

const Select = ({ options, onChange, placeholder, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleOptionClick = ({ value, label }) => {
    setSelectedLabel(label);
    setIsOpen(false);
    onChange && onChange(value);
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <SelectContainer ref={ref}>
      <SelectedValue onClick={() => setIsOpen(!isOpen)}>
        {selectedLabel || defaultValue || (
          <Placeholder>{placeholder}</Placeholder>
        )}
      </SelectedValue>
      {isOpen && (
        <OptionsContainer>
          {options.map((option) => (
            <Option
              key={option.value}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </Option>
          ))}
        </OptionsContainer>
      )}
      <ImgIcon
        alt="Arrow Down Icon"
        src="./arrow-down.svg"
        width={18}
        height={18}
        onClick={() => setIsOpen((prev) => !prev)}
      />
    </SelectContainer>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
};

Select.defaultProps = {
  placeholder: "Select an option",
};

export default Select;
