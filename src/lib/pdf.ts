import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (
  element: HTMLElement,
  filename: string = 'invoice.pdf'
): Promise<Blob> => {
  try {
    // Create canvas from the element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');

    // A4 dimensions in mm
    const pdfWidth = 210;
    const pdfHeight = 297;

    // Calculate dimensions to fit A4
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const finalWidth = imgWidth * ratio;
    const finalHeight = imgHeight * ratio;

    // Center the image on the page
    const x = (pdfWidth - finalWidth) / 2;
    const y = 0;

    pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);

    // Return blob for print, save for download
    const blob = pdf.output('blob');
    pdf.save(filename);
    return blob;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const generatePDFBlob = async (
  element: HTMLElement
): Promise<Blob> => {
  try {
    // Create canvas from the element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');

    // A4 dimensions in mm
    const pdfWidth = 210;
    const pdfHeight = 297;

    // Calculate dimensions to fit A4
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const finalWidth = imgWidth * ratio;
    const finalHeight = imgHeight * ratio;

    // Center the image on the page
    const x = (pdfWidth - finalWidth) / 2;
    const y = 0;

    pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);

    return pdf.output('blob');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const printInvoice = async (element: HTMLElement): Promise<void> => {
  try {
    // Generate PDF blob
    const pdfBlob = await generatePDFBlob(element);

    // Create object URL for the PDF
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open PDF in new window and print
    const printWindow = window.open(pdfUrl, '_blank');

    if (!printWindow) {
      // Fallback: download the PDF if popup is blocked
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'invoice-print.pdf';
      link.click();
      URL.revokeObjectURL(pdfUrl);
      alert('Popup blocked. PDF downloaded instead. Please open and print manually.');
      return;
    }

    // Wait for PDF to load then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 500);
    };

    // Cleanup URL after a delay
    setTimeout(() => {
      URL.revokeObjectURL(pdfUrl);
    }, 60000);
  } catch (error) {
    console.error('Error printing invoice:', error);
    throw error;
  }
};
