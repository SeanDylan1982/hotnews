import { Article, Category, Author } from '../types';

// Authors data
export const authors: Author[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'AI Research Scientist with 15+ years in machine learning and neural networks',
    verified: true
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Technology journalist covering emerging tech trends and innovations',
    verified: true
  },
  {
    id: '3',
    name: 'Dr. Emily Watson',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Quantum computing researcher and technology evangelist',
    verified: true
  },
  {
    id: '4',
    name: 'Alex Kim',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Blockchain developer and Web3 advocate',
    verified: true
  },
  {
    id: '5',
    name: 'Dr. James Wright',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Space technology engineer and former NASA researcher',
    verified: true
  }
];

// Categories data
export const categories: Category[] = [
  { id: '1', name: 'Artificial Intelligence', slug: 'ai', color: 'bg-blue-500', icon: 'Brain' },
  { id: '2', name: 'Quantum Computing', slug: 'quantum', color: 'bg-purple-500', icon: 'Cpu' },
  { id: '3', name: 'Blockchain & Web3', slug: 'blockchain', color: 'bg-green-500', icon: 'Link' },
  { id: '4', name: 'Biotechnology', slug: 'biotech', color: 'bg-red-500', icon: 'Dna' },
  { id: '5', name: 'Space Technology', slug: 'space', color: 'bg-indigo-500', icon: 'Rocket' },
  { id: '6', name: 'Cybersecurity', slug: 'security', color: 'bg-orange-500', icon: 'Shield' },
];

