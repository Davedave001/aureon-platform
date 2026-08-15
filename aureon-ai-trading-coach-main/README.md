# Aureon AI Trading Coach

<p align="center">

**An Open-Source Trading Intelligence Platform**

Transform historical trading data into structured knowledge, behavioral insights, recurring patterns, and evidence-based coaching.

Version 1.0.0

</p>

---

## Overview

Aureon AI Trading Coach is an open-source trading intelligence platform that helps traders understand **why they win**, **why they lose**, and **how they can improve over time**.

Unlike traditional trading journals that simply record historical trades, Aureon combines performance analytics, structured trade reviews, trader memory, pattern discovery, edge discovery, and AI-assisted coaching into a single intelligence platform.

Instead of focusing only on profit and loss, Aureon learns from the decisions behind every trade.

Its goal is simple:

> **Turn trading history into actionable knowledge.**

---

# Why Aureon?

Most trading software answers one question:

> **What happened?**

Aureon is designed to answer a much more valuable question:

> **Why did it happen?**

Every trade contains more information than its final result.

Aureon captures:

- the reason a trade was taken
- confidence before entry
- emotional state
- market context
- post-trade reflections
- trading outcome

These observations become structured knowledge that allows Aureon to identify recurring strengths, weaknesses, and genuine trading edges.

---

# Core Capabilities

## 📥 Trade Import

Import historical MetaTrader 5 (MT5) trading history into Aureon's database.

Current supported formats:

- MetaTrader 5 CSV
- Exness CSV

---

## 📊 Performance Analytics

Generate detailed trading statistics including:

- Trading Summary
- Win Rate
- Net Profit
- Profit Factor
- Trading Expectancy
- Risk-to-Reward Ratio
- Drawdown Analysis
- Equity Curve
- Monthly Performance
- Pair Performance
- Trading Session Analysis
- Day-of-Week Analysis
- Trade Duration Analysis

---

## 🧠 Guided Trade Reviews

Every completed trade can be reviewed using Aureon's structured review workflow.

Each review captures:

- Entry Thesis
- Confidence
- Emotion
- Reflection

These observations become permanent trading knowledge.

---

## 📝 Decision Records

Every reviewed trade becomes a structured decision record containing:

- Trade Information
- Entry Thesis
- Emotional State
- Confidence
- Outcome
- Reflection
- Market Context

Decision records preserve far more information than a traditional trading journal.

---

## 💾 Trader Memory

Aureon continuously builds trader memory.

Examples include:

- recurring mistakes
- repeated strengths
- emotional tendencies
- successful trading conditions
- improvement opportunities

Instead of analyzing isolated trades, Aureon analyzes trading behaviour over time.

---

## 🔍 Pattern Discovery

Identify recurring relationships between:

- strategies
- setups
- emotions
- trading sessions
- market conditions
- performance

Patterns are discovered from historical evidence rather than assumptions.

---

## 🎯 Edge Discovery

Aureon identifies statistically supported trading strengths by evaluating:

- expectancy
- profitability
- consistency
- drawdown
- sample size
- trading context

Winning percentage alone is never treated as a trading edge.

---

## 🤖 AI Trading Coach

The Aureon Coach combines every layer of intelligence to generate personalized coaching.

Examples include:

- strongest trading edge
- weakest recurring behaviour
- best-performing strategy
- best-performing setup
- strongest market
- strongest session
- behavioural recommendations
- evidence-based action plans

---

## 🌐 FastAPI

Expose Aureon's intelligence engine through REST APIs.

---

## 🔌 MCP Integration

Aureon includes full Model Context Protocol (MCP) support, allowing compatible AI assistants to access trading intelligence using natural language.

Example questions:

- What is my expectancy?
- What is my strongest setup?
- What mistakes do I repeat?
- What should I improve?
- Which market performs best?

---

# Architecture

```text
                 MT5 History
                      │
                      ▼
            Trade Import Engine
                      │
                      ▼
               SQLite Database
                      │
                      ▼
              Decision Records
                      │
                      ▼
               Trader Memory
                      │
                      ▼
             Pattern Discovery
                      │
                      ▼
              Edge Discovery
                      │
                      ▼
             Aureon AI Coach
                 ┌──────────┐
                 │          │
                 ▼          ▼
             FastAPI      MCP
```

---

# Technology Stack

- Python
- FastAPI
- SQLite
- SQLAlchemy
- Pandas
- Pydantic
- FastMCP
- HTTPX
- Pytest

---

# Project Status

**Current Release**

**Version 1.0.0**

Version 1 establishes Aureon's core intelligence architecture and includes:

- Trade Import Engine
- Performance Analytics
- Behaviour Analytics
- Guided Trade Reviews
- Decision Records
- Trader Memory
- Pattern Discovery
- Edge Discovery
- AI Trading Coach
- FastAPI
- MCP Integration

---

# Installation

## Clone the Repository

```bash
git clone https://github.com/CepharsBonacci/aureon-ai-trading-coach.git

cd aureon-ai-trading-coach
```

---

## Create a Virtual Environment

### macOS / Linux

```bash
python3 -m venv venv

source venv/bin/activate
```

### Windows

