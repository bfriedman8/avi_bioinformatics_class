export const QUESTIONS = [
  // --- ROUND 1: SORT IT ---
  {
    id: 1,
    type: "sort",
    round: "Sort It",
    roundDesc: "Drag each statement to the correct dataset",
    prompt: "Which dataset does each statement describe?",
    items: [
      { id: "a", text: "Samples collected from hundreds of postmortem donors across 50+ tissues", answer: "GTEx" },
      { id: "b", text: "Deeply phenotyped patients with a single unresolved clinical condition", answer: "UDN" },
      { id: "c", text: "Identifies variants statistically associated with transcript level changes across carriers", answer: "GTEx" },
      { id: "d", text: "A private variant absent from population databases disrupts splicing in one child", answer: "UDN" },
      { id: "e", text: "Statistical power comes from sample size, not individual effect magnitude", answer: "GTEx" },
      { id: "f", text: "A de novo missense variant sufficient to cause disease in a single patient", answer: "UDN" },
    ],
    categories: ["GTEx", "UDN"],
  },

  // --- ROUND 2: MULTIPLE CHOICE ---
  {
    id: 2,
    type: "mcq",
    round: "Define It",
    prompt: "What is an eQTL?",
    choices: [
      "A variant that deletes an entire exon from the genome",
      "A common variant statistically associated with changes in a gene's expression level across a population",
      "An enzyme that edits RNA sequences after transcription",
      "A rare variant that causes complete loss of gene function",
    ],
    answer: "A common variant statistically associated with changes in a gene's expression level across a population",
    explanation:
      "An eQTL (expression quantitative trait locus) is a genetic variant — typically common — whose presence correlates with higher or lower transcript abundance of a nearby gene across many individuals. GTEx generates a comprehensive eQTL map across tissues.",
  },
  {
    id: 3,
    type: "mcq",
    round: "Define It",
    prompt: "What is an sQTL?",
    choices: [
      "A variant associated with structural rearrangements of chromosomes",
      "A common variant associated with changes in splicing ratios between isoforms of a gene",
      "A rare stop-gain mutation that truncates a protein",
      "A variant that silences a gene entirely via DNA methylation",
    ],
    answer: "A common variant associated with changes in splicing ratios between isoforms of a gene",
    explanation:
      "An sQTL (splicing quantitative trait locus) is a variant correlated with how a gene's pre-mRNA is spliced — for example, shifting usage of a splice site or altering exon inclusion rates. GTEx maps sQTLs across tissues to define the regulatory landscape of splicing.",
  },

  // --- ROUND 3: SCENARIO TRIAGE ---
  {
    id: 4,
    type: "triage",
    round: "Triage the Case",
    scenario:
      "A 6-year-old presents with a progressive neurodegenerative condition. Whole genome sequencing reveals a rare heterozygous intronic variant in a gene encoding a synaptic protein. The variant is absent from gnomAD. RNA-seq from the patient's fibroblasts shows abnormal exon inclusion not seen in controls.",
    question: "Which dataset is most directly relevant for interpreting this variant?",
    choices: [
      { label: "GTEx", reason: "Population-level eQTL mapping across tissues" },
      { label: "UDN", reason: "Individual-level rare variant with large functional impact" },
      { label: "Both are equally relevant", reason: "Need population and individual data together" },
    ],
    answer: "UDN",
    explanation:
      "The variant is private (absent from gnomAD), the effect is extreme (aberrant splicing not seen in controls), and interpretation is at the level of a single patient. This is the core use case for UDN. GTEx data on the same gene could provide supporting regulatory context, but the primary framework here is rare variant, large effect, individual patient — UDN.",
  },
  {
    id: 5,
    type: "triage",
    round: "Triage the Case",
    scenario:
      "A GWAS study identifies a non-coding SNP at chromosome 17q21 associated with asthma risk across 100,000 individuals. The SNP has a minor allele frequency of 12%. Researchers want to understand which gene it regulates and in which tissue.",
    question: "Which dataset is best suited to mechanistically interpret this GWAS hit?",
    choices: [
      { label: "GTEx", reason: "Maps common variant effects on expression and splicing across tissues" },
      { label: "UDN", reason: "Identifies rare high-impact variants in individual patients" },
      { label: "Neither — GWAS is self-sufficient", reason: "No additional data needed" },
    ],
    answer: "GTEx",
    explanation:
      "A common variant (MAF 12%) associated with a complex trait across a population is exactly the signal GTEx is designed to interpret. GTEx eQTLs in lung or immune tissue can colocalize with this GWAS signal to identify the target gene and tissue. UDN is not designed for population-scale common variant interpretation.",
  },

  // --- ROUND 4: TRUE/FALSE NUANCE ---
  {
    id: 6,
    type: "truefalse",
    round: "True or False?",
    prompt:
      "GTEx can directly identify the causal gene disrupted in a UDN patient, without needing the patient's own RNA-seq data.",
    answer: false,
    explanation:
      "GTEx provides population-level regulatory context — it can suggest that a genomic region influences a particular gene's expression. But to confirm causality in a specific patient, you need that patient's functional data (e.g., RNA-seq showing aberrant splicing). GTEx informs interpretation; it does not replace individual-level functional evidence.",
  },
  {
    id: 7,
    type: "truefalse",
    round: "True or False?",
    prompt:
      "A rare variant with a large effect on splicing in a UDN patient can be used as an extreme perturbation to validate a regulatory element that GTEx eQTLs implicate.",
    answer: true,
    explanation:
      "Correct. This is a key integration insight. If GTEx shows a region is regulatory (via eQTLs/sQTLs) and a UDN patient's rare variant in that same region causes dramatic splicing disruption, the rare variant acts as a natural experiment that confirms the regulatory element's function. Extreme perturbations validate what population-level statistics suggest.",
  },
  {
    id: 8,
    type: "truefalse",
    round: "True or False?",
    prompt:
      "UDN variants are typically common (MAF > 5%) and require large sample sizes to detect statistical associations.",
    answer: false,
    explanation:
      "UDN variants are rare — often private or ultra-rare (absent from population databases). Their interpretation does not rely on statistical association across many carriers. Instead, their causal status is inferred from the severity of their functional effect, segregation in families, and convergence with disease phenotype. Large sample sizes are a GTEx requirement, not a UDN one.",
  },

  // --- ROUND 5: INTEGRATION CHALLENGE ---
  {
    id: 9,
    type: "mcq",
    round: "Integration Challenge",
    prompt:
      "A UDN patient has a rare non-coding variant of unknown significance near gene X. GTEx shows an eQTL for gene X in brain tissue at the same locus. What does this combination of evidence suggest?",
    choices: [
      "The variant is benign because it is non-coding",
      "The region likely regulates gene X in brain; the rare variant may exert a large effect through the same regulatory mechanism",
      "The GTEx eQTL proves the rare variant causes disease",
      "The UDN variant and the GTEx eQTL are unrelated because they differ in allele frequency",
    ],
    answer:
      "The region likely regulates gene X in brain; the rare variant may exert a large effect through the same regulatory mechanism",
    explanation:
      "GTEx eQTLs mark functional regulatory regions. A rare UDN variant in an eQTL region implicates the same regulatory mechanism — but at much greater magnitude. This convergence upgrades the rare variant from 'unknown significance' to 'likely regulatory.' It does not prove causality alone, but it provides mechanistic plausibility.",
  },
  {
    id: 10,
    type: "mcq",
    round: "Integration Challenge",
    prompt:
      "What distinguishes tissue-specific eQTLs in GTEx from a single-patient RNA-seq result in UDN?",
    choices: [
      "GTEx eQTLs apply only to coding variants; UDN RNA-seq detects non-coding effects",
      "GTEx eQTLs are statistical associations derived from many donors and show which tissues regulate a gene; UDN RNA-seq is direct functional evidence in the patient's relevant tissue",
      "UDN RNA-seq is always more accurate than GTEx because patients are living donors",
      "There is no meaningful difference — both measure the same thing",
    ],
    answer:
      "GTEx eQTLs are statistical associations derived from many donors and show which tissues regulate a gene; UDN RNA-seq is direct functional evidence in the patient's relevant tissue",
    explanation:
      "GTEx eQTLs are correlational and population-derived — they define the landscape of regulation but cannot confirm causality in a specific individual. UDN RNA-seq directly measures gene expression or splicing in the patient, providing individual-level functional evidence. The two are complementary: one maps the landscape, the other reveals what a specific rare perturbation does within it.",
  },
];