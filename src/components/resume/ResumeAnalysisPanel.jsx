import Card from '../shared/Card'
import MatchScoreSummary from './MatchScoreSummary'
import MissingSkillsList from './MissingSkillsList'
import AtsFeedbackList from './AtsFeedbackList'
import SuggestedImprovementsList from './SuggestedImprovementsList'
import ResumeFeedbackText from './ResumeFeedbackText'

export default function ResumeAnalysisPanel({ analysis }) {
  return (
    <Card className="flex flex-col gap-5">
      <MatchScoreSummary matchScore={analysis.matchScore} />
      <MissingSkillsList skills={analysis.missingSkills} />
      <SuggestedImprovementsList improvements={analysis.suggestedImprovements} />
      <AtsFeedbackList feedback={analysis.atsFeedback} />
      <ResumeFeedbackText feedback={analysis.resumeFeedback} />
    </Card>
  )
}