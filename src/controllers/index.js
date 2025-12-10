export { login, logout, profile } from "./auth.controller.js";
export { refreshToken } from "./refreshToken.controller.js";
export {
  registerPatient,
  getPatients,
  getPatientById,
  deletePatient,
  deletePatientComplete,
} from "./patient.controller.js";
export { getServices } from "./services.controller.js";
export { getSpaces } from "./spaces.controller.js";
export {
  registerAdmin,
  updateUsers,
  registerPsychologist,
  getAllUsersTrash,
} from "./user.controller.js";
