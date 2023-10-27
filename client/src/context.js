import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
export const ContextAll = createContext({})

export const AllContextProvider = ({ children }) => {
	const [items, setItems] = useState([])
	const [basketItems, setBasketItems] = useState([])
	const [favoriteItems, setFavoriteItems] = useState([])
	const [searchValue, setSearchValue] = useState('')
	const [openBasket, setOpenBasket] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [orderNumber, setOrderNumber] = useState(null)
	const [isCompleteOrder, seIsCompleteOrder] = useState(false)

	const totalPrice = basketItems.reduce((acc, el) => acc + el.price, 0)

	const tax = Math.round((totalPrice / 1.05) * 0.05)

	const onClickOrder = async () => {
		const { data } = await axios.post(
			'http://localhost:3001/orders',
			basketItems
		)
		await axios.delete('http://localhost:3001/basket')

		setOrderNumber(data.idOrder)
		seIsCompleteOrder(true)
		setBasketItems([])
	}

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				const basketResponse = await axios.get('http://localhost:3001/basket')
				setBasketItems(basketResponse.data)

				const favoritesResponse = await axios.get(
					'http://localhost:3001/favorites'
				)
				setFavoriteItems(favoritesResponse.data)

				const sneakersResponse = await axios.get(
					'http://localhost:3001/sneakers'
				)
				setItems(sneakersResponse.data)
				setIsLoading(false)
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error)
			}
		}

		fetchData()
	}, [])

	const onAddBasket = async (item) => {
		try {
			if (basketItems.some((el) => el.sneakerId === item.id)) {
				await axios.delete(`http://localhost:3001/basket/${item.id}`)
				setBasketItems((pre) =>
					pre.filter((elem) => elem.sneakerId !== item.id)
				)
			} else {
				const newItem = { ...item, sneakerId: item.id }
				await axios.post('http://localhost:3001/sneakers', item)
				setBasketItems((prev) => [...prev, newItem])
			}
		} catch (error) {
			console.error('Ошибка при добавлении/удалении в/из корзину:', error)
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

	const addToFavorites = (id) => {
		return favoriteItems.some((el) => el.sneakerId === id)
	}

	const addToBasket = (id) => {
		return basketItems.some((el) => el.sneakerId === id)
	}

	return (
		<ContextAll.Provider
			value={{
				totalPrice,
				tax,
				orderNumber,
				items,
				isCompleteOrder,
				basketItems,
				favoriteItems,
				searchValue,
				openBasket,
				isLoading,
				seIsCompleteOrder,
				onClickOrder,
				addToBasket,
				addToFavorites,
				onChangeInput,
				onAddBasket,
				onAddFavorite,
				setItems,
				setBasketItems,
				setFavoriteItems,
				setSearchValue,
				setOpenBasket,
				setIsLoading,
			}}
		>
			{children}
		</ContextAll.Provider>
	)
}
