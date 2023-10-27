import React from 'react'
import styles from './Button.module.scss'

export default function Button({ text, svg, onClick }) {
	return (
		<button onClick={onClick} className={styles.greenButton}>
			{text}
			{svg}
		</button>
	)
}
