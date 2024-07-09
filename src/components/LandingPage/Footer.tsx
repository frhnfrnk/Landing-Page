import React from "react";

const Footer = () => {
  return (
    <div className="z-[100] flex flex-col items-center justify-center bg-primary w-full h-[50vh] lg:h-[70vh]">
      <div className="w-full flex items-center justify-center gap-5">
        <img
          src="/Logo/Footer.png"
          alt="logo"
          className="w-[200px] lg:w-[400px] h-auto object-contain"
        />
      </div>
      <div className="w-[90%] lg:w-[700px] text-center">
        <p className="font-poppins text-sm lg:text-base my-6 text-white">
          Optimalisasi pemanfaatan sumber daya yang berkelanjutan melalui
          pemberdayaan masyarakat dan pengembangan infrastruktur berbasis
          kearifan lokal guna mewujudkan desa berdaya
        </p>
        <p className="font-poppins text-sm lg:text-base text-white">
          Kecamatan Nusa Penida, Kabupaten Klungkung, Provinsi Bali KKN-PPM UGM
          Bina Binongko Periode II Tahun 2023
        </p>
      </div>
      <div className="w-full mt-5 flex flex-col items-center">
        <p className="font-poppins text-base text-white">Didukung oleh</p>
        <img
          src="/Logo/Sponsor.png"
          alt="logo"
          className="w-[200px] lg:w-[400px] h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Footer;
