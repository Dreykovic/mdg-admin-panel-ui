type Props = { error: any };

const ErrorAlert = ({ error }: Props) => {
  const errorMessage =
    error.data?.message || // Message d'erreur spécifique à votre API
    error.error || // Message généré par RTK Query
    'An unknown error occurred.';

  return (
    <div className="alert alert-danger" role="alert">
      <h4 className="alert-heading">Error!</h4>
      <p>{errorMessage}</p>
      <hr />
      <pre>{JSON.stringify(error, null, 2)}</pre> {/* Debug complet */}
    </div>
  );
};

export default ErrorAlert;
