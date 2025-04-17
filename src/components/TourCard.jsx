import React, { useState } from 'react';
import '../styles/styles.css'; // import styles

// TourCard renders individual tour details
const TourCard = ({ id, name, info, price, image, onRemove }) => {
  // local state to toggle read more/less
  const [readMore, setReadMore] = useState(false);

  return (
    <article className="tour-card">
      <img src={image} alt={name} className="tour-image" />
      <h3>{name}</h3>
      <h5>{price}</h5>

      <p>
        {/* if readMore is true, show full info, else show truncated info */}
        {readMore ? info : `${info.substring(0, 80)}... `}
        <button className="toggle-btn" onClick={() => setReadMore(!readMore)}>
          {readMore ? 'Show Less' : 'Read More'}
        </button>
      </p>

      {/* Button to remove tour */}
      <button className="btn-remove" onClick={() => onRemove(id)}>
        Not Interested
      </button>
    </article>
  );
};

export default TourCard;
