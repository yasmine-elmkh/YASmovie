import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages/detail/Detail";
import Search from "../pages/Search";
import AddMovie from "../pages/AddMovie";
import { HOME_PAGE } from "../constants/Config";

const CustomRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${HOME_PAGE}`} replace />} />
      <Route path={`/${HOME_PAGE}`} element={<Home />} />
      <Route path="/recherche" element={<Search />} />
      <Route path="/ajouter" element={<AddMovie />} />
      <Route path={`/${HOME_PAGE}/:category/search/:keyword`} element={<Catalog />} />
      <Route path={`/${HOME_PAGE}/:category/:id`} element={<Detail />} />
      <Route path={`/${HOME_PAGE}/:category`} element={<Catalog />} />
      <Route path="*" element={<Navigate to={`/${HOME_PAGE}`} replace />} />
    </Routes>
  );
};

export default CustomRoutes;