import React, { useState, useEffect } from 'react'

import styled from '@emotion/styled'
import axios from 'axios'

import SideBar from './components/Sidebar'
import DashBoard from './components/DashBoard'

axios.defaults.baseURL = 'https://api.github.com'

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
`

function App() {
  const user = 'walela'
  const [userData, setUserData] = useState([])
  const [repoData, setRepoData] = useState([])
  const [pageCount, setPageCount] = useState(1)

  const getUserData = () => {
    return axios.get(`/users/${user}`)
  }

  const getRepoData = () => {
    return axios.get(
      `/users/${user}/repos?per_page=6&sort=created&direction=asc`
    )
  }
  useEffect(() => {
    axios
      .get(
        `/users/${user}/repos?page=${pageCount}&per_page=6&sort=created&direction=asc`
      )
      .then(res => {
        setRepoData(res.data)
      })
      .catch(err => console.error(err))
  }, [pageCount])

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
      <SideBar
        user={user}
        userData={userData}
        pageCount={pageCount}
        setPageCount={setPageCount}
      />
      <DashBoard user={user} repoData={repoData} />
    </AppContainer>
  )
}

export default App
