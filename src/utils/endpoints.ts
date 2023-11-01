import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8000/",
    timeout: 1000,
});

function uploadImg(file: string | File, mode: number): any ;
function uploadImg(file: File, mode: number): any;
function uploadImg(file: string | File, mode: number): any {
    if (typeof file === 'string') {
        instance.post("/upload-url", {mode, file})
            .then(res => console.log(res))
            .catch(err => console.log(err));
    } else {
        instance.post("/upload", {mode, file})
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }
}

export function postFormData(mode: number): (file: string | File) => Promise<void> {
    return function (file: string | File): Promise<void> {
        return uploadImg(file, mode);
    }
}


