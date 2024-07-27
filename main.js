const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let data = [];

if (fs.existsSync("data.json")) {
  try {
    data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  } catch (err) {
    console.error("Error saat membaca data:", err);
  }
}

async function askQuestion(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function createDataMhs() {
  while (true) {
    console.clear();
    console.log("Masukkan Data Mahasiswa");

    const nama = await askQuestion("Nama: ");
    const nim = await askQuestion("Nim: ");
    const userData = {
      nama: nama,
      nim: nim
    };
    data.push(userData);
    console.log("Data mahasiswa berhasil ditambahkan");
    
    const selesai = await askQuestion("Apakah Input Data Telah Selesai?(y/n): ");
    if (selesai.toLowerCase() === "y") {
      fs.writeFileSync("data.json", JSON.stringify(data));
      break;
    }
  }
  mainMenu();
}

function readDataMhs() {
  console.clear();
  if (data.length === 0) {
    console.log("Data masih kosong");
  } else {
    console.log("Data Mahasiswa:");
    data.forEach((mahasiswa, indeks) => {
      console.log(`${indeks + 1}. ${mahasiswa.nama} ${mahasiswa.nim}`);
    });
  }
  rl.question("\nTekan Enter untuk kembali ke menu utama...", () => {
    mainMenu();
  });
}

async function updateDataMhs() {
  console.clear();
  if (data.length === 0) {
    console.log("Data masih kosong");
  } else {
    console.log("Data Mahasiswa:");
    data.forEach((mahasiswa, indeks) => {
      console.log(`${indeks + 1}. ${mahasiswa.nama} ${mahasiswa.nim}`);
    });

    const indeks = await askQuestion("Masukkan nomor mahasiswa yang ingin diubah: ");
    const idx = parseInt(indeks) - 1;

    if (idx >= 0 && idx < data.length) {
      const nama = await askQuestion("Nama baru: ");
      const nim = await askQuestion("Nim baru: ");
      data[idx] = { nama, nim };
      console.log("Data mahasiswa berhasil diubah");
      fs.writeFileSync("data.json", JSON.stringify(data));
    } else {
      console.log("Nomor mahasiswa tidak valid");
    }
  }
  rl.question("\nTekan Enter untuk kembali ke menu utama...", () => {
    mainMenu();
  });
}

async function deleteDataMhs() {
  console.clear();
  if (data.length === 0) {
    console.log("Data masih kosong");
  } else {
    console.log("Data Mahasiswa:");
    data.forEach((mahasiswa, indeks) => {
      console.log(`${indeks + 1}. ${mahasiswa.nama} ${mahasiswa.nim}`);
    });

    const indeks = await askQuestion("Masukkan nomor mahasiswa yang ingin dihapus: ");
    const idx = parseInt(indeks) - 1;

    if (idx >= 0 && idx < data.length) {
      data.splice(idx, 1);
      console.log("Data mahasiswa berhasil dihapus");
      fs.writeFileSync("data.json", JSON.stringify(data));
    } else {
      console.log("Nomor mahasiswa tidak valid");
    }
  }
  rl.question("\nTekan Enter untuk kembali ke menu utama...", () => {
    mainMenu();
  });
}

async function mainMenu() {
  console.clear();
  console.log("Menu:");
  console.log("1. Membuat Data");
  console.log("2. Membaca Data");
  console.log("3. Mengubah Data");
  console.log("4. Menghapus Data");
  console.log("5. Keluar");

  const choice = await askQuestion("Pilih menu: ");
  switch (choice) {
    case "1":
      await createDataMhs();
      break;
    case "2":
      readDataMhs();
      break;
    case "3":
      await updateDataMhs();
      break;
    case "4":
      await deleteDataMhs();
      break;
    case "5":
      rl.close();
      process.exit();
      break;
    default:
      console.log("Pilihan tidak valid, silakan coba lagi.");
      rl.question("\nTekan Enter untuk kembali ke menu utama...", () => {
        mainMenu();
      });
  }
}

mainMenu();
