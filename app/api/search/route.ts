import { type NextRequest, NextResponse } from "next/server"

// Enhanced dummy data with more variety
const dummyResults = [
    {
        fileName: "240110.pdf",
        title: "Minimalist Interiors: Concept Sketches & Layouts",
        description:
            "A comprehensive sketch collection highlighting minimalist interior concepts including living spaces and work areas.",
        pageNo: 3,
    },
    {
        fileName: "240111.pdf",
        title: "Interior Space Planning for Modern Living",
        description:
            "Essential spatial design sketches and layout strategies for functional and stylish interiors.",
        pageNo: 2,
    },
    {
        fileName: "240112.pdf",
        title: "Furniture Arrangement Concepts for Homes & Offices",
        description:
            "Detailed sketches showing innovative furniture placement and spatial flow in diverse interior settings.",
        pageNo: 2,
    },
    {
        fileName: "240115.pdf",
        title: "Contemporary Interior Sketch Portfolio",
        description:
            "Sketch-driven portfolio exploring contemporary residential and commercial interior concepts.",
        pageNo: 2,
    },
    {
        fileName: "240116.pdf",
        title: "Color & Texture in Interior Design Sketches",
        description:
            "Visual explorations of color palettes, textures, and materials through hand-drawn and digital sketches.",
        pageNo: 2,
    },
    {
        fileName: "240117.pdf",
        title: "Lighting Design Sketches for Interior Ambience",
        description:
            "Creative lighting concepts illustrated through mood boards and hand-drawn light placement sketches.",
        pageNo: 2,
    },
    {
        fileName: "240125.pdf",
        title: "Interior Sketches for Boutique & Commercial Spaces",
        description:
            "Design sketches for boutique shops, studios, and office interiors with branding integration.",
        pageNo: 9,
    },
    {
        fileName: "240126.pdf",
        title: "Eco-Friendly Interiors: Sketches & Sustainability Concepts",
        description:
            "Interior design concepts integrating sustainable materials and practices, presented through visuals and sketches.",
        pageNo: 1,
    },
    {
        fileName: "240215.pdf",
        title: "Luxury Interior Design Sketchbook",
        description:
            "A sketch collection focusing on luxury interiors with premium finishes and bespoke furniture design.",
        pageNo: 3,
    },
    {
        fileName: "240223.pdf",
        title: "Sketches of Interior Renovation Concepts",
        description:
            "Visual plans for redesigning and renovating indoor spaces, including before-and-after sketch comparisons.",
        pageNo: 2,
    },
    {
        fileName: "240304.pdf",
        title: "Interior Design Mood Boards & Sketch Studies",
        description:
            "Mixed-media sketches and boards for initial concept visualization and client presentation.",
        pageNo: 2,
    },
    {
        fileName: "240731.pdf",
        title: "Workspace Interiors: Creative Sketch Series",
        description:
            "Sketches of creative and ergonomic office spaces designed to boost productivity and inspiration.",
        pageNo: 8,
    },
];

export async function POST(request: NextRequest) {
    try {
        const { prompt, quantity } = await request.json()

        // Simulate realistic API delay
        await new Promise((resolve) => setTimeout(resolve, 1200 + Math.random() * 800))

        // Enhanced search logic with better matching
        const searchTerms = prompt.toLowerCase().split(" ")
        const filteredResults = dummyResults
            .map((result) => {
                let relevanceScore = 0
                const titleLower = result.title.toLowerCase()
                const descLower = result.description.toLowerCase()

                // Calculate relevance score
                searchTerms.forEach((term: string) => {
                    if (titleLower.includes(term)) relevanceScore += 3
                    if (descLower.includes(term)) relevanceScore += 1
                })

                return { ...result, relevanceScore }
            })
            .filter((result) => result.relevanceScore > 0)
            .sort((a, b) => b.relevanceScore - a.relevanceScore)
            .slice(0, quantity)

        // If no matches found, return random high-quality results
        const results =
            filteredResults.length > 0
                ? filteredResults.map(({ relevanceScore, ...result }) => result)
                : dummyResults.sort(() => Math.random() - 0.5).slice(0, quantity)

        return NextResponse.json({
            results,
            query: prompt,
            total: results.length,
            searchTime: `${(Math.random() * 0.5 + 0.8).toFixed(2)}s`,
        })
    } catch (error) {
        console.error("Search API error:", error)
        return NextResponse.json({ error: "Failed to process search request" }, { status: 500 })
    }
}
