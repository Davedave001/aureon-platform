from app.decision_record_repository import (
    DecisionRecordRepository,
)


TRADE_TICKET = 904262255

repository = DecisionRecordRepository()


print("SINGLE DECISION RECORD")

record = repository.get_by_trade(
    TRADE_TICKET
)

if record:
    print(record.to_dict())
else:
    print("Trade not found.")


print("\nOBSERVED DECISION RECORDS")

observed_records = repository.get_observed()

print(f"Observed records: {len(observed_records)}")

for observed_record in observed_records:
    print(observed_record.to_dict())