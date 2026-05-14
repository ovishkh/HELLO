document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const dynamicContent = document.getElementById('dynamic-content');
    const tocList = document.getElementById('toc-list');
    const lastEditedSpan = document.getElementById('last-edited');

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        body.classList.toggle('light-theme');
        const isDark = body.classList.contains('dark-theme');
        themeToggle.innerHTML = isDark 
            ? `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
            : `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42m12.72-12.72l1.42-1.42"></path></svg>`;
    });

    // Fetch and Load Data
    async function loadWikiData() {
        try {
            // In a real scenario, this would be updated by a GitHub Action/Scraper
            const response = await fetch('data.json');
            if (!response.ok) throw new Error('Data not found');
            const data = await response.json();
            
            renderContent(data);
            generateTOC();
            updateLastEdited();
        } catch (error) {
            console.error('Error loading wiki data:', error);
            dynamicContent.innerHTML = '<p class="error">Failed to sync latest data. Showing cached version.</p>';
            // Fallback to static content if data.json fails
            generateTOC(); 
        }
    }

    function renderContent(data) {
        let html = '';
        data.sections.forEach(section => {
            html += `
                <section id="${section.id}">
                    <h2 class="section-title">${section.title}</h2>
                    <div class="section-body">${section.content}</div>
                </section>
            `;
        });
        dynamicContent.innerHTML = html;

        // Render References
        const refList = document.getElementById('references-list');
        refList.innerHTML = data.references.map((ref, index) => `
            <li id="cite_note-${index + 1}">
                <span class="mw-cite-backlink">^</span> 
                <span class="reference-text"><a href="${ref.url}" target="_blank">${ref.title}</a></span>
            </li>
        `).join('');
    }

    function generateTOC() {
        const sections = document.querySelectorAll('section');
        tocList.innerHTML = '';
        sections.forEach((section, index) => {
            const title = section.querySelector('h2')?.innerText || section.id;
            const li = document.createElement('li');
            li.innerHTML = `<a href="#${section.id}">${index + 1} ${title}</a>`;
            tocList.appendChild(li);
        });
    }

    function updateLastEdited() {
        const now = new Date();
        lastEditedSpan.innerText = now.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
    }

    loadWikiData();
});
