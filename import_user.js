// Script: import_user.js
// Chức năng: Import user từ users.csv, sinh password random, lưu DB, gửi mail password

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const User = require('./schemas/users');
const Role = require('./schemas/roles');
const sendMail = require('./utils/sendMailHandler');

// Hàm sinh password random 16 ký tự
function generatePassword(length = 16) {
  return crypto.randomBytes(length).toString('base64').slice(0, length);
}

async function importUsers() {
  const filePath = path.join(__dirname, 'users.csv');
  const data = fs.readFileSync(filePath, 'utf8');
  const lines = data.trim().split('\n');
  const users = lines.slice(1).map(line => {
    const [username, email] = line.split(',').map(s => s.trim());
    return { username, email };
  });

  // Lấy ObjectId của role "user"
  const userRole = await Role.findOne({ name: 'user' });
  if (!userRole) {
    console.error('Không tìm thấy role "user" trong collection roles.');
    return;
  }

  for (const { username, email } of users) {
    const password = generatePassword();
    try {
      // Tạo user mới
      const user = new User({
        username,
        email,
        password,
        role: userRole._id,
      });
      await user.save();

      // Gửi email password
      await sendMail({
        to: email,
        subject: 'Tài khoản mới của bạn',
        text: `Xin chào ${username},\nMật khẩu truy cập: ${password}`,
      });
      console.log(`Đã tạo và gửi mail cho ${username}`);
    } catch (err) {
      console.error(`Lỗi với user ${username}:`, err.message);
    }
  }
}

importUsers();
