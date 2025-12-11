import { useState } from "react";
import api from "../api";

export default function UploadCSV({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a CSV file");

    const formData = new FormData();
    formData.append("csv", file);

    const res = await api.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/upload-csv`, formData);
    alert("CSV Uploaded");

    onUpload(res.data.users);
  };

  return (
    <div className="card p-3 mb-3">
      <h4>Upload CSV</h4>

      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".csv"
          className="form-control"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="btn btn-primary mt-2">Upload</button>
      </form>
    </div>
  );
}
