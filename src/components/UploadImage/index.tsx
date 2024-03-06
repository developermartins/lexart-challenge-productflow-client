import styled from "styled-components";
import app from '../../lib/firebaseApp.config';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';

import { PostData } from "../../types";
import { UseFormRegister } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

type Props = {
  register: UseFormRegister<PostData>,
  img: any,
  setImg: Function,
  setFileUrl: Dispatch<SetStateAction<string>>,
  setImgPercentage: Function,
}

const index = ({ img, setImg, register, setFileUrl, setImgPercentage }: Props) => {

    const uploadFile = (file: any, urlType: string) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            urlType === "imgUrl" && setImgPercentage(Math.round(progress));
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            default:
                break;
            };
        },
        (error) => {},
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFileUrl(downloadURL);
          });
        },
      );
    };

    useEffect(() => {
      img && uploadFile(img, "imgUrl");
    }, [img]);

  return (
    <ImageUploadSection>
      { img ?
        <PostImagePreview src={ URL.createObjectURL(img) } />
        : 
        <ImageWrapper>
          <UploadLabel htmlFor="fileInput">
            <CameraAltRoundedIcon style={{ fontSize: "3.5rem" }} />
          </UploadLabel>
          <UploadInput
            type="file"
            accept="image/*"
            id="fileInput"
            { ...register("imgUrl", { onChange: (e) => { setImg(e.target.files[0]) } }) }
          />
        </ImageWrapper>
      }
    </ImageUploadSection>
  );
};

const ImageUploadSection = styled.section`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  margin-bottom: 2rem;
`;

const ImageWrapper = styled.div`
  width: 51.563rem;
  height: 18.25rem;
  background-color: var(--main-color);
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PostImagePreview = styled.img`
  width: 51.563rem;
  height: 25rem;
  border-radius: 30px;
`;

const UploadLabel = styled.label`
  cursor: pointer;
`;

const UploadInput = styled.input`
  display: none;
`;

export default index;
