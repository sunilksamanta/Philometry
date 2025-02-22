import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Example {
  title: string;
  description: string;
  path: string;
  category: string;
  group:
    | "Recursion"
    | "Fractals"
    | "Sacred Geometry"
    | "Golden Ratio"
    | "Nature Patterns"
    | "Topology & Dimensions";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

// Group type for organizing examples
interface GroupedExamples {
  [key: string]: Example[];
}

const examples: Example[] = [
  // Recursion Group
  {
    title: "Barnsley Fern",
    description:
      "Explore how simple recursive rules create complex natural patterns through the famous Barnsley Fern visualization.",
    path: "/recursion/barnsley-fern",
    category: "Natural Patterns",
    group: "Recursion",
    difficulty: "Intermediate",
  },
  {
    title: "Binary Tree",
    description:
      "Visualize branching patterns and understand recursive growth through an interactive tree generator.",
    path: "/recursion/binary-tree",
    category: "Computer Science",
    group: "Recursion",
    difficulty: "Beginner",
  },
  {
    title: "Koch Snowflake",
    description:
      "Generate infinite perimeter in finite area through recursive pattern formation.",
    path: "/recursion/koch-snowflake",
    category: "Mathematical Patterns",
    group: "Recursion",
    difficulty: "Intermediate",
  },
  // {
  //   title: "Dragon Curve",
  //   description: "Watch how simple folding rules create complex space-filling curves.",
  //   path: "/recursion/dragon-curve",
  //   category: "Paper Folding",
  //   group: "Recursion",
  //   difficulty: "Advanced",
  // },

  // Topology & Dimensions Group
{
  title: "Möbius Strip",
  description: "Explore non-orientable surfaces and the concept of infinity through this one-sided mathematical wonder.",
  path: "/topology/mobius-strip",
  category: "Non-orientable Surfaces",
  group: "Topology & Dimensions",
  difficulty: "Intermediate",
},
{
  title: "Klein Bottle",
  description: "Visualize a 4D object that has no inside or outside, challenging our perception of boundaries.",
  path: "/topology/klein-bottle",
  category: "4D Mathematics",
  group: "Topology & Dimensions",
  difficulty: "Advanced",
},
// {
//   title: "Torus Transformations",
//   description: "Understand how shapes can be continuously deformed while preserving their topological properties.",
//   path: "/topology/torus",
//   category: "Topological Transformations",
//   group: "Topology & Dimensions",
//   difficulty: "Intermediate",
// },
// {
//   title: "Hypercube",
//   description: "Explore the fourth dimension through projections of a 4D cube.",
//   path: "/topology/hypercube",
//   category: "4D Mathematics",
//   group: "Topology & Dimensions",
//   difficulty: "Advanced",
// }

  // Fractals Group
  // {
  //   title: "Sierpinski Triangle",
  //   description: "Discover self-similarity and infinite patterns through recursive triangle subdivision.",
  //   path: "/fractals/sierpinski",
  //   category: "Geometric Fractals",
  //   group: "Fractals",
  //   difficulty: "Beginner",
  // },
  // {
  //   title: "Mandelbrot Set",
  //   description: "Explore the boundary between chaos and order in the most famous mathematical fractal.",
  //   path: "/fractals/mandelbrot",
  //   category: "Complex Numbers",
  //   group: "Fractals",
  //   difficulty: "Advanced",
  // },
  // {
  //   title: "Julia Sets",
  //   description: "Investigate how slight parameter changes create vastly different fractal landscapes.",
  //   path: "/fractals/julia",
  //   category: "Complex Numbers",
  //   group: "Fractals",
  //   difficulty: "Advanced",
  // },
  // {
  //   title: "Menger Sponge",
  //   description: "Visualize infinite surface area with zero volume in this 3D fractal structure.",
  //   path: "/fractals/menger-sponge",
  //   category: "3D Fractals",
  //   group: "Fractals",
  //   difficulty: "Advanced",
  // },

  // // Sacred Geometry Group
  // {
  //   title: "Flower of Life",
  //   description: "Explore the fundamental pattern containing all five Platonic solids and sacred proportions.",
  //   path: "/sacred-geometry/flower-of-life",
  //   category: "Ancient Patterns",
  //   group: "Sacred Geometry",
  //   difficulty: "Intermediate",
  // },
  // {
  //   title: "Metatron's Cube",
  //   description: "Discover how 13 circles create the geometric foundation of reality according to ancient wisdom.",
  //   path: "/sacred-geometry/metatron-cube",
  //   category: "Platonic Solids",
  //   group: "Sacred Geometry",
  //   difficulty: "Intermediate",
  // },
  // {
  //   title: "Sri Yantra",
  //   description: "Understand the geometric representation of divine consciousness in sacred Hindu geometry.",
  //   path: "/sacred-geometry/sri-yantra",
  //   category: "Eastern Patterns",
  //   group: "Sacred Geometry",
  //   difficulty: "Advanced",
  // },

  // // Golden Ratio Group
  // {
  //   title: "Fibonacci Spiral",
  //   description: "Visualize how the golden ratio emerges from the Fibonacci sequence through spiral growth.",
  //   path: "/golden-ratio/fibonacci-spiral",
  //   category: "Natural Growth",
  //   group: "Golden Ratio",
  //   difficulty: "Beginner",
  // },
  // {
  //   title: "Golden Rectangle",
  //   description: "Interactive exploration of the most aesthetically pleasing rectangle and its properties.",
  //   path: "/golden-ratio/golden-rectangle",
  //   category: "Architecture",
  //   group: "Golden Ratio",
  //   difficulty: "Beginner",
  // },
  // {
  //   title: "Phyllotaxis",
  //   description: "See how plants use the golden angle to optimize sunlight exposure and seed arrangement.",
  //   path: "/golden-ratio/phyllotaxis",
  //   category: "Botanical Patterns",
  //   group: "Golden Ratio",
  //   difficulty: "Intermediate",
  // },

  // // Nature Patterns Group
  // {
  //   title: "Wave Interference",
  //   description: "Visualize how overlapping waves create complex interference patterns in nature.",
  //   path: "/nature-patterns/wave-interference",
  //   category: "Physics",
  //   group: "Nature Patterns",
  //   difficulty: "Intermediate",
  // },
  // {
  //   title: "Reaction Diffusion",
  //   description: "Simulate how chemical reactions create biological patterns like animal spots and stripes.",
  //   path: "/nature-patterns/reaction-diffusion",
  //   category: "Chemistry",
  //   group: "Nature Patterns",
  //   difficulty: "Advanced",
  // },
  // {
  //   title: "Voronoi Diagram",
  //   description: "Explore nature's way of dividing space, from cell structures to giraffe patterns.",
  //   path: "/nature-patterns/voronoi",
  //   category: "Biological Patterns",
  //   group: "Nature Patterns",
  //   difficulty: "Intermediate",
  // },
  // {
  //   title: "L-Systems",
  //   description: "Generate realistic plant growth patterns using simple recursive rules.",
  //   path: "/nature-patterns/l-systems",
  //   category: "Plant Growth",
  //   group: "Nature Patterns",
  //   difficulty: "Advanced",
  // }
];

// Group examples by their group property
const groupedExamples: GroupedExamples = examples.reduce((acc, example) => {
  if (!acc[example.group]) {
    acc[example.group] = [];
  }
  acc[example.group].push(example);
  return acc;
}, {} as GroupedExamples);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-white via-blue-50 to-white">
        {/* Animated background pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 pattern-dots pattern-blue-500 pattern-bg-white pattern-size-4 pattern-opacity-10" />
          <svg className="absolute w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.1"
            />
            <circle
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.1"
            />
            <path
              d="M50,20 L50,80 M20,50 L80,50"
              stroke="currentColor"
              strokeWidth="0.1"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-light text-gray-900 mb-8 leading-tight">
              Patterns of
              <span className="block font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Natural Intelligence
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Journey through the hidden geometries that shape our universe.
              Discover how mathematics, nature, and consciousness interweave to
              create the fabric of reality.
            </p>
            <div className="flex gap-6">
              <Link
                href="#examples"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
              >
                Begin Exploration
              </Link>
              <Link
                href="#about"
                className="bg-white text-gray-800 px-8 py-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                Our Philosophy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - More engaging and visual */}
      <section id="about" className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Understanding Through
                <span className="block text-blue-600">Visual Harmony</span>
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-600">
                  From the spiral of galaxies to the geometric precision of a
                  snowflake, nature speaks to us through patterns. These
                  patterns aren&apos;t just beautiful—they&apos;re the language of the
                  universe itself.
                </p>
                <p className="text-lg text-gray-600">
                  Our interactive visualizations reveal these hidden
                  connections, allowing you to explore the mathematical
                  principles that govern natural phenomena while contemplating
                  their deeper philosophical significance.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-48 bg-blue-100 rounded-lg p-6 flex items-center justify-center">
                  <span className="text-blue-600 text-lg font-medium">
                    Mathematics
                  </span>
                </div>
                <div className="h-48 bg-purple-100 rounded-lg p-6 flex items-center justify-center">
                  <span className="text-purple-600 text-lg font-medium">
                    Philosophy
                  </span>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-48 bg-green-100 rounded-lg p-6 flex items-center justify-center">
                  <span className="text-green-600 text-lg font-medium">
                    Nature
                  </span>
                </div>
                <div className="h-48 bg-yellow-100 rounded-lg p-6 flex items-center justify-center">
                  <span className="text-yellow-600 text-lg font-medium">
                    Consciousness
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Interactive Examples
          </h2>

          <div className="space-y-16">
            {" "}
            {/* Added wrapper with vertical spacing */}
            {Object.entries(groupedExamples).map(([group, groupExamples]) => (
              <div key={group}>
                <h3 className="text-2xl font-semibold text-gray-800 mb-8 flex items-center gap-2">
                  {group}
                  <span className="text-sm font-normal text-gray-500">
                    ({groupExamples.length} examples)
                  </span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                  {" "}
                  {/* Added auto-rows-fr */}
                  {groupExamples.map((example, index) => (
                    <Link
                      key={index}
                      href={example.path}
                      className="block w-full h-full" // Added full width and height
                    >
                      <Card className="flex flex-col h-full">
                        {" "}
                        {/* Added flex and full height */}
                        <CardHeader>
                          <div className="space-y-2">
                            {" "}
                            {/* Added consistent spacing */}
                            <CardTitle className="text-xl font-semibold">
                              {example.title}
                            </CardTitle>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                {example.category}
                              </span>
                              <span
                                className={`px-3 py-1 rounded-full text-xs ${
                                  example.difficulty === "Beginner"
                                    ? "bg-green-100 text-green-800"
                                    : example.difficulty === "Intermediate"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {example.difficulty}
                              </span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          {" "}
                          {/* Added flex-grow */}
                          <p className="text-gray-600">{example.description}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
