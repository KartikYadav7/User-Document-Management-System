import { useState } from "react";
import api from "../api";


export default function PDFManager({ onPDF }) {
  const [title, setTitle] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title && !pdfFile) {
      return alert("Please upload a PDF OR enter a title to create one.");
    }

    setLoading(true);

    const formData = new FormData();
    if (title) formData.append("title", title);
    if (pdfFile) formData.append("pdfFile", pdfFile);

    try {
      const res = await api.post(`${import.meta.env.VITE_BACKEND_URL}/api/pdf/create-or-upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("PDF ready!");
      onPDF(res.data.pdfPath);

      // reset UI
      setTitle("");
      setPdfFile(null);
    } catch (err) {
      console.error(err);
      alert("Error uploading/creating PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-3 my-3">
      <h4>Upload or Create PDF</h4>

      {/* UPLOAD PDF */}
      <div className={`pdf-input-container ${title.length > 0 ? "blurred" : ""}`}>
        <label className="mt-2 fw-bold">Upload PDF File</label>
        <input
          type="file"
          accept="application/pdf"
          className="form-control"
          onChange={(e) => setPdfFile(e.target.files[0])}
          disabled={title.length > 0}
        />
      </div>

      <div className="text-center my-2 fw-bold">-- OR --</div>

      {/* CREATE PDF */}
      <div className={`pdf-input-container ${pdfFile ? "blurred" : ""}`}>
        <label className="fw-bold mb-2">Create PDF File</label>
        <textarea
          type="text"
          className="form-control form control-lg py-4 mb-2 "
          placeholder="Start typing...."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={pdfFile !== null}
        />
      </div>

      <button
        className="btn btn-success mt-2"
        onClick={handleSubmit}
        disabled={loading || (!title && !pdfFile)}
      >
        {loading ? "Processing..." : "Save PDF"}
      </button>
    </div>
  );
}
