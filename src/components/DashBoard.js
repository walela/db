import React from 'react'
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

const DashBoardContainer = styled.div`
  width: 76vw;
  height: 100vh;
  background-color: rgb(236, 242, 236);
  margin-right: 12px;
  border-radius: 2px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`

function DashBoard(props) {
  const { repoData } = props

  return (
    <DashBoardContainer>
      {repoData.map(repo => (
        <PseudoBox
          key={repo.id}
          borderRadius='3px'
          borderTop='4px solid orange'
          backgroundColor='white'
          w='30vw'
          height='30vh'
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
    </DashBoardContainer>
  )
}

export default DashBoard
