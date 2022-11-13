import React from "react";
import { IoImage } from "react-icons/io5";
import styled from "styled-components";
import { Flex, Image } from "@/components/atom";

const imgSize = "11rem";

const Area = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  border-radius: 50%;
  width: ${imgSize};
  height: ${imgSize};

  background-color: ${(props) => props.theme.image_background};
  cursor: pointer;

  font-size: 1.2rem;
  color: ${(props) => props.theme.input_placeholder};

  & > input {
    display: none;
  }

  svg {
    font-size: 3.2rem;
  }
`;

export const ImageInput: React.FC<{
  imgBlobUrl: string;
  setImgFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}> = ({ imgBlobUrl, setImgFile }) => {
  return (
    <Flex.center>
      <Area
        onDrop={(event) => {
          event.preventDefault();
          setImgFile(event.dataTransfer.files[0]);
        }}
        onDragOver={(event) => event.preventDefault()}
      >
        {imgBlobUrl.length ? (
          <Image src={imgBlobUrl} size={imgSize} />
        ) : (
          <>
            <IoImage />
            <span>Drag or Upload</span>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            const files = event.target.files ?? [];
            setImgFile(files[0]);
          }}
        />
      </Area>
    </Flex.center>
  );
};
