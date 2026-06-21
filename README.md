# Job Search Agent — Frontend

The client application for the Job Search Agent platform: an autonomous AI system that matches job seekers with opportunities through semantic understanding, deterministic ranking, and personalized career coaching.

This repository contains the user-facing interface only. All matching, ranking, and reasoning happens in the backend.

## What This Connects To

This frontend is the client for the [Job Search Agent backend](https://github.com/Sharan-0-dot/JobSearch) — a Spring Boot platform built on LangChain4j, PostgreSQL with pgvector, and a hybrid deterministic-ranking-plus-LLM-explanation architecture.

For the full picture of what the platform does and how it's built — the agent design, the ranking model, the resume analysis engine, the resilience and observability layers — see the [backend README](https://github.com/Sharan-0-dot/JobSearch/blob/main/readme.md).

In short, the platform:

- Takes a natural-language query and finds relevant live job listings
- Ranks those listings using a transparent, reproducible scoring model — not an LLM guess
- Explains why each job matches, in plain language
- Compares a user's resume against any job and surfaces missing skills and concrete improvements
- Remembers context across a conversation and learns from what a user likes or applies to

This repository is where a person actually does all of that — searching, reading explanations, reviewing matches, uploading a resume, and managing their profile.

## Status

In active development, built against the backend's current API contract. Expect this README to grow as the interface takes shape.

## Related

- Backend & full platform documentation: [github.com/Sharan-0-dot/JobSearch](https://github.com/Sharan-0-dot/JobSearch)