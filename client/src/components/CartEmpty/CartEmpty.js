import React from 'react'
import Button from '../Button/Button'
import styles from './CartEmpty.module.scss'
import SvgArrowLeft from './SvgArrowLeft'

export default function CartEmpty() {
	return (
		<div className={styles.CartEmpty}>
			<div>
				<img src='./img/icon/CartImg.jpg' alt='' />
				<h2>Корзина пустая</h2>
				<p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
				<Button text={'Вернуться назад'} svg={<SvgArrowLeft />} />
			</div>
		</div>
	)
}
