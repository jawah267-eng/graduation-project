const bcrypt = require("bcryptjs");
const User = require("../models/user");

const register = async (data) => {
  const { name, email, password, role, dateOfBirth } = data;

  // التأكد أن الإيميل غير مستخدم
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  // تشفير كلمة السر
  const hashedPassword = await bcrypt.hash(password, 10);

  // إنشاء المستخدم
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    dateOfBirth,
  });

  // عدم إرجاع كلمة السر
  user.password = undefined;

  return user;
};

module.exports = {
  register,
};
