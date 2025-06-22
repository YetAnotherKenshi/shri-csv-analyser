import UploadForm from '../../layout/UploadForm/UploadForm';
import styles from './analyticsPage.module.css';
import DataGrid from '../../layout/DataGrid/DataGrid';
import Button from '../../ui/Button/Button';
import { useAnalyticsStore } from '../../../store/analyticsStore';
import { useHistoryStore } from '../../../store/historyStore';
import { dataMapping } from '../../../utils/dataMapping';
import { processFile } from '../../../services/analyticsService';
import type { AnalyticsResult } from '../../../types/analytics';
import type { HistoryRecordStatus } from '../../../types/history';
import { useEffect } from 'react';

const AnalyticsPage = () => {
  const {
    uploadedFile,
    parsedData,
    status,
    setUploadedFile,
    setParsedData,
    setStatus,
  } = useAnalyticsStore();
  const { addRecord } = useHistoryStore();

  const handleSend = async () => {
    if (!uploadedFile) return;

    setStatus('loading');
    let lastResult: AnalyticsResult = {};
    let finalStatus: HistoryRecordStatus = 'success';
    try {
      lastResult = await processFile(
        uploadedFile,
        (result) => {
          setParsedData(result);
        },
        10000,
      );
      setStatus('success');
    } catch {
      setParsedData(null);
      setStatus('error');
      finalStatus = 'error';
    } finally {
      addRecord({
        ...lastResult,
        timestamp: new Date().toISOString(),
        fileName: uploadedFile.name,
        status: finalStatus,
      });
    }
  };

  const handleFileSelect = (file: File | null) => {
    setUploadedFile(file);
    if (!file) {
      setParsedData(null);
      setStatus('idle');
    } else {
      setStatus('uploaded');
    }
  };

  useEffect(() => {
    if (!uploadedFile) return;

    if (uploadedFile.type !== 'text/csv') {
      setParsedData(null);
      setStatus('error');
      return;
    }
  }, [uploadedFile, setParsedData, setStatus]);

  return (
    <div className={styles.page}>
      <p className={styles.title}>
        Загрузите <b>csv</b> файл и получите <b>полную информацию</b> о нём за
        сверхнизкое время
      </p>
      <UploadForm
        uploadedFile={uploadedFile}
        status={status}
        onFileSelect={handleFileSelect}
        className={styles.uploadForm}
      />
      {['uploaded', 'idle'].includes(status) && (
        <Button disabled={!uploadedFile} onClick={handleSend}>
          Отправить
        </Button>
      )}
      <DataGrid
        cols={2}
        data={parsedData}
        dataMapping={dataMapping}
        className={styles.dataGrid}
      />
      {!parsedData && (
        <p className={styles.footer}>
          Здесь
          <br />
          появятся хайлайты
        </p>
      )}
    </div>
  );
};

export default AnalyticsPage;
