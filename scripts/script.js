// Initialize PDF.js library
const pdfjsLib = window['pdfjs-dist/build/pdf'];

// Variables
let currentPage = 1;
let pdfDoc = null;
let selectedText;

// Function to handle file input change
document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        loadPDF(file);
    }
});

// Function to load PDF document from file
function loadPDF(file) {
    pdfjsLib.getDocument(URL.createObjectURL(file)).promise.then(pdfDocument => {
        pdfDoc = pdfDocument;
        currentPage = 1; // Reset current page
        renderPage(currentPage);
        // Enable navigation buttons
        document.getElementById('prev-page').removeAttribute('disabled');
        document.getElementById('next-page').removeAttribute('disabled');
    }).catch(error => {
        console.error('Error loading PDF:', error);
    });
}

// Function to render page content
function renderPage(pageNum) {
    // Variables
    const pdfContentDiv = document.getElementById('pdf-content');
    pdfContentDiv.innerHTML = ''; // Clear previous content

    // Get the specified page
    pdfDoc.getPage(pageNum).then(page => {
        // Get text content of the page
        page.getTextContent().then(textContent => {
            // Iterate through text items
            textContent.items.forEach(item => {
                // Extract text from the text item
                const text = item.str;
                // Split text into lines
                const lines = text.split('\n');
                // Append each line to the div
                lines.forEach(line => {
                    const p = document.createElement('p');
                    p.textContent = line;
                    p.classList.add('text-item');
                    pdfContentDiv.appendChild(p);
                });
            });
        });
    });

    // Update page display
    const pageDisplay = document.getElementById('page-display');
    pageDisplay.textContent = `Page ${pageNum} of ${pdfDoc.numPages}`;
}

// Previous page button
const prevButton = document.getElementById('prev-page');
prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
    }
});

// Next page button
const nextButton = document.getElementById('next-page');
nextButton.addEventListener('click', () => {
    if (currentPage < pdfDoc.numPages) {
        currentPage++;
        renderPage(currentPage);
    }
});

// Function to handle text selection
document.getElementById('pdf-content').addEventListener('mouseup', function(event) {
    const selection = window.getSelection();
    selectedText = selection.toString().trim();
    if (selectedText == '') {
        selectedText = null;
    }
});

let addBtn = document.querySelector("#add-btn");

addBtn.onclick = function() {
    console.log(selectedText);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "scripts/script.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.send("text=" + selectedText);
};

// New page
function openNewTab() {
    var url = 'favorites.html';
    window.open(url, '_blank');
}