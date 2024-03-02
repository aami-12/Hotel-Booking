const Footer = () => {
    return (
      <div className="bg-blue-800 px-5 py-10">
        <div className="container mx-auto flex flex-col lg:flex-row gap-4 justify-between items-center">
          <span className="text-3xl text-white font-bold tracking-tight">
            MernBookings.com
          </span>
          <span className="text-white font-bold tracking-tight flex gap-4">
            <p className="cursor-pointer">Privacy Policy</p>
            <p className="cursor-pointer">Terms of Service</p>
          </span>
        </div>
      </div>
    );
  };
  
  export default Footer;
  