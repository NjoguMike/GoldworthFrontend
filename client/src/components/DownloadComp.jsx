import React from 'react';

function DownloadButton({ url , buttonName }){

  const downloadDocument = () => {

    const documentUrl = url;
    
    const link = document.createElement('a');
    
    link.href = documentUrl;
    
    link.download = 'downloaded_document.pdf';
    
    document.body.appendChild(link);
    
    link.click();
    
    document.body.removeChild(link);
  };

  return (
      <button onClick={downloadDocument} >{buttonName ? buttonName : 'Download'}</button>
  );
};

export default DownloadButton;