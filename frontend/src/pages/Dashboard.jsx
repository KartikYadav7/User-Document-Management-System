import { useState } from "react";
import UploadCSV from "../components/UploadCSV";
import UserList from "../components/UserList";
import PDFManager from "../components/PDFManager";
import AssignPDF from "../components/AssignPDF";

export default function App() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [pdfPath, setPdfPath] = useState("");

  const clearAll = () => {
    setSelected([]);
    setPdfPath("");
  };

  return (<>
  <h1 className="p-4 text-center font-bold text-white bg-black">User Document Management System</h1>
   <div className="container py-4">
      <UploadCSV onUpload={setUsers} />

      <UserList users={users} selected={selected} setSelected={setSelected} />

      <PDFManager onPDF={setPdfPath} />

      <AssignPDF
        selectedUsers={selected}
        pdfPath={pdfPath}
        clearAll={clearAll}
      />
    </div>
  </>
   
  );
}
