import React from "react";

const Footer = () => {
  return (
    <div className="z-[1000] flex flex-col items-center justify-center bg-primary w-full h-[70vh]">
      <div className="flex gap-5">
        <img
          src="/Logo/Footer.png"
          alt="logo"
          className="w-[400px] h-auto object-contain"
        />
      </div>
      <div className="w-[700px] text-center">
        <p className="font-poppins text-base my-6 text-white">
          Optimalisasi pemanfaatan sumber daya yang berkelanjutan melalui
          pemberdayaan masyarakat dan pengembangan infrastruktur berbasis
          kearifan lokal guna mewujudkan desa berdaya
        </p>
        <p className="font-poppins text-base text-white">
          Kecamatan Nusa Penida, Kabupaten Klungkung, Provinsi Bali KKN-PPM UGM
          Bina Binongko Periode II Tahun 2023
        </p>
      </div>
      <div className="mt-5 flex flex-col items-center">
        <p className="font-poppins text-base text-white">Didukung oleh</p>
        <img
          src="/Logo/Sponsor.png"
          alt="logo"
          className="w-[400px] h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Footer;
