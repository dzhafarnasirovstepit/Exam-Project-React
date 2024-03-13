import './Slider.css';
import { useState } from 'react';
import Button from '../Button/Button';
import Slide from './Slide/Slide';
import Div from '../Div/Div';
import { SlideData } from './slider-data';

type SliderProps = {
	sliderData: SlideData[]
}

const Slider = ({ sliderData }: SliderProps) => {
	const [slideIndex, setSlideIndex] = useState(0);

	const updateSlideIndex = (direction: number) => {
		setSlideIndex((sliderData.length + slideIndex + direction) % sliderData.length);

		/*
		const newSlideIndex = slideIndex + direction;

		if (newSlideIndex === sliderData.length) setSlideIndex(0);
		else if (newSlideIndex === -1) setSlideIndex(sliderData.length - 1);
		else setSlideIndex(newSlideIndex);
		*/
	}

	const handlePrevSlide = () => {
		updateSlideIndex(-1);
	}

	const handleNextSlide = () => {
		updateSlideIndex(1);
	}

	return (
		<Div className={ 'slider' }>
			<Button className={ 'slider-btn prev' } onClick={ handlePrevSlide } />
			<Slide slideData={ sliderData![slideIndex] } />
			<Button className={ 'slider-btn next' } onClick={ handleNextSlide } />
		</Div>
	)
}

export default Slider;