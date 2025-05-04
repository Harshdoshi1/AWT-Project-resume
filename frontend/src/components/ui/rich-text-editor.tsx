import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { cn } from "@/lib/utils";
import { useRef } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link'],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'link'
];

const RichTextEditor = ({ value, onChange, placeholder, className }: RichTextEditorProps) => {
  const quillRef = useRef<ReactQuill>(null);

  return (
    <div className={cn("bg-white/20 rounded-md border border-white/10", className)}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="text-white [&_.ql-toolbar]:border-white/10 [&_.ql-container]:border-white/10 [&_.ql-editor]:min-h-[100px] [&_.ql-toolbar]:!bg-white/5 [&_.ql-container]:!bg-transparent [&_.ql-picker-label]:!text-white [&_.ql-stroke]:!stroke-white [&_.ql-fill]:!fill-white [&_.ql-picker-item]:!text-gray-800"
      />
    </div>
  );
};

export default RichTextEditor;