import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Pedidos from "./pages/Pedidos";
import Items from "./pages/Items";
import VisualizarItem from "./pages/VisualizarItem";
import VisualizarPedido from "./pages/VisualizarPedido";

const PageLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/items" element={<Items />} />
          <Route path="/items/:slug" element={<VisualizarItem />} />
          <Route path="/pedidos/:slug" element={<VisualizarPedido />} />
          <Route path="/" element={<Pedidos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
