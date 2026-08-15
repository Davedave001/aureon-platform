from app.decision_record_repository import (
    DecisionRecordRepository,
)
from app.intelligence.coach import (
    AureonCoach,
)


repository = DecisionRecordRepository()

coach = AureonCoach()

records = repository.get_observed()

coach.learn(records)

report = coach.generate_report()

print("AUREON COACH REPORT")
print(report)