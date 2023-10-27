import React from 'react'
import { Link } from 'react-router-dom'
import {} from '../../context'
import Button from '../Button/Button'
import SvgArrowLeft from '../Info/SvgArrowLeft'
import styles from './Screensaver.module.scss'

export default function Screensaver({ image, text, description }) {
	return (
		<div className={styles.screensaver}>
			<div>
				<img src={image} alt='img' />
				<h2>{text}</h2>
				<p>{description}</p>
				<Link to={'/'}>
					<Button text={'Вернуться назад'} svg={<SvgArrowLeft />} />
				</Link>
			</div>
		</div>
	)
}
