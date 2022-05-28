import React, { forwardRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import withClickOutside from '../helpers/WithClickOutside';

const SideFilter = forwardRef(({ filters, className, onClose, updateFilter }, ref) => {
    return (
        <div className={`filters ${className}`} ref={ref}>
            <button className="btn" onClick={() => { onClose() }}>
                <FontAwesomeIcon icon={faAngleDoubleLeft} />
                <span>Close</span>
            </button>
            <h2>FILTERS</h2>
            <div className="filters-content">
                {filters.map(filter => (
                    <React.Fragment key={filter.key}>
                        <h3>{filter.title}</h3>
                        <div className="filter-group">
                            {filter.options.map( (option, index) => (
                                <div key={option.key} className={`filter-item ${option.disabled && "disabled"}`}>
                                    <input
                                        id={`checkbox-${option.key+index}`}
                                        type="checkbox"
                                        value={option.value}
                                        checked={option.value}
                                        disabled={option.disabled}
                                        onChange={() => {
                                            updateFilter(filter.key, option.key, !option.value)
                                        }}
                                    /><label for={`checkbox-${option.key+index}`}>{option.key}</label>
                                </div>
                            ))}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
})

export default withClickOutside(SideFilter);