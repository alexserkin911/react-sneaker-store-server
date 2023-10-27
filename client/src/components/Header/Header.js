import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ContextAll } from '../../context'
import SvgBasket from './SvgBasket'
import SvgFavorite from './SvgFavorite'
import SvgUser from './SvgUser'

export default function Header({ onClickOpen }) {
	const { totalPrice } = useContext(ContextAll)

	return (
		<header className='header'>
			<Link to={'/'}>
				<div className='headerLeft'>
					<img width={40} height={40} src='/img/logo.png' alt='logo' />
					<div className='headerInfo'>
						<h3>React Sneakers</h3>
						<p>магазин лучших кроссовок</p>
					</div>
				</div>
			</Link>
			<ul className='headerRight'>
				<li>
					<SvgBasket onClickOpen={onClickOpen} />
					<span>{totalPrice} руб.</span>
				</li>
				<li>
					<Link to={'/favorites'}>
						<SvgFavorite />
					</Link>
					<span>Закладки</span>
				</li>
				<li>
					<Link to={'/orders'}>
						<SvgUser />
					</Link>
					<span>Профиль</span>
				</li>
			</ul>
		</header>
	)
}
