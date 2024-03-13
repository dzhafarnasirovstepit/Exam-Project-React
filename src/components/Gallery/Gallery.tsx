import './Gallery.css';
import Div from '../Div/Div';
import Img from '../Img/Img';
import List from '../List/List';
import Preview from './Preview/Preview';

const Gallery = () => {
    return (
        <Div className="gallery">
            <Div className="photo">
                <Img id="photo-1" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="" />
                <Img id="photo-2" src="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg" alt="" />
                <Img id="photo-3" src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" alt="" />
                <Img id="photo-4" src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="" />
            </Div>
            <Div className="preview">
                <List>
                    <Preview
                        href={'photo-1'}
                        imgSrc={'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'}
                        imgAlt={''}
                    />

                    <Preview
                        href={'photo-2'}
                        imgSrc={'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg'}
                        imgAlt={''}
                    />

                    <Preview
                        href={'photo-3'}
                        imgSrc={'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'}
                        imgAlt={''}
                    />

                    <Preview
                        href={'photo-4'}
                        imgSrc={'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80'}
                        imgAlt={''}
                    />
                </List>
            </Div>
        </Div>
    )
}

export default Gallery;