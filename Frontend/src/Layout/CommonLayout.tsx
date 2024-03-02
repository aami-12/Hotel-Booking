import React from "react";
import Header from "../components/Header";
// import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Searchbar from "../components/Searchbar";

interface Props {
  children: React.ReactNode;
}

const CommonLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      <div className="container mx-auto">
        <Searchbar />
      </div>
      <div className=" py-6 px-5 py-md-6">
        <div className="container mx-auto  flex-1">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
