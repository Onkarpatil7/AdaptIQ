import { useState } from "react";
import { uploadDataset } from "../services/datasetService";

const allowedExtensions = [
  ".csv",
  ".xlsx",
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
];

export default function DataUpload() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {

    const file = event.target.files?.[0];

    if (!file) return;

    const extension =
      "." + file.name.split(".").pop()?.toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      setStatus("Unsupported file format");
      setSelectedFile(null);
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setStatus("Maximum file size is 20 MB");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setStatus("");
  }

  async function handleUpload() {

    if (!selectedFile) return;

    try {

      setLoading(true);
      setStatus("Uploading...");

      const result = await uploadDataset(selectedFile);

      setStatus(
        `Successfully uploaded: ${result.filename}`
      );

      setSelectedFile(null);

    } catch (error) {

      setStatus(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  }

  return (

    <div className="bg-white rounded-xl border border-gray-200 p-6">

      <h2 className="text-xl font-semibold mb-2">
        Upload Business Data
      </h2>

      <p className="text-gray-500 text-sm mb-5">
        Upload sales records, purchase invoices,
        inventory sheets and business documents.
      </p>

      <label className="flex flex-col items-center justify-center
        border-2 border-dashed border-gray-300 rounded-xl
        p-10 cursor-pointer hover:border-blue-500 transition">

        <span className="text-4xl mb-3">☁️</span>

        <span className="font-medium">
          Browse files from your computer
        </span>

        <span className="text-sm text-gray-400 mt-2">
          CSV, XLSX, PDF, JPG, JPEG, PNG
        </span>

        <span className="text-xs text-gray-400 mt-1">
          Maximum size: 20 MB
        </span>

        <input
          type="file"
          className="hidden"
          accept=".csv,.xlsx,.pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
        />

      </label>

      {selectedFile && (

        <div className="mt-4 bg-gray-50 rounded-lg p-4">

          <p className="font-medium">
            {selectedFile.name}
          </p>

          <p className="text-sm text-gray-500">
            {(selectedFile.size / 1024).toFixed(2)} KB
          </p>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-3 bg-blue-600 text-white px-5 py-2
              rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload File"}
          </button>

        </div>

      )}

      {status && (

        <p className="mt-4 text-sm text-gray-700">
          {status}
        </p>

      )}

    </div>
  );
}