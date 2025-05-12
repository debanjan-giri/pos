import { Spinner, Container } from 'react-bootstrap';

/**
 * Loading spinner component for async operations
 * @param {Object} props - Component props
 * @param {string} [props.size='lg'] - Size of the spinner (sm, md, lg)
 * @param {string} [props.variant='primary'] - Color variant of the spinner
 * @param {string} [props.text='Loading...'] - Text to display below spinner
 * @param {boolean} [props.fullPage=false] - Whether to center in the full page
 * @returns {JSX.Element} - Rendered component
 */
const LoadingSpinner = ({ 
  size = 'lg', 
  variant = 'primary', 
  text = 'Loading...', 
  fullPage = false 
}) => {
  const content = (
    <div className="text-center">
      <Spinner 
        animation="border" 
        role="status" 
        variant={variant} 
        size={size}
        className="mb-2"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      {text && <p className="text-muted">{text}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <Container 
        fluid 
        className="d-flex align-items-center justify-content-center" 
        style={{ minHeight: '80vh' }}
      >
        {content}
      </Container>
    );
  }

  return (
    <div className="d-flex align-items-center justify-content-center py-5">
      {content}
    </div>
  );
};

export default LoadingSpinner;
