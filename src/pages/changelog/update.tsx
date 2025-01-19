import changelogData from './data';

const ChangelogUpdates = () => {
  const renderUpdates = changelogData.map((newChange) => {
    return (
      <div className="pt-2">
        <h6 className="d-inline-block">
          <span className="badge bg-secondary font-weight-light">
            {newChange.version}
          </span>
        </h6>
        <span className="text-muted">
          &nbsp;&nbsp;&nbsp; –-- {newChange.date}
        </span>
        <ul className="ms-5">
          {newChange.updates.map((update) => {
            return (
              <>
                <li>
                  {update.description}
                  {update.details.length > 0 ? (
                    <ul>
                      {update.details.map((detail) => {
                        return <li>{detail}</li>;
                      })}
                    </ul>
                  ) : (
                    ''
                  )}
                </li>
              </>
            );
          })}
        </ul>
      </div>
    );
  });
  return <>{renderUpdates}</>;
};

export default ChangelogUpdates;
