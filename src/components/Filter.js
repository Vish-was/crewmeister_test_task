import React from 'react'
import PropTypes from 'prop-types';
import { options } from '../json/filterData';
const Filter = ({handleFilterChange,filter}) => {
  return (
    <select value={filter} onChange={handleFilterChange}>
    {options.map((option, index) => (
      <option key={index + 1} value={option.value}>{option.label}</option>
    ))}
  </select>
  )
}

export default Filter
Filter.propTypes = {
  handleFilterChange: PropTypes.func,
  filter: PropTypes.string,
};