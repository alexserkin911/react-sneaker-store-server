import axios from 'axios'
import { useEffect, useState } from 'react'
import Basket from './components/Basket/Basket'
import Card from './components/Card/Card'
import ContentTitle from './components/ContentTitle/ContentTitle'
import Header from './components/Header/Header'
import './style/index.scss'

function App() {
	const [items, setItems] = useState([])
	const [basketItems, setBasketItems] = useState([])
	const [searchValue, setSearchValue] = useState('')
	const [openBasket, setOpenBasket] = useState(false)

	console.log(items)
	useEffect(() => {
		axios.get('http://localhost:3001/sneakers').then((response) => {
			console.log(response.data)
			setItems(response.data)
		})
		axios.get('http://localhost:3001/basket').then((res) => {
			console.log(res.data)
			setBasketItems(res.data)
		})
	}, [])

	const onAddBasket = (item) => {
		const newItem = { ...item, sneakerId: item.id }

		axios.post('http://localhost:3001/sneakers', item)
		console.log(item)
		setBasketItems((pre) => [...pre, newItem])
	}
	console.log(basketItems)
	const onRemoveBasket = (id) => {
		axios.delete(`http://localhost:3001/basket/${id}`)

		setBasketItems((pre) => [...pre.filter((el) => el.sneakerId !== id)])
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
				<ContentTitle searchValue={searchValue} onChangeInput={onChangeInput} />
				<div style={{ display: 'flex', gap: 35, flexWrap: 'wrap' }}>
					{items
						.filter((el) =>
							el.title.toLowerCase().includes(searchValue.toLowerCase())
						)
						.map((el, index) => (
							<Card
								key={el.id}
								{...el}
								onRemoveBasket={onRemoveBasket}
								onPlus={(item) => onAddBasket(item)}
								basketItems={basketItems}
								onFavorit={() => console.log(123)}
							/>
						))}
				</div>
			</div>
		</div>
	)
}

export default App
