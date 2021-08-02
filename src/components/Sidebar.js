import React from 'react'
import { Stack, Heading, Button, Image, Box, Link } from '@chakra-ui/core'
import { MdLocationOn, MdPeople, MdAccountCircle } from 'react-icons/md'
import { FaUserEdit } from 'react-icons/fa'
import styled from '@emotion/styled'

// rgb(143, 33, 247)
const SideBarContainer = styled.div`
  width: 24vw;
  font-family: Libre Baskerville;
  height: 100vh;
  background-color: #026178;
  border-radius: 2px;
  color: white;
`

function SideBar(props) {
  const { userData, user, pageCount, setPageCount } = props

  return (
    <SideBarContainer>
      <Stack spacing={3} align='center' justify='center'>
        <Image
          src={userData.avatar_url}
          alt={userData.name}
          margin='9px auto'
          size='12vw'
          rounded='full'
          border='2px dashed white'
          padding='9px'
        />
        <Heading
          size='md'
          fontFamily='Playfair Display'
          fontWeight='bold'
          textAlign='center'>
          {userData.name}
        </Heading>
        <Link
          fontSize='18px'
          textDecoration='underline'
          href={`https://github.com/${userData.login}`}>
          {userData.login}
        </Link>
        <Stack isInline spacing={3} justify='center'>
          <Box as={MdLocationOn} size='24px' mt='2px' color='white.900' />
          <Heading size='sm' mt='6px' fontFamily='Libre Baskerville'>
            {userData.location}
          </Heading>
        </Stack>
        <Stack isInline spacing={3} justify='center'>
          <Box as={MdPeople} size='24px' color='white.900' />
          <Heading size='sm' mt='6px' fontFamily='Libre Baskerville'>
            {userData.company}
          </Heading>
        </Stack>
        <Stack isInline spacing={3} justify='center'>
          <Box as={MdAccountCircle} size='24px' mt='2px' color='white.900' />
          <Heading size='sm' mt='6px' fontFamily='Libre Baskerville'>
            {userData.bio}
          </Heading>
        </Stack>
        <Stack isInline spacing={2} justify='center' align='center'>
          <Box w='10vw' height='14vh' mt='24px' borderRight='3px solid white'>
            <Heading
              size='sm'
              color='lightgrey'
              textAlign='center'
              fontFamily='Libre Baskerville'
              fontWeight='bold'>
              Following
            </Heading>
            <Heading
              size='xl'
              mt='12px'
              textAlign='center'
              fontFamily='Stardos Stencil'
              fontWeight='bold'>
              <Link href={`https://github.com/${user}?tab=following`}>
                {userData.following}
              </Link>
            </Heading>
          </Box>
          <Box w='10vw' height='14vh' mt='24px'>
            <Heading
              size='sm'
              color='lightgrey'
              textAlign='center'
              fontFamily='Libre Baskerville'
              fontWeight='bold'>
              Followers
            </Heading>
            <Heading
              size='xl'
              mt='12px'
              textAlign='center'
              fontFamily='Stardos Stencil'
              fontWeight='bold'>
              <Link href={`https://github.com/${user}?tab=followers`}>
                {userData.followers}
              </Link>
            </Heading>
          </Box>
        </Stack>
        <Stack isInline spacing={3} justify='center' mt='12px'>
          <Box as={FaUserEdit} size='24px' mt='2px' color='white.900' />
          <Heading size='sm' mt='6px' fontFamily='Libre Baskerville'>
            <Link href={`https://${userData.blog}`} isExternal>
              {userData.blog}
            </Link>
          </Heading>
        </Stack>
        <Stack isInline spacing={6} mt='24px'>
          <Button
            variantColor='whatsapp'
            fontFamily='Stardos Stencil'
            onClick={() => setPageCount(pageCount - 1)}>
            ← Previous
          </Button>
          <Button
            variantColor='whatsapp'
            fontFamily='Stardos Stencil'
            onClick={() => setPageCount(pageCount + 1)}>
            Next →
          </Button>
        </Stack>
      </Stack>
    </SideBarContainer>
  )
}

export default SideBar
