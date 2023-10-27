import React, { useContext } from 'react'
import Card from '../components/Card/Card'
import ContentTitle from '../components/ContentTitle/ContentTitle'
import { ContextAll } from '../context'

export default function Home() {
	const { isLoading, items, searchValue } = useContext(ContextAll)

	return (
		<>
			<ContentTitle />
			<div style={{ display: 'flex', gap: 35, flexWrap: 'wrap' }}>
				{(isLoading
					? [...Array(8)]
					: items.filter((el) =>
							el.title.toLowerCase().includes(searchValue.toLowerCase())
					  )
				).map((el, index) => (
					<Card key={isLoading ? index : el.id} {...el} />
				))}
			</div>
		</>
	)
}
