import { AdditionalInformation } from "../models/index.js";

// Servicio para actualizar la información adicional de usuarios
export const updateAdditionalInformation = async ({
  userId,
  dataAdditionalInformationUpdate,
  transaction,
}) => {
  try {
    const additionalInfo = await AdditionalInformation.findOne({
      where: { user_id: userId },
      attributes: [
        "id",
        "date_of_birth",
        "sex",
        "data_privacy_consent",
        "psychological_treatment_consent",
        "service_id",
      ],
      transaction,
    });

    if (!additionalInfo) {
      return { error: "Información adicional no encontrada" };
    }

    await additionalInfo.update(dataAdditionalInformationUpdate, {
      transaction,
    });

    return additionalInfo;
  } catch (error) {
    console.error({ message: error });
    throw new Error(
      "Error al actualizar la información adicional: " + error.message
    );
  }
};
