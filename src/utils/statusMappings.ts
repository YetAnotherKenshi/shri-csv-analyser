import type { Status } from "../types/analytics";

export const getUploadButtonVariant = (status: Status) => {
    switch (status) {
        case "success":
            return "green";
        case "error":
            return "orange";
        default:
            return "purple";
    }
};

export const getGeneratorButtonText = (status: Status) => {
    switch (status) {
        case "success":
            return "Done!";
        case "error":
            return "Ошибка";
        default:
            return "";
    }
};

export const getStatusMessageVariant = (status: Status) => {
    switch (status) {
        case "error":
            return "error";
        default:
            return "default";
    }
};

export const getUploadStatusMessageText = (status: Status) => {
    switch (status) {
        case "error":
            return "упс, не то...";
        case "loading":
            return "идёт парсинг файла";
        case "success":
            return "готово!";
        case "uploaded":
            return "файл загружен!";
        default:
            return "";
    }
};

export const getGeneratorStatusMessageText = (status: Status) => {
    switch (status) {
        case "success":
            return "файл сгенерирован!";
        case "error":
            return "упс, не то...";
        case "loading":
            return "идёт процесс генерации";
        default:
            return "";
    }
};
