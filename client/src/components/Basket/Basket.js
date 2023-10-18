import React from 'react'
import BasketItems from '../BasketItems/BasketItems'
import Button from '../Button/Button'
import CartEmpty from '../CartEmpty/CartEmpty'
import styles from './Basket.module.scss'
import SvgArrow from './SvgArrow'
import SvgRemove from './SvgRemove'

export default function Basket({
	onClickClose,
	basketItems = [],
	onRemoveBasket,
}) {
	return (
		<div className={styles.overlay}>
			<div className={styles.drawer}>
				<h2>
					Корзина
					<SvgRemove onClick={onClickClose} />
				</h2>
				{basketItems.length < 1 ? (
					<CartEmpty />
				) : (
					<>
						<div className={styles.items}>
							{basketItems.map((el) => (
								<BasketItems
									key={el.id}
									{...el}
									onRemoveBasket={onRemoveBasket}
								/>
							))}
						</div>

						<div className={styles.drawerFooter}>
							<div className={styles.cartTotalBlock}>
								<ul>
									<li>
										<span>Итого:</span>
										<div></div>
										<p>21 498 руб.</p>
									</li>
									<li>
										<span>Налог 5%:</span>
										<div></div>
										<p>1074 руб.</p>
									</li>
								</ul>
							</div>
							<Button text={'Оформить заказ'} svg={<SvgArrow />} />
						</div>
					</>
				)}
			</div>
		</div>
	)
}
