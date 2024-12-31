import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
interface ICardLoaderProps {
  number: number;
}
function CardLoading({ number }: ICardLoaderProps) {
  return (
    <div className="row g-3 gy-5 py-3 row-deck">
      {Array.from({ length: number }).map((_, index) => (
        <div
          className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6"
          key={index}
        >
          {' '}
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{' '}
                <Placeholder xs={4} /> <Placeholder xs={6} />{' '}
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder.Button variant="primary" xs={6} />
            </Card.Body>
          </Card>{' '}
        </div>
      ))}
    </div>
  );
}

export default CardLoading;
