from app.intelligence.review_engine import (
    TradeReviewEngine,
)

TRADE_TICKET = 904268178

engine = TradeReviewEngine()

print("=" * 60)
print("PENDING REVIEWS")
print("=" * 60)

for trade in engine.pending_reviews():
    print(trade)

print("\n")

print("=" * 60)
print("START REVIEW")
print("=" * 60)

review = engine.start(TRADE_TICKET)

print(review["review"])

print("\n")

print("=" * 60)
print("NEXT QUESTION")
print("=" * 60)

print(
    engine.next_question(
        TRADE_TICKET
    )
)