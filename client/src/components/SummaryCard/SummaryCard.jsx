import "./SummaryCard.css";

function SummaryCard({ account }) {
  return (
    <div className="summary-card">
      <h3>Connected Account</h3>

      {account ? (
        <>
          <p>
            <strong>Account:</strong> {account.account}
          </p>

          <p>
            <strong>Routing:</strong> {account.routing}
          </p>

          <p>
            <strong>Wire Routing:</strong> {account.wire_routing}
          </p>
        </>
      ) : (
        <p>No account connected.</p>
      )}
    </div>
  );
}

export default SummaryCard;
