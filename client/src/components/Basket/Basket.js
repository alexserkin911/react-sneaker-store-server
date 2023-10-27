import React, { useContext } from 'react'
import { ContextAll } from '../../context'
import BasketItems from '../BasketItems/BasketItems'
import Button from '../Button/Button'
import Info from '../Info/Info'
import styles from './Basket.module.scss'
import SvgArrow from './SvgArrow'
import SvgRemove from './SvgRemove'

export default function Basket() {
	const {
		openBasket,
		totalPrice,
		tax,
		orderNumber,
		basketItems,
		isCompleteOrder,
		onAddBasket,
		onClickOrder,
		setOpenBasket,
	} = useContext(ContextAll)

	return (
		<div
			className={`${styles.overlay} ${openBasket ? styles.overlayVisible : ''}`}
		>
			<div className={styles.drawer}>
				<h2>
					Корзина
					<SvgRemove onClick={() => setOpenBasket(false)} />
				</h2>
				{basketItems.length < 1 ? (
					<Info
						text={isCompleteOrder ? 'Заказ оформлен!' : 'Корзина пустая'}
						description={
							isCompleteOrder
								? `Ваш заказ #${orderNumber} скоро будет передан курьерской доставке`
								: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
						}
						image={
							isCompleteOrder ? '/img/icon/order.jpg' : '/img/icon/CartImg.jpg'
						}
					/>
				) : (
					<>
						<div className={styles.items}>
							{basketItems.map((el) => (
								<BasketItems
									key={el.sneakerId}
									{...el}
									onClick={() => onAddBasket({ ...el, id: el.sneakerId })}
								/>
							))}
						</div>

						<div className={styles.drawerFooter}>
							<div className={styles.cartTotalBlock}>
								<ul>
									<li>
										<span>Итого:</span>
										<div></div>
										<p>{totalPrice} руб.</p>
									</li>
									<li>
										<span>Налог 5%:</span>
										<div></div>
										<p>{tax} руб.</p>
									</li>
								</ul>
							</div>
							<Button
								onClick={onClickOrder}
								text={'Оформить заказ'}
								svg={<SvgArrow />}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
