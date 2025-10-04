"use client";

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiUpload, FiFile, FiCheck, FiX } from 'react-icons/fi';
import { getPresignedUploadUrl, confirmFileUpload, getUserFiles } from '../../../lib/api';

interface UploadedFile {
  fileId: string;
  originalName: string;
  fileSize: number;
  status: 'uploading' | 'uploaded' | 'error';
  progress?: number;
}

export default function FileUploadPage() {
  const router = useRouter();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = async (fileList: File[]) => {
    setLoading(true);
    
    for (const file of fileList) {
      const fileId = crypto.randomUUID();
      
      // Add file to state with uploading status
      setFiles(prev => [...prev, {
        fileId,
        originalName: file.name,
        fileSize: file.size,
        status: 'uploading',
        progress: 0
      }]);

      try {
        // Get presigned URL
        const { data } = await getPresignedUploadUrl(file.name);
        
        // Upload to S3
        const uploadResponse = await fetch(data.uploadUrl, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type
          }
        });

        if (uploadResponse.ok) {
          // Confirm upload
          await confirmFileUpload(data.fileId, file.size);
          
          // Update file status
          setFiles(prev => prev.map(f => 
            f.fileId === fileId 
              ? { ...f, status: 'uploaded' as const, progress: 100 }
              : f
          ));
        } else {
          throw new Error('Upload failed');
        }
      } catch (error) {
        console.error('Upload error:', error);
        setFiles(prev => prev.map(f => 
          f.fileId === fileId 
            ? { ...f, status: 'error' as const }
            : f
        ));
      }
    }
    
    setLoading(false);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.fileId !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-brand-gray-light">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-brand-text-medium hover:text-brand-text-dark mr-4"
          >
            <FiArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-brand-text-dark">Upload Documents</h1>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-brand-teal bg-brand-teal/5' 
                : 'border-gray-300 hover:border-brand-teal'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FiUpload className="h-12 w-12 text-brand-text-medium mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-brand-text-dark mb-2">
              Drop files here or click to upload
            </h3>
            <p className="text-brand-text-medium mb-4">
              Support for PDF, Excel, CSV, and image files up to 10MB
            </p>
            <input
              type="file"
              multiple
              onChange={handleFileInput}
              className="hidden"
              id="file-input"
              accept=".pdf,.xlsx,.xls,.csv,.jpg,.jpeg,.png"
            />
            <label
              htmlFor="file-input"
              className="bg-brand-teal hover:bg-brand-teal-dark text-white px-6 py-2 rounded-lg cursor-pointer transition-colors"
            >
              Choose Files
            </label>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-brand-text-dark mb-4">
              Uploaded Files ({files.length})
            </h3>
            <div className="space-y-3">
              {files.map((file) => (
                <div key={file.fileId} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <FiFile className="h-5 w-5 text-brand-text-medium mr-3" />
                    <div>
                      <p className="font-medium text-brand-text-dark">{file.originalName}</p>
                      <p className="text-sm text-brand-text-medium">{formatFileSize(file.fileSize)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {file.status === 'uploading' && (
                      <div className="flex items-center text-blue-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                        Uploading...
                      </div>
                    )}
                    
                    {file.status === 'uploaded' && (
                      <div className="flex items-center text-green-600">
                        <FiCheck className="h-4 w-4 mr-2" />
                        Uploaded
                      </div>
                    )}
                    
                    {file.status === 'error' && (
                      <div className="flex items-center text-red-600">
                        <FiX className="h-4 w-4 mr-2" />
                        Failed
                      </div>
                    )}
                    
                    <button
                      onClick={() => removeFile(file.fileId)}
                      className="ml-4 text-brand-text-medium hover:text-red-600"
                    >
                      <FiX className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Supported File Types</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Financial statements (PDF, Excel)</li>
            <li>• Bank statements (PDF, CSV)</li>
            <li>• Invoices and receipts (PDF, Images)</li>
            <li>• Transaction records (Excel, CSV)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
