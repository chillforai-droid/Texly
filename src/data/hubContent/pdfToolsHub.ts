export interface HubToolContent {
  id: string;
  name: string;
  description: string;
  howToUse: string[];
  faq: { q: string; a: string };
  relatedToolIds?: string[];
}

export const pdfToolsHubTools: HubToolContent[] = [
  {
    id: "merge-pdf",
    name: "Merge PDF",
    description: "Ever had three separate PDFs that really belong together? Like a cover letter, resume, and portfolio — each in its own file. You could print them individually, but that's messy. This tool stitches them into one smooth document, page by page, in whatever order you want. Drag, drop, rearrange. It's like being a film editor but for documents. Teachers combining student submissions? Two clicks. Real estate agents pulling together property disclosures? Done. Everything happens right in your browser — Texly Online never sees your files, so sensitive contracts stay sensitive.",
    howToUse: [
      "Click the upload area or drag your first PDF file into the window",
      "Keep adding more PDFs — they'll appear as thumbnails in a list",
      "Drag thumbnails up or down to reorder the pages or entire documents",
      "Hit Merge, wait three seconds while your browser does the work, then download the combined file"
    ],
    faq: { q: "Can I merge just specific pages from each PDF instead of whole files?", a: "Not directly in the merge tool — it combines full documents. But here's a workaround: use the Split PDF tool first to extract the pages you want from each file, then merge those extracts. Takes an extra minute but gives you surgical control." },
    relatedToolIds: ["split-pdf", "pdf-editor"]
  },
  {
    id: "split-pdf",
    name: "Split PDF",
    description: "Sometimes a PDF is just too chunky. Maybe you scanned a 50-page notebook and only need pages 12-18 for a client. Or that textbook chapter you downloaded? You just want the diagrams. This tool lets you carve out exactly what you need — think of it as a surgical scalpel for documents. Extract a single page, a range like 4-9, or split every page into its own file. No installation, no watermark, no waiting for an email that never arrives. All happens locally, so financial statements or medical records never float around the internet.",
    howToUse: [
      "Upload the PDF you want to break apart",
      "Choose a split mode: by page ranges (e.g., 3-7), by individual page numbers, or every page into separate files",
      "Type in the ranges or pages you want to extract",
      "Click Split, then download each resulting PDF individually"
    ],
    faq: { q: "Can I split a PDF without losing the original quality or embedded fonts?", a: "Yes — the tool preserves every bit of original formatting, fonts, images, and vector graphics. Because it's client-side processing, it copies the exact page objects without re-encoding or compressing anything unless you specifically use the compression tool separately." },
    relatedToolIds: ["merge-pdf", "pdf-compress"]
  },
  {
    id: "pdf-compress",
    name: "Compress PDF",
    description: "Ever tried emailing a 25MB PDF only to get that angry bounce-back from the server? Or uploaded a portfolio to a job portal that has a 5MB limit? Yeah, been there. This tool squeezes your file down without turning text into a blurry mess. It's smart about what it reduces — images get lighter, but text stays crisp. You'll be shocked how much fat you can trim. A scanned contract that's 18MB might drop to 3MB. That photo-heavy brochure? Still looks good but actually attachable. And because nothing leaves your computer, you can compress salary sheets or legal docs without a second thought.",
    howToUse: [
      "Drop your oversized PDF into the upload zone",
      "Choose compression level — light (least reduction), medium (good balance), or strong (smallest file, some image quality loss)",
      "Preview the estimated new file size next to the original",
      "Click Compress and download your leaner PDF in about five seconds"
    ],
    faq: { q: "What actually gets removed when I compress a PDF — will my text become unreadable?", a: "Text stays perfectly readable; compression mainly downsamples images, removes duplicate objects, and re-encodes streams more efficiently. Your words, fonts, and vector graphics remain unchanged. Strong compression might make photos look slightly softer, but text won't turn into hieroglyphics." },
    relatedToolIds: ["image-to-pdf", "pdf-to-image"]
  },
  {
    id: "pdf-to-word",
    name: "PDF to Word",
    description: "You know that feeling when you get a PDF and need to edit one sentence? But the original file is lost on some old laptop? This tool turns the PDF back into a Word document so you can actually change things. It extracts the text and tries to keep your layout — headings where headings should be, lists still indented. No, it's not perfect for every crazy design out there. But for reports, essays, invoices, and standard business docs? Works like a charm. Students love this for tweaking citations. Copywriters use it to repurpose old PDF content. And again — your file stays put. No upload, no privacy nightmare.",
    howToUse: [
      "Select the PDF you want to convert",
      "Wait a few seconds while the tool reads the document structure",
      "Click Download as DOCX when the preview looks good",
      "Open in Microsoft Word or Google Docs and start editing immediately"
    ],
    faq: { q: "Will my columns, tables, and images look the same in Word as they did in the PDF?", a: "Most simple tables and single-column layouts transfer cleanly. Complex multi-column designs or heavily styled forms might shift around a bit — the tool prioritizes text accuracy over pixel-perfect positioning. For tables with merged cells or nested elements, expect some manual cleanup. Images stay put, though." },
    relatedToolIds: ["word-to-pdf", "pdf-editor"]
  },
  {
    id: "word-to-pdf",
    name: "Word to PDF",
    description: "You finish a report in Word, send it off, and then someone opens it on their phone — suddenly the formatting explodes. Fonts change, margins shift, that nice header walks off the page. Sound familiar? Converting to PDF freezes everything in place like amber. This tool takes your DOCX file and bakes it into a PDF that looks identical on a Mac, a Windows machine, or a Linux terminal from 2005. No weird embedded fonts, no layout surprises. Freelancers use this before sending invoices. Students do it before printing at the library. Everything stays local, so your half-finished novel or confidential business proposal never touches a stranger's server.",
    howToUse: [
      "Upload your Word document (.docx only — older .doc files won't work)",
      "Let the tool process — usually under 3 seconds for a 20-page doc",
      "Preview the first page to check for major shifts",
      "Download your new PDF with the same filename but a .pdf extension"
    ],
    faq: { q: "What about tracked changes and comments — do they show up in the PDF?", a: "Tracked changes get applied as if you accepted them all before conversion. Comments disappear entirely — they're not rendered in the final PDF. If you need comments visible, accept or reject changes in Word first, then convert. Headers, footers, and page numbers do carry over correctly." },
    relatedToolIds: ["pdf-to-word", "merge-pdf"]
  },
  {
    id: "pdf-to-image",
    name: "PDF to Image",
    description: "Sometimes you don't need the whole document — you just need page three as a PNG for a presentation slide. Or you want to grab a signature from the last page of a contract. This tool turns each PDF page into a separate picture file. JPG if you want smaller files, PNG if you need transparency or super crisp text. Great for pulling screenshots from scanned books, making thumbnails for an online course, or extracting a diagram to drop into an email without sending the whole 40-page report. Your files never leave your browser, so that confidential blueprint stays confidential.",
    howToUse: [
      "Upload your PDF — multi-page or single, either works",
      "Pick an image format: JPG (smaller, no transparency) or PNG (larger, sharper text)",
      "Choose a DPI setting — 150 for web use, 300 for print quality",
      "Click Convert, then download a zip folder containing all page images"
    ],
    faq: { q: "Can I convert just one specific page from a 100-page PDF instead of the whole thing?", a: "Yes — after uploading, you'll see a slider or page selector. Pick the exact page number you want, and the tool will only convert that one. No need to process the entire massive file. This saves tons of time and browser memory." },
    relatedToolIds: ["image-to-pdf", "pdf-compress"]
  },
  {
    id: "image-to-pdf",
    name: "Image to PDF",
    description: "Got a folder full of phone photos of receipts? Whiteboard snapshots from a meeting? Scanned handwritten notes? Turning them into one PDF makes them shareable, searchable in terms of filename, and way easier to organize. This tool takes JPGs, PNGs, or even WebP images and bundles them into a single PDF, one image per page. You can reorder them, rotate individual images if they're sideways, and even adjust the page size to match your content. Real estate agents use this for property photo packages. Contractors compile inspection shots. And because Texly Online does everything in your browser, those before-and-after renovation photos never get uploaded anywhere.",
    howToUse: [
      "Drag in all your images at once — order matters, so drop them in sequence",
      "Drag thumbnails to rearrange if you loaded them out of order",
      "Choose page size: fit to image, standard letter, or A4",
      "Click Make PDF and download your combined document seconds later"
    ],
    faq: { q: "What happens if my images are different sizes — will they get stretched or cropped?", a: "By default, each image keeps its aspect ratio and gets centered on its own page. You can choose 'stretch to fit' if you want every page identical, but that might distort photos. 'Fit to image' makes each page exactly as big as its image — great for screenshots, odd for printing." },
    relatedToolIds: ["pdf-to-image", "merge-pdf"]
  },
  {
    id: "rotate-pdf",
    name: "Rotate PDF",
    description: "You scan a document upside down. It happens. Or someone emails you a PDF where pages 3, 7, and 12 are sideways. You don't need fancy editing software — you just need to spin those pages. This tool lets you rotate individual pages or entire documents in 90-degree increments. Perfect for fixing crooked phone scans, turning landscape diagrams right-side up, or adjusting those weird forms that print sideways for no reason. No re-saving, no re-exporting. Just point, rotate, download. And since it's all local, you can fix sensitive medical forms or legal affidavits without trusting some random website with the content.",
    howToUse: [
      "Upload your PDF — the tool shows a thumbnail grid of all pages",
      "Click any page to rotate it left or right by 90 degrees",
      "Use the 'rotate all' button if every page is uniformly wrong",
      "Download the corrected PDF with the same original quality intact"
    ],
    faq: { q: "Does rotating pages also rotate any annotations or form fields I've added?", a: "Yes — text boxes, sticky notes, and signature fields rotate along with the page content. However, digitally signed documents might break if you rotate pages, since signatures verify the exact appearance. For unsigned docs, you're fine." },
    relatedToolIds: ["pdf-editor", "merge-pdf"]
  },
  {
    id: "pdf-password-remover",
    name: "Remove PDF Password",
    description: "You have a PDF that you password-protected last year, and now you've forgotten the password. Or a coworker locked a file and then left the company. This tool removes the password — but only if you actually know it. No hacking, no cracking. You type in the password, the tool decrypts the file, and you download an unlocked copy. Great for removing annoying 'view only' restrictions on your own documents. Terrible for trying to break into someone else's files. Honest tool for honest situations. And because the whole thing happens locally, you're not pasting your password into some sketchy website that logs everything.",
    howToUse: [
      "Upload the password-protected PDF",
      "Enter the known password in the text field",
      "Click Unlock — processing takes about a second",
      "Download the password-free PDF with the same content and formatting"
    ],
    faq: { q: "Will this tool remove printing or editing restrictions even if the PDF doesn't have an open password?", a: "Yes — if the PDF has permission passwords (sometimes called owner passwords) that block printing or copying, this tool strips those too as long as you know the password. If you don't know any password, there's no bypass. That's intentional and by design." },
    relatedToolIds: ["pdf-editor", "rotate-pdf"]
  },
  {
    id: "pdf-editor",
    name: "PDF Editor",
    description: "Not the full Adobe experience, but you don't need that to fix a typo or add a highlighted note. This editor lets you add text anywhere on the page, draw freehand annotations, highlight passages, and white-out mistakes. Think of it as a digital red pen. Students use it to mark up research papers. Managers add feedback to team reports. You can even insert a sticky note that says 'check these numbers' without printing a single sheet. The magic? Everything stays vector — no rasterization, no quality loss. And obviously, no uploads. That internal memo about layoffs? Stays on your machine. That private letter to your landlord? Same deal. Texly Online built this for quick fixes, not full design work, and that's exactly the point.",
    howToUse: [
      "Open your PDF in the editor — you'll see the first page with a toolbar on top",
      "Click the Text button, then click anywhere on the page to start typing",
      "Use the Highlighter to mark sentences, or the Whiteout brush to cover typos",
      "Hit Save when done, then download the annotated PDF"
    ],
    faq: { q: "Can I delete or move existing text in the PDF, like removing a wrong date or name?", a: "Not directly — the editor adds content but doesn't remove original text objects. However, you can use the Whiteout tool to draw a white rectangle over the wrong text, then type the correct text on top. It's a visual hack but works perfectly for most simple fixes." },
    relatedToolIds: ["rotate-pdf", "pdf-password-remover"]
  }
];