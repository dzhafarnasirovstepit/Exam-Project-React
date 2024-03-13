import './Slide.css';
import Div from '../../Div/Div';
import { SlideData } from '../slider-data';

type SlideProps = {
    slideData: SlideData
}

const Slide = ({ slideData }: SlideProps) => {
    return (
        <Div className={'slide'}>
            <img src={slideData.imgSrc} alt={slideData.description} />
            <p>{slideData.description}</p>
        </Div>
    )
}

export default Slide;