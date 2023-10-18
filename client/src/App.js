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

	useEffect(() => {
		axios
			.get('https://652cfb8df9afa8ef4b269123.mockapi.io/items')
			.then((response) => setItems(response.data))
		axios
			.get('https://652cfb8df9afa8ef4b269123.mockapi.io/basket')
			.then((res) => setBasketItems(res.data))
	}, [])

	const onAddBasket = (item) => {
		axios.post('https://652cfb8df9afa8ef4b269123.mockapi.io/basket', item)

		setBasketItems((pre) => [...pre, item])
	}

	const onRemoveBasket = (id) => {
		axios.delete(`https://652cfb8df9afa8ef4b269123.mockapi.io/basket/${id}`)

		setBasketItems((pre) => [...pre.filter((el) => el.id !== id)])
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
