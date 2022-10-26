import "./App.scss";
import "boxicons/css/boxicons.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import AddUser from "./pages/AddUser";

import ViewUser from "./pages/ViewUser";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/viewusers" element={<ViewUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
