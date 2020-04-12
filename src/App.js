import React, { useState, useEffect } from 'react'
import {
  Button,
  Stack,
  PseudoBox,
  Badge,
  Box,
  Icon,
  Heading,
  Image,
  Link,
} from '@chakra-ui/core'
import { MdPeople, MdAccountCircle, MdLocationOn } from 'react-icons/md'
import { FaUserEdit } from 'react-icons/fa'
import { GoRepoForked } from 'react-icons/go'
import styled from '@emotion/styled'
import axios from 'axios'

const TOKEN = '766844db91680d70deea5f02d843c475ce48adeb'
axios.defaults.baseURL = 'https://api.github.com'
// axios.defaults.headers.common = {
//   Authorization: `Bearer ${TOKEN}`,
// }

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
`
// rgb(143, 33, 247)
const SideBar = styled.div`
  width: 24vw;
  font-family: Libre Baskerville;
  height: 100vh;
  background-color: #184a45;
  border-radius: 2px;
  color: white;
`

const DashBoard = styled.div`
  width: 76vw;
  height: 100vh;
  background-color: rgb(236, 242, 236);
  margin-right: 12px;
  border-radius: 2px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`

function App() {
  const user = 'aholachek'
  const [userData, setUserData] = useState([])
  const [repoData, setRepoData] = useState([])
  const [pageCount, setPageCount] = useState(1)

  const getUserData = () => {
    return axios.get(`/users/${user}`)
  }

  const getRepoData = () => {
    return axios.get(
      `/users/${user}/repos?per_page=9&sort=created&direction=asc`
    )
  }

  const loadMore = () => {
    setPageCount(pageCount + 1)
  }

  useEffect(() => {
    axios
      .get(
        `/users/${user}/repos?page=${pageCount}&per_page=9&sort=created&direction=asc`
      )
      .then(res => {
        setRepoData(res.data)
      })
      .catch(err => console.error(err))
  }, [pageCount])

  useEffect(() => {
    console.log(axios.baseURL)
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
          <Button
            variantColor='whatsapp'
            fontFamily='Stardos Stencil'
            onClick={loadMore}
          >
            Next →
          </Button>
          <Button
            variantColor='whatsapp'
            fontFamily='Stardos Stencil'
            onClick={() => setPageCount(pageCount - 1)}
          >
            ← Previous
          </Button>
        </Stack>
      </SideBar>
      <DashBoard>
        {repoData.map(repo => (
          <PseudoBox
            key={repo.id}
            borderRadius='3px'
            borderTop='4px solid orange'
            backgroundColor='white'
            w='21vw'
            height='13vw'
            mt='12px'
            ml='6px'
            p={3}
            mr='6px'
            transition='all 0.4s ease-in'
            _hover={{ transform: 'scale(1.05) translate(2px, -2px)' }}
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
                <Icon name='star' color='gold' />
                <Heading size='md' ml='-4px' mt='-3px'>
                  {repo.stargazers_count}
                </Heading>
              </Stack>
            </Stack>
            <Box fontFamily='Stardos Stencil'>{repo.description}</Box>

            <Stack isInline mt='12px' justify='space-between'>
              <Badge variant='solid' variantColor='whatsapp' mb='6px'>
                {repo.language || 'NULL'}
              </Badge>
              <Stack isInline>
                <Box as={GoRepoForked} size='18px'></Box>
                <Heading
                  size='md'
                  ml='-6px'
                  mt='-3px'
                  fontFamily='Stardos Stencil'
                >
                  {repo.forks_count}
                </Heading>
              </Stack>
            </Stack>
          </PseudoBox>
        ))}
      </DashBoard>
    </AppContainer>
  )
}

export default App
