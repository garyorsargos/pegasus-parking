import axios from "axios";
import { Button, Box, Heading, Image } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/logout");
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div>
      <Box h="8vh" display="flex" alignItems="center" justifyContent="space-between" bg="black">
        <Heading p="4" size="4xl" color="#FFC904">Pegasus Parking</Heading>
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

