export default function UserList({ users, selected, setSelected }) {
  const allChecked = users.length > 0 && selected.length === users.length;

  const toggleSelectAll = () => {
    if (allChecked) setSelected([]);
    else setSelected(users.map((u) => u._id));
  };

  const toggleUser = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="card p-3">
      <h4>User List</h4>
      <table className="table table-bordered table-striped mt-2">
        <thead>
          <tr>
            <th>
              <input type="checkbox" checked={allChecked} onChange={toggleSelectAll} />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(u._id)}
                  onChange={() => toggleUser(u._id)}
                />
              </td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
