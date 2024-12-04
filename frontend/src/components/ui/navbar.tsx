import axios from "axios";
import { Button, Box, Heading, Image } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { useMessage } from "../../context/messageContext";
import { MessageTypes } from "../../utils/messageTypes";

const Navbar = () => {
  const navigate = useNavigate();
  const { setMessage, showMessage } = useMessage();

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/logout");
      if (response.data.success) {
        setMessage("logoutMessage", response.data.message?.type || MessageTypes.SUCCESS, response.data.message?.message || "Logged out successfully.");
        showMessage("logoutMessage");
        navigate("/");
      } else {
        setMessage("logoutMessage", response.data.message?.type || MessageTypes.ERROR, response.data.message?.message || "Failed to log out.");
        showMessage("logoutMessage");
      }
    } catch (error) {
      setMessage("logoutMessage", MessageTypes.ERROR, "Failed to log out. Please try again.");
      showMessage("logoutMessage");
    }
  };

  return (
    <div>
      <Box h="8vh" display="flex" alignItems="center" justifyContent="space-between" bg="black">
        <Box h="100%" display="flex" alignItems="center" justifyContent="space-between">
          <Heading p="4" size="4xl" color="#FFC904">Pegasus Parking</Heading>
          <Image src="/favicon/android-chrome-512x512.png" alt="Logo Icon" maxH="75%" width="auto"/>
        </Box>
        <Box p="4" display="flex" minWidth="25vw" maxWidth="50vw">
          <Link to="/user/parking">
            <Button variant="ghost" size="lg" m="2" color="#FFC904">Find Parking</Button>
          </Link>
          <Link to="/user/permits">
            <Button variant="ghost" size="lg" m="2" color="#FFC904">My Permits</Button>
          </Link>
          <Link to="/user/settings">
            <Button variant="ghost" size="lg" m="2" color="#FFC904">Account Details</Button>
          </Link>
          <Button
            variant="solid"
            size="lg"
            bg="#db5555"
            m="2"
            onClick={handleLogout}
          >
            <IoLogOut />
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Navbar;