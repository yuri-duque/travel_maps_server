import bcrypt from "bcrypt";

export async function encrypt(text) {
  const salt = await bcrypt.genSalt(10);
  const result = await bcrypt.hash(text, salt);

  return result;
}

export async function decrypt(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function compare(password, hash) {
  return await bcrypt.compare(password, hash);
}
