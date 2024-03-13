export class SlideData {
    readonly #imgSrc: string;
    readonly #description: string;

    constructor(imgSrc: string, description: string) {
        this.#imgSrc = imgSrc;
        this.#description = description;
    }

    get imgSrc() {
        return this.#imgSrc;
    }

    get description() {
        return this.#description;
    }
}

const sliderData: SlideData[] = [
    new SlideData(
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
        'OLD NOKIA'
    ),
    new SlideData(
        'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
        'GIRL WITH CANON'
    ),
    new SlideData(
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
        'SUNSET'
    ),
    new SlideData(
        'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
        'MAN FROM FUTURE'
    ),
    new SlideData(
        'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
        'WINDOWS XP BACKGROUND WITH STEROIDS'
    )
]

export default sliderData;