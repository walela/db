import React, { useState, useEffect } from 'react'
import { Stack, Badge, Box, Icon, Heading, Image, Link } from '@chakra-ui/core'
import { MdPeople, MdAccountCircle, MdLocationOn } from 'react-icons/md'
import { FaUserEdit } from 'react-icons/fa'
import styled from '@emotion/styled'
import axios from 'axios'

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
`

const SideBar = styled.div`
  width: 24vw;
  font-family: Libre Baskerville;
  height: 100vh;
  background-color: rgb(143, 33, 247);
  margin-top: 12px;
  margin-right: 12px;
  margin-left: 12px;
  border-radius: 2px;
  color: white;
`

const DashBoard = styled.div`
  width: 76vw;
  height: 100vh;
  background-color: rgb(236, 242, 236);
  margin-top: 12px;
  margin-right: 12px;
  border-radius: 2px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`

function App() {
  const API = 'https://cors-anywhere.herokuapp.com/https://api.github.com'
  const [userData, setUserData] = useState([])
  const [repoData, setRepoData] = useState([])

  const getUserData = () => {
    return axios.get(`${API}/users/walela`)
  }

  const getRepoData = () => {
    return axios.get(
      `${API}/users/walela/repos?per_page=8&sort=created&direction=asc`
    )
  }

  useEffect(() => {
    axios
      .all([getUserData(), getRepoData()])
      .then(
        axios.spread((user, repos) => {
          setUserData(user.data)
          setRepoData(repos.data)
        })
      )
      .catch(err => console.error(err))
  }, [])

  return (
    <AppContainer>
      <SideBar>
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
            textAlign='center'
          >
            {userData.name}
          </Heading>
          <Link
            fontSize='18px'
            textDecoration='underline'
            href={`https://github.com/${userData.login}`}
          >
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
                fontWeight='bold'
              >
                Following
              </Heading>
              <Heading
                size='xl'
                mt='12px'
                textAlign='center'
                fontFamily='Stardos Stencil'
                fontWeight='bold'
              >
                {userData.following}
              </Heading>
            </Box>
            <Box w='10vw' height='14vh' mt='24px'>
              <Heading
                size='sm'
                color='lightgrey'
                textAlign='center'
                fontFamily='Libre Baskerville'
                fontWeight='bold'
              >
                Followers
              </Heading>
              <Heading
                size='xl'
                mt='12px'
                textAlign='center'
                fontFamily='Stardos Stencil'
                fontWeight='bold'
              >
                {userData.followers}
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
        </Stack>
      </SideBar>
      <DashBoard>
        {repoData.map(repo => (
          <Box
            key={repo.id}
            borderRadius='4px'
            borderTop='3px solid orange'
            backgroundColor='white'
            w='21vw'
            height='13vw'
            mt='12px'
            ml='6px'
            p={3}
            mr='6px'
          >
            <Stack isInline justify='space-between'>
              <Heading
                size='sm'
                fontStyle='italic'
                color='linkedin'
                fontFamily='Stardos Stencil'
              >
                <Link href={`https://github.com/${repo.full_name}`}>
                  {' '}
                  {repo.name}
                </Link>
              </Heading>
              <Stack isInline>
                <Icon name='star' />
                <Heading size='md' ml='-6px' mt='-3px'>
                  {repo.stargazers_count}
                </Heading>
              </Stack>
            </Stack>
            <Box fontFamily='Stardos Stencil'>{repo.description}</Box>
            <Badge variant='solid' variantColor='whatsapp' mt='18px'>
              {repo.language}
            </Badge>
          </Box>
        ))}
      </DashBoard>
    </AppContainer>
  )
}

export default App