```bash
python -m venv venv

venv\Scripts\activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# Quick Start

## 1. Initialize the Database

```bash
python init_db.py
```

---

## 2. Start the API

```bash
uvicorn server:app --reload
```

Swagger UI

```
http://127.0.0.1:8000/docs
```

ReDoc

```
http://127.0.0.1:8000/redoc
```

---

## 3. Import MT5 History

Export your trading history from MetaTrader 5 or Exness as a CSV file.

Then import it using Aureon's Import endpoint.

Once imported, Aureon automatically computes:

- Performance Metrics
- Drawdown
- Equity Curve
- Expectancy
- Behavioural Analytics
- Trading Context

---

## 4. Complete Trade Reviews

After importing your trading history, Aureon identifies trades that have not yet been reviewed.

The review workflow captures information that your broker cannot know, including:

- Entry Thesis
- Confidence
- Emotion
- Reflection

These observations become permanent decision records.

---

## 5. Build Trader Memory

As additional trades are reviewed, Aureon begins identifying recurring patterns in your decision making.

Instead of evaluating isolated trades, Aureon learns how you trade over time.

---

## 6. Discover Your Edge

The AI Coach combines:

- Performance Analytics
- Behavioural Analytics
- Trader Memory
- Pattern Discovery
- Decision Records

to identify statistically supported trading strengths and recurring weaknesses.

---

# REST API

Aureon exposes its intelligence engine through FastAPI.

The API is organised into the following modules.

---

## Performance

- Trading Summary
- Trading Statistics
- Expectancy
- Risk-Reward
- Drawdown
- Equity Curve
- Executive Summary
- Dynamic Recommendations

---

## Behaviour

- Revenge Trading Detection
- Overtrading Detection

---

## Context

- Pair Performance
- Session Performance
- Day Performance
- Trade Duration
- Monthly Performance

---

## Observations

- Save Trade Observations
- Observation Summary

---

## Trade Reviews

- Pending Reviews
- Review Status
- Review Questions
- Submit Answers
- Finish Review

---

## Trader Memory

- Memory Summary

---

## Aureon Intelligence

- Decision Records
- Reviewed Trades
- Edge Discovery
- AI Coach Report

---

# Model Context Protocol (MCP)

Aureon includes an MCP server allowing compatible AI assistants to access your trading knowledge using natural language.

Examples include:

> What is my current expectancy?

> Which market performs best?

> Show my strongest trading edge.

> Which emotional state hurts my performance?

> Summarise my trader memory.

> What recurring mistakes should I eliminate?

Rather than searching dashboards, traders can interact conversationally with their trading history.

---

# Project Structure

```
aureon-ai-trading-coach/

│

├── app/

│   ├── analytics.py

│   ├── imports.py

│   ├── models.py

│   ├── database.py

│   │

│   ├── intelligence/

│   │      coach.py

│   │      review_engine.py

│   │      trader_memory.py

│   │      observations.py

│   │      decision_record.py

│   │      edge_engine.py

│   │      pattern_engine.py

│   │

│   ├── routes/

│   │      performance.py

│   │      behaviour.py

│   │      context.py

│   │      imports.py

│   │      observations.py

│   │      review.py

│   │      trader_memory.py

│   │      intelligence.py

│

├── db/

├── mcp_server/

├── requirements.txt

├── server.py

├── README.md
```

---

# Roadmap

## Version 1.1

- Live MetaTrader 5 Integration
- Persistent Review Sessions
- Better AI Coaching Explanations
- Improved Edge Confidence

---

## Version 1.2

- Multi-Account Support
- Portfolio Analytics
- Interactive Dashboard
- Trade Screenshot Support

---

## Future Vision

Aureon AI Trading Coach is the first product in the Aureon ecosystem.

Future projects include:

- Aureon Intelligence Engine (AIE)
- Institutional Analytics
- Portfolio Intelligence
- Cloud Synchronisation
- Mobile Applications
- Multi-Broker Support
- AI Research Assistant
- Team Collaboration

---

# Contributing

Contributions are welcome.

Whether you are fixing bugs, improving documentation, proposing ideas, or building new features, your contributions help improve Aureon for the entire trading community.

Please open an issue before making significant architectural changes.

---

# License

This project is licensed under the **MIT License**.

You are free to use, modify, distribute, and build upon this software in accordance with the terms of the license.

See the LICENSE file for details.

---

# Author

**Cephars Bonacci**

Founder — Aureon Capital AI

GitHub

https://github.com/CepharsBonacci

---

# Vision

> **Most trading software tells you what happened.**

> **Aureon is built to help you understand why it happened.**

By combining structured trade reviews, trader memory, behavioural analysis, performance analytics, pattern discovery, edge discovery, and AI coaching, Aureon transforms historical trading activity into actionable intelligence that helps traders continuously improve their decision making.

---

# Acknowledgements

Aureon AI Trading Coach was built with the belief that trading success comes not only from analysing markets, but from understanding the decisions behind every trade.

Historical data becomes valuable when it is transformed into knowledge.

Knowledge becomes valuable when it improves future decisions.

That is the mission of Aureon.

---

**Aureon AI Trading Coach**

**Version 1.0.0**

*"Transforming Trading History into Trading Intelligence."*