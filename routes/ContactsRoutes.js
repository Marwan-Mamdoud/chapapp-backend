import { Router } from "express";
import { isAuth } from "../middlewares/AuthMiddleware.js";
import {
  getAllContacts,
  getContactsForDMList,
  searchContacts,
} from "../controllers/ContactsController.js";
// const ContactsControllers = require("../controllers/ContactsController");
const contactsRoutes = Router();

contactsRoutes.post(
  "/search",
  isAuth,
  searchContacts
  // ContactsControllers.searchContacts,
);

contactsRoutes.get(
  "/get-all-contacts",
  isAuth,
  getContactsForDMList
  // ContactsControllers.getContactsForDMList
);

contactsRoutes.get(
  "/get-all-contacts-for-channel",
  isAuth,
  getAllContacts
  // ContactsControllers.getAllContacts
);

export default contactsRoutes;
