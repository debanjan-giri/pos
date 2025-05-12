import { FaHeart } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-4 text-center text-md-start">
            <p className="mb-0">&copy; {currentYear} SmartPOS</p>
          </div>
          <div className="col-md-4 text-center my-2 my-md-0">
            <p className="mb-0 d-flex align-items-center justify-content-center">
              <span>Made with</span>
              <FaHeart className="mx-1 text-accent" size={12} />
              <span>by SmartPOS Team</span>
            </p>
          </div>
          <div className="col-md-4 text-center text-md-end">
            <p className="mb-0">
              <a href="#" className="me-3">
                Privacy Policy
              </a>
              <a href="#">Terms of Service</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
