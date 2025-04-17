import React, { useEffect, useState } from 'react';
import TourCard from './TourCard';
import DestinationSelector from './DestinationSelector';

// Gallery is responsible for fetching tours and rendering TourCard components
const Gallery = ({ tours, setTours, onRemove }) => {
    // local state to manage loading, errors, and selected tour name
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedName, setSelectedName] = useState('All'); // State for dropdown selection

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

    // Render loading state
    if (loading) {
        return <h2>Loading...</h2>;
    }

    // Render error state
    if (error) {
        return <h2>Something went wrong...</h2>;
    }

    // Render if no tours remain
    if (tours.length === 0) {
        return (
            <>
                <h2>No tours left</h2>
                <button onClick={fetchTours}>Refresh</button>
            </>
        );
    }

    // Filter tours based on the selected name
    const filteredTours = selectedName === 'All' ? tours : tours.filter((tour) => tour.name === selectedName);

    return (
        <section className="gallery">
            {/* DestinationSelector component */}
            <DestinationSelector
                tours={tours}
                selectedName={selectedName}
                setSelectedName={setSelectedName}
            />

            {/* Render the list of TourCards */}
            {filteredTours.map((tour) => (
                <TourCard
                    key={tour.id}
                    {...tour} // spread operator to pass all props
                    onRemove={onRemove} // pass onRemove function to TourCard
                />
            ))}
        </section>
    );
};

export default Gallery;
