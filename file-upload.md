# File Upload Implementation Guide

Complete guide for implementing file uploads in your frontend application.

## Overview

The file upload system uses **presigned URLs** for secure, direct-to-S3 uploads without exposing AWS credentials to the frontend.

## Upload Flow

```
1. Frontend → API: Request presigned URL
2. API → S3: Generate presigned URL  
3. API → Frontend: Return presigned URL + metadata
4. Frontend → S3: Upload file directly using presigned URL
5. Frontend → API: Confirm upload completion
6. API → DynamoDB: Store file metadata
```

## API Endpoints

### 1. Get Presigned Upload URL

**Request:**
```http
POST /api/file-upload/presigned-url
Authorization: Bearer <cognito-jwt-token>
Content-Type: application/json

{
  "fileName": "invoice_2024_10.pdf"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "uploadUrl": "https://cashflow-ai-bucket.s3.amazonaws.com/users/user-id/uploads/1696334233158_invoice_2024_10.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&...",
    "fileName": "1696334233158_invoice_2024_10.pdf",
    "originalName": "invoice_2024_10.pdf",
    "s3Key": "users/34581428-e031-7092-6647-c29b5be1c4a9/uploads/1696334233158_invoice_2024_10.pdf",
    "fileId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  }
}
```

### 2. Upload File to S3

**Request:**
```http
PUT <uploadUrl>
Content-Type: application/pdf
Content-Length: <file-size>

<binary-file-data>
```

**Response:**
```
200 OK
ETag: "d41d8cd98f00b204e9800998ecf8427e"
```

### 3. Confirm Upload

**Request:**
```http
POST /api/file-upload/confirm-upload
Authorization: Bearer <cognito-jwt-token>
Content-Type: application/json

{
  "fileId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "fileSize": 1024000
}
```

**Response:**
```json
{
  "success": true,
  "message": "File upload confirmed",
  "data": {
    "fileId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "status": "uploaded",
    "fileSize": 1024000,
    "uploadedAt": "2024-10-04T08:30:18.517Z"
  }
}
```

### 4. Get User Files

**Request:**
```http
GET /api/file-upload/files
Authorization: Bearer <cognito-jwt-token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "fileId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "userId": "34581428-e031-7092-6647-c29b5be1c4a9",
      "originalName": "invoice_2024_10.pdf",
      "fileName": "1696334233158_invoice_2024_10.pdf",
      "s3Key": "users/34581428-e031-7092-6647-c29b5be1c4a9/uploads/1696334233158_invoice_2024_10.pdf",
      "fileType": "pdf",
      "fileSize": 1024000,
      "uploadedAt": "2024-10-04T08:30:18.517Z",
      "status": "uploaded",
      "metadata": {
        "contentType": "application/pdf"
      },
      "createdAt": "2024-10-04T08:30:18.517Z",
      "updatedAt": "2024-10-04T08:30:18.517Z"
    }
  ]
}
```

## Frontend Implementation

### File Upload Service

```javascript
class FileUploadService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async uploadFile(file) {
    try {
      // Step 1: Get presigned URL
      const presignedResponse = await this.apiClient.post('/api/file-upload/presigned-url', {
        fileName: file.name
      });

      const { uploadUrl, fileId } = presignedResponse.data.data;

      // Step 2: Upload directly to S3
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file to S3');
      }

      // Step 3: Confirm upload
      await this.apiClient.post('/api/file-upload/confirm-upload', {
        fileId,
        fileSize: file.size
      });

      return { success: true, fileId };
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  }

  async getUserFiles() {
    const response = await this.apiClient.get('/api/file-upload/files');
    return response.data.data;
  }
}
```

### React Component Example

```jsx
function FileUpload() {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      await fileUploadService.uploadFile(file);
      // Refresh file list
      const updatedFiles = await fileUploadService.getUserFiles();
      setFiles(updatedFiles);
      alert('File uploaded successfully!');
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept=".pdf,.csv"
        onChange={handleFileUpload}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
      
      <div>
        <h3>Your Files</h3>
        {files.map(file => (
          <div key={file.fileId}>
            {file.originalName} ({file.fileSize} bytes)
          </div>
        ))}
      </div>
    </div>
  );
}
```

## File Restrictions

### Allowed File Types
- **PDF**: `.pdf` files (application/pdf)
- **CSV**: `.csv` files (text/csv)

### File Size Limits
- **Maximum**: 10MB per file (configurable)
- **Minimum**: 1KB per file

### Security Features
- **Presigned URLs**: Expire in 5 minutes
- **User Isolation**: Files stored in user-specific folders
- **File Validation**: Server-side file type validation
- **Sanitized Names**: Special characters removed from filenames

## Error Handling

### Common Errors

**400 Bad Request:**
```json
{
  "error": "fileName is required in request body"
}
```

**401 Unauthorized:**
```json
{
  "error": "No token provided"
}
```

**500 Server Error:**
```json
{
  "error": "Failed to generate upload URL",
  "message": "S3 bucket not accessible"
}
```

### Frontend Error Handling

```javascript
try {
  await uploadFile(file);
} catch (error) {
  if (error.response?.status === 400) {
    setError('Invalid file or missing information');
  } else if (error.response?.status === 401) {
    setError('Please log in again');
    // Redirect to login
  } else {
    setError('Upload failed. Please try again.');
  }
}
```

## Progress Tracking

### Upload Progress

```javascript
const uploadWithProgress = async (file, onProgress) => {
  const xhr = new XMLHttpRequest();
  
  return new Promise((resolve, reject) => {
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        onProgress(percentComplete);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error('Upload failed'));
      }
    });

    xhr.open('PUT', uploadUrl);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.send(file);
  });
};
```

## Best Practices

### Performance
- **Chunked Upload**: For large files, consider implementing chunked uploads
- **Compression**: Compress files before upload when possible
- **Parallel Uploads**: Limit concurrent uploads to avoid overwhelming the browser

### User Experience
- **Progress Indicators**: Show upload progress and status
- **Drag & Drop**: Implement drag-and-drop file selection
- **Preview**: Show file previews before upload
- **Validation**: Validate files client-side before upload

### Security
- **File Scanning**: Consider implementing virus scanning
- **Content Validation**: Validate file contents match file type
- **Rate Limiting**: Implement upload rate limiting
- **Access Control**: Ensure users can only access their own files

## Testing

### Manual Testing Steps

1. **Upload Valid File**:
   - Select a PDF or CSV file
   - Verify upload completes successfully
   - Check file appears in file list

2. **Upload Invalid File**:
   - Try uploading a .txt file
   - Verify error message appears

3. **Large File Upload**:
   - Upload a file close to size limit
   - Verify progress tracking works

4. **Network Interruption**:
   - Start upload and disconnect internet
   - Verify proper error handling

### Automated Testing

```javascript
describe('File Upload', () => {
  test('should upload PDF file successfully', async () => {
    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    const result = await fileUploadService.uploadFile(file);
    expect(result.success).toBe(true);
  });

  test('should reject invalid file type', async () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    await expect(fileUploadService.uploadFile(file)).rejects.toThrow();
  });
});
```

## Deployment Considerations

### Environment Variables
```bash

S3_BUCKET_NAME=cashflow-ai-bucket
AWS_REGION=us-east-1

```

### S3 Bucket Configuration
- **CORS**: Configured for your domain
- **Lifecycle**: Set up automatic cleanup of old files
- **Versioning**: Enable for file recovery
- **Encryption**: Enable server-side encryption

### Monitoring
- **CloudWatch**: Monitor upload success/failure rates
- **Alerts**: Set up alerts for high error rates
- **Logs**: Log all upload attempts for debugging
