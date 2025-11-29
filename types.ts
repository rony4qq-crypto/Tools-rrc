import { LucideIcon } from 'lucide-react';

export interface ToolData {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  actionType: ToolActionType;
  accept: string; // File input accept attribute (e.g., ".pdf" or "image/*")
  multiple: boolean;
  features: string[];
  faqs: { question: string; answer: string }[];
  isPopular?: boolean;
}

export enum ToolActionType {
  CONVERT_FROM_PDF = 'CONVERT_FROM_PDF', // PDF -> Word, JPG, etc.
  CONVERT_TO_PDF = 'CONVERT_TO_PDF',     // Word, JPG -> PDF
  MODIFY_PDF = 'MODIFY_PDF',             // Merge, Split, Compress, Protect
  EXTRACT = 'EXTRACT',                   // Extract Images, Text
}

export interface ProcessedFile {
  originalName: string;
  url: string;
  name: string;
  type: string;
}