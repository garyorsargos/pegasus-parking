import { Component } from "react";
import { Button, Box, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export class Navbar extends Component {
  render() {
    return (
      <div>
        <Box h="8vh" display="flex" alignItems="center" justifyContent="space-between" bg="black">
          <Heading p="4" size="4xl">Pegasus Parking</Heading>
          <Box p="4" justifyContent="space-between" display="flex" minWidth="25vw" maxWidth="50vw">
            <Button variant="ghost" size="lg"><Link to="/parking">Find Parking</Link></Button>
            <Button variant="ghost" size="lg"><Link to="/permits">My Permits</Link></Button>
            <Button variant="ghost" size="lg"><Link to="/settings">Account Details</Link></Button>
          </Box>
        </Box>
      </div>
    );
  }
}

export default Navbar;

