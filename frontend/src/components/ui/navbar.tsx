import { Component } from "react";
import { Button, Box, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";

export class Navbar extends Component {
  render() {
    return (
      <div>
        <Box h="8vh" display="flex" alignItems="center" justifyContent="space-between" bg="black">
          <Heading p="4" size="4xl">Pegasus Parking</Heading>
          <Box p="4" justifyContent="space-between" display="flex" minWidth="25vw" maxWidth="50vw">
            <Button variant="ghost" size="lg" m="2"><Link to="/user/parking">Find Parking</Link></Button>
            <Button variant="ghost" size="lg" m="2"><Link to="/user/permits">My Permits</Link></Button>
            <Button variant="ghost" size="lg" m="2"><Link to="/user/settings">Account Details</Link></Button>
            <Button variant="solid" size="lg" bg="#db5555" m="2"><IoLogOut /></Button>
          </Box>
        </Box>
      </div>
    );
  }
}

export default Navbar;

