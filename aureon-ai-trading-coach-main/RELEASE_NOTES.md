# Aureon AI Trading Coach v1.0.0

We are pleased to announce the first stable release of **Aureon AI Trading Coach**.

Aureon is an open-source trading intelligence platform designed to help traders move beyond basic trade logging by combining performance analytics, structured trade reviews, trader memory, pattern discovery, edge discovery, and AI-assisted coaching.

## Highlights

### Trade Intelligence

* Import MetaTrader 5 and Exness trade history
* Calculate expectancy, profit factor, drawdown, equity curve, and risk-reward metrics
* Analyze performance by symbol, trading session, day, month, and duration
* Detect potential revenge trading and overtrading behavior

### Structured Trade Reviews

* Review completed trades using guided questions
* Capture entry thesis, confidence, emotion, and reflection
* Preserve broker facts separately from trader observations
* Build reusable Decision Records from completed reviews

### Trader Memory

* Store permanent trader observations
* Summarize recurring reasoning, emotions, and reflections
* Build a growing evidence base from reviewed trades
* Report memory maturity honestly when the sample is still small

### Pattern and Edge Discovery

* Group repeated decision patterns
* Connect recurring behavior to measurable outcomes
* Require a minimum evidence threshold before declaring an edge
* Return “Insufficient evidence” instead of inventing conclusions

### Aureon AI Coach

* Combine Decision Records, Trader Memory, and Edge Discovery
* Produce evidence-based coaching assessments
* Generate practical action plans
* Avoid unsupported claims when reviewed data is limited

### Developer Interfaces

* FastAPI REST endpoints
* Interactive Swagger and ReDoc documentation
* Model Context Protocol integration
* MCP tools for analytics, memory, observations, edge discovery, and coaching

## Validation

Before release, the current manual validation scripts were run successfully for:

* Trade import
* Performance analytics
* Observations
* Decision Records
* Trader Memory
* Review Engine
* Edge Discovery
* Aureon Coach

The system completed these checks without a traceback.

## Known Limitations

Version 1.0.0 establishes the foundation of the platform. Current limitations include:

* Trade history is imported through CSV rather than a live MT5 connection
* The current design primarily assumes one trader and one trading account
* Active review drafts are held in application memory
* Pattern and edge quality depends on the number and accuracy of reviewed trades
* The current validation scripts are executable checks rather than a full pytest suite
* Some legacy analytics coexist with the newer Decision Record architecture
* Aureon does not place trades, manage positions, or provide guaranteed trading outcomes

## What Comes Next

Future releases may include:

* Live MetaTrader 5 synchronization
* Persistent review drafts
* Multi-account support
* Improved automated tests
* A web dashboard
* Trade screenshot support
* Stronger pattern-confidence scoring
* Additional broker integrations
* Deeper AI coaching explanations

## Closing Note

Most trading tools explain what happened.

Aureon is being built to help traders understand why it happened.

Version 1.0.0 is the first completed foundation of that vision.
