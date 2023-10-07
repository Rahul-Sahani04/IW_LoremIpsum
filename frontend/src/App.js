import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/layout";
import { ChakraProvider } from "@chakra-ui/react";
function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Home />} /> {/* 👈 Renders at /app/ */}
        <Route path="/login" element={<Login />} /> {/* 👈 Renders at /app/ */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
