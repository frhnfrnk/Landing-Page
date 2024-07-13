import React from "react";

const Lokasi = () => {
  return (
    <div
      className="w-full relative h-auto lg:h-[80vh] mt-10 lg:mt-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/Images/pantai.svg')",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col-reverse lg:flex-row items-center mx-[20px] lg:mx-[64px] justify-center">
        <img
          src="/Images/pulau.svg"
          alt="Maskot"
          className="w-full md:w-1/2 lg:w-1/2 object-contain"
        />
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
          <div className="w-full">
            <p
              className="font-sirukota text-[100px] md:text-[110px] lg:text-[120px] text-[#25908A] text-center"
              style={{
                textShadow:
                  "rgb(218, 209, 204) 10px 0px 0px, rgb(218, 209, 204) 9.95004px 0.998334px 0px, rgb(218, 209, 204) 9.80067px 1.98669px 0px, rgb(218, 209, 204) 9.55336px 2.9552px 0px, rgb(218, 209, 204) 9.21061px 3.89418px 0px, rgb(218, 209, 204) 8.77583px 4.79426px 0px, rgb(218, 209, 204) 8.25336px 5.64642px 0px, rgb(218, 209, 204) 7.64842px 6.44218px 0px, rgb(218, 209, 204) 6.96707px 7.17356px 0px, rgb(218, 209, 204) 6.2161px 7.83327px 0px, rgb(218, 209, 204) 5.40302px 8.41471px 0px, rgb(218, 209, 204) 4.53596px 8.91207px 0px, rgb(218, 209, 204) 3.62358px 9.32039px 0px, rgb(218, 209, 204) 2.67499px 9.63558px 0px, rgb(218, 209, 204) 1.69967px 9.8545px 0px, rgb(218, 209, 204) 0.707372px 9.97495px 0px, rgb(218, 209, 204) -0.291995px 9.99574px 0px, rgb(218, 209, 204) -1.28844px 9.91665px 0px, rgb(218, 209, 204) -2.27202px 9.73848px 0px, rgb(218, 209, 204) -3.2329px 9.463px 0px, rgb(218, 209, 204) -4.16147px 9.09297px 0px, rgb(218, 209, 204) -5.04846px 8.63209px 0px, rgb(218, 209, 204) -5.88501px 8.08496px 0px, rgb(218, 209, 204) -6.66276px 7.45705px 0px, rgb(218, 209, 204) -7.37394px 6.75463px 0px, rgb(218, 209, 204) -8.01144px 5.98472px 0px, rgb(218, 209, 204) -8.56889px 5.15501px 0px, rgb(218, 209, 204) -9.04072px 4.2738px 0px, rgb(218, 209, 204) -9.42222px 3.34988px 0px, rgb(218, 209, 204) -9.70958px 2.39249px 0px, rgb(218, 209, 204) -9.89993px 1.4112px 0px, rgb(218, 209, 204) -9.99135px 0.415807px 0px, rgb(218, 209, 204) -9.98295px -0.583741px 0px, rgb(218, 209, 204) -9.8748px -1.57746px 0px, rgb(218, 209, 204) -9.66798px -2.55541px 0px, rgb(218, 209, 204) -9.36457px -3.50783px 0px, rgb(218, 209, 204) -8.96758px -4.4252px 0px, rgb(218, 209, 204) -8.481px -5.29836px 0px, rgb(218, 209, 204) -7.90968px -6.11858px 0px, rgb(218, 209, 204) -7.25932px -6.87766px 0px, rgb(218, 209, 204) -6.53644px -7.56803px 0px, rgb(218, 209, 204) -5.74824px -8.18277px 0px, rgb(218, 209, 204) -4.90261px -8.71576px 0px, rgb(218, 209, 204) -4.00799px -9.16166px 0px, rgb(218, 209, 204) -3.07333px -9.51602px 0px, rgb(218, 209, 204) -2.10796px -9.7753px 0px, rgb(218, 209, 204) -1.12153px -9.93691px 0px, rgb(218, 209, 204) -0.123887px -9.99923px 0px, rgb(218, 209, 204) 0.87499px -9.96165px 0px, rgb(218, 209, 204) 1.86512px -9.82453px 0px, rgb(218, 209, 204) 2.83662px -9.58924px 0px, rgb(218, 209, 204) 3.77978px -9.25815px 0px, rgb(218, 209, 204) 4.68517px -8.83455px 0px, rgb(218, 209, 204) 5.54374px -8.32267px 0px, rgb(218, 209, 204) 6.34693px -7.72764px 0px, rgb(218, 209, 204) 7.0867px -7.0554px 0px, rgb(218, 209, 204) 7.75566px -6.31267px 0px, rgb(218, 209, 204) 8.34713px -5.50686px 0px, rgb(218, 209, 204) 8.8552px -4.64602px 0px, rgb(218, 209, 204) 9.27478px -3.73877px 0px, rgb(218, 209, 204) 9.6017px -2.79415px 0px, rgb(218, 209, 204) 9.83268px -1.82162px 0px, rgb(218, 209, 204) 9.96542px -0.830894px 0px",
              }}
            >
              Lokasi
            </p>
          </div>
          <div className="flex py-5 w-full lg:w-1/2 font-poppins text-[#F7ECE8] bg-[#1E6C75] rounded-[30px] ">
            <div className="w-full p-5">
              <div className="h-1/2 text-center w-full text-lg">
                <p>
                  Desa <span className="font-bold ">Toya pakeh</span>
                </p>
                <p>
                  & Desa <span className="font-bold ">Sakti</span>
                </p>
              </div>
              <div className="h-1/2 text-center w-full">
                <p>
                  Kecamatan <span className="font-bold ">Nusa Penida</span>
                </p>
                <p>
                  Kabupaten <span className="font-bold ">Klungkung</span>
                </p>
              </div>
            </div>
          </div>
          <img
            src="/Images/BatikRangRang.png"
            alt="Batik RangRang"
            className="w-full object-contain absolute -bottom-[25px] lg:-bottom-[150px] left-0 opacity-10 "
          />
        </div>
      </div>
    </div>
  );
};

export default Lokasi;
