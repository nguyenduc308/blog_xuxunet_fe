import EditorJs from 'react-editor-js';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import List from '@editorjs/list';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Image from '@editorjs/image';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import MathTool from 'editorjs-maths'
import http from '../../../libs/http';

const CustomEditor = ({ data, onChange }) => {
  const TOOLS = {
    embed: Embed,
    table: Table,
    list: List,
    code: Code,
    linkTool: LinkTool,
    image: {
      class: Image,
      config: {
        uploader: {
          uploadByFile(file) {
            const formData = new FormData();
            formData.append('file', file);
            return http.post('/upload/images', formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            });
          },
        },
      },
    },
    header: Header,
    quote: {
      class: Quote,
      inlineToolbar: true,
      config: {
        quotePlaceholder: 'Enter a quote',
        captionPlaceholder: "Quote's author",
      },
      shortcut: 'CMD+SHIFT+Q',
    },
    math: MathTool,
    delimiter: Delimiter,
    inlineCode: InlineCode,
  };

  return <>{data && <EditorJs
      tools={TOOLS}
      placeholder="Nội dung bài viết"
      data={{time: Date.now(), blocks: data}}
      onChange={onChange}
    />}</>
};

export default CustomEditor;
