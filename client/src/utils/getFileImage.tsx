import fileImage from '../assets/file.png';
import pdfImage from '../assets/pdf.png';
import excelImage from '../assets/excel.png';
import wordImage from '../assets/word.png';
import txtImage from '../assets/txt.png';
import pictureImage from '../assets/image.png';
import pptImage from '../assets/powerpoint.png';

const getFileImage = (name: string) => {
    if (name) {
        const extendArray: string[] = name.split('.');
        const extend: string = extendArray[extendArray.length - 1];
        console.log(extend);
        switch (extend) {
            case 'csv':
            case 'xlsx':
            case 'xls':
                return excelImage;
            case 'txt':
                return txtImage;
            case 'pdf':
                return pdfImage;
            case 'doc':
            case 'docx':
                return wordImage;
            case 'pptx':
            case 'ppt':
                return pptImage;
            case 'png':
            case 'jpg':
            case 'jpeg':
                return pictureImage;
            default:
                return fileImage;
        }
    }
    return fileImage;
};

export default getFileImage;
