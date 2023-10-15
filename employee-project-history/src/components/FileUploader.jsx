import React, { useRef } from "react";
import { Input, Flex, Text } from "@chakra-ui/react";

const FileUploader = ({ onFileUpload }) => {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onFileUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    debugger
    const file = e.dataTransfer.files[0];
    onFileUpload(file);
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      p={3}
      border="2px dashed #CBD5E0"
      borderRadius="lg"
      textAlign="center"
      cursor="pointer"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label
        htmlFor="file-upload"
        style={{ cursor: "pointer" }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Text fontSize="lg" fontWeight="bold">
          {fileInputRef.current && fileInputRef.current.files.length > 0
            ? fileInputRef.current.files[0].name
            : "Click or drag a CSV file here"}
        </Text>
      </label>
      <Input
        id="file-upload"
        type="file"
        accept=".csv"
        display="none"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </Flex>
  );
};

export default FileUploader;
