import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card/Card'
import Screensaver from '../components/Screensaver/Screensaver'
import { ContextAll } from '../context'

export default function Favorites() {
	const { favoriteItems } = useContext(ContextAll)
	return (
		<div className='favorites'>
			{favoriteItems.length < 1 ? (
				<Screensaver
					image='img/icon/smile(.jpg'
					text='Закладок нет :('
					description='Вы ничего не добавляли в закладки'
				/>
			) : (
				<>
					<h1>
						<Link to='/'>
							<svg
								width='35'
								height='35'
								viewBox='0 0 35 35'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<rect
									x='0.5'
									y='0.5'
									width='34'
									height='34'
									rx='7.5'
									fill='white'
									stroke='#F2F2F2'
								/>
								<path
									d='M19 22L14 17L19 12'
									stroke='#C8C8C8'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</Link>
						Мои закладки
					</h1>
					<div className='favoriteItems'>
						{favoriteItems.map((el) => (
							<Card
								key={el.sneakerId}
								id={el.sneakerId}
								imageUrl={el.imageUrl}
								title={el.title}
								price={el.price}
							/>
						))}
					</div>
				</>
			)}
		</div>
	)
}
