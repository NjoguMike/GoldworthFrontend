import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

function DownloadPDF({ downloadElement }) {

    function downloadbutton(){
        const comp = document.getElementById(downloadElement)
        html2canvas(comp).then((canvas)=>{
            const downloadImage = canvas.toDataURL('image/png')
            const pdf = new jsPDF('p', 'px', [1600 , 1440])
            pdf.addImage(downloadImage, 'PNG', 130 , 30, 1050, 1080)
            pdf.save('downoadFile.pdf')
        })
    }

  return (
    <button onClick={downloadbutton} className='btn'> Download PDF </button>
  )
}

export default DownloadPDF