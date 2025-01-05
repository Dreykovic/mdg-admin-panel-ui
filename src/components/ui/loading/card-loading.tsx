// CardLoading.jsx
import React from 'react';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

interface ICardLoaderProps {
  number?: number; // Number of loading cards to display
}

const CardLoading: React.FC<ICardLoaderProps> = ({ number = 8 }) => {
  return (
    <div className="row g-3 gy-5 py-3 row-deck">
      {Array.from({ length: number }).map((_, index) => (
        <div className={`col-${Math.floor(12 / number)}`} key={index}>
          <Card style={{ width: '100%' }}>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />
                <Placeholder xs={4} /> <Placeholder xs={6} />
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder.Button variant="primary" xs={6} />
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default CardLoading;
