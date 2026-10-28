import jsPDF from "jspdf"
import html2canvas from "html2canvas"


export const downloadReport = async () => {

  const input = document.getElementById(
    "report-section"
  )


  if (!input) {
    return
  }


  const canvas = await html2canvas(input, {

    scale: 2,

    useCORS: true,

    backgroundColor: "#001526"

  })


  const imgData =
    canvas.toDataURL("image/png")


  const pdf =
    new jsPDF(
      "p",
      "mm",
      "a4"
    )


  const pdfWidth =
    pdf.internal.pageSize.getWidth()


  const pdfHeight =
    (canvas.height * pdfWidth) /
    canvas.width


  let heightLeft = pdfHeight

  let position = 0


  pdf.addImage(
    imgData,
    "PNG",
    0,
    position,
    pdfWidth,
    pdfHeight
  )


  heightLeft -=
    pdf.internal.pageSize.getHeight()



  while (heightLeft > 0) {

    position =
      heightLeft - pdfHeight


    pdf.addPage()


    pdf.addImage(
      imgData,
      "PNG",
      0,
      position,
      pdfWidth,
      pdfHeight
    )


    heightLeft -=
      pdf.internal.pageSize.getHeight()

  }


  pdf.save(
    "MicroShield_Report.pdf"
  )

}
