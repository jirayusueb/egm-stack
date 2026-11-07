# Checkout retry design

## Overview

Retry the payment call with exponential backoff inside a 1,500 ms budget. One
idempotency key per order, minted before the first attempt and reused on every
retry.

## Goals and non-goals

Goals: one captured charge per order, p95 checkout under two seconds.
Non-goals: refunds, provider failover, retrying terminal declines.

## Detailed Implementation Plan

1. Add the key column to the order record and mint the key before the first
   charge attempt.
2. Wrap the payment call with the budgeted retry loop.
3. Add the duplicate-charge and backoff-cadence tests.