// Articles data
export const articles: Article[] = [
  {
    id: '1',
    title: 'The Revolutionary Impact of Quantum-AI Hybrid Systems on Modern Computing',
    slug: 'quantum-ai-hybrid-systems-computing-revolution',
    excerpt: 'Exploring how the convergence of quantum computing and artificial intelligence is reshaping computational paradigms and opening new frontiers in problem-solving capabilities.',
    content: `The intersection of quantum computing and artificial intelligence represents one of the most exciting frontiers in modern technology. As we stand on the brink of a computational revolution, the synergy between these two groundbreaking fields promises to unlock unprecedented problem-solving capabilities that could transform industries and scientific research.

## The Quantum Advantage

Quantum computing, with its ability to process information using quantum bits (qubits) that can exist in multiple states simultaneously, offers exponential computational advantages over classical computers for specific types of problems. When combined with AI's pattern recognition and learning capabilities, we see the emergence of hybrid systems that can tackle previously intractable challenges.

## Breakthrough Applications

Recent breakthroughs in quantum machine learning algorithms have demonstrated remarkable potential in:

- **Optimization Problems**: Solving complex logistics and resource allocation challenges
- **Cryptography**: Developing quantum-resistant security protocols
- **Drug Discovery**: Accelerating molecular simulation and pharmaceutical research
- **Financial Modeling**: Enhancing risk assessment and portfolio optimization

## Industry Impact

Companies like IBM, Google, and startups worldwide are racing to develop practical quantum-AI applications that could revolutionize everything from financial modeling to climate simulation. The implications extend far beyond computational speed – quantum-AI systems could enable new forms of artificial intelligence that operate on fundamentally different principles.

## The Future Landscape

As we look ahead, quantum-AI hybrid systems promise to unlock new approaches to machine learning that we're only beginning to understand. The convergence of these technologies represents not just an evolution in computing, but a revolution in how we approach complex problem-solving across all domains of human knowledge.`,
    coverImage: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    author: authors[0],
    category: categories[0],
    tags: ['Quantum Computing', 'AI', 'Machine Learning', 'Technology'],
    publishedAt: '2024-01-15T10:00:00Z',
    readTime: 12,
    likes: 1247,
    views: 8932,
    featured: true,
    trending: true
  },
  {
    id: '2',
    title: 'Breakthrough in Neural Interface Technology: Direct Brain-Computer Communication',
    slug: 'neural-interface-brain-computer-communication',
    excerpt: 'Scientists achieve unprecedented success in creating seamless brain-computer interfaces that could revolutionize how we interact with digital systems.',
    content: `The field of brain-computer interfaces (BCIs) has reached a pivotal moment with recent breakthroughs that bring us closer to seamless human-computer interaction. Advanced neural interface technologies are now capable of translating thoughts into digital commands with remarkable precision, opening possibilities that seemed like science fiction just a decade ago.

## Clinical Breakthroughs

Recent clinical trials have demonstrated extraordinary capabilities:

- **Motor Control**: Paralyzed patients controlling robotic limbs with thought alone
- **Communication**: Direct neural-to-text translation for speech-impaired individuals
- **Sensory Restoration**: Artificial vision and hearing through neural stimulation
- **Memory Enhancement**: Cognitive augmentation for neurodegenerative conditions

## The Technology Behind the Magic

The technology relies on sophisticated machine learning algorithms that can decode neural signals in real-time, adapting to individual brain patterns and improving accuracy over time. Advanced electrode arrays, wireless transmission systems, and AI-powered signal processing work together to create these remarkable interfaces.

## Beyond Medical Applications

While medical applications are driving current development, the implications for human enhancement and productivity are staggering. Imagine controlling smart home devices, composing emails, or navigating virtual environments using only your thoughts.

## Ethical Considerations

As we advance toward this future, important questions arise about privacy, security, and the nature of human consciousness itself. The convergence of neuroscience, AI, and advanced materials science is making this future increasingly tangible, but we must proceed thoughtfully.`,
    coverImage: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    author: authors[1],
    category: categories[3],
    tags: ['Neurotechnology', 'BCI', 'Innovation', 'Medical Technology'],
    publishedAt: '2024-01-14T14:30:00Z',
    readTime: 8,
    likes: 892,
    views: 5421,
    featured: true,
    trending: false
  },
  {
    id: '3',
    title: 'The Next Generation of Blockchain: Sustainable and Scalable Web3 Solutions',
    slug: 'next-generation-blockchain-sustainable-web3',
    excerpt: 'Analyzing emerging blockchain technologies that promise to solve scalability and environmental concerns while maintaining decentralization principles.',
    content: `The blockchain industry is undergoing a fundamental transformation as developers and researchers work to address the scalability and environmental challenges that have limited mainstream adoption. New consensus mechanisms, layer-2 solutions, and innovative architectures are emerging that promise to deliver the benefits of decentralization without the drawbacks of early blockchain implementations.

## Sustainable Consensus Mechanisms

Proof-of-Stake consensus mechanisms have already demonstrated significant improvements in energy efficiency compared to traditional Proof-of-Work systems. But innovation continues with:

- **Delegated Proof-of-Stake**: Enhanced efficiency through representative validation
- **Proof-of-History**: Time-based consensus reducing computational requirements
- **Hybrid Consensus**: Combining multiple mechanisms for optimal performance
- **Carbon-Negative Networks**: Blockchain systems that actively remove CO2

## Scalability Solutions

New approaches are enabling blockchain networks to process thousands of transactions per second:

- **Sharding**: Parallel processing across network segments
- **State Channels**: Off-chain transaction processing
- **Rollup Technologies**: Bundling transactions for efficient processing
- **Interoperability Protocols**: Seamless cross-chain communication

## Real-World Applications

These advances are enabling new applications in:

- **Decentralized Finance (DeFi)**: High-frequency trading and complex financial instruments
- **Non-Fungible Tokens (NFTs)**: Affordable creation and trading
- **Decentralized Autonomous Organizations (DAOs)**: Efficient governance systems
- **Supply Chain Management**: Real-time tracking and verification

## The Path Forward

As these technologies mature, we're seeing the emergence of truly scalable Web3 applications that could rival traditional centralized platforms in terms of performance and user experience, while maintaining the core principles of decentralization and user ownership.`,
    coverImage: 'https://images.pexels.com/photos/8499886/pexels-photo-8499886.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    author: authors[3],
    category: categories[2],
    tags: ['Blockchain', 'Web3', 'Cryptocurrency', 'Sustainability'],
    publishedAt: '2024-01-13T09:15:00Z',
    readTime: 10,
    likes: 634,
    views: 3876,
    featured: false,
    trending: true
  },
  {
    id: '4',
    title: 'Space Manufacturing: How Zero-Gravity Production Could Transform Industries',
    slug: 'space-manufacturing-zero-gravity-production',
    excerpt: 'Investigating the potential of manufacturing in space environments and how it could lead to revolutionary advances in materials science and production.',
    content: `The concept of manufacturing in space is transitioning from science fiction to scientific reality, with profound implications for materials science, pharmaceuticals, and advanced manufacturing. The unique conditions of space – including microgravity, vacuum, and extreme temperatures – offer unprecedented opportunities to create materials and products that are impossible to produce on Earth.

## The Microgravity Advantage

Zero-gravity environments enable revolutionary manufacturing processes:

- **Perfect Spheres**: Uniform droplet formation without gravitational distortion
- **Ultra-Pure Crystals**: Growth without convection-induced defects
- **Advanced Alloys**: Mixing of materials with vastly different densities
- **Foam Metals**: Ultra-lightweight structures with unique properties

## Pharmaceutical Breakthroughs

Space-based pharmaceutical manufacturing presents particularly exciting opportunities:

- **Protein Crystallization**: Larger, more perfect crystals for drug development
- **Cell Culture**: Three-dimensional tissue growth in microgravity
- **Drug Formulation**: Novel delivery mechanisms and compositions
- **Bioprinting**: Advanced tissue engineering applications

## Current Experiments

Several pharmaceutical companies are already conducting experiments on the International Space Station:

- **Merck**: Protein crystal growth experiments
- **Eli Lilly**: Diabetes medication research
- **Bristol Myers Squibb**: Cancer drug development
- **Novartis**: Immunology research

## Economic Viability

As launch costs continue to decrease and space infrastructure develops, we're approaching a future where space-based manufacturing could become economically viable for high-value products. The establishment of orbital factories and lunar manufacturing facilities could create entirely new industries and supply chains.

## The Industrial Revolution in Space

This represents nothing less than the next industrial revolution – one that extends human manufacturing capabilities beyond the constraints of Earth's gravity and atmosphere.`,
    coverImage: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    author: authors[4],
    category: categories[4],
    tags: ['Space Technology', 'Manufacturing', 'Innovation', 'Materials Science'],
    publishedAt: '2024-01-12T16:45:00Z',
    readTime: 15,
    likes: 756,
    views: 4329,
    featured: false,
    trending: false
  },
  {
    id: '5',
    title: 'Cybersecurity in the Age of AI: New Threats and Advanced Defense Mechanisms',
    slug: 'cybersecurity-ai-threats-defense-mechanisms',
    excerpt: 'Examining how artificial intelligence is both creating new cybersecurity challenges and providing innovative solutions for digital protection.',
    content: `The integration of artificial intelligence into cybersecurity represents both the greatest opportunity and the most significant challenge facing digital security today. As AI-powered attacks become more sophisticated and automated, the cybersecurity industry is responding with equally advanced AI-driven defense mechanisms, creating an escalating technological arms race.

## AI-Powered Threats

Modern cyber attacks are becoming increasingly sophisticated:

- **Adaptive Malware**: Self-modifying code that evades detection
- **Deepfake Social Engineering**: AI-generated personas for phishing
- **Automated Vulnerability Discovery**: AI systems finding zero-day exploits
- **Coordinated Swarm Attacks**: Distributed AI-driven attack networks

## AI-Driven Defense

However, AI is also revolutionizing cybersecurity defense:

- **Behavioral Analysis**: Detecting anomalies in user and network behavior
- **Real-time Threat Detection**: Millisecond response to emerging threats
- **Predictive Security**: Anticipating attacks before they occur
- **Automated Response**: Immediate containment and remediation

## Machine Learning in Security

Advanced ML algorithms are transforming security operations:

- **Unsupervised Learning**: Discovering unknown attack patterns
- **Natural Language Processing**: Analyzing threat intelligence
- **Computer Vision**: Detecting visual security threats
- **Reinforcement Learning**: Adaptive defense strategies

## Quantum-Safe Cryptography

As quantum computing threatens traditional encryption methods, AI-driven security solutions are being developed to protect against both current and future threats:

- **Post-Quantum Algorithms**: Encryption resistant to quantum attacks
- **Hybrid Cryptographic Systems**: Combining classical and quantum-safe methods
- **Dynamic Key Management**: AI-optimized key rotation and distribution
- **Quantum Key Distribution**: Leveraging quantum mechanics for secure communication

## The Future of Digital Security

The future of cybersecurity lies in the development of adaptive, intelligent defense systems that can learn from each attack and continuously improve their protective capabilities, ensuring that our digital infrastructure remains secure in an increasingly connected world.`,
    coverImage: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    author: authors[0],
    category: categories[5],
    tags: ['Cybersecurity', 'AI', 'Digital Protection', 'Technology'],
    publishedAt: '2024-01-11T11:20:00Z',
    readTime: 9,
    likes: 445,
    views: 2987,
    featured: false,
    trending: true
  },
  {
    id: '6',
    title: 'Gene Editing 2.0: CRISPR Advances and the Future of Personalized Medicine',
    slug: 'gene-editing-crispr-personalized-medicine',
    excerpt: 'Deep dive into the latest CRISPR developments and how they\'re paving the way for truly personalized medical treatments and therapies.',
    content: `The CRISPR gene editing revolution is entering its second phase, with new techniques and applications that promise to transform personalized medicine and therapeutic development. Advanced CRISPR systems are now capable of making precise edits to DNA with unprecedented accuracy, opening possibilities for treating genetic diseases that were previously considered incurable.

## Next-Generation CRISPR Tools

Recent developments have expanded the gene editing toolkit:

- **Base Editing**: Precise single-letter DNA changes without double-strand breaks
- **Prime Editing**: Targeted insertions, deletions, and replacements
- **CRISPR 3.0**: Enhanced specificity and reduced off-target effects
- **Epigenome Editing**: Modifying gene expression without changing DNA sequence

## Personalized Medicine Applications

CRISPR technology is enabling truly personalized treatments:

- **Cancer Therapy**: Patient-specific CAR-T cell modifications
- **Genetic Blindness**: Restoring vision through in-vivo gene editing
- **Blood Disorders**: Correcting sickle cell disease and thalassemia
- **Neurological Conditions**: Potential treatments for Huntington's and ALS

## Clinical Success Stories

Recent clinical trials have demonstrated remarkable results:

- **Leber Congenital Amaurosis**: Restored vision in previously blind patients
- **Sickle Cell Disease**: Functional cures through gene editing
- **Beta-Thalassemia**: Elimination of transfusion dependence
- **Primary Immunodeficiencies**: Restored immune system function

## Delivery Innovations

Advanced delivery systems are making gene editing more accessible:

- **Lipid Nanoparticles**: Targeted delivery to specific organs
- **Adeno-Associated Virus (AAV)**: Precise tissue targeting
- **In-Vivo Editing**: Direct treatment without cell extraction
- **Tissue-Specific Promoters**: Controlled gene expression

## Ethical and Regulatory Landscape

As the technology advances, important considerations include:

- **Germline Editing**: Heritable changes and their implications
- **Access and Equity**: Ensuring broad availability of treatments
- **Informed Consent**: Understanding long-term effects
- **International Cooperation**: Harmonizing regulatory frameworks

## The Future of Medicine

Looking ahead, the integration of CRISPR with other emerging technologies like AI-driven drug discovery and advanced delivery systems could enable the development of highly personalized treatments tailored to each patient's unique genetic makeup. As the technology continues to mature and regulatory frameworks evolve, we're approaching a future where genetic diseases could become as treatable as bacterial infections are today.`,
    coverImage: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    author: authors[2],
    category: categories[3],
    tags: ['CRISPR', 'Gene Editing', 'Biotechnology', 'Medicine'],
    publishedAt: '2024-01-10T13:00:00Z',
    readTime: 11,
    likes: 923,
    views: 6543,
    featured: false,
    trending: false
  },
  {
    id: '7',
    title: 'The Rise of Autonomous AI Agents: From Chatbots to Digital Employees',
    slug: 'autonomous-ai-agents-digital-employees',
    excerpt: 'Exploring how AI agents are evolving from simple chatbots to sophisticated digital workers capable of complex reasoning and autonomous decision-making.',
    content: `The landscape of artificial intelligence is rapidly evolving from reactive chatbots to proactive AI agents capable of autonomous reasoning, planning, and execution. These digital employees are beginning to transform how we work, offering unprecedented capabilities in automation, analysis, and decision-making across various industries.

## Evolution of AI Agents

The progression from simple rule-based systems to sophisticated AI agents represents a fundamental shift:

- **Rule-Based Systems**: Simple if-then logic for basic tasks
- **Machine Learning Models**: Pattern recognition and prediction
- **Large Language Models**: Natural language understanding and generation
- **Autonomous Agents**: Goal-oriented reasoning and planning

## Key Capabilities

Modern AI agents demonstrate remarkable abilities:

- **Multi-Step Reasoning**: Breaking down complex problems into manageable steps
- **Tool Usage**: Integrating with external APIs and software systems
- **Memory and Context**: Maintaining long-term context across interactions
- **Self-Correction**: Learning from mistakes and improving performance

## Industry Applications

AI agents are being deployed across numerous sectors:

- **Customer Service**: 24/7 support with human-level understanding
- **Financial Analysis**: Automated research and investment recommendations
- **Software Development**: Code generation, testing, and debugging
- **Healthcare**: Diagnostic assistance and treatment planning
- **Legal Research**: Document analysis and case preparation

## Technical Architecture

The underlying technology stack includes:

- **Large Language Models**: Core reasoning and language capabilities
- **Vector Databases**: Efficient information retrieval and storage
- **API Integrations**: Connections to external tools and services
- **Orchestration Frameworks**: Coordinating multi-step workflows

## Challenges and Limitations

Despite impressive capabilities, current AI agents face several challenges:

- **Hallucination**: Generating plausible but incorrect information
- **Context Limitations**: Difficulty with very long or complex contexts
- **Reliability**: Inconsistent performance across different scenarios
- **Ethical Concerns**: Bias, privacy, and accountability issues

## The Future Workforce

As AI agents become more sophisticated, they're likely to:

- **Augment Human Workers**: Handling routine tasks while humans focus on creativity
- **Create New Job Categories**: AI trainer, prompt engineer, and agent supervisor roles
- **Transform Industries**: Enabling new business models and service offerings
- **Democratize Expertise**: Making specialized knowledge more accessible

## Preparing for the AI Agent Era

Organizations and individuals should consider:

- **Skill Development**: Learning to work effectively with AI agents
- **Process Redesign**: Optimizing workflows for human-AI collaboration
- **Ethical Guidelines**: Establishing responsible AI usage policies
- **Continuous Learning**: Staying updated with rapidly evolving capabilities

The rise of autonomous AI agents represents one of the most significant technological shifts of our time, promising to reshape how we work, learn, and solve complex problems across every domain of human activity.`,
    coverImage: 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    author: authors[0],
    category: categories[0],
    tags: ['AI Agents', 'Automation', 'Future of Work', 'Machine Learning'],
    publishedAt: '2024-01-09T08:30:00Z',
    readTime: 13,
    likes: 1156,
    views: 7234,
    featured: true,
    trending: true
  },
  {
    id: '8',
    title: 'Fusion Energy Breakthrough: The Dawn of Unlimited Clean Power',
    slug: 'fusion-energy-breakthrough-unlimited-clean-power',
    excerpt: 'Recent advances in fusion technology bring us closer to achieving the holy grail of energy production: safe, clean, and virtually unlimited power.',
    content: `After decades of research and development, fusion energy is finally approaching commercial viability. Recent breakthroughs in plasma confinement, materials science, and magnetic field control are bringing us closer to achieving the dream of clean, abundant energy that could power human civilization for millennia.

## The Fusion Advantage

Fusion energy offers unprecedented benefits over current energy sources:

- **Abundant Fuel**: Hydrogen isotopes available from seawater
- **No Carbon Emissions**: Clean energy production without greenhouse gases
- **No Long-Lived Radioactive Waste**: Minimal environmental impact
- **Inherent Safety**: No risk of meltdown or runaway reactions
- **High Energy Density**: Enormous power output from small fuel quantities

## Recent Breakthroughs

Several major milestones have been achieved recently:

- **Net Energy Gain**: First controlled fusion reaction producing more energy than consumed
- **Sustained Plasma**: Maintaining fusion conditions for extended periods
- **Advanced Materials**: Superconducting magnets and plasma-facing materials
- **AI-Optimized Control**: Machine learning for plasma stability

## Leading Approaches

Multiple fusion technologies are being pursued:

- **Tokamaks**: Magnetic confinement using toroidal chambers
- **Stellarators**: Advanced magnetic field configurations
- **Inertial Confinement**: Laser-driven fusion ignition
- **Alternative Concepts**: Field-reversed configurations and spheromaks

## Major Projects

Significant investments are driving progress:

- **ITER**: International collaboration building the world's largest tokamak
- **Commonwealth Fusion**: High-temperature superconductor technology
- **TAE Technologies**: Field-reversed configuration approach
- **Helion Energy**: Pulsed fusion with direct electricity generation

## Technical Challenges

Despite progress, significant hurdles remain:

- **Plasma Instabilities**: Controlling turbulence and disruptions
- **Materials Engineering**: Withstanding extreme neutron bombardment
- **Energy Conversion**: Efficiently converting fusion energy to electricity
- **Economic Viability**: Achieving cost-competitive power generation

## Timeline to Commercialization

Current projections suggest:

- **2030s**: First demonstration power plants
- **2040s**: Commercial fusion power stations
- **2050s**: Widespread deployment and grid integration
- **Beyond**: Fusion-powered space exploration and industry

## Global Impact

Successful fusion deployment could:

- **Eliminate Energy Poverty**: Abundant power for developing nations
- **Enable Carbon Neutrality**: Clean baseload power for industrial processes
- **Transform Transportation**: Hydrogen production for fuel cells
- **Support Space Exploration**: Compact power for long-duration missions

## Investment and Policy

Governments and private investors are committing unprecedented resources:

- **Public Funding**: Billions in government research investments
- **Private Capital**: Venture funding for fusion startups
- **International Cooperation**: Collaborative research programs
- **Regulatory Frameworks**: Developing safety and licensing standards

The fusion energy breakthrough represents humanity's potential to solve the climate crisis while providing abundant clean energy for continued prosperity and technological advancement.`,
    coverImage: 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    author: authors[4],
    category: categories[4],
    tags: ['Fusion Energy', 'Clean Technology', 'Climate Change', 'Physics'],
    publishedAt: '2024-01-08T15:20:00Z',
    readTime: 14,
    likes: 2341,
    views: 12456,
    featured: true,
    trending: true
  }
];