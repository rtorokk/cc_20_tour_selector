import React, { useEffect, useState } from 'react';
import TourCard from './TourCard';

// Gallery is responsible for fetching tours and rendering TourCard components
const Gallery = ({ tours, setTours, onRemove }) => {
    // local state to manage loading and errors
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // function to fetch tours from API
    const fetchTours = async () => {
        try {
            const res = await fetch('https://www.course-api.com/react-tours-project');
            const data = await res.json();
            // Map the API data to only the fields we need
            const trimmed = data.map((tour) => ({
                id: tour.id,
                name: tour.name,
                info: tour.info,
                image: tour.image,
                price: `Tour Price: $${tour.price}`,
            }));
            setTours(trimmed); // Save data to global state
            setLoading(false); // Set loading to false
        } catch (error) {
            setError(true); // If the fetch fails, show error
            setLoading(false); // Set loading to false
        }
    };

    // Run fetchTours once after the component mounts
    useEffect(() => {
        fetchTours();
    }, []); // empty dependency array means run once after mount

};

export default Gallery;
