import Router from "express";
import {
  addFlock,
  deleteAllFlock,
  deleteOneFlock,
  getAllFlocks,
  getOneFlock,
  updateFlock,
} from "../controllers/Flock.controller.js";
const router = Router();
router.route("/flocks/addFlock").post(addFlock);
router.route("/flocks").get(getAllFlocks).delete(deleteAllFlock);
router
  .route("/flocks/:id")
  .put(updateFlock)
  .get(getOneFlock)
  .delete(deleteOneFlock);
export default router;
