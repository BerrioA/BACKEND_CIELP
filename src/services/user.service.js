import { User } from "../models/user.model.js";
import { Role } from "../models/roles.model.js";


export const getUserProfile = async (uid) => {
  const user = await User.findByPk(uid, {
    include: {
      model: Role,
      attributes: ["name"],
    },
  });

  if (!user) {
    throw new Error("Usuario no encontrado.");
  }

  return {
    uid: user.id,
    given_name: user.given_name,
    surname: user.surname,
    email: user.email,
    role: user.role?.name,
  };
};
