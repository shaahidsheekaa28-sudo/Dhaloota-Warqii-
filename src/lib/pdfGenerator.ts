import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function downloadSchedulePDF(
  elementId: string = 'print-document-container',
  filename: string = 'Sagantaa_Hifzii_Guutuu.pdf'
) {
  const container = document.getElementById(elementId);
  if (!container) {
    throw new Error('Element for PDF generation not found');
  }

  // Clone container temporarily to render cleanly with html2canvas
  const clone = container.cloneNode(true) as HTMLElement;
  clone.style.display = 'block';
  clone.style.position = 'fixed';
  clone.style.top = '0px';
  clone.style.left = '0px';
  clone.style.zIndex = '-99999';
  clone.style.opacity = '0.99';
  clone.style.width = '800px'; // standard printable width
  clone.style.padding = '24px';
  clone.style.backgroundColor = '#ffffff';
  clone.style.color = '#000000';
  clone.classList.remove('hidden', 'print:block', 'print-only');

  // Ensure all children are visible inside clone
  const hiddenElements = clone.querySelectorAll('.hidden');
  hiddenElements.forEach((el) => el.classList.remove('hidden'));

  document.body.appendChild(clone);

  try {
    const canvas = await html2canvas(clone, {
      scale: 2, // High resolution crisp text
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1024,
      onclone: (clonedDoc) => {
        // Strip or convert modern color functions (oklch, oklab, color-mix, lab, lch) from style tags and inline styles so html2canvas doesn't crash
        const cleanCssString = (css: string): string => {
          let updated = css;
          let pass = 0;
          const colorRegex = /(oklch|oklab|color-mix|lab|lch)\((?:[^()]+|\([^()]*\))*\)/gi;
          while (colorRegex.test(updated) && pass < 10) {
            colorRegex.lastIndex = 0;
            updated = updated.replace(colorRegex, '#1b365d');
            pass++;
          }
          return updated;
        };

        const styleTags = clonedDoc.querySelectorAll('style');
        styleTags.forEach((tag) => {
          if (tag.textContent) {
            tag.textContent = cleanCssString(tag.textContent);
          }
        });

        const allElements = clonedDoc.querySelectorAll('*');
        allElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.style && htmlEl.style.cssText) {
            htmlEl.style.cssText = cleanCssString(htmlEl.style.cssText);
          }
        });
      },
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add subsequent pages if content overflows A4 height
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Trigger download via Blob URL for reliable cross-browser / iframe support
    const pdfBlob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.target = '_blank';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      link.remove();
      URL.revokeObjectURL(blobUrl);
    }, 2000);
  } finally {
    if (document.body.contains(clone)) {
      document.body.removeChild(clone);
    }
  }
}

