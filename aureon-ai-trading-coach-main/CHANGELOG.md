# Changelog

All notable changes to this project will be documented in this file.

This project follows semantic versioning.

---

# [1.0.0] - 2026-08-05

## 🎉 Initial Public Release

This is the first stable release of **Aureon AI Trading Coach**, an open-source trading intelligence platform designed to transform historical trading data into actionable insights through analytics, structured trade reviews, trader memory, pattern discovery, and AI-assisted coaching.

---

## Added

### Trade Import

* MT5 trade history import
* Exness trade history import
* CSV validation
* Duplicate trade detection
* Automatic trade normalization

---

### Performance Analytics

* Trading summary
* Trading statistics
* Profit factor
* Trading expectancy
* Risk-to-reward analysis
* Drawdown analysis
* Equity curve
* Monthly performance analysis

---

### Behavioural Analytics

* Revenge trading detection
* Overtrading detection
* Trading streak analysis

---

### Context Analytics

* Pair performance
* Trading session analysis
* Day-of-week analysis
* Trade duration analysis

---

### Trade Review Engine

Introduced a structured post-trade review workflow that captures trader knowledge unavailable from broker history.

Review categories include:

* Entry Thesis
* Confidence
* Emotion
* Reflection

---

### Decision Records

Added structured decision records for preserving trade context, observations, and review data.

---

### Observations

Introduced persistent trader observations for capturing qualitative trading information.

---

### Trader Memory

Added trader memory capable of summarising recurring behaviours, strengths, and weaknesses from historical reviews.

---

### Pattern Discovery

Introduced pattern discovery for identifying recurring trading behaviours and historical relationships.

---

### Edge Discovery

Added edge discovery engine for identifying statistically supported trading strengths based on historical evidence.

---

### AI Trading Coach

Introduced Aureon AI Coach capable of generating personalised coaching based on:

* Performance analytics
* Behavioural analytics
* Trader memory
* Decision records
* Pattern discovery
* Edge discovery

---

### REST API

Added FastAPI endpoints for:

* Performance
* Behaviour
* Context
* Trade Import
* Trade Reviews
* Observations
* Trader Memory
* Aureon Intelligence

---

### MCP Integration

Added Model Context Protocol (MCP) support, enabling compatible AI assistants to interact with Aureon using natural language.

---

### Documentation

* New project README
* Project architecture overview
* Installation guide
* Quick-start documentation

---

## Changed

* Rebranded the project from **Trader Journal MCP** to **Aureon AI Trading Coach**.
* Expanded the platform from a traditional trading journal into a comprehensive trading intelligence system.
* Improved project structure to support intelligence modules, repositories, and coaching workflows.

---

## Known Limitations

Current release limitations include:

* MT5 data is imported via CSV rather than a live broker connection.
* Review sessions are currently stored in memory during active workflows.
* The platform is primarily designed for a single trader and trading account.
* Coaching quality improves as more reviewed trades become available.

---

## Future

Planned improvements include:

* Live MT5 integration
* Multi-account support
* Interactive dashboard
* Enhanced AI coaching
* Portfolio analytics
* Additional broker integrations
* Persistent review sessions
* Cloud deployment

---

## Acknowledgements

Thank you to everyone who contributed ideas, feedback, and testing throughout the development of Aureon AI Trading Coach.

Version **1.0.0** establishes the foundation for the Aureon trading intelligence ecosystem.
