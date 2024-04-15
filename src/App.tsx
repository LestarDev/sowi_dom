import './App.css'
import MainPage from './pages/MainPage/MainPage'
import { Provider } from 'react-redux'
import { store } from './shared/store'

function App() {

  return (
    <Provider store={store}>
      <MainPage></MainPage>
      {/* <div>xxx</div> */}
    </Provider>
  )
}

export default App
