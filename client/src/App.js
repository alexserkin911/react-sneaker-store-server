import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Basket from './components/Basket/Basket'
import Header from './components/Header/Header'
import { ContextAll } from './context'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import Orders from './pages/Orders'
import './style/index.scss'

function App() {
	const { setOpenBasket } = useContext(ContextAll)

	return (
		<div className='wrapper'>
			<Basket />

			<Header onClickOpen={() => setOpenBasket(true)} />
			<div className='content'>
				<Routes>
					<Route path='/' exact element={<Home />} />

					<Route path='/favorites' exact element={<Favorites />} />
					<Route path='/orders' exact element={<Orders />} />
				</Routes>
			</div>
		</div>
	)
}

export default App
