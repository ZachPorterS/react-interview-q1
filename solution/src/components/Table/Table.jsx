import "./table.css";

const Table = ({ data }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td data-label="name">{item.name}</td>
              <td data-label="location">{item.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
