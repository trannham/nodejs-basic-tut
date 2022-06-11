import express from "express";
import homeController from "../controller/homeController";
let router = express.Router();

const initWebRoute = (app) => {
  router.get("/", homeController.getHomepage);
  router.get("/detail/user/:userId", homeController.getDetailpage);
  router.get("/about", (req, res) => {
    res.send("I'm Tran Nham");
  });

  router.post("/create", homeController.createNewUser);
  router.post("/delete", homeController.deleteUser);
  router.get("/edit/:userId", homeController.getEditpage);
  router.post("/update-user", homeController.updateUser);

  return app.use("/", router);
};

export default initWebRoute;
