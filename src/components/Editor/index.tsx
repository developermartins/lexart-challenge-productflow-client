import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';

import { useEffect } from 'react';
import { setEditorContent } from '../../state/state';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  quillValue: any,
  setQuillValue: any,
};

const index = ({ quillValue, setQuillValue }: Props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setEditorContent({
      editorContent: quillValue
    }))
  }, [quillValue]);

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ["link", "image", "video"],

    ['clean']                                         // remove formatting button
  ];

  const  modules = {
    toolbar: toolbarOptions
  };

  return (
    <ReactQuill
      theme='snow'
      modules={modules}
      value={quillValue}   
      onChange={setQuillValue}
    />
  );
};

export default index;
