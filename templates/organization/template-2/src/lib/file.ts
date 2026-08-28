// File utilities with color support
export const COLORS = {
  primary: '#053f5c',      // Dark teal/blue
  secondary: '#a5dded',    // Light blue
  white: '#ffffff',        // White
} as const;

/**
 * Read file and return content
 */
export const readFile = async (path: string): Promise<string> => {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to read: ${path}`);
    return await response.text();
  } catch (error) {
    console.error(`Error reading file:`, error);
    throw error;
  }
};

/**
 * Write file with content
 */
export const writeFile = async (
  path: string,
  content: string
): Promise<void> => {
  try {
    const response = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    if (!response.ok) throw new Error(`Failed to write: ${path}`);
  } catch (error) {
    console.error(`Error writing file:`, error);
    throw error;
  }
};

/**
 * Delete file
 */
export const deleteFile = async (path: string): Promise<void> => {
  try {
    const response = await fetch(path, { method: 'DELETE' });
    if (!response.ok) throw new Error(`Failed to delete: ${path}`);
  } catch (error) {
    console.error(`Error deleting file:`, error);
    throw error;
  }
};

/**
 * Check if file exists
 */
export const fileExists = async (path: string): Promise<boolean> => {
  try {
    const response = await fetch(path, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * Get file size in bytes
 */
export const getFileSize = async (path: string): Promise<number> => {
  try {
    const response = await fetch(path, { method: 'HEAD' });
    const size = response.headers.get('content-length');
    return size ? parseInt(size, 10) : 0;
  } catch (error) {
    console.error(`Error getting file size:`, error);
    return 0;
  }
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};
