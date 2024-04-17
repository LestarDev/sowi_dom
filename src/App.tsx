import './App.css'
import MainPage from './pages/MainPage/MainPage'
import { Provider } from 'react-redux'
import { store } from './shared/store'
import { useEffect } from 'react'
import useProfile from './hooks/useProfile'
import Box from './components/Box'

function App() {

 

  return (
    <Provider store={store}>
      <MainPage></MainPage>
      {/* <Box></Box> */}
      {/* <div>xxx</div> */}
    </Provider>
  )
}

export default App
