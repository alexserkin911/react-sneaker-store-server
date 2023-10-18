import React from 'react'
import SvgRemove from '../Basket/SvgRemove'
import styles from './BasketItems.module.scss'

export default function BasketItems({
	id,
	title,
	price,
	imageUrl,
	onRemoveBasket,
}) {
	const onClick = () => {
		onRemoveBasket(id)
	}
	return (
		<div className={styles.cartItem}>
			<img width={70} height={70} src={imageUrl} alt='Sneakers' />
			<div className={styles.cartInfo}>
				<p>{title}</p>
				<span>{price}</span>
			</div>
			<button>
				<SvgRemove onClick={onClick} />
			</button>
		</div>
	)
}
