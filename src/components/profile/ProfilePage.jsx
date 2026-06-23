import { useState, useCallback } from 'react'
import { useUser } from '../../context/UserContext'
import { useApi } from '../../hooks/useApi'
import { getProfile, createOrUpdateProfile } from '../../api/profileApi'
import { useToast } from '../../hooks/useToast'
import ProfileForm from './ProfileForm'
import SkillTag from '../shared/SkillTag'
import Spinner from '../shared/Spinner'
import ErrorState from '../shared/ErrorState'

export default function ProfilePage() {
  const { userId } = useUser()
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState(null)
  const [savedMessage, setSavedMessage] = useState(null)
  const { showToast } = useToast()

  const fetchProfile = useCallback(async () => {
    try {
      return await getProfile(userId)
    } catch (err) {
      if (err.status === 404) return null
      throw err
    }
  }, [userId])

  const { data: profile, loading, error, refetch } = useApi(fetchProfile, [userId])

  const handleSave = async (body) => {
    setSaving(true)
    try {
      await createOrUpdateProfile({ userId, ...body })
      showToast('Profile saved')
      refetch()
    } catch (err) {
      showToast(err.message || 'Could not save profile', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size={24} className="text-ink-muted" />
      </div>
    )
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="font-display text-display text-ink mb-1">Profile</h1>
      <p className="font-body text-body text-ink-muted mb-6">
        Used to personalize job matches and resume analysis.
      </p>

      {profile?.extractedSkills?.length > 0 && (
        <div className="mb-6 p-3 rounded-md bg-accent-soft">
          <p className="font-body text-caption font-medium text-accent mb-2">
            Extracted from your resume
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {profile.extractedSkills.map((skill) => (
              <SkillTag key={skill} skill={skill} variant="matched" />
            ))}
          </div>
        </div>
      )}

      <ProfileForm initialProfile={profile} onSave={handleSave} saving={saving} />

      {savedMessage && (
        <p className="font-body text-caption text-accent mt-3">{savedMessage}</p>
      )}
      {saveError && (
        <p className="font-body text-caption text-danger mt-3">
          {saveError.message || 'Could not save profile. Try again.'}
        </p>
      )}
    </div>
  )
}