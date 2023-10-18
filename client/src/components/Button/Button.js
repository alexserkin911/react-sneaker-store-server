import React from 'react'
import styles from './Button.module.scss'

export default function Button({ text, svg }) {
	return (
		<button className={styles.greenButton}>
			{text}
			{svg}
		</button>
	)
}
