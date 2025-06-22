import type { Status } from '../types/analytics';
import type { StatusMessageVariant, UploadButtonVariant } from '../types/ui';

const uploadButtonVariantMap: Record<Status, UploadButtonVariant> = {
  idle: 'purple',
  loading: 'purple',
  error: 'orange',
  uploaded: 'purple',
  success: 'green',
};

const generatorButtonTextMap: Record<Status, string> = {
  idle: '',
  loading: '',
  error: 'Ошибка',
  uploaded: '',
  success: 'Done!',
};

const statusMessageVariantMap: Record<Status, StatusMessageVariant> = {
  idle: 'default',
  loading: 'default',
  error: 'error',
  uploaded: 'default',
  success: 'default',
};

const uploadStatusMessageTextMap: Record<Status, string> = {
  idle: '',
  loading: 'идёт парсинг файла',
  error: 'упс, не то...',
  uploaded: 'файл загружен!',
  success: 'готово!',
};

const generatorStatusMessageTextMap: Record<Status, string> = {
  idle: '',
  loading: 'идёт процесс генерации',
  error: 'упс, не то...',
  uploaded: '',
  success: 'файл сгенерирован!',
};

export const getUploadButtonVariant = (status: Status): UploadButtonVariant =>
  uploadButtonVariantMap[status];

export const getGeneratorButtonText = (status: Status): string =>
  generatorButtonTextMap[status];

export const getStatusMessageVariant = (status: Status): StatusMessageVariant =>
  statusMessageVariantMap[status];

export const getUploadStatusMessageText = (status: Status): string =>
  uploadStatusMessageTextMap[status];

export const getGeneratorStatusMessageText = (status: Status): string =>
  generatorStatusMessageTextMap[status];
