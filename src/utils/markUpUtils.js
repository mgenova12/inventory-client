export const finalMarkUpPrice = (price, markUp) => {
	return price + (price * (markUp * 0.01))
}

export const finalPreppedMarkUpPrice = (price, portionSize, markUp) => {
	return price + ((price / portionSize) * (markUp * 0.01))
}