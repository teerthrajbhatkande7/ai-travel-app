
// Native fetch in Node 18+

async function searchWiki(query) {
    if (!query) return;
    console.log(`\n================================`);
    console.log(`SEARCHING: "${query}"`);
    console.log(`================================`);

    // 1. Search Query
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;
    try {
        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();

        if (!searchData.query?.search?.length) {
            console.log("❌ No results found.");
            return;
        }

        const firstResult = searchData.query.search[0];
        console.log(`✅ MATCH: [${firstResult.pageid}] "${firstResult.title}"`);
        console.log(`   Snippet: ${firstResult.snippet.replace(/<[^>]*>/g, '').substring(0, 100)}...`);

        // 2. Fetch Image
        const imageUrl = `https://en.wikipedia.org/w/api.php?action=query&pageids=${firstResult.pageid}&prop=pageimages&format=json&pithumbsize=1000&origin=*`;
        const imageRes = await fetch(imageUrl);
        const imageData = await imageRes.json();

        const pageData = imageData.query.pages[firstResult.pageid];
        const source = pageData.thumbnail?.source;

        if (source) {
            console.log(`🖼️  IMAGE: ${source}`);
        } else {
            console.log("⚠️  Page found, but NO existing image.");
        }
    } catch (e) {
        console.error("Error:", e.message);
    }
}

async function main() {
    await searchWiki("Hutatma Chowk and Market Area"); // Original Bad Query
    await searchWiki("Hutatma Chowk");                 // Cleaned Query

    await searchWiki("Shri Ramakrishna Ashrama");      // Reported Bad
    await searchWiki("Ramakrishna Mission");           // Alternative

    await searchWiki("Bharma Gudi (Panchalingeshwara Temple)"); // Complex
    await searchWiki("Panchalingeshwara Temple");               // Cleaned
}

main();
