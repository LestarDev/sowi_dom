import './App.css'
import { Provider } from 'react-redux'
import { store } from './shared/store'
import LoginPage from './pages/LoginPage/LoginPage'

function App() {

  return (
    <Provider store={store}>
      <LoginPage></LoginPage>
      {/* <div>xxx</div> */}
    </Provider>
  )
}

export default App
