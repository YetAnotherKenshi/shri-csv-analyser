import Button from '../../ui/Button/Button';
import UploadButton from '../../ui/UploadButton/UploadButton';
import StatusMessage from '../../ui/StatusMessage/StatusMessage';
import styles from './generatorPage.module.css';
import {
  getGeneratorButtonText,
  getGeneratorStatusMessageText,
  getStatusMessageVariant,
  getUploadButtonVariant,
} from '../../../utils/uiMappings';
import { useGeneratorStore } from '../../../store/generatorStore';
import { generateReport } from '../../../services/generatorService';

const GeneratorPage = () => {
  const { status, setStatus } = useGeneratorStore();

  const handleGenerate = async () => {
    setStatus('loading');

    try {
      await generateReport(0.05, 5000);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const handleDelete = () => {
    setStatus('idle');
  };

  const getUploadButtonClassName = () => {
    if (status === 'success' || status === 'error') {
      return styles.label;
    }
    return undefined;
  };

  return (
    <div className={styles.page}>
      <p className={styles.title}>
        Сгенерируйте готовый csv-файл нажатием одной кнопки
      </p>
      {status !== 'idle' ? (
        <>
          <UploadButton
            variant={getUploadButtonVariant(status)}
            loading={status === 'loading'}
            onDelete={handleDelete}
            className={getUploadButtonClassName()}
          >
            {getGeneratorButtonText(status)}
          </UploadButton>
          <StatusMessage
            className={styles.status}
            variant={getStatusMessageVariant(status)}
          >
            {getGeneratorStatusMessageText(status)}
          </StatusMessage>
        </>
      ) : (
        <Button onClick={handleGenerate}>Начать генерацию</Button>
      )}
    </div>
  );
};

export default GeneratorPage;
