# Sources & provenance — delphi

An independent rendering of the **Delphi method**, developed at the **RAND Corporation** in the 1950s by **Norman Dalkey**, **Olaf Helmer** and colleagues. The method is generic, has no owner and carries no trademark; this spec is dedicated to the public domain under CC0.

## Status
**Draft.** The stage prompts and eval blueprints are our wording. Promote `status: draft -> tested` only after review by a practitioner who has run Delphi panels, particularly on the round-2 feedback wording, where the line between presenting an aggregate and nudging toward it is easy to cross.

## Primary sources
- Norman C. Dalkey & Olaf Helmer, "An Experimental Application of the Delphi Method to the Use of Experts", *Management Science* 9(3), 1963 — the first published account of the technique.
- Harold A. Linstone & Murray Turoff (eds.), *The Delphi Method: Techniques and Applications*, 1975 — the standard reference collection, made freely available by the editors.
- Subsequent methodological literature on panel size, round count and stopping rules, which varies by field and is deliberately not fixed by this spec.

## Rights note
Delphi predates and sits outside any proprietary methodology framework. No permission is required to describe it, name it, or publish criteria for running it well. That is why it was chosen as the first worked example for the conformance work in [`docs/conformance/`](../../docs/conformance/): a method with no owner lets the shape of an artifact be argued on its merits, without a rights question in the way.

## Modelling notes
- **Three rounds, not two or five.** Delphi is defined by iteration with controlled feedback rather than by a fixed round count; practice ranges from two rounds to iteration until stability. Three is the smallest shape that shows all three movements (independent elicitation, reconsideration against the aggregate, convergence) and is what a reviewer should push back on first if their practice differs.
- **Qualitative rather than numeric.** This rendering elicits positions and reasons in conversation. Classical Delphi often collects numeric estimates and reports medians and interquartile ranges between rounds. A numeric variant is a separate spec, or a later version, not a footnote to this one.
- **Anonymity is assumed from the runtime.** The spec requires that feedback between rounds be an anonymised aggregate. How that anonymisation happens is the runtime's business; a runtime that cannot anonymise summaries cannot run this method faithfully.
- **Panel composition is out of scope.** Who counts as an expert, and how a panel is assembled, decides more about a Delphi's value than any prompt does, and belongs to the host rather than to the facilitation spec.
