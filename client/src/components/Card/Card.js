import React, { useContext } from 'react'
import ContentLoader from 'react-content-loader'
import { ContextAll } from '../../context'
import styles from './Card.module.scss'
import SvgFavorite from './SvgFavorite'
import SvgFavoriteRed from './SvgFavoriteRed'
import SvgGreenOk from './SvgGreenOk'
import SvgPlus from './SvgPlus'

export default function Card({ id, imageUrl, title, price, isOrders = true }) {
	const { onAddBasket, onAddFavorite, isLoading, addToFavorites, addToBasket } =
		useContext(ContextAll)

	const obj = { id, imageUrl, title, price }

	const onClickPlus = () => {
		onAddBasket(obj)
	}

	const onClickHeart = () => {
		onAddFavorite(obj)
	}

	return (
		<div className={styles.card}>
			{isLoading ? (
				<ContentLoader
					speed={2}
					width={210}
					height={260}
					viewBox='0 0 210 260'
					backgroundColor='#dedede'
					foregroundColor='#ededed'
				>
					<rect x='0' y='0' rx='5' ry='5' width='150' height='91' />
					<rect x='1' y='105' rx='5' ry='5' width='150' height='15' />
					<rect x='0' y='130' rx='5' ry='5' width='93' height='15' />
					<rect x='0' y='162' rx='5' ry='5' width='80' height='24' />
					<rect x='118' y='152' rx='10' ry='10' width='32' height='32' />
				</ContentLoader>
			) : (
				<>
					<div className={styles.favorite}>
						{isOrders &&
							(addToFavorites(id) ? (
								<SvgFavoriteRed onClickHeart={onClickHeart} />
							) : (
								<SvgFavorite onClickHeart={onClickHeart} />
							))}
					</div>
					<img className={styles.cardImg} src={imageUrl} alt='sneakers' />
					<p className={styles.cardTitle}>{title}</p>
					<div className={styles.cardFooter}>
						<div className={styles.cardFooterLeft}>
							<p className={styles.cardFooterLeftTitle}>Цена:</p>
							<span className={styles.cardFooterLeftPrice}>{price} руб.</span>
						</div>
						{isOrders &&
							(addToBasket(id) ? (
								<SvgGreenOk onClickPlus={onClickPlus} />
							) : (
								<SvgPlus onClickPlus={onClickPlus} />
							))}
					</div>
				</>
			)}
		</div>
	)
}
