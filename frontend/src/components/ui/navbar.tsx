import { Box, Button} from '@chakra-ui/react'

function navbar() {
  return (
    <div>
      <Box h="7%">
        <h1 id="siteHeaderText">Pegasus Parking</h1>
        <Button variant="ghost">Find Parking</Button>
        <Button variant="ghost">My Permits</Button>
        <Button variant="ghost">Account Details</Button>
      </Box>
    </div>
  )
}

export default navbar
