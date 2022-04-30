function getDocumentHeight() {
    const body = document.body;
    const html = document.documentElement;

    return Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
    );
};

function getScrollTop() {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

// function generateImageSourceUrl() {
//     const hash = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
//     return `http://api.adorable.io/${first2Num}`;
// }
function generateImageSourceUrl() {
    const hash = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    const id = Math.floor(Math.random() * (1100 - 0 + 1) + 0);
    const first3Str = String(hash).slice(0, 3);
    const first3Num = Number(first3Str);
    return `https://picsum.photos/id/${id}/${first3Num}`;
}

function getElementImage() {
    const cssImageClass = 'element-list__item__image';
    const cssImageLoadingClass = `${cssImageClass}--loading`;
    
    const image = new Image;
    image.className = `${cssImageClass} ${cssImageLoadingClass}`;
    image.src = generateImageSourceUrl();
    image.onload = () => {
        setTimeout(() => image.classList.remove(cssImageLoadingClass),5000)
    };
    return image;
}
function getDownloadButton() {
    const button = document.createElement('a');
    const item = document.createElement('i');
    item.className = 'fa fa-download'
    button.className = 'btn';
    button.appendChild(item);
    button.setAttribute("target","_blank");
    return button;
}

function getElement() {
    const elementImage = getElementImage();
    const button = getDownloadButton();
    const url = elementImage.src;
    button.download = url.split('/').pop();
    const getBase64Image = () => {
        const img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL("image/png");
            console.log(dataURL);
            button.href = dataURL;
            return dataURL;
        }
        img.src = url;
    }
    getBase64Image();
    const element = document.createElement('div');
    element.className = 'element-list__item';
    element.appendChild(elementImage);
    element.appendChild(button);
    return element;
}

function loadNextBatch(batchSize = 20) {
    while (batchSize--) {
            const element = getElement();
        elementList.appendChild(element);
    }
}

const elementList = document.querySelector('.element-list');

// Load the first batch of elements
loadNextBatch();

// Load more batches when scorlling to the end
window.onscroll = function () {
    if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
    loadNextBatch();
};