document.addEventListener('DOMContentLoaded', function() {
    const sites = [
        { name: "מוזיאון בית מינץ", description: "המוזיאון המקומי של המושבה גדרה.", img: "beitminz.jpg", link: "beit-minz.html" ,categories: ["groups", "accessible"]},
        { name: "היקב של גדרה", description: "יקב כהנוב הינו יקב משפחתי הממוקם בליבם של כרמי המשפחה.", img: "yekev.jpg", link: "yekev-info.html",categories: ["accessible"] },
        { name: "בית לוינסון", description: "בית לוינסון הוא מבנה לשימור בגדרה.", img: "levinson.jpg", link: "levinson-info.html" , categories: ["groups", "kids"] },
        { name: "צריף הבילויים", description: "צריף הבילויים הוא אחד מששת צריפי המגורים הראשונים במושבה גדרה.", img: "biluim-cabin.jpg", link: "biluim-cabin-info.html" ,categories: ["groups"] },
        { name: "בור הבילויים", description: "בור הבילויים הוא אתר היסטורי שממוקם במושבה גדרה, שבעבר שימש כמגורי הבילויים וכאורוות לבהמות העבודה שלהם.", img: "biluim-well.jpg", link: "biluim-well-info.html",categories: ["groups"]  },
        { name: "תל קטרה", description: "תל קטרה הוא תל עתיק הנמצא במרכז המושבה גדרה.", img: "tel-qatra.jpg", link: "tel-qatra-info.html" , categories: ["groups", "kids"] },
        { name: "שכונת העיוורים (כפר העיוורים)", description: "כפר אוריאל היה מיזם ליישוב ושילוב בתעסוקה של עולים עיוורים ובני משפחותיהם בגדרה.", img: "blind-quarter.jpg", link: "blind-quarter-info.html" ,categories: ["kids", "accessible"]},
        { name: "בריכת המים", description: "בריכת המים הראשונה של גדרה.", img: "first-water-pool.jpg", link: "first-water-pool-info.html" ,categories: ["children", "accessible"]},
        { name: "בית הכנסת הראשון", description: "בית הכנסת הראשון של גדרה.", img: "first-synagogue.jpg", link: "first-synagogue-info.html",categories: ["groups", "kids", "accessible"] },
        { name: "גן הפסלים", description: "גן הפסלים בגדרה הוא גן פסלים ציבורי הממוקם בגדרה המציג פסלים שפוסלו על ידי הפסל יומה שגב.", img: "sculpture-garden.jpg", link: "sculpture-garden-info.html",categories: ["groups", "kids", "accessible"] }
    ];

    const container = document.getElementById('itemsContainer');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let lastFilter = '';

    function highlightText(text, term) {
        const re = new RegExp(term, 'gi');
        return text.replace(re, '<span class="highlight">$&</span>');
    }

    function displaySites(sitesToDisplay, searchTerm = '') {
        container.innerHTML = '';
        sitesToDisplay.forEach(site => {
            const card = document.createElement('div');
            card.className = 'card';

            const image = document.createElement('img');
            image.src = `images/${site.img}`;
            image.className = 'card-image-top';

            const name = document.createElement('p');
            name.innerHTML = searchTerm ? highlightText(site.name, searchTerm) : site.name;
            name.className = 'card-title';

            const description = document.createElement('p');
            description.innerHTML = searchTerm ? highlightText(site.description, searchTerm) : site.description;
            description.className = 'card-text';

            const moreInfoButton = document.createElement('a');
            moreInfoButton.href = site.link;
            moreInfoButton.textContent = "למידע נוסף";
            moreInfoButton.className = 'info-button';
            moreInfoButton.target = "_self";

            card.appendChild(image);
            card.appendChild(name);
            card.appendChild(description);
            card.appendChild(moreInfoButton);
            container.appendChild(card);
        });
    }

    // Initial display of sites
    displaySites(sites);
    document.getElementById('nav-button').addEventListener('click', function() {
        var nav = document.querySelector('.navbar ul');
        if (nav.style.display === 'block') {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'block';
        }
    });

    // Search feature
    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredSites = sites.filter(site => site.name.toLowerCase().includes(searchTerm) || site.description.toLowerCase().includes(searchTerm));
        displaySites(filteredSites, searchTerm);
    });

    // Category filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            lastFilter = this.dataset.filter;
            const filteredSites = sites.filter(site => site.categories.includes(lastFilter));
            const searchTerm = searchInput.value.toLowerCase();
            const finalSites = searchTerm ? filteredSites.filter(site => site.name.toLowerCase().includes(searchTerm) || site.description.toLowerCase().includes(searchTerm)) : filteredSites;
            displaySites(finalSites, searchTerm);
        });
    });
});