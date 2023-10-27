import React, { useContext } from 'react'

import { ContextAll } from '../../context'
import Button from '../Button/Button'
import styles from './Info.module.scss'
import SvgArrowLeft from './SvgArrowLeft'

export default function Info({ text, description, image }) {
	const { setOpenBasket, seIsCompleteOrder, isCompleteOrder } =
		useContext(ContextAll)

	console.log(text)
	return (
		<div className={styles.Info}>
			<div>
				<img src={image} alt='img' />
				<h2>{text}</h2>
				<p>{description}</p>
				<Button
					onClick={() => {
						setOpenBasket(false)
						isCompleteOrder && seIsCompleteOrder(false)
					}}
					text={'Вернуться назад'}
					svg={<SvgArrowLeft />}
				/>
			</div>
		</div>
	)
}
