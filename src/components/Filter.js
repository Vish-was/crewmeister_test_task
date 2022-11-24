import React from 'react'
import PropTypes from 'prop-types';
import { options } from '../json/filterData';
import { Select } from '../styles/Styles';
const Filter = ({handleFilterChange,filter}) => {
  return (
    <Select value={filter} onChange={handleFilterChange}>
       <option value="default">Please Select</option>
    {options.map((option, index) => (
      <option key={index + 1} value={option.value}>{option.label}</option>
    ))}
  </Select>
  )
}

export default Filter
Filter.propTypes = {
  handleFilterChange: PropTypes.func,
  filter: PropTypes.string,
};