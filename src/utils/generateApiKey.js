import crypto from "crypto";

const generateApiKey = () => {
  return `baas_${crypto.randomBytes(32).toString("hex")}`;
};

export default generateApiKey;