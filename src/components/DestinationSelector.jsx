import React from 'react';

const DestinationSelector = ({ tours, selectedName, setSelectedName }) => {
    return (
        <div className="filter-container">
            <label htmlFor="tour-filter">Filter by Name: </label>
            <select
                id="tour-filter"
                value={selectedName}
                onChange={(e) => setSelectedName(e.target.value)}
            >
                <option value="All">All</option>
                {tours.map((tour) => (
                    <option key={tour.id} value={tour.name}>
                        {tour.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DestinationSelector;