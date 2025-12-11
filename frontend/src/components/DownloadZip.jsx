import api from "../api";

export default function DownloadZIP() {
  const downloadZip = () => {
    window.location = api.defaults.baseURL + "/api/pdf/download-zip";
  };

  return (
    <button className="btn btn-dark mt-3" onClick={downloadZip}>
      Download All PDFs as ZIP
    </button>
  );
}
