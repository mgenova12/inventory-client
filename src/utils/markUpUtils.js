export const finalMarkUpPrice = (price, markUp) => {
	return price + (price * (markUp * 0.01))
}

export const finalPreppedMarkUpPrice = (price, portionSize, markUp) => {
	return ((price / portionSize) * (1 + (markUp * 0.01)))
}