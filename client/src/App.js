import axios from 'axios'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Basket from './components/Basket/Basket'
import Header from './components/Header/Header'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import './style/index.scss'

function App() {
	const [items, setItems] = useState([])
	const [basketItems, setBasketItems] = useState([])
	const [favoriteItems, setFavoriteItems] = useState([])
	const [searchValue, setSearchValue] = useState('')
	const [openBasket, setOpenBasket] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const sneakersResponse = await axios.get(
					'http://localhost:3001/sneakers'
				)
				setItems(sneakersResponse.data)

				const basketResponse = await axios.get('http://localhost:3001/basket')
				setBasketItems(basketResponse.data)

				const favoritesResponse = await axios.get(
					'http://localhost:3001/favorites'
				)
				setFavoriteItems(favoritesResponse.data)
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error)
			}
		}

		fetchData()
	}, [])

	const onAddBasket = async (item) => {
		try {
			const newItem = { ...item, sneakerId: item.id }
			await axios.post('http://localhost:3001/sneakers', item)
			setBasketItems((prev) => [...prev, newItem])
		} catch (error) {
			console.error('Ошибка при добавлении в корзину:', error)
		}
	}

	const onRemoveBasket = async (id) => {
		try {
			await axios.delete(`http://localhost:3001/basket/${id}`)
			setBasketItems((prev) => [...prev.filter((el) => el.sneakerId !== id)])
		} catch (error) {
			console.error('Ошибка при удалении из корзины:', error)
		}
	}

	const onAddFavorite = async (item) => {
		try {
			if (favoriteItems.find((el) => el.sneakerId === item.id)) {
				await axios.delete(`http://localhost:3001/favorites/${item.id}`)
				setFavoriteItems((prev) => [
					...prev.filter((el) => el.sneakerId !== item.id),
				])
			} else {
				const newItem = { ...item, sneakerId: item.id }
				await axios.post('http://localhost:3001/favorites', item)
				setFavoriteItems((prev) => [...prev, newItem])
			}
		} catch (error) {
			console.error('Ошибка при добавлении/удалении из избранного:', error)
		}
	}

	const onChangeInput = (event) => {
		setSearchValue(event.target.value)
	}

	return (
		<div className='wrapper'>
			{openBasket && (
				<Basket
					onRemoveBasket={onRemoveBasket}
					basketItems={basketItems}
					onClickClose={() => setOpenBasket(false)}
				/>
			)}

			<Header onClickOpen={() => setOpenBasket(true)} />
			<div className='content'>
				<Routes>
					<Route
						path='/'
						exact
						element={
							<Home
								items={items}
								searchValue={searchValue}
								favoriteItems={favoriteItems}
								onAddBasket={onAddBasket}
								onAddFavorite={onAddFavorite}
								onChangeInput={onChangeInput}
								onRemoveBasket={onRemoveBasket}
								basketItems={basketItems}
							/>
						}
					/>

					<Route
						path='/favorites'
						exact
						element={
							<Favorites
								favoriteItems={favoriteItems}
								onRemoveBasket={onRemoveBasket}
								basketItems={basketItems}
								onAddFavorite={onAddFavorite}
								onAddBasket={onAddBasket}
							/>
						}
					/>
				</Routes>
			</div>
		</div>
	)
}

export default App
