# Checkout retry brief

## Problem

Transient payment provider errors fail one in two hundred orders.

## Goals vs non-goals

Goals: no duplicate charge, p95 checkout under two seconds.
Non-goals: refunds, provider failover.

## Alternatives weighed

No retry: rejected, transient errors fail the order. Fixed delay: rejected,
ignores provider Retry-After guidance.

## Key decisions

Retry three times with backoff. One idempotency key per order, persisted with
the order before the first attempt.
