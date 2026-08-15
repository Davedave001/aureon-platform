from app.analytics import (
    get_performance_summary,
    get_pair_performance,
    get_trade_statistics,
    get_streak_analysis,
    get_session_analysis,
    get_day_of_week_analysis,
    get_expectancy,
    get_trade_duration_analysis,
    detect_revenge_trading,
    detect_overtrading,
    get_risk_reward_ratio,
    get_strategy_performance,
    get_emotion_performance,
    get_setup_performance,
    get_monthly_performance,
    get_drawdown_analysis,
    get_strategy_emotion_performance,
    get_equity_curve,
    analyze_my_edge,
    get_trading_coach_report,
    generate_dynamic_recommendations,
    analyze_trade_notes,
    get_behavioral_insights,
    get_pattern_detection,
    generate_executive_summary,
    generate_action_plan
)

print("SUMMARY")
print(get_performance_summary())

print("\nPAIR PERFORMANCE")
print(get_pair_performance())

print("\nTRADE STATISTICS")
print(get_trade_statistics())

print("\nEXPECTANCY")
print(get_expectancy())

print("\nSTREAK ANALYSIS")
print(get_streak_analysis())

print("\nSESSION ANALYSIS")
print(get_session_analysis())

print("\nDAY OF WEEK ANALYSIS")
print(get_day_of_week_analysis())

print("\nTRADE DURATION ANALYSIS")
print(get_trade_duration_analysis())

print("\nREVENGE TRADING DETECTION")
print(detect_revenge_trading())

print("\nOVERTRADING DETECTION")
print(detect_overtrading())

print("\nRISK-REWARD RATIO")
print(get_risk_reward_ratio())

print("\nSTRATEGY PERFORMANCE")
print(get_strategy_performance())

print("\nEMOTION PERFORMANCE")
print(get_emotion_performance())

print("\nSETUP PERFORMANCE")
print(get_setup_performance())

print("\nMONTHLY PERFORMANCE")
print(get_monthly_performance())

print("\nDRAWDOWN ANALYSIS")
print(get_drawdown_analysis())

print("\nSTRATEGY-EMOTION PERFORMANCE")
print(get_strategy_emotion_performance())

print("\nEQUITY CURVE")
print(get_equity_curve())

print("\nMY EDGE ANALYSIS")
print(analyze_my_edge())

print("\nTRADING COACH REPORT")
print(get_trading_coach_report())

print("\nDYNAMIC RECOMMENDATIONS")
print(generate_dynamic_recommendations())

print("\nTRADE NOTES ANALYSIS")
print(analyze_trade_notes())

print("\nBEHAVIORAL INSIGHTS")
print(get_behavioral_insights())

print("\nPATTERN DETECTION")
print(get_pattern_detection())

print("\nEXECUTIVE SUMMARY WITH GOAL")
print(generate_executive_summary())

print("\nACTION PLAN")
print(generate_action_plan())

