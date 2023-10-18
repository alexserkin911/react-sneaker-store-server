import React from 'react'
import SvgBasket from './SvgBasket'
import SvgFavorit from './SvgFavorit'
import SvgUser from './SvgUser'

export default function Header({ onClickOpen }) {
	return (
		<header className='header'>
			<div className='headerLeft'>
				<img width={40} height={40} src='/img/logo.png' alt='logo' />
				<div className='headerInfo'>
					<h3>React Sneakers</h3>
					<p>магазин лучших кроссовок</p>
				</div>
			</div>
			<ul className='headerRight'>
				<li>
					<SvgBasket onClickOpen={onClickOpen} />
					<span>1250 rub</span>
				</li>
				<li>
					<SvgFavorit />

					<span>Закладки</span>
				</li>
				<li>
					<SvgUser />
					<span>Профиль</span>
				</li>
			</ul>
		</header>
	)
}
