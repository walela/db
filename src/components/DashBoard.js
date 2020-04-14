import React, { useState } from 'react'
import {
  Stack,
  PseudoBox,
  Badge,
  Box,
  Icon,
  Heading,
  Link,
} from '@chakra-ui/core'
import { GoRepoForked } from 'react-icons/go'
import styled from '@emotion/styled'
import axios from 'axios'

const DashBoardContainer = styled.div`
  width: 76vw;
  height: 100vh;
  background-color: rgb(236, 242, 236);
  border-radius: 2px;
  padding-top: 18px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`

function DashBoard(props) {
  axios.defaults.baseURL =
    'https://cors-anywhere.herokuapp.com/https://api.github.com'
  const { user, repoData } = props
  const [languages, setLanguages] = useState(null)

  const getLanguages = repo => {
    return axios.get(`/repos/${user}/${repo}/languages`)
  }

  return (
    <DashBoardContainer>
      {repoData.map(repo => {
        getLanguages(repo).then(res => setLanguages(res.data))
        console.log(languages)
        return (
          <PseudoBox
            key={repo.id}
            w='30vw'
            h='30vh'
            borderRadius='3px'
            borderTop='4px solid orange'
            backgroundColor='white'
            p={3}
            transition='all 0.5s ease-in'
            _hover={{ transform: 'scale(1.04) translate(1px, -2px)' }}>
            {/* heading and star count*/}
            <Stack isInline justify='space-between'>
              <Heading size='md' fontFamily='Stardos Stencil'>
                <Link href={`https://github.com/${repo.full_name}`}>
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

            {/* project description if present */}
            <Box fontFamily='Stardos Stencil'>
              {repo.description || 'Description unavailable'}
            </Box>

            {/* language stack and fork count */}
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
                  fontFamily='Stardos Stencil'>
                  {repo.forks_count}
                </Heading>
              </Stack>
            </Stack>
          </PseudoBox>
        )
      })}
    </DashBoardContainer>
  )
}

export default DashBoard
