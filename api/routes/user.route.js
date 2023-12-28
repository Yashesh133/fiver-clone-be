import express from "express";

const routes = express.Router();

routes.get("/register");
routes.get("/login");

export default routes;
