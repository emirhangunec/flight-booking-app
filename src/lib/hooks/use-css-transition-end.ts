import { RefObject, useEffect } from 'react'

interface UseCssTransitionEndProps<T> {
	elementRef: RefObject<T>
	callbackFunction: (element: T) => void
}
function useElementTransitionEnd<T extends HTMLElement>({
	elementRef,
	callbackFunction,
}: UseCssTransitionEndProps<T>) {
	useEffect(() => {
		const element = elementRef.current
		if (!element) return
		const transitionEnd = () => {
			callbackFunction(element)
			element.removeEventListener('transitionend', transitionEnd)
		}
		element.addEventListener('transitionend', transitionEnd)
		return () => {
			element.removeEventListener('transitionend', transitionEnd)
		}
	}, [elementRef, callbackFunction])
}

export default useElementTransitionEnd
