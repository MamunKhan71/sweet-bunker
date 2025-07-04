import { type NextRequest, NextResponse } from "next/server"

// Enhanced dummy data with more variety
const dummyResults = [
    {
        fileName: "1298.pdf",
        title: "Advanced Machine Learning Techniques for Modern Applications",
        description:
            "A comprehensive guide to cutting-edge machine learning algorithms including deep neural networks, reinforcement learning, and their practical applications in industry scenarios.",
        pageNo: 5,
    },
    {
        fileName: "2456.pdf",
        title: "Data Science Fundamentals: From Theory to Practice",
        description:
            "Essential concepts and methodologies for data science practitioners, covering statistical analysis, data visualization, and predictive modeling techniques.",
        pageNo: 12,
    },
    {
        fileName: "3789.pdf",
        title: "Neural Networks and Deep Learning Architecture",
        description:
            "In-depth exploration of neural network architectures, including CNNs, RNNs, and Transformers, with practical implementation guides and optimization strategies.",
        pageNo: 23,
    },
    {
        fileName: "4567.pdf",
        title: "Natural Language Processing in the Age of Transformers",
        description:
            "Modern approaches to NLP including BERT, GPT models, sentiment analysis, and language generation techniques with real-world case studies.",
        pageNo: 8,
    },
    {
        fileName: "5432.pdf",
        title: "Computer Vision Applications and Implementation",
        description:
            "Practical applications of computer vision in industry, from image recognition and object detection to autonomous systems and medical imaging.",
        pageNo: 15,
    },
    {
        fileName: "6789.pdf",
        title: "Reinforcement Learning: Strategies and Applications",
        description:
            "Advanced reinforcement learning algorithms and their implementation in game theory, robotics, and autonomous decision-making systems.",
        pageNo: 31,
    },
    {
        fileName: "7890.pdf",
        title: "Big Data Analytics and Distributed Computing",
        description:
            "Scalable solutions for processing and analyzing large datasets using distributed computing frameworks like Spark, Hadoop, and cloud-based solutions.",
        pageNo: 7,
    },
    {
        fileName: "8901.pdf",
        title: "Artificial Intelligence Ethics and Responsible Development",
        description:
            "Ethical considerations, bias mitigation, and responsible AI development practices for creating fair and transparent AI systems.",
        pageNo: 19,
    },
    {
        fileName: "9012.pdf",
        title: "Quantum Computing and Machine Learning Integration",
        description:
            "Exploring the intersection of quantum computing and machine learning, including quantum algorithms and their potential applications.",
        pageNo: 42,
    },
    {
        fileName: "1023.pdf",
        title: "Blockchain Technology and Decentralized Systems",
        description:
            "Comprehensive overview of blockchain technology, smart contracts, and decentralized applications with security considerations.",
        pageNo: 28,
    },
    {
        fileName: "1134.pdf",
        title: "Cloud Computing Architecture and Best Practices",
        description:
            "Modern cloud computing strategies, microservices architecture, and DevOps practices for scalable application development.",
        pageNo: 16,
    },
    {
        fileName: "1245.pdf",
        title: "Cybersecurity in the Digital Age",
        description:
            "Advanced cybersecurity strategies, threat detection, and protection mechanisms for modern digital infrastructure.",
        pageNo: 33,
    },
]

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
