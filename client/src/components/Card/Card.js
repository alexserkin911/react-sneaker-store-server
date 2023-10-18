import React, { useEffect, useState } from 'react'
import styles from './Card.module.scss'
import SvgFavorite from './SvgFavorite'
import SvgFavoriteRed from './SvgFavoriteRed'
import SvgGreenOk from './SvgGreenOk'
import SvgPlus from './SvgPlus'

export default function Card({
	id,
	imageUrl,
	title,
	price,
	onPlus,
	onFavorite,
	basketItems,
}) {
	const [isAdded, setIsAdded] = useState(false)
	const [isFavorite, setIsFavorite] = useState(false)

	const onClickPlus = () => {
		onPlus({ id, imageUrl, title, price })
		setIsAdded(!isAdded)
	}

	const onClickHeart = () => {
		setIsFavorite(!isFavorite)
	}

	useEffect(() => {
		const foundInBasket = basketItems.some((el) => +el.id === +id)
		setIsAdded(foundInBasket)
	}, [basketItems, id])

	return (
		<div className={styles.card}>
			<div className={styles.favorite}>
				{isFavorite ? (
					<SvgFavoriteRed onClickHeart={onClickHeart} />
				) : (
					<SvgFavorite onClickHeart={onClickHeart} />
				)}
			</div>
			<img className={styles.cardImg} src={imageUrl} alt='sneakers' />
			<p className={styles.cardTitle}>{title}</p>
			<div className={styles.cardFooter}>
				<div className={styles.cardFooterLeft}>
					<p className={styles.cardFooterLeftTitle}>Цена:</p>
					<span className={styles.cardFooterLeftPrice}>{price}</span>
				</div>
				{isAdded ? (
					<SvgGreenOk onClickPlus={onClickPlus} />
				) : (
					<SvgPlus onClickPlus={onClickPlus} />
				)}
			</div>
		</div>
	)
}
