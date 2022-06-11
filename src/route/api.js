import express from "express";
import APIController from "../controller/apiController";

let router = express.Router();

const initAPIRoute = (app) => {
  router.get("/users", APIController.getAllUsers); //method GET -> READ Data
  router.post("/create", APIController.createNewUser); //method POST -> CREATE Data
  router.put("/edit/", APIController.editUser);
  router.delete("/delete/:userId", APIController.deleteUser);
  return app.use("/api/v1/", router);
};

export default initAPIRoute;
