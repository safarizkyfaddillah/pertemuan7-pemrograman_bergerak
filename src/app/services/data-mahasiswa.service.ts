import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class DataMahasiswaService {

  // Kunci penyimpanan (nama penyimpanan di Preferences)
  private KEY_MAHASISWA = 'data_mahasiswa_app';

  constructor() { }

  // ==============================
  // FUNGSI 1: Membaca Data
  // ==============================
  async getData() {
    const { value } = await Preferences.get({ key: this.KEY_MAHASISWA });

    return value ? JSON.parse(value) : [];
  }

  // ==============================
  // FUNGSI 2: Menambah Data Baru
  // ==============================
  async tambahData(mahasiswaBaru: any) {
    const dataLama = await this.getData();

    // Tambahkan ID unik otomatis
    mahasiswaBaru.id = Date.now();

    dataLama.push(mahasiswaBaru);

    return await Preferences.set({
      key: this.KEY_MAHASISWA,
      value: JSON.stringify(dataLama)
    });
  }

  // ==============================
  // FUNGSI 3: Hapus Data
  // ==============================
  async hapusData(id: number) {
    const dataLama = await this.getData();

    // Filter data (hapus berdasarkan ID)
    const dataBaru = dataLama.filter((item: any) => item.id !== id);

    return await Preferences.set({
      key: this.KEY_MAHASISWA,
      value: JSON.stringify(dataBaru)
    });
  }

  // ==============================
  // FUNGSI 4: Update Data
  // ==============================
  async updateData(dataBaru: any) {
    const dataLama = await this.getData();

    const index = dataLama.findIndex(
      (item: any) => item.id === dataBaru.id
    );

    if (index !== -1) {
      dataLama[index] = dataBaru;

      return await Preferences.set({
        key: this.KEY_MAHASISWA,
        value: JSON.stringify(dataLama)
      });
    }
  }

}
