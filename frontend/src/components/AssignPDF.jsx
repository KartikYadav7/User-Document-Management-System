import { useState } from "react";
import api from "../api";

export default function AssignPDF({ selectedUsers, pdfPath, clearAll }) {
  const [loading, setLoading] = useState(false);

  const assignAndSend = async () => {
    if (selectedUsers.length === 0) return alert("Select at least one user.");
    setLoading(true);

    try {
      await api.post(`${import.meta.env.VITE_BACKEND_URL}/api/pdf/assign`, { users: selectedUsers, pdfPath });
      alert("PDF assigned and emails sent!");
      clearAll();
          console.log("Assigning PDF:", pdfPath);
console.log("Users:", selectedUsers);
    } catch (err) {
      console.error(err);
      alert("Error assigning PDF.");
    } finally {
      setLoading(false);
    }
  };

  const downloadZip = async () => {
    if (selectedUsers.length === 0) return alert("Select at least one user.");
    try {
      const res = await api.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/pdf/download-zip`,
        { users: selectedUsers },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "assigned_pdfs.zip");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert("Error downloading ZIP.");
    }
  };

  return (
    <div className="card p-3 my-3">
      <button
        className="btn btn-warning me-2"
        onClick={assignAndSend}
        disabled={loading || !pdfPath || selectedUsers.length === 0}
      >
        {loading ? "Processing..." : "Assign PDF"}
      </button>

      <button
        className="btn btn-secondary mt-4"
        onClick={downloadZip}
        disabled={selectedUsers.length === 0}
      >
        Download Assigned PDFs (ZIP)
      </button>
    </div>
  );
}
